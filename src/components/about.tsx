"use client"

import SectionHeader from "@/components/section-header"
import { Send, Terminal } from "lucide-react"
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
    { type: 'system',    content: 'Kush05Bhardwaj Terminal v1.0.2' },
    { type: 'system',    content: 'Type "help" for available commands.' },
    { type: 'assistant', content: 'Want to know more about me? Ask away 👇' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const terminalRef   = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  const scrollToBottom = () => {
    if (terminalRef.current && !isInitialMount.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }
  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return }
    scrollToBottom()
  }, [messages])

  const knowledgeBase: Record<string, string> = {
    "whoami":       "kushagra_bhardwaj\nAspiring AI Engineer | MERN Stack Developer\nLocation: Gurgaon, Haryana, India\nEducation: B.Tech in Computer Science @ KR Mangalam University",
    "ls skills":    "Python\nReact.js\nNode.js\nTypeScript\nJavaScript\nTailwind CSS\nMongoDB\nGit & GitHub\nAI Integration (LLMs, APIs)",
    "cat projects": "1. Alisa — AI Desktop Companion\n2. AIris Security — AI vulnerability scanner\n3. Artistry — AI interior design platform\n4. Personal Portfolio\n\n💡 Use: cd projects - to see more details\n🔗 View all: github.com/Kush05Bhardwaj?tab=repositories",
    "cd projects":  "📁 Projects Directory:\n├── alisa/             (Python, LLM, FastAPI, SQLite)\n├── airis-security/   (Python, Next.js, ML)\n├── artistry/          (Python, React, LLM)\n└── portfolio/         (Next.js, TypeScript, MongoDB)\n\n🔗 github.com/Kush05Bhardwaj?tab=repositories",
    "cat experience":"🏢 Work Experience:\n\n[Open Source Community]\n├── Role: Contributor\n└── Period: Dec 2025 – Present\n\n[ELite Coders WoC '26]\n├── Role: Contributor\n└── Period: Jan – Feb 2026\n\n[Cognifyz Technologies]\n├── Role: Web Developer Intern\n└── Period: May – Jun 2025\n\n[Fiverr]\n├── Role: Freelancer\n└── Period: Apr 2024 – Present",
    "cat contact":  "📬 Contact Information:\n\nEmail:    kush2012bhardwaj@gmail.com\nPhone:    +91 7428690322\nLinkedIn: linkedin.com/in/kush2012bhardwaj\nGitHub:   github.com/Kush05Bhardwaj",
    "cat about":    "👨‍💻 About Me:\n\nB.Tech CS & Engineering student @ K.R. Mangalam University\nFocused on AI/ML, software engineering, and intelligent systems.\n\nInterests:\n• AI / ML · LLMs · AI Assistants\n• Software Engineering\n• Linux · Open Source",
    "help":         "Available Commands:\n\n📌 Information:\n  whoami          - Display user info\n  cat about       - About me\n  cat contact     - Contact info\n\n📁 Navigation:\n  ls skills       - List skills\n  cat projects    - View projects\n  cd projects     - Browse project directory\n  cat experience  - Work experience\n\n💡 Utility:\n  clear           - Clear terminal\n  help            - This message\n\n💬 Natural language also works!"
  }

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim()
    if (lowerInput === 'clear') return '__CLEAR__'
    if (knowledgeBase[lowerInput]) return knowledgeBase[lowerInput]
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerInput.includes(key) || key.includes(lowerInput)) return value
    }
    if (lowerInput.includes('tech') || lowerInput.includes('skill') || lowerInput.includes('stack')) return knowledgeBase["ls skills"]
    if (lowerInput.includes('project')) return knowledgeBase["cat projects"]
    if (lowerInput.includes('experience') || lowerInput.includes('work')) return knowledgeBase["cat experience"]
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) return knowledgeBase["cat contact"]
    if (lowerInput.includes('who') || lowerInput.includes('about')) return knowledgeBase["cat about"]
    if (lowerInput.match(/^(hi|hello|hey|sup|what's up)$/)) return "Hey there! 👋\nI'm Kush. Type 'help' to see available commands."
    return `Command not found: ${input}\nType 'help' for available commands.`
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return
    const command = userInput.trim()
    setMessages(prev => [...prev, { type: 'user', content: command, command }])
    setCommandHistory(prev => [...prev, command])
    setHistoryIndex(-1)
    setUserInput("")
    setIsTyping(true)
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
      setMessages(prev => [...prev, { type: 'assistant', content: response }])
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
    <section id="about" className="py-10">
      <SectionHeader number="01" label="ABOUT" title="About Me" description="AI/ML · Software Engineering · LLMs · Building practical systems" aside="INDIA / 2026" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Bio column */}
        <div className="lg:col-span-2">
          <div className="about-copy pr-0 lg:pr-6 h-full">
            <h3 className="text-base font-semibold mb-3 text-foreground">Who am I?</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed text-sm sm:text-base">
              I&apos;m a B.Tech Computer Science & Engineering student at K.R. Mangalam University, focused on AI/ML, software engineering, and understanding how intelligent systems work under the hood.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
              I&apos;ve worked on web applications, AI-powered tools, developer utilities, and open-source projects, including freelance work and an internship at Cognifyz Technologies. I&apos;m currently exploring Machine Learning, Deep Learning, LLMs, Linux, and scalable software systems.
            </p>
            <div className="mt-5 pt-5 border-t border-border/40">
              <p className="font-mono text-[.65rem] tracking-[.14em] text-muted-foreground mb-2">INTERESTS</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI / ML · LLMs · AI Assistants · Software Engineering · Linux · Open Source
              </p>
            </div>
          </div>
        </div>

        {/* Terminal column */}
        <div className="lg:col-span-3">
          <div className="rounded-xl overflow-hidden border border-[#1a1a1a] bg-black/90 font-mono shadow-2xl group transition-all duration-500 hover:shadow-lg hover:shadow-[#ffffff]/10">
            {/* Terminal header */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"/>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"/>
                </div>
                <Terminal className="w-4 h-4 text-[#888] ml-2" />
                <span className="text-xs text-[#888]">kush05bhardwaj@portfolio:~</span>
              </div>
              <div className="text-xs text-[#666]">bash</div>
            </div>

            {/* Messages */}
            <div
              ref={terminalRef}
              className="h-[320px] overflow-y-auto p-4 space-y-2 bg-black/95"
            >
              {messages.map((message, index) => (
                <div key={index} className="font-mono text-sm">
                  {message.type === 'system' && (
                    <div className="text-[#666] italic">{message.content}</div>
                  )}
                  {message.type === 'user' && (
                    <div className="flex items-start gap-2">
                      <span className="text-[#27c93f] select-none">➜</span>
                      <span className="text-[#ffffff] select-none">~</span>
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
                  <span className="text-[#ffffff]">●</span>
                  <span className="text-[#666] text-sm">typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-black border-t border-[#333] p-3">
              <div className="flex items-center gap-2">
                <span className="text-[#27c93f] select-none">➜</span>
                <span className="text-[#ffffff] select-none">~</span>
                <Input
                  type="text"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a command or question..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-[#666] focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm p-0 h-auto"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="w-8 h-8 rounded-md bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#a5a5c8] hover:text-[#ffffff] hover:border-[#ffffff]/30 transition-all duration-300"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-[#666] text-xs mt-2">
                Try:{" "}
                <span className="text-[#ffffff] cursor-pointer hover:underline" onClick={() => setUserInput('help')}>help</span>,{" "}
                <span className="text-[#ffffff] cursor-pointer hover:underline" onClick={() => setUserInput('whoami')}>whoami</span>,{" "}
                <span className="text-[#ffffff] cursor-pointer hover:underline" onClick={() => setUserInput('ls skills')}>ls skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
