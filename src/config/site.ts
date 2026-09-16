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
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
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
  name: "Anurag Jha",
  firstName: "Anurag",
  url: "https://anuragdotdev.vercel.app",
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
  email: "conveytoanurag@gmail.com",
  greeting: "Hey, I'm Anurag",
  tagline: "I build clean, modern websites and web apps where design, functionality, and even the smallest details matter.",
  about: [
    "Hey, I'm Anurag, a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.",
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
    nowBuilding: "DoodleDash",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/nodeanurag",
    twitter: "https://x.com/anuragdotdev",
    linkedin: "https://linkedin.com/in/nodeanurag",
    email: "mailto:conveytoanurag@gmail.com",
    resume: "",
    discord: "https://discord.gg/ra4kyKdTk",
    medium: "https://medium.com/@anuragdotdev",
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
      title: "FrameLabs",
      blurb:
        "A creative tool that turns static card generation into a reactive, real-time design experience. Users can switch between retro palettes and layouts on the fly, with zero jank—because every state transition is memoized and component-driven.",
      story:
        "The frontend is built with React's compositional model, styled atomically with Tailwind CSS, and powered by Zustand for predictable, lean state management. Icons from lucide-react keep the UI crisp and accessible. The result: a minimal surface area with a maximal creative ceiling.\n\n*Designed for speed • Engineered for feel.*",
      stack: ["React.js", "Tailwind CSS", "Zustand", "lucide-react"],
      year: "2026",
      links: {
        live: "https://framelabs.vercel.app/",
        source: "https://github.com/nodeanurag/FrameLabs",
      },
      featured: true,
      image: "/project-images/framelabs.png",
      categories: ["Frontend"],
    },
    {
      title: "DoodleDash",
      blurb:
        "A real-time multiplayer drawing and guessing game (Skribbl.io clone) built as a TypeScript monorepo with absolute dimension-independent drawing synchronization.",
      story:
        "Engineered using Socket.IO WebSockets for bidirectional event mapping. Features a zero-trust server validation engine (timers, guessing logic, turn loops managed strictly on the server), spectator rooms, and a custom canvas-to-image engine for client-side PNG sharing. Strikethroughs and drawing vectors are normalized to relative coordinates to ensure cross-device consistency.",
      stack: ["React.js", "Node.js", "Socket.IO", "TypeScript", "Tailwind CSS v4", "Zustand"],
      year: "2026",
      links: {
        live: "https://doodledash.pages.dev/",
        source: "https://github.com/nodeanurag/DoodleDash",
      },
      featured: true,
      image: "/project-images/doodledash.png",
      categories: ["Fullstack", "Backend"],
    },
    {
      title: "CodeForge",
      blurb:
        "A local-first browser-based IDE offering full Monaco editing, in-browser code execution for JS/Python/TS, sandboxed previews, and IndexedDB workspace persistence.",
      story:
        "Engineered to run entirely client-side without servers. Integrates Monaco Editor models with dynamic Web Workers and Pyodide runtimes. Features resizable panel split layouts, instant sandboxed iframe live-previews for web files, Dexie-powered IndexedDB database state management, workspace-wide text search, and URL-encoded code snippets sharing.",
      stack: ["React.js", "Vite", "Zustand", "Monaco Editor", "Pyodide", "Dexie.js"],
      year: "2026",
      links: {
        source: "https://github.com/nodeanurag/codeforge",
      },
      featured: true,
      status: "In Progress",
      image: "/project-images/codeforge.png",
      categories: ["Frontend"],
    },
    {
      title: "SwiftPoll",
      blurb:
        "A real-time anonymous polling application built for maximum creation and voting speed without user registration friction.",
      story:
        "Uses Supabase Realtime DB and server actions for lightning-fast voting updates and creator actions. Features browser-stored secret admin tokens for accountless close/delete operations, server-side IP hashing spam de-duplication, full keyboard accessibility, and optimistic client voting counts.",
      stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS v4", "Zod", "Vitest"],
      year: "2026",
      links: {
        source: "https://github.com/nodeanurag/swiftpoll",
      },
      featured: false,
      image: "/project-images/swiftpoll.png",
      categories: ["Fullstack"],
    },
    {
      title: "Nexus",
      blurb:
        "A workspace-based project management app featuring kanban boards, real-time activity tracking, nodemailer notifications, and robust team collaboration.",
      story:
        "Built to mimic enterprise collaboration canvases. Employs Next-Auth for role-based authentication, TanStack Query for caching and server synchronization, Recharts for team productivity insights, and @dnd-kit for seamless drag-and-drop workflow task transitions. Backed by a clean PostgreSQL database schema via Prisma.",
      stack: ["Next.js", "Prisma", "PostgreSQL", "React Query", "@dnd-kit", "Next-Auth"],
      year: "2026",
      links: {
        source: "https://github.com/nodeanurag/nexus",
      },
      featured: false,
      image: "/project-images/nexus.png",
      categories: ["Fullstack", "Backend"],
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
      url: "https://medium.com/@anuragdotdev/authentication-authorization-for-backend-engineers-a-complete-guide-f8844e97bddf?sharedUserId=anuragdotdev",
    },
    {
      title: "Serialization and Deserialization: The Universal Language of Backend Engineering",
      summary: "A deep dive into serialization formats from JSON and XML to Protocol Buffers, exploring schema validation, backward compatibility, and network serialization bottlenecks.",
      date: "Aug 29, 2026",
      readingTime: "14 min read",
      url: "https://medium.com/@anuragdotdev/serialization-and-deserialization-the-universal-language-of-backend-engineering-8df8ce03d257",
    },
    {
      title: "The Ultimate Guide to Routing: From Network Packets to Backend Handlers",
      summary: "A comprehensive exploration of routing across layers, tracing IP packets, hardware routing tables, HTTP multiplexing, and frontend routers.",
      date: "Aug 26, 2026",
      readingTime: "20 min read",
      url: "https://medium.com/@anuragdotdev/the-ultimate-guide-to-routing-from-network-packets-to-backend-handlers-64cc4f7fdbfa",
    },
    {
      title: "Understanding HTTP: The Backbone of the Web",
      summary: "A deep dive into the Hypertext Transfer Protocol, exploring header lifecycle, request methods, statelessness, and connection optimization from HTTP/1.1 to HTTP/3.",
      date: "Aug 22, 2026",
      readingTime: "15 min read",
      url: "https://medium.com/@anuragdotdev/understanding-http-the-backbone-of-the-web-3d2109d0facd",
    },
    {
      title: "API Rate Limiting: I thought it was just counting requests...",
      summary: "An analysis of rate limiting algorithms from Token Bucket to Sliding Window logs, detailing how distributed systems protect API infrastructure under load.",
      date: "Jul 12, 2026",
      readingTime: "14 min read",
      url: "https://medium.com/@anuragdotdev/api-rate-limiting-i-thought-it-was-just-counting-requests-682cefa2f56c",
    },
    {
      title: "The JWT Storage Debate is Over: Here's the Production-Grade Architecture Your App Actually Needs",
      summary: "A definitive guide to JWT storage in frontend applications, detailing why standard localStorage fails and how to implement secure memory-session architecture with HTTP-only cookies.",
      date: "Jun 24, 2026",
      readingTime: "8 min read",
      url: "https://medium.com/@anuragdotdev/the-jwt-storage-debate-is-over-heres-the-production-grade-architecture-your-app-actually-needs-9ab284da065f",
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
    username: "nodeanurag",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;
