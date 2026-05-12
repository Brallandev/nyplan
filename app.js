'use strict';

// ── Checklist data ───────────────────────────────────────────────────────────
const CHECKLIST = [
  {
    cat: 'Documentos de Viaje', priority: 'Alta',
    items: [
      { id: 'cl-1', text: 'Pasaporte Colombiano', note: 'Mín. 6 meses de vigencia a partir del 18 de mayo' },
      { id: 'cl-2', text: 'Visa Americana (B1/B2)', note: 'Verificar vigencia y categoría correcta' },
      { id: 'cl-3', text: 'Tiquetes de Vuelo', note: 'Descarga pase de abordar — llegada JFK 13:55 del 18 mayo' },
      { id: 'cl-4', text: 'Confirmación de Alojamiento', note: '400 W 42nd St — llevar impresa o en celular (migración puede pedirla)' },
      { id: 'cl-5', text: 'Seguro Médico de Viaje', note: 'Con cobertura en EE. UU. — la salud allí es extremadamente costosa' },
    ]
  },
  {
    cat: 'Atracciones (20 Mayo)', priority: 'Alta',
    items: [
      { id: 'cl-6', text: 'Statue City Cruises — Liberty Island', note: 'Compra en cityexperiences.com · Día 1, 9:00 AM · evita vendedores callejeros' },
    ]
  },
  {
    cat: 'Atracciones (21 Mayo)', priority: 'Alta',
    items: [
      { id: 'cl-7', text: 'Top of the Rock', note: 'Compra en rockefellercenter.com · Día 2, ~19:00 PM · se agota semanas antes' },
      { id: 'cl-8', text: 'The MET — Metropolitan Museum', note: 'Compra en metmuseum.org · Día 2, 13:30 PM · evita fila de taquilla' },
    ]
  },
  {
    cat: 'Finanzas y Transporte', priority: 'Media',
    items: [
      { id: 'cl-9', text: 'Tarjeta Contactless / OMNY habilitada', note: 'Activa pagos internacionales o vincula a Apple/Google Pay — sirve para Metro y AirTrain' },
      { id: 'cl-10', text: 'Dólares en efectivo (billetes pequeños)', note: '$1, $5, $10, $20 — para propinas, carritos Halal y lugares en Chinatown' },
    ]
  }
];

// ── Type metadata ────────────────────────────────────────────────────────────
const TYPE_META = {
  food:       { emoji: '🍽️', label: 'Comida',     color: '#f4895f' },
  transport:  { emoji: '🚇', label: 'Transporte',  color: '#4cc9f0' },
  attraction: { emoji: '🗽', label: 'Atracción',   color: '#b48ead' },
  walk:       { emoji: '🚶', label: 'Caminata',    color: '#2ecc71' },
  night:      { emoji: '🌃', label: 'Noche',       color: '#7b8fd4' }
};

