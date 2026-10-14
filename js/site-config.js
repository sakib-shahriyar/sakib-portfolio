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

  // Dashboard passcode for admin.html — CHANGE THIS to something only you know.
  // NOTE: this is a casual lock, not real security. A static site cannot have
  // true logins; anyone with the site files could bypass it. Your real
  // protection is that only you can push updates to your GitHub repository.
  adminPasscode: "PaTHaN@1993",

  // ---- About ----
  experienceSummary: "8 years of teaching experience",
  subjects: {
    "HSC": "Physics, ICT",
    "SSC": "Mathematics, Physics, Chemistry, Higher Mathematics",
    "O / A Level": "ICT, Computer Science (Cambridge & Edexcel)"
  },
  education: [
    { degree: "MSc in Computer Science & Engineering", school: "Bangladesh University of Engineering and Technology (BUET)" },
    { degree: "BSc in Computer Science & Engineering", school: "Southeast University (SEU)" }
  ],
  expertise: [
    "Web Development", "C Programming", "Logic Gates",
    "Networking", "Database Management", "HSC ICT Curriculum",
    "Cambridge ICT", "Cambridge Computer Science",
    "Edexcel ICT", "Edexcel Computer Science"
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
  formSubject: "Message from portfolio website",

  // ---- Testimonials (homepage "What students say" section) ----
  // Paste REAL quotes from your students below, one line per student:
  //   { name: "Student Name", detail: "HSC 2025, College Name", text: "Their exact words." },
  // Leave the list empty [ ] and the section stays hidden on the site.
  testimonials: [
    { name: "তাওহীদ হাসান", detail: "HSC 2025", text: "C Programming নিয়ে অনেক ভয় ছিল, কিন্তু স্যারের সহজ ব্যাখ্যা ও বাস্তব উদাহরণে কোডিং এখন আমার প্রিয় টপিক।" },
    { name: "সামিয়া আফরিন", detail: "HSC 2025", text: "HTML ও Web Design অংশটা এত চমৎকারভাবে বুঝিয়েছেন যে নিজের প্রথম ওয়েবসাইট তৈরি করতে কোন কষ্টই হয়নি।" },
    { name: "রিজভী আহমেদ", detail: "HSC 2024", text: "Logic Gate আর Boolean Algebra-র ম্যাথগুলো আগে মুখস্থ করতাম, স্যারের ক্লাসের পর এখন টেকনিক দেখলেই সমাধান করতে পারি।" },
    { name: "সায়মা", detail: "HSC 2023", text: "Database Management System-এর SQL query এত সহজে শেখানো যায়, স্যারের ক্লাস না করলে বুঝতেই পারতাম না।" },
    { name: "লোবা", detail: "HSC 2023", text: "পরীক্ষার আগের রাতে স্যারের সংক্ষিপ্ত রিভিশন ও প্র্যাকটিক্যাল গাইডলাইনগুলো আমার A+ পাওয়ার মূল চাবিকাঠি ছিল।" },
    { name: "তৌকীর", detail: "HSC 2023", text: "Networking ও Cloud Computing-এর জটিল তত্ত্বগুলো স্যার এত সহজে ফুটিয়ে তোলেন যে ক্লাসেই পড়া শেষ হয়ে যায়।" },
    { name: "Abrar Shahriar", detail: "Cambridge O Level CS (2025)", text: "Pseudocode and logic gates felt overwhelming at first, but Sir's step-by-step trace tables made Paper 2 my strongest component." },
    { name: "Wasiur Rahman", detail: "Edexcel International GCSE CS (2024)", text: "Python programming and algorithm design became so natural after Sir's practical sessions. I went from struggling with syntax to scoring an 8!" },
    { name: "Tasfia Haq", detail: "Cambridge O Level CS (2025)", text: "Understanding automated systems, sensors, and data transmission for Paper 1 was effortless thanks to Sir's real-world examples and topic-wise past paper practice." }
  ]
};

/* ============================================================
   DOCUMENTS — the study-note documents behind the Notes page.
   id:      short id used in links (do not change once shared)
   chapter: card heading on the Notes page
   chapterBn: Bengali chapter name (shown under the English heading)
   title:   official document title (used in the request message)
   desc:    one-line card description
   preview: path to the 4-page preview PDF (relative to notes.html)
   ============================================================ */

var DOCUMENTS = [
  {
    id: "ch1",
    chapter: "Chapter 1 — ICT: World & Bangladesh Perspective",
    chapterBn: "অধ্যায় ১ — তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত",
    title: "HSC ICT Chapter 1 Detailed Notes",
    desc: "How ICT shapes our world and Bangladesh — information society, e-services and ICT in education.",
    preview: "assets/previews/ch1-preview.pdf"
  },
  {
    id: "ch2",
    chapter: "Chapter 2 — Communication Systems & Networking",
    chapterBn: "অধ্যায় ২ — কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং",
    title: "HSC ICT Chapter 2 Detailed Notes",
    desc: "Data communication, transmission modes & media, networking concepts and the internet.",
    preview: "assets/previews/ch2-preview.pdf"
  },
  {
    id: "ch3p1",
    chapter: "Chapter 3 (Part 1) — Number System",
    chapterBn: "অধ্যায় ৩ (১ম অংশ) — সংখ্যা পদ্ধতি",
    title: "HSC ICT Chapter 3 Part 1 Detailed Notes (Bangla)",
    desc: "Binary, octal, decimal and hexadecimal conversions with number-system arithmetic.",
    preview: "assets/previews/ch3p1-preview.pdf"
  },
  {
    id: "ch3p2",
    chapter: "Chapter 3 (Part 2) — Digital Devices",
    chapterBn: "অধ্যায় ৩ (২য় অংশ) — ডিজিটাল ডিভাইস",
    title: "HSC ICT Chapter 3 Part 2 Detailed Notes (Bangla)",
    desc: "Logic gates, Boolean algebra, encoders, decoders and combinational circuits.",
    preview: "assets/previews/ch3p2-preview.pdf"
  },
  {
    id: "ch4",
    chapter: "Chapter 4 — Web Design & HTML",
    chapterBn: "অধ্যায় ৪ — ওয়েব ডিজাইন পরিচিতি এবং HTML",
    title: "HSC ICT Chapter 4 Detailed Notes (Bangla)",
    desc: "HTML structure, tags, tables, forms — building your first web page step by step.",
    preview: "assets/previews/ch4-preview.pdf"
  },
  {
    id: "ch5",
    chapter: "Chapter 5 — Programming Language",
    chapterBn: "অধ্যায় ৫ — প্রোগ্রামিং ভাষা",
    title: "HSC ICT Chapter 5 Detailed Notes (Bangla)",
    desc: "C programming fundamentals — variables, operators, control flow and functions.",
    preview: "assets/previews/ch5-preview.pdf"
  },
  {
    id: "ch6",
    chapter: "Chapter 6 — Database Management System",
    chapterBn: "অধ্যায় ৬ — ডেটাবেজ ম্যানেজমেন্ট সিস্টেম",
    title: "HSC ICT Chapter 6 Detailed Notes (Bangla)",
    desc: "Database concepts, DBMS, keys, SQL basics and database design.",
    preview: "assets/previews/ch6-preview.pdf"
  }
];
