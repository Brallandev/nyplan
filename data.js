const TRIP_DATA = [
  // ─── DAY 1 ───────────────────────────────────────────────────────────────
  {
    day: 1, id: "d1-1", time: "07:30", endTime: "08:15",
    name: "Desayuno: Hotcakes y Tocino",
    description: "Ir a un McDonald's en Astoria cerca de tu estación para el combo de hotcakes, tocino y maple.",
    transport: null,
    cost: 7.00, free: false,
    location: "Astoria, Queens",
    coords: [40.7722, -73.9301],
    type: "food",
    tips: [
      "El combo de desayuno termina a las 10:30 AM, no te quedes dormido",
      "Busca el McDonald's más cercano a tu hotel en Ditmars Blvd",
      "Ve temprano para evitar filas de commuters"
    ],
    mapsQuery: "McDonald%27s+Astoria+Queens+NY"
  },
  {
    day: 1, id: "d1-2", time: "08:15", endTime: "09:00",
    name: "Metro al Sur",
    description: "Tomar Líneas N o W desde Astoria directo a la estación Whitehall St-South Ferry.",
    transport: "Tren N o W",
    cost: 3.00, free: false,
    location: "Metro (N/W)",
    coords: [40.7064, -74.0134],
    type: "transport",
    tips: [
      "Usa OMNY: toca tu tarjeta de crédito/débito directamente en el torniquete",
      "El viaje dura ~35 min; siéntate y relájate",
      "Bájate en Whitehall St-South Ferry (última parada del tren N/W hacia el sur)"
    ],
    mapsQuery: "Whitehall+St+South+Ferry+Station+NYC"
  },
  {
    day: 1, id: "d1-3", time: "09:00", endTime: "10:15",
    name: "Staten Island Ferry",
    description: "Abordar en Whitehall Terminal. Disfrutar las vistas de la Estatua de la Libertad y reembarcar de inmediato.",
    transport: null,
    cost: 0, free: true,
    location: "Whitehall Terminal",
    coords: [40.7013, -74.0131],
    type: "attraction",
    tips: [
      "¡Completamente gratis! No hay truco",
      "Mejores vistas: cubierta exterior del lado izquierdo al salir de Manhattan (babor)",
      "El ferry sale cada 30 min; no necesitas bajarte en Staten Island",
      "Llega 10 min antes para asegurar buen lugar en cubierta exterior"
    ],
    mapsQuery: "Whitehall+Ferry+Terminal+Manhattan"
  },
  {
    day: 1, id: "d1-4", time: "10:15", endTime: "12:30",
    name: "Wall Street & Oculus",
    description: "Caminar al Charging Bull, Wall St, 9/11 Memorial y entrar al Oculus (todo a pie).",
    transport: null,
    cost: 0, free: true,
    location: "Distrito Financiero",
    coords: [40.7069, -74.0089],
    type: "attraction",
    tips: [
      "Charging Bull: Broadway y Morris St (5 min caminando desde el ferry)",
      "9/11 Memorial (piscinas) gratis; el museo interior tiene costo (~$33)",
      "El Oculus: la estación de metro más cara y hermosa del mundo ($4 mil millones)",
      "Ruta sugerida: Bull → Wall St → Trinity Church → 9/11 Memorial → Oculus"
    ],
    mapsQuery: "Charging+Bull+Wall+Street+New+York"
  },
  {
    day: 1, id: "d1-5", time: "12:30", endTime: "14:00",
    name: "Almuerzo: Dumplings en Chinatown",
    description: "Tomar Línea R/W a Canal St. Comer en Shu Jiao Fu Zhou o Fried Dumpling.",
    transport: "Tren R o W a Canal St",
    cost: 5.00, free: false,
    location: "Chinatown",
    coords: [40.7181, -74.0002],
    type: "food",
    tips: [
      "Fried Dumpling (46 Mosco St): 5 dumplings fritos por $1.25",
      "Shu Jiao Fu Zhou: dumplings hervidos artesanales, muy auténtico",
      "Pide cerdo y repollo (los clásicos) o gambas",
      "Explora Chinatown: Canal St tiene tiendas curiosas baratas"
    ],
    mapsQuery: "Fried+Dumpling+Chinatown+New+York"
  },
  {
    day: 1, id: "d1-6", time: "14:00", endTime: "15:30",
    name: "Puente de Brooklyn",
    description: "Cruzar caminando desde City Hall hacia Brooklyn. Vista panorámica del skyline.",
    transport: null,
    cost: 0, free: true,
    location: "Brooklyn Bridge",
    coords: [40.7057, -73.9964],
    type: "walk",
    tips: [
      "Entrada peatonal: Park Row y Centre St, junto a City Hall Park",
      "El cruce completo toma ~35-40 min",
      "Lleva agua, no hay tiendas en el puente",
      "Mantente en el carril peatonal (bicicletas tienen su propio carril)",
      "Mejor foto: mira hacia atrás (Manhattan) a mitad del puente"
    ],
    mapsQuery: "Brooklyn+Bridge+pedestrian+entrance+Manhattan"
  },
  {
    day: 1, id: "d1-7", time: "15:30", endTime: "18:30",
    name: "Brooklyn Heights & DUMBO",
    description: "Desvío por Brooklyn Heights Promenade y luego bajar a Pebble Beach y Washington St.",
    transport: null,
    cost: 0, free: true,
    location: "DUMBO, Brooklyn",
    coords: [40.7033, -73.9902],
    type: "walk",
    tips: [
      "DUMBO = Down Under the Manhattan Bridge Overpass",
      "Foto icónica: esquina de Washington St & Water St (arco del puente encuadrado)",
      "Pebble Beach: playa de piedras con vistas al Manhattan Bridge",
      "Brooklyn Heights Promenade: 800m de paseo con vistas espectaculares al río"
    ],
    mapsQuery: "DUMBO+Brooklyn+Washington+St+Water+St"
  },
  {
    day: 1, id: "d1-8", time: "18:30", endTime: "19:30",
    name: "Cena: Shake Shack",
    description: "Hamburguesa doble debajo del puente de Brooklyn. Comer en el parque al aire libre.",
    transport: null,
    cost: 14.00, free: false,
    location: "DUMBO, Brooklyn",
    coords: [40.7024, -73.9876],
    type: "food",
    tips: [
      "Pide el ShackBurger doble (2 smash burgers)",
      "Las papas crinkle-cut son imperdibles",
      "Come al aire libre con vista al Manhattan Bridge: experiencia única",
      "Puede haber fila de 10-15 min; vale la pena"
    ],
    mapsQuery: "Shake+Shack+DUMBO+Brooklyn"
  },
  {
    day: 1, id: "d1-9", time: "19:30", endTime: "21:00",
    name: "Caminata Nocturna: Brooklyn Bridge Park",
    description: "Caminar por el Brooklyn Bridge Park iluminado. Vistas nocturnas del skyline de Manhattan.",
    transport: null,
    cost: 0, free: true,
    location: "Brooklyn Bridge Park",
    coords: [40.6996, -73.9970],
    type: "night",
    tips: [
      "El parque está abierto hasta medianoche",
      "Pier 1 tiene las mejores vistas nocturnas del skyline",
      "La brisa del río es refrescante en verano",
      "Buen momento para reflexionar y tomar fotos nocturnas de larga exposición"
    ],
    mapsQuery: "Brooklyn+Bridge+Park+Pier+1"
  },
  {
    day: 1, id: "d1-10", time: "21:00", endTime: "22:00",
    name: "Regreso a Astoria",
    description: "Caminar a York St (Línea F) → Herald Square → transbordo a N/W hacia Astoria.",
    transport: "F → N/W",
    cost: 3.00, free: false,
    location: "Metro (F → N/W)",
    coords: [40.7009, -73.9866],
    type: "transport",
    tips: [
      "York St Station (Línea F) a ~10 min caminando desde el parque",
      "En Herald Square (34th St) transborda a N o W direction Astoria",
      "El trayecto completo toma ~45 min",
      "Trenes nocturnos menos frecuentes; revisa MTA app"
    ],
    mapsQuery: "York+St+F+Train+Station+DUMBO+Brooklyn"
  },

  // ─── DAY 2 ───────────────────────────────────────────────────────────────
  {
    day: 2, id: "d2-1", time: "07:30", endTime: "08:15",
    name: "Desayuno: Bodega BEC",
    description: "Sándwich de Bacon, Egg & Cheese y café en cualquier bodega de esquina en Astoria.",
    transport: null,
    cost: 5.00, free: false,
    location: "Astoria, Queens",
    coords: [40.7722, -73.9301],
    type: "food",
    tips: [
      "BEC = Bacon, Egg & Cheese: el desayuno más icónico de NYC",
      "Pídelo en un roll, bagel o croissant",
      "El 'bodega coffee' (café con leche y azúcar) es la bebida local perfecta",
      "Las bodegas abren desde las 6:00 AM o antes"
    ],
    mapsQuery: "Bodega+Deli+Astoria+Queens+NY"
  },
  {
    day: 2, id: "d2-2", time: "08:15", endTime: "09:00",
    name: "Metro a Hudson Yards",
    description: "Líneas N/W a Times Square, transbordo a Línea 7 hasta 34 St-Hudson Yards.",
    transport: "N/W → Línea 7",
    cost: 3.00, free: false,
    location: "Metro (N/W → 7)",
    coords: [40.7549, -74.0020],
    type: "transport",
    tips: [
      "El tren 7 es la única línea que llega a Hudson Yards (extremo oeste)",
      "Viaje desde Astoria: ~30 min",
      "Transbordo en Times Square (42nd St): sigue letreros a la Línea 7"
    ],
    mapsQuery: "34+St+Hudson+Yards+7+Train+Station"
  },
  {
    day: 2, id: "d2-3", time: "09:00", endTime: "10:30",
    name: "High Line & The Vessel",
    description: "Ver el Vessel desde la base y caminar The High Line hacia el sur.",
    transport: null,
    cost: 0, free: true,
    location: "Hudson Yards / West Side",
    coords: [40.7548, -74.0022],
    type: "walk",
    tips: [
      "The Vessel: estructura de 16 pisos y 154 escaleras (requiere ticket gratis online)",
      "The High Line: parque elevado en antigua vía de ferrocarril del siglo XX",
      "Camina de norte a sur: desde Hudson Yards hasta 14th St (~2.3 km)",
      "Arte público en toda la ruta; hay bancos para descansar",
      "Entrada al High Line: escaleras en cada cuadra de la Av 10"
    ],
    mapsQuery: "The+High Line+30th+St+entrance+New+York"
  },
  {
    day: 2, id: "d2-4", time: "10:30", endTime: "11:45",
    name: "NYPL & Bryant Park",
    description: "Línea 7 a 5ta Avenida. Entrar a la Biblioteca Pública de Nueva York (Rose Main Room).",
    transport: "Línea 7 a 5th Ave",
    cost: 0, free: true,
    location: "Midtown",
    coords: [40.7536, -73.9832],
    type: "attraction",
    tips: [
      "La Rose Main Reading Room es una de las salas más bellas del mundo",
      "Entrada completamente gratis; abre a las 10:00 AM (L-V) y 11:00 AM (S-D)",
      "Los leones de mármol en la entrada se llaman 'Patience' y 'Fortitude'",
      "Bryant Park (detrás): ideal para sentarse y tomar un descanso"
    ],
    mapsQuery: "New+York+Public+Library+42nd+St+5th+Ave"
  },
  {
    day: 2, id: "d2-5", time: "11:45", endTime: "12:30",
    name: "Grand Central Terminal",
    description: "Caminar por la Calle 42 hacia el este (5 min). El techo de constelaciones es lo más icónico.",
    transport: null,
    cost: 0, free: true,
    location: "Midtown Este",
    coords: [40.7527, -73.9772],
    type: "attraction",
    tips: [
      "El techo azul con constelaciones doradas es impresionante",
      "Secreto: el 'Whispering Gallery' fuera del Oyster Bar (susurra a la esquina)",
      "Baja al Lower Concourse para ver el famoso mercado de alimentos",
      "Free self-guided audio tour disponible en la app Grand Central"
    ],
    mapsQuery: "Grand+Central+Terminal+New+York"
  },
  {
    day: 2, id: "d2-6", time: "12:30", endTime: "13:15",
    name: "Almuerzo: Halal o Pizza",
    description: "Carrito Halal (53rd & 6th Av) o 2 Bros Pizza ($1.50 el slice) cerca de Grand Central.",
    transport: null,
    cost: 6.00, free: false,
    location: "Midtown",
    coords: [40.7540, -73.9867],
    type: "food",
    tips: [
      "Halal Guys (53rd & 6th Av): el carrito más famoso de NYC, cola de 20 min típica",
      "Pide combo de pollo y arroz con salsa blanca + salsa roja (poca si no toleras picante)",
      "2 Bros Pizza: busca cualquier sucursal en Midtown, $1.50 por slice",
      "Los slices de NYC son enormes, con 2 tienes suficiente"
    ],
    mapsQuery: "Halal+Guys+53rd+6th+Ave+New+York"
  },
  {
    day: 2, id: "d2-7", time: "13:15", endTime: "13:45",
    name: "Metro al MET",
    description: "Desde Grand Central tomar Línea 4, 5 o 6 (Verde) hacia el norte hasta 86th St.",
    transport: "4/5/6 a 86th St",
    cost: 3.00, free: false,
    location: "Metro (4/5/6)",
    coords: [40.7794, -73.9632],
    type: "transport",
    tips: [
      "Las líneas 4, 5 y 6 salen del nivel subterráneo de Grand Central",
      "Bájate en 86th St-Lexington Ave y camina hacia el oeste",
      "El MET está en la 5ta Av y 82nd St (10 min a pie desde 86th)"
    ],
    mapsQuery: "86th+St+Lexington+Ave+4+5+6+Train+Station"
  },
  {
    day: 2, id: "d2-8", time: "13:45", endTime: "16:30",
    name: "Museo MET",
    description: "Explorar colecciones principales: Arte Egipcio, Armaduras Medievales, Arte Griego y Romano.",
    transport: null,
    cost: 30.00, free: false,
    location: "Upper East Side",
    coords: [40.7794, -73.9632],
    type: "attraction",
    tips: [
      "¡La entrada incluye acceso el mismo día al Met Cloisters (uptown)!",
      "Must-see: Templo de Dendur (Sección Egipcia, Sala 131)",
      "Galería de Armaduras medievales: única en el mundo",
      "Rooftop Garden (temporada): vistas increíbles a Central Park",
      "Tip: reserva ticket online para evitar fila"
    ],
    mapsQuery: "Metropolitan+Museum+of+Art+New+York"
  },
  {
    day: 2, id: "d2-9", time: "16:30", endTime: "18:30",
    name: "Central Park",
    description: "Salir del MET directo al parque. Caminar hacia el sur: Bethesda Fountain y Sheep Meadow.",
    transport: null,
    cost: 0, free: true,
    location: "Central Park",
    coords: [40.7812, -73.9665],
    type: "walk",
    tips: [
      "Salida del MET directamente al parque (puerta lateral oeste del museo)",
      "Bethesda Fountain (84th St): la fuente más fotogénica del parque",
      "Sheep Meadow: gran prado para descansar; prohibidas las bicicletas",
      "Strawberry Fields (72nd St): homenaje a John Lennon",
      "El parque tiene 341 hectáreas; no intentes verlo todo"
    ],
    mapsQuery: "Bethesda+Fountain+Central+Park+New+York"
  },
  {
    day: 2, id: "d2-10", time: "18:30", endTime: "19:30",
    name: "Roosevelt Island Tram",
    description: "Esquina sureste del parque (60th/2nd Ave): usar el teleférico de ida y vuelta sobre el East River.",
    transport: "Teleférico (OMNY/MetroCard)",
    cost: 3.00, free: false,
    location: "East River",
    coords: [40.7569, -73.9542],
    type: "attraction",
    tips: [
      "Mismo precio que el metro ($3), usa OMNY",
      "Vistas únicas del East River y skyline de Midtown desde el aire",
      "Sube, baja en Roosevelt Island, da una vuelta rápida y regresa",
      "Sale cada ~15 min; experiencia que muy pocos turistas hacen"
    ],
    mapsQuery: "Roosevelt+Island+Tramway+60th+St+2nd+Ave"
  },
  {
    day: 2, id: "d2-11", time: "19:30", endTime: "21:30",
    name: "Cena: Joe's Pizza",
    description: "Tomar metro a Times Square y comer la pizza más famosa de NYC en Broadway.",
    transport: "Subway a Times Square",
    cost: 9.00, free: false,
    location: "Times Square",
    coords: [40.7580, -73.9855],
    type: "food",
    tips: [
      "Joe's Pizza: Broadway y 44th St (en el corazón de Times Square)",
      "Pide 2-3 slices de queso simple para sentir el sabor auténtico",
      "Dóblalo por la mitad al estilo Nueva York para comer sin ensuciarte",
      "Come parado o busca un banco en Times Square para ver las luces"
    ],
    mapsQuery: "Joe%27s+Pizza+Times+Square+Broadway+44th"
  },
  {
    day: 2, id: "d2-12", time: "21:30", endTime: "23:30",
    name: "Rudy's Bar & Grill",
    description: "Caminar a la 9na Av en Hell's Kitchen. Cerveza barata, hot dog gratis y buen ambiente.",
    transport: null,
    cost: 5.00, free: false,
    location: "Hell's Kitchen",
    coords: [40.7601, -73.9900],
    type: "night",
    tips: [
      "Rudy's: uno de los bares más auténticos y baratos de NYC desde 1933",
      "¡Hot dog gratis con cada cerveza pedida!",
      "La cerveza de barril más barata de Midtown Manhattan",
      "Bar de vecindario, no turístico: ambiente genuino neoyorquino",
      "Prueba la Rudy's Red (su cerveza especial de la casa)"
    ],
    mapsQuery: "Rudy%27s+Bar+Grill+Hell%27s+Kitchen+9th+Ave+New+York"
  },
  {
    day: 2, id: "d2-13", time: "23:30", endTime: "00:15",
    name: "Regreso a Astoria",
    description: "Caminar a Times Sq/49th St y tomar Líneas N o W directo a casa.",
    transport: "N o W desde Times Square",
    cost: 3.00, free: false,
    location: "Metro (N/W)",
    coords: [40.7598, -73.9816],
    type: "transport",
    tips: [
      "Estación más conveniente: 49th St o Times Sq/42nd St",
      "El trayecto a Astoria toma ~25 min",
      "Trenes N y W frecuentes incluso a medianoche",
      "¡Bien dormido! Fueron dos días intensos"
    ],
    mapsQuery: "Times+Square+42nd+St+N+W+Train+Station"
  }
];

const DAY_TOTALS = {
  1: TRIP_DATA.filter(a => a.day === 1).reduce((s, a) => s + a.cost, 0),
  2: TRIP_DATA.filter(a => a.day === 2).reduce((s, a) => s + a.cost, 0)
};

const GRAND_TOTAL = DAY_TOTALS[1] + DAY_TOTALS[2];
