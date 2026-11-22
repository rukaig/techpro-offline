/* ==========================================================================
   Assessment banks.
   The pre-test and post-test items reproduce the module's 15-item tests. The
   module's flattened extraction lost option letters, so letters below are the
   original document order (A, B, C, D) and answer letters come from the
   module answer key.
   ========================================================================== */

export const PRETEST = {
  id: "pretest",
  activityId: "pretest",
  moduleId: "module1",
  kind: "pretest",
  xp: 40,
  icon: "exam",
  title: "What I Know",
  subtitle: "Pre-test · 15 items",
  description: "A quick check of what you already know before studying the module. This score is a starting point, not a grade.",
  timeLimit: 0,
  shuffle: false,
  items: [
    { id: "pre-1", prompt: "Which type of computer is commonly designed for use by one person at a time?", options: ["Mainframe computer", "Personal computer", "Quantum computer", "Supercomputer"], answer: 1, explain: "A personal computer is designed for individual use. Mainframes, quantum computers, and supercomputers serve specialised, much larger workloads." },
    { id: "pre-2", prompt: "Which computer component performs calculations and processes instructions?", options: ["Central processing unit", "Hard disk drive", "Power supply unit", "Random-access memory"], answer: 0, explain: "The CPU executes instructions and performs calculations." },
    { id: "pre-3", prompt: "Which component stores data temporarily while programs are running?", options: ["Graphics processing unit", "Random-access memory", "Solid-state drive", "Sound card"], answer: 1, explain: "RAM holds active data and instructions temporarily and clears when power is removed." },
    { id: "pre-4", prompt: "Which component provides electrical power to the internal parts of a desktop computer?", options: ["Central processing unit", "Motherboard", "Power supply unit", "System fan"], answer: 2, explain: "The PSU converts outlet electricity into the power the internal components need." },
    { id: "pre-5", prompt: "What is the main function of a motherboard?", options: ["It connects and supports the computer components.", "It displays visual information on the monitor.", "It protects the computer from harmful programs.", "It stores personal files for long-term use."], answer: 0, explain: "The motherboard is the main circuit board that connects and supports the other components." },
    { id: "pre-6", prompt: "Which of the following is an example of an input device?", options: ["Keyboard", "Monitor", "Projector", "Speaker"], answer: 0, explain: "A keyboard sends data into the computer. Monitors, projectors, and speakers produce output." },
    { id: "pre-7", prompt: "Which type of software manages computer hardware and provides a platform for other programs?", options: ["Application software", "Presentation software", "System software", "Utility document"], answer: 2, explain: "System software manages the hardware and provides a platform for application software." },
    { id: "pre-8", prompt: "Which of the following is an example of system software?", options: ["Operating system", "Presentation program", "Spreadsheet program", "Word processor"], answer: 0, explain: "An operating system is system software. Presentation, spreadsheet, and word-processing programs are application software." },
    { id: "pre-9", prompt: "Which software allows users to create documents, prepare presentations, or edit images?", options: ["Application software", "Device firmware", "Operating system", "System software"], answer: 0, explain: "Application software helps users perform specific tasks such as writing, presenting, or editing images." },
    { id: "pre-10", prompt: "Which software is most appropriate for creating a typed school report?", options: ["Antivirus software", "Device driver", "Operating system", "Word processor"], answer: 3, explain: "A word processor is application software built for writing and formatting documents." },
    { id: "pre-11", prompt: "Before disassembling a computer, what should a technician do first?", options: ["Disconnect the computer from the power source.", "Open the computer case and remove the memory.", "Press the power button while removing the cables.", "Remove the processor from the motherboard socket."], answer: 0, explain: "Shut down properly and disconnect the computer from power before opening the case." },
    { id: "pre-12", prompt: "Why should an antistatic wrist strap be used when handling internal computer components?", options: ["To avoid electrostatic discharge that may damage components", "To connect computer components directly to the power supply", "To keep small computer screws attached to the technician", "To prevent tools from slipping during computer assembly"], answer: 0, explain: "An antistatic strap safely discharges static electricity so it cannot damage sensitive circuits." },
    { id: "pre-13", prompt: "What is the best practice when removing cables during computer disassembly?", options: ["Cut tightly connected cables using an appropriate tool.", "Document and label the cables before disconnecting them.", "Pull the cables firmly until they separate from the ports.", "Remove all cables without recording their original locations."], answer: 1, explain: "Document and label connections so reassembly is correct. Never cut or yank cables." },
    { id: "pre-14", prompt: "Which practice helps prevent the loss of screws during disassembly?", options: ["Place the screws inside the computer case.", "Put the screws together with unused cables.", "Store the screws in a labeled container.", "Return the screws to random mounting holes."], answer: 2, explain: "Labelled containers keep screws grouped and prevent them from being lost or mixed up." },
    { id: "pre-15", prompt: "After assembling the computer, what should be done before connecting it to the power source?", options: ["Check that the components and cables are properly secured.", "Install application software before closing the computer case.", "Remove the cooling fan to observe the processor during startup.", "Replace the installed memory with a different memory module."], answer: 0, explain: "Inspect the assembly before applying power: secure components, connected cables, no loose screws, clear fans." }
  ]
};

