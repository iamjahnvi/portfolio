export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export const site = {
  name: "Janhvi",
  firstName: "Janhvi",
  url: "https://jahnvidotdev.vercel.app",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile.jpg",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/banner.png",
  initials: "AJ",
  role: "Full Stack Developer",
  location: "Delhi, India",
  timezone: "Asia/Kolkata",
  email: "conveytojahnvi@gmail.com",
  greeting: "Hey, I'm Jahnvi",
  tagline: "I build clean, modern websites and web apps where design, functionality, and even the smallest details matter.",
  about: [
    "Hey, I'm Jahnvi, a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.",
    "I spend most of my time in the terminal, the browser, or scribbling on a whiteboard. I lean backend, not because I don't like frontend, but because I enjoy making polished things actually hold up.",
    "I don't ship junk. Maintainability isn't optional. And I build best when I'm curious.",
  ],
  tldr: [
    "Building products.",
    "Learning technologies.",
    "Shipping consistently.",
    "Obsessed with clean code.",
  ],
  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: "Backend Engineering • System Design • DSA • DevOps",
    nowBuilding: "NextStep",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/iamjahnvi",
    twitter: "https://x.com/fireflybuilds",
    linkedin: "https://linkedin.com/in/jahnvi-11a189358/",
    email: "mailto:conveytojahnvi@gmail.com",
    resume: "https://drive.google.com/file/d/1NQwCDHVQZxRd_hUnQ2vSI3dQX3SNb8Js/view?usp=sharing",
    discord: "https://discord.gg/ra4kyKdTk",
    medium: "https://medium.com/@jahnvidotdev",
  },
  experience: [
    {
      company: "Independent Developer",
      role: "Backend & Full-Stack Developer",
      period: "2025 – Present",
      blurb:
        "Building and shipping full-stack applications, SaaS products, and backend systems for real-world use cases. Working across APIs, authentication, databases, real-time systems, and modern web infrastructure.",
      url: "",
    },
  ] as Job[],
  projects: [
    {
      title: "NextStep",
      blurb:
        "A personalized exam discovery platform that helps students find opportunities they’re actually eligible for. It matches academic profiles with eligibility criteria, deadlines, and official exam information in one place.",
      story:
        "Students create an academic profile and get filtered exam recommendations with eligibility details. Built as a full-stack app: React + Vite frontend talking to an Express.js REST backend (auth, profiles, recommendation logic) backed by MongoDB/Mongoose, wired with Axios.\n\nFlow: profile → eligibility matching → personalized recommendations → exam details. Ongoing work: deadlines, saved exams, notifications.",
      stack: ["React", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Axios"],
      year: "2025",
      links: {
        source: "https://github.com/iamjahnvi/nextStep",
      },
      featured: true,
    },
    {
      title: "ECDAT",
      blurb:
        "An enterprise cryptographic discovery and analysis tool designed to help organizations assess their readiness for the post-quantum era. It scans software ecosystems for cryptographic dependencies and surfaces risks to support structured PQC migration.",
      stack: ["React", "Vite", "TailwindCSS", "Python", "FastAPI", "Uvicorn"],
      year: "",
      links: {
        source: "https://github.com/iamjahnvi/ECDAT_NTRO",
      },
      featured: true,
    },
    {
      title: "AI Revenue Recovery Agent",
      blurb:
        "An AI-assisted payment recovery system that analyzes failed transactions and determines whether to retry, delay, or escalate them. It combines payment failure signals with retry policies to make recovery decisions while avoiding unnecessary repeated attempts.",
      story:
        "Pipeline: detection → payment normalizer → risk engine (amount × recovery probability) → policy engine → bounded executor (retry / remind / escalate / stop) → audit + metrics. FastAPI webhook server verifies Razorpay payment.failed events with HMAC-SHA256 and idempotent processing; a batch processor computes revenue-at-risk, recovered revenue and recovery rate; a Streamlit dashboard shows outcomes.\n\nSandbox demo: ₹64,160 at risk across 7 events. Test mode only — no real charges.",
      stack: ["Python", "FastAPI", "Streamlit", "Razorpay API", "Groq", "Uvicorn"],
      year: "2026",
      links: {
        source: "https://github.com/iamjahnvi/ai-recovery-razorpay",
      },
      featured: true,
    },
    {
      title: "Virtual Carvaan",
      blurb:
        "A digital take on the nostalgic Carvaan experience, bringing a curated collection of music and an old-school listening feel to the web. Built as a playful exploration of interaction, nostalgia, and web experience design.",
      story:
        "Built with React + Vite and styled responsively, it keeps the classic Carvaan listening experience: pick a track, listen, move on. Supabase Edge Functions supply external music data while HTML5 Audio handles playback in the browser.",
      stack: ["React", "TypeScript", "Vite", "Supabase", "HTML5 Audio", "CSS"],
      year: "2026",
      links: {
        live: "https://virtualcarvaan.netlify.app/",
        source: "https://github.com/iamjahnvi/virtual-carvaan",
      },
      featured: true,
    },
    {
      title: "Tiny Universe",
      blurb:
        "An experimental, immersive web experience built around cosmic visuals, motion, and exploration. It turns a simple scroll into a playful journey through an evolving digital universe.",
      story:
        "A frontend playground built with React + JavaScript + Vite: interactive cosmic elements, moon interactions and bite-sized space facts, composed as a light, explorable single-page experience.",
      stack: ["React", "JavaScript", "Vite", "CSS"],
      year: "2025",
      links: {
        source: "https://github.com/iamjahnvi/tiny-universe",
      },
      featured: false,
    },
    {
      title: "Canva Clone",
      blurb:
        "A multi-section Canva landing-page recreation in pure HTML and CSS — navigation, hero, promo and media sections rebuilt with structured markup and custom styling.",
      story:
        "Frontend practice project: recreating Canva's visual structure with semantic HTML and custom CSS — multi-section layout, image/video media handling and responsive design. Educational recreation, not affiliated with Canva.\n\nNext steps: JS interactions, animations and functional navigation.",
      stack: ["HTML5", "CSS3"],
      year: "2025",
      links: {
        source: "https://github.com/iamjahnvi/canva_clone",
      },
      featured: false,
    },
    {
      title: "Shopify Clone",
      blurb:
        "A multi-page Shopify storefront recreation in pure HTML and CSS — homepage, product and collection layouts plus checkout, B2B and enterprise pages with a consistent design system.",
      story:
        "Translates a real e-commerce design into structured, maintainable frontend code: semantic HTML, reusable CSS patterns, navigation/product sections and responsive pages. Frontend only — no backend, payments or auth.\n\nNext steps: search/filter, cart, and backend integration.",
      stack: ["HTML5", "CSS3"],
      year: "2025",
      links: {
        source: "https://github.com/iamjahnvi/shopify_clone",
      },
      featured: false,
    },
  ] as Project[],
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "HTML5",
    "CSS3",
    "React",
    "Vite",
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST APIs",
    "Uvicorn",
    "MongoDB",
    "Mongoose",
    "Supabase",
    "Streamlit",
    "Razorpay API",
    "Axios",
    "Git",
    "GitHub",
    "Netlify",
  ],
  github: {
    username: "iamjahnvi",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;
