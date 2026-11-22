## Computer system: hardware and software
id: computer-system
lesson: computer-system

A computer system is hardware and software working together to receive input, process data, store information, and produce output. Hardware is the physical equipment. System software manages hardware and provides a platform for applications. Application software helps people do specific tasks. A computer part works as part of a compatible system; a missing, incorrectly installed, or incompatible component can prevent normal operation.

## Types of computers
id: types-of-computers
lesson: types-of-computers

Desktop computers are designed for a fixed location and commonly have a system unit, monitor, keyboard, and mouse. Internal components are generally accessible, making desktops suitable for hardware servicing and upgrades. Laptops combine components in a portable unit. Servers provide services or resources to other computers.

## Computer parts and their functions
id: computer-components
lesson: internal-hardware

The motherboard connects and supports computer components. The central processing unit (CPU) executes instructions and performs calculations. Random-access memory (RAM) temporarily holds data and instructions used by running programs; its contents are lost when power is removed. Storage devices such as hard disk drives and solid-state drives retain files when power is off. The power supply unit converts outlet electricity into power for internal components. Input devices send data to the computer; output devices present results.

## Component compatibility
id: compatibility
lesson: internal-hardware

Before assembly or an upgrade, check that parts are compatible. A processor must match the motherboard socket and supported platform. Memory must be supported by the motherboard. The power supply must provide suitable connections and enough power for the system. Consult manufacturer specifications rather than forcing a part into place. If compatibility is uncertain, stop and ask a qualified instructor or technician.

## System software
id: system-software
lesson: system-software

System software manages computer hardware and provides a platform for application software. An operating system coordinates resources and provides the environment applications use. Device drivers help the operating system communicate with particular hardware. Utility software supports maintenance and protection tasks.

## Application software
id: application-software
lesson: application-software

Application software helps a user perform a particular task. Examples include word processors for documents, spreadsheet programs for calculations and tables, presentation software for slides, and image-editing software for graphics. Application software depends on system software to access the computer's hardware.

## Electrical and electrostatic-discharge safety
id: safety
lesson: disassembly

Before opening a desktop computer, shut it down properly and disconnect it from the power source. Follow instructor and manufacturer safety instructions. Use an antistatic wrist strap or another approved electrostatic-discharge precaution to protect components from static electricity. Handle circuit boards by their edges, keep liquids away, and do not work on energized equipment. Stop and seek qualified help if a task is unfamiliar or unsafe.

## Organized computer disassembly
id: disassembly
lesson: disassembly

Prepare the work area and appropriate tools before disassembly. Document or label cable connections before removing them. Disconnect cables by their connectors rather than pulling on the wires. Keep screws and small parts in labeled containers, and note the order and location of components. Follow the service procedure for the specific computer.

## Assembly and pre-start checks
id: assembly
lesson: assembly

Follow the assembly sequence and the manufacturer instructions for the specific components. Place parts in compatible sockets and slots without forcing them. Connect power and data cables to their correct connectors, secure components, and keep cables clear of fans. Before connecting power, check that components and cables are secure, no tools or loose screws remain inside, and fans can turn freely. Do not remove cooling parts while the computer is operating.

## Careful first troubleshooting checks
id: basic-troubleshooting
lesson: disassembly

Start with safe, observable checks: confirm the computer is connected to a working outlet, check external cable connections, and note any error messages or indicator lights. Shut down and disconnect power before inspecting internal parts. Change one thing at a time and record what you observe. Do not guess at electrical repairs or continue if you notice heat, smoke, liquid, damaged wiring, or another hazard; disconnect power if safe and get qualified assistance.

## BIOS and UEFI firmware
id: bios-firmware
lesson: bios-startup

BIOS (Basic Input/Output System) and UEFI (Unified Extensible Firmware Interface) are firmware stored on the motherboard. They begin when the computer is turned on, initialise essential hardware, run the Power-On Self-Test, and search for a device containing startup files. Traditional BIOS is common in older computers and usually has a text-based, keyboard-driven setup utility. UEFI is common in modern computers and may offer a graphical interface, mouse support, security settings, hardware monitoring, and diagnostics. Many people still call the modern setup utility “BIOS”.

## Power-On Self-Test and the startup path
id: post-startup
lesson: bios-startup

Power-On Self-Test (POST) checks whether essential components such as the processor, memory, keyboard, graphics hardware, and storage devices are present and ready. A successful POST continues to the boot-device search. A failed POST may show an error message, beep code, diagnostic light, or stop the startup. The startup path is: power on, firmware initialises hardware, POST checks hardware, the firmware searches devices for startup files, and the operating system loads.

## Accessing the setup utility safely
id: setup-access
lesson: bios-setup

The BIOS/UEFI setup utility is opened by pressing a manufacturer-designated key shortly after power on. Common keys are Delete, Esc, F1, F2, F10, and F12. Watch the startup screen for the prompt; if the operating system loads, restart and press the key earlier. Navigate only the menus needed for the task, change only required settings, and save or discard changes correctly before leaving. Manufacturer instructions matter because keys and menu layouts vary by model.

## System information and hardware detection
id: hardware-detection
lesson: bios-setup

The System Information or Main menu can show the processor model, installed memory, storage devices, motherboard model, firmware version, and system date and time. Before installing an operating system, verify that the processor, RAM, internal drive, keyboard, mouse, and bootable USB installer are detected. An undetected part is not automatically defective: it may be loose, incompatible, disabled in firmware, or set incorrectly. Shut down and disconnect power before physically inspecting internal hardware.

## System date and time
id: date-time
lesson: bios-setup

Firmware maintains the basic date and time that the operating system uses at startup. Incorrect values can affect file timestamps, software installation, security certificates, scheduled tasks, and system updates. Enter the correct date and time and save before exiting. If the clock repeatedly becomes wrong after the computer is disconnected from power, inspect the motherboard CMOS battery.

## Boot devices and boot order
id: boot-order
lesson: bios-boot

A boot device is a device containing files needed to start the computer or begin operating system installation: an internal HDD or SSD, USB flash drive, optical disc, or network device. The device must be connected and detected. Boot order, also called boot priority, is the sequence the firmware checks. For daily use the internal drive with the operating system is usually first. For USB installation place the bootable USB first, then the internal drive, then optical or network devices. Restore the internal drive to first place after installation. A temporary boot menu can choose a device for one session.

## Saving, discarding, and restoring defaults
id: exit-options
lesson: bios-boot

Save Changes and Exit stores new firmware settings before leaving. Discard Changes and Exit closes the setup utility without applying changes made in that session. Load Setup Defaults restores recommended values but may also change previously configured options, so review before saving. Changes often do not take effect until the correct exit option is selected.

## Safe BIOS/UEFI configuration
id: bios-safety
lesson: bios-safety

Before changing firmware settings, identify the required configuration, record or photograph the original value, verify hardware compatibility, change only the necessary option, review the change, save correctly, and observe the restart. If the computer does not start properly, return to setup and restore the previous setting or load recommended defaults. Do not experiment with unfamiliar advanced, security, voltage, or processor settings; consult the manufacturer's guidance.

## Hardware problems versus configuration problems
id: hardware-vs-config
lesson: bios-safety

A hardware problem involves a physical part or connection: no lights or fans, a processor fan that does not spin, RAM that is not seated, a drive missing because a power or data cable is loose, or a weak CMOS battery. A configuration problem involves a setting: wrong boot priority, changes that were discarded before saving, or a UEFI/legacy boot mode that does not match the installation. Check simple connections and visible clues before replacing parts, and distinguish the two so the first action is safe and relevant.
