/* ==========================================================================
   Glossary. Definitions are written for SHS learners and stay close to the
   module's wording. Every entry can be opened from a lesson pop-up.
   ========================================================================== */

export const GLOSSARY = [
  { id: "hardware", term: "Hardware", lesson: "computer-system", definition: "The physical components of a computer that can be seen and touched, such as the motherboard, processor, memory, storage drive, monitor, keyboard, and mouse." },
  { id: "software", term: "Software", lesson: "computer-system", definition: "The programs and instructions that direct the computer to perform tasks. Software is divided into system software and application software." },
  { id: "system-software", term: "System software", lesson: "system-software", definition: "Software that manages the computer's hardware and basic operations and provides a platform for other programs. Examples: operating systems, drivers, utilities, and firmware." },
  { id: "application-software", term: "Application software", lesson: "application-software", definition: "Software that helps a user perform a specific task, such as writing a document, preparing a presentation, browsing the web, or editing an image." },
  { id: "operating-system", term: "Operating system", lesson: "system-software", definition: "System software that manages the processor, memory, storage, input, and output devices and provides an interface for users and programs. Examples: Windows, macOS, Linux, Android, iOS." },
  { id: "device-driver", term: "Device driver", lesson: "system-software", definition: "Software that allows the operating system to communicate with a specific hardware device, such as a printer." },
  { id: "utility-software", term: "Utility software", lesson: "system-software", definition: "Software that helps maintain, protect, configure, or improve the computer system. Examples: antivirus, backup, compression, storage management, and diagnostic tools." },
  { id: "firmware", term: "Firmware", lesson: "bios-startup", definition: "Software stored in a hardware chip that provides the basic instructions to control or start a device. BIOS and UEFI are firmware stored on the motherboard." },
  { id: "bios", term: "BIOS", lesson: "bios-startup", definition: "Basic Input/Output System. Firmware used during computer startup to initialise hardware, run POST, and hand control to the operating system." },
  { id: "uefi", term: "UEFI", lesson: "bios-startup", definition: "Unified Extensible Firmware Interface. A modern firmware interface that replaces traditional BIOS and may add a graphical setup screen, mouse support, security settings, and diagnostics." },
  { id: "motherboard", term: "Motherboard", lesson: "internal-hardware", definition: "The main circuit board of a computer. It connects and supports the processor, memory, storage, expansion cards, power supply, and other components." },
  { id: "cpu", term: "CPU (processor)", lesson: "internal-hardware", definition: "Central Processing Unit. The component that executes instructions and performs calculations. It must be compatible with the motherboard's socket and chipset." },
  { id: "ram", term: "RAM", lesson: "internal-hardware", definition: "Random-Access Memory. Temporary working memory that holds the data and instructions the processor is currently using. It clears when power is removed." },
  { id: "storage", term: "Storage device", lesson: "internal-hardware", definition: "A device that keeps files, programs, and the operating system even when the computer is turned off. Examples: hard disk drive, solid-state drive, optical drive." },
  { id: "hdd", term: "Hard disk drive (HDD)", lesson: "internal-hardware", definition: "A storage device that records data magnetically on spinning platters. It usually offers more capacity per peso but is slower than an SSD." },
  { id: "ssd", term: "Solid-state drive (SSD)", lesson: "internal-hardware", definition: "A storage device that uses flash memory chips and has no moving parts. It is typically faster and more shock-resistant than a hard disk drive." },
  { id: "psu", term: "Power supply unit (PSU)", lesson: "internal-hardware", definition: "The component that converts electricity from the outlet into the power required by the internal computer components. It must supply the right connectors and enough power." },
  { id: "cooling", term: "Cooling system", lesson: "internal-hardware", definition: "Heat sinks, case fans, and processor fans that keep components within a safe operating temperature. Poor cooling can cause overheating, instability, or damage." },
  { id: "thermal-paste", term: "Thermal paste", lesson: "assembly", definition: "Thermal interface material applied between a processor and its heat sink to fill tiny gaps and improve heat transfer." },
  { id: "expansion-card", term: "Expansion card", lesson: "internal-hardware", definition: "A card installed in a compatible motherboard slot to add or improve a function, such as graphics, sound, or network connectivity." },
  { id: "socket", term: "CPU socket", lesson: "internal-hardware", definition: "The connector on the motherboard that holds the processor. The processor must match the socket type, and its alignment marks must line up." },
  { id: "chipset", term: "Chipset", lesson: "internal-hardware", definition: "The set of motherboard chips that manages communication between the processor, memory, storage, and other devices. It affects which processors are compatible." },
  { id: "standoff", term: "Standoff", lesson: "assembly", definition: "A small spacer that holds the motherboard above the case tray. Screws go into standoffs, not directly into the metal tray." },
  { id: "fan-header", term: "Fan header", lesson: "assembly", definition: "A connector on the motherboard for a fan. The processor cooler normally connects to the header labelled CPU_FAN." },
  { id: "retaining-clip", term: "Retaining clip", lesson: "assembly", definition: "The latch at each end of a memory slot. Both clips must lock when a RAM module is fully seated." },
  { id: "disassembly", term: "Disassembly", lesson: "disassembly", definition: "The systematic removal of computer components from the system unit for cleaning, inspection, repair, replacement, upgrading, or troubleshooting." },
  { id: "assembly", term: "Assembly", lesson: "assembly", definition: "The proper installation and connection of the components that make up a functional computer system. It generally follows the reverse order of disassembly." },
  { id: "esd", term: "Electrostatic discharge", lesson: "disassembly", definition: "A sudden transfer of static electricity. Even a small discharge you cannot feel may damage sensitive electronic components." },
  { id: "antistatic-strap", term: "Antistatic wrist strap", lesson: "disassembly", definition: "A strap worn on the wrist and connected to a suitable ground point so static electricity leaves your body safely instead of through a component." },
  { id: "post", term: "POST", lesson: "bios-startup", definition: "Power-On Self-Test. The startup check that verifies essential hardware such as the processor, memory, keyboard, graphics, and storage devices before the boot-device search." },
  { id: "system-unit", term: "System unit", lesson: "types-of-computers", definition: "The main case of a desktop computer that contains the motherboard, processor, memory, storage, power supply, and other internal components." },
  { id: "input-device", term: "Input device", lesson: "external-hardware", definition: "A device that sends data or commands into the computer, such as a keyboard, mouse, or touchscreen." },
  { id: "output-device", term: "Output device", lesson: "external-hardware", definition: "A device that presents the result of the computer's work, such as a monitor, speaker, or printer." },
  { id: "peripheral", term: "Peripheral", lesson: "external-hardware", definition: "A device connected to and used outside the system unit, such as a keyboard, mouse, monitor, printer, or speaker." },
  { id: "portable", term: "Portable computer", lesson: "types-of-computers", definition: "A computer designed to be carried and used in different places, such as a laptop or tablet." },
  { id: "desktop", term: "Desktop computer", lesson: "types-of-computers", definition: "A computer designed for use in a fixed location, commonly with a separate system unit, monitor, keyboard, and mouse. Its internal components are generally accessible." },
  { id: "laptop", term: "Laptop computer", lesson: "types-of-computers", definition: "A portable personal computer with the screen, keyboard, touchpad, battery, processor, memory, and storage in one compact unit." },
  { id: "tablet", term: "Tablet", lesson: "types-of-computers", definition: "A portable computer that mainly uses a touchscreen for input. Most components are integrated and not intended for regular upgrades." },
  { id: "server", term: "Server", lesson: "types-of-computers", definition: "A computer that provides services, information, or shared resources to other computers on a network. Servers are usually designed to run continuously." },
  { id: "keyboard", term: "Keyboard", lesson: "external-hardware", definition: "An input device used to enter letters, numbers, symbols, and commands into the computer." },
  { id: "mouse", term: "Mouse", lesson: "external-hardware", definition: "A pointing device used to move the pointer, select items, open files, and interact with objects on the screen." },
  { id: "monitor", term: "Monitor", lesson: "external-hardware", definition: "An output device that displays text, images, videos, and other information produced by the computer." },
  { id: "speaker", term: "Speakers", lesson: "external-hardware", definition: "Output devices that produce sound from the computer." },
  { id: "printer", term: "Printer", lesson: "external-hardware", definition: "An output device that produces a physical copy of a document or image." },
  { id: "word-processor", term: "Word processor", lesson: "application-software", definition: "Application software for creating and editing written documents, such as a school report." },
  { id: "spreadsheet", term: "Spreadsheet software", lesson: "application-software", definition: "Application software for organising, calculating, and analysing data in rows and columns." },
  { id: "presentation", term: "Presentation software", lesson: "application-software", definition: "Application software for creating visual aids such as slides for a report or demonstration." },
  { id: "web-browser", term: "Web browser", lesson: "application-software", definition: "Application software used to access and view websites and online resources." },
  { id: "multimedia", term: "Multimedia software", lesson: "application-software", definition: "Application software for playing or editing audio and video." },
  { id: "documentation", term: "Documentation", lesson: "disassembly", definition: "Photos, diagrams, notes, and labels that record how a computer was connected before disassembly, so it can be reassembled correctly." },
  { id: "labeled-container", term: "Labelled container", lesson: "disassembly", definition: "A small box or bag marked with the part or location it belongs to, used to keep screws and small components from being lost or mixed up." },
  { id: "input", term: "Input", lesson: "computer-system", definition: "Data or commands entered into a computer, usually through a device such as a keyboard, mouse, or touchscreen." },
  { id: "output", term: "Output", lesson: "computer-system", definition: "The result a computer produces, such as text on a monitor, sound from a speaker, or a printed page." },
  { id: "process", term: "Processing", lesson: "computer-system", definition: "The work the processor does on data: executing instructions and performing calculations." },
  { id: "setup-utility", term: "Setup utility", lesson: "bios-setup", definition: "The BIOS/UEFI menu where a technician views system information and changes basic startup settings. It is opened with a manufacturer-designated key during startup." },
  { id: "system-information", term: "System Information", lesson: "bios-setup", definition: "A setup menu that shows detected hardware such as processor model, installed memory, storage devices, firmware version, and the system date and time." },
  { id: "boot-menu", term: "Boot menu", lesson: "bios-boot", definition: "A temporary menu on some computers that lets the user choose a startup device for one session without changing the saved boot order." },
  { id: "security-menu", term: "Security menu", lesson: "bios-setup", definition: "The firmware menu that may contain passwords, Secure Boot settings, and other security options. Change it only when the procedure requires it." },
  { id: "secure-boot", term: "Secure Boot", lesson: "bios-setup", definition: "A UEFI security feature that helps block untrusted software during startup. Incorrect changes can interfere with an operating system installation." },
  { id: "date-time", term: "System date and time", lesson: "bios-setup", definition: "Firmware settings the operating system uses when it starts. Wrong values can affect file timestamps, certificates, scheduled tasks, updates, and software installation." },
  { id: "cmos-battery", term: "CMOS battery", lesson: "bios-setup", definition: "The small motherboard battery that keeps firmware date and time settings when the computer is disconnected from electrical power." },
  { id: "boot-device", term: "Boot device", lesson: "bios-boot", definition: "A device containing the files needed to start a computer or begin an operating system installation, such as an SSD, HDD, USB drive, optical disc, or network device." },
  { id: "boot-order", term: "Boot order", lesson: "bios-boot", definition: "Also called boot priority. The sequence BIOS/UEFI follows when checking devices for startup files." },
  { id: "legacy-boot", term: "Legacy boot", lesson: "bios-boot", definition: "The older BIOS boot method. It may appear beside UEFI mode in the boot menu; the correct choice depends on the intended installation." },
  { id: "save-changes", term: "Save Changes and Exit", lesson: "bios-boot", definition: "The exit option that stores new BIOS/UEFI settings before leaving the setup utility." },
  { id: "discard-changes", term: "Discard Changes and Exit", lesson: "bios-boot", definition: "The exit option that closes the setup utility without applying changes made in the current session." },
  { id: "load-defaults", term: "Load Setup Defaults", lesson: "bios-safety", definition: "The option that restores the firmware's recommended settings. Review the result before saving because earlier choices may also change." },
  { id: "beep-code", term: "Beep code", lesson: "bios-startup", definition: "A pattern of short and long beeps produced by firmware to report a hardware problem during POST. The meaning depends on the firmware maker." },
  { id: "diagnostic-light", term: "Diagnostic light", lesson: "bios-startup", definition: "A light on a motherboard or component that helps identify a hardware fault reported during POST." },
  { id: "hardware-vs-config", term: "Hardware vs configuration problem", lesson: "bios-safety", definition: "A hardware problem involves a physical part or connection. A configuration problem involves a setting such as boot priority or an unsaved change." }
];

