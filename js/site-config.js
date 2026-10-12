/* ============================================================
   SITE CONFIG — edit everything about the site here.
   No coding needed: change the text between the quotes,
   save this file, and re-upload the site.
   ============================================================ */

var SITE = {
  // ---- Identity ----
  name: "Sakib Shahriyar Pathan",
  monogram: "SP",
  designation: "Lecturer in ICT",
  deptLine: "Lecturer, Department of ICT",
  institution: "Gosinga Alim Madrasah",
  tagline: "Make ICT simple — memorise less, understand more",

  // Rotating highlight words under the hero tagline (add/remove freely)
  heroHighlights: [
    "Understand deeply.",
    "Code confidently.",
    "Think logically.",
    "Build for the real world."
  ],

  // ---- Contact ----
  email: "sakib.shahriyar.pathan@gmail.com",
  phone: "+8801832202600",
  phoneLink: "tel:+8801832202600",
  whatsapp: "https://wa.me/8801832202600",
  facebook: "", // paste your Facebook profile link here, e.g. "https://facebook.com/yourname"

  // ---- About ----
  experienceSummary: "8 years of teaching experience",
  subjects: {
    "HSC": "Physics, ICT",
    "SSC": "Mathematics, Physics, Chemistry, Higher Mathematics",
    "O / A Level": "ICT, Computer Science"
  },
  education: [
    { degree: "MSc in Computer Science & Engineering", school: "Bangladesh University of Engineering and Technology (BUET)" },
    { degree: "BSc in Computer Science & Engineering", school: "Southeast University (SEU)" }
  ],
  expertise: [
    "Web Development", "C Programming", "Logic Gates",
    "Networking", "Database Management", "HSC ICT Curriculum"
  ],

  // ---- Milestones (shown in order, no years) ----
  milestones: [
    { title: "BSc in Computer Science & Engineering", text: "Graduated from Southeast University (SEU)." },
    { title: "MSc in Computer Science & Engineering", text: "Completed postgraduate studies at Bangladesh University of Engineering and Technology (BUET)." },
    { title: "Lecturer of ICT, Gosinga Alim Madrasah", text: "Teaching ICT with a simple, understanding-first approach." },
    { title: "8 years across HSC, SSC and O/A Level", text: "HSC Physics & ICT; SSC Math, Physics, Chemistry & Higher Math; O/A Level ICT & CS." },
    { title: "Complete HSC ICT resource set", text: "Detailed notes, 134 lecture plans and 134 slide decks covering all six chapters." }
  ],

  // Default subject used when the contact form is opened normally
  formSubject: "Message from portfolio website"
};

/* ============================================================
   DOCUMENTS — the study-note documents behind the Notes page.
   id:      short id used in links (do not change once shared)
   chapter: card heading on the Notes page
   title:   official document title (used in the request message)
   desc:    one-line card description
   preview: path to the 4-page preview PDF (relative to notes.html)
   ============================================================ */

var DOCUMENTS = [
  {
    id: "ch1",
    chapter: "Chapter 1 — ICT: World & Bangladesh Perspective",
    title: "HSC ICT Chapter 1 Detailed Notes",
    desc: "How ICT shapes our world and Bangladesh — information society, e-services and ICT in education.",
    preview: "assets/previews/ch1-preview.pdf"
  },
  {
    id: "ch2",
    chapter: "Chapter 2 — Communication Systems & Networking",
    title: "HSC ICT Chapter 2 Detailed Notes",
    desc: "Data communication, transmission modes & media, networking concepts and the internet.",
    preview: "assets/previews/ch2-preview.pdf"
  },
  {
    id: "ch3p1",
    chapter: "Chapter 3 (Part 1) — Number System",
    title: "HSC ICT Chapter 3 Part 1 Detailed Notes (Bangla)",
    desc: "Binary, octal, decimal and hexadecimal conversions with number-system arithmetic.",
    preview: "assets/previews/ch3p1-preview.pdf"
  },
  {
    id: "ch3p2",
    chapter: "Chapter 3 (Part 2) — Digital Devices",
    title: "HSC ICT Chapter 3 Part 2 Detailed Notes (Bangla)",
    desc: "Logic gates, Boolean algebra, encoders, decoders and combinational circuits.",
    preview: "assets/previews/ch3p2-preview.pdf"
  },
  {
    id: "ch4",
    chapter: "Chapter 4 — Web Design & HTML",
    title: "HSC ICT Chapter 4 Detailed Notes (Bangla)",
    desc: "HTML structure, tags, tables, forms — building your first web page step by step.",
    preview: "assets/previews/ch4-preview.pdf"
  },
  {
    id: "ch5",
    chapter: "Chapter 5 — Programming Language",
    title: "HSC ICT Chapter 5 Detailed Notes (Bangla)",
    desc: "C programming fundamentals — variables, operators, control flow and functions.",
    preview: "assets/previews/ch5-preview.pdf"
  },
  {
    id: "ch6",
    chapter: "Chapter 6 — Database Management System",
    title: "HSC ICT Chapter 6 Detailed Notes (Bangla)",
    desc: "Database concepts, DBMS, keys, SQL basics and database design.",
    preview: "assets/previews/ch6-preview.pdf"
  }
];
