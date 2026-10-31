const categories = [
  {
    id: "area",
    label: "Area Charts",
    slugs: [
      "chart-area-interactive",
      "chart-area-default",
      "chart-area-linear",
      "chart-area-step",
      "chart-area-legend",
      "chart-area-stacked",
      "chart-area-stacked-expand",
      "chart-area-icons",
      "chart-area-gradient",
      "chart-area-axes",
    ],
  },
  {
    id: "bar",
    label: "Bar Charts",
    slugs: [
      "chart-bar-interactive",
      "chart-bar-default",
      "chart-bar-horizontal",
      "chart-bar-multiple",
      "chart-bar-stacked",
      "chart-bar-label",
      "chart-bar-label-custom",
      "chart-bar-mixed",
      "chart-bar-active",
      "chart-bar-negative",
    ],
  },
  {
    id: "line",
    label: "Line Charts",
    slugs: [
      "chart-line-interactive",
      "chart-line-default",
      "chart-line-linear",
      "chart-line-step",
      "chart-line-multiple",
      "chart-line-dots",
      "chart-line-dots-custom",
      "chart-line-dots-colors",
      "chart-line-label",
      "chart-line-label-custom",
    ],
  },
  {
    id: "pie",
    label: "Pie Charts",
    slugs: [
      "chart-pie-simple",
      "chart-pie-separator-none",
      "chart-pie-label",
      "chart-pie-label-custom",
      "chart-pie-label-list",
      "chart-pie-legend",
      "chart-pie-donut",
      "chart-pie-donut-active",
      "chart-pie-donut-text",
      "chart-pie-stacked",
      "chart-pie-interactive",
    ],
  },
  {
    id: "radar",
    label: "Radar Charts",
    slugs: [
      "chart-radar-default",
      "chart-radar-dots",
      "chart-radar-lines-only",
      "chart-radar-label-custom",
      "chart-radar-grid-custom",
      "chart-radar-grid-none",
      "chart-radar-grid-circle",
      "chart-radar-grid-circle-no-lines",
      "chart-radar-grid-circle-fill",
      "chart-radar-grid-fill",
      "chart-radar-multiple",
      "chart-radar-legend",
    ],
  },
  {
    id: "radial",
    label: "Radial Charts",
    slugs: [
      "chart-radial-simple",
      "chart-radial-label",
      "chart-radial-grid",
      "chart-radial-text",
      "chart-radial-shape",
      "chart-radial-stacked",
    ],
  },
  {
    id: "tooltip",
    label: "Tooltips",
    slugs: [
      "chart-tooltip-default",
      "chart-tooltip-indicator-line",
      "chart-tooltip-indicator-none",
      "chart-tooltip-label-custom",
      "chart-tooltip-label-formatter",
      "chart-tooltip-label-none",
      "chart-tooltip-formatter",
      "chart-tooltip-icons",
      "chart-tooltip-advanced",
    ],
  },
];

const root = document.querySelector("[b-chart-catalog]");
const ranges = {
  "90d": { label: "Last 3 months", count: 90 },
  "30d": { label: "Last 30 days", count: 30 },
  "7d": { label: "Last 7 days", count: 7 },
};
const browserData = [
  { label: "Chrome", value: 275 },
  { label: "Safari", value: 200 },
  { label: "Firefox", value: 187 },
  { label: "Edge", value: 173 },
  { label: "Other", value: 90 },
];
const radarMonths = ["January", "February", "March", "April", "May", "June"];
let activeCategory = "area";
let activeRange = "90d";
let activeSeries = "desktop";
let activePie = "Chrome";

/** Returns the display title used by the shadcn chart cards. */
function titleFromSlug(slug) {
  return slug
    .replace(/^chart-/, "")
    .split("-")
    .filter((word) => !["default", "simple"].includes(word))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Area Interactive", "Area Chart - Interactive")
    .replace("Bar Interactive", "Bar Chart - Interactive")
    .replace("Line Interactive", "Line Chart - Interactive")
    .replace(/^Area$/, "Area Chart")
    .replace(/^Bar$/, "Bar Chart")
    .replace(/^Line$/, "Line Chart")
    .replace(/^Pie$/, "Pie Chart")
    .replace(/^Radar$/, "Radar Chart")
    .replace(/^Radial$/, "Radial Chart")
    .replace(/^Tooltip$/, "Tooltip - Default");
}

