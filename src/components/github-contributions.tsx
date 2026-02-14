"use client"

import { Activity } from "lucide-react"

export default function GitHubContributions() {
  const githubUsername = "Kush05Bhardwaj" // Replace with your GitHub username

  return (
    <section id="github-activity" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12">
        <Activity className="text-white" />
        <h2 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            GitHub Activity
          </span>
        </h2>
      </div>

      <div className="flex flex-col items-center">
        {/* GitHub Contribution Graph */}
        <div className="w-full max-w-5xl bg-zinc-900/30 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View on GitHub →
            </a>
          </div>
          
          {/* GitHub Contribution Chart */}
          <div className="w-full overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt="GitHub Contribution Chart"
              className="w-full rounded-lg"
              style={{ 
                filter: 'invert(1) hue-rotate(180deg) brightness(0.9)',
                minWidth: '700px'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
