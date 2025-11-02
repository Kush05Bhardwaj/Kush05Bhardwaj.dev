"use client"

import { User, Send, Terminal } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  type: 'user' | 'assistant' | 'system'
  content: string
  command?: string
}

export default function About() {
  const [userInput, setUserInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { type: 'system', content: 'Kush05Bhardwaj Terminal v1.0.0 (Gurgaon, India)' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'assistant', content: 'Want to know more about me? Ask away 👇' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  const scrollToBottom = () => {
    if (terminalRef.current && !isInitialMount.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Skip scroll on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    scrollToBottom()
  }, [messages])

  const knowledgeBase: Record<string, string> = {
    "whoami": "kushagra_bhardwaj\nAspiring AI Engineer | MERN Stack Developer\nLocation: Gurgaon, Haryana, India\nEducation: B.Tech in Computer Science @ KR Mangalam University",
    "ls skills": "Python\nReact.js\nNode.js\nTypeScript\nJavaScript\nTailwind CSS\nMongoDB\nGit & GitHub\nAI Integration (LLMs, APIs)",
    "cat projects": "1. Personal Portfolio - Modern portfolio website\n2. ECL Parcel - Logistics website solution\n3. Nexus - Personal AI Assistant with Local LLM\n4. Artistry - AI-powered home redesign tool\n\n💡 Use: cd projects - to see more details\n🔗 View all projects: github.com/Kush05Bhardwaj?tab=repositories",
    "cd projects": "📁 Projects Directory:\n├── portfolio/          (Next.js, TypeScript, Tailwind)\n├── ecl-parcel/        (Next.js, React, Production)\n├── nexus-ai/          (Python, AI/ML, LLM Integration)\n└── artistry/          (React, TypeScript, Python, LLM)\n\nType 'cat projects' for descriptions\n\n🔗 View all my projects on GitHub:\n   github.com/Kush05Bhardwaj?tab=repositories",
    "cat experience": "🏢 Work Experience:\n\n [Cognifyz Technologies]\n├─ Role: Web Developer Intern\n├─ Period: May 2025 - Present\n└─ Focus: Web Development, React, Node.js\n\n[Current] \n├─ Role: Freelancer\n├─ Period: Apr 2024 - Present\n└─ Services: Web Development & Design\n\n[Student-KR Mangalam University]\n├─ Degree: B.Tech Computer Science\n└─ Period: Aug 2024 - Present",
    "cat contact": "📧 Contact Information:\n\nEmail:    kush2012bhardwaj@gmail.com\nPhone:    +91 7428690322\nLinkedIn: linkedin.com/in/kush2012bhardwaj\nGitHub:   github.com/Kush05Bhardwaj",
    "cat about": "👨‍💻 About Me:\n\nI'm a B.Tech student passionate about coding and technology.\nI specialize in solving real-world problems using AI and web technologies.\nAlways exploring new technologies and industry trends.\n\nInterests:\n• Web Development  \n• Artificial Intelligence\n• Machine Learning\n• Open Source Contribution",
    "help": "Available Commands:\n\n📌 Information:\n  whoami          - Display user information\n  cat about       - Read about me\n  cat contact     - Show contact information\n  \n📁 Navigation:\n  ls skills       - List technical skills\n  cat projects    - View project list\n  cd projects     - Browse project directory\n  cat experience  - Display work experience\n  \n💡 Utility:\n  clear           - Clear terminal screen\n  help            - Show this help message\n  \n💬 Natural Language:\nYou can also ask questions naturally like:\n'What is your tech stack?', 'Tell me about your projects', etc."
  }

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim()
    
    // Handle clear command
    if (lowerInput === 'clear') {
      return '__CLEAR__'
    }
    
    // Command exact match
    if (knowledgeBase[lowerInput]) {
      return knowledgeBase[lowerInput]
    }
    
    // Partial command match
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerInput.includes(key) || key.includes(lowerInput)) {
        return value
      }
    }
    
    // Natural language parsing
    if (lowerInput.includes('tech') || lowerInput.includes('skill') || lowerInput.includes('stack')) {
      return knowledgeBase["ls skills"]
    }
    
    if (lowerInput.includes('project')) {
      return knowledgeBase["cat projects"]
    }
    
    if (lowerInput.includes('experience') || lowerInput.includes('work')) {
      return knowledgeBase["cat experience"]
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return knowledgeBase["cat contact"]
    }
    
    if (lowerInput.includes('who') || lowerInput.includes('about')) {
      return knowledgeBase["cat about"]
    }
    
    // Greetings
    if (lowerInput.match(/^(hi|hello|hey|sup|what's up)$/)) {
      return "Hey there! 👋\nI'm Kush. Type 'help' to see available commands."
    }
    
    // Default response
    return `Command not found: ${input}\nType 'help' for available commands.`
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    const command = userInput.trim()
    const newUserMessage: Message = { type: 'user', content: command, command: command }
    setMessages(prev => [...prev, newUserMessage])
    
    // Add to command history
    setCommandHistory(prev => [...prev, command])
    setHistoryIndex(-1)
    setUserInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(command)
      
      if (response === '__CLEAR__') {
        setMessages([
          { type: 'system', content: 'Kush Terminal v1.0.0 (Gurgaon, India)' },
          { type: 'system', content: 'Type "help" for available commands.' }
        ])
        setIsTyping(false)
        return
      }
      
      const assistantMessage: Message = { type: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 400)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setUserInput("")
      }
    }
  }

  return (
    <section id="about" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <Terminal className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Me</span>
        </h2>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: "8+", label: "Projects Completed" },
          { value: "1+", label: "Years of Experience" },
          { value: "2+", label: "Happy Clients" },
          { value: "10+", label: "Technologies" },
        ].map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 text-center rounded-lg group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] mb-2">{stat.value}</div>
            <div className="text-[#a5a5c8] text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        {/* Bio section */}
        <div className="lg:col-span-2">
          <div className="rounded-xl p-6 h-full border border-[#1e1b2f] backdrop-blur-sm bg-[#0a0612]/40 group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20">
            <h3 className="text-xl font-bold mb-4 text-[#7b3fe4]">Who am I?</h3>
            <p className="text-[#e9e9f5] mb-4">
              I'm a B.Tech student who likes coding and stuff. I specialize in solving real-world problems using AI and web technologies. 
              I always have an eye for new technologies and trends in the industry. 
            </p>
            <p className="text-[#e9e9f5] mb-4">
              With experience in web development, I've worked with a clients from startups to
              established businesses, helping them achieve their digital goals.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-[#e9e9f5] mb-2">My Interests:</h4>
              <div className="flex flex-wrap gap-2">
                {["Web Development", "AI", "ML", "Open Source,", "and more..."].map((interest, i) => (
                  <span key={i} className="bg-[#1e1b2f] text-[#b799ff] px-3 py-1 rounded-full text-sm border border-[#7b3fe4]/20 transition-all duration-300 hover:border-[#7b3fe4]/50 hover:bg-[#7b3fe4]/10">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CLI Terminal */}
        <div className="lg:col-span-3">
          <div className="rounded-xl overflow-hidden h-full border border-[#1e1b2f] backdrop-blur-sm bg-black/90 font-mono shadow-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20">
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 transition-all cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 transition-all cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 transition-all cursor-pointer"></div>
                </div>
                <Terminal className="w-4 h-4 text-[#7b3fe4] ml-2" />
                <span className="text-xs text-[#888]">kush@portfolio:~</span>
              </div>
              <div className="text-xs text-[#666]">bash</div>
            </div>

            {/* Terminal Messages Area */}
            <div 
              ref={terminalRef}
              className="h-[450px] overflow-y-auto p-4 space-y-2 bg-black/95 scrollbar-thin scrollbar-thumb-[#7b3fe4]/50 scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <div key={index} className="font-mono text-sm">
                  {message.type === 'system' && (
                    <div className="text-[#666] italic">
                      {message.content}
                    </div>
                  )}
                  
                  {message.type === 'user' && (
                    <div className="flex items-start gap-2">
                      <span className="text-[#27c93f] select-none">➜</span>
                      <span className="text-[#7b3fe4] select-none">~</span>
                      <span className="text-white">{message.content}</span>
                    </div>
                  )}
                  
                  {message.type === 'assistant' && (
                    <div className="mt-1 mb-2 whitespace-pre-wrap text-[#e9e9f5] leading-relaxed pl-4">
                      {message.content}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 pl-4">
                  <span className="text-[#7b3fe4]">●</span>
                  <span className="text-[#666] text-sm">typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Terminal Input */}
            <div className="bg-black border-t border-[#333] p-3">
              <div className="flex items-center gap-2">
                <span className="text-[#27c93f] select-none">➜</span>
                <span className="text-[#7b3fe4] select-none">~</span>
                <Input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a command or question..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-[#666] focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm p-0 h-auto"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-[#7b3fe4] hover:bg-[#6b2fd4] text-white transition-all duration-300 hover:scale-105"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-[#666] text-xs mt-2">
                Try: <span className="text-[#7b3fe4] cursor-pointer hover:underline" onClick={() => setUserInput('help')}>help</span>, <span className="text-[#7b3fe4] cursor-pointer hover:underline" onClick={() => setUserInput('whoami')}>whoami</span>, <span className="text-[#7b3fe4] cursor-pointer hover:underline" onClick={() => setUserInput('ls skills')}>ls skills</span>, or ask anything!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
