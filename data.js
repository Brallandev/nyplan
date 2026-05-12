const TRIP_DATA = [

  // ─── DÍA 0 — LLEGADA (18 Mayo) ──────────────────────────────────────────
  {
    day: 0, id: "d0-1", time: "13:55", endTime: "15:00",
    name: "Aterrizaje en JFK",
    description: "Pasar migración y recoger equipaje. Bienvenido a Nueva York.",
    transport: null,
    cost: 0, free: true,
    location: "Aeropuerto JFK",
    coords: [40.6413, -73.7781],
    type: "transport",
    tips: [
      "Fila de migración: puede tomar 30-60 min; ten pasaporte y formulario listos",
      "Recoge tu equipaje en el carrusel indicado en tu boleto",
      "Cambia algo de efectivo en el aeropuerto si no tienes dólares",
      "Wi-Fi gratuito disponible en JFK (red 'Boingo Wireless' o 'JFK Free WiFi')"
    ],
    mapsQuery: "John+F+Kennedy+International+Airport+Jamaica+NY"
  },
  {
    day: 0, id: "d0-2", time: "15:00", endTime: "16:15",
    name: "Tránsito a Manhattan",
    description: "AirTrain a Jamaica Station, luego Línea E hasta 42 St-Port Authority.",
    transport: "AirTrain + Línea E",
    cost: 11.50, free: false,
    location: "Queens → Hell's Kitchen",
    coords: [40.7574, -74.0003],
    type: "transport",
    tips: [
      "AirTrain: sale de cualquier terminal JFK, cuesta $8.50 hasta Jamaica",
      "En Jamaica, compra MetroCard o usa OMNY (toca tarjeta) para la Línea E",
      "La Línea E va directo a 42 St-Port Authority sin transbordo (~45 min)",
      "Con equipaje: usa el elevador en las estaciones, no las escaleras mecánicas",
      "Total tránsito: ~$11.50 (AirTrain $8.50 + Metro $3.00)"
    ],
    mapsQuery: "Jamaica+Station+LIRR+AirTrain+Queens+NY"
  },
  {
    day: 0, id: "d0-3", time: "16:15", endTime: "16:45",
    name: "Check-in Hotel",
    description: "Llegada al 400 West 42nd Street y dejar equipaje. A 2 min de la estación.",
    transport: null,
    cost: 0, free: true,
    location: "Hell's Kitchen",
    coords: [40.7574, -74.0003],
    type: "attraction",
    tips: [
      "El hotel está en la esquina de la 42nd St y la 9na Av — muy céntrico",
      "Si el cuarto no está listo, guarda el equipaje en recepción y sal a explorar",
      "La 9na Av tiene bodegas, farmacias y tiendas a pasos del hotel",
      "Supermercado cercano: Westside Market en la 9na Av"
    ],
    mapsQuery: "400+West+42nd+Street+Hell%27s+Kitchen+New+York"
  },
  {
    day: 0, id: "d0-4", time: "16:45", endTime: "17:30",
    name: "Metro a Bushwick",
    description: "Tomar Línea A/C/E a 14 St, transbordo a Línea L hasta la estación Morgan Ave.",
    transport: "A/C/E → Línea L",
    cost: 3.00, free: false,
    location: "Metro",
    coords: [40.7063, -73.9331],
    type: "transport",
    tips: [
      "Desde 42 St-Port Authority: baja al andén de la Línea A/C/E dirección Downtown",
      "Bájate en 14 St-8th Ave y cambia a la Línea L dirección Canarsie (Brooklyn)",
      "Morgan Ave es la 4ª parada en Brooklyn; el viaje total toma ~30 min",
      "La Línea L es muy frecuente, especialmente tarde"
    ],
    mapsQuery: "Morgan+Ave+L+Train+Station+Bushwick+Brooklyn"
  },
  {
    day: 0, id: "d0-5", time: "17:30", endTime: "19:00",
    name: "Urban Jungle Thrift Shop",
    description: "Caminar 3 cuadras hasta 118 Knickerbocker Ave. Compras de ropa vintage a precios bajos.",
    transport: null,
    cost: 0, free: false,
    location: "Bushwick, Brooklyn",
    coords: [40.7022, -73.9283],
    type: "walk",
    tips: [
      "Urban Jungle: uno de los mejores thrift shops de NYC, ropa por libra",
      "Lleva efectivo; algunos días aceptan tarjeta pero no siempre",
      "El barrio de Bushwick tiene murales callejeros espectaculares — camina y explora",
      "Knickerbocker Ave tiene varias tiendas vintage y cafeterías"
    ],
    mapsQuery: "Urban+Jungle+Thrift+118+Knickerbocker+Ave+Bushwick+Brooklyn"
  },
  {
    day: 0, id: "d0-6", time: "19:00", endTime: "20:30",
    name: "Cena en Bushwick",
    description: "Slice rápido por la zona (Artichoke Basille's o Roberta's).",
    transport: null,
    cost: 10.00, free: false,
    location: "Bushwick, Brooklyn",
    coords: [40.7059, -73.9290],
    type: "food",
    tips: [
      "Roberta's (261 Moore St): pizza artesanal, ambiente hipster; puede haber fila",
      "Artichoke Basille's: pizza de alcachofa cremosa, muy conocida",
      "Hay muchas opciones de comida económica en la calle Myrtle Ave",
      "Es tu primer día — no te quedes muy tarde, descansa para el Día 1"
    ],
    mapsQuery: "Roberta%27s+Pizza+Bushwick+Brooklyn+NY"
  },
  {
    day: 0, id: "d0-7", time: "20:30", endTime: "21:30",
    name: "Regreso a descansar",
    description: "Línea L hacia Manhattan, transbordo a A/C/E hasta 42 St-Port Authority.",
    transport: "L → A/C/E",
    cost: 3.00, free: false,
    location: "Metro",
    coords: [40.7574, -74.0003],
    type: "transport",
    tips: [
      "Morgan Ave → 14 St en Línea L, luego A/C/E hasta 42 St-Port Authority",
      "El hotel está a 2 minutos caminando desde la estación",
      "Mañana hay mucho por hacer — descansa bien"
    ],
    mapsQuery: "42+St+Port+Authority+A+C+E+Train+Station+New+York"
  },

  // ─── DÍA 1 — 20 MAYO ────────────────────────────────────────────────────
  {
    day: 1, id: "d1-1", time: "07:30", endTime: "08:15",
    name: "Desayuno: Hotcakes y Tocino",
    description: "Caminar al McDonald's de la Calle 42 y 8va Av para tu combo de hotcakes, tocino y maple.",
    transport: null,
    cost: 7.00, free: false,
    location: "Hell's Kitchen",
    coords: [40.7570, -73.9907],
    type: "food",
    tips: [
      "El McDonald's de la 42nd y 8va Av abre muy temprano",
      "El combo de desayuno termina a las 10:30 AM",
      "Está a solo 5 minutos caminando desde el hotel",
      "Toma el desayuno rápido — hay mucho por ver hoy"
    ],
    mapsQuery: "McDonald%27s+42nd+St+8th+Ave+Hell%27s+Kitchen+New+York"
  },
  {
    day: 1, id: "d1-2", time: "08:15", endTime: "09:00",
    name: "Metro al Sur",
    description: "Caminar a la estación Times Sq-42 St. Tomar Línea 1 (Roja) directo a South Ferry.",
    transport: "Línea 1 a South Ferry",
    cost: 3.00, free: false,
    location: "Metro",
    coords: [40.7013, -74.0131],
    type: "transport",
    tips: [
      "La Línea 1 sale de Times Sq-42 St (andén dirección Downtown/South Ferry)",
      "El viaje toma ~30 minutos sin transbordo",
      "South Ferry es la última parada — no te puedes pasar",
      "Llega con tiempo: el ferry de la Estatua tiene horarios fijos"
    ],
    mapsQuery: "South+Ferry+Station+1+Train+New+York"
  },
  {
    day: 1, id: "d1-3", time: "09:00", endTime: "12:00",
    name: "Liberty Island (Estatua de la Libertad)",
    description: "Abordar el ferry de Statue City Cruises. Recorrer la isla de la estatua con vistas panorámicas.",
    transport: "Ferry Statue City Cruises",
    cost: 25.00, free: false,
    location: "Puerto Sur / Liberty Island",
    coords: [40.6892, -74.0445],
    type: "attraction",
    tips: [
      "¡Reserva el ticket online con anticipación en statuecruises.com!",
      "El ferry sale de Battery Park (camina 5 min desde South Ferry Station)",
      "Ticket básico incluye la isla y Ellis Island; ticket pedestal/corona cuesta más",
      "Lleva agua y snacks — los precios dentro son altos",
      "Las vistas del skyline de Manhattan desde el ferry son espectaculares",
      "Tiempo recomendado en la isla: 1.5-2 horas"
    ],
    mapsQuery: "Statue+City+Cruises+Battery+Park+New+York"
  },
  {
    day: 1, id: "d1-4", time: "12:00", endTime: "13:30",
    name: "Wall Street & Oculus",
    description: "Caminar al Charging Bull, Wall St, 9/11 Memorial y entrar al Oculus (todo a pie).",
    transport: null,
    cost: 0, free: true,
    location: "Distrito Financiero",
    coords: [40.7069, -74.0089],
    type: "attraction",
    tips: [
      "Charging Bull: Broadway y Morris St (5 min caminando desde Battery Park)",
      "9/11 Memorial (piscinas): gratis; el museo interior tiene costo adicional",
      "El Oculus: la estación de metro más cara y hermosa del mundo ($4 mil millones)",
      "Ruta: Bull → Wall St → Trinity Church → 9/11 Memorial → Oculus"
    ],
    mapsQuery: "Charging+Bull+Wall+Street+New+York"
  },
  {
    day: 1, id: "d1-5", time: "13:30", endTime: "15:00",
    name: "Almuerzo: Dumplings en Chinatown",
    description: "Tomar Línea R/W a Canal St. Comer en Shu Jiao Fu Zhou (platos económicos).",
    transport: "R/W a Canal St",
    cost: 5.00, free: false,
    location: "Chinatown",
    coords: [40.7181, -74.0002],
    type: "food",
    tips: [
      "Shu Jiao Fu Zhou: dumplings hervidos artesanales muy auténticos",
      "Fried Dumpling (46 Mosco St): 5 dumplings fritos por $1.25",
      "Pide cerdo y repollo (los clásicos) o gambas",
      "Chinatown tiene tiendas curiosas baratas en Canal St"
    ],
    mapsQuery: "Shu+Jiao+Fu+Zhou+Chinatown+New+York"
  },
  {
    day: 1, id: "d1-6", time: "15:00", endTime: "16:30",
    name: "Puente de Brooklyn",
    description: "Cruzar caminando desde City Hall hacia Brooklyn (aprox. 30-40 min a pie).",
    transport: null,
    cost: 0, free: true,
    location: "Brooklyn Bridge",
    coords: [40.7057, -73.9964],
    type: "walk",
    tips: [
      "Entrada peatonal: Park Row y Centre St, junto a City Hall Park",
      "El cruce completo toma ~35-40 min",
      "Mantente en el carril peatonal (bicicletas tienen su propio carril)",
      "Mejor foto: mira hacia atrás (Manhattan) a mitad del puente"
    ],
    mapsQuery: "Brooklyn+Bridge+pedestrian+entrance+Manhattan"
  },
  {
    day: 1, id: "d1-7", time: "16:30", endTime: "18:00",
    name: "Brooklyn Heights Promenade & DUMBO",
    description: "Desvío por Brooklyn Heights Promenade, bajar a Pebble Beach y Washington St.",
    transport: null,
    cost: 0, free: true,
    location: "DUMBO, Brooklyn",
    coords: [40.7033, -73.9902],
    type: "walk",
    tips: [
      "DUMBO = Down Under the Manhattan Bridge Overpass",
      "Foto icónica: esquina de Washington St & Water St (arco del puente encuadrado)",
      "Pebble Beach: playa de piedras con vistas al Manhattan Bridge",
      "Brooklyn Heights Promenade: 800m de paseo con vistas espectaculares"
    ],
    mapsQuery: "DUMBO+Brooklyn+Washington+St+Water+St"
  },
  {
    day: 1, id: "d1-8", time: "18:00", endTime: "19:30",
    name: "Cena: Shake Shack DUMBO",
    description: "Hamburguesa doble debajo del puente de Brooklyn. Descansar en el parque.",
    transport: null,
    cost: 14.00, free: false,
    location: "DUMBO, Brooklyn",
    coords: [40.7024, -73.9876],
    type: "food",
    tips: [
      "Pide el ShackBurger doble con papas crinkle-cut",
      "Come al aire libre con vista al Manhattan Bridge",
      "Puede haber fila de 10-15 min — vale la pena"
    ],
    mapsQuery: "Shake+Shack+DUMBO+Brooklyn"
  },
  {
    day: 1, id: "d1-9", time: "19:30", endTime: "20:30",
    name: "Retorno a Midtown",
    description: "Caminar a High St y tomar Línea A/C (Azul) hasta 42 St-Port Authority.",
    transport: "A/C desde High St",
    cost: 3.00, free: false,
    location: "Metro",
    coords: [40.6993, -73.9899],
    type: "transport",
    tips: [
      "High St Station (A/C) está a ~10 min caminando desde DUMBO",
      "Toma la Línea A o C dirección Uptown / Manhattan",
      "Bájate en 42 St-Port Authority — es tu estación de regreso al hotel"
    ],
    mapsQuery: "High+St+Brooklyn+Bridge+A+C+Train+Station+Brooklyn"
  },
  {
    day: 1, id: "d1-10", time: "20:30", endTime: "21:30",
    name: "Times Square de Noche",
    description: "Caminar a la 7ma Avenida/Broadway para ver las luces de noche. El mejor momento del día.",
    transport: null,
    cost: 0, free: true,
    location: "Times Square",
    coords: [40.7580, -73.9855],
    type: "night",
    tips: [
      "Las luces de Times Square son más impresionantes después de las 9 PM",
      "Camina por Broadway entre la 42nd y 47th St",
      "Hay shows de Broadway terminando en este horario — ambiente increíble",
      "Cuidado con los carteristas en zonas muy concurridas"
    ],
    mapsQuery: "Times+Square+Broadway+New+York"
  },
  {
    day: 1, id: "d1-11", time: "21:30", endTime: "22:00",
    name: "Caminata a Koreatown",
    description: "Caminar por Broadway/6ta Av al sur hasta la Calle 32.",
    transport: null,
    cost: 0, free: true,
    location: "Midtown Sur",
    coords: [40.7484, -73.9878],
    type: "walk",
    tips: [
      "La 32nd Street entre 5ta y Broadway es el corazón de Koreatown",
      "Los letreros en coreano y la energía nocturna son únicos en NYC",
      "Son solo ~10 min caminando desde Times Square",
      "Esta zona es activa hasta muy tarde"
    ],
    mapsQuery: "Koreatown+32nd+Street+New+York"
  },
  {
    day: 1, id: "d1-12", time: "22:00", endTime: "23:15",
    name: "K-Town: Food Gallery 32",
    description: "Snack nocturno rápido en Food Gallery 32. Comida coreana variada en un mercado cubierto.",
    transport: null,
    cost: 8.00, free: false,
    location: "Koreatown",
    coords: [40.7484, -73.9878],
    type: "food",
    tips: [
      "Food Gallery 32: mercado de comida coreana en el piso 2 de W 32nd St",
      "Prueba el tteokbokki (pastel de arroz picante) o kimbap",
      "Los precios son más bajos que los restaurantes formales de K-Town",
      "Abierto hasta tarde — muy popular entre noctámbulos"
    ],
    mapsQuery: "Food+Gallery+32+Koreatown+32nd+Street+New+York"
  },
  {
    day: 1, id: "d1-13", time: "23:15", endTime: "23:45",
    name: "Regreso al Hotel",
    description: "Tomar N/Q/R/W en Herald Sq (una parada) o caminar 15 min al hotel.",
    transport: "N/Q/R/W o caminata",
    cost: 3.00, free: false,
    location: "Hell's Kitchen",
    coords: [40.7574, -74.0003],
    type: "transport",
    tips: [
      "Herald Square está a 2 min caminando — toma el N/Q/R/W una parada a 42 St",
      "O simplemente camina 15 min por la 42nd St hacia el oeste — es seguro",
      "El hotel está en la 42nd y 9na Av, muy cerca de todo"
    ],
    mapsQuery: "400+West+42nd+Street+Hell%27s+Kitchen+New+York"
  },

  // ─── DÍA 2 — 21 MAYO ────────────────────────────────────────────────────
  {
    day: 2, id: "d2-1", time: "07:30", endTime: "08:15",
    name: "Desayuno: Bodega BEC",
    description: "Sándwich Bacon, Egg & Cheese en bodega de la 9na Av.",
    transport: null,
    cost: 5.00, free: false,
    location: "Hell's Kitchen",
    coords: [40.7574, -74.0003],
    type: "food",
    tips: [
      "BEC = Bacon, Egg & Cheese: el desayuno más icónico de NYC",
      "Pídelo en roll, bagel o croissant",
      "El café de bodega ('bodega coffee') es delicioso y barato",
      "Las bodegas de la 9na Av abren desde las 5-6 AM"
    ],
    mapsQuery: "Bodega+9th+Ave+Hell%27s+Kitchen+New+York"
  },
  {
    day: 2, id: "d2-2", time: "08:15", endTime: "08:45",
    name: "Caminata a Hudson Yards",
    description: "Caminar por la 9na Av al sur hasta la 34, luego al oeste hacia el río.",
    transport: null,
    cost: 0, free: true,
    location: "West Side",
    coords: [40.7549, -74.0020],
    type: "walk",
    tips: [
      "La caminata desde el hotel toma ~25-30 minutos",
      "La 9na Av en Hell's Kitchen tiene panaderías y cafeterías abiertas temprano",
      "Hudson Yards es el desarrollo urbano más nuevo y caro de NYC",
      "Buena forma de calentar piernas antes del día largo"
    ],
    mapsQuery: "Hudson+Yards+New+York"
  },
  {
    day: 2, id: "d2-3", time: "08:45", endTime: "10:00",
    name: "High Line & The Vessel",
    description: "Ver la estructura del Vessel y caminar el High Line hacia el sur.",
    transport: null,
    cost: 0, free: true,
    location: "Hudson Yards / West Side",
    coords: [40.7480, -74.0048],
    type: "walk",
    tips: [
      "The Vessel: estructura de 16 pisos con 154 escaleras interconectadas",
      "The High Line: parque elevado sobre antigua vía de tren (~2.3 km)",
      "Camina de norte a sur desde Hudson Yards hasta 14th St",
      "Arte público y vistas al río Hudson en toda la ruta"
    ],
    mapsQuery: "The+High+Line+30th+St+entrance+New+York"
  },
  {
    day: 2, id: "d2-4", time: "10:00", endTime: "11:30",
    name: "NYPL & Bryant Park",
    description: "Tomar Línea 7 (Morada) en 34 St-Hudson Yards directo a la 5ta Avenida.",
    transport: "Línea 7 a 5th Ave",
    cost: 3.00, free: false,
    location: "Midtown",
    coords: [40.7536, -73.9832],
    type: "attraction",
    tips: [
      "La Rose Main Reading Room es una de las salas más bellas del mundo",
      "Entrada completamente gratis; abre a las 10:00 AM",
      "Los leones se llaman 'Patience' y 'Fortitude'",
      "Bryant Park (detrás): ideal para descansar antes de Grand Central"
    ],
    mapsQuery: "New+York+Public+Library+42nd+St+5th+Ave"
  },
  {
    day: 2, id: "d2-5", time: "11:30", endTime: "12:15",
    name: "Grand Central Terminal",
    description: "Caminar por la Calle 42 hacia el este para ver el vestíbulo principal.",
    transport: null,
    cost: 0, free: true,
    location: "Midtown Este",
    coords: [40.7527, -73.9772],
    type: "attraction",
    tips: [
      "El techo azul con constelaciones doradas es lo más fotogénico",
      "Secreto: el 'Whispering Gallery' fuera del Oyster Bar (susurra en la esquina)",
      "Baja al Lower Concourse para ver el mercado de alimentos artesanales",
      "5 min caminando hacia el este desde la NYPL por la 42nd St"
    ],
    mapsQuery: "Grand+Central+Terminal+New+York"
  },
  {
    day: 2, id: "d2-6", time: "12:15", endTime: "13:00",
    name: "Almuerzo: Halal o Pizza",
    description: "Carrito Halal (53rd & 6th Av) o 2 Bros Pizza cerca de Grand Central.",
    transport: null,
    cost: 6.00, free: false,
    location: "Midtown",
    coords: [40.7540, -73.9867],
    type: "food",
    tips: [
      "Halal Guys (53rd & 6th Av): el carrito más famoso de NYC; pide combo pollo+arroz",
      "Salsa blanca + poca salsa roja (es MUY picante)",
      "2 Bros Pizza: $1.50 por slice, busca sucursal en Midtown",
      "Come rápido — el MET te espera"
    ],
    mapsQuery: "Halal+Guys+53rd+6th+Ave+New+York"
  },
  {
    day: 2, id: "d2-7", time: "13:00", endTime: "13:30",
    name: "Metro al MET",
    description: "Tomar Línea 4/5/6 (Verde) en Grand Central hacia 86th St.",
    transport: "4/5/6 a 86th St",
    cost: 3.00, free: false,
    location: "Metro",
    coords: [40.7794, -73.9632],
    type: "transport",
    tips: [
      "Las líneas 4, 5 y 6 salen del nivel subterráneo de Grand Central",
      "Bájate en 86th St-Lexington Ave y camina hacia el oeste (~10 min)",
      "El MET está en la 5ta Av y 82nd St"
    ],
    mapsQuery: "86th+St+Lexington+Ave+4+5+6+Train+Station"
  },
  {
    day: 2, id: "d2-8", time: "13:30", endTime: "16:30",
    name: "Museo MET",
    description: "Explorar colecciones principales: Arte Clásico, Arte Egipcio (Templo de Dendur).",
    transport: null,
    cost: 30.00, free: false,
    location: "Upper East Side",
    coords: [40.7794, -73.9632],
    type: "attraction",
    tips: [
      "¡La entrada incluye acceso el mismo día al Met Cloisters!",
      "Must-see: Templo de Dendur (Sala 131, Sección Egipcia)",
      "Galería de Armaduras medievales: única en el mundo",
      "Rooftop Garden (temporada primavera): vistas increíbles a Central Park",
      "Reserva ticket online para evitar filas"
    ],
    mapsQuery: "Metropolitan+Museum+of+Art+New+York"
  },
  {
    day: 2, id: "d2-9", time: "16:30", endTime: "17:45",
    name: "Central Park",
    description: "Salir del MET y caminar al sur (Bethesda Terrace, The Mall).",
    transport: null,
    cost: 0, free: true,
    location: "Central Park",
    coords: [40.7812, -73.9665],
    type: "walk",
    tips: [
      "Salida del MET directamente al parque (puerta lateral oeste)",
      "Bethesda Terrace (72nd St): fuente más fotogénica del parque",
      "The Mall: avenida de olmos americanos y artistas callejeros",
      "Strawberry Fields (72nd St): homenaje a John Lennon"
    ],
    mapsQuery: "Bethesda+Terrace+Central+Park+New+York"
  },
  {
    day: 2, id: "d2-10", time: "17:45", endTime: "18:30",
    name: "Roosevelt Island Tram",
    description: "Usar teleférico ida y vuelta desde 60th St/2nd Ave.",
    transport: "Teleférico (OMNY)",
    cost: 3.00, free: false,
    location: "East River",
    coords: [40.7569, -73.9542],
    type: "attraction",
    tips: [
      "Mismo precio que el metro ($3), usa OMNY",
      "Vistas únicas del East River y skyline de Midtown desde el aire",
      "Sube, da una vuelta rápida en Roosevelt Island y regresa",
      "Sale cada ~15 min; experiencia que muy pocos turistas hacen"
    ],
    mapsQuery: "Roosevelt+Island+Tramway+60th+St+2nd+Ave"
  },
  {
    day: 2, id: "d2-11", time: "18:30", endTime: "19:00",
    name: "Hacia el Rockefeller Center",
    description: "Caminar hacia el sur por la 5ta/6ta Avenida hasta el Rockefeller Center.",
    transport: null,
    cost: 0, free: true,
    location: "Midtown",
    coords: [40.7587, -73.9787],
    type: "walk",
    tips: [
      "Desde el tram camina ~30 min por la 5ta Av al sur",
      "Pasarás frente a Bloomingdale's, Bergdorf Goodman y la Catedral de San Patricio",
      "La tienda de Apple en la 5ta Av (cubo de vidrio) es una parada fotogénica",
      "El Rockefeller Center tiene el canal de hielo en invierno"
    ],
    mapsQuery: "Rockefeller+Center+5th+Ave+New+York"
  },
  {
    day: 2, id: "d2-12", time: "19:00", endTime: "20:30",
    name: "Top of the Rock",
    description: "Mirador en piso 70 del Rockefeller Center para atardecer y encendido de luces.",
    transport: null,
    cost: 45.00, free: false,
    location: "Rockefeller Center",
    coords: [40.7587, -73.9787],
    type: "attraction",
    tips: [
      "¡Reserva ticket online! La fila sin reserva puede ser de 1 hora",
      "Las 7-8 PM son el mejor horario: atardecer + luces de la ciudad encendiéndose",
      "Vista ÚNICA del Empire State Building (a diferencia del Empire State, que no se ve a sí mismo)",
      "Hay 3 niveles de terraza; el nivel 70 es el más alto y espectacular",
      "Trae un abrigo — hace frío en la terraza aunque sea primavera"
    ],
    mapsQuery: "Top+of+the+Rock+Rockefeller+Center+New+York"
  },
  {
    day: 2, id: "d2-13", time: "20:30", endTime: "21:30",
    name: "Cena: Joe's Pizza",
    description: "Porciones de pizza clásica en Broadway, Times Square.",
    transport: null,
    cost: 9.00, free: false,
    location: "Times Square",
    coords: [40.7580, -73.9855],
    type: "food",
    tips: [
      "Joe's Pizza: Broadway y 44th St, el clásico inmortal de NYC",
      "Pide 2-3 slices de queso simple para el sabor auténtico",
      "Dóblalo por la mitad al estilo New York para comer sin ensuciarte",
      "Come parado viendo las luces de Times Square — experiencia completa"
    ],
    mapsQuery: "Joe%27s+Pizza+Times+Square+Broadway+44th"
  },
  {
    day: 2, id: "d2-14", time: "21:30", endTime: "23:30",
    name: "Rudy's Bar & Grill",
    description: "Cerveza barata y hot dog gratis en la 9na Av con Calle 44. A 3 min del hotel.",
    transport: null,
    cost: 5.00, free: false,
    location: "Hell's Kitchen",
    coords: [40.7601, -73.9900],
    type: "night",
    tips: [
      "Rudy's: bar auténtico de Hell's Kitchen desde 1933",
      "¡Hot dog gratis con cada cerveza pedida!",
      "La cerveza de barril más barata de Midtown Manhattan",
      "A solo 3 minutos caminando del hotel — última parada perfecta"
    ],
    mapsQuery: "Rudy%27s+Bar+Grill+Hell%27s+Kitchen+9th+Ave+New+York"
  },
  {
    day: 2, id: "d2-15", time: "23:30", endTime: "23:33",
    name: "A dormir",
    description: "Caminata de 3 minutos al alojamiento en la 42nd St.",
    transport: null,
    cost: 0, free: true,
    location: "Hell's Kitchen",
    coords: [40.7574, -74.0003],
    type: "transport",
    tips: [
      "El hotel está literalmente a la vuelta de la esquina",
      "Fueron dos días increíbles — ¡bien merecido el descanso!",
      "Guarda tus recuerdos, fotos y experiencias de NYC"
    ],
    mapsQuery: "400+West+42nd+Street+Hell%27s+Kitchen+New+York"
  }
];

const DAY_META = {
  0: { label: 'Llegada',  date: '18 Mayo', subtitle: 'JFK → Hell\'s Kitchen → Bushwick' },
  1: { label: 'Día 1',   date: '20 Mayo', subtitle: 'Estatua · Downtown · Brooklyn' },
  2: { label: 'Día 2',   date: '21 Mayo', subtitle: 'Midtown · MET · Top of the Rock' }
};

const TRIP_DATES = { 0: '2026-05-18', 1: '2026-05-20', 2: '2026-05-21' };

const DAY_TOTALS = {
  0: TRIP_DATA.filter(a => a.day === 0).reduce((s, a) => s + a.cost, 0),
  1: TRIP_DATA.filter(a => a.day === 1).reduce((s, a) => s + a.cost, 0),
  2: TRIP_DATA.filter(a => a.day === 2).reduce((s, a) => s + a.cost, 0)
};

const GRAND_TOTAL = DAY_TOTALS[0] + DAY_TOTALS[1] + DAY_TOTALS[2];