/** Generates stable daily desktop/mobile values for the interactive examples. */
function visitorRows() {
  return Array.from({ length: 90 }, (_, index) => {
    const date = new Date(Date.UTC(2024, 3, 2 + index));
    const wave = Math.sin(index * 0.47) * 58 + Math.cos(index * 0.19) * 36;
    const spike = index % 13 === 4 || index % 17 === 9 ? 92 : 0;
    return {
      date,
      desktop: Math.max(72, Math.round(184 + wave + spike + ((index * 29) % 86))),
      mobile: Math.max(58, Math.round(154 + wave * 0.62 + ((index * 41) % 72))),
    };
  });
}

/** Filters the shared interactive data to the selected range. */
function rangeRows() {
  const count = ranges[activeRange]?.count || ranges["90d"].count;
  return visitorRows().slice(-count);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDay(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function totalFor(rows, key) {
  return rows.reduce((sum, row) => sum + row[key], 0);
}

function categoryFromSlug(slug) {
  return categories.find((category) => category.slugs.includes(slug))?.id || activeCategory;
}

function pointsFor(values, width = 640, height = 220, padX = 18, padY = 28) {
  const max = Math.max(...values, 1);
  const innerWidth = width - padX * 2;
  const innerHeight = height - padY * 2;
  return values.map((value, index) => {
    const x = padX + (innerWidth * index) / Math.max(1, values.length - 1);
    const y = padY + innerHeight - (value / max) * innerHeight;
    return { x, y, value };
  });
}

function curvePath(points, mode = "natural") {
  if (!points.length) return "";
  if (mode === "step") {
    return points.map((point, index) => (index ? `H${point.x} V${point.y}` : `M${point.x} ${point.y}`)).join(" ");
  }
  if (mode === "linear") return points.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`).join(" ");
  return points.map((point, index) => {
    if (!index) return `M${point.x} ${point.y}`;
    const prev = points[index - 1];
    const mid = (prev.x + point.x) / 2;
    return `C${mid} ${prev.y} ${mid} ${point.y} ${point.x} ${point.y}`;
  }).join(" ");
}

function axisLabels(rows) {
  const picks = [0, Math.floor(rows.length * 0.28), Math.floor(rows.length * 0.55), Math.floor(rows.length * 0.78), rows.length - 1];
  return [...new Set(picks)].map((index) => {
    const x = 18 + (604 * index) / Math.max(1, rows.length - 1);
    return `<text x="${x}" y="238">${formatDay(rows[index].date)}</text>`;
  }).join("");
}

function grid(width = 640) {
  return `<g b-chart-grid><line x1="18" y1="40" x2="${width - 18}" y2="40"/><line x1="18" y1="96" x2="${width - 18}" y2="96"/><line x1="18" y1="152" x2="${width - 18}" y2="152"/><line x1="18" y1="208" x2="${width - 18}" y2="208"/></g>`;
}

function legend(labels) {
  return `<div b-chart-legend>${labels.map((label, index) => `<span style="--b-chart-color: var(--b-chart-${index + 1})">${label}</span>`).join("")}</div>`;
}

function rangeButtons() {
  return `<div b-chart-demo-controls aria-label="Chart date range">
    ${Object.entries(ranges).map(([range, item]) => `<button b-ui="button" b-att-variant="outline" type="button" b-chart-range="${range}" aria-pressed="${range === activeRange}">${item.label}</button>`).join("")}
  </div>`;
}

function metricTabs(rows) {
  const metrics = [
    ["desktop", "Desktop", totalFor(rows, "desktop")],
    ["mobile", "Mobile", totalFor(rows, "mobile")],
  ];
  return `<div b-chart-metric-tabs>${metrics.map(([key, label, value]) => `<button type="button" b-chart-series-toggle="${key}" aria-pressed="${key === activeSeries}">
    <span>${label}</span>
    <strong>${formatNumber(value)}</strong>
  </button>`).join("")}</div>`;
}

function interactiveAreaSvg() {
  const rows = rangeRows();
  const desktop = pointsFor(rows.map((row) => row.desktop));
  const mobile = pointsFor(rows.map((row) => row.mobile));
  const desktopPath = curvePath(desktop);
  const mobilePath = curvePath(mobile);
  return `<svg viewBox="0 0 640 250" role="img" aria-label="Desktop and mobile visitors">
    <defs>
      <linearGradient id="chartAreaDesktop" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stop-color="var(--b-chart-1)" stop-opacity="0.8"/><stop offset="95%" stop-color="var(--b-chart-1)" stop-opacity="0.08"/></linearGradient>
      <linearGradient id="chartAreaMobile" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stop-color="var(--b-chart-2)" stop-opacity="0.45"/><stop offset="95%" stop-color="var(--b-chart-2)" stop-opacity="0.05"/></linearGradient>
    </defs>
    ${grid()}
    <path b-chart-area b-chart-series style="--b-chart-color: var(--b-chart-2)" fill="url(#chartAreaMobile)" d="${mobilePath} L622 220 L18 220 Z"></path>
    <path b-chart-area b-chart-series style="--b-chart-color: var(--b-chart-1)" fill="url(#chartAreaDesktop)" d="${desktopPath} L622 220 L18 220 Z"></path>
    <path b-chart-line b-chart-series style="--b-chart-color: var(--b-chart-2)" d="${mobilePath}"></path>
    <path b-chart-line b-chart-series style="--b-chart-color: var(--b-chart-1)" d="${desktopPath}"></path>
    <g b-chart-axis>${axisLabels(rows)}</g>
  </svg>`;
}

function interactiveLineSvg() {
  const rows = rangeRows();
  const values = rows.map((row) => row[activeSeries]);
  const points = pointsFor(values);
  return `<svg viewBox="0 0 640 250" role="img" aria-label="${activeSeries} visitors">
    ${grid()}
    <path b-chart-line b-chart-series style="--b-chart-color: var(--b-chart-${activeSeries === "desktop" ? 1 : 2})" d="${curvePath(points)}"></path>
    ${points.filter((_, index) => index % Math.ceil(points.length / 10) === 0).map((point, index) => `<circle b-chart-point tabindex="0" b-chart-series cx="${point.x}" cy="${point.y}" r="${index === 2 ? 4 : 2.5}" aria-label="${formatDay(rows[index].date)} ${point.value}"></circle>`).join("")}
    <g b-chart-axis>${axisLabels(rows)}</g>
  </svg>`;
}

function interactiveBarSvg() {
  const rows = rangeRows();
  const values = rows.map((row) => row[activeSeries]);
  const max = Math.max(...values, 1);
  const barWidth = Math.max(3, Math.min(18, 590 / values.length - 2));
  return `<svg viewBox="0 0 640 250" role="img" aria-label="${activeSeries} visitors">
    ${grid()}
    ${values.map((value, index) => {
      const height = Math.max(4, (value / max) * 176);
      const x = 24 + (index * 590) / values.length;
      const y = 220 - height;
      const isActive = index === Math.floor(values.length * 0.36);
      return `${isActive ? `<rect b-chart-active-band x="${Math.max(18, x - 8)}" y="28" width="${barWidth + 16}" height="192" rx="2"></rect>` : ""}<rect b-chart-point tabindex="0" b-chart-series ${isActive ? "b-att-active=\"true\"" : ""} x="${x}" y="${y}" width="${barWidth}" height="${height}" rx="2" aria-label="${formatDay(rows[index].date)} ${value}"></rect>`;
    }).join("")}
    <g b-chart-axis>${axisLabels(rows)}</g>
  </svg>`;
}

function areaSvg(slug) {
  const values = slug.includes("stacked") ? [94, 168, 122, 205, 144, 214] : [74, 182, 126, 214, 136, 196];
  const path = curvePath(pointsFor(values), slug.includes("step") ? "step" : slug.includes("linear") ? "linear" : "natural");
  return `<svg viewBox="0 0 640 250" role="img" aria-label="${titleFromSlug(slug)}">
    ${slug.includes("gradient") ? `<defs><linearGradient id="${slug}Gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stop-color="var(--b-chart-1)" stop-opacity="0.8"/><stop offset="95%" stop-color="var(--b-chart-1)" stop-opacity="0.08"/></linearGradient></defs>` : ""}
    ${grid()}
    ${slug.includes("stacked") ? `<path b-chart-area b-chart-series style="--b-chart-color: var(--b-chart-2)" d="M18 165 C128 128 238 148 348 108 S532 128 622 96 L622 220 L18 220 Z"></path>` : ""}
    <path b-chart-area b-chart-series ${slug.includes("stacked-expand") ? "b-att-strong" : ""} ${slug.includes("gradient") ? `fill="url(#${slug}Gradient)"` : ""} d="${path} L622 220 L18 220 Z"></path>
    <path b-chart-line b-chart-series d="${path}"></path>
    ${slug.includes("icons") ? `<circle b-chart-dot b-chart-series cx="380" cy="46" r="4"></circle>` : ""}
    <g b-chart-axis><text x="18" y="238">Jan</text><text x="138" y="238">Feb</text><text x="258" y="238">Mar</text><text x="378" y="238">Apr</text><text x="498" y="238">May</text><text x="600" y="238">Jun</text></g>
  </svg>`;
}

function barSvg(slug) {
  const values = slug.includes("negative") ? [82, -36, 124, -58, 164, 98] : [112, 156, 132, 188, 96, 172];
  const max = Math.max(...values.map(Math.abs), 1);
  const horizontal = slug.includes("horizontal");
  return `<svg viewBox="0 0 640 250" role="img" aria-label="${titleFromSlug(slug)}">
    ${grid()}
    ${values.map((value, index) => {
      const color = slug.includes("multiple") || slug.includes("mixed") ? `var(--b-chart-${(index % 5) + 1})` : "var(--b-chart-1)";
      if (horizontal) {
        return `<rect b-chart-point tabindex="0" b-chart-series x="104" y="${42 + index * 28}" width="${(Math.abs(value) / max) * 460}" height="18" rx="4" style="--b-chart-color:${color}" aria-label="Month ${index + 1}: ${value}"></rect>`;
      }
      const height = Math.max(6, (Math.abs(value) / max) * 150);
      const y = value < 0 ? 122 : 210 - height;
      return `<rect b-chart-point tabindex="0" b-chart-series ${slug.includes("active") && index === 3 ? "b-att-active=\"true\"" : ""} x="${54 + index * 92}" y="${y}" width="42" height="${height}" rx="4" style="--b-chart-color:${color}" aria-label="Month ${index + 1}: ${value}"></rect>`;
    }).join("")}
    ${slug.includes("label") ? values.map((value, index) => `<text b-chart-value-label x="${75 + index * 92}" y="34">${value}</text>`).join("") : ""}
    <g b-chart-axis><text x="54" y="238">Jan</text><text x="146" y="238">Feb</text><text x="238" y="238">Mar</text><text x="330" y="238">Apr</text><text x="422" y="238">May</text><text x="514" y="238">Jun</text></g>
  </svg>`;
}

function lineSvg(slug) {
  const values = [142, 88, 196, 124, 226, 104, 184];
  const primary = curvePath(pointsFor(values), slug.includes("step") ? "step" : slug.includes("linear") ? "linear" : "natural");
  const secondary = curvePath(pointsFor(values.map((value) => Math.max(58, value - 42))), "natural");
  return `<svg viewBox="0 0 640 250" role="img" aria-label="${titleFromSlug(slug)}">
    ${grid()}
    ${slug.includes("multiple") ? `<path b-chart-line b-chart-series style="--b-chart-color: var(--b-chart-2)" d="${secondary}"></path>` : ""}
    <path b-chart-line b-chart-series d="${primary}"></path>
    ${slug.includes("dots") ? pointsFor(values).map((point, index) => `<circle b-chart-point tabindex="0" b-chart-series cx="${point.x}" cy="${point.y}" r="${slug.includes("custom") ? 5 : 3.5}" style="--b-chart-color: var(--b-chart-${slug.includes("colors") ? (index % 5) + 1 : 1})" aria-label="Point ${index + 1}: ${point.value}"></circle>`).join("") : ""}
    ${slug.includes("label") ? `<text b-chart-value-label x="484" y="64">Desktop</text>` : ""}
  </svg>`;
}

function pieSlicePaths(values, radius = 82, donut = false) {
  const total = values.reduce((sum, item) => sum + item.value, 0);
  let startAngle = -90;
  return values.map((item, index) => {
    const sweep = (item.value / total) * 360;
    const endAngle = startAngle + sweep;
    const large = sweep > 180 ? 1 : 0;
    const start = polar(120, 120, radius, startAngle);
    const end = polar(120, 120, radius, endAngle);
    const innerRadius = donut ? radius - 36 : 0;
    const innerEnd = polar(120, 120, innerRadius, endAngle);
    const innerStart = polar(120, 120, innerRadius, startAngle);
    const active = item.label === activePie || (index === 0 && !values.some((entry) => entry.label === activePie));
    startAngle = endAngle;
    if (donut) {
      return `<path b-chart-slice b-chart-series tabindex="0" b-chart-pie-slice="${item.label}" ${active ? "b-att-active=\"true\"" : ""} fill="var(--b-chart-${index + 1})" d="M${start.x} ${start.y} A${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y} L${innerEnd.x} ${innerEnd.y} A${innerRadius} ${innerRadius} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z" aria-label="${item.label}: ${item.value}"></path>`;
    }
    return `<path b-chart-slice b-chart-series tabindex="0" b-chart-pie-slice="${item.label}" ${active ? "b-att-active=\"true\"" : ""} fill="var(--b-chart-${index + 1})" d="M120 120 L${start.x} ${start.y} A${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y} Z" aria-label="${item.label}: ${item.value}"></path>`;
  }).join("");
}

function polar(cx, cy, radius, angle) {
  const radians = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function pieSvg(slug) {
  const donut = slug.includes("donut");
  const label = slug.includes("label");
  const text = slug.includes("text");
  const total = browserData.reduce((sum, item) => sum + item.value, 0);
  return `<svg viewBox="0 0 240 240" role="img" aria-label="${titleFromSlug(slug)}">
    ${pieSlicePaths(browserData, donut ? 78 : 76, donut)}
    ${label ? browserData.slice(0, 4).map((item, index) => `<text b-chart-pie-label x="${index % 2 ? 195 : 42}" y="${66 + index * 42}">${item.value}</text>`).join("") : ""}
    ${text ? `<text x="120" y="116" text-anchor="middle" b-chart-total>${formatNumber(total)}</text><text x="120" y="138" text-anchor="middle" b-chart-axis>Visitors</text>` : ""}
  </svg>`;
}

function radarSvg(slug) {
  const desktop = [186, 305, 237, 273, 209, 214];
  const mobile = [160, 245, 195, 240, 180, 190];
  const points = radarPoints(desktop);
  const mobilePoints = radarPoints(mobile);
  const circular = slug.includes("circle");
  return `<svg viewBox="0 0 240 240" role="img" aria-label="${titleFromSlug(slug)}">
    ${slug.includes("grid-none") ? "" : radarGrid(circular, slug.includes("fill"))}
    ${slug.includes("multiple") || slug.includes("lines-only") ? `<polygon b-chart-radar-line b-chart-series style="--b-chart-color: var(--b-chart-2)" points="${mobilePoints}"></polygon>` : ""}
    <polygon ${slug.includes("lines-only") ? "b-chart-radar-line" : "b-chart-area"} b-chart-series points="${points}"></polygon>
    ${slug.includes("lines-only") ? "" : points.split(" ").map((pair, index) => {
      const [x, y] = pair.split(",");
      return `<circle b-chart-radar-point tabindex="0" b-chart-series cx="${x}" cy="${y}" r="${slug.includes("dots") ? 4 : 3}" aria-label="${radarMonths[index]}: ${desktop[index]}"></circle>`;
    }).join("")}
    <g b-chart-radar-labels>${radarMonths.map((month, index) => {
      const point = polar(120, 120, 108, -90 + index * 60);
      return `<text x="${point.x}" y="${point.y}">${month}</text>`;
    }).join("")}</g>
  </svg>`;
}

function radarPoints(values) {
  const max = Math.max(...values, 1);
  return values.map((value, index) => {
    const point = polar(120, 120, 34 + (value / max) * 64, -90 + index * 60);
    return `${point.x},${point.y}`;
  }).join(" ");
}

function radarGrid(circular, fill) {
  if (circular) {
    return [34, 58, 82].map((radius) => `<circle b-chart-radar-grid ${fill ? "b-att-fill" : ""} cx="120" cy="120" r="${radius}"></circle>`).join("");
  }
  return [34, 58, 82].map((radius) => {
    const points = Array.from({ length: 6 }, (_, index) => {
      const point = polar(120, 120, radius, -90 + index * 60);
      return `${point.x},${point.y}`;
    }).join(" ");
    return `<polygon b-chart-radar-grid ${fill ? "b-att-fill" : ""} points="${points}"></polygon>`;
  }).join("");
}

function radialSvg(slug) {
  const values = slug.includes("stacked") ? [78, 64, 52] : [72];
  return `<svg viewBox="0 0 240 240" role="img" aria-label="${titleFromSlug(slug)}">
    ${values.map((value, index) => {
      const radius = 78 - index * 24;
      return `<circle b-chart-radial-grid cx="120" cy="120" r="${radius}" stroke-width="18"></circle>
        <circle b-chart-radial-track tabindex="0" b-chart-series cx="120" cy="120" r="${radius}" fill="none" stroke="var(--b-chart-${index + 1})" stroke-width="18" stroke-linecap="${slug.includes("shape") ? "butt" : "round"}" stroke-dasharray="${value * 4.9} 490" transform="rotate(-90 120 120)" aria-label="Visitors ${value}%"></circle>`;
    }).join("")}
    ${slug.includes("text") || slug.includes("label") ? `<text x="120" y="116" text-anchor="middle" b-chart-total>${formatNumber(1260)}</text><text x="120" y="138" text-anchor="middle" b-chart-axis>Visitors</text>` : ""}
  </svg>`;
}

function tooltipSvg(slug) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const running = [320, 360, 280, 310, 430, 390];
  const swimming = [260, 225, 300, 84, 310, 285];
  const tooltipX = slug.includes("label-none") ? 334 : slug.includes("formatter") ? 262 : 354;
  return `<div b-chart-tooltip-demo>
    <svg viewBox="0 0 520 240" role="img" aria-label="${titleFromSlug(slug)}">
      ${labels.map((label, index) => {
        const x = 34 + index * 78;
        const swimHeight = swimming[index] / 3;
        const runHeight = running[index] / 3;
        return `<rect b-chart-series x="${x}" y="${204 - swimHeight}" width="60" height="${swimHeight}" rx="4" style="--b-chart-color: var(--b-chart-1)"></rect>
          <rect b-chart-series x="${x}" y="${204 - swimHeight - runHeight}" width="60" height="${runHeight}" rx="4" style="--b-chart-color: var(--b-chart-2)"></rect>
          <text b-chart-axis x="${x + 20}" y="228">${label}</text>`;
      }).join("")}
    </svg>
    <div b-chart-floating-tooltip style="left:${tooltipX}px; top:${slug.includes("advanced") ? 40 : 66}px" b-att-indicator="${slug.includes("indicator-none") ? "none" : slug.includes("indicator-line") ? "line" : "dot"}">
      ${slug.includes("label-none") ? "" : `<strong>${slug.includes("label-formatter") ? "Weekday activity" : "2024-07-20"}</strong>`}
      <span><i style="--b-chart-color: var(--b-chart-1)"></i>Running <b>${slug.includes("formatter") ? "$480.00" : "480"}</b></span>
      <span><i style="--b-chart-color: var(--b-chart-2)"></i>Swimming <b>${slug.includes("formatter") ? "$400.00" : "400"}</b></span>
      ${slug.includes("advanced") ? `<em>+12.5% from last week</em>` : ""}
    </div>
  </div>`;
}

function chartSvg(category, slug) {
  if (slug === "chart-area-interactive") return interactiveAreaSvg();
  if (slug === "chart-bar-interactive") return interactiveBarSvg();
  if (slug === "chart-line-interactive") return interactiveLineSvg();
  if (category === "area") return areaSvg(slug);
  if (category === "bar") return barSvg(slug);
  if (category === "line") return lineSvg(slug);
  if (category === "pie") return pieSvg(slug);
  if (category === "radar") return radarSvg(slug);
  if (category === "radial") return radialSvg(slug);
  return tooltipSvg(slug);
}

function renderHeader(category, slug) {
  const title = titleFromSlug(slug);
  if (slug === "chart-area-interactive") {
    return `<div b-chart-header b-att-layout="inline"><div><h3 b-chart-title>${title}</h3><p b-chart-description>Showing total visitors for the last 3 months</p></div>${rangeButtons()}</div>`;
  }
  if (slug === "chart-bar-interactive" || slug === "chart-line-interactive") {
    const rows = rangeRows();
    return `<div b-chart-header b-att-layout="metrics"><div><h3 b-chart-title>${title}</h3><p b-chart-description>Showing total visitors for the last 3 months</p></div>${metricTabs(rows)}</div>`;
  }
  return `<div b-chart-header><h3 b-chart-title>${title}</h3><p b-chart-description>${category === "tooltip" ? tooltipDescription(slug) : category === "pie" || category === "radar" || category === "radial" ? "January - June 2024" : "Showing total visitors for the last 6 months"}</p></div>`;
}

function tooltipDescription(slug) {
  if (slug.includes("indicator-line")) return "Tooltip with line indicator.";
  if (slug.includes("indicator-none")) return "Tooltip with no indicator.";
  if (slug.includes("label")) return "Tooltip with custom label behavior.";
  if (slug.includes("formatter")) return "Tooltip with formatted values.";
  if (slug.includes("icons")) return "Tooltip with series icons.";
  if (slug.includes("advanced")) return "Tooltip with rich content.";
  return "Default tooltip with ChartTooltipContent.";
}

function footer(category, slug) {
  if (slug === "chart-pie-interactive") {
    return `<div b-chart-footer b-chart-pie-controls>${browserData.map((item) => `<button type="button" b-chart-pie-toggle="${item.label}" aria-pressed="${item.label === activePie}"><span style="--b-chart-color: var(--b-chart-${browserData.indexOf(item) + 1})">${item.label}</span><strong>${formatNumber(item.value)}</strong></button>`).join("")}</div>`;
  }
  if (category === "area" || category === "bar" || category === "line" || category === "pie" || category === "radar" || category === "radial") {
    return `<div b-chart-footer><div b-chart-trend>Trending up by 5.2% this month <span b-icon="trending-up" b-icon-size="1rem"></span></div><div b-chart-range>${category === "area" || category === "bar" || category === "line" ? ranges[activeRange].label : "Showing total visitors for the last 6 months"}</div></div>`;
  }
  return "";
}

function renderCard(slug) {
  const category = categoryFromSlug(slug);
  const wide = slug.includes("interactive");
  return `<article b-ui="chart" b-chart-demo-card ${wide ? "b-att-wide" : ""} b-att-type="${category === "tooltip" ? "bar" : category}" b-att-variant="area-card" aria-label="${titleFromSlug(slug)}">
    ${renderHeader(category, slug)}
    <div b-chart-body ${slug.includes("interactive") ? "b-att-compact" : ""}>
      ${chartSvg(category, slug)}
      ${slug.includes("legend") || slug.includes("multiple") || slug.includes("interactive") ? legend(category === "pie" ? browserData.map((item) => item.label) : ["Desktop", "Mobile"]) : ""}
    </div>
    ${footer(category, slug)}
    <div b-chart-card-actions>
      <button b-ui="button" b-att-variant="outline" type="button" b-chart-copy="${slug}"><span b-icon="copy"></span>Copy</button>
    </div>
  </article>`;
}

/** Renders the active chart family and remounts the Nodex UI behavior for new markup. */
function render() {
  const category = categories.find((item) => item.id === activeCategory) || categories[0];
  root.innerHTML = `<div b-chart-toolbar>
    <div b-chart-category-list>${categories.map((item) => `<button b-ui="button" b-att-variant="outline" type="button" b-chart-category="${item.id}" aria-pressed="${item.id === activeCategory}">${item.label}</button>`).join("")}</div>
    ${rangeButtons()}
  </div>
  <h2 class="h4 fw-semibold mb-0">${category.label}</h2>
  <div b-chart-example-grid>${category.slugs.map((slug) => renderCard(slug)).join("")}</div>`;
  globalThis.thebase?.mountAll(root);
}

root.addEventListener("click", async (event) => {
  const categoryButton = event.target.closest("[b-chart-category]");
  const rangeButton = event.target.closest("[b-chart-range]");
  const copyButton = event.target.closest("[b-chart-copy]");
  const seriesButton = event.target.closest("[b-chart-series-toggle]");
  const pieButton = event.target.closest("[b-chart-pie-toggle], [b-chart-pie-slice]");
  if (categoryButton) {
    activeCategory = categoryButton.getAttribute("b-chart-category");
    render();
  } else if (rangeButton) {
    activeRange = rangeButton.getAttribute("b-chart-range");
    render();
  } else if (seriesButton) {
    activeSeries = seriesButton.getAttribute("b-chart-series-toggle");
    render();
  } else if (pieButton) {
    activePie = pieButton.getAttribute("b-chart-pie-toggle") || pieButton.getAttribute("b-chart-pie-slice");
    render();
  } else if (copyButton) {
    const card = copyButton.closest("[b-chart-demo-card]");
    await globalThis.navigator?.clipboard?.writeText(card?.outerHTML || "");
    copyButton.replaceChildren("Copied");
  }
});

render();
