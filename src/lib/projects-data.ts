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
    shortDescription: "A local AI companion combining LLMs, voice, vision, memory and safe desktop automation.",
    images: ["/Kush05BhardwajAlisa.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/Nexus-Alisa-AI-Assistant",
    technologies: ["python", "LLM", "opencv", "sqlite"],
  },
  {
    id: "2",
    title: "AIris Security",
    shortDescription: "A full-stack security platform combining automated vulnerability scanning with machine-learning based risk assessment.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner",
    technologies: ["python", "fastapi", "ml", "nextjs"],
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
    shortDescription: "ECL Parcel is a logistics and parcel tracking website offering services like shipment tracking, contact forms, and information about various shipping methods.",
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
