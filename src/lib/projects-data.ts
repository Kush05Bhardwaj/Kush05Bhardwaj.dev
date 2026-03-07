export type Project = {
  id: string
  title: string
  shortDescription: string
  images: string[]
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
}

export const techLabel: Record<string, string> = {
  js: "JavaScript",
  react: "React",
  ts: "TypeScript",
  nextjs: "Next.js",
  tailwindcss: "Tailwind",
  shadcn: "shadcn/ui",
  lucide: "Lucide React",
  mongodb: "MongoDB",
  nodejs: "Node.js",
  express: "Express.js",
  python: "Python",
  ml: "ML",
  LLM: "LLM",
  opencv: "OpenCV",
  AI: "AI",
  flask: "Flask",
  fastapi: "FastAPI",
  sqlite: "SQLite",
  framer: "Framer Motion",
  recharts: "Recharts",
  spotify: "Spotify API",
}

export const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Alisa — AI Desktop Companion",
    shortDescription: "Fully local AI companion with animated avatar, voice I/O, webcam presence detection, desktop automation, and adaptive habit learning. Runs 100% offline.",
    images: ["/Kush05BhardwajAlisa.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/Nexus-Alisa-AI-Assistant",
    technologies: ["python", "LLM", "opencv", "fastapi", "sqlite"],
  },
  {
    id: "2",
    title: "AIris Security",
    shortDescription: "AI-powered vulnerability scanner — runs Nmap, Nikto, SSLScan & DirSearch in parallel, scores risk with a hybrid ML engine (Random Forest + NLP), and generates PDF reports with remediation advice.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner",
    technologies: ["python", "nextjs", "fastapi", "ml", "mongodb"],
  },
  {
    id: "3",
    title: "Artistry",
    shortDescription: "AI-powered interior design platform. Upload a room photo and an LLM-driven pipeline segments walls, detects objects, and renders AI-redesigned visuals using diffusion models.",
    images: ["/Artistry.jpg"],
    liveUrl: "https://artistry-six.vercel.app",
    githubUrl: "https://github.com/Kush05Bhardwaj/Artistry-MVP",
    technologies: ["python", "LLM", "AI", "ml"],
  },
  {
    id: "4",
    title: "Personal Portfolio",
    shortDescription: "This site — built with Next.js, Tailwind CSS, and MongoDB. Fully custom design with animated starry background, admin panel, and dynamic content.",
    images: ["/cv.png"],
    liveUrl: "https://kush05bhardwaj.vercel.app/",
    githubUrl: "https://github.com/Kush05Bhardwaj/Kush05Bhardwaj.dev",
    technologies: ["nextjs", "ts", "tailwindcss", "mongodb"],
  },
]

export const otherProjects: Project[] = [
  {
    id: "5",
    title: "StockSense AI",
    shortDescription: "AI-powered stock price prediction platform using 4 ML models (Linear Regression, Random Forest, XGBoost, LSTM) with real-time Yahoo Finance data, news sentiment analysis, and interactive charts.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/Stocksense-AI",
    technologies: ["python", "react", "flask", "ml", "LLM"],
  },
  {
    id: "6",
    title: "Goonify",
    shortDescription: "Full-stack music discovery app with glassmorphism UI. Integrates Spotify, Last.fm & Genius APIs for top tracks, real-time lyrics, AI recommendations, and in-browser playback.",
    images: ["/goonify.png"],
    liveUrl: "https://goonify-kindoff-spotify-clone.vercel.app",
    githubUrl: "https://github.com/Kush05Bhardwaj/Goonify_Spotify_Clone",
    technologies: ["nextjs", "ts", "tailwindcss", "nodejs", "express", "spotify"],
  },
  {
    id: "7",
    title: "ECL Parcel",
    shortDescription: "Professional logistics & courier services website with a clean modern UI.",
    images: ["/ecl.png"],
    liveUrl: "https://www.eclparcel.in",
    technologies: ["nextjs", "react", "tailwindcss", "shadcn", "lucide"],
  },
  {
    id: "8",
    title: "Python Scripts Collection",
    shortDescription: "A personal collection of automation tools, utility scripts, and quick experiments — AudioBook converter, download organizer, system cleaner, and more.",
    images: ["/Kush05Bhardwajpython-scripts1.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/python-scripts",
    technologies: ["python"],
  },
]
