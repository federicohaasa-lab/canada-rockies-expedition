# 🏔️ Canadian Rockies Expedition — Dashboard & Libro de viaje

Experiencia de viaje digital premium (estilo Apple × Airbnb × National Geographic) para una
expedición de 8 días por las Rocosas canadienses: **Calgary · Jasper · Banff** a lo largo de la
**Icefields Parkway**, con desvío a **Mount Robson**.

> El itinerario original **no se modificó**: rutas, días y trekkings se mantienen exactamente como
> fueron entregados. Todo lo demás (horarios sugeridos, comida, logística, fotografía, alertas,
> equipo, presupuesto y restaurantes) es una **capa premium añadida**.

---

## 📂 Estructura

```
Canadá/
├── index.html                      → Dashboard interactivo (abrir en el navegador)
├── pdf.html                        → Versión editorial paginada (fuente del PDF)
├── CANADA_ROCKIES_EXPEDITION.pdf   → Libro de viaje listo para imprimir/compartir
├── data/
│   └── itinerary.json              → Itinerario estructurado (JSON)
├── assets/
│   ├── css/styles.css              → Sistema de diseño premium
│   ├── js/data.js                  → Fuente de datos (usada por el dashboard y el PDF)
│   ├── js/app.js                   → Lógica: mapa, modales, animaciones
│   ├── img/photos/                 → 20 fotos (Wikimedia Commons)
│   ├── img/yt/                     → Miniaturas de los videos
│   ├── img/qr/                     → Códigos QR de los videos (para el PDF)
│   └── vendor/                     → Leaflet (mapa) local
└── README.md
```

## 📤 Para compartir (enviar a cualquier persona)

En la carpeta **Canadá** (Escritorio) hay tres archivos listos para enviar:

- **`Canada_Rockies_Expedition.html`** — el dashboard interactivo completo en **un solo archivo** (CSS, JS, datos e imágenes incrustados). Se envía y se abre con doble clic en cualquier navegador. *(El mapa satelital y los videos necesitan internet; el resto funciona sin conexión.)*
- **`Canada_Rockies_Expedition.pdf`** — el libro de viaje. Lo puede abrir cualquiera, en cualquier dispositivo.
- **`Canada_Rockies_Expedition.zip`** — el proyecto completo comprimido (para quien prefiera los archivos por separado).

## ▶️ Cómo usarlo

1. **Dashboard:** abre `index.html` con doble clic (Chrome, Safari, Edge…).
   - El mapa usa teselas online (CARTO/OpenStreetMap) y los videos embeben YouTube → requieren internet.
   - Fotos, datos, íconos y la biblioteca del mapa son **locales** → funciona casi todo sin conexión.
2. **PDF:** abre `CANADA_ROCKIES_EXPEDITION.pdf`. Es totalmente autónomo (fotos y QR incrustados).
3. **Regenerar el PDF** (si editas el contenido):
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
     --print-to-pdf="CANADA_ROCKIES_EXPEDITION.pdf" --no-pdf-header-footer \
     --virtual-time-budget=25000 "file://$PWD/pdf.html"
   ```
   O simplemente abre `pdf.html` y usa **Imprimir → Guardar como PDF** (A4, márgenes: ninguno).

## 🧩 Editar el contenido

Todo el contenido vive en **`assets/js/data.js`** (un único objeto `window.ITINERARY`).
Al editarlo se actualizan a la vez el dashboard y el PDF. Para regenerar el JSON:

```bash
node -e "global.window={};require('./assets/js/data.js');require('fs').writeFileSync('./data/itinerary.json',JSON.stringify(window.ITINERARY,null,2))"
```

## ✨ Secciones del dashboard

- **Portada (hero)** con parallax e imagen a pantalla completa.
- **Resumen ejecutivo** en tarjetas (días, ciudades, km, horas, parques, lagos, glaciares, hikes).
- **Mapa interactivo** (Leaflet, estilo oscuro) con la ruta completa, capas por día y puntos
  clickeables → ficha con foto, descripción, coordenadas, duración, dificultad, mejor hora y tips.
- **Timeline** vertical estilo Apple.
- **Vista detallada por día**: itinerario horario, comida, logística, fotografía, clima, ropa,
  equipo, optimización de ruta y alertas.
- **Atracciones** (15 tarjetas con foto, dificultad, popularidad y ficha).
- **Videos** curados de YouTube (verificados) con miniatura y reproducción embebida.
- **Guía**: recomendaciones generales + capas premium (gastronomía, compras, ruta, foto, operativa, prep).
- **Libro de viaje en PDF**: portada, índice, páginas por día, atracciones, checklists, presupuesto,
  restaurantes, recomendaciones y códigos QR a los videos.

## 📜 Créditos

- **Fotografía:** Wikimedia Commons (crédito por autor en cada ficha).
- **Mapa:** Leaflet + teselas CARTO / OpenStreetMap.
- **Tipografía:** Fraunces (display serif) + Inter (sans).

*Fechas del viaje: 5 – 13 de agosto de 2026 · Alberta & British Columbia, Canadá.*