export const POSTTEST = {
  id: "final",
  activityId: "final",
  moduleId: "module1",
  kind: "final",
  xp: 150,
  icon: "graduation",
  title: "Final Exam",
  subtitle: "15 items · 20 minutes",
  description: "The module's post-test. You need 80% to earn the Assembly Ready badge. You can retake it, and your best score is kept.",
  timeLimit: 20 * 60,
  shuffle: true,
  items: [
    { id: "post-1", prompt: "Which statement best describes computer hardware?", options: ["It consists of instructions that control network access.", "It includes the physical components of a computer system.", "It manages the programs installed on a computer system.", "It provides services used by application programs."], answer: 1, explain: "Hardware means the physical components you can see and touch." },
    { id: "post-2", prompt: "Which type of computer is designed for use in a fixed location and generally allows easier replacement of internal components?", options: ["Desktop computer", "Laptop computer", "Smartphone", "Tablet computer"], answer: 0, explain: "A desktop is fixed in place and its internal components are generally accessible." },
    { id: "post-3", prompt: "Which component connects the processor, memory, storage devices, and expansion cards?", options: ["Cooling fan", "Motherboard", "Power supply unit", "Storage drive"], answer: 1, explain: "The motherboard provides the connections that let components communicate." },
    { id: "post-4", prompt: "A learner opens several programs at the same time, but the computer becomes slow. Which component may need to be upgraded to improve temporary data handling?", options: ["Computer case", "Optical drive", "Random-access memory", "System speaker"], answer: 2, explain: "Adding RAM gives active programs more temporary workspace." },
    { id: "post-5", prompt: "Which component executes instructions and performs calculations in a computer?", options: ["Central processing unit", "Hard disk drive", "Power supply unit", "Random-access memory"], answer: 0, explain: "The CPU executes instructions and performs calculations." },
    { id: "post-6", prompt: "What is the primary function of the power supply unit?", options: ["It connects the computer to a network.", "It converts electrical power for computer components.", "It processes instructions from installed applications.", "It stores the operating system and user files."], answer: 1, explain: "The PSU converts outlet electricity into the voltages the components require." },
    { id: "post-7", prompt: "Which is an example of system software?", options: ["Operating system", "Presentation software", "Spreadsheet software", "Word-processing software"], answer: 0, explain: "An operating system is system software; the others are application software." },
    { id: "post-8", prompt: "What is the main function of an operating system?", options: ["To create documents and visual presentations", "To manage hardware and provide services for programs", "To physically connect the internal computer components", "To store files without using a storage device"], answer: 1, explain: "The operating system manages hardware resources and provides services to programs." },
    { id: "post-9", prompt: "A newly installed printer is connected correctly but is not recognized by the computer. Which software should be installed?", options: ["Device driver", "Presentation software", "Spreadsheet software", "Word processor"], answer: 0, explain: "A driver lets the operating system communicate with the printer." },
    { id: "post-10", prompt: "Which application software is most appropriate for creating a written school report?", options: ["Device driver", "Operating system", "Security utility", "Word processor"], answer: 3, explain: "A word processor is designed for writing and formatting documents." },
    { id: "post-11", prompt: "What should be done first before disassembling a desktop computer?", options: ["Disconnect the storage drive from the motherboard.", "Open the computer case and remove the memory.", "Remove the processor from the motherboard socket.", "Shut down and disconnect the computer from power."], answer: 3, explain: "Shut down properly and disconnect from power before opening anything." },
    { id: "post-12", prompt: "Why should a technician document cable connections before removing the components?", options: ["To determine the age of each computer component", "To guide the correct reconnection during assembly", "To increase the storage capacity of the computer", "To remove the need for inspecting the components"], answer: 1, explain: "Photos, diagrams, and labels guide correct reconnection during assembly." },
    { id: "post-13", prompt: "Which is the correct way to handle a memory module?", options: ["Hold the module carefully along its outer edges.", "Hold the module firmly by its gold contacts.", "Place the module directly on a metal surface.", "Press the memory chips while carrying the module."], answer: 0, explain: "Hold memory by its edges and avoid touching the gold contacts or chips." },
    { id: "post-14", prompt: "During assembly, a processor does not fit easily into its socket. What should the technician do?", options: ["Apply additional pressure until the processor enters.", "Check the processor alignment and socket compatibility.", "Remove the motherboard and widen the processor socket.", "Turn on the computer to test the processor connection."], answer: 1, explain: "Never force a processor. Check alignment and compatibility, then seat it gently." },
    { id: "post-15", prompt: "What should be done before connecting an assembled computer to the power source?", options: ["Check that components and cables are properly secured.", "Install programs before reconnecting the cooling system.", "Remove the computer case to improve air circulation.", "Replace the installed components with available spares."], answer: 0, explain: "Inspect the build: seated components, secure cables, no loose screws, unobstructed fans, closed case." }
  ]
};

