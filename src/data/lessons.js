/* ==========================================================================
   Library content.
   The lesson prose follows the DepEd COC 1 module. Anything added by TechPro
   (analogies, extra practice pointers, accessibility notes) is labelled
   "Extra". Figures are the module's own illustrations, re-encoded for the web.
   ========================================================================== */

const fig = (src, alt, caption = "", extra = false) => `
  <figure class="lesson-figure${extra ? " is-extra" : ""}">
    <img src="/assets/module/${src}" alt="${alt}" loading="lazy" decoding="async">
    <figcaption>${extra ? '<span class="tag tag-extra">Extra</span> ' : ""}${caption}</figcaption>
  </figure>`;

const extra = (title, body) => `
  <aside class="lesson-extra" aria-label="Extra: ${title}">
    <p class="lesson-extra-label">Extra · not in the module</p>
    <h3>${title}</h3>
    ${body}
  </aside>`;

const term = (word, label = word) => `<button type="button" class="glossary-term" data-term="${word}">${label}</button>`;

export const LESSONS = [
  {
    id: "computer-system",
    number: 1,
    title: "The Computer System",
    kicker: "Start here",
    summary: "Hardware and software working together to turn input into useful output.",
    minutes: 7,
    goal: "explain",
    objectives: ["Describe what a computer system is", "Name the two halves of every computer system", "Explain why hardware alone is not enough"],
    keyTerms: ["hardware", "software", "system-software", "application-software", "input", "output", "process", "storage"],
    sections: [
      {
        id: "two-halves",
        title: "Two halves of one machine",
        html: `
          <p>A computer system is not just a box of parts. It is ${term("hardware")} and ${term("software")} working together to receive data, process it, store information, and produce output.</p>
          <p>Think about typing a school report. The keyboard accepts your input. The processor handles the instructions. Memory temporarily holds the working data. The operating system manages the computer's resources. The word processor lets you create and edit the document. Every part has a job, and the job only makes sense when the parts work together.</p>
          <p>If one important component is missing, incorrectly installed, or incompatible, the computer may not operate properly. A processor that does not fit the socket, a memory module the board cannot read, or a missing driver can all stop a perfectly good machine from doing its work.</p>
          ${fig("hardware-and-software.webp", "A diagram showing hardware and software as two connected halves of a computer system", "Hardware and software are two halves of the same system.")}
          <div class="callout callout-tip">
            <span class="icon-slot" data-icon="lightbulb"></span>
            <div><strong>Remember the equation</strong>Hardware + system software + application software = a functional computer system. Remove any term and the equation stops balancing.</div>
          </div>
        `
      },
      {
        id: "what-each-part-does",
        title: "Who does what",
        html: `
          <p>When you use a computer, four kinds of work happen in a rough cycle:</p>
          <ol class="lesson-list">
            <li><strong>Input.</strong> You type, click, tap, or speak. A device turns your action into data.</li>
            <li><strong>Processing.</strong> The processor executes instructions and performs calculations on that data.</li>
            <li><strong>Storage.</strong> Data and programs are kept, either temporarily in memory or long-term on a drive.</li>
            <li><strong>Output.</strong> The result appears on a screen, comes out of a speaker, or prints on paper.</li>
          </ol>
          <p>Software directs all four stages. ${term("system-software")} manages the hardware and provides a platform for other programs. ${term("application-software")} helps you perform a specific task, such as writing a report, browsing the web, or editing an image.</p>
          ${extra("A kitchen, not a magic box", `
            <p>Input is the ingredients you bring in. Processing is the cooking. Storage is the fridge and the pantry. Output is the plate you serve. The operating system is the kitchen manager; applications are the recipes. A recipe cannot cook without a kitchen, and a kitchen with no recipe just sits there.</p>
            <p>This analogy is TechPro's, not the module's. Use it if it helps, but keep the module's technical terms in your written answers.</p>
          `)}
        `
      },
      {
        id: "why-it-matters",
        title: "Why a technician needs the whole picture",
        html: `
          <p>Understanding the types and parts of a computer helps you determine each component's function and how the parts work together. As a future computer technician, you also need to know how to safely disassemble and assemble a computer system.</p>
          <p>Following the correct sequence, using appropriate tools, disconnecting the computer from its power source, and protecting components from electrostatic discharge can prevent injury and equipment damage.</p>
          ${fig("technician-reminder.webp", "A technician working carefully at a computer workbench", "A technician's habits protect both people and equipment.")}
          <p>The rest of this library follows the module's four lesson areas: types and parts of a computer, system software, application software, and proper disassembly and assembly procedures.</p>
        `
      }
    ]
  },
  {
    id: "types-of-computers",
    number: 2,
    title: "Types of Computers",
    kicker: "Lesson 1 · Part A",
    summary: "Desktop, laptop, tablet, and server: same idea, different shape and purpose.",
    minutes: 8,
    goal: "identify",
    objectives: ["Match a computer type to a real situation", "Explain why desktops are easier to service", "Describe what a server provides"],
    keyTerms: ["desktop", "laptop", "tablet", "server", "system-unit", "portable"],
    sections: [
      {
        id: "why-types-exist",
        title: "Different shapes for different jobs",
        html: `
          <p>Computers are designed in different forms depending on the tasks they need to perform. Some are intended for individual users, while others provide services to many users or handle large amounts of information.</p>
          <p>You may see computers in schools, homes, offices, stores, hospitals, and service centers. You may also use a desktop computer, laptop, tablet, or smartphone to prepare schoolwork, communicate with others, access information, and complete different tasks.</p>
        `
      },
      {
        id: "desktop",
        title: "Desktop computer",
        html: `
          ${fig("desktop-computer.webp", "A desktop computer with a separate system unit, monitor, keyboard, and mouse", "A desktop computer in a fixed location.")}
          <p>A desktop computer is designed for use in a fixed location. It commonly consists of a ${term("system-unit")}, monitor, keyboard, and mouse.</p>
          <p>Desktop computers are often used in computer laboratories, offices, homes, and service centers. Their internal components are generally accessible, making them suitable for hardware disassembly, assembly, repair, maintenance, and upgrading.</p>
          <div class="callout callout-tip">
            <span class="icon-slot" data-icon="lightbulb"></span>
            <div><strong>Why the lab uses desktops</strong>You can open the case, see each component, and replace one part without special tools. That is exactly why this module's PC Lab is a desktop.</div>
          </div>
        `
      },
      {
        id: "laptop",
        title: "Laptop computer",
        html: `
          ${fig("laptop-computer.webp", "A laptop computer with screen, keyboard, and touchpad in one portable unit", "A laptop integrates the screen, input, battery, and components.")}
          <p>A laptop computer is a ${term("portable")} personal computer. The screen, keyboard, touchpad, battery, processor, memory, and storage device are contained in one compact unit.</p>
          <p>A laptop can perform many of the same tasks as a desktop computer. However, its compact construction may make its internal components more difficult to access, repair, or replace.</p>
        `
      },
      {
        id: "tablet",
        title: "Tablet",
        html: `
          ${fig("tablet-computer.webp", "A tablet computer held in two hands with a touchscreen interface", "A tablet is built around a touchscreen.")}
          <p>A tablet is a portable computer that mainly uses a touchscreen for input. People commonly use it to view learning materials, browse the internet, communicate, and run mobile applications.</p>
          <p>Unlike a desktop computer, most tablet components are integrated into a thin enclosure and are not intended for regular user upgrades.</p>
        `
      },
      {
        id: "server",
        title: "Server",
        html: `
          ${fig("server-computer.webp", "A rack of server computers with status lights", "Servers provide services to other computers on a network.")}
          <p>A ${term("server")} is a computer that provides services, information, or shared resources to other computers on a network. It may store user files, host applications, manage accounts, or provide network services.</p>
          <p>Servers are usually designed to operate continuously and support several users or devices.</p>
          ${extra("One computer, many clients", `
            <p>A server is not a different kind of silicon. It is a computer tuned for a different job: staying on, serving many clients at once, and protecting shared data. A school file server, a game server, and a web server all follow that same pattern.</p>
          `)}
        `
      },
      {
        id: "quick-compare",
        title: "Quick comparison",
        html: `
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Comparison of desktop, laptop, tablet, and server computers</caption>
              <thead><tr><th scope="col">Type</th><th scope="col">Best for</th><th scope="col">Serviceability</th></tr></thead>
              <tbody>
                <tr><th scope="row">Desktop</th><td>Fixed lab or office work; upgrading</td><td>Easy to open and replace parts</td></tr>
                <tr><th scope="row">Laptop</th><td>Portable everyday work</td><td>Compact; harder to access internally</td></tr>
                <tr><th scope="row">Tablet</th><td>Reading, browsing, touch apps</td><td>Integrated; not intended for regular upgrades</td></tr>
                <tr><th scope="row">Server</th><td>Shared files and network services</td><td>Built for continuous operation</td></tr>
              </tbody>
            </table>
          </div>
          <p class="source-note">Table adapted from the module's descriptions. Comparison table is a TechPro study aid.</p>
        `
      }
    ]
  },
  {
    id: "external-hardware",
    number: 3,
    title: "External Hardware",
    kicker: "Lesson 1 · Part B",
    summary: "The input and output devices you connect outside the system unit.",
    minutes: 7,
    goal: "identify",
    objectives: ["Classify devices as input or output", "Explain what each external device does", "Recognise common connectors"],
    keyTerms: ["input-device", "output-device", "peripheral", "keyboard", "mouse", "monitor", "printer", "speaker"],
    sections: [
      {
        id: "external-meaning",
        title: "Outside the case",
        html: `
          <p>Computer hardware can be classified as external or internal. <strong>External hardware</strong> refers to the devices attached to or used outside the system unit. These are also called ${term("peripheral")} devices.</p>
          <p>External hardware is usually the part of the computer people notice first: the keyboard under your hands, the monitor at eye level, the mouse on the desk.</p>
        `
      },
      {
        id: "input",
        title: "Input devices",
        html: `
          <p>An ${term("input-device")} lets you send data or commands into the computer.</p>
          <ul class="lesson-list">
            <li><strong>Keyboard.</strong> An input device used to enter letters, numbers, symbols, and commands into the computer.</li>
            <li><strong>Mouse.</strong> A pointing device used to move the pointer, select items, open files, and interact with objects displayed on the screen.</li>
          </ul>
          <div class="callout callout-tip">
            <span class="icon-slot" data-icon="lightbulb"></span>
            <div><strong>Touchscreens count too</strong>A tablet's touchscreen is both input and output: you touch it to give commands, and it shows the result.</div>
          </div>
        `
      },
      {
        id: "output",
        title: "Output devices",
        html: `
          <p>An ${term("output-device")} presents the result of the computer's work.</p>
          <ul class="lesson-list">
            <li><strong>Monitor.</strong> An output device that displays text, images, videos, and other information produced by the computer.</li>
            <li><strong>Speakers.</strong> Output devices that produce sound from the computer.</li>
            <li><strong>Printer.</strong> An output device that produces a physical copy of a document or image.</li>
          </ul>
          ${fig("application-software.webp", "A monitor showing several open application windows", "The monitor is the most familiar output device.", false)}
        `
      },
      {
        id: "connectors",
        title: "Connectors you will meet",
        html: `
          <p>External devices need the right port and, often, the right driver. Common connections on a desktop include USB for keyboards, mice, and printers; HDMI or DisplayPort for monitors; and audio jacks for speakers or headsets.</p>
          <div class="callout callout-safety">
            <span class="icon-slot" data-icon="alertTriangle"></span>
            <div><strong>Handle connectors gently</strong>Never force a plug into a port. Check the shape and orientation first, then push straight in. Bent pins are a repair, not a lesson.</div>
          </div>
          ${extra("Ports are not interchangeable", `
            <p>A USB-C cable can carry power, data, video, or all three depending on the device and the cable. When a monitor stays dark, check both ends of the cable and the selected input source before assuming the monitor is broken.</p>
          `)}
        `
      }
    ]
  },
  {
    id: "internal-hardware",
    number: 4,
    title: "Internal Hardware",
    kicker: "Lesson 1 · Part C",
    summary: "The parts inside the case: board, processor, memory, storage, power, cooling, and expansion.",
    minutes: 12,
    goal: "identify",
    objectives: ["Name the major internal components", "Explain the function of each component", "Recognise compatibility concerns"],
    keyTerms: ["motherboard", "cpu", "ram", "storage", "hdd", "ssd", "psu", "cooling", "expansion-card", "socket", "chipset"],
    sections: [
      {
        id: "inside",
        title: "Inside the system unit",
        html: `
          <p><strong>Internal hardware</strong> refers to the components installed inside the computer case. These parts do the heavy work of processing, storing, powering, and connecting.</p>
          ${fig("hardware-and-software.webp", "An illustration of internal computer components connected to a motherboard", "Internal components communicate through the motherboard.")}
        `
      },
      {
        id: "motherboard",
        title: "Motherboard",
        html: `
          ${fig("motherboard.webp", "A motherboard showing the processor socket, memory slots, and expansion slots", "The motherboard is the main circuit board.")}
          <p>The ${term("motherboard")} is the main circuit board of a computer. It provides connections for the processor, memory, storage devices, expansion cards, power supply, and other components.</p>
          <p>The motherboard allows the different hardware components to communicate with one another. It is the reason a processor, memory module, and drive can behave like one system instead of three separate objects.</p>
        `
      },
      {
        id: "cpu",
        title: "Central Processing Unit",
        html: `
          ${fig("processor.webp", "A processor chip with its gold contact pads and alignment notch", "The processor executes instructions and performs calculations.")}
          <p>The Central Processing Unit, commonly called the ${term("cpu", "CPU")} or processor, executes instructions and performs calculations. The CPU processes data and controls many of the computer's operations.</p>
          <p>The processor must be compatible with the motherboard's CPU ${term("socket")} and ${term("chipset")}. A processor that physically fits the wrong socket is still the wrong processor.</p>
        `
      },
      {
        id: "ram",
        title: "Random-Access Memory",
        html: `
          ${fig("ram-module.webp", "A RAM module with memory chips and gold contact pins", "RAM holds the data and instructions currently in use.")}
          <p>Random-Access Memory, or ${term("ram", "RAM")}, temporarily stores data and instructions the processor is currently using. RAM clears when you turn off the computer.</p>
          <p>A computer with sufficient RAM can operate several programs more efficiently. When RAM is full, the system slows down because it must constantly shuffle data to and from storage.</p>
          <div class="callout callout-warning">
            <span class="icon-slot" data-icon="alertTriangle"></span>
            <div><strong>RAM is not storage</strong>Closing a program or shutting down clears RAM. Always save important work to a storage device.</div>
          </div>
        `
      },
      {
        id: "storage",
        title: "Storage device",
        html: `
          ${fig("storage-drive.webp", "A hard disk drive with its platters and actuator arm", "A hard disk drive stores data magnetically.")}
          <p>A ${term("storage")} device keeps files, programs, and the operating system even when the computer is turned off. Common computer storage devices include hard disk drives, solid-state drives, and optical drives.</p>
          ${fig("solid-state-drive.webp", "A solid-state drive with its memory chips and SATA connector", "A solid-state drive has no moving parts.")}
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Comparing hard disk drives and solid-state drives</caption>
              <thead><tr><th scope="col">Drive</th><th scope="col">How it stores data</th><th scope="col">Typical strength</th></tr></thead>
              <tbody>
                <tr><th scope="row">Hard disk drive (HDD)</th><td>Magnetic platters and a moving head</td><td>Lower cost per gigabyte</td></tr>
                <tr><th scope="row">Solid-state drive (SSD)</th><td>Flash memory chips, no moving parts</td><td>Faster and more shock-resistant</td></tr>
                <tr><th scope="row">Optical drive</th><td>Laser reading a disc</td><td>Reading or writing discs</td></tr>
              </tbody>
            </table>
          </div>
          <p class="source-note">This comparison is a TechPro study aid. The module lists the three storage types.</p>
        `
      },
      {
        id: "psu",
        title: "Power Supply Unit",
        html: `
          ${fig("power-supply-unit.webp", "A power supply unit with a cooling fan and cable connectors", "The PSU converts outlet electricity into power the components can use.")}
          <p>The Power Supply Unit, or ${term("psu", "PSU")}, converts electricity from the outlet into the electrical power required by the internal computer components.</p>
          <p>The power supply must provide the appropriate connectors and sufficient power for the installed hardware. A power supply that is too small, or one whose ventilation is blocked, can cause instability or damage.</p>
        `
      },
      {
        id: "cooling",
        title: "Cooling system",
        html: `
          ${fig("cooling-system.webp", "A processor heat sink and fan assembly", "Heat sinks and fans keep components inside their safe temperature range.")}
          <p>The ${term("cooling")} system helps control the operating temperature of computer components. It may include heat sinks, case fans, and a processor fan.</p>
          <p>Improper cooling may cause overheating, system instability, or damage to computer components. Thermal paste helps heat move from the processor to the heat sink.</p>
        `
      },
      {
        id: "expansion",
        title: "Expansion card",
        html: `
          ${fig("expansion-card.webp", "An expansion card with a bracket and gold edge connector", "Expansion cards add or improve a function.")}
          <p>An ${term("expansion-card")} adds or improves a computer function. Examples include graphics cards, sound cards, and network interface cards.</p>
          <p>Expansion cards are installed in compatible expansion slots on the motherboard.</p>
          ${extra("Check the slot before the card", `
            <p>PCIe cards fit specific slot lengths and generations. A card may physically enter a slot and still not work at its expected speed, or not work at all, if the slot is not wired for it. Read the board manual or the label beside the slot.</p>
          `)}
        `
      }
    ]
  },
  {
    id: "system-software",
    number: 5,
    title: "System Software",
    kicker: "Lesson 2",
    summary: "The operating system, drivers, utilities, and firmware that keep the hardware usable.",
    minutes: 10,
    goal: "software",
    objectives: ["Define system software", "Distinguish an OS, a driver, a utility, and firmware", "Explain why a driver matters"],
    keyTerms: ["system-software", "operating-system", "device-driver", "utility-software", "firmware", "bios", "uefi"],
    sections: [
      {
        id: "definition",
        title: "What system software does",
        html: `
          <p>Software consists of programs and instructions that direct the computer to perform tasks. Software is commonly divided into system software and application software.</p>
          <p>${term("system-software")} manages the computer's hardware and basic operations. It connects computer hardware and the programs users run. Examples include operating systems, device drivers, utility programs, and firmware.</p>
          <p>A computer cannot function properly using hardware alone. It needs system software to manage its components and application software to help users perform specific tasks.</p>
        `
      },
      {
        id: "os",
        title: "Operating system",
        html: `
          ${fig("operating-system.webp", "An operating system desktop with windows, icons, and a taskbar", "The operating system is the interface between people, programs, and hardware.")}
          <p>An ${term("operating-system", "operating system")} manages the computer's major resources, including the processor, memory, storage devices, input devices, and output devices.</p>
          <p>The operating system also provides an interface that lets users open files, run programs, manage folders, and change computer settings.</p>
          <p>Examples include Windows, macOS, Linux, Android, and iOS. The module's activities use Windows 11 as the example operating system.</p>
        `
      },
      {
        id: "driver",
        title: "Device driver",
        html: `
          ${fig("device-driver.webp", "A printer connected to a computer with a driver bridge between them", "A driver translates between the operating system and one device.")}
          <p>A ${term("device-driver", "device driver")} allows the operating system to communicate with a specific hardware device.</p>
          <p>For example, a printer driver helps the operating system send the correct instructions to a printer. Without an appropriate driver, the device may not be recognized or may not function correctly.</p>
          <div class="callout callout-tip">
            <span class="icon-slot" data-icon="lightbulb"></span>
            <div><strong>Driver rule of thumb</strong>If a device is connected correctly and powered on but still not recognised, install or update its driver before replacing the device.</div>
          </div>
        `
      },
      {
        id: "utility",
        title: "Utility software",
        html: `
          ${fig("utility-software.webp", "A utility program scanning and cleaning a disk", "Utilities maintain, protect, configure, or improve the system.")}
          <p>${term("utility-software", "Utility software")} helps maintain, protect, configure, or improve the computer system. Examples include antivirus utilities, storage management tools, backup utilities, file compression tools, and system diagnostic programs.</p>
        `
      },
      {
        id: "firmware",
        title: "Firmware",
        html: `
          ${fig("firmware.webp", "A BIOS or UEFI firmware chip on a motherboard", "Firmware is software stored inside a hardware device.")}
          <p>${term("firmware")} is software stored in a hardware device. It provides the basic instructions required to control or start the device.</p>
          <p>The Basic Input/Output System, or ${term("bios", "BIOS")}, and the Unified Extensible Firmware Interface, or ${term("uefi", "UEFI")}, are examples of firmware used during computer startup.</p>
          ${extra("Firmware is the first handshake", `
            <p>When you press the power button, firmware wakes the board, checks basic hardware, and hands control to the operating system. That is why a failed firmware update can make a computer seem completely dead, and why firmware updates should never be interrupted.</p>
          `)}
        `
      }
    ]
  },
  {
    id: "application-software",
    number: 6,
    title: "Application Software",
    kicker: "Lesson 3",
    summary: "The programs that help you write, calculate, present, browse, edit, and learn.",
    minutes: 8,
    goal: "software",
    objectives: ["Define application software", "Match a task to the right kind of program", "Explain how applications depend on system software"],
    keyTerms: ["application-software", "word-processor", "spreadsheet", "presentation", "web-browser", "multimedia"],
    sections: [
      {
        id: "definition",
        title: "Software for a task",
        html: `
          <p>${term("application-software", "Application software")} helps users accomplish tasks. Software operates with the assistance of the operating system.</p>
          <p>Examples include word-processing software for creating documents, spreadsheet software for organising and calculating data, presentation software for creating visual presentations, web browsers for accessing websites, graphics software for creating and editing images, multimedia software for playing or editing audio and video, and educational applications for completing learning activities.</p>
          ${fig("application-software.webp", "Several application windows open on a desktop, including a document and a browser", "Applications are the programs people open to do a specific job.")}
        `
      },
      {
        id: "matching",
        title: "Match the tool to the task",
        html: `
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Common application software and the tasks they support</caption>
              <thead><tr><th scope="col">Task</th><th scope="col">Application</th></tr></thead>
              <tbody>
                <tr><th scope="row">Write a school report</th><td>Word processor</td></tr>
                <tr><th scope="row">Organise grades and calculate averages</th><td>Spreadsheet</td></tr>
                <tr><th scope="row">Create visual aids for a report</th><td>Presentation software</td></tr>
                <tr><th scope="row">Access an online tutorial</th><td>Web browser</td></tr>
                <tr><th scope="row">Edit a photo</th><td>Graphics software</td></tr>
                <tr><th scope="row">Play or edit a video</th><td>Multimedia software</td></tr>
              </tbody>
            </table>
          </div>
          <p class="source-note">The task list follows the module's examples; the pairing table is a TechPro study aid.</p>
        `
      },
      {
        id: "system-vs-app",
        title: "System software and application software",
        html: `
          <p>System software and application software perform different but connected functions.</p>
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Comparison of system software and application software</caption>
              <thead><tr><th scope="col">System software</th><th scope="col">Application software</th></tr></thead>
              <tbody>
                <tr><td>Manages hardware and basic computer operations</td><td>Helps the user perform a specific task</td></tr>
                <tr><td>Commonly operates in the background</td><td>Usually opened and controlled by the user</td></tr>
                <tr><td>Provides a platform for other programs</td><td>Requires system software to operate</td></tr>
                <tr><td>Includes operating systems and drivers</td><td>Includes word processors and web browsers</td></tr>
              </tbody>
            </table>
          </div>
          <p>For example, when a learner creates a report, the word processor is the application software. The word processor uses the operating system to access the keyboard, monitor, memory, and storage device.</p>
          ${extra("The layer cake", `
            <p>Hardware at the bottom, firmware just above it, the operating system above that, and applications on top. Each layer can use the layer below it, but not the other way around. That is why an application cannot fix a broken power supply.</p>
          `)}
        `
      }
    ]
  },
  {
    id: "disassembly",
    number: 7,
    title: "Safe Disassembly",
    kicker: "Lesson 4 · Part A",
    summary: "Prepare, document, and take the computer apart without losing parts or damaging components.",
    minutes: 12,
    goal: "safety",
    objectives: ["List the preparation steps before opening a case", "Order the ten disassembly steps", "Handle components safely"],
    keyTerms: ["disassembly", "esd", "antistatic-strap", "thermal-paste", "documentation", "labeled-container"],
    sections: [
      {
        id: "why",
        title: "Why sequence matters",
        html: `
          <p>Computer ${term("disassembly")} is the systematic removal of computer components from the system unit. It may be performed for cleaning, inspection, repair, replacement, upgrading, or troubleshooting.</p>
          <p>Disassembly should not be performed by removing components randomly. A technician must observe safety precautions, document connections, organise removed parts, and follow the correct sequence.</p>
          <div class="callout callout-safety">
            <span class="icon-slot" data-icon="alertTriangle"></span>
            <div><strong>Safety first</strong>Shut down, unplug, and discharge static before you touch anything inside the case. Electricity and static are both invisible until they cause damage.</div>
          </div>
        `
      },
      {
        id: "preparation",
        title: "Preparing for disassembly",
        html: `
          <p>Before disassembling a computer, perform the following preparations:</p>
          <ul class="lesson-list">
            <li>Shut down the computer properly.</li>
            <li>Disconnect the power cable from the electrical outlet.</li>
            <li>Disconnect the peripheral devices.</li>
            <li>Remove jewellery and other conductive accessories.</li>
            <li>Prepare the required tools and parts containers.</li>
            <li>Wear an ${term("antistatic-strap", "antistatic wrist strap")} or apply appropriate electrostatic discharge precautions.</li>
            <li>Document or take pictures of existing cable connections.</li>
            <li>Prepare labels for cables, screws, and components.</li>
          </ul>
          <p>These procedures reduce the risk of electric shock, lost parts, incorrect connections, and damage to electronic components.</p>
          ${fig("safety-reminder.webp", "A safety reminder card showing an antistatic strap and unplugged power cable", "Prepare the bench before you open the case.")}
        `
      },
      {
        id: "esd",
        title: "Electrostatic discharge",
        html: `
          <p>${term("esd", "Electrostatic discharge")} is a sudden transfer of static electricity. You may not feel a small shock, but the current can still damage delicate circuits.</p>
          <p>Wear an antistatic wrist strap connected to a suitable ground point, or follow the manufacturer's recommended discharge procedure. Avoid working on carpet, and do not slide components across a desk.</p>
          ${extra("Handle by the edges", `
            <p>Hold circuit boards and memory modules by their outer edges. Avoid the gold contacts, pins, and chips. Before setting a part down, place it on an antistatic mat or inside its protective bag.</p>
          `)}
        `
      },
      {
        id: "ten-steps",
        title: "The ten-step disassembly sequence",
        html: `
          <p>The exact procedure may vary depending on the computer case and installed components. Always check the manufacturer's instructions when available. A common sequence is:</p>
          <ol class="step-list">
            <li><strong>Shut down and disconnect the computer.</strong> Shut down the operating system properly. Remove the power cable and disconnect all peripheral devices.</li>
            <li><strong>Prepare the work area.</strong> Use a clean, well-lit, dry, and organised work area. Prepare the tools, antistatic equipment, labels, and parts containers.</li>
            <li><strong>Document the connections.</strong> Take clear pictures, draw a connection diagram, or label the cables before removing them. This information will guide you during reassembly.</li>
            <li><strong>Open the computer case.</strong> Remove the screws or release the fasteners that secure the side panel. Place the screws in a labelled container.</li>
            <li><strong>Disconnect internal cables.</strong> Carefully disconnect the power and data cables. Hold each connector instead of pulling directly on the wires.</li>
            <li><strong>Remove expansion cards.</strong> Release each card from its expansion slot and hold the card by its edges. Avoid touching the gold contacts or electronic components.</li>
            <li><strong>Remove storage devices.</strong> Disconnect the storage device cables. Release the mounting screws or brackets before removing each drive.</li>
            <li><strong>Remove the memory modules.</strong> Open the retaining clips and lift the memory module by its edges. Do not touch its contact pins.</li>
            <li><strong>Remove the cooling system and processor.</strong> Disconnect the cooling fan, release the heat sink, and remove the processor carefully. This procedure requires special care because processor socket pins and contact points may be easily damaged.</li>
            <li><strong>Remove the power supply and motherboard.</strong> Support each component while removing its mounting screws. Store the screws and parts in properly labelled containers.</li>
          </ol>
        `
      },
      {
        id: "document",
        title: "Document, label, organise",
        html: `
          <p>Documentation is not paperwork for its own sake. A photo of the cable routing or a labelled bag of screws saves time and prevents mistakes during reassembly.</p>
          <ul class="lesson-list">
            <li>Photograph each cable before disconnecting it.</li>
            <li>Label both ends of cables when several look alike.</li>
            <li>Keep screws in labelled containers, grouped by where they came from.</li>
            <li>Place removed parts on a clean, static-safe surface.</li>
          </ul>
          ${extra("The five-minute habit that saves an hour", `
            <p>Take one wide photo of the open case and one close-up of each connector group. If a cable has no label, write its origin and destination on a strip of masking tape. During reassembly, match the photos instead of guessing.</p>
          `)}
        `
      }
    ]
  },
  {
    id: "assembly",
    number: 8,
    title: "Computer Assembly",
    kicker: "Lesson 4 · Part B",
    summary: "Install compatible components in the right order, then inspect before powering on.",
    minutes: 14,
    goal: "safety",
    objectives: ["Order the ten assembly steps", "Apply thermal paste and seat components correctly", "Run a pre-power inspection"],
    keyTerms: ["assembly", "thermal-paste", "standoff", "fan-header", "retaining-clip", "post"],
    sections: [
      {
        id: "reverse",
        title: "Assembly is the reverse — with checks",
        html: `
          <p>Computer ${term("assembly")} is the proper installation and connection of the components that make up a functional computer system.</p>
          <p>In general, computer assembly follows the reverse order of disassembly. However, the technician must still follow the manufacturer's instructions and confirm component compatibility.</p>
          <div class="callout callout-tip">
            <span class="icon-slot" data-icon="lightbulb"></span>
            <div><strong>Compatibility before force</strong>Check the CPU socket, memory type, power connectors, and case form factor before installing anything. If a part does not fit easily, stop and check alignment rather than pushing harder.</div>
          </div>
        `
      },
      {
        id: "ten-steps",
        title: "The ten-step assembly sequence",
        html: `
          <ol class="step-list">
            <li><strong>Prepare and inspect the components.</strong> Check the components for physical damage. Confirm that the processor, motherboard, memory, storage device, power supply, and other components are compatible.</li>
            <li><strong>Install the processor.</strong> Align the processor correctly with the motherboard socket. Gently place the processor into the socket and secure it with the locking mechanism. Never force the processor into the socket.</li>
            <li><strong>Install the cooling system.</strong> Apply thermal interface material when required. Install the heat sink and cooling fan securely, then connect the fan cable to the correct motherboard header.</li>
            <li><strong>Install the memory modules.</strong> Align the memory module with the slot. Press it evenly until the retaining clips lock into place.</li>
            <li><strong>Install the motherboard.</strong> Position the motherboard over the correct case standoffs. Secure the motherboard with the appropriate screws, but do not overtighten them.</li>
            <li><strong>Install the power supply.</strong> Position and secure the power supply. Make sure its ventilation openings are not blocked.</li>
            <li><strong>Install the storage devices.</strong> Secure the storage devices inside the appropriate drive bays or mounting locations.</li>
            <li><strong>Install the expansion cards.</strong> Insert each expansion card into the correct slot and secure the card to the computer case.</li>
            <li><strong>Connect the cables.</strong> Connect the power cables, data cables, front-panel connectors, cooling fans, and peripheral cables. Use the documentation prepared during disassembly as a guide.</li>
            <li><strong>Inspect the assembly.</strong> Before connecting the computer to electricity, check all components, cables, screws, cooling, and the case.</li>
          </ol>
        `
      },
      {
        id: "thermal",
        title: "Thermal paste and the cooling system",
        html: `
          <p>${term("thermal-paste", "Thermal interface material")}, often called thermal paste, fills the tiny gaps between the processor and the heat sink so heat can move efficiently. Apply the amount recommended by the manufacturer, then seat the heat sink evenly.</p>
          <p>Connect the processor fan to the correct header on the motherboard. A fan that never spins can lead to overheating, instability, or damage.</p>
          ${extra("A pea, not a painting", `
            <p>More paste is not better. Excess material can spread onto the socket and make a mess. A small, centered amount is usually enough; the pressure of the heat sink spreads it. Follow the cooler's instructions.</p>
          `)}
        `
      },
      {
        id: "inspection",
        title: "Inspect before you power on",
        html: `
          <p>Before connecting the computer to electricity, check that:</p>
          <ul class="checklist">
            <li>all components are correctly seated;</li>
            <li>all cables are connected securely;</li>
            <li>no loose screw is left inside the case;</li>
            <li>no cable is blocking a cooling fan;</li>
            <li>all required components are installed; and</li>
            <li>the computer case is properly closed.</li>
          </ul>
          <p>After powering on, watch and listen. Fans should spin, the monitor should receive a signal, and the system should reach the operating system without repeated restarts. If it does not, power off and recheck before changing parts.</p>
          ${fig("technician-reminder.webp", "A technician inspecting a completed computer build before powering it on", "Inspection is the last step, not an optional extra.")}
        `
      },
      {
        id: "boot",
        title: "First boot and basic troubleshooting",
        html: `
          <p>${term("post", "POST")} stands for power-on self-test. It is the firmware's first check of basic hardware. A successful POST usually produces a single short beep or a logo on screen, depending on the system.</p>
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Basic first-boot symptoms and checks</caption>
              <thead><tr><th scope="col">Symptom</th><th scope="col">Check first</th></tr></thead>
              <tbody>
                <tr><th scope="row">No power at all</th><td>Power cable, PSU switch, front-panel power connector</td></tr>
                <tr><th scope="row">Fans spin, no display</th><td>Monitor input, display cable, memory seating, CPU power</td></tr>
                <tr><th scope="row">Overheating warning</th><td>CPU fan header, heat sink seating, thermal paste, airflow</td></tr>
                <tr><th scope="row">Drive not detected</th><td>Data cable, power cable, boot order in firmware</td></tr>
              </tbody>
            </table>
          </div>
          <p class="source-note">This troubleshooting table is a TechPro Extra. The module requires a pre-power inspection and careful assembly.</p>
        `
      }
    ]
  },
  {
    id: "review",
    number: 9,
    title: "Putting It All Together",
    kicker: "Review",
    summary: "The module's summary: components, software layers, and safe procedure in one page.",
    minutes: 6,
    goal: "explain",
    objectives: ["Summarise the module's key ideas", "Connect each component to its function", "Prepare for the final assessment"],
    keyTerms: ["hardware", "software", "system-software", "application-software", "disassembly", "assembly"],
    sections: [
      {
        id: "summary",
        title: "The whole module in one page",
        html: `
          <p>A computer system is composed of hardware and software that work together to process data and perform tasks.</p>
          <p>Hardware refers to the physical parts of a computer you can see and touch. These include the motherboard, processor, RAM, storage drive, power supply unit, monitor, keyboard, and mouse.</p>
          <p>Software refers to the programs and instructions that direct the computer's operations. Software may be classified into system software, which manages computer hardware and basic operations, and application software, which helps users perform specific tasks such as creating documents, browsing websites, and preparing presentations.</p>
          <div class="callout callout-success">
            <span class="icon-slot" data-icon="checkCircle"></span>
            <div><strong>How a computer system works</strong>Hardware + system software + application software = functional computer system.</div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Component functions from the module summary</caption>
              <thead><tr><th scope="col">Component</th><th scope="col">Main function</th></tr></thead>
              <tbody>
                <tr><th scope="row">Processor</th><td>Executes instructions and processes data</td></tr>
                <tr><th scope="row">Motherboard</th><td>Connects and supports internal components</td></tr>
                <tr><th scope="row">RAM</th><td>Temporarily stores active data and instructions</td></tr>
                <tr><th scope="row">Storage drive</th><td>Stores files, programs, and the operating system</td></tr>
                <tr><th scope="row">Power supply unit</th><td>Provides electrical power to the components</td></tr>
                <tr><th scope="row">Operating system</th><td>Manages hardware and other software</td></tr>
                <tr><th scope="row">Application software</th><td>Helps the user complete specific tasks</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        id: "safe-procedure",
        title: "Safe disassembly and assembly",
        html: `
          <p>Before disassembling a computer:</p>
          <ul class="lesson-list">
            <li>Shut down the computer properly.</li>
            <li>Disconnect the computer from the power source.</li>
            <li>Prepare the necessary tools and a clean work area.</li>
            <li>Observe electrostatic discharge precautions.</li>
            <li>Document and label the cable connections.</li>
            <li>Organise the removed components and screws.</li>
          </ul>
          <p>During assembly, install each compatible component in the correct position and reconnect the cables securely. Before turning on the computer, inspect the completed assembly to ensure that no component is loose, no connection is missing, and no cable is blocking a cooling fan.</p>
        `
      },
      {
        id: "next",
        title: "Where to go next",
        html: `
          <p>You have reached the end of the module reading. The best next step is to practise. Try the <a href="/play/pc-lab">PC Lab</a> for a guided build, then take the <a href="/exam/final">Final Exam</a>. If a question surprises you, return to the matching lesson and use the glossary pop-ups.</p>
          ${extra("Build a study route", `
            <p>Strong readers often start with the Library and finish with the exam. Strong builders often start in the PC Lab, hit a term they do not know, and follow the link back to the lesson. Both routes are valid. The four learning goals on your profile show which route is working for you.</p>
          `)}
        `
      }
    ]
  }
];

export const lessonById = Object.fromEntries(LESSONS.map((lesson) => [lesson.id, lesson]));

export function lessonIndex(id) {
  return LESSONS.findIndex((lesson) => lesson.id === id);
}

export function neighbours(id) {
  const index = lessonIndex(id);
  return {
    previous: index > 0 ? LESSONS[index - 1] : null,
    next: index >= 0 && index < LESSONS.length - 1 ? LESSONS[index + 1] : null
  };
}

export const GOALS = {
  identify: { name: "Identify parts", short: "Parts", description: "Name computer types and hardware components." },
  software: { name: "Tell software apart", short: "Software", description: "Distinguish system software from application software." },
  safety: { name: "Work safely", short: "Safety", description: "Follow safe disassembly and assembly procedures." },
  explain: { name: "Explain the system", short: "Explain", description: "Explain how hardware and software work together." }
};

export function searchLessons(query) {
  const q = query.trim().toLowerCase();
  if (!q) return LESSONS;
  return LESSONS.filter((lesson) => {
    const haystack = [
      lesson.title,
      lesson.summary,
      lesson.kicker,
      ...lesson.objectives,
      ...lesson.keyTerms,
      ...lesson.sections.map((section) => `${section.title} ${section.html.replace(/<[^>]+>/g, " ")}`)
    ].join(" ").toLowerCase();
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export function readingMinutes(lesson) {
  return lesson.minutes;
}
