# Module 2 content spec (extracted from Downloads/module2.docx)

Title: Term 1 – Module 2: BIOS/UEFI Configuration
Qualification: Computer Systems Servicing NC II, COC 1 – Installing and Configuring Computer Systems (ICCS)

## Competencies
- Explain functions of BIOS and UEFI.
- Identify common BIOS/UEFI settings.
- Access and navigate the setup utility safely.
- Verify detected hardware.
- Configure system date, time, and boot order.
- Save or discard changes correctly.

## Suggested library lessons
1. `bios-startup` — firmware, BIOS vs UEFI, POST, startup sequence.
2. `bios-setup` — access keys, common menus, hardware detection, date/time, CMOS battery.
3. `bios-boot` — boot devices, boot order, installation vs normal order, temporary boot menu, exit options.
4. `bios-safety` — hardware vs configuration problems, safe change workflow, manufacturer guidance, restoration.
5. `bios-review` — module recap and assessment readiness.

## Knowledge passages
- `bios-firmware`: Firmware stored on the motherboard initializes hardware and starts the boot process. BIOS is older/text-based; UEFI is modern, often graphical, with security and diagnostics.
- `post`: Power-On Self-Test checks processor, memory, keyboard, graphics, storage, and connected devices; errors can appear as messages, beep codes, diagnostic lights, or a halted boot.
- `startup-sequence`: Power on → firmware initializes → POST → boot device search → operating system loads.
- `setup-access`: Press a manufacturer-designated key shortly after power on (Delete, Esc, F1, F2, F10, F12); watch the startup message; restart earlier if OS loads.
- `setup-menus`: System Information/Main, Advanced, Boot, Security, Exit; change only required settings.
- `hardware-detection`: Verify processor, RAM, storage, bootable USB, cooling status where available; undetected hardware may be loose, incompatible, disabled, or misconfigured, not necessarily defective.
- `date-time`: Wrong date/time affects timestamps, installs, certificates, scheduled tasks, updates; repeated loss after power off points to CMOS battery.
- `boot-devices`: HDD, SSD, USB, optical, network; device must be connected, detected, and available in boot options.
- `boot-order`: Normal use puts internal drive first. USB install uses USB → internal → optical/network. Restore internal first after install. Temporary boot menu can select once.
- `exit-options`: Save Changes and Exit applies; Discard Changes and Exit abandons current session changes; Load Setup Defaults restores recommended settings and must be reviewed before saving.
- `bios-safety`: Record originals, verify compatibility, change only what is needed, review, save, observe restart; never test unfamiliar advanced/security/voltage/processor settings.
- `hardware-vs-config`: No lights/fans, fewer RAM than installed, dead CPU fan, missing drive in System Information, CMOS battery = hardware. Wrong boot priority, unsaved changes, UEFI/legacy mismatch = configuration.
- Carlo case: POST succeeds and the USB installer is detected, but the internal drive boots first. Set USB → internal → network, Save Changes and Exit, observe the restart, then restore the internal drive first.

## Glossary
BIOS, UEFI, firmware, POST, setup utility, System Information, boot device, boot order, boot priority, boot menu, legacy boot, Secure Boot, CMOS battery, Save Changes and Exit, Discard Changes and Exit, Load Setup Defaults, beep code, diagnostic light.

## Pretest answers (What I Know)
ABCBAAACACADABC

1 BIOS = Basic Input/Output System (A)
2 Initialize hardware and begin boot (B)
3 UEFI (C)
4 Power-On Self-Test (B)
5 Delete (A)
6 Manufacturer instructions: keys/layouts vary (A)
7 Boot order (A)
8 USB storage device (C)
9 Hardware or System Information (A)
10 Save changes and exit (C)
11 Discard Changes and Exit (A)
12 Check power/data connections (D)
13 Incorrect settings affect operation/startup (A)
14 Recommended defaults (B)
15 Record originals, change only needed (C)

## Posttest answers (Assessment)
CADBACBADAAABAC

1 UEFI (C)
2 Check essential hardware during startup (A)
3 System Information (D)
4 Sequence of devices checked for startup files (B)
5 Bootable USB drive (A)
6 Save Changes and Exit (C)
7 Discard changes before exiting (B)
8 Boot priority (A)
9 USB, internal, network (D)
10 Check both memory modules installed (A)
11 Check drive power/data connections (A)
12 CMOS battery (A)
13 Intended firmware mode (B)
14 Whether installer was correctly prepared as bootable media (A)
15 Record original configuration and change only boot order (C)

## Playable interactives
- `bios-setup-lab` (flagship): guided setup utility simulation — enter setup, verify detected hardware, set date/time, arrange boot order, choose exit option, restore normal order.
- `startup-sequence`: tap startup steps in correct order with explanation.
- `config-or-hardware`: classify hardware and configuration scenarios and explain the clue.
- `boot-order-builder`: choose the correct boot order and exit option for install and restoration scenarios.
- `bios-flashcards`: flip key terms and finish a short recap.
- `bios-case-files`: follow the Carlo case from detected USB to boot order, save, restart, and restoration.

## Suggested navigation
- Library module tabs: Module 1 – Assemble Computer Hardware / Module 2 – BIOS/UEFI Configuration.
- Play hub module filter and grouped cards; every card resolves to a real interactive.
- Exam routes per module; assistant `?lesson=` links use new lesson ids.
