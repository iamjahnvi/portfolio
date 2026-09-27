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

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Jahnvi",
  url: "https://jahnvidotdev.vercel.app",
  profileImages: [
    "/profile.jpg",
  ],
  bannerImage: "/banner.png",
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
    "I spend most of my time in the terminal, the browser, or scribbling on a whiteboard. I lean backend,not because I don't like frontend, but because I enjoy making polished things actually hold up.",
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
    linkedin: "https://linkedin.com/in/nodejahnvi",
    email: "mailto:conveytojahnvi@gmail.com",
    resume: "",
    discord: "https://discord.gg/ra4kyKdTk",
    medium: "https://medium.com/@jahnvidotdev",
  },
  experience: [
    {
      company: "Independent Developer",
      role: "Frontend Developer",
      period: "2025 — Present",
      blurb:
        "Built and deployed multiple SPAs & web applications. Engaged in competitive coding events like the Smart India Hackathon and HT codeathon.",
      url: "",
    },
  ] as Job[],
  projects: [
    {
      title: "NextStep",
      blurb:
        "A personalized exam discovery platform that matches students to competitive exams they are actually eligible for — based on age, education level, stream, percentage and subjects — with auth, profiles and exam details.",
      story:
        "Students create an academic profile and get filtered exam recommendations with eligibility details. Built as a full-stack app: React + Vite frontend talking to an Express.js REST backend (auth, profiles, recommendation logic) backed by MongoDB/Mongoose, wired with Axios.",
      stack: ["React", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Axios"],
      year: "2025",
      links: {
        source: "https://github.com/iamjahnvi/nextStep",
      },
      featured: true,
    },
    {
      title: "AI Revenue Recovery Agent",
      blurb:
        "An AI revenue-recovery agent (Razorpay AI Buildathon, Track 3) that detects at-risk revenue — failed payments, abandoned checkouts, overdue receivables — decides bounded recovery actions and tracks outcomes.",
      story:
        "Pipeline: detection → payment normalizer → risk engine (amount × recovery probability) → policy engine → bounded executor (retry / remind / escalate / stop) → audit + metrics. FastAPI webhook server with HMAC-SHA256 verification and idempotent processing, plus a Streamlit dashboard. Test mode only — no real charges.",
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
        "A nostalgic browser-based Carvaan — a focused, curated music player with play/pause, track navigation and a now-playing display, powered by HTML5 Audio and Supabase Edge Functions.",
      story:
        "Built with React + Vite and styled responsively. Supabase Edge Functions supply external music data while HTML5 Audio handles playback in the browser.",
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
        "A whimsical interactive universe in React — explore stars, planets and moon interactions while picking up cosmic facts through a playful creative-coding web experience.",
      story:
        "A frontend playground built with React + JavaScript + Vite: interactive cosmic elements, moon interactions and bite-sized space facts.",
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
        "Frontend practice project: recreating Canva's visual structure with semantic HTML and custom CSS. Educational recreation, not affiliated with Canva.",
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
        "Semantic HTML, reusable CSS patterns, navigation/product sections and responsive pages. Frontend only — no backend, payments or auth.",
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
  writing: [] as Post[],
  github: {
    username: "iamjahnvi",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork "
} as const;

export type Site = typeof site;