/* --------------------------------------------------------------------------
   Term 1 – Module 2: BIOS/UEFI Configuration. Items and answer order follow
   the module's own pre-test and post-test answer keys.
   -------------------------------------------------------------------------- */
export const M2_PRETEST = {
  id: "bios-pretest",
  activityId: "bios-pre",
  moduleId: "module2",
  kind: "pretest",
  title: "BIOS/UEFI Pre-Test",
  subtitle: "Pre-test · 15 items",
  description: "A baseline check of what you already know about firmware, POST, setup settings, and boot order.",
  timeLimit: 0,
  shuffle: false,
  xp: 40,
  icon: "exam",
  items: [
    { id: "bios-pre-1", prompt: "What does BIOS stand for?", options: ["Basic Input/Output System","Binary Input Operating Setup","Boot Interface Output Service","Built-in Operating System"], answer: 0, explain: "BIOS means Basic Input/Output System: firmware that starts the computer before the operating system loads." },
    { id: "bios-pre-2", prompt: "What is the primary function of BIOS/UEFI during computer startup?", options: ["Create and edit user documents","Initialize hardware and begin the boot process","Install application software automatically","Scan personal files for security threats"], answer: 1, explain: "BIOS/UEFI initializes essential hardware and starts the search for a bootable device." },
    { id: "bios-pre-3", prompt: "Which firmware is commonly used in modern computers as the successor to the traditional BIOS?", options: ["CMOS","POST","UEFI","USB"], answer: 2, explain: "UEFI is the modern firmware interface that replaces traditional BIOS and adds support for newer hardware." },
    { id: "bios-pre-4", prompt: "What process checks the computer's essential hardware when the system is turned on?", options: ["Disk Cleanup","Power-On Self-Test","System Restore","Windows Update"], answer: 1, explain: "POST, the Power-On Self-Test, checks processor, memory, keyboard, graphics, and storage during startup." },
    { id: "bios-pre-5", prompt: "Which key may be used to access the BIOS/UEFI setup utility during startup?", options: ["Delete","End","Spacebar","Tab"], answer: 0, explain: "Delete is one of the common setup keys; the exact key depends on the manufacturer." },
    { id: "bios-pre-6", prompt: "Why should the manufacturer's instructions be checked before accessing BIOS/UEFI?", options: ["Access keys and menu layouts vary among computer models.","All computers use different operating system passwords.","BIOS/UEFI can only be opened with an internet connection.","The setup utility requires newly installed applications."], answer: 0, explain: "Setup keys and menu layouts differ by motherboard and computer model, so manufacturer guidance matters." },
    { id: "bios-pre-7", prompt: "Which BIOS/UEFI setting determines which device the computer checks first for bootable files?", options: ["Boot order","Fan speed","System date","User password"], answer: 0, explain: "Boot order, or boot priority, decides which device the firmware checks first for startup files." },
    { id: "bios-pre-8", prompt: "A technician needs to install an operating system from a bootable USB drive. Which device should be placed first in the boot order?", options: ["Internal storage drive","Network adapter","USB storage device","Video adapter"], answer: 2, explain: "The USB installer must be checked first so the computer can load the operating system setup files from it." },
    { id: "bios-pre-9", prompt: "Which BIOS/UEFI section generally displays information about the installed processor and memory?", options: ["Hardware or System Information","Language and Accessibility","Network and Sharing Center","Programs and Features"], answer: 0, explain: "System Information shows detected hardware such as processor model, installed memory, and storage devices." },
    { id: "bios-pre-10", prompt: "What should a technician do after correctly changing the boot order?", options: ["Disconnect the storage device immediately.","Remove the motherboard battery.","Save the changes and exit the setup utility.","Turn off the computer without saving."], answer: 2, explain: "Changes take effect when the technician selects Save Changes and Exit." },
    { id: "bios-pre-11", prompt: "Which option allows a learner to leave the BIOS/UEFI setup utility without applying unwanted changes?", options: ["Discard Changes and Exit","Load Operating System","Restore User Files","Save Changes and Exit"], answer: 0, explain: "Discard Changes and Exit closes the utility without applying changes made in that session." },
    { id: "bios-pre-12", prompt: "The BIOS/UEFI does not detect an installed storage drive. What should the technician do first?", options: ["Replace the motherboard without inspecting it.","Format every storage device in the computer.","Install application software on another computer.","Check the drive's power and data connections."], answer: 3, explain: "A loose power or data cable is a common cause; inspect connections before replacing hardware." },
    { id: "bios-pre-13", prompt: "Why should learners avoid changing unfamiliar BIOS/UEFI settings?", options: ["Incorrect settings may affect hardware operation and startup.","The settings automatically delete every application.","The setup utility permanently disables the keyboard.","Unfamiliar settings always damage the monitor."], answer: 0, explain: "Firmware settings directly affect startup and hardware operation, so only required settings should change." },
    { id: "bios-pre-14", prompt: "What usually happens when Restore Defaults or Load Setup Defaults are selected?", options: ["Application software is removed from the storage drive.","Firmware settings return to recommended default values.","Personal files are transferred to an external device.","The operating system is automatically reinstalled."], answer: 1, explain: "Load Setup Defaults restores recommended firmware settings; review them before saving." },
    { id: "bios-pre-15", prompt: "Before changing BIOS/UEFI settings, what is the best practice?", options: ["Change several settings at the same time.","Disconnect the monitor while entering the setup utility.","Record the original settings and change only what is needed.","Select unfamiliar options to test their possible functions."], answer: 2, explain: "Recording originals and changing only what is required makes changes safe and reversible." }
  ]
};