export const GLOSSARY_BY_ID = Object.fromEntries(GLOSSARY.map((entry) => [entry.id, entry]));

export function glossaryForLesson(lessonId) {
  return GLOSSARY.filter((entry) => entry.lesson === lessonId);
}

export function searchGlossary(query) {
  const q = query.trim().toLowerCase();
  if (!q) return GLOSSARY;
  return GLOSSARY.filter((entry) => `${entry.term} ${entry.definition}`.toLowerCase().includes(q));
}

export const QUICK_RECAP = [
  { prompt: "Hardware is…", answer: "the physical components you can see and touch." },
  { prompt: "Software is…", answer: "the programs and instructions that tell the computer what to do." },
  { prompt: "System software…", answer: "manages hardware and provides a platform for other programs." },
  { prompt: "Application software…", answer: "helps a user perform a specific task." },
  { prompt: "The motherboard…", answer: "connects and supports the internal components." },
  { prompt: "The processor…", answer: "executes instructions and performs calculations." },
  { prompt: "RAM…", answer: "temporarily stores active data and clears when power is off." },
  { prompt: "A storage device…", answer: "keeps files, programs, and the OS when the computer is off." },
  { prompt: "The PSU…", answer: "converts outlet electricity into power for the components." },
  { prompt: "Before disassembly…", answer: "shut down, unplug, protect against ESD, and document connections." },
  { prompt: "Assembly generally…", answer: "follows the reverse order of disassembly, with compatibility checks." },
  { prompt: "Before powering on…", answer: "inspect seating, cables, screws, cooling, and the closed case." }
];