// ── App state ────────────────────────────────────────────────────────────────
const app = (() => {
  let currentDay = 1;
  let selectedId = null;
  let map = null;
  let markers = {};
  let routeLine = null;
  let budgetPanelOpen = false;

  // ── Trip dates ───────────────────────────────────────────────────────────
  // TRIP_DATES and DAY_META come from data.js

  function todayStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Returns which trip day is "active" today (1, 2, or null)
  function activeTripDay() {
    const t = todayStr();
    for (const day of [0, 1, 2]) {
      if (t === TRIP_DATES[day]) return day;
    }
    return null;
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function fmtCost(cost, free) {
    return free ? 'Gratis' : `$${cost.toFixed(2)}`;
  }

  function timeToMinutes(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  function nowMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function dayActivities(day) {
    return TRIP_DATA.filter(a => a.day === day);
  }

  // Only marks an activity as current if today is the matching trip date
  function currentActivity(acts, day) {
    if (activeTripDay() !== day) return null;
    const now = nowMinutes();
    for (let i = 0; i < acts.length; i++) {
      const start = timeToMinutes(acts[i].time);
      const end   = i + 1 < acts.length
        ? timeToMinutes(acts[i + 1].time)
        : start + 90;
      if (now >= start && now < end) return acts[i].id;
    }
    return null;
  }

  function mapsUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  function directionsUrl(act) {
    // Combine named location + precise coords for accurate transit routing from current position
    const dest = encodeURIComponent(act.mapsQuery.replace(/\+/g, ' ') + ', New York');
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=transit`;
  }

  // ── Clock ────────────────────────────────────────────────────────────────
  function startClock() {
    const el = document.getElementById('liveClock');
    function tick() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      el.textContent = `${h}:${m}`;
    }
    tick();
    setInterval(tick, 10000);
  }

  // ── Time progress ────────────────────────────────────────────────────────
  function updateTimeProgress(day) {
    const acts  = dayActivities(day);
    const fill  = document.getElementById('timeProgressFill');
    const label = document.getElementById('timeProgressLabel');
    if (!acts.length) return;

    const today      = todayStr();
    const tripDate = TRIP_DATES[day];
    let pct;

    if (today < tripDate) {
      pct = 0;
      // Check if the next trip date is tomorrow
      const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().slice(0, 10);
      label.textContent = tomorrowStr === tripDate ? 'Mañana' : 'Pronto';
    } else if (today === tripDate) {
      // It's the actual trip day — progress within the day's schedule
      const first = timeToMinutes(acts[0].time);
      const last  = timeToMinutes(acts[acts.length - 1].time) + 90;
      const now   = nowMinutes();
      pct = Math.min(100, Math.max(0, ((now - first) / (last - first)) * 100));
      label.textContent = pct.toFixed(0) + '%';
    } else {
      // Day already passed
      pct = 100;
      label.textContent = '✓';
    }

    fill.style.width = pct.toFixed(1) + '%';
    if (pct === 100) {
      fill.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
    } else {
      fill.style.background = 'linear-gradient(90deg, var(--green), var(--blue))';
    }
  }

  // ── Budget strip ─────────────────────────────────────────────────────────
  function updateBudgetStrip(day) {
    const dayActs = dayActivities(day);
    const daySum  = dayActs.reduce((s, a) => s + a.cost, 0);
    document.getElementById('dayTotal').textContent   = `$${daySum.toFixed(0)}`;
    document.getElementById('grandTotal').textContent = `$${GRAND_TOTAL.toFixed(0)}`;
    updateTimeProgress(day);
  }

  // ── Map ──────────────────────────────────────────────────────────────────
  function initMap() {
    map = L.map('map', {
      zoomControl: true,
      attributionControl: false,
      preferCanvas: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    L.control.attribution({ prefix: false })
      .addAttribution('© <a href="https://carto.com">CARTO</a> © <a href="https://www.openstreetmap.org/copyright">OSM</a>')
      .addTo(map);
  }

  function createMarkerIcon(activity, isActive) {
    const meta = TYPE_META[activity.type];
    const cls  = `map-marker ${activity.type}${isActive ? ' active' : ''}`;
    return L.divIcon({
      html: `<div class="${cls}"><span class="marker-inner">${meta.emoji}</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34],
      className: ''
    });
  }

  // Straight-line fallback
  function drawFallbackRoute(coords) {
    routeLine = L.polyline(coords, {
      color: '#e63946', weight: 2.5, opacity: 0.55, dashArray: '7, 7'
    }).addTo(map);
  }

  // Fetch road-snapped geometry from OSRM public server
  // OSRM uses lng,lat order and returns a GeoJSON geometry
  async function fetchOsrmRoute(latLngArray) {
    const waypointStr = latLngArray.map(([lat, lng]) => `${lng},${lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/foot/${waypointStr}?overview=full&geometries=geojson&steps=false`;
    const res  = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes[0]) throw new Error('No route');
    return data.routes[0].geometry; // GeoJSON LineString
  }

  async function renderMap(day) {
    const acts = dayActivities(day);

    // Clear previous
    Object.values(markers).forEach(m => map.removeLayer(m));
    markers = {};
    if (routeLine) { map.removeLayer(routeLine); routeLine = null; }

    if (!acts.length) return;

    const validActs = acts.filter(a => a.coords);
    const coords    = validActs.map(a => a.coords);

    // Show markers first so the map feels responsive while routing loads
    validActs.forEach((act, idx) => {
      const marker = L.marker(act.coords, {
        icon: createMarkerIcon(act, false),
        zIndexOffset: idx * 10
      }).addTo(map);

      const meta = TYPE_META[act.type];
      marker.bindPopup(`
        <strong>${meta.emoji} ${act.name}</strong>
        <span>${act.time} · ${fmtCost(act.cost, act.free)}</span>
      `, { maxWidth: 200 });

      marker.on('click', () => { openModal(act.id); });
      markers[act.id] = marker;
    });

    // Fit map to markers immediately
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });

    // Then fetch real road geometry and draw on top
    try {
      const geometry = await fetchOsrmRoute(coords);

      // Draw a subtle shadow/halo first for legibility on dark tiles
      L.geoJSON(geometry, {
        style: { color: '#000', weight: 6, opacity: 0.25, lineJoin: 'round', lineCap: 'round' }
      }).addTo(map);

      routeLine = L.geoJSON(geometry, {
        style: { color: '#e63946', weight: 3, opacity: 0.85, lineJoin: 'round', lineCap: 'round' }
      }).addTo(map);
    } catch (_) {
      // Network unavailable or OSRM timed out — fall back to straight lines
      drawFallbackRoute(coords);
    }
  }

  function highlightMarker(id) {
    Object.entries(markers).forEach(([mId, marker]) => {
      const act = TRIP_DATA.find(a => a.id === mId);
      if (!act) return;
      marker.setIcon(createMarkerIcon(act, mId === id));
    });

    if (id && markers[id]) {
      const act = TRIP_DATA.find(a => a.id === id);
      if (act && act.coords) {
        map.setView(act.coords, Math.max(map.getZoom(), 15), { animate: true });
      }
    }
  }

  // ── Timeline ─────────────────────────────────────────────────────────────
  function renderTimeline(day) {
    const acts   = dayActivities(day);
    const curId  = currentActivity(acts, day);
    const meta = DAY_META[day];
    document.getElementById('timelineTitle').textContent = `${meta.label} (${meta.date})`;
    document.getElementById('timelineStats').textContent =
      `${acts.length} paradas · $${DAY_TOTALS[day].toFixed(0)} estimado`;

    const container = document.getElementById('timeline');
    container.innerHTML = '';

    acts.forEach(act => {
      const meta    = TYPE_META[act.type];
      const isCur   = act.id === curId;
      const card    = document.createElement('div');
      card.className = `activity-card${isCur ? ' current' : ''}`;
      card.dataset.id   = act.id;
      card.dataset.type = act.type;

      card.innerHTML = `
        <div class="card-node">
          <div class="node-dot ${act.type}"></div>
          <div class="card-time">${act.time}</div>
        </div>
        <div class="card-body">
          <div class="card-header">
            <div class="card-name">
              ${meta.emoji} ${act.name}
              ${isCur ? '<span class="current-badge">AHORA</span>' : ''}
            </div>
            <span class="card-cost ${act.free ? 'free' : 'paid'}">${fmtCost(act.cost, act.free)}</span>
          </div>
          <div class="card-desc">${act.description}</div>
          ${act.transport ? `<div class="card-transport">🚇 ${act.transport}</div>` : ''}
          <div class="card-location">📍 ${act.location}</div>
        </div>
      `;

      card.addEventListener('click', () => openModal(act.id));
      container.appendChild(card);
    });

    // Scroll current activity into view
    if (curId) {
      requestAnimationFrame(() => {
        const curCard = container.querySelector(`[data-id="${curId}"]`);
        if (curCard) curCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  // ── Modal ─────────────────────────────────────────────────────────────────
  function openModal(id) {
    const act = TRIP_DATA.find(a => a.id === id);
    if (!act) return;
    selectedId = id;

    const meta = TYPE_META[act.type];

    document.getElementById('modalBadge').textContent  = `${meta.emoji} ${meta.label}`;
    document.getElementById('modalBadge').className    = `modal-type-badge ${act.type}`;
    document.getElementById('modalTitle').textContent  = act.name;
    document.getElementById('modalTime').textContent   = `${act.time}${act.endTime ? ` – ${act.endTime}` : ''} · Día ${act.day}`;
    document.getElementById('modalDescription').textContent = act.description;

    // Meta chips
    const metaEl = document.getElementById('modalMeta');
    metaEl.innerHTML = `
      <span class="meta-chip ${act.free ? 'cost-chip free-chip' : 'cost-chip'}">
        💰 ${fmtCost(act.cost, act.free)}
      </span>
      <span class="meta-chip location-chip">📍 ${act.location}</span>
      ${act.transport ? `<span class="meta-chip transport-chip">🚇 ${act.transport}</span>` : ''}
    `;

    // Tips
    const tipsList = document.getElementById('tipsList');
    tipsList.innerHTML = act.tips.map(t => `<li>${t}</li>`).join('');

    // Buttons
    const navUrl  = mapsUrl(act.mapsQuery);
    const dirUrl  = directionsUrl(act);
    document.getElementById('btnNavigate').href   = navUrl;
    document.getElementById('btnDirections').href = dirUrl;

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';

    highlightMarker(id);
    document.querySelector(`[data-id="${id}"]`)?.classList.add('active');
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    if (selectedId) {
      document.querySelector(`[data-id="${selectedId}"]`)?.classList.remove('active');
    }
    highlightMarker(null);
    selectedId = null;
  }

  // ── Budget panel ──────────────────────────────────────────────────────────
  function renderBudgetPanel() {
    const body = document.getElementById('budgetPanelBody');
    let html = '';

    [0, 1, 2].forEach(day => {
      const acts = dayActivities(day);
      const total = DAY_TOTALS[day];
      html += `<div class="budget-section">
        <div class="budget-section-title">Día ${day}</div>`;

      acts.forEach(act => {
        const meta = TYPE_META[act.type];
        html += `
        <div class="budget-row">
          <div class="budget-row-name">
            <span class="type-emoji">${meta.emoji}</span>
            <span>${act.name.replace(/:.*/,'').trim()}</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="budget-row-time">${act.time}</span>
            <span class="budget-row-cost ${act.free ? 'free' : 'paid'}">${fmtCost(act.cost, act.free)}</span>
          </div>
        </div>`;
      });

      html += `
        <div class="budget-total-row">
          <span class="budget-total-label">Total Día ${day}</span>
          <span class="budget-total-amount">$${total.toFixed(2)}</span>
        </div>
      </div>`;
    });

    html += `
      <div class="budget-grand-total">
        <span class="budget-grand-label">🗽 Total NYC Trip</span>
        <span class="budget-grand-amount">$${GRAND_TOTAL.toFixed(2)}</span>
      </div>
      <p style="font-size:11px;color:#8892a4;margin-top:12px;text-align:center">
        *Costos estimados. Precios pueden variar.
      </p>`;

    body.innerHTML = html;
  }

  function toggleBudgetPanel() {
    budgetPanelOpen = !budgetPanelOpen;
    const panel = document.getElementById('budgetPanel');
    if (budgetPanelOpen) {
      renderBudgetPanel();
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      panel.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ── Day switcher ──────────────────────────────────────────────────────────
  function setDay(day) {
    currentDay = day;
    closeModal();

    // Update bottom tab bar
    document.querySelectorAll('.tab-bar-item[data-day]').forEach(t => {
      t.classList.toggle('active', Number(t.dataset.day) === day);
    });

    renderMap(day);
    renderTimeline(day);
    updateBudgetStrip(day);
  }

  // ── Keyboard & swipe ──────────────────────────────────────────────────────
  function setupInteractions() {
    // ESC to close modal/panel
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (document.getElementById('modalOverlay').classList.contains('open')) {
          closeModal();
        } else if (budgetPanelOpen) {
          toggleBudgetPanel();
        }
      }
    });

    // Swipe to change day
    let touchStartX = 0;
    document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 80 && !document.getElementById('modalOverlay').classList.contains('open')) {
        if (dx < 0 && currentDay < 2) setDay(currentDay + 1);
        if (dx > 0 && currentDay > 0) setDay(currentDay - 1);
      }
    }, { passive: true });
  }

  // ── Notifications ─────────────────────────────────────────────────────────
  const NOTIF_KEY = 'nyc_notif_scheduled';
  let notifTimers = [];

  function notifSupported() {
    return 'Notification' in window;
  }

  async function requestNotifPermission() {
    if (!notifSupported()) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  function sendNotif(title, body, tag, icon) {
    if (!notifSupported() || Notification.permission !== 'granted') return;
    try {
      const n = new Notification(title, {
        body,
        tag,
        icon: icon || 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        vibrate: [200, 100, 200],
        silent: false
      });
      n.onclick = () => { window.focus(); n.close(); };
    } catch (_) {}
  }

  // Schedule a notification `minutesBefore` minutes before each activity on its trip day
  function scheduleActivityNotifs(day, minutesBefore) {
    const acts     = dayActivities(day);
    const dateStr  = TRIP_DATES[day];           // e.g. "2026-05-20"
    const now      = Date.now();

    acts.forEach(act => {
      const [year, month, dayNum] = dateStr.split('-').map(Number);
      const [h, m]                = act.time.split(':').map(Number);
      // Fire the notification `minutesBefore` minutes early
      const fireAt = new Date(year, month - 1, dayNum, h, m - minutesBefore, 0).getTime();
      const delay  = fireAt - now;
      if (delay <= 0) return;   // already past

      const meta = TYPE_META[act.type];
      const t = setTimeout(() => {
        sendNotif(
          `${meta.emoji} Próxima parada en ${minutesBefore} min`,
          `${act.name} · ${act.time} · ${act.location}`,
          act.id
        );
      }, delay);
      notifTimers.push(t);
    });
  }

  function clearScheduledNotifs() {
    notifTimers.forEach(t => clearTimeout(t));
    notifTimers = [];
  }

  async function toggleNotifications() {
    const btn = document.getElementById('notifBtn');
    const active = btn.classList.contains('notif-on');

    if (active) {
      clearScheduledNotifs();
      btn.classList.remove('notif-on');
      btn.title = 'Activar recordatorios';
      showToast('🔕 Recordatorios desactivados');
      return;
    }

    const granted = await requestNotifPermission();
    if (!granted) {
      showToast('⚠️ Permite notificaciones en el navegador');
      return;
    }

    // Schedule 15-min-ahead reminders for both trip days
    scheduleActivityNotifs(0, 15);
    scheduleActivityNotifs(1, 15);
    scheduleActivityNotifs(2, 15);

    btn.classList.add('notif-on');
    btn.title = 'Desactivar recordatorios';
    showToast('🔔 Recordatorios activados — 15 min antes de cada parada');

    // Fire an immediate test notification so Android shows the card right away
    sendNotif(
      '🗽 NYC Adventure — Recordatorios ON',
      'Te avisaremos 15 min antes de cada actividad del viaje.',
      'nyc-welcome'
    );
  }

  // ── Toast helper ──────────────────────────────────────────────────────────
  function showToast(msg) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.style.cssText = `
        position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);
        background:#1c2235;color:#f0f0f0;border:1px solid #2a3050;
        padding:10px 18px;border-radius:20px;font-size:13px;font-weight:600;
        z-index:9999;opacity:0;transition:all .3s ease;white-space:nowrap;
        box-shadow:0 4px 20px rgba(0,0,0,0.5);pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3000);
  }

  // ── Notification button in FAB area ──────────────────────────────────────
  function injectNotifBtn() {
    const wrap = document.getElementById('notifFabWrap');
    const btn = document.createElement('button');
    btn.id        = 'notifBtn';
    btn.title     = 'Activar recordatorios';
    btn.innerHTML = '🔔';
    btn.style.cssText = `
      width:46px;height:46px;border-radius:50%;
      background:#1c2235;border:1px solid #2a3050;
      font-size:18px;cursor:pointer;display:flex;align-items:center;
      justify-content:center;
      box-shadow:0 2px 10px rgba(0,0,0,0.3);transition:all .2s;
    `;
    btn.onclick = toggleNotifications;
    wrap.appendChild(btn);

    // Style for active state
    const style = document.createElement('style');
    style.textContent = `
      #notifBtn.notif-on {
        background: rgba(76,201,240,0.15);
        border-color: #4cc9f0;
        box-shadow: 0 0 0 3px rgba(76,201,240,0.2);
      }
    `;
    document.head.appendChild(style);
  }

  // ── Checklist ─────────────────────────────────────────────────────────────
  const CL_KEY = 'nyc_checklist';
  let clOpen = false;

  function loadChecked() {
    try { return JSON.parse(localStorage.getItem(CL_KEY) || '{}'); } catch { return {}; }
  }
  function saveChecked(checked) {
    localStorage.setItem(CL_KEY, JSON.stringify(checked));
  }

  function allItemIds() {
    return CHECKLIST.flatMap(g => g.items.map(i => i.id));
  }

  function updateBadge(checked) {
    const total = allItemIds().length;
    const done  = allItemIds().filter(id => checked[id]).length;
    const badge = document.getElementById('checklistBadge');
    if (badge) {
      badge.textContent = `${done}/${total}`;
      badge.style.color = done === total ? 'var(--green)' : '';
    }
  }

  // Countdown to Sunday midnight (end of Sunday May 17 = start of Monday May 18)
  function deadlineMs() {
    // Midnight at the end of Sunday 17 May 2026 (i.e. 00:00 Mon 18 May, Bogotá UTC-5)
    return new Date('2026-05-18T00:00:00-05:00').getTime();
  }

  function fmtCountdown(ms) {
    if (ms <= 0) return '¡Hora de volar! ✈️';
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000)  / 60000);
    const s = Math.floor((ms % 60000)    / 1000);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  }

  function renderChecklist() {
    const body    = document.getElementById('checklistBody');
    const checked = loadChecked();
    const total   = allItemIds().length;
    const done    = allItemIds().filter(id => checked[id]).length;
    const pct     = Math.round((done / total) * 100);

    body.innerHTML = `
      <div class="cl-countdown" id="clCountdown"></div>
      <div class="cl-progress-wrap">
        <div class="cl-progress-bar"><div class="cl-progress-fill" style="width:${pct}%"></div></div>
        <span class="cl-progress-label">${done}/${total} completados</span>
      </div>
      ${CHECKLIST.map(group => `
        <div class="cl-group">
          <div class="cl-group-title">${group.cat}
            <span class="cl-priority ${group.priority === 'Alta' ? 'high' : 'med'}">${group.priority}</span>
          </div>
          ${group.items.map(item => `
            <label class="cl-item ${checked[item.id] ? 'checked' : ''}" data-id="${item.id}">
              <input type="checkbox" class="cl-cb" data-id="${item.id}" ${checked[item.id] ? 'checked' : ''}>
              <div class="cl-item-body">
                <div class="cl-item-text">${item.text}</div>
                <div class="cl-item-note">${item.note}</div>
              </div>
            </label>
          `).join('')}
        </div>
      `).join('')}
      <p class="cl-footer">Los cambios se guardan automáticamente en este dispositivo.</p>
    `;

    // Wire checkboxes
    body.querySelectorAll('.cl-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        const c = loadChecked();
        c[cb.dataset.id] = cb.checked;
        saveChecked(c);
        cb.closest('.cl-item').classList.toggle('checked', cb.checked);
        updateBadge(c);
        // Re-render just the progress bar portion
        const newDone = allItemIds().filter(id => c[id]).length;
        const newPct  = Math.round((newDone / total) * 100);
        body.querySelector('.cl-progress-fill').style.width = newPct + '%';
        body.querySelector('.cl-progress-label').textContent = `${newDone}/${total} completados`;
      });
    });

    // Start live countdown
    clearInterval(window._clTimer);
    function tickCd() {
      const el = document.getElementById('clCountdown');
      if (!el) { clearInterval(window._clTimer); return; }
      const left = deadlineMs() - Date.now();
      el.textContent = `⏱ Faltan: ${fmtCountdown(left)}`;
      el.style.color = left < 86400000 ? 'var(--red)' : 'var(--blue)';
    }
    tickCd();
    window._clTimer = setInterval(tickCd, 1000);

    updateBadge(checked);
  }

  function toggleChecklist() {
    clOpen = !clOpen;
    const panel = document.getElementById('checklistPanel');
    if (clOpen) {
      renderChecklist();
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      panel.classList.remove('open');
      clearInterval(window._clTimer);
      document.body.style.overflow = '';
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    startClock();
    initMap();
    // Auto-select today's trip day; default to arrival day
    setDay(activeTripDay() ?? 0);
    setupInteractions();
    updateBadge(loadChecked());
    injectNotifBtn();

    // Register SW
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }

    // Refresh time progress every minute
    setInterval(() => {
      updateTimeProgress(currentDay);
      renderTimeline(currentDay);
    }, 60000);
  }

  return { init, setDay, openModal, closeModal, toggleBudgetPanel, toggleChecklist };
})();

window.addEventListener('DOMContentLoaded', () => app.init());