export const M2_POSTTEST = {
  id: "bios-final",
  activityId: "bios-final",
  moduleId: "module2",
  kind: "final",
  title: "BIOS/UEFI Post-Test",
  subtitle: "Post-test · 15 items",
  description: "The module's 15-item assessment with explanations and a 20-minute timer.",
  timeLimit: 1200,
  shuffle: true,
  xp: 150,
  icon: "graduation",
  items: [
    { id: "bios-post-1", prompt: "Which term refers to the firmware commonly used in modern computer systems?", options: ["POST","RAM","UEFI","USB"], answer: 2, explain: "UEFI is the modern firmware interface found in most newer computers." },
    { id: "bios-post-2", prompt: "What is the main purpose of the Power-On Self-Test or POST?", options: ["To check the essential hardware during startup","To install the operating system on the storage drive","To open the applications selected by the computer user","To transfer personal files to an external storage device"], answer: 0, explain: "POST verifies that essential hardware is present and ready before the boot device is searched." },
    { id: "bios-post-3", prompt: "Which menu commonly displays the processor, installed memory, firmware version, and detected storage devices?", options: ["Boot Menu","Exit Menu","Security Menu","System Information"], answer: 3, explain: "System Information reports detected hardware and firmware details." },
    { id: "bios-post-4", prompt: "What does the boot order determine?", options: ["The arrangement of folders in the storage drive","The sequence of devices checked for startup files","The order in which applications appear on the desktop","The priority of users allowed to access the computer"], answer: 1, explain: "Boot order is the sequence BIOS/UEFI uses to search devices for startup files." },
    { id: "bios-post-5", prompt: "Which device can contain the files needed to begin operating system installation?", options: ["Bootable USB drive","Cooling fan","Keyboard","Monitor"], answer: 0, explain: "A prepared bootable USB drive carries the installer files the firmware can load." },
    { id: "bios-post-6", prompt: "A technician changes the system date and boot order and wants to apply the new configuration. Which option should be selected?", options: ["Discard Changes and Exit","Load Setup Defaults","Save Changes and Exit","Shut Down Without Saving"], answer: 2, explain: "Save Changes and Exit stores the new configuration before leaving." },
    { id: "bios-post-7", prompt: "A learner accidentally changes an unfamiliar setting but has not yet saved the configuration. Which action is most appropriate?", options: ["Continue modifying other settings","Discard the changes before exiting","Disconnect the computer immediately","Remove the motherboard battery"], answer: 1, explain: "Discard Changes and Exit abandons unsaved changes safely." },
    { id: "bios-post-8", prompt: "A computer detects the bootable USB installer, but it continues loading the operating system from the internal storage drive. What should the technician check?", options: ["Boot priority","Display resolution","Keyboard layout","Mouse sensitivity"], answer: 0, explain: "If the USB is detected but not used first, boot priority is the likely configuration issue." },
    { id: "bios-post-9", prompt: "Which boot order is most appropriate when installing an operating system from a bootable USB drive?", options: ["Internal drive, network device, USB drive","Internal drive, USB drive, network device","Network device, internal drive, USB drive","USB drive, internal drive, network device"], answer: 3, explain: "Place the USB installer first, then the internal drive, then other devices such as network." },
    { id: "bios-post-10", prompt: "The BIOS/UEFI displays only 4 GB of RAM even though two 4 GB memory modules are installed. What should the technician do first?", options: ["Check whether both memory modules are properly installed","Change the system date and time to the correct values","Place the internal storage drive first in the boot order","Select the option for restoring the default background"], answer: 0, explain: "Undetected RAM often means a module is loose or improperly seated; inspect installation first." },
    { id: "bios-post-11", prompt: "An installed storage drive does not appear in the BIOS/UEFI system information. What is the most appropriate initial action?", options: ["Check the drive's power and data connections","Install application software on another computer","Modify the processor voltage in the advanced settings","Replace the storage drive without further inspection"], answer: 0, explain: "Check physical connections before assuming the drive is defective." },
    { id: "bios-post-12", prompt: "The system date and time become incorrect whenever the computer is disconnected from electrical power. Which component may require inspection?", options: ["CMOS battery","Cooling fan","Graphics card","USB installer"], answer: 0, explain: "The CMOS battery keeps firmware date/time settings when the computer is unplugged." },
    { id: "bios-post-13", prompt: "A bootable USB installer appears twice in the boot menu: once as a UEFI device and once as a legacy device. What should the technician consider before selecting an option?", options: ["The color and physical design of the USB drive","The intended firmware mode of the installation","The number of folders stored on the USB drive","The position of the computer on the worktable"], answer: 1, explain: "Select the boot mode that matches the intended operating system installation." },
    { id: "bios-post-14", prompt: "After changing the boot order, the computer still does not start from the USB installer. The USB drive is detected and placed first. What should the technician check next?", options: ["Whether the installer was correctly prepared as bootable media","Whether the monitor brightness is properly adjusted","Whether the mouse pointer moves at the preferred speed","Whether the desktop wallpaper matches the user's preference"], answer: 0, explain: "If the detected USB still will not boot, the installer media itself may not be prepared correctly." },
    { id: "bios-post-15", prompt: "A technician needs to change the boot order but also notices several unfamiliar advanced settings. Which action demonstrates the safest practice?", options: ["Change every setting to improve computer performance","Modify the advanced settings before recording their values","Record the original configuration and change only the boot order","Select random options to observe their effects during startup"], answer: 2, explain: "Record the original configuration and change only what the task requires." }
  ]
};

