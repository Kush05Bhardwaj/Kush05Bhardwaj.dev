import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass-card py-6 mt-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-400">
          <p>© {new Date().getFullYear()} <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Kushagra Bhardwaj</span>. All rights reserved.</p>
        </div>
        
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="https://www.linkedin.com/in/kush2012bhardwaj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover-lift transition-all-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://github.com/Kush05Bhardwaj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-gray-300 hover:text-purple-400 hover-lift transition-all-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a href="https://x.com/Kush05Bhardwaj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-gray-300 hover:text-blue-400 hover-lift transition-all-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  )
} 