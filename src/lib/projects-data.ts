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
  mongodb: "MongoDB",
  nodejs: "Node.js",
  python: "Python",
  ml: "ML",
  LLM: "LLM",
  opencv: "OpenCV",
  AI: "AI",
  flask: "Flask",
  fastapi: "FastAPI",
}

export const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Alisa — AI Assistant",
    shortDescription: "A local AI companion with voice, vision & memory. Runs entirely offline using LLMs and OpenCV.",
    images: ["/Kush05BhardwajAlisa.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/Nexus-Alisa-AI-Assistant",
    technologies: ["python", "LLM", "opencv", "AI", "ml"],
  },
  {
    id: "2",
    title: "AIris Security",
    shortDescription: "AI-powered vulnerability scanner — runs Nmap, Nikto, SSLScan & DirSearch in parallel, scores risk with a hybrid ML engine, and generates PDF reports.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner",
    technologies: ["python", "nextjs", "fastapi", "ml", "mongodb"],
  },
  {
    id: "3",
    title: "Artistry",
    shortDescription: "Artistry AI Redesign — an AI-enhanced creative platform with a modern UI.",
    images: ["/Artistry.jpg"],
    liveUrl: "https://artistry-six.vercel.app",
    technologies: ["js", "react", "ts", "tailwindcss", "python", "LLM"],
  },
  {
    id: "4",
    title: "Personal Portfolio",
    shortDescription: "This site — built with Next.js, Tailwind CSS, and MongoDB. Fully custom design with admin panel.",
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
    shortDescription: "AI-powered stock price prediction platform using ML models (Linear Regression, Random Forest, XGBoost, LSTM) with real-time data & sentiment analysis.",
    images: [],
    githubUrl: "https://github.com/Kush05Bhardwaj/Stocksense-AI",
    technologies: ["python", "react", "flask", "ml", "LLM"],
  },
  {
    id: "6",
    title: "Goonify",
    shortDescription: "A Spotify-Style Music App with Personal Touches",
    images: ["/goonify.png"],
    liveUrl: "https://goonify-kindoff-spotify-clone.vercel.app",
    technologies: ["js", "react", "ts", "tailwindcss", "nextjs", "nodejs"],
  },
  {
    id: "7",
    title: "ECL Parcel",
    shortDescription: "Logistics Website",
    images: ["/ecl.png"],
    liveUrl: "https://www.eclparcel.in",
    technologies: ["js", "react", "nextjs", "tailwindcss"],
  },
  {
    id: "8",
    title: "Python Scripts Collection",
    shortDescription: "A bunch of random Python stuff that somehow works.",
    images: ["/Kush05Bhardwajpython-scripts1.png"],
    githubUrl: "https://github.com/Kush05Bhardwaj/python-scripts",
    technologies: ["python"],
  },
]
