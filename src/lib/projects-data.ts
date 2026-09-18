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
  cv: "Computer Vision",
  uiux: "UI/UX",
  mediapipe: "MediaPipe",
  socketio: "Socket.io",
  api: "API Integration",
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
  {
    id: "3",
    title: "Artistry",
    shortDescription: "AI-powered interior/home redesign platform.",
    images: ["/Artistry.jpg"],
    liveUrl: "https://artistry-six.vercel.app",
    githubUrl: "https://github.com/Kush05Bhardwaj/Artistry-MVP",
    technologies: ["nextjs", "AI", "cv", "uiux"],
  },
  {
    id: "4",
    title: "ECL",
    shortDescription: "A web application built around parcel logistics and shipment tracking workflows.",
    images: ["/ecl.png"],
    liveUrl: "https://www.eclparcel.in",
    technologies: ["nextjs", "ts", "api"],
  },
]

export const otherProjects: Project[] = [
  {
    id: "5",
    title: "StockSense AI",
    shortDescription: "AI-powered stock price prediction platform using 4 ML models with real-time Yahoo Finance data, news sentiment analysis, and interactive charts.",
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
    title: "Notes Finder",
    shortDescription: "A platform for students to find and share notes, study materials, and academic resources.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/notes-finder",
    technologies: ["nextjs", "react", "tailwindcss", "mongodb"],
  },
  {
    id: "8",
    title: "DevTrack",
    shortDescription: "A developer productivity tool for tracking coding sessions, managing tasks, and monitoring progress.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/devtrack",
    technologies: ["nextjs", "ts", "tailwindcss", "mongodb"],
  },
  {
    id: "9",
    title: "CodeColab",
    shortDescription: "Real-time collaborative code editor with syntax highlighting, multi-cursor support, and instant synchronization.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/codecolab",
    technologies: ["react", "nodejs", "socketio", "mongodb"],
  },
  {
    id: "10",
    title: "Virtual Mouse",
    shortDescription: "Hand gesture controlled virtual mouse using computer vision for hands-free computer interaction.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/virtual-mouse",
    technologies: ["python", "opencv", "mediapipe"],
  },
  {
    id: "11",
    title: "Python Scripts Collection",
    shortDescription: "A personal collection of automation tools, utility scripts, and quick experiments — AudioBook converter, download organizer, system cleaner, and more.",
    images: ["/Kush05Bhardwajpython-scripts1.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/python-scripts",
    technologies: ["python"],
  },
]
