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
    "/profile2.png",
  ],
  bannerImage: "/banner.png",
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
    nowBuilding: "DoodleDash",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/nodejahnvi",
    twitter: "https://x.com/jahnvidotdev",
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
      title: "FrameLabs",
      blurb:
        "A creative tool that turns static card generation into a reactive, real-time design experience. Users can switch between retro palettes and layouts on the fly, with zero jank—because every state transition is memoized and component-driven.",
      story:
        "The frontend is built with React's compositional model, styled atomically with Tailwind CSS, and powered by Zustand for predictable, lean state management. Icons from lucide-react keep the UI crisp and accessible. The result: a minimal surface area with a maximal creative ceiling.\n\n*Designed for speed \u2022 Engineered for feel.*",
      stack: ["React.js", "Tailwind CSS", "Zustand", "lucide-react"],
      year: "2026",
      links: {
        live: "https://framelabs.vercel.app/",
        source: "https://github.com/nodejahnvi/FrameLabs",
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
        source: "https://github.com/nodejahnvi/DoodleDash",
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
        source: "https://github.com/nodejahnvi/codeforge",
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
        source: "https://github.com/nodejahnvi/swiftpoll",
      },
      featured: false,
      status: "In Progress",
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
        source: "https://github.com/nodejahnvi/nexus",
      },
      featured: false,
      status: "In Progress",
      image: "/project-images/nexus.png",
      categories: ["Fullstack", "Backend"],
    },
    {
      title: "AlumniConnect",
      blurb:
        "A white-label, production-ready alumni newsletter builder built entirely on @unlayer/react-email-editor.",
      story:
        "One React application renders a custom email client simulator, a responsive web portal, and a print-tuned PDF engine — and exports straight to Unlayer design JSON. It features a drag-and-drop editor canvas, live client simulator preview, and exports to Email-safe HTML, Dynamic JSON Layout, and A4 PDF Document.",
      stack: ["React.js", "Unlayer", "TypeScript", "Tailwind CSS"],
      year: "2026",
      links: {
        source: "https://github.com/nodejahnvi/alumniconnect",
      },
      featured: false,
      image: "/project-images/alumniconnect.png",
      categories: ["Frontend"],
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
  writing: [] as Post[],
  github: {
    username: "nodejahnvi",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork "
} as const;

export type Site = typeof site;
