/* =====================================================================
   CANADIAN ROCKIES EXPEDITION — Dashboard application logic
   Renders every section from window.ITINERARY and wires the interactive
   Leaflet map, POI/video modals, scroll animations and navigation.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.ITINERARY;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* type metadata for markers / legend */
  const TYPE = {
    city:      { color: "#f0a02e", icon: "🏙️", label: "Ciudad base" },
    lake:      { color: "#2b7fd0", icon: "💧", label: "Lago" },
    glacier:   { color: "#8fd8e6", icon: "🧊", label: "Glaciar / Icefield" },
    waterfall: { color: "#12b5a6", icon: "💦", label: "Cascada" },
    mountain:  { color: "#a1743f", icon: "⛰️", label: "Montaña" },
    trek:      { color: "#3a9d63", icon: "🥾", label: "Trek / Paso" }
  };
  const DAY_COLORS = ["#94a3b8", "#2e7fb8", "#7c3aed", "#0ea5a4", "#e0952b", "#40916c", "#d1495b", "#155e75"];
  const byId = {};
  D.locations.forEach(l => byId[l.id] = l);

  /* ---------------------------------------------------------------- HERO */
  function renderHero() {
    $("#heroTitle").textContent = D.meta.title;
    $("#heroSub").textContent = D.meta.tagline;
    $("#heroDates").innerHTML = "🗓️ " + esc(D.meta.dates) + " &nbsp;·&nbsp; " + esc(D.meta.party);
    if (D.meta.travelers && $("#heroCrew")) {
      $("#heroCrew").innerHTML = D.meta.travelers.map(t =>
        `<span class="crew"><b>${esc(t.name)}</b> · ${t.age}</span>`).join("");
    }
    const picks = [D.stats[0], D.stats[2], D.stats[3], D.stats[7]];
    $("#heroMeta").innerHTML = picks.map(s => `<div><div class="k">${esc(s.value)}</div><div class="l">${esc(s.label)}</div></div>`).join("");
    document.title = D.meta.title + " · Dashboard";
  }

  /* ---------------------------------------------------------------- STATS */
  function renderStats() {
    $("#statsGrid").innerHTML = D.stats.map((s, i) => `
      <article class="stat reveal" data-d="${(i % 4) + 1}">
        <div class="ic">${s.icon}</div>
        <div class="v">${esc(s.value)}</div>
        <div class="l">${esc(s.label)}</div>
        <div class="s">${esc(s.sub)}</div>
      </article>`).join("");
  }

  /* ---------------------------------------------------------------- MAP */
  let map, dayLayers = {}, masterLayer, markerLayer, markers = [], labelsOverlay, currentDay = "all", activeTypes = new Set();
  // markers that keep a permanent label on the full-route view (rest label on hover)
  const KEY_LABELS = new Set(["peyto_lake", "columbia_icefield", "mount_robson", "maligne_lake", "lake_minnewanka", "athabasca_falls", "lake_louise"]);
  const isKey = (loc) => loc.type === "city" || KEY_LABELS.has(loc.id);

  function markerIcon(loc) {
    const t = TYPE[loc.type] || TYPE.lake;
    return L.divIcon({
      className: "", iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -17],
      html: `<div class="poi-pin poi-${loc.type}" style="--c:${t.color}"><span>${t.icon}</span></div>`
    });
  }
  // route with a dark casing + bright core for high contrast on any basemap
  function drawRoute(coords, color, group, weight) {
    if (!coords || coords.length < 2) return;
    L.polyline(coords, { color: "#05121c", weight: weight + 4, opacity: .5, lineCap: "round", lineJoin: "round" }).addTo(group);
    L.polyline(coords, { color: color, weight: weight, opacity: .97, lineCap: "round", lineJoin: "round" }).addTo(group);
  }

  function renderMap() {
    const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18, attribution: "Imagery © Esri · Maxar · Earthstar Geographics" });
    const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", { maxZoom: 17, subdomains: "abc", attribution: "© OpenTopoMap (CC-BY-SA) · © OpenStreetMap" });
    const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "© OpenStreetMap · © CARTO" });

    map = L.map("map", { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([52.1, -116.7], 7);
    // dedicated pane so place-name labels always sit above the basemap, below markers
    map.createPane("labels");
    const lp = map.getPane("labels"); lp.style.zIndex = 350; lp.style.pointerEvents = "none";
    labelsOverlay = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18, pane: "labels", opacity: .95 });

    sat.addTo(map); labelsOverlay.addTo(map);
    L.control.layers({ "🛰️ Satélite": sat, "🗺️ Terreno": topo, "🌑 Oscuro": dark }, { "Nombres de lugares": labelsOverlay }, { position: "topright", collapsed: true }).addTo(map);
    L.control.scale({ position: "bottomright", imperial: false, maxWidth: 140 }).addTo(map);

    masterLayer = L.layerGroup().addTo(map);
    drawRoute(D.routePath, "#8ff0ff", masterLayer, 4);

    D.days.forEach(d => {
      const g = L.layerGroup();
      drawRoute(d.routeCoords, DAY_COLORS[d.n] || "#2e7fb8", g, 5);
      dayLayers[d.n] = g;
    });

    markerLayer = L.layerGroup().addTo(map);
    markers = [];
    activeTypes = new Set(D.locations.map(l => l.type));
    D.locations.forEach(loc => {
      const m = L.marker(loc.coords, { icon: markerIcon(loc), title: loc.name, riseOnHover: true });
      m.bindTooltip(loc.name, { permanent: true, direction: "right", offset: [12, 0], className: "poi-label" });
      m.on("click", () => { if (!m._hidden) openPoi(loc.id); });
      m._locId = loc.id;
      m.addTo(markerLayer);
      markers.push({ m, loc });
    });

    // interactivity: wheel-zoom only while the pointer is over the map (won't hijack page scroll)
    const cont = map.getContainer();
    cont.addEventListener("mouseenter", () => map.scrollWheelZoom.enable());
    cont.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());

    fitAll();
    buildChips();
    buildLegend();
    setTimeout(applyFilters, 80);
  }

  // combined type + day filtering and label visibility
  function applyFilters() {
    markers.forEach(({ m, loc }) => {
      const typeOn = activeTypes.has(loc.type);
      let inDay = true;
      if (currentDay !== "all") { const d = D.days.find(x => x.n === currentDay); inDay = !!(d && d.routeStops && d.routeStops.includes(loc.id)); }
      m._hidden = !typeOn;
      m.setOpacity(!typeOn ? 0 : (currentDay === "all" || inDay ? 1 : .26));
      const showLabel = typeOn && (currentDay === "all" ? isKey(loc) : inDay);
      const tt = m.getTooltip(); const elt = tt && tt.getElement();
      if (elt) elt.style.display = showLabel ? "" : "none";
    });
  }
  function fitAll() {
    map.fitBounds(L.latLngBounds(D.locations.map(l => l.coords)), { padding: [55, 55] });
  }
  function selectDay(n) {
    currentDay = n;
    $$(".day-chip").forEach(c => c.classList.toggle("active", c.dataset.day == String(n)));
    Object.values(dayLayers).forEach(g => map.removeLayer(g));
    if (n === "all") {
      map.addLayer(masterLayer);
      fitAll();
    } else {
      map.removeLayer(masterLayer);
      map.addLayer(dayLayers[n]);
      const day = D.days.find(d => d.n === n);
      const stops = (day.routeStops || []).map(id => byId[id]).filter(Boolean);
      const pts = stops.map(s => s.coords).concat(day.routeCoords || []);
      if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [75, 75], maxZoom: 11 });
    }
    applyFilters();
    setTimeout(() => map.invalidateSize(), 120);
  }
  function buildChips() {
    const wrap = $("#dayChips");
    wrap.appendChild(el(`<button class="day-chip active" data-day="all">🧭 Ruta completa</button>`));
    D.days.forEach(d => wrap.appendChild(el(`<button class="day-chip" data-day="${d.n}">Día ${d.n} · ${esc(d.date)}</button>`)));
    wrap.addEventListener("click", e => {
      const c = e.target.closest(".day-chip"); if (!c) return;
      selectDay(c.dataset.day === "all" ? "all" : Number(c.dataset.day));
    });
  }
  function buildLegend() {
    const used = [...new Set(D.locations.map(l => l.type))];
    const wrap = $("#mapLegend");
    wrap.innerHTML =
      `<div class="legend-head"><b>Puntos de interés</b><button class="legend-reset" type="button">Ver todo</button></div>` +
      `<ul>${used.map(t =>
        `<li data-type="${t}"><span class="legend-pin" style="--c:${TYPE[t].color}">${TYPE[t].icon}</span>${TYPE[t].label}<span class="legend-count">${D.locations.filter(l => l.type === t).length}</span></li>`).join("")}</ul>` +
      `<div class="legend-hint">Toca un tipo para filtrarlo · toca un punto para ver su ficha</div>`;
    wrap.querySelectorAll("li[data-type]").forEach(li => li.addEventListener("click", () => {
      const t = li.dataset.type;
      if (activeTypes.has(t)) activeTypes.delete(t); else activeTypes.add(t);
      if (activeTypes.size === 0) used.forEach(x => activeTypes.add(x)); // never leave it empty
      syncLegend(); applyFilters();
    }));
    wrap.querySelector(".legend-reset").addEventListener("click", () => {
      used.forEach(x => activeTypes.add(x)); syncLegend(); selectDay("all");
    });
    syncLegend();
  }
  function syncLegend() {
    $$("#mapLegend li[data-type]").forEach(li => li.classList.toggle("off", !activeTypes.has(li.dataset.type)));
  }

  /* ---------------------------------------------------------------- TIMELINE */
  function renderTimeline() {
    $("#timelineList").innerHTML = D.days.map(d => `
      <div class="tl-item reveal">
        <div class="tl-node">${d.n}</div>
        <div class="tl-card">
          <div class="tl-top">
            <span class="tl-date">${esc(d.dow)} · ${esc(d.date)}</span>
            <span class="tl-badge">${esc(d.badge)}</span>
          </div>
          <h3>${esc(d.title)}</h3>
          <div class="tl-route">${esc(d.route)}</div>
          <p>${esc(d.summary)}</p>
          <div class="tl-meta">
            <span class="pill">🛣️ ${esc(String(d.drivingKm))} km</span>
            <span class="pill">🚗 ${esc(d.drivingTime)}</span>
            ${d.hikeName ? `<span class="pill">🥾 ${esc(d.hikingTime)}</span>` : ""}
            ${d.alerts && d.alerts.length ? `<span class="pill hot">⚠️ ${d.alerts.length} alertas</span>` : ""}
            <a class="pill" href="#dias" data-day-open="${d.n}">Ver detalle →</a>
          </div>
        </div>
      </div>`).join("");
    $("#timelineList").addEventListener("click", e => {
      const a = e.target.closest("[data-day-open]"); if (!a) return;
      openDay(Number(a.dataset.dayOpen));
    });
  }

  /* ---------------------------------------------------------------- DAY DETAIL */
  function dayBlocks(d) {
    const sched = `<div class="block span2"><h4>🕘 Itinerario sugerido</h4><ul class="sched">${
      d.schedule.map(s => `<li><div class="t">${esc(s.time)}</div><div class="c"><b>${s.icon} ${esc(s.title)}</b>${s.detail ? `<span>${esc(s.detail)}</span>` : ""}</div></li>`).join("")
    }</ul></div>`;

    const hike = d.hikeName ? `<div class="block"><h4>🥾 Trekking del día</h4><div class="kv">
      <div class="row"><b>Ruta</b>${esc(d.hikeName)}</div>
      <div class="row"><b>Tiempo en sendero</b>${esc(d.hikingTime)}</div>
      <div class="row"><b>Conducción</b>${esc(String(d.drivingKm))} km · ${esc(d.drivingTime)}</div></div></div>` : "";

    const food = `<div class="block"><h4>🍽️ Comida</h4><div class="kv">
      <div class="row"><b>Desayuno</b>${esc(d.food.breakfast)}</div>
      <div class="row"><b>Almuerzo en ruta</b>${esc(d.food.lunch)}</div>
      <div class="row"><b>Cena en destino</b>${esc(d.food.dinner)}</div>
      <div class="row"><b>Best local dish</b>${esc(d.food.bestDish)}</div></div></div>`;

    const logi = `<div class="block"><h4>⛽ Logística</h4><div class="kv">
      <div class="row"><b>Combustible</b>${d.logistics.gas.map(esc).join(" ")}</div>
      <div class="row"><b>Provisiones</b>${d.logistics.supplies.map(esc).join(" ")}</div>
      <div class="row"><b>Tiendas / servicios</b>${d.logistics.shops.map(esc).join(" ")}</div></div></div>`;

    const photo = `<div class="block"><h4>📸 Fotografía</h4><div class="kv">
      <div class="row"><b>Mejores spots</b><div class="tag-list" style="margin-top:5px">${d.photography.spots.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>
      <div class="row"><b>Golden hour</b>${esc(d.photography.goldenHour)}</div>
      <div class="row"><b>Drone</b>${esc(d.photography.drone)}</div></div></div>`;

    const weather = `<div class="block"><h4>🌦️ Clima & ropa</h4>
      <div class="weather-chip"><div class="tmp">${esc(String(d.weather.tempHigh))}°</div>
      <div><div class="wd">${esc(d.weather.conditions)} · máx ${esc(String(d.weather.tempHigh))}° / mín ${esc(String(d.weather.tempLow))}°</div>
      <div style="font-size:12px;color:var(--text-muted)">${esc(d.weather.summary)}</div></div></div>
      <div style="margin-top:12px"><b style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-faint)">Qué usar hoy</b>
      <div class="tag-list" style="margin-top:7px">${d.clothing.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div></div></div>`;

    const gear = `<div class="block"><h4>🎒 Equipo & preparación</h4>
      <div class="tag-list">${d.gear.map(g => `<span class="tag">${esc(g)}</span>`).join("")}</div>
      <div style="margin-top:14px"><b style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-faint)">🧭 Optimización de ruta</b>
      <ul style="list-style:none;margin-top:8px;display:grid;gap:7px">${d.optimization.map(o => `<li style="font-size:13px;color:var(--text-muted);padding-left:16px;position:relative"><span style="position:absolute;left:0;color:var(--forest-400)">▸</span>${esc(o)}</li>`).join("")}</ul></div></div>`;

    const alerts = d.alerts && d.alerts.length ? `<div class="block span2"><h4>⚠️ Alertas & operativa</h4>
      <ul class="alert-list">${d.alerts.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>` : "";

    const highlights = `<div class="block"><h4>✨ Highlights</h4><div class="tag-list">${d.highlights.map(h => `<span class="tag">${esc(h)}</span>`).join("")}</div></div>`;

    return sched + `<div class="day-grid" style="margin-top:18px">` + hike + highlights + food + logi + photo + weather + gear + alerts + `</div>`;
  }
  function renderDays() {
    $("#daysList").innerHTML = D.days.map(d => `
      <article class="day-card reveal" id="day-${d.n}">
        <div class="day-head" role="button" tabindex="0" aria-expanded="false">
          <div class="day-num"><b>${d.n}</b><small>Día</small></div>
          <div class="day-head-main">
            <div class="dh-top"><h3>${esc(d.title)}</h3><span class="tl-badge">${esc(d.badge)}</span></div>
            <div class="route">${esc(d.dow)} · ${esc(d.date)} — ${esc(d.route)}</div>
          </div>
          <div class="day-metrics">
            <div class="m"><b>${esc(String(d.drivingKm))}</b><small>km</small></div>
            <div class="m"><b>${esc(d.drivingTime.replace("≈", ""))}</b><small>manejo</small></div>
            <div class="m"><b>${d.hikeName ? esc(d.hikingTime) : "—"}</b><small>hiking</small></div>
          </div>
          <div class="day-chevron">⌄</div>
        </div>
        <div class="day-body"><div class="day-body-inner">
          <p class="day-summary">${esc(d.summary)}</p>
          ${dayBlocks(d)}
        </div></div>
      </article>`).join("");

    $$("#daysList .day-head").forEach(h => {
      const toggle = () => {
        const card = h.closest(".day-card");
        const body = card.querySelector(".day-body");
        const open = card.classList.toggle("open");
        h.setAttribute("aria-expanded", open);
        body.style.maxHeight = open ? body.scrollHeight + "px" : 0;
        // recalc siblings heights that might be open (kept independent)
      };
      h.addEventListener("click", toggle);
      h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });
  }
  function openDay(n) {
    const card = $("#day-" + n); if (!card) return;
    if (!card.classList.contains("open")) card.querySelector(".day-head").click();
    setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  /* ---------------------------------------------------------------- ATTRACTIONS */
  function popDots(n) { let s = ""; for (let i = 0; i < 5; i++) s += `<i class="${i < n ? "on" : ""}"></i>`; return s; }
  function renderAttractions() {
    const list = D.locations.filter(l => l.type !== "city");
    $("#attrGrid").innerHTML = list.map(l => `
      <article class="attr-card reveal" data-poi="${l.id}">
        <div class="attr-media">
          <span class="attr-type">${(TYPE[l.type] || {}).icon || ""} ${esc((TYPE[l.type] || {}).label || l.type)}</span>
          ${l.difficulty ? `<span class="attr-diff">${esc(l.difficulty)}</span>` : ""}
          <img src="${esc(l.img)}" alt="${esc(l.name)}" loading="lazy" onerror="this.style.display='none';this.parentNode.style.background='var(--grad-glacier)'">
        </div>
        <div class="attr-body">
          <h3>${esc(l.name)}</h3>
          <p class="short">${esc(l.short)}</p>
          <div class="attr-foot">
            <div class="pop" title="Popularidad">${popDots(l.popularity || 3)}</div>
            <span class="attr-dur">⏱ ${esc(l.duration)}</span>
          </div>
        </div>
      </article>`).join("");
    $("#attrGrid").addEventListener("click", e => {
      const c = e.target.closest("[data-poi]"); if (c) openPoi(c.dataset.poi);
    });
  }

  /* ---------------------------------------------------------------- VIDEOS */
  function renderVideos() {
    $("#vidGrid").innerHTML = D.videos.map(v => `
      <article class="vid-card reveal" data-vid="${v.id}">
        <div class="vid-thumb">
          <span class="vid-topic">${esc(v.topic)}</span>
          <span class="vid-dur">${esc(v.duration)}</span>
          <div class="vid-play"><span>▶</span></div>
          <img src="assets/img/yt/${esc(v.id)}.jpg" alt="${esc(v.title)}" loading="lazy" onerror="this.style.display='none';this.parentNode.style.background='var(--grad-glacier)'">
        </div>
        <div class="vid-body">
          <h3>${esc(v.title)}</h3>
          <div class="vid-chan">▷ ${esc(v.channel)}</div>
          <p class="vid-reason">${esc(v.reason)}</p>
        </div>
      </article>`).join("");
    $("#vidGrid").addEventListener("click", e => {
      const c = e.target.closest("[data-vid]"); if (c) openVideo(c.dataset.vid);
    });
  }

  /* ---------------------------------------------------------------- RECOMMENDATIONS + LAYERS */
  function renderRecs() {
    $("#recGrid").innerHTML = D.recommendations.map((r, i) => `
      <article class="rec-card reveal" data-d="${(i % 4) + 1}">
        <div class="rec-ic">${r.icon}</div>
        <h3>${esc(r.title)}</h3>
        <ul>${r.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>
      </article>`).join("");
    $("#layerGrid").innerHTML = D.layers.map((r, i) => `
      <article class="rec-card reveal" data-d="${(i % 4) + 1}">
        <div class="rec-ic">${r.icon}</div>
        <h3>${esc(r.title)}</h3>
        <p class="intro">${esc(r.intro)}</p>
        <ul>${r.items.map(it => `<li>${esc(it)}</li>`).join("")}</ul>
      </article>`).join("");
  }

  /* ---------------------------------------------------------------- MODALS */
  const modal = $("#modal"), modalBody = $("#modalBody");
  let lastFocused = null;
  function openModal(html) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = html;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    const cb = $("#modalClose"); if (cb) cb.focus();
  }
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    lastFocused = null;
  }
  function openPoi(id) {
    const l = byId[id]; if (!l) return;
    const t = TYPE[l.type] || {};
    const facts = [
      ["Duración", l.duration],
      ["Dificultad", l.difficulty || "—"],
      ["Mejor hora", l.bestTime],
      ["Coordenadas", l.coords[0].toFixed(4) + ", " + l.coords[1].toFixed(4)],
      ["Reserva", l.reservation || "No requiere"],
      ["Días", (l.days || []).map(n => "D" + n).join(" · ") || "—"]
    ];
    openModal(`
      <div class="modal-hero">
        <img src="${esc(l.img)}" alt="${esc(l.name)}" onerror="this.style.display='none';this.parentNode.style.background='var(--grad-glacier)'">
        <div class="cap"><div class="type">${t.icon || ""} ${esc(t.label || l.type)}${l.optional ? " · Opcional en ruta" : ""}</div><h3>${esc(l.name)}</h3></div>
      </div>
      <div class="modal-content">
        <p class="desc">${esc(l.description)}</p>
        <div class="modal-facts">${facts.map(f => `<div class="fact"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join("")}</div>
        <div class="modal-tips"><b>📸 Tips fotográficos</b><p>${esc(l.photoTips)}</p></div>
        <div class="modal-credit">Foto: ${esc(l.credit)}</div>
      </div>`);
  }
  function openVideo(id) {
    const v = D.videos.find(x => x.id === id); if (!v) return;
    openModal(`
      <iframe class="video-frame" src="https://www.youtube.com/embed/${esc(v.id)}?autoplay=1&rel=0" title="${esc(v.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="modal-content">
        <div class="type" style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--glacier-700)">${esc(v.topic)} · ${esc(v.duration)}</div>
        <h3 style="font-size:1.5rem;margin-top:8px">${esc(v.title)}</h3>
        <div style="color:var(--glacier-700);font-weight:650;margin-top:6px">▷ ${esc(v.channel)}</div>
        <p class="desc" style="margin-top:12px">${esc(v.reason)}</p>
        <a class="btn btn-dark" style="margin-top:16px" href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener">Abrir en YouTube ↗</a>
      </div>`);
  }
  $("#modalClose").addEventListener("click", closeModal);
  $(".modal-scrim").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("show")) closeModal(); });

  /* ---------------------------------------------------------------- NAV + SCROLL FX */
  function initNav() {
    const nav = $("#nav"), links = $("#navLinks"), toggle = $("#navToggle");
    const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    toggle.addEventListener("click", () => { const open = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", open); });
    links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });

    const secs = $$("main section[id]");
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          $$("#navLinks a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(s => spy.observe(s));
  }
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    $$(".reveal").forEach(r => io.observe(r));
  }
  function initParallax() {
    const bg = $("#heroImg"); if (!bg) return;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) bg.style.transform = "translateY(" + (y * 0.28) + "px) scale(1.05)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- BOOT */
  document.addEventListener("DOMContentLoaded", () => {
    renderHero(); renderStats(); renderTimeline(); renderDays();
    renderAttractions(); renderVideos(); renderRecs();
    initNav(); initParallax();
    if (window.L) { try { renderMap(); } catch (e) { console.error("Map error", e); $("#map").innerHTML = '<div style="color:#fff;padding:40px;text-align:center">Mapa no disponible sin conexión.</div>'; } }
    initReveal();
    // open day / poi via hash
    if (location.hash.startsWith("#day-")) setTimeout(() => openDay(Number(location.hash.replace("#day-", ""))), 400);
  });
})();
