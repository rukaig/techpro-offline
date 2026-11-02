/* ==========================================================================
   Parts catalogue and PC Lab step definitions.
   One case, one bench, two directions: assembly and disassembly.
   ========================================================================== */

export const PARTS = [
  { id: "cpu", name: "Processor", short: "CPU", art: "cpu", icon: "cpu", category: "Processing", socket: "AM4", zone: "cpu-socket", blurb: "Executes instructions and performs calculations. Its notch and triangle must line up with the socket." },
  { id: "cooler", name: "CPU cooler", short: "Cooler", art: "cooler", icon: "cooling", category: "Cooling", zone: "cooler-mount", blurb: "Moves heat away from the processor. The fan cable goes to the CPU_FAN header." },
  { id: "thermal", name: "Thermal paste", short: "Paste", art: "thermal", icon: "drop", category: "Cooling", zone: "cpu-socket", blurb: "Fills microscopic gaps between the processor and heat sink so heat can transfer." },
  { id: "ram", name: "Memory module", short: "RAM", art: "ram", icon: "ram", category: "Memory", type: "DDR4", zone: "ram-slots", blurb: "Temporary working memory. Press evenly until both retaining clips click." },
  { id: "motherboard", name: "Motherboard", short: "Board", art: "motherboard", icon: "motherboard", category: "Foundation", socket: "AM4", memory: "DDR4", zone: "board-tray", blurb: "The main circuit board. It mounts on standoffs and connects every component." },
  { id: "psu", name: "Power supply", short: "PSU", art: "psu", icon: "psu", category: "Power", watts: 550, zone: "psu-bay", blurb: "Converts outlet electricity into the voltages the components use. Keep its vents clear." },
  { id: "ssd", name: "Solid-state drive", short: "SSD", art: "storage", icon: "storage", category: "Storage", zone: "drive-bay", blurb: "Keeps the operating system, programs, and files even when power is off." },
  { id: "gpu", name: "Graphics card", short: "GPU", art: "expansion", icon: "card", category: "Expansion", zone: "pcie-slot", blurb: "An expansion card that adds or improves graphics output. Seat it fully and secure the bracket." },
  { id: "cables", name: "Cable kit", short: "Cables", art: "cable", icon: "cable", category: "Connection", zone: "cable-route", blurb: "Power, data, and front-panel cables. Route them so they do not block airflow." },
  { id: "screws", name: "Screw container", short: "Screws", art: "screws", icon: "container", category: "Tools", zone: "bench", blurb: "Labelled containers keep screws with the parts they belong to." },
  { id: "strap", name: "Antistatic strap", short: "Strap", art: "strap", icon: "shield", category: "Safety", zone: "bench", blurb: "Discharges static safely before you touch sensitive components." },
  { id: "labels", name: "Labels & camera", short: "Labels", art: "labels", icon: "camera", category: "Safety", zone: "bench", blurb: "Document cable connections before removal so reassembly is guided, not guessed." }
];

export const PART_BY_ID = Object.fromEntries(PARTS.map((part) => [part.id, part]));

