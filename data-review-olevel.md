# Data review: O Level CS answer-length bias (review only)

Status: **Originally review-only; applied on 2026-11-02, see the note below. Do not re-apply.**
Every proposal below is marked **needs my confirmation**. Nothing in
this report has been applied to `assets/mcq/olevel-cs-mcq-bank.json`.

> **Applied on 2026-11-02, with Sakib's confirmation:** all 40 distractor rewrites in this report were applied to the O Level bank, with correct answers and answer indexes unchanged. Chapters 3 to 6 strictly-longest fell by 5 points each (chapter 3: 72.0% to 67.0%, chapter 4: 79.0% to 74.0%, chapter 5: 74.5% to 69.5%, chapter 6: 80.5% to 75.5%). The remaining 572 strictly-longest questions in chapters 3 to 6 were then done as batch 2, also on 2026-11-02, with Sakib's confirmation: Chapter 3: 134, Chapter 4: 148, Chapter 5: 139, Chapter 6: 151, correct answers and answer indexes unchanged, proposals kept in ~/workspace/olevel-batch2/ch3- to ch6-proposals.json. Chapters 3 to 6 strictly-longest are now 0.0% each, and the all-bank figure is 20.9% (the remainder sits in chapters 1, 2 and 7 to 10, which were not part of this work). The proposals below are now historical; do not re-apply them.


## What was measured

Length is the number of characters in the option text, as printed.
A question counts as 'strictly longest' when its correct option is
longer than every distractor. The script that produces these numbers
is `tools/check_answer_length.py`; run it with `--top 10` to list the
same worst offenders used below.

| Chapter | Questions | Correct strictly longest | Correct tied longest |
|---|---|---|---|
| 1 Data representation | 200 | 9.0% | 70.5% |
| 2 Data transmission | 200 | 57.5% | 11.5% |
| 3 Hardware | 200 | 72.0% | 10.0% |
| 4 Software | 200 | 79.0% | 2.5% |
| 5 The internet and its uses | 200 | 74.5% | 4.0% |
| 6 Automated and emerging technologies | 200 | 80.5% | 2.5% |
| 7 | 200 | 31.5% | 37.5% |
| 8 | 200 | 43.0% | 24.5% |
| 9 | 200 | 42.5% | 20.5% |
| 10 | 200 | 26.0% | 15.0% |
| All | 2000 | 51.5% | — |

Note on the figures you gave: chapters 3 to 6 and chapter 10 match
closely under this strict definition (72.0% to 80.5% for chapters
3 to 6, 26.0% for chapter 10). Chapter 1 does not: it is 9.0%
strictly longest, 79.5% if tied-longest is counted as well, and
21.0% if only the 62 text-only questions are counted (138 of the
200 chapter 1 questions have at least one purely numeric option,
where lengths tie often). The script reports both strict and tied
figures so the definition is visible, not hidden.

## Scope of this report

Chapters 3 to 6 have 612 strictly-longest questions in total
(chapter 3: 144, chapter 4: 158, chapter 5: 149, chapter 6: 161).
Rewriting all 612 in one batch, without checking each one, would
risk changing meanings and creating accidentally correct
distractors. So this report covers the worst 10 per chapter,
40 questions in total, chosen by the largest character gap
between the correct option and the longest distractor, exactly
as listed by `tools/check_answer_length.py --top 10`.
After applying these, none of the 40 will count as
strictly-longest any more (every new set has at least one
distractor at least as long as the correct option). The
remaining 572 strictly-longest questions in chapters 3 to 6
can be done in further batches the same way, after you
approve this batch.

Rules followed for every proposal:

- The correct answer and the question are unchanged.
- The meaning of the question is unchanged.
- Each new distractor is still wrong, and is a plausible
  confusion for the topic, not nonsense and not a second
  correct answer.
- New distractor lengths are close to the correct length:
  every set below now has a longest distractor within 13
  characters of the correct option, usually longer than it,
  compared with old gaps of +23 to +43 characters.
- The practice engine shuffles options at runtime, so the
  fix works regardless of the order students see.

---

## Chapter 3: Hardware

### ch3-q152 — needs my confirmation

**Question:** A NIC is

