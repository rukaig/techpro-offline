/* ==========================================================================
   Assessment banks.
   The pre-test and post-test items reproduce the module's 15-item tests. The
   module's flattened extraction lost option letters, so letters below are the
   original document order (A, B, C, D) and answer letters come from the
   module answer key.
   ========================================================================== */

export const PRETEST = {
  id: "pretest",
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
  ]
};

export const ALL_QUESTIONS = [
  ...PRETEST.items.map((item) => ({ ...item, bank: "pretest" })),
  ...POSTTEST.items.map((item) => ({ ...item, bank: "posttest" }))
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