/* Short checkpoints inside the library. These are TechPro study aids built
   directly from module statements. */
export const LESSON_CHECKS = {
  "computer-system": [
    { prompt: "Which equation describes a functional computer system?", options: ["Hardware + system software + application software", "Hardware + storage + a monitor", "System software + a network cable", "Application software + a driver"], answer: 0, explain: "The module's summary uses this exact three-part equation." },
    { prompt: "What happens if one important component is missing or incompatible?", options: ["The computer runs faster", "The computer may not operate properly", "The operating system installs itself", "Nothing changes"], answer: 1, explain: "The module states that the computer may not operate properly." }
  ],
  "types-of-computers": [
    { prompt: "Which computer is designed for a fixed location and is easiest to service?", options: ["Tablet", "Laptop", "Desktop", "Smartphone"], answer: 2, explain: "Desktop internal components are generally accessible." },
    { prompt: "Which computer provides shared files and services to other computers on a network?", options: ["Server", "Tablet", "Laptop", "Desktop"], answer: 0, explain: "A server provides services, information, or shared resources over a network." }
  ],
  "external-hardware": [
    { prompt: "Which device is an output device?", options: ["Keyboard", "Mouse", "Monitor", "Touchpad"], answer: 2, explain: "A monitor displays information produced by the computer." },
    { prompt: "Which two devices are input devices?", options: ["Keyboard and mouse", "Monitor and speaker", "Printer and monitor", "Speaker and printer"], answer: 0, explain: "Keyboards and mice send data or commands into the computer." }
  ],
  "internal-hardware": [
    { prompt: "Which component temporarily stores data the processor is using?", options: ["PSU", "RAM", "SSD", "Cooling fan"], answer: 1, explain: "RAM is temporary working memory and clears when the computer is turned off." },
    { prompt: "Which component must match the motherboard's CPU socket and chipset?", options: ["Monitor", "Processor", "Printer", "Case fan"], answer: 1, explain: "The processor must be compatible with the socket and chipset." }
  ],
  "system-software": [
    { prompt: "A printer is connected but not recognised. Which software is most likely missing?", options: ["Device driver", "Spreadsheet", "Presentation software", "Web browser"], answer: 0, explain: "A driver lets the operating system communicate with the printer." },
    { prompt: "Which of these is firmware used during startup?", options: ["BIOS", "Word processor", "Spreadsheet", "Photo editor"], answer: 0, explain: "BIOS and UEFI are firmware examples used during startup." }
  ],
  "application-software": [
    { prompt: "Which is application software?", options: ["Device driver", "Operating system", "Word processor", "Firmware"], answer: 2, explain: "Word processors are application software; drivers, operating systems, and firmware are system software." },
    { prompt: "Application software depends on what to reach the hardware?", options: ["System software", "A printer only", "Another application", "Nothing"], answer: 0, explain: "Applications use the operating system and other system software to access hardware." }
  ],
  "disassembly": [
    { prompt: "What is the first preparation step before disassembly?", options: ["Open the case", "Shut down and disconnect power", "Remove the CPU", "Remove the RAM"], answer: 1, explain: "Shut down properly and disconnect from power before opening the case." },
    { prompt: "Why document cable connections?", options: ["To decorate the bench", "To guide correct reconnection", "To increase storage", "To test the PSU"], answer: 1, explain: "Documentation guides reassembly and prevents wrong connections." }
  ],
  "assembly": [
    { prompt: "A processor will not drop into the socket. What should you do?", options: ["Push harder", "Check alignment and compatibility", "Bend the pins", "Power it on to test"], answer: 1, explain: "Never force a processor. Check alignment and socket compatibility." },
    { prompt: "What must be clear before powering on?", options: ["No cable blocking a fan", "The case is open", "The monitor is off", "The RAM is removed"], answer: 0, explain: "The pre-power inspection includes checking that no cable blocks a cooling fan." }
  ],
  "review": [
    { prompt: "Which component manages hardware and other software?", options: ["Operating system", "Monitor", "Word processor", "RAM"], answer: 0, explain: "The operating system manages hardware and provides services for other software." },
    { prompt: "Which list is entirely hardware?", options: ["Motherboard, CPU, RAM", "Windows, driver, antivirus", "Word, Chrome, Excel", "BIOS, UEFI, Windows"], answer: 0, explain: "Motherboard, CPU, and RAM are physical components." }
  ],
  "bios-startup": [
    { prompt: "What does POST check during startup?", options: ["Only the monitor", "Essential hardware such as processor, memory, keyboard, and storage", "Installed application settings", "The user's documents"], answer: 1, explain: "POST verifies essential hardware before the boot-device search." },
    { prompt: "Which firmware is common in modern computer systems?", options: ["UEFI", "RAM", "USB", "POST"], answer: 0, explain: "UEFI is the modern firmware interface that replaces traditional BIOS." }
  ],
  "bios-setup": [
    { prompt: "Which setup key is commonly used to enter BIOS/UEFI?", options: ["Delete", "Spacebar", "End", "Tab"], answer: 0, explain: "Delete is one common setup key; the exact key depends on the manufacturer." },
    { prompt: "Which menu shows the processor, installed memory, and detected drives?", options: ["System Information", "Language settings", "Programs and Features", "Network Sharing Center"], answer: 0, explain: "System Information reports detected hardware and firmware details." }
  ],
  "bios-boot": [
    { prompt: "Which device should be first when installing an operating system from USB?", options: ["Internal drive", "Bootable USB drive", "Cooling fan", "Keyboard"], answer: 1, explain: "The USB installer must be checked first so its startup files are found." },
    { prompt: "Which exit option applies changes made in the setup utility?", options: ["Discard Changes and Exit", "Save Changes and Exit", "Close without saving", "Unplug the computer"], answer: 1, explain: "Save Changes and Exit stores the configuration before leaving." }
  ],
  "bios-safety": [
    { prompt: "A drive is not detected after assembly. What should be checked first?", options: ["Its power and data connections", "The monitor brightness", "The desktop wallpaper", "The mouse pointer speed"], answer: 0, explain: "A loose connection is a common cause; inspect it before replacing hardware." },
    { prompt: "What is the safest practice before changing a firmware setting?", options: ["Test every unfamiliar option", "Record the original and change only what is needed", "Change several settings at once", "Disconnect the monitor"], answer: 1, explain: "Recording originals keeps the change reversible and focused." }
  ],
  "bios-review": [
    { prompt: "A USB installer is detected but the internal drive still boots first. What should be checked?", options: ["Boot priority", "Speaker volume", "Screen resolution", "Keyboard layout"], answer: 0, explain: "The saved boot order decides which detected device is checked first." },
    { prompt: "After installing an operating system from USB, what should return to first position?", options: ["Bootable USB drive", "Internal storage drive", "Optical drive", "Network device"], answer: 1, explain: "The internal drive holds the installed operating system for daily startup." }
  ]
};

export const ALL_QUESTIONS = [
  ...PRETEST.items.map((item) => ({ ...item, bank: "pretest" })),
  ...POSTTEST.items.map((item) => ({ ...item, bank: "posttest" })),
  ...M2_PRETEST.items.map((item) => ({ ...item, bank: "bios-pretest" })),
  ...M2_POSTTEST.items.map((item) => ({ ...item, bank: "bios-posttest" }))
];

export function gradeQuiz(bank, answers) {
  const results = bank.items.map((item) => {
    const chosen = answers[item.id];
    return {
      id: item.id,
      correct: chosen === item.answer,
      chosen,
      answer: item.answer,
      prompt: item.prompt,
      explain: item.explain,
      options: item.options
    };
  });
  const score = results.filter((result) => result.correct).length;
  return {
    score,
    total: bank.items.length,
    percent: Math.round((score / bank.items.length) * 100),
    results
  };
}

export function shuffleItems(items, seed = Date.now()) {
  const copy = [...items];
  let state = seed % 2147483647;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