export const ASSEMBLY_STEPS = [
  {
    id: "inspect",
    n: 1,
    title: "Prepare and inspect",
    instruction: "Check the bench and confirm the parts are compatible. The board is AM4 with DDR4 slots. Pick the processor and memory that belong with it.",
    part: "strap",
    zone: "bench",
    mini: "compat",
    hint: "AM4 board → AM4 processor. DDR4 slots → DDR4 memory.",
    safety: true
  },
  {
    id: "cpu",
    n: 2,
    title: "Install the processor",
    instruction: "Lift the socket lever, align the triangle and notch, then place the processor gently. Never force it.",
    part: "cpu",
    zone: "cpu-socket",
    mini: "cpu-seat",
    hint: "The gold triangle on the processor matches the triangle on the socket corner.",
    safety: true
  },
  {
    id: "cooler",
    n: 3,
    title: "Thermal paste and cooling",
    instruction: "Apply a small amount of thermal paste, seat the cooler evenly, then connect its fan to the correct header.",
    part: "cooler",
    zone: "cooler-mount",
    mini: "paste",
    requires: ["cpu"],
    hint: "A small centered dot is enough. The pressure of the cooler spreads it. The fan belongs on CPU_FAN.",
    safety: true
  },
  {
    id: "ram",
    n: 4,
    title: "Install the memory",
    instruction: "Open both retaining clips, align the notch, and press the module evenly until both clips lock.",
    part: "ram",
    zone: "ram-slots",
    mini: "ram-clip",
    hint: "Listen and look for both clips. One clip closed means the module is not fully seated.",
    safety: true
  },
  {
    id: "board",
    n: 5,
    title: "Mount the motherboard",
    instruction: "Lower the board onto the standoffs and tighten the screws evenly. Do not overtighten.",
    part: "motherboard",
    zone: "board-tray",
    mini: "tighten",
    requires: ["cpu", "cooler", "ram"],
    hint: "Snug, not crushed. Work around the board in a cross pattern.",
    safety: true
  },
  {
    id: "psu",
    n: 6,
    title: "Install the power supply",
    instruction: "Slide the PSU into its bay with the fan facing the vent, then secure it. Do not block ventilation.",
    part: "psu",
    zone: "psu-bay",
    mini: "psu-vent",
    hint: "In this bottom-mounted bay, the fan faces down toward the filtered floor vent.",
    safety: true
  },
  {
    id: "storage",
    n: 7,
    title: "Install the storage",
    instruction: "Slide the SSD into the drive bay, align the mounting holes, and secure it with screws.",
    part: "ssd",
    zone: "drive-bay",
    mini: "screws",
    hint: "The drive bay is on the right side of the case. Four screws, two per side.",
    safety: false
  },
  {
    id: "gpu",
    n: 8,
    title: "Install the expansion card",
    instruction: "Remove the blanking plate, seat the graphics card in the PCIe slot, and secure the bracket.",
    part: "gpu",
    zone: "pcie-slot",
    mini: "card-seat",
    hint: "The card clicks into the slot. Do not touch the gold contacts.",
    safety: true
  },
  {
    id: "cables",
    n: 9,
    title: "Connect the cables",
    instruction: "Connect the 24-pin, CPU power, SATA power and data, front panel, and fan cables. Route them clear of fans.",
    part: "cables",
    zone: "cable-route",
    mini: "cables",
    hint: "The 24-pin goes to the long board connector. CPU power goes to the top-left 8-pin. Front panel labels are printed on the plugs.",
    safety: true
  },
  {
    id: "boot",
    n: 10,
    title: "Inspect and boot",
    instruction: "Close the case, check for loose screws and blocked fans, then power on and confirm POST.",
    part: "screws",
    zone: "inspection",
    mini: "boot",
    hint: "No loose screws. No cables in fans. All connectors seated. Case closed. Then press power.",
    safety: true
  }
];

export const DISASSEMBLY_STEPS = [
  {
    id: "prep",
    n: 1,
    title: "Shut down and prepare",
    instruction: "Shut down the operating system, unplug the power cable, disconnect peripherals, and put on the antistatic strap.",
    part: "strap",
    zone: "bench",
    mini: "safety",
    hint: "Power off first. Static protection second. Everything else after.",
    safety: true
  },
  {
    id: "document",
    n: 2,
    title: "Document the connections",
    instruction: "Photograph the cable routing and label both ends of each cable before removing anything.",
    part: "labels",
    zone: "bench",
    mini: "document",
    hint: "A wide photo plus close-ups of each connector group.",
    safety: true
  },
  {
    id: "open",
    n: 3,
    title: "Open the case",
    instruction: "Remove the side-panel screws and place them in the labelled container. Slide the panel off.",
    part: "screws",
    zone: "case-panel",
    mini: "screws",
    hint: "Panel screws go straight into the labelled container, not the table edge.",
    safety: true
  },
  {
    id: "cables",
    n: 4,
    title: "Disconnect internal cables",
    instruction: "Disconnect power and data cables by holding the connector, not the wires.",
    part: "cables",
    zone: "cable-route",
    mini: "unplug",
    hint: "Squeeze the latch where present, then pull straight out by the shell.",
    safety: true
  },
  {
    id: "gpu",
    n: 5,
    title: "Remove expansion cards",
    instruction: "Release the PCIe latch, unscrew the bracket, and lift the card out by its edges.",
    part: "gpu",
    zone: "pcie-slot",
    mini: "card-remove",
    hint: "Press the latch at the end of the slot before pulling. Hold the card by its edges.",
    safety: true
  },
  {
    id: "storage",
    n: 6,
    title: "Remove storage",
    instruction: "Disconnect the drive cables, remove the mounting screws, and slide the drive out.",
    part: "ssd",
    zone: "drive-bay",
    mini: "screws",
    hint: "Support the drive as the last screw comes out.",
    safety: false
  },
  {
    id: "ram",
    n: 7,
    title: "Remove the memory",
    instruction: "Press both retaining clips outward and lift the module by its edges.",
    part: "ram",
    zone: "ram-slots",
    mini: "ram-remove",
    hint: "Both clips at once. Then lift straight up.",
    safety: true
  },
  {
    id: "cooler",
    n: 8,
    title: "Remove cooling and processor",
    instruction: "Disconnect the fan, release the heat sink, twist gently, then lift the processor carefully.",
    part: "cooler",
    zone: "cooler-mount",
    mini: "cooler-remove",
    hint: "Warm paste can stick. A gentle twist breaks the seal; never pry with metal.",
    safety: true
  },
  {
    id: "psu",
    n: 9,
    title: "Remove the power supply",
    instruction: "Remove the four PSU screws while supporting its weight, then lift it out.",
    part: "psu",
    zone: "psu-bay",
    mini: "support",
    hint: "One hand supports the PSU before the last screw leaves.",
    safety: true
  },
  {
    id: "board",
    n: 10,
    title: "Remove the motherboard",
    instruction: "Disconnect remaining headers, remove the mounting screws, and lift the board by its edges.",
    part: "motherboard",
    zone: "board-tray",
    mini: "board-remove",
    hint: "Count the screws. Store them with the board so they return to the same standoffs.",
    safety: true
  }
];