**Correct answer, unchanged (57 characters):** a Network Interface Card connecting a device to a network

**Old distractors:**
- (8 characters) a camera
- (14 characters) a music player
- (9 characters) a printer
(Old gap: correct was +43 characters longer than the longest distractor.)

**Proposed distractors:**
- (58 characters) a wireless router that shares internet with nearby devices
- (55 characters) a sound card that plays audio through computer speakers
- (54 characters) a memory chip that stores data while the computer runs
(New gap: -1 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Router, sound card and memory chip are other hardware parts, not a network interface card.

---

### ch3-q171 — needs my confirmation

**Question:** Pages are

**Correct answer, unchanged (44 characters):** fixed-size blocks moved between RAM and disk

**Old distractors:**
- (9 characters) newspaper
- (9 characters) web pages
- (10 characters) book pages
(Old gap: correct was +34 characters longer than the longest distractor.)

**Proposed distractors:**
- (51 characters) sections of a printed newspaper or magazine article
- (49 characters) individual pages of a website viewed in a browser
- (46 characters) pages in a book that a reader turns one by one
(New gap: -7 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Newspaper, website and book pages are everyday meanings of 'pages', not fixed-size memory blocks moved between RAM and disk.

---

### ch3-q070 — needs my confirmation

**Question:** Touch screens detect input using

**Correct answer, unchanged (41 characters):** capacitive, resistive or infrared methods

**Old distractors:**
- (10 characters) sound only
- (5 characters) taste
- (5 characters) smell
(Old gap: correct was +31 characters longer than the longest distractor.)

**Proposed distractors:**
- (51 characters) voice commands spoken aloud to control the computer
- (51 characters) chemical taste sensors built into the glass display
- (53 characters) scent detectors that recognise smells near the screen
(New gap: -12 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Voice, taste and scent are not touch-screen sensing methods; the correct methods are capacitive, resistive and infrared.

---

### ch3-q149 — needs my confirmation

**Question:** An IP address

**Correct answer, unchanged (47 characters):** identifies a device on a network and can change

**Old distractors:**
- (16 characters) has letters only
- (12 characters) is permanent
- (9 characters) is secret
(Old gap: correct was +31 characters longer than the longest distractor.)

**Proposed distractors:**
- (52 characters) contains only letters and never includes any numbers
- (55 characters) stays permanently fixed for a device for its whole life
- (53 characters) is a secret password that must never be shared online
(New gap: -8 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** An IP address is numeric (or hexadecimal), is often reassigned, and is not a password.

---

### ch3-q177 — needs my confirmation

**Question:** Cloud storage means

**Correct answer, unchanged (45 characters):** data stored on remote servers accessed online

**Old distractors:**
- (11 characters) paper files
- (15 characters) data in the sky
- (11 characters) local disks
(Old gap: correct was +30 characters longer than the longest distractor.)

**Proposed distractors:**
- (49 characters) paper files kept in a filing cabinet in an office
- (49 characters) files stored in the sky above the user's computer
- (45 characters) files saved only on a local hard disk at home
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Paper files, sky files and local-only files are the opposite of remote servers accessed online.

---

### ch3-q004 — needs my confirmation

**Question:** The Control Unit (CU) is responsible for

**Correct answer, unchanged (45 characters):** controlling the flow of data and instructions

**Old distractors:**
- (15 characters) cooling the CPU
- (16 characters) doing arithmetic
- (13 characters) storing files
(Old gap: correct was +29 characters longer than the longest distractor.)

**Proposed distractors:**
- (51 characters) cooling the processor with a fan and heat sink unit
- (52 characters) performing arithmetic and logic calculations on data
- (44 characters) storing files and programs for long-term use
(New gap: -7 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Cooling is the fan's job, arithmetic is the ALU's job, and long-term storage is memory/disk, not the Control Unit.

---

### ch3-q170 — needs my confirmation

**Question:** Virtual memory lets a computer

**Correct answer, unchanged (44 characters):** run programs needing more RAM than installed

**Old distractors:**
- (15 characters) never use disks
- (11 characters) boot faster
- (15 characters) run without RAM
(Old gap: correct was +29 characters longer than the longest distractor.)

**Proposed distractors:**
- (52 characters) run a computer without using any disk storage at all
- (48 characters) make a computer start up much faster than normal
- (49 characters) run programs with no RAM installed in the machine
(New gap: -8 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Virtual memory uses disk pages to extend RAM; it does not remove the need for disk or for RAM, and it is not about boot speed.

---

### ch3-q174 — needs my confirmation

**Question:** Paging means

**Correct answer, unchanged (41 characters):** moving data between RAM and disk in pages

**Old distractors:**
- (8 characters) deleting
- (8 characters) printing
- (13 characters) turning pages
(Old gap: correct was +28 characters longer than the longest distractor.)

**Proposed distractors:**
- (49 characters) deleting old files to free space on the hard disk
- (47 characters) printing a document one page at a time on paper
- (44 characters) turning the pages of a book while reading it
(New gap: -8 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Deleting, printing and turning book pages are not memory paging, which moves data between RAM and disk in pages.

---

### ch3-q181 — needs my confirmation

**Question:** A risk of cloud storage is

**Correct answer, unchanged (44 characters):** dependence on internet and provider security

**Old distractors:**
- (14 characters) it is too fast
- (13 characters) screens break
- (17 characters) files get heavier
(Old gap: correct was +27 characters longer than the longest distractor.)

**Proposed distractors:**
- (50 characters) the screen breaking while files are being uploaded
- (50 characters) files becoming heavier each time they are uploaded
- (50 characters) the printer running out of paper when files upload
(New gap: -6 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A breaking screen, files getting heavier and a printer out of paper are not risks of cloud storage; dependence on internet and provider security is.

---

### ch3-q146 — needs my confirmation

**Question:** A MAC address

**Correct answer, unchanged (39 characters):** uniquely identifies a network interface

**Old distractors:**
- (13 characters) changes daily
- (13 characters) is a password
- (11 characters) is optional
(Old gap: correct was +26 characters longer than the longest distractor.)

**Proposed distractors:**
- (49 characters) changes every day when the device connects online
- (45 characters) acts as a password for logging into a network
- (50 characters) is a secret code shared only with the manufacturer
(New gap: -11 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A MAC address is burned into the hardware and never changes; it is an identifier, not a password and not a secret.

---

## Chapter 4: Software

### ch4-q104 — needs my confirmation

**Question:** An IDE's editor provides

**Correct answer, unchanged (39 characters):** syntax highlighting and auto-completion

**Old distractors:**
- (5 characters) games
- (5 characters) films
- (5 characters) music
(Old gap: correct was +34 characters longer than the longest distractor.)

**Proposed distractors:**
- (46 characters) built-in games that can be played while coding
- (44 characters) film editing tools for making video projects
- (50 characters) music playback controls for listening while coding
(New gap: -11 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Games, film editing and music playback are not what an IDE editor provides.

---

### ch4-q027 — needs my confirmation

**Question:** An advantage of a CLI over a GUI is

**Correct answer, unchanged (49 characters):** it uses less memory and can be faster for experts

**Old distractors:**
- (16 characters) it needs a mouse
- (15 characters) it plays videos
- (14 characters) it is prettier
(Old gap: correct was +33 characters longer than the longest distractor.)

**Proposed distractors:**
- (50 characters) it always requires a mouse to select every command
- (46 characters) it can play videos and show pictures in colour
- (47 characters) it looks prettier and more colourful than a GUI
(New gap: -1 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A CLI does not need a mouse, does not play videos, and is not prettier than a GUI; its advantage is low memory use and speed for experts.

---

### ch4-q189 — needs my confirmation

**Question:** When you double-click a file, the OS

**Correct answer, unchanged (38 characters):** finds the right application to open it

**Old distractors:**
- (10 characters) ignores it
- (9 characters) prints it
- (10 characters) deletes it
(Old gap: correct was +28 characters longer than the longest distractor.)

**Proposed distractors:**
- (51 characters) ignores the file completely and does nothing at all
- (50 characters) prints the file immediately on the default printer
- (46 characters) deletes the file permanently from the computer
(New gap: -13 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Double-clicking opens a file; it does not ignore, print or delete it.

---

### ch4-q025 — needs my confirmation

**Question:** A CLI is

**Correct answer, unchanged (43 characters):** a text-based interface using typed commands

**Old distractors:**
- (16 characters) a pretty desktop
- (14 characters) a touch screen
- (9 characters) a printer
(Old gap: correct was +27 characters longer than the longest distractor.)

**Proposed distractors:**
- (48 characters) a pretty desktop with icons and windows to click
- (47 characters) a touch screen that responds to finger gestures
- (49 characters) a printer that produces paper copies of documents
(New gap: -6 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A desktop with icons, a touch screen and a printer are not a text-based interface using typed commands.

---

### ch4-q073 — needs my confirmation

**Question:** A disadvantage of compilation is

**Correct answer, unchanged (46 characters):** the whole program must recompile after changes

**Old distractors:**
- (18 characters) it finds no errors
- (14 characters) it is too fast
- (20 characters) it needs no computer
(Old gap: correct was +26 characters longer than the longest distractor.)

**Proposed distractors:**
- (44 characters) it finds no errors in the source code at all
- (49 characters) it runs far too fast for the programmer to follow
- (48 characters) it needs no computer to run the compiled program
(New gap: -3 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A compiler does find errors, speed is an advantage not a disadvantage, and a compiled program still needs a computer to run.

---

### ch4-q075 — needs my confirmation

**Question:** An advantage of compilation is

**Correct answer, unchanged (50 characters):** the program can be distributed without source code

**Old distractors:**
- (24 characters) it needs the interpreter
- (24 characters) everyone sees the source
- (14 characters) it runs slowly
(Old gap: correct was +26 characters longer than the longest distractor.)

**Proposed distractors:**
- (55 characters) it still always needs the interpreter to run every time
- (49 characters) everyone who receives it can read the source code
- (49 characters) it runs slowly compared with interpreted programs
(New gap: -5 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Compiled code needs no interpreter, its source is not distributed, and it runs faster, not slower, than interpreted code.

---

### ch4-q124 — needs my confirmation

**Question:** An interrupt

**Correct answer, unchanged (40 characters):** pauses the CPU to handle an urgent event

**Old distractors:**
- (13 characters) deletes files
- (12 characters) prints pages
- (15 characters) speeds up games
(Old gap: correct was +25 characters longer than the longest distractor.)

**Proposed distractors:**
- (47 characters) deletes files from the hard disk when it occurs
- (49 characters) prints pages from the printer without being asked
- (45 characters) speeds up games by increasing processor speed
(New gap: -9 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** An interrupt does not delete files, print pages or speed up games; it pauses the CPU to handle an urgent event.

---

### ch4-q176 — needs my confirmation

**Question:** A device driver

**Correct answer, unchanged (37 characters):** lets the OS communicate with hardware

**Old distractors:**
- (13 characters) prints novels
- (11 characters) drives cars
- (11 characters) plays games
(Old gap: correct was +24 characters longer than the longest distractor.)

**Proposed distractors:**
- (44 characters) prints novels and stories on a laser printer
- (41 characters) drives cars automatically on public roads
- (40 characters) plays games on the computer for the user
(New gap: -7 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Printing novels, driving cars and playing games are not what a device driver does; it lets the OS talk to hardware.

---

### ch4-q095 — needs my confirmation

**Question:** High-level code is

**Correct answer, unchanged (39 characters):** translated by compilers or interpreters

**Old distractors:**
- (16 characters) never translated
- (7 characters) printed
- (12 characters) run directly
(Old gap: correct was +23 characters longer than the longest distractor.)

**Proposed distractors:**
- (43 characters) is never translated into any other language
- (40 characters) is printed on paper before it can be run
- (50 characters) runs directly on the processor without translation
(New gap: -11 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** High-level code must be translated, is not printed to run, and cannot run directly on the processor.

---

### ch4-q120 — needs my confirmation

**Question:** When an interrupt occurs, the CPU

**Correct answer, unchanged (34 characters):** saves its state and runs a handler

**Old distractors:**
- (10 characters) ignores it
- (11 characters) deletes RAM
- (10 characters) shuts down
(Old gap: correct was +23 characters longer than the longest distractor.)

**Proposed distractors:**
- (46 characters) ignores the interrupt and carries on as before
- (44 characters) deletes the contents of RAM and starts again
- (42 characters) shuts down the computer completely at once
(New gap: -12 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** On an interrupt the CPU does not ignore it, delete RAM or shut down; it saves its state and runs a handler.

---

## Chapter 5: The internet and its uses

### ch5-q065 — needs my confirmation

**Question:** A cookie is

**Correct answer, unchanged (44 characters):** a small file a website stores in the browser

**Old distractors:**
- (7 characters) a cable
- (7 characters) a virus
- (9 characters) a biscuit
(Old gap: correct was +35 characters longer than the longest distractor.)

**Proposed distractors:**
- (47 characters) a cable connecting the computer to the internet
- (42 characters) a virus that damages files on the computer
- (43 characters) a biscuit eaten while browsing the internet
(New gap: -3 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A cable, a virus and a biscuit are not a small file a website stores in the browser.

---

### ch5-q143 — needs my confirmation

**Question:** Logging out of shared computers

**Correct answer, unchanged (46 characters):** prevents the next user accessing your accounts

**Old distractors:**
- (7 characters) is rude
- (13 characters) deletes files
- (13 characters) breaks the PC
(Old gap: correct was +33 characters longer than the longest distractor.)

**Proposed distractors:**
- (45 characters) is rude to the next person using the computer
- (47 characters) deletes all files stored on the shared computer
- (46 characters) breaks the computer so it cannot be used again
(New gap: -1 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Logging out is not rude, does not delete files and does not break the computer; it stops the next user reaching your accounts.

---

### ch5-q106 — needs my confirmation

**Question:** Phishing is

**Correct answer, unchanged (48 characters):** fake messages tricking users into revealing data

**Old distractors:**
- (7 characters) a sport
- (16 characters) a cooking method
- (13 characters) a music style
(Old gap: correct was +32 characters longer than the longest distractor.)

**Proposed distractors:**
- (49 characters) a sport played with a rod and line beside a river
- (44 characters) a cooking method using heat and a frying pan
- (44 characters) a style of music played on a guitar on stage
(New gap: -1 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Fishing, cooking and music styles are not fake messages tricking users into revealing data.

---

### ch5-q098 — needs my confirmation

**Question:** Each block contains

**Correct answer, unchanged (42 characters):** transactions and the previous block's hash

**Old distractors:**
- (7 characters) nothing
- (7 characters) a virus
- (13 characters) only pictures
(Old gap: correct was +29 characters longer than the longest distractor.)

**Proposed distractors:**
- (46 characters) nothing at all, as blocks are completely empty
- (46 characters) a virus that spreads to other computers online
- (46 characters) only pictures with no text or transaction data
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Blocks are not empty, are not viruses and do not contain only pictures; they contain transactions and the previous block's hash.

---

### ch5-q104 — needs my confirmation

**Question:** A virus

**Correct answer, unchanged (44 characters):** attaches to files and needs a host to spread

**Old distractors:**
- (13 characters) spreads alone
- (11 characters) is harmless
- (15 characters) fixes computers
(Old gap: correct was +29 characters longer than the longest distractor.)

**Proposed distractors:**
- (50 characters) spreads alone without needing any host file at all
- (42 characters) is harmless and never damages any computer
- (42 characters) fixes computers by repairing damaged files
(New gap: -6 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A virus does not spread alone (that is a worm), is not harmless, and does not fix computers.

---

### ch5-q003 — needs my confirmation

**Question:** Intranets are

**Correct answer, unchanged (42 characters):** private networks using internet technology

**Old distractors:**
- (15 characters) public websites
- (7 characters) viruses
- (6 characters) cables
(Old gap: correct was +27 characters longer than the longest distractor.)

**Proposed distractors:**
- (48 characters) public websites open to everyone on the internet
- (44 characters) viruses that attack private company networks
- (45 characters) cables used to connect computers in an office
(New gap: -6 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Public websites, viruses and cables are not private networks using internet technology.

---

### ch5-q071 — needs my confirmation

**Question:** A cookie stores

**Correct answer, unchanged (34 characters):** text data like IDs and preferences

**Old distractors:**
- (7 characters) viruses
- (8 characters) programs
- (6 characters) movies
(Old gap: correct was +26 characters longer than the longest distractor.)

**Proposed distractors:**
- (44 characters) viruses that damage the browser and computer
- (46 characters) programs that run automatically in the browser
- (39 characters) movies that play inside the web browser
(New gap: -12 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A cookie stores text data, not viruses, programs or movies.

---

### ch5-q100 — needs my confirmation

**Question:** A 51% attack means

**Correct answer, unchanged (36 characters):** one party controls most mining power

**Old distractors:**
- (6 characters) a sale
- (10 characters) a discount
- (7 characters) a party
(Old gap: correct was +26 characters longer than the longest distractor.)

**Proposed distractors:**
- (44 characters) a sale offering fifty-one percent off prices
- (43 characters) a discount applied to half of all purchases
- (41 characters) a party celebrating with fifty-one guests
(New gap: -8 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A sale, a discount and a party are not one party controlling most mining power.

---

### ch5-q112 — needs my confirmation

**Question:** Identity theft is

**Correct answer, unchanged (40 characters):** stealing personal details to impersonate

**Old distractors:**
- (6 characters) a game
- (15 characters) a costume party
- (6 characters) acting
(Old gap: correct was +25 characters longer than the longest distractor.)

**Proposed distractors:**
- (36 characters) a game played by children at a party
- (44 characters) a costume party where guests dress as others
- (42 characters) acting a role in a play on a theatre stage
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A children's game, a costume party and acting in a play are not stealing personal details to impersonate someone.

---

### ch5-q095 — needs my confirmation

**Question:** A blockchain is

**Correct answer, unchanged (37 characters):** a distributed ledger of linked blocks

**Old distractors:**
- (13 characters) a metal chain
- (13 characters) a single file
- (10 characters) a password
(Old gap: correct was +24 characters longer than the longest distractor.)

**Proposed distractors:**
- (38 characters) a metal chain used to secure a bicycle
- (41 characters) a single file stored on one computer only
- (42 characters) a password used to unlock a digital wallet
(New gap: -5 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A metal chain, a single file and a password are not a distributed ledger of linked blocks.

---

## Chapter 6: Automated and emerging technologies

### ch6-q118 — needs my confirmation

**Question:** Asimov's third law says a robot must

**Correct answer, unchanged (51 characters):** protect itself unless it conflicts with higher laws

**Old distractors:**
- (10 characters) never move
- (13 characters) ignore damage
- (11 characters) always rest
(Old gap: correct was +38 characters longer than the longest distractor.)

**Proposed distractors:**
- (55 characters) never move at all, even when ordered to do so by humans
- (44 characters) ignore damage to itself in all circumstances
- (41 characters) always rest and never carry out any tasks
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Never moving, ignoring damage and always resting are the opposite of the third law, which is self-preservation unless it conflicts with higher laws.

---

### ch6-q115 — needs my confirmation

**Question:** Asimov's second law says a robot must

**Correct answer, unchanged (50 characters):** obey humans unless it conflicts with the first law

**Old distractors:**
- (11 characters) harm humans
- (11 characters) rest always
- (13 characters) ignore humans
(Old gap: correct was +37 characters longer than the longest distractor.)

**Proposed distractors:**
- (43 characters) harm humans whenever it is ordered to do so
- (54 characters) rest always and ignore every human order that is given
- (43 characters) ignore humans completely in every situation
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Harming humans, resting always and ignoring humans are the opposite of the second law, which is obedience unless it conflicts with the first law.

---

### ch6-q073 — needs my confirmation

**Question:** Characteristics of robots include

**Correct answer, unchanged (37 characters):** sensors, movement and programmability

**Old distractors:**
- (6 characters) dreams
- (6 characters) hunger
- (8 characters) emotions
(Old gap: correct was +29 characters longer than the longest distractor.)

**Proposed distractors:**
- (40 characters) dreams experienced during sleep at night
- (40 characters) hunger felt when food has not been eaten
- (38 characters) emotions such as happiness and sadness
(New gap: -3 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Dreams, hunger and emotions are human traits, not robot characteristics (sensors, movement, programmability).

---

### ch6-q084 — needs my confirmation

**Question:** The key difference is

**Correct answer, unchanged (34 characters):** human involvement during operation

**Old distractors:**
- (4 characters) size
- (5 characters) price
- (6 characters) colour
(Old gap: correct was +28 characters longer than the longest distractor.)

**Proposed distractors:**
- (37 characters) the size of the machine and its parts
- (33 characters) the price charged for the machine
- (38 characters) the colour of the machine's outer case
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Size, price and colour are not the key difference in autonomy level; human involvement during operation is.

---

### ch6-q004 — needs my confirmation

**Question:** The microprocessor in an automated system

**Correct answer, unchanged (41 characters):** processes sensor data and decides actions

**Old distractors:**
- (11 characters) moves parts
- (14 characters) supplies power
- (12 characters) senses light
(Old gap: correct was +27 characters longer than the longest distractor.)

**Proposed distractors:**
- (45 characters) moves mechanical parts of the system directly
- (45 characters) supplies electrical power to the whole system
- (43 characters) senses light levels in the surrounding area
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Moving parts, supplying power and sensing light are actuator, power supply and sensor jobs, not the microprocessor's job.

---

### ch6-q150 — needs my confirmation

**Question:** Forward chaining

**Correct answer, unchanged (39 characters):** applies rules from facts to conclusions

**Old distractors:**
- (13 characters) ignores rules
- (13 characters) deletes facts
- (14 characters) goes backwards
(Old gap: correct was +25 characters longer than the longest distractor.)

**Proposed distractors:**
- (44 characters) ignores all rules when reasoning about facts
- (41 characters) deletes facts that have already been used
- (39 characters) goes backwards from goals to find facts
(New gap: -5 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Ignoring rules, deleting facts and going backwards are not forward chaining, which applies rules from facts to conclusions (backwards is backward chaining).

---

### ch6-q123 — needs my confirmation

**Question:** General AI

**Correct answer, unchanged (38 characters):** would match human intelligence broadly

**Old distractors:**
- (14 characters) is a phone app
- (14 characters) is a robot toy
- (12 characters) exists today
(Old gap: correct was +24 characters longer than the longest distractor.)

**Proposed distractors:**
- (42 characters) is a phone app available to download today
- (41 characters) is a robot toy sold in shops for children
- (37 characters) exists today in every home and school
(New gap: -4 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** A phone app, a robot toy and a system that exists today are not general AI, which would match human intelligence broadly and does not exist yet.

---

### ch6-q022 — needs my confirmation

**Question:** In a nuclear power station, automated systems

**Correct answer, unchanged (34 characters):** control rods and monitor radiation

**Old distractors:**
- (10 characters) play games
- (11 characters) write poems
- (10 characters) cook lunch
(Old gap: correct was +23 characters longer than the longest distractor.)

**Proposed distractors:**
- (42 characters) play games for the workers on night shifts
- (42 characters) write poems about the power station's work
- (43 characters) cook lunch for staff in the station canteen
(New gap: -9 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Playing games, writing poems and cooking lunch are not what automated systems do in a nuclear power station.

---

### ch6-q151 — needs my confirmation

**Question:** Expert systems cannot

**Correct answer, unchanged (37 characters):** handle situations outside their rules

**Old distractors:**
- (7 characters) explain
- (11 characters) store facts
- (14 characters) answer quickly
(Old gap: correct was +23 characters longer than the longest distractor.)

**Proposed distractors:**
- (37 characters) explain how they reached a conclusion
- (35 characters) store facts in their knowledge base
- (39 characters) answer questions quickly and accurately
(New gap: -2 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** Expert systems can explain, can store facts and can answer quickly; what they cannot do is handle situations outside their rules.

---

### ch6-q184 — needs my confirmation

**Question:** A thermostat controlling heating is

**Correct answer, unchanged (30 characters):** a closed-loop automated system

**Old distractors:**
- (2 characters) AI
- (7 characters) a robot
- (6 characters) manual
(Old gap: correct was +23 characters longer than the longest distractor.)

**Proposed distractors:**
- (34 characters) an artificial intelligence program
- (35 characters) a robot that moves around the house
- (32 characters) a manual system operated by hand
(New gap: -5 characters, meaning the longest distractor is now at least as long as the correct option.)

**Why the new distractors are still wrong:** An AI program, a moving robot and a manual system are not a closed-loop automated system like a thermostat.

---
