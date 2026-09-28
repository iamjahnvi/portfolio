# Jahnvi — Portfolio

A high-performance, responsive, and aesthetically premium personal portfolio built with React, Vite, Tailwind CSS, and TypeScript. Inspired by minimalist retro terminal grids and modern typographic grids.

## Tech Stack

- **Core & Routing:** [React 18](https://react.dev/) & [React Router v6](https://reactrouter.com/)
- **Build Tool:** [Vite 6](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom premium fonts (`Amiamie` & `Instrument Serif`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, interactive hover events, and layout entries
- **Analytics:** [@vercel/analytics](https://vercel.com/docs/analytics) for real-time web traffic insights
- **Icons:** [@iconify/react](https://iconify.design/) (official brand SVG assets) & [lucide-react](https://lucide.dev/)

## Features

- **Typographic & CRT Grid Design:** Sleek retro layout system using dashed alignment columns, custom serif layouts, scanline overlays, and grayscale images.
- **Search Command Palette (`⌘K` / `Ctrl+K`):** Dynamic keyboard-accessible command menu with shortcuts to jump directly to page sections, external socials, or toggle themes.
- **Interactive GitHub Contributions Matrix:** Asynchronous heatmap fetching live contribution levels directly from the GitHub API using a custom React hook, displayed in a responsive 7-row calendar grid.
- **Fading Quotes Rotator:** An interactive inspiration panel in the footer cycling through selected quotes (Steve Jobs, Elon Musk, Luffy, Naruto, Zuckerberg) with custom fading transitions.
- **Konami Code Easter Egg:** Listening for classic trigger keys ("jahnvi" or the classic Konami sequence) to activate interactive falling confetti achievements.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Customization

To customize the content of the portfolio (such as titles, biography details, social URLs, or technical blog posts), modify the central configuration file:
* [src/config/site.ts](file:///d:/D%20drive/1/videos/movie/1.dev/Cohort%203.0/WEB%20DEV/cohort-3%20codes/projects/my-portfolio-github/my-portfolio/src/config/site.ts)

## Chat

The `/chat` page has no server-side chat service. Sending a note opens the visitor's email app with a message addressed to the portfolio inbox; no message is stored or sent by the site itself.
