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

export type FreelanceProject = {
  title: string;
  category: string;
  description: string;
  overview: string;
  responsibilities: string[];
  technologies: string[];
  fullStack: string[];
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export type OpenSourceContribution = {
  title: string;
  repo: string;
  prNumber: number;
  url: string;
  status: "Merged";
  description: string;
  technologies: string[];
};

export const site = {
  name: "Jahnvi",
  firstName: "Jahnvi",
  url: "https://jahnvidotdev.vercel.app",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile.jpg",
    "/profile2.png",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
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
    linkedin: "https://linkedin.com/in/nodejahnvi",
    email: "mailto:conveytojahnvi@gmail.com",
    resume: "",
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
  freelanceProjects: [
    {
      title: "Course Selling Platform",
      category: "Backend Development · Freelance",
      description:
        "Backend for an online course platform supporting authentication, course management, purchases, enrollments, and content access.",
      overview:
        "Developed the backend for a course-selling platform where users can discover courses, purchase access, and manage their enrolled content.",
      responsibilities: [
        "REST API development",
        "Authentication and authorization",
        "Course management",
        "Enrollment and access control",
        "Purchase workflows",
        "Database design",
        "Backend architecture",
      ],
      technologies: ["TypeScript", "Redis", "Razorpay", "Cloudinary", "JWT", "Docker", "Swagger"],
      fullStack: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Razorpay",
        "Cloudinary",
        "JWT",
        "Docker",
        "Swagger",
        "REST APIs",
        "Postman",
      ],
    },
    {
      title: "Learning Management System",
      category: "Backend Development · Freelance",
      description:
        "Backend architecture for an LMS supporting students, instructors, courses, enrollments, lessons, and progress tracking.",
      overview:
        "Built the backend architecture for a Learning Management System supporting students, instructors, and administrators.",
      responsibilities: [
        "Authentication",
        "Role-based authorization",
        "Course management",
        "Lesson management",
        "Enrollment workflows",
        "Student progress tracking",
        "REST API development",
        "Database design",
      ],
      technologies: ["TypeScript", "Redis", "AWS S3", "JWT", "RBAC", "Docker", "Swagger"],
      fullStack: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "AWS S3",
        "JWT",
        "RBAC",
        "Docker",
        "Swagger",
        "REST APIs",
        "Postman",
      ],
    },
  ] as FreelanceProject[],
  projects: [
    {
      title: "NextStep",
      blurb:
        "A personalized exam discovery platform that matches students to competitive exams they are actually eligible for — based on age, education level, stream, percentage and subjects — with auth, profiles and exam details.",
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
      title: "AI Revenue Recovery Agent",
      blurb:
        "An AI revenue-recovery agent (Razorpay AI Buildathon, Track 3) that detects at-risk revenue — failed payments, abandoned checkouts, overdue receivables — decides bounded recovery actions and tracks outcomes.",
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
        "A nostalgic browser-based Carvaan — a focused, curated music player with play/pause, track navigation and a now-playing display, powered by HTML5 Audio and Supabase Edge Functions.",
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
        "A whimsical interactive universe in React — explore stars, planets and moon interactions while picking up cosmic facts through a playful creative-coding web experience.",
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
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
    "Figma",
    "C++",
    "Python",
  ],
  writing: [
    {
      title: "Authentication & Authorization for Backend Engineers: A Complete Guide",
      summary: "A comprehensive guide on authentication and authorization architectures, covering passwords, sessions at scale, JWTs, OAuth, WebAuthn, and zero-trust security for backend systems.",
      date: "Sep 11, 2026",
      readingTime: "25 min read",
      url: "https://medium.com/@jahnvidotdev/authentication-authorization-for-backend-engineers-a-complete-guide-f8844e97bddf?sharedUserId=jahnvidotdev",
    },
    {
      title: "Serialization and Deserialization: The Universal Language of Backend Engineering",
      summary: "A deep dive into serialization formats from JSON and XML to Protocol Buffers, exploring schema validation, backward compatibility, and network serialization bottlenecks.",
      date: "Aug 29, 2026",
      readingTime: "14 min read",
      url: "https://medium.com/@jahnvidotdev/serialization-and-deserialization-the-universal-language-of-backend-engineering-8df8ce03d257",
    },
    {
      title: "The Ultimate Guide to Routing: From Network Packets to Backend Handlers",
      summary: "A comprehensive exploration of routing across layers, tracing IP packets, hardware routing tables, HTTP multiplexing, and frontend routers.",
      date: "Aug 26, 2026",
      readingTime: "20 min read",
      url: "https://medium.com/@jahnvidotdev/the-ultimate-guide-to-routing-from-network-packets-to-backend-handlers-64cc4f7fdbfa",
    },
    {
      title: "Understanding HTTP: The Backbone of the Web",
      summary: "A deep dive into the Hypertext Transfer Protocol, exploring header lifecycle, request methods, statelessness, and connection optimization from HTTP/1.1 to HTTP/3.",
      date: "Aug 22, 2026",
      readingTime: "15 min read",
      url: "https://medium.com/@jahnvidotdev/understanding-http-the-backbone-of-the-web-3d2109d0facd",
    },
    {
      title: "API Rate Limiting: I thought it was just counting requests...",
      summary: "An analysis of rate limiting algorithms from Token Bucket to Sliding Window logs, detailing how distributed systems protect API infrastructure under load.",
      date: "Jul 12, 2026",
      readingTime: "14 min read",
      url: "https://medium.com/@jahnvidotdev/api-rate-limiting-i-thought-it-was-just-counting-requests-682cefa2f56c",
    },
    {
      title: "The JWT Storage Debate is Over: Here's the Production-Grade Architecture Your App Actually Needs",
      summary: "A definitive guide to JWT storage in frontend applications, detailing why standard localStorage fails and how to implement secure memory-session architecture with HTTP-only cookies.",
      date: "Jun 24, 2026",
      readingTime: "8 min read",
      url: "https://medium.com/@jahnvidotdev/the-jwt-storage-debate-is-over-heres-the-production-grade-architecture-your-app-actually-needs-9ab284da065f",
    }
  ] as Post[],
  openSourceContributions: [
    {
      title: "UI: Restyle hero buttons to custom Neo-Brutalist spec",
      repo: "fossasia/voxbento",
      prNumber: 370,
      url: "https://github.com/fossasia/voxbento/pull/370",
      status: "Merged",
      description:
        "Restyled hero CTA buttons with custom Neo-Brutalist design, thicker borders, hard-offset shadows, hover lift, and active press states while resolving CSS specificity issues with Tailwind preflight.",
      technologies: ["Tailwind CSS", "CSS", "UI/UX", "Neo-Brutalism"],
    },
    {
      title: "UI: Restyle navbar login buttons to custom Neo-Brutalist spec",
      repo: "fossasia/voxbento",
      prNumber: 358,
      url: "https://github.com/fossasia/voxbento/pull/358",
      status: "Merged",
      description:
        "Standardized landing page navbar authentication actions (Sign In, Register, Dashboard) into unified Neo-Brutalist button components with standardized borders, shadows, hover lift, and active states.",
      technologies: ["CSS", "HTML", "UI/UX", "Neo-Brutalism"],
    },
    {
      title: "Bug fix: speaker image blue overlay",
      repo: "fossasia/voxbento",
      prNumber: 389,
      url: "https://github.com/fossasia/voxbento/pull/389",
      status: "Merged",
      description:
        "Resolved an image rendering bug on the landing page where the speaker visual was obscured by an unwanted blue overlay and blend mode, restoring full color clarity.",
      technologies: ["HTML", "Tailwind CSS", "Bug Fix"],
    },
    {
      title: "UI: Restyle navbar logout button to match Brutalist outline style",
      repo: "fossasia/voxbento",
      prNumber: 395,
      url: "https://github.com/fossasia/voxbento/pull/395",
      status: "Merged",
      description:
        "Restyled the Logout action in the homepage header navbar from a plain text link into a responsive Neo-Brutalist outline button matching adjacent dashboard controls.",
      technologies: ["HTML", "CSS", "UI/UX", "Neo-Brutalism"],
    },
    {
      title: "Refactor(activity): Remove redundant Touch.enable call",
      repo: "sugarlabs/musicblocks",
      prNumber: 8126,
      url: "https://github.com/sugarlabs/musicblocks/pull/8126",
      status: "Merged",
      description:
        "Cleaned up redundant touch initialization on the stage instance in EaselJS/CreateJS canvas rendering loop, optimizing event handler registration without breaking mobile interactions.",
      technologies: ["JavaScript", "EaselJS", "Performance", "Refactoring"],
    },
  ] as OpenSourceContribution[],
  github: {
    username: "iamjahnvi",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;
