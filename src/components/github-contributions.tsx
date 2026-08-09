"use client"

import SectionHeader from "@/components/section-header"
import { ArrowUpRight } from "lucide-react"

export default function GitHubContributions() {
  const githubUsername = "Kush05Bhardwaj"

  return (
    <section id="github-activity">
      <SectionHeader
        number="03"
        label="PROOF OF WORK"
        title="GitHub Activity"
        description="Consistent building, experimenting, and shipping."
        aside="OPEN SOURCE"
      />

      <div className="max-w-5xl">
        {/* Contribution chart */}
        <div className="w-full overflow-x-auto border border-border/40 rounded-lg p-4 sm:p-6">
          <img
            src={`https://ghchart.rshah.org/${githubUsername}`}
            alt="GitHub Contribution Chart"
            className="w-full rounded"
            style={{
              filter: "invert(1) hue-rotate(180deg) brightness(0.9)",
              minWidth: "600px",
            }}
          />
        </div>

        {/* Footer link */}
        <div className="mt-4 flex justify-end">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link inline-flex items-center gap-1.5 font-mono text-xs tracking-[.12em] text-muted-foreground hover:text-foreground transition-colors"
          >
            VIEW PROFILE <ArrowUpRight className="link-arrow h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