export const ZONES = {
  "cpu-socket": { label: "CPU socket", area: { left: "34%", top: "33%", width: "12%", height: "17%" } },
  "cooler-mount": { label: "CPU cooler mount", area: { left: "31%", top: "29%", width: "18%", height: "24%" } },
  "ram-slots": { label: "Memory slots", area: { left: "51%", top: "24%", width: "12%", height: "36%" } },
  "board-tray": { label: "Motherboard tray", area: { left: "27.4%", top: "19%", width: "36%", height: "46%" } },
  "psu-bay": { label: "Power supply bay", area: { left: "27.4%", top: "71%", width: "21%", height: "10.5%" } },
  "drive-bay": { label: "Drive bay", area: { left: "65%", top: "17%", width: "13.6%", height: "30%" } },
  "pcie-slot": { label: "PCIe expansion slot", area: { left: "27.4%", top: "65.5%", width: "36%", height: "6%" } },
  "cable-route": { label: "Cable routing channel", area: { left: "22%", top: "79%", width: "42%", height: "8%" } },
  "case-panel": { label: "Case side panel", area: { left: "83%", top: "18%", width: "10%", height: "58%" } },
  inspection: { label: "Closed case inspection", area: { left: "30%", top: "34%", width: "40%", height: "34%" } },
  bench: { label: "Workbench mat", area: { left: "4%", top: "14%", width: "17%", height: "72%" } },
  tray: { label: "Parts tray", area: { left: "4%", top: "14%", width: "17%", height: "72%" } }
};

export const COMPATIBILITY = {
  socket: "AM4",
  memory: "DDR4",
  formFactor: "ATX mid-tower",
  psuWatts: 550,
  cpuOptions: [
    { id: "am4", label: "AM4 processor", detail: "Ryzen 5 · 6 cores", ok: true },
    { id: "lga1700", label: "LGA1700 processor", detail: "Intel Core i5 · different socket", ok: false }
  ],
  ramOptions: [
    { id: "ddr4", label: "DDR4 memory", detail: "2 × 8 GB · 3200 MHz", ok: true },
    { id: "ddr5", label: "DDR5 memory", detail: "2 × 8 GB · different notch", ok: false }
  ]
};

export const CABLE_TARGETS = [
  { id: "24pin", label: "24-pin ATX power", target: "board-power", hint: "Long connector on the right edge of the board." },
  { id: "cpu8", label: "8-pin CPU power", target: "cpu-power", hint: "Top-left of the board, near the processor." },
  { id: "sata", label: "SATA data + power", target: "ssd", hint: "One cable to the drive, one to the board." },
  { id: "front", label: "Front-panel header", target: "front-panel", hint: "Power button, reset, USB, and audio pins at the bottom edge." },
  { id: "fan", label: "CPU fan header", target: "cpu-fan", hint: "Labelled CPU_FAN near the socket." }
];

export const TROUBLESHOOTING = [
  { symptom: "Fans spin but the monitor stays dark", options: ["Check the monitor input and display cable", "Replace the power supply immediately", "Remove the CPU cooler"], answer: 0, explain: "A display problem is usually the cable, the monitor input, or memory seating before it is a dead component." },
  { symptom: "The CPU fan never spins", options: ["Connect it to the CPU_FAN header", "Plug it into a SATA power cable", "Ignore it; the heat sink is enough"], answer: 0, explain: "The fan must be connected to the correct motherboard fan header." },
  { symptom: "The drive is not detected in firmware", options: ["Check the data and power cables and boot order", "Remove the RAM", "Install a second operating system"], answer: 0, explain: "Check physical connections before changing software or parts." }
];

export const PCLAB_MODES = [
  { id: "guided", name: "Guided build", note: "Hints always on, no time pressure. Best for a first build.", xp: 80 },
  { id: "practice", name: "Practice", note: "Hints on request, strikes recorded. Build confidence.", xp: 110 },
  { id: "challenge", name: "Challenge", note: "No hints, scored on speed and accuracy. One clean run.", xp: 150 }
];

export function starRating(accuracy, strikes, mode = "practice") {
  const strikeLimit = mode === "guided" ? 99 : mode === "practice" ? 3 : 1;
  if (accuracy >= 92 && strikes <= strikeLimit) return 3;
  if (accuracy >= 72 && strikes <= strikeLimit + 2) return 2;
  return 1;
}
