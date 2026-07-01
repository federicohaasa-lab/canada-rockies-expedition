/* =====================================================================
   CANADIAN ROCKIES EXPEDITION — Structured itinerary data
   Single source of truth for the dashboard (index.html) and the
   editorial PDF (pdf.html). Itinerary content is NOT modified: routes,
   days and treks are exactly as provided. Everything else (suggested
   schedules, food, logistics, photography, alerts, gear, budget) is an
   added premium layer.
   ===================================================================== */
window.ITINERARY = {
  meta: {
    title: "Canadian Rockies Expedition",
    subtitle: "Calgary · Jasper · Banff — Icefields Parkway",
    tagline: "Ocho días entre glaciares, lagos turquesa y las cumbres más altas de las Rocosas canadienses.",
    dates: "5 – 13 Agosto 2026",
    datesOnGround: "6 – 13 Agosto · 8 días en Canadá",
    party: "Expedición privada · 4 viajeros",
    travelers: [
      { name: "Freddy", age: 58 },
      { name: "Carola", age: 57 },
      { name: "Fede", age: 26 },
      { name: "Benja", age: 23 }
    ],
    baseCities: ["Calgary", "Jasper", "Banff"],
    routeLine: "Calgary → Banff → Icefields Parkway → Jasper → Mount Robson → Banff → Calgary",
    flight: {
      out: "LATAM · Santiago de Chile (SCL) 23:25 · 5 Ago",
      layover: "Escala Los Ángeles (LAX) — llegada 07:45 · salida 13:15",
      arrive: "Calgary (YYC) · 6 Ago",
      note: "Vuelo operado por LATAM. Se aterriza en Calgary el 6 de agosto para iniciar la expedición."
    }
  },

  stats: [
    { icon: "🗓️", value: "8", label: "Días en Canadá", sub: "6 – 13 Ago" },
    { icon: "🏙️", value: "3", label: "Ciudades base", sub: "Calgary · Jasper · Banff" },
    { icon: "🛣️", value: "≈1.190", label: "Kilómetros", sub: "Road trip total" },
    { icon: "🚗", value: "≈18 h", label: "Al volante", sub: "Tiempo de conducción" },
    { icon: "🏞️", value: "3", label: "Parques", sub: "Banff · Jasper · Mt Robson" },
    { icon: "💧", value: "6", label: "Lagos icónicos", sub: "Peyto · Maligne · Berg…" },
    { icon: "🧊", value: "3", label: "Glaciares", sub: "Columbia Icefield" },
    { icon: "🥾", value: "5", label: "Grandes trekkings", sub: "1 épico +8 h" },
    { icon: "📸", value: "12", label: "Highlights foto", sub: "Miradores icónicos" }
  ],

  /* Ordered waypoints for the master route polyline */
  routePath: [
    [51.0447, -114.0719], [51.1784, -115.5708], [51.4254, -116.1773],
    [51.7161, -116.5261], [52.2206, -117.2233], [52.6642, -117.8850],
    [52.8737, -118.0814], [53.0353, -119.2360], [53.1394, -119.1461],
    [52.8737, -118.0814], [52.7275, -117.6428], [52.1936, -117.1817],
    [51.1784, -115.5708], [51.2497, -115.4130], [51.0447, -114.0719]
  ],

  /* ---------------------------------------------------------------
     LOCATIONS / POINTS OF INTEREST
     type: city | lake | glacier | waterfall | mountain | trek
     --------------------------------------------------------------- */
  locations: [
    {
      id: "calgary", name: "Calgary", type: "city", coords: [51.0447, -114.0719],
      img: "assets/img/photos/calgary.jpg", credit: "DXR / Wikimedia Commons",
      short: "Puerta de entrada a las Rocosas.",
      description: "Ciudad de partida y regreso. Aquí se recoge el vehículo, se compran provisiones y el bear spray (no se puede volar con él), y se hace el último aprovisionamiento antes de la montaña. Aeropuerto internacional YYC.",
      duration: "1 noche (Día 0 y 7)", difficulty: null, bestTime: "Atardecer sobre el Bow River",
      photoTips: "Skyline desde McHugh Bluff o Prince's Island Park a la hora dorada (~20:30).",
      days: [0, 1, 7], popularity: 3, reservation: "Reservar auto SUV/AWD con antelación."
    },
    {
      id: "banff_town", name: "Banff", type: "city", coords: [51.1784, -115.5708],
      img: "assets/img/photos/banff_town.jpg", credit: "Adam Bishop / Wikimedia Commons",
      short: "Pueblo alpino icónico bajo Cascade Mountain.",
      description: "Corazón del Parque Nacional Banff y base de los últimos tres días. Banff Avenue enmarcada por Cascade Mountain, cafés, aguas termales (Banff Upper Hot Springs) y la góndola de Sulphur Mountain.",
      duration: "Base 3 noches (Días 4–6)", difficulty: null, bestTime: "Mañana temprano en Banff Ave",
      photoTips: "Cascade Mountain al final de Banff Avenue; Surprise Corner para el Fairmont Banff Springs.",
      days: [1, 4, 5, 6, 7], popularity: 5, reservation: "Alojamiento en alta temporada: reservar con meses de antelación."
    },
    {
      id: "lake_louise", name: "Lake Louise", type: "lake", coords: [51.4254, -116.1773],
      img: "assets/img/photos/lake_louise.jpg", credit: "Dietmar Rabich / Wikimedia Commons",
      short: "El lago glaciar más famoso del mundo (parada opcional en ruta).",
      description: "Sobre el corredor de la Icefields Parkway. Aguas turquesa bajo el glaciar Victoria y el Château Lake Louise. Parada opcional de camino a Jasper — el estacionamiento se llena muy temprano.",
      duration: "30–60 min (opcional)", difficulty: "Fácil", bestTime: "Antes de las 8:00 (parking + luz)",
      photoTips: "Orilla del château hacia el glaciar; reflejo perfecto sin viento a primera hora.",
      days: [1], optional: true, popularity: 5, reservation: "Parking se satura: llegar 06:30–08:00 o usar shuttle Parks Canada."
    },
    {
      id: "peyto_lake", name: "Peyto Lake", type: "lake", coords: [51.7161, -116.5261],
      img: "assets/img/photos/peyto_lake.jpg", credit: "Tobias Alt (Tobi 87) / Wikimedia Commons",
      short: "El lago con forma de cabeza de lobo.",
      description: "Desde el estacionamiento de Bow Summit, un corto paseo lleva al mirador sobre este lago de un turquesa irreal, alimentado por harina glaciar. Una de las vistas más fotografiadas de Canadá.",
      duration: "45 min – 1 h", difficulty: "Fácil", bestTime: "Media mañana (10:00–12:00)",
      photoTips: "Gran angular desde la plataforma superior; el color intensifica con sol alto. Sube al sendero lateral para evitar multitudes.",
      days: [1, 4], popularity: 5, reservation: "No requiere. Parking limitado — llegar temprano."
    },
    {
      id: "columbia_icefield", name: "Columbia Icefield · Athabasca Glacier", type: "glacier", coords: [52.2206, -117.2233],
      img: "assets/img/photos/columbia_icefield.jpg", credit: "Thomas Fuhrmann / Wikimedia Commons",
      short: "El mayor campo de hielo de las Rocosas.",
      description: "El Athabasca Glacier desciende desde el Columbia Icefield hasta el borde de la carretera. Opcionalmente: Ice Explorer (vehículo glaciar) y Skywalk sobre el precipicio. Punto medio de la Icefields Parkway.",
      duration: "1–2 h (3 h con tours)", difficulty: "Fácil", bestTime: "Mañana (menos gente, mejor luz)",
      photoTips: "Lengua del glaciar con figuras para escala; viento gélido — protege la cámara. Contraste de hielo azul y morrena.",
      days: [1, 4], popularity: 5, reservation: "Ice Explorer / Skywalk: reserva recomendada online."
    },
    {
      id: "athabasca_falls", name: "Athabasca Falls", type: "waterfall", coords: [52.6642, -117.8850],
      img: "assets/img/photos/athabasca_falls.jpg", credit: "Thomas Fuhrmann / Wikimedia Commons",
      short: "Cascada potente tallada en roca caliza.",
      description: "No la más alta pero sí de las más caudalosas de Jasper. Pasarelas y cañón esculpido por el río Athabasca. Parada final antes de llegar a Jasper.",
      duration: "30–45 min", difficulty: "Fácil", bestTime: "Mañana o tarde (luz suave)",
      photoTips: "Velocidad lenta (1/4–1s) + filtro ND para seda en el agua; cuidado con la neblina en la lente.",
      days: [1], popularity: 4, reservation: "No requiere."
    },
    {
      id: "jasper_town", name: "Jasper", type: "city", coords: [52.8737, -118.0814],
      img: "assets/img/photos/jasper_town.jpg", credit: "Florian Fuchs / Wikimedia Commons",
      short: "Base norte, capital del cielo oscuro.",
      description: "Pueblo tranquilo dentro del Parque Nacional Jasper y base de tres noches. Reserva de Cielo Oscuro (Dark Sky Preserve) — noches ideales para la Vía Láctea. Punto de partida a Mount Robson y Maligne Lake.",
      duration: "Base 3 noches (Días 1–3)", difficulty: null, bestTime: "Amanecer en Pyramid Lake",
      photoTips: "Pyramid Mountain reflejada al alba; astrofotografía desde Pyramid Island por la noche.",
      days: [1, 2, 3, 4], popularity: 4, reservation: "Alojamiento limitado — reservar con antelación."
    },
    {
      id: "mount_robson", name: "Mount Robson", type: "mountain", coords: [53.0353, -119.2360],
      img: "assets/img/photos/mount_robson.jpg", credit: "Michael Konen / Wikimedia Commons",
      short: "3.954 m — el techo de las Rocosas canadienses.",
      description: "La montaña más alta de las Rocosas canadienses, en el Parque Provincial Mount Robson (Columbia Británica). Punto de partida del legendario Berg Lake Trail. Crea su propio clima: nubes que aparecen y desaparecen en minutos.",
      duration: "Día completo", difficulty: "Exigente", bestTime: "Amanecer (cumbre despejada)",
      photoTips: "La cara norte suele estar nublada — paciencia. Reflejo en Kinney Lake a primera hora.",
      days: [2], popularity: 5, reservation: "Zona horaria del Pacífico (¡cambio de hora!)."
    },
    {
      id: "kinney_lake", name: "Kinney Lake", type: "lake", coords: [53.0603, -119.1889],
      img: "assets/img/photos/kinney_lake.jpg", credit: "The Cosmonaut / Wikimedia Commons",
      short: "Primer tramo esmeralda del Berg Lake Trail.",
      description: "A ~4,5 km del inicio del Berg Lake Trail, un lago verde esmeralda rodeado de bosque y paredes de roca. Puerta de entrada al Valle de las Mil Cascadas y a Berg Lake.",
      duration: "2–3 h ida y vuelta", difficulty: "Fácil–Moderado", bestTime: "Mañana (agua en calma)",
      photoTips: "Reflejo de Whitehorn Mountain sin viento; el verde intensifica con sol filtrado.",
      days: [2], popularity: 3, reservation: "Sección de Berg Lake Trail — verificar estado en BC Parks."
    },
    {
      id: "berg_lake", name: "Berg Lake", type: "lake", coords: [53.1394, -119.1461],
      img: "assets/img/photos/berg_lake.jpg", credit: "Joli Rumi / Wikimedia Commons",
      short: "Icebergs bajo la cara norte del Robson.",
      description: "Uno de los senderos más espectaculares de Norteamérica: lago turquesa con icebergs desprendidos del Berg Glacier, al pie del Robson. El itinerario cubre una sección del sendero en jornada de 8–9 h.",
      duration: "Trek 8–9 h (sección)", difficulty: "Exigente", bestTime: "Salir muy temprano",
      photoTips: "Emperor Falls y Valley of a Thousand Falls en ruta; luz de mediodía sobre el hielo.",
      days: [2], popularity: 5, reservation: "Pernocte requiere permiso BC Parks; verificar reapertura por daños de 2021."
    },
    {
      id: "maligne_lake", name: "Maligne Lake · Spirit Island", type: "lake", coords: [52.7275, -117.6428],
      img: "assets/img/photos/maligne_lake.jpg", credit: "Serge Cousineau / Wikimedia Commons",
      short: "El lago glaciar más largo de las Rocosas.",
      description: "22 km de agua turquesa y la icónica Spirit Island, accesible solo por crucero. Punto de partida del Bald Hills hike. Carretera de acceso rica en fauna (osos, alces, caribú).",
      duration: "Medio día", difficulty: "Fácil (lago)", bestTime: "Mañana (agua espejo)",
      photoTips: "Spirit Island desde la plataforma del crucero; luz de mediodía para el turquesa pleno.",
      days: [3], popularity: 5, reservation: "Crucero a Spirit Island: RESERVA OBLIGATORIA."
    },
    {
      id: "bald_hills", name: "Bald Hills", type: "trek", coords: [52.7278, -117.6440],
      img: "assets/img/photos/bald_hills.jpg", credit: "Jess Wood / Wikimedia Commons",
      short: "Panorámica 360° sobre el Maligne Lake.",
      description: "Ascenso desde Maligne Lake a una cresta pelada con vistas de 360° sobre el lago, los Queen Elizabeth Ranges y los glaciares circundantes. Uno de los miradores más completos de Jasper.",
      duration: "4–6 h · ≈10,4 km · +490 m", difficulty: "Moderado", bestTime: "Mañana (tormentas por la tarde)",
      photoTips: "Cresta alta con el Maligne Lake de fondo; teleobjetivo para comprimir capas de montañas.",
      days: [3], popularity: 3, reservation: "No requiere. Cresta expuesta al viento."
    },
    {
      id: "wilcox_pass", name: "Wilcox Pass", type: "trek", coords: [52.1936, -117.1817],
      img: "assets/img/photos/wilcox_pass.jpg", credit: "Kimon Berlin / Wikimedia Commons",
      short: "La mejor vista accesible del Athabasca Glacier.",
      description: "Desde el camping Wilcox Creek, junto al Columbia Icefield. Sobre la línea de árboles se abre una vista frontal del Athabasca Glacier y el icefield. Praderas alpinas con borregos cimarrones (bighorn).",
      duration: "3–4 h · ≈8 km · +335 m", difficulty: "Moderado", bestTime: "Mañana (luz sobre el glaciar)",
      photoTips: "Mirador del glaciar desde el paso; incluye borregos para escala. Viento fuerte arriba.",
      days: [4], popularity: 4, reservation: "No requiere. Expuesto — llevar cortavientos."
    },
    {
      id: "sunshine_meadows", name: "Sunshine Meadows", type: "trek", coords: [51.1150, -115.7817],
      img: "assets/img/photos/sunshine_meadows.jpg", credit: "Jack Borno / Wikimedia Commons",
      short: "Praderas alpinas sobre la Divisoria Continental.",
      description: "Praderas de flores silvestres que se extienden sobre la frontera Alberta–Columbia Británica, en la Divisoria Continental. Acceso a pie o por góndola de Sunshine Village. Rock Isle Lake y vistas de Mount Assiniboine.",
      duration: "3–5 h · ≈8–12 km", difficulty: "Fácil–Moderado", bestTime: "Mañana (flores + luz)",
      photoTips: "Alfombras de flores en primer plano con picos al fondo; Rock Isle Lake desde el mirador.",
      days: [5], popularity: 4, reservation: "Góndola Sunshine: ticket si se usa el ascenso."
    },
    {
      id: "healy_pass", name: "Healy Pass", type: "trek", coords: [51.0500, -115.8300],
      img: "assets/img/photos/healy_pass.jpg", credit: "John Johnston / Wikimedia Commons",
      short: "El campo de flores silvestres más célebre de Banff.",
      description: "Desde el estacionamiento de Sunshine, un largo ascenso hasta un paso alpino célebre por sus flores silvestres a inicios de agosto y las vistas hacia Pharaoh Peaks y Egypt Lake. Un clásico de fondo.",
      duration: "6–8 h · ≈18,4 km · +655 m", difficulty: "Moderado–Exigente", bestTime: "Mañana temprano",
      photoTips: "Praderas floridas en su punto máximo a inicios de agosto; gran angular hacia Pharaoh Peaks.",
      days: [5], popularity: 3, reservation: "No requiere. Zona de osos (arándanos) — bear spray."
    },
    {
      id: "cory_pass", name: "Cory Pass", type: "trek", coords: [51.2000, -115.6300],
      img: "assets/img/photos/cory_pass.jpg", credit: "Craig Talbert / Wikimedia Commons",
      short: "Ruta dramática y exigente frente a Mount Louis.",
      description: "Uno de los senderos más exigentes de Banff: fuerte desnivel, tramos expuestos y una vista brutal de la aguja de Mount Louis. Loop con Edith Pass. No apto para principiantes ni con roca mojada.",
      duration: "6–8 h · ≈13 km · +920 m", difficulty: "Difícil", bestTime: "Salida temprana",
      photoTips: "La torre de Mount Louis desde el paso; teleobjetivo para el escarpe. Cuidado en tramos expuestos.",
      days: [6], popularity: 2, reservation: "No requiere. Terreno técnico — experiencia necesaria."
    },
    {
      id: "cascade_amphitheatre", name: "Cascade Amphitheatre", type: "trek", coords: [51.2650, -115.6050],
      img: "assets/img/photos/cascade_amphitheatre.jpg", credit: "The Cosmonaut / Wikimedia Commons",
      short: "Circo glaciar en el corazón de Cascade Mountain.",
      description: "Desde la estación de Mt Norquay, sube a un anfiteatro glaciar suspendido en Cascade Mountain, con paredes verticales y marmotas. Alternativa a Cory Pass el mismo día.",
      duration: "5–7 h · ≈15,4 km · +640 m", difficulty: "Moderado–Exigente", bestTime: "Mañana",
      photoTips: "Anfiteatro con las paredes de Cascade; flores y campos de roca en primer plano.",
      days: [6], popularity: 3, reservation: "No requiere. Parking en Mt Norquay."
    },
    {
      id: "lake_minnewanka", name: "Lake Minnewanka", type: "lake", coords: [51.2497, -115.4130],
      img: "assets/img/photos/lake_minnewanka.jpg", credit: "Jakub Frys / Wikimedia Commons",
      short: "El mayor lago de Banff — cierre del viaje.",
      description: "'Lago del Espíritu del Agua', el mayor del Parque Nacional Banff. Crucero opcional, paseo hasta Stewart Canyon y fauna abundante. Broche relajado antes del regreso a Calgary.",
      duration: "2–3 h", difficulty: "Fácil", bestTime: "Mañana (agua en calma)",
      photoTips: "Reflejos al amanecer; Two Jack Lake cercano con Mount Rundle de fondo.",
      days: [7], popularity: 4, reservation: "Crucero: reserva recomendada. Posibles cierres por osos."
    }
  ],

  /* ---------------------------------------------------------------
     DAYS — itinerary is preserved exactly; suggested schedule, food,
     logistics, photography, alerts and gear are the added layer.
     --------------------------------------------------------------- */
  days: [
    {
      n: 0, date: "6 Ago", dow: "Miércoles", title: "Llegada a Calgary", base: "Calgary",
      route: "Aeropuerto YYC → Calgary (city)", routeStops: ["calgary"],
      badge: "Llegada & logística",
      summary: "Aterrizaje en Calgary, recogida del vehículo, compra de provisiones y preparación de equipo para la expedición.",
      drivingKm: 30, drivingTime: "≈1 h", hikingTime: "—", hikeName: null,
      highlights: ["Recogida de vehículo AWD/SUV", "Compra de bear spray y provisiones", "Primer asado de Alberta"],
      alerts: ["Comprar bear spray en Calgary (no se puede volar con él).", "Descargar mapas offline (Maps.me / Google offline) de toda la ruta.", "Recuperarse del jet lag: dormir bien antes del gran día."],
      schedule: [
        { time: "17:30", icon: "🛬", title: "Llegada a Calgary (YYC)", detail: "Migración, aduana y equipaje." },
        { time: "18:30", icon: "🚗", title: "Recogida del vehículo", detail: "SUV o AWD recomendado para la montaña." },
        { time: "19:15", icon: "🛒", title: "Provisiones", detail: "Costco / Walmart / Real Canadian Superstore: agua, snacks, almuerzos de ruta." },
        { time: "20:00", icon: "🧴", title: "Bear spray + gear", detail: "MEC o Atmosphere para lo que falte del equipo de montaña." },
        { time: "20:45", icon: "🍽️", title: "Cena en Calgary", detail: "Primer bife de Alberta." },
        { time: "22:00", icon: "🎒", title: "Armado de mochilas", detail: "Preparar equipo del Día 1 y dormir temprano." }
      ],
      food: {
        breakfast: "En vuelo / café en el aeropuerto.",
        lunch: "Snack en el aeropuerto o de camino.",
        dinner: "Model Milk o Charcut (Alberta beef); rápido: Peters' Drive-In (milkshakes clásicos).",
        bestDish: "Alberta AAA beef — el mejor de Canadá.",
        quick: "Peters' Drive-In, food courts.",
        premium: "Model Milk, Ten Foot Henry, Alforno."
      },
      logistics: {
        gas: ["Cargar combustible en Calgary — es más barato que en la montaña."],
        supplies: ["Costco / Walmart / Real Canadian Superstore para agua y comida de varios días."],
        shops: ["MEC (Mountain Equipment Company) y Atmosphere para equipo outdoor y bear spray."]
      },
      photography: { spots: ["Skyline desde McHugh Bluff", "Bow River / Prince's Island Park"], goldenHour: "≈20:30", drone: "Permitido fuera de parques nacionales, respetando normas de la ciudad." },
      weather: { summary: "Seco y templado en la pradera.", tempHigh: 24, tempLow: 12, conditions: "Soleado" },
      clothing: ["Ropa cómoda de viaje", "Una capa de abrigo por si refresca de noche"],
      gear: ["Adaptador de enchufe (tipo A/B, 120V)", "Soporte de teléfono para el auto", "Cooler para el maletero"],
      optimization: ["Hacer TODAS las compras hoy: mañana no hay supermercados en la Icefields Parkway.", "Cargar mapas offline de Banff, Jasper y Mount Robson."],
      routeCoords: [[51.1225, -114.0133], [51.0447, -114.0719]], mapCenter: [51.08, -114.05], mapZoom: 11
    },
    {
      n: 1, date: "7 Ago", dow: "Jueves", title: "Calgary → Jasper", base: "Jasper (overnight)",
      route: "Calgary · Banff (stop) · Peyto Lake · Columbia Icefield · Athabasca Falls · Jasper",
      routeStops: ["calgary", "banff_town", "lake_louise", "peyto_lake", "columbia_icefield", "athabasca_falls", "jasper_town"],
      badge: "El gran día escénico",
      summary: "La Icefields Parkway, una de las carreteras más bellas del mundo. Día largo de conducción con las paradas más icónicas del viaje.",
      drivingKm: 412, drivingTime: "≈6 h", hikingTime: "Paseos cortos", hikeName: "Miradores en ruta",
      highlights: ["Peyto Lake (cabeza de lobo)", "Athabasca Glacier / Columbia Icefield", "Athabasca Falls", "Bow Lake y Crowfoot Glacier"],
      alerts: ["⛽ COMBUSTIBLE: la única gasolinera entre Lake Louise y Jasper es Saskatchewan River Crossing (cara, horario limitado). Llenar en Lake Louise.", "📵 Sin cobertura de señal en casi toda la Parkway.", "🎫 Se requiere Parks Canada Pass (colgar en el parabrisas).", "🦌 Fauna en la carretera — conducir con precaución."],
      schedule: [
        { time: "06:30", icon: "🚗", title: "Salida de Calgary", detail: "Salir temprano para aprovechar la luz y evitar multitudes." },
        { time: "08:00", icon: "☕", title: "Parada en Banff", detail: "Café en Wild Flour Bakery; foto de Cascade Mountain en Banff Avenue." },
        { time: "09:15", icon: "💧", title: "Lake Louise (opcional)", detail: "Vista rápida — llegar temprano por el parking." },
        { time: "10:30", icon: "📸", title: "Peyto Lake", detail: "Mirador de Bow Summit sobre el lago turquesa." },
        { time: "12:30", icon: "🍽️", title: "Almuerzo Saskatchewan River Crossing", detail: "¡Rellenar combustible! Opciones limitadas — llevar snacks." },
        { time: "14:00", icon: "🧊", title: "Columbia Icefield", detail: "Athabasca Glacier; opcional Ice Explorer / Skywalk (reservar)." },
        { time: "16:30", icon: "💦", title: "Athabasca Falls", detail: "Pasarelas sobre el cañón." },
        { time: "17:30", icon: "🏨", title: "Llegada a Jasper", detail: "Check-in y descanso." },
        { time: "19:00", icon: "🍽️", title: "Cena en Jasper", detail: "Evil Dave's Grill o Jasper Pizza Place." }
      ],
      food: {
        breakfast: "Wild Flour Bakery o Whitebark Café (Banff).",
        lunch: "The Crossing (Saskatchewan River Crossing) — limitado; ideal llevar picnic.",
        dinner: "Evil Dave's Grill, Harvest o Fiddle River (Jasper).",
        bestDish: "Elk o bison; poutine post-carretera.",
        quick: "Jasper Pizza Place; snacks de Calgary.",
        premium: "Harvest, Fiddle River (Jasper)."
      },
      logistics: {
        gas: ["Llenar en Lake Louise (última barata).", "Saskatchewan River Crossing solo para emergencia.", "Repostar de nuevo al llegar a Jasper."],
        supplies: ["Llevar agua y almuerzo desde Calgary/Banff — no hay supermercados en la Parkway."],
        shops: ["Última compra en Banff (IGA) antes de entrar a la Parkway."]
      },
      photography: { spots: ["Peyto Lake (media mañana)", "Bow Lake", "Mistaya Canyon", "Athabasca Falls"], goldenHour: "≈20:45 (Jasper)", drone: "⚠️ PROHIBIDO en parques nacionales (Banff/Jasper) sin permiso." },
      weather: { summary: "Valle templado; frío y viento en el icefield.", tempHigh: 22, tempLow: 8, conditions: "Variable en altura" },
      clothing: ["Sistema de capas", "Cortavientos / impermeable", "Capa de abrigo para el glaciar (viento gélido)"],
      gear: ["Botella de agua reutilizable", "Snacks de ruta", "Parks Canada Pass a la vista"],
      optimization: ["Parada inteligente cada 1,5–2 h: Banff → Peyto → Crossing → Icefield → Athabasca Falls.", "Si el clima tapa Peyto, priorizar Bow Lake (más bajo, menos nubes).", "Buffer de +2 h sobre el tiempo de Google por paradas y tráfico escénico."],
      routeCoords: [[51.0447, -114.0719], [51.1784, -115.5708], [51.4254, -116.1773], [51.6690, -116.4110], [51.7161, -116.5261], [51.9698, -116.7300], [52.2206, -117.2233], [52.4200, -117.6000], [52.6642, -117.8850], [52.8737, -118.0814]],
      mapCenter: [51.95, -116.85], mapZoom: 7
    },
    {
      n: 2, date: "8 Ago", dow: "Viernes", title: "Mount Robson", base: "Jasper",
      route: "Jasper · Mount Robson · Kinney Lake · sección Berg Lake Trail · Jasper",
      routeStops: ["jasper_town", "mount_robson", "kinney_lake", "berg_lake"],
      badge: "Trek épico · 8–9 h",
      summary: "El gran día de montaña: la cumbre más alta de las Rocosas canadienses y una sección del legendario Berg Lake Trail. Trekking de 8–9 horas.",
      drivingKm: 170, drivingTime: "≈2,5 h", hikingTime: "8–9 h", hikeName: "Kinney Lake + sección Berg Lake Trail",
      highlights: ["Mount Robson (3.954 m)", "Kinney Lake esmeralda", "Valley of a Thousand Falls", "Emperor Falls (según turnaround)"],
      alerts: ["🐻 Temporada de arándanos = MÁXIMA actividad de osos. Bear spray accesible, hacer ruido, ir en grupo.", "🕐 Cambio de zona horaria: Mount Robson usa hora del Pacífico (−1 h).", "🚧 Berg Lake Trail: verificar reapertura por daños de la crecida de 2021 en BC Parks.", "⛰️ Día largo y exigente — salir muy temprano; el Robson genera su propio clima."],
      schedule: [
        { time: "05:30", icon: "☕", title: "Desayuno temprano", detail: "Preparar mochila y almuerzo de trail." },
        { time: "06:00", icon: "🚗", title: "Salida a Mount Robson", detail: "≈85 km / 1 h (recordar cambio de hora)." },
        { time: "07:15", icon: "📍", title: "Visitor Centre / trailhead", detail: "Registro y últimos preparativos." },
        { time: "07:30", icon: "🥾", title: "Inicio del sendero", detail: "Hacia Kinney Lake (≈4,5 km)." },
        { time: "08:45", icon: "💧", title: "Kinney Lake", detail: "Continuar por la sección de Berg Lake Trail." },
        { time: "13:00", icon: "🍽️", title: "Almuerzo en ruta", detail: "Punto de retorno según ritmo (Whitehorn / Emperor Falls)." },
        { time: "16:30", icon: "🔙", title: "Regreso al trailhead", detail: "Fin del trek." },
        { time: "18:30", icon: "🍽️", title: "Cena en Jasper", detail: "Recuperación con comida abundante." }
      ],
      food: {
        breakfast: "Bear's Paw Bakery o SnowDome Coffee (Jasper), muy temprano.",
        lunch: "Picnic de trail: sándwiches, frutos secos, barras energéticas, electrolitos.",
        dinner: "The Raven Bistro o Harvest (Jasper).",
        bestDish: "Trucha de Alberta; algo contundente post-trek.",
        quick: "Snacks y geles durante la caminata.",
        premium: "The Raven Bistro (Jasper)."
      },
      logistics: {
        gas: ["Llenar en Jasper antes de salir — no hay servicio en Robson salvo el visitor centre."],
        supplies: ["Cargar 2–3 L de agua por persona + filtro; comida para todo el día."],
        shops: ["Robson Visitor Centre (básicos, café)."]
      },
      photography: { spots: ["Reflejo del Robson en Kinney Lake", "Emperor Falls", "Valley of a Thousand Falls"], goldenHour: "Luz de mediodía sobre el hielo", drone: "⚠️ Parque provincial — requiere permiso." },
      weather: { summary: "Robson crea su propio clima; a menudo nublado.", tempHigh: 18, tempLow: 6, conditions: "Cambiante, posible lluvia" },
      clothing: ["Capas completas de trekking", "Impermeable resistente", "Botas robustas ya domadas", "Bastones de trekking"],
      gear: ["Bear spray al cinturón", "Filtro/pastillas de agua", "Botiquín", "Frontal (headlamp)", "Silbato"],
      optimization: ["Salida a las 06:00 obligada: el trek de 8–9 h no admite empezar tarde.", "Definir punto de retorno por reloj, no por distancia (dar media vuelta a las 13:00 pase lo que pase).", "Plan B si llueve fuerte: quedarse en Kinney Lake y bajar seguro."],
      routeCoords: [[52.8737, -118.0814], [52.9400, -118.5500], [53.0353, -119.2360], [53.0603, -119.1889], [53.1394, -119.1461]],
      mapCenter: [53.00, -118.85], mapZoom: 9
    },
    {
      n: 3, date: "9 Ago", dow: "Sábado", title: "Jasper — Maligne Lake", base: "Jasper",
      route: "Jasper · Bald Hills · Maligne Lake · Spirit Island",
      routeStops: ["jasper_town", "bald_hills", "maligne_lake"],
      badge: "Hike + lago icónico",
      summary: "Ascenso a Bald Hills para una panorámica de 360° sobre el Maligne Lake, seguido del crucero a la mítica Spirit Island.",
      drivingKm: 96, drivingTime: "≈2 h", hikingTime: "4–6 h", hikeName: "Bald Hills",
      highlights: ["Panorámica 360° desde Bald Hills", "Spirit Island (crucero)", "Fauna en Maligne Road", "Medicine Lake"],
      alerts: ["🦌 Maligne Road: fauna abundante (caribú, alce, oso). Conducir despacio al amanecer/atardecer.", "⛵ Crucero a Spirit Island: reservar con antelación.", "⛈️ Tormentas por la tarde en la cresta — hacer Bald Hills por la mañana."],
      schedule: [
        { time: "07:00", icon: "☕", title: "Desayuno en Jasper", detail: "SnowDome Coffee / Bear's Paw Bakery." },
        { time: "07:45", icon: "🚗", title: "Salida a Maligne Lake", detail: "≈48 km / 1 h (carretera sinuosa con fauna)." },
        { time: "09:00", icon: "🥾", title: "Inicio Bald Hills", detail: "Ascenso a la cresta panorámica." },
        { time: "12:30", icon: "🍽️", title: "Cima + almuerzo", detail: "Vistas de 360° sobre el Maligne Lake." },
        { time: "14:30", icon: "🔙", title: "Regreso al lago", detail: "Descenso al embarcadero." },
        { time: "15:00", icon: "⛵", title: "Crucero Spirit Island", detail: "≈1,5 h (reservado)." },
        { time: "17:00", icon: "📸", title: "Medicine Lake en el regreso", detail: "Parada fotográfica de vuelta a Jasper." },
        { time: "18:30", icon: "🍽️", title: "Cena en Jasper", detail: "" }
      ],
      food: {
        breakfast: "SnowDome Coffee o Bear's Paw Bakery (Jasper).",
        lunch: "Picnic en la cresta de Bald Hills.",
        dinner: "Fiddle River o Jasper Pizza Place.",
        bestDish: "Trucha alpina de Alberta.",
        quick: "Café en el embarcadero de Maligne Lake.",
        premium: "Fiddle River (Jasper)."
      },
      logistics: {
        gas: ["Llenar en Jasper; no hay gasolinera en Maligne Lake."],
        supplies: ["Agua y almuerzo desde Jasper."],
        shops: ["Pequeña cafetería/tienda en el embarcadero de Maligne Lake."]
      },
      photography: { spots: ["Cresta de Bald Hills (panorámica)", "Spirit Island desde el crucero", "Medicine Lake"], goldenHour: "Mediodía para el turquesa del lago", drone: "⚠️ Prohibido en parque nacional." },
      weather: { summary: "Valle agradable; cresta ventosa y fresca.", tempHigh: 20, tempLow: 7, conditions: "Sol con nubes de tarde" },
      clothing: ["Capas de trekking", "Protección solar (cresta expuesta)", "Cortavientos"],
      gear: ["Bear spray", "Gafas de sol + gorra", "Cámara con teleobjetivo"],
      optimization: ["Reservar el crucero DESPUÉS del hike (p. ej. 15:00) para no correr.", "Bald Hills por la mañana evita tormentas de tarde en la cresta.", "Conducir Maligne Road despacio: la fauna es el mayor riesgo del día."],
      routeCoords: [[52.8737, -118.0814], [52.8000, -117.9000], [52.7275, -117.6428]],
      mapCenter: [52.79, -117.86], mapZoom: 10
    },
    {
      n: 4, date: "10 Ago", dow: "Domingo", title: "Jasper → Banff", base: "Banff (overnight)",
      route: "Jasper · Wilcox Pass · Icefields Parkway (return) · Banff",
      routeStops: ["jasper_town", "wilcox_pass", "columbia_icefield", "peyto_lake", "banff_town"],
      badge: "Trek glaciar + traslado",
      summary: "Trek a Wilcox Pass con la mejor vista frontal del Athabasca Glacier, y regreso escénico por la Icefields Parkway hasta Banff.",
      drivingKm: 290, drivingTime: "≈4 h", hikingTime: "3–4 h", hikeName: "Wilcox Pass",
      highlights: ["Vista frontal del Athabasca Glacier", "Praderas alpinas con bighorn", "Segunda pasada por la Icefields Parkway"],
      alerts: ["⛽ Llenar en Jasper — tramo largo con poco servicio.", "💨 Wilcox Pass expuesto y ventoso sobre la línea de árboles.", "🐏 Borregos cimarrones (bighorn) en el sendero — no alimentar.", "⏳ Día combinado (hike + 4 h de ruta): gestionar bien el tiempo."],
      schedule: [
        { time: "06:30", icon: "🚗", title: "Check-out y salida de Jasper", detail: "Rumbo sur por la Parkway." },
        { time: "08:15", icon: "📍", title: "Trailhead Wilcox Creek", detail: "Junto al Columbia Icefield." },
        { time: "08:30", icon: "🥾", title: "Trek Wilcox Pass", detail: "Subida a la vista del glaciar." },
        { time: "12:30", icon: "🍽️", title: "Almuerzo Icefield Centre", detail: "Fin del hike; comida y combustible." },
        { time: "13:30", icon: "🚗", title: "Ruta a Banff", detail: "Bow Lake, Peyto (si faltó) en el camino." },
        { time: "17:30", icon: "🏨", title: "Llegada a Banff", detail: "Check-in." },
        { time: "19:00", icon: "🍽️", title: "Cena en Banff", detail: "Park Distillery o The Bison." }
      ],
      food: {
        breakfast: "Bear's Paw Bakery (Jasper), temprano.",
        lunch: "Icefield Centre o picnic tras el hike.",
        dinner: "Park Distillery, The Bison o Bear Street Tavern (Banff).",
        bestDish: "Bison; cerveza artesanal local.",
        quick: "Icefield Centre food court.",
        premium: "The Bison (Banff)."
      },
      logistics: {
        gas: ["Llenar en Jasper.", "Saskatchewan River Crossing como respaldo.", "Repostar al llegar a Banff."],
        supplies: ["Agua y snacks desde Jasper."],
        shops: ["Nada fiable en la Parkway — comprar en Jasper."]
      },
      photography: { spots: ["Mirador del glaciar en Wilcox Pass", "Bow Lake", "Peyto (segunda oportunidad)"], goldenHour: "≈20:40 (Banff)", drone: "⚠️ Prohibido en parques nacionales." },
      weather: { summary: "Frío y ventoso en el paso; agradable en el valle.", tempHigh: 20, tempLow: 6, conditions: "Ventoso en altura" },
      clothing: ["Capas de trekking", "Cortavientos / impermeable", "Guantes ligeros para el paso"],
      gear: ["Bear spray", "Agua 2 L", "Cargador de auto para el trayecto largo"],
      optimization: ["Hacer Wilcox temprano y conducir a Banff por la tarde (mejor que al revés).", "Aprovechar el regreso por la Parkway para las fotos que faltaron el Día 1.", "Buffer de +1 h por paradas fotográficas en la Parkway."],
      routeCoords: [[52.8737, -118.0814], [52.6642, -117.8850], [52.2206, -117.2233], [52.1936, -117.1817], [51.9698, -116.7300], [51.7161, -116.5261], [51.4254, -116.1773], [51.1784, -115.5708]],
      mapCenter: [52.05, -116.65], mapZoom: 7
    },
    {
      n: 5, date: "11 Ago", dow: "Lunes", title: "Banff — Healy Pass / Sunshine Meadows", base: "Banff",
      route: "Banff · Sunshine parking · Healy Pass / Sunshine Meadows",
      routeStops: ["banff_town", "sunshine_meadows", "healy_pass"],
      badge: "Trek de flores alpinas",
      summary: "Trekking por praderas alpinas: Healy Pass, célebre por sus flores silvestres a inicios de agosto, y las Sunshine Meadows sobre la Divisoria Continental.",
      drivingKm: 24, drivingTime: "≈40 min", hikingTime: "6–8 h", hikeName: "Healy Pass / Sunshine Meadows",
      highlights: ["Flores silvestres en su punto máximo", "Vistas a Pharaoh Peaks / Egypt Lake", "Praderas de la Divisoria Continental"],
      alerts: ["🐻 Praderas con arándanos = zona de osos activa. Bear spray y ruido.", "⛈️ Salir temprano: tormentas eléctricas por la tarde en el paso.", "☀️ Terreno abierto — protección solar y viento."],
      schedule: [
        { time: "06:30", icon: "☕", title: "Desayuno en Banff", detail: "Wild Flour Bakery / Little Wild Coffee." },
        { time: "07:15", icon: "🚗", title: "Al parking de Sunshine", detail: "≈12 km." },
        { time: "07:45", icon: "🥾", title: "Inicio Healy Pass", detail: "Ascenso largo entre bosque y praderas." },
        { time: "12:00", icon: "🌼", title: "Healy Pass + almuerzo", detail: "Praderas floridas y vistas a Pharaoh Peaks." },
        { time: "15:30", icon: "🔙", title: "Regreso al parking", detail: "" },
        { time: "16:30", icon: "♨️", title: "Banff Upper Hot Springs", detail: "Recuperación opcional en aguas termales." },
        { time: "19:00", icon: "🍽️", title: "Cena en Banff", detail: "The Maple Leaf o Farm & Fire." }
      ],
      food: {
        breakfast: "Wild Flour Bakery o Little Wild Coffee (Banff).",
        lunch: "Picnic en Healy Pass.",
        dinner: "The Maple Leaf o Farm & Fire (Banff).",
        bestDish: "Cordero de Alberta.",
        quick: "Day lodge de Sunshine Village.",
        premium: "The Maple Leaf (Banff)."
      },
      logistics: {
        gas: ["Llenar en Banff."],
        supplies: ["IGA o Nesters Market (Banff) para el picnic."],
        shops: ["Sunshine Village: góndola y day lodge."]
      },
      photography: { spots: ["Praderas de Healy Pass", "Pharaoh Peaks", "Rock Isle Lake (Sunshine Meadows)"], goldenHour: "Mañana para las flores", drone: "⚠️ Prohibido en parque nacional." },
      weather: { summary: "Valle templado; paso fresco y ventoso.", tempHigh: 20, tempLow: 7, conditions: "Sol con tormentas de tarde" },
      clothing: ["Capas de trekking", "Protección solar + viento", "Polainas si hay barro"],
      gear: ["Bear spray", "Bastones", "2 L de agua"],
      optimization: ["Empezar a las 07:45: el paso de 18 km necesita margen antes de las tormentas.", "Si amenaza tormenta, quedarse en Sunshine Meadows (más bajo y seguro).", "Aguas termales al bajar: recuperación perfecta antes del último día de trek."],
      routeCoords: [[51.1784, -115.5708], [51.1150, -115.7817], [51.0500, -115.8300]],
      mapCenter: [51.11, -115.72], mapZoom: 11
    },
    {
      n: 6, date: "12 Ago", dow: "Martes", title: "Banff — Cory Pass / Cascade Amphitheatre", base: "Banff",
      route: "Banff · Cory Pass / Cascade Amphitheatre",
      routeStops: ["banff_town", "cory_pass", "cascade_amphitheatre"],
      badge: "Trek final exigente",
      summary: "El último gran trek: Cory Pass, uno de los senderos más exigentes de Banff frente a Mount Louis, o el circo glaciar de Cascade Amphitheatre como alternativa.",
      drivingKm: 15, drivingTime: "≈30 min", hikingTime: "6–8 h", hikeName: "Cory Pass / Cascade Amphitheatre",
      highlights: ["Aguja de Mount Louis (Cory Pass)", "Circo glaciar de Cascade Amphitheatre", "Vistas del Bow Valley"],
      alerts: ["⚠️ Cory Pass: tramos expuestos y escalonados, orientación necesaria. No apto para principiantes ni con roca mojada.", "🐻 Zona de osos activa.", "⛰️ Elegir según clima: Cory Pass solo con buen tiempo; Cascade Amphitheatre como alternativa más segura."],
      schedule: [
        { time: "06:30", icon: "☕", title: "Desayuno en Banff", detail: "" },
        { time: "07:15", icon: "🚗", title: "Al trailhead", detail: "Fireside (Cory) o Mt Norquay (Cascade)." },
        { time: "07:45", icon: "🥾", title: "Inicio del trek", detail: "Cory Pass (difícil) o Cascade Amphitheatre (moderado-exigente)." },
        { time: "12:30", icon: "🍽️", title: "Paso / anfiteatro + almuerzo", detail: "Punto alto de la ruta." },
        { time: "15:30", icon: "🔙", title: "Regreso", detail: "" },
        { time: "17:00", icon: "🚠", title: "Banff Gondola (opcional)", detail: "Atardecer desde Sulphur Mountain." },
        { time: "19:30", icon: "🍽️", title: "Cena de despedida", detail: "Sky Bistro o The Maple Leaf." }
      ],
      food: {
        breakfast: "Whitebark Café o Wild Flour (Banff).",
        lunch: "Picnic en el paso / anfiteatro.",
        dinner: "Sky Bistro (cima de la góndola) o The Maple Leaf.",
        bestDish: "Tabla de caza (game platter).",
        quick: "Bear Street Tavern.",
        premium: "Sky Bistro (Banff Gondola)."
      },
      logistics: {
        gas: ["Llenar en Banff."],
        supplies: ["IGA / Nesters Market (Banff)."],
        shops: ["Tiendas de souvenirs en Banff Avenue."]
      },
      photography: { spots: ["Torre de Mount Louis (Cory)", "Anfiteatro de Cascade", "Bow Valley desde Norquay", "Atardecer desde Banff Gondola"], goldenHour: "≈20:30 desde Sulphur Mountain", drone: "⚠️ Prohibido en parque nacional." },
      weather: { summary: "Valle templado y estable.", tempHigh: 21, tempLow: 8, conditions: "Soleado" },
      clothing: ["Botas robustas", "Capas + cortavientos", "Bastones (Cory es empinado)"],
      gear: ["Bear spray", "Guantes para tramos rocosos", "2 L de agua"],
      optimization: ["Decidir Cory vs Cascade según el parte del tiempo de la mañana.", "Cory Pass en sentido horario (subir por el paso, bajar por Edith) reduce el riesgo.", "Cerrar el viaje con góndola + atardecer si quedan fuerzas."],
      routeCoords: [[51.1784, -115.5708], [51.2000, -115.6300], [51.2100, -115.6400]],
      mapCenter: [51.21, -115.62], mapZoom: 12
    },
    {
      n: 7, date: "13 Ago", dow: "Miércoles", title: "Banff → Calgary", base: "Calgary / regreso",
      route: "Banff · Lake Minnewanka · Calgary",
      routeStops: ["banff_town", "lake_minnewanka", "calgary"],
      badge: "Cierre & regreso",
      summary: "Mañana tranquila en Lake Minnewanka, el mayor lago de Banff, y regreso a Calgary para el vuelo de vuelta.",
      drivingKm: 150, drivingTime: "≈2 h", hikingTime: "Paseo suave", hikeName: "Stewart Canyon (opcional)",
      highlights: ["Lake Minnewanka", "Two Jack Lake (Mount Rundle)", "Regreso relajado"],
      alerts: ["🕐 Dejar buffer amplio para devolución del auto + aeropuerto.", "🐻 Minnewanka puede tener cierres puntuales por osos — verificar.", "⛽ Repostar antes de devolver el vehículo."],
      schedule: [
        { time: "08:00", icon: "☕", title: "Desayuno y check-out", detail: "Banff." },
        { time: "09:00", icon: "💧", title: "Lake Minnewanka", detail: "Crucero, paseo a Stewart Canyon o Two Jack Lake." },
        { time: "12:00", icon: "🍽️", title: "Almuerzo en Canmore", detail: "Communitea o Rocky Mountain Bagel Co." },
        { time: "13:30", icon: "🚗", title: "Ruta a Calgary", detail: "≈130 km / 1,5 h." },
        { time: "15:00", icon: "⛽", title: "Combustible + devolución auto", detail: "Cargar antes de entregar." },
        { time: "17:00", icon: "🛫", title: "Aeropuerto / vuelo", detail: "Check-in y despedida de las Rocosas." }
      ],
      food: {
        breakfast: "Whitebark Café (Banff).",
        lunch: "Communitea Café o Rocky Mountain Bagel Co (Canmore).",
        dinner: "Aeropuerto de Calgary / en vuelo.",
        bestDish: "Último Alberta beef antes de partir.",
        quick: "Rocky Mountain Bagel Co (Canmore).",
        premium: "The Grizzly Paw Brewing (Canmore)."
      },
      logistics: {
        gas: ["Repostar en Canmore o Calgary antes de devolver el auto."],
        supplies: ["—"],
        shops: ["Souvenirs de última hora en Banff Avenue."]
      },
      photography: { spots: ["Lake Minnewanka al amanecer", "Two Jack Lake con Mount Rundle", "Canmore"], goldenHour: "Amanecer (agua en calma)", drone: "⚠️ Prohibido en parque nacional." },
      weather: { summary: "Cálido y seco al bajar a la pradera.", tempHigh: 24, tempLow: 10, conditions: "Soleado" },
      clothing: ["Ropa casual + capa ligera", "Cómodo para el vuelo"],
      gear: ["Documentos de vuelo listos", "Descartar/regalar el bear spray (no vuela)"],
      optimization: ["Regla de oro: estar en el aeropuerto 3 h antes del vuelo internacional.", "Minnewanka temprano deja margen holgado para devolución + check-in.", "Two Jack Lake como plan B si Minnewanka está cerrado."],
      routeCoords: [[51.1784, -115.5708], [51.2497, -115.4130], [51.1784, -115.5708], [51.0890, -115.3590], [51.0447, -114.0719]],
      mapCenter: [51.12, -114.85], mapZoom: 9
    }
  ],

  /* ---------------------------------------------------------------
     VIDEOS — verified via YouTube oembed. Local thumbnails + QR.
     --------------------------------------------------------------- */
  videos: [
    { id: "zzMo2dy7mNY", title: "The Rockies | Cinematic Drone 4K Video", channel: "stoked tour", duration: "4:05", reason: "Montaje aéreo 4K que fija el tono premium e inspirador del viaje.", topic: "Cinematográfico" },
    { id: "GmTK37bQUC0", title: "Banff to Jasper on the Icefields Parkway 🇨🇦", channel: "Tom and Nikki Travel", duration: "18:42", reason: "Recorrido en primera persona por las paradas clave de la Parkway con tips prácticos.", topic: "Icefields Parkway" },
    { id: "JNBTV_l43XY", title: "BANFF NATIONAL PARK Travel Guide — Top Things To See & Do", channel: "Sammy and Tommy", duration: "16:30", reason: "Resumen ordenado de lo mejor de Banff, ideal para planificar.", topic: "Banff" },
    { id: "z8YLQE3IJp8", title: "The ULTIMATE TRAVEL GUIDE to Jasper National Park", channel: "Traveleaz", duration: "20:15", reason: "Guía completa de Jasper: atracciones, logística y dónde alojarse.", topic: "Jasper" },
    { id: "CzScqvgTt8U", title: "Most Beautiful Hike in Canada | Berg Lake Trail", channel: "Justin Outdoors", duration: "22:00", reason: "Film del Berg Lake Trail bajo el Robson: muestra exactamente qué implica el trek.", topic: "Mount Robson" },
    { id: "Q0DWubU1EaQ", title: "The Stunning Peyto Lake Viewpoint — Banff Hiking Trail", channel: "Easy Hikes & Great Landscapes", duration: "8:20", reason: "El sendero corto al mirador icónico de Peyto Lake.", topic: "Peyto Lake" },
    { id: "5kgSfd7qAWQ", title: "Banff Top 20: Expert Guide to the Canadian Rockies Must-Dos", channel: "Insiders Travel Guide Canada", duration: "24:10", reason: "Cuenta regresiva de un experto local con los mejores hikes y miradores.", topic: "Mejores hikes" },
    { id: "x0VlECGq66o", title: "Maligne Lake & Spirit Island Cruise — Jasper 4K", channel: "Haswell Travelled", duration: "12:30", reason: "Recorrido 4K a Spirit Island: previsualiza el crucero que se reservará.", topic: "Maligne Lake" },
    { id: "rdTDwRnvTd4", title: "Bear Safety and Buffaloberries in the Canadian Rockies", channel: "Mountain Nature and Culture", duration: "6:45", reason: "Por qué los encuentros con osos aumentan en temporada de bayas y cómo caminar seguro.", topic: "Seguridad · Osos" }
  ],

  /* ---------------------------------------------------------------
     GENERAL RECOMMENDATIONS + premium UX layers
     --------------------------------------------------------------- */
  recommendations: [
    { icon: "🚗", title: "Conducción en las Rocosas", items: [
      "Vehículo AWD/SUV recomendado por distancias y clima.",
      "Distancias reales mayores que en ciudad: velocidad media 70–90 km/h con paradas.",
      "Fauna en la carretera al amanecer/atardecer — conducir despacio.",
      "Añadir siempre un buffer de +1 a +2 h sobre el tiempo de Google por paradas escénicas."
    ]},
    { icon: "⛽", title: "Combustible (crítico)", items: [
      "La Icefields Parkway tiene UNA sola gasolinera: Saskatchewan River Crossing (cara, horario limitado).",
      "Llenar SIEMPRE en Lake Louise y en Jasper.",
      "Nunca bajar del medio tanque en tramos largos.",
      "Repostar antes de devolver el auto en Calgary."
    ]},
    { icon: "🌦️", title: "Clima cambiante", items: [
      "El tiempo cambia rápido: sol, lluvia y frío el mismo día.",
      "Los pasos alpinos pueden estar 10–15 °C más fríos que el valle, con viento.",
      "Agosto: máximas de valle 20–24 °C, mínimas 6–10 °C; posibles nevadas en altura.",
      "Consultar el parte antes de cada trek y tener plan B."
    ]},
    { icon: "🐻", title: "Seguridad con osos", items: [
      "Agosto = temporada de arándanos = máxima actividad de osos.",
      "Llevar bear spray accesible (al cinturón, no en la mochila) y saber usarlo.",
      "Hacer ruido, caminar en grupo, nunca correr ante un oso.",
      "No dejar comida ni residuos; respetar cierres de sendero por osos."
    ]},
    { icon: "🎫", title: "Permisos y parques", items: [
      "Parks Canada Pass obligatorio en Banff y Jasper (día o Discovery Pass anual).",
      "Colgar el pase visible en el parabrisas.",
      "Crucero a Spirit Island (Maligne): reserva obligatoria.",
      "Mount Robson (BC Parks): verificar reapertura del Berg Lake Trail por daños de 2021."
    ]},
    { icon: "🧥", title: "Ropa por capas", items: [
      "Base merino + capa media (fleece/pluma) + hardshell impermeable.",
      "Botas de montaña ya domadas + calcetines de lana.",
      "Gorro y guantes ligeros para los pasos alpinos.",
      "Gorra, gafas de sol y protección solar alta para terreno expuesto."
    ]},
    { icon: "📸", title: "Fotografía", items: [
      "Hora dorada: amanecer ~06:00, atardecer ~20:45 en agosto.",
      "Filtro polarizador para intensificar lagos turquesa y cielos.",
      "Filtro ND para efecto seda en cascadas (Athabasca Falls).",
      "⚠️ Drones PROHIBIDOS en parques nacionales (Banff/Jasper) sin permiso."
    ]},
    { icon: "📵", title: "Cobertura y navegación", items: [
      "Sin señal en gran parte de la Parkway, Mount Robson y Maligne Road.",
      "Descargar mapas offline (Google Maps / Maps.me) de toda la ruta.",
      "Descargar AllTrails offline para los senderos.",
      "Avisar a alguien del plan diario antes de perder cobertura."
    ]}
  ],

  /* Extra premium UX layers requested */
  layers: [
    { icon: "🍽️", title: "Capa gastronómica", intro: "Cada día trae desayuno, almuerzo de ruta y cena en destino, con opción rápida y premium.", items: [
      "Desayuno: bakery/café en ruta (Wild Flour, Bear's Paw, SnowDome).",
      "Almuerzo: stop points optimizados en carretera o picnic de trail.",
      "Cena en ciudad destino con opción rápida y premium.",
      "Best local dish: Alberta beef, bison, elk, trucha alpina."
    ]},
    { icon: "🛒", title: "Compras y logística", intro: "Dónde abastecerse de agua, snacks y equipo antes de cada etapa.", items: [
      "Supermercados: Costco / Walmart / Superstore (Calgary), IGA / Nesters (Banff).",
      "Agua y snacks ANTES de entrar a los parques (no hay en la Parkway).",
      "Gasolineras estratégicas: Calgary, Lake Louise, Jasper, Banff, Canmore.",
      "Equipo outdoor: MEC / Atmosphere (Calgary)."
    ]},
    { icon: "🧭", title: "Optimización de ruta", intro: "Stops inteligentes, miradores clave y planes B por clima.", items: [
      "Stop point cada 1,5–2 h de manejo para descanso y fotos.",
      "Miradores obligatorios: Peyto, Bow Lake, Athabasca Glacier, Athabasca Falls.",
      "Alternativas por mal clima integradas en cada día (plan B).",
      "Tiempos reales = Google + buffer del 20–30 %."
    ]},
    { icon: "📸", title: "Capa fotográfica", intro: "Golden hour, spots icónicos y joyas escondidas por día.", items: [
      "Golden hour estimada por día (amanecer ~06:00 / atardecer ~20:45).",
      "Spots icónicos vs joyas escondidas señalados en cada parada.",
      "Reflejos de amanecer: Kinney Lake, Two Jack Lake, Pyramid Lake.",
      "Drone prohibido en parques — planificar tomas terrestres."
    ]},
    { icon: "⚠️", title: "Capa operativa", intro: "Riesgos, cobertura, estado de caminos y alertas de parque.", items: [
      "Cobertura de señal por zona (mayormente nula en la Parkway).",
      "Riesgos: fauna en carretera, tramos expuestos, clima alpino.",
      "Estado de caminos / estacionalidad (Berg Lake Trail).",
      "Alertas de parque: permisos, reservas y cierres por osos."
    ]},
    { icon: "🧳", title: "UX de preparación", intro: "Checklist dinámico por etapa y 'qué usar hoy' según el día.", items: [
      "Checklist por contexto: ciudad · carretera · trekking.",
      "'Qué usar hoy' según el clima de cada jornada.",
      "Equipo de seguridad siempre: bear spray, agua, botiquín, frontal.",
      "Preparar la mochila la noche anterior a cada trek."
    ]}
  ],

  /* Packing checklists (used in PDF + prep) */
  packing: [
    { category: "Documentos & esenciales", items: ["Pasaporte + eTA Canadá", "Licencia de conducir + permiso internacional", "Seguro de viaje / médico", "Reserva del auto y alojamientos", "Parks Canada Pass", "Tarjetas + efectivo (CAD)"] },
    { category: "Trekking & seguridad", items: ["Botas de montaña domadas", "Mochila 30–40 L", "Sistema de hidratación 2–3 L + filtro", "Bear spray + silbato", "Botiquín + frontal (headlamp)", "Bastones de trekking", "Mapas offline / AllTrails", "Snacks y barras energéticas"] },
    { category: "Ropa por capas", items: ["Base merino (2)", "Capa media fleece/pluma", "Hardshell impermeable", "Pantalón de trekking + convertible", "Gorro y guantes ligeros", "Calcetines de lana (4)", "Buff / cuello", "Gorra + gafas de sol"] },
    { category: "Fotografía", items: ["Cámara + lentes (gran angular + tele)", "Trípode ligero", "Filtro polarizador + ND", "Baterías extra + tarjetas", "Paño de limpieza + bolsa seca", "(Drone: prohibido en parques — dejar)"] },
    { category: "Auto & logística", items: ["Cargador + soporte de teléfono", "Cooler para el maletero", "Agua en garrafa", "Kit de emergencia del auto", "Adaptador de enchufe (120V)", "Bolsas de basura"] },
    { category: "Salud & cuidado", items: ["Medicación personal", "Protector solar + labial SPF", "Repelente de insectos", "Ibuprofeno / analgésicos", "Moleskin para ampollas", "After-sun"] }
  ],

  /* Estimated budget (reference only) */
  budget: {
    note: "Cifras aproximadas y solo referenciales, en CAD (dólar canadiense), alta temporada, para 4 viajeros. No incluye vuelos internacionales. Auto, combustible y pase de parques son por vehículo; comida, actividades y seguro son por persona.",
    currency: "CAD",
    items: [
      { concept: "Alquiler de auto (SUV grande/AWD, 8 días)", est: 1400 },
      { concept: "Combustible (≈1.190 km · 1 vehículo)", est: 250 },
      { concept: "Alojamiento (7 noches · 2 habitaciones · Calgary/Jasper/Banff)", est: 4800 },
      { concept: "Parks Canada (Discovery Pass · cubre el vehículo)", est: 200 },
      { concept: "Comida (≈8 días · 4 pax)", est: 1800 },
      { concept: "Actividades (Ice Explorer, cruceros, góndola · 4 pax)", est: 1100 },
      { concept: "Bear spray + equipo (2 unidades)", est: 200 },
      { concept: "Seguro de viaje (4 pax)", est: 450 }
    ],
    total: 10200
  },

  /* Restaurant directory by city (used in PDF) */
  restaurants: [
    { city: "Calgary", places: ["Model Milk — contemporáneo", "Charcut — Alberta beef", "Ten Foot Henry — veggie-forward", "Alforno Bakery & Café", "Peters' Drive-In — milkshakes clásicos"] },
    { city: "Banff", places: ["Park Distillery — comida + destilería", "The Bison — cocina de montaña", "The Maple Leaf — fine dining", "Sky Bistro — cima de la góndola", "Bear Street Tavern — pizza", "Wild Flour Bakery — desayuno"] },
    { city: "Jasper", places: ["Harvest — comparir", "Evil Dave's Grill — creativo", "Fiddle River — pescado", "The Raven Bistro — mediterráneo", "Bear's Paw Bakery — desayuno", "SnowDome Coffee"] },
    { city: "Canmore (en ruta)", places: ["Communitea Café", "Rocky Mountain Bagel Co", "The Grizzly Paw Brewing"] }
  ]
};
