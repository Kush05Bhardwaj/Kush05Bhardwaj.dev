"use client"

import { User, Send } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  type: 'user' | 'assistant'
  content: string
}

export default function About() {
  const [userInput, setUserInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { type: 'assistant', content: 'Want to know more about me? Ask away 👇' }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const knowledgeBase: Record<string, string> = {
    "who are you": "I'm Kushagra Bhardwaj, a Full Stack Developer from Gurgaon, India. I'm passionate about building web applications and solving real-world problems with code!",
    "what tech do you use": "I work with React, Next.js, Node.js, TypeScript, JavaScript, Tailwind CSS, MongoDB, Python, and more. Always learning new technologies!",
    "tech stack": "My main tech stack includes React, Next.js, Node.js, TypeScript, Tailwind CSS, and MongoDB. I also work with Python for AI/ML projects.",
    "skills": "My skills include React, Next.js, Node.js, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, MongoDB, Python, Git & GitHub, AI Integration, and more!",
    "what projects": "I've built several projects including this portfolio, ECL Parcel (logistics website), Nexus (AI Assistant with Local LLM), and Artistry AI. Check out the projects section!",
    "projects": "I've worked on several projects including web development, AI/ML integrations, and logistics solutions. My best works are showcased in the projects section below!",
    "contact": "You can reach me at kush2012bhardwaj@gmail.com or connect with me on LinkedIn and GitHub. Let's build something amazing together!",
    "how to contact": "Email me at kush2012bhardwaj@gmail.com or find me on LinkedIn (linkedin.com/in/kush2012bhardwaj) and GitHub (github.com/Kush05Bhardwaj)!",
    "experience": "I have 1+ years of experience in web development. I've worked as a Web Dev Intern at Cognifyz Technologies and freelanced on Fiverr.",
    "education": "I'm currently pursuing B.Tech in Computer Science at KR Mangalam University (Aug 2024 - Present).",
    "interests": "I'm interested in AI, ML, Open Source, and exploring new technologies!",
    "location": "I'm based in Gurgaon, Haryana, India.",
    "goal": "My goal is to create amazing digital experiences that solve real problems and delight users. I love building things that make a difference!",
    "help": "You can ask me about: 'who are you', 'tech stack', 'projects', 'experience', 'contact', 'interests', 'education', or just say hi! 😊"
  }

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim()
    
    // Exact match first
    if (knowledgeBase[lowerInput]) {
      return knowledgeBase[lowerInput]
    }
    
    // Partial match
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerInput.includes(key) || key.includes(lowerInput)) {
        return value
      }
    }
    
    // Greetings
    if (lowerInput.match(/^(hi|hello|hey|sup|what's up)$/)) {
      return "Hey there! 👋 I'm Kush. Ask me anything about my work, skills, or projects!"
    }
    
    // Default response
    return "Hmm, I'm not sure about that. Try asking about 'tech stack', 'projects', 'experience', 'contact', or type 'help' for more options!"
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    const newUserMessage: Message = { type: 'user', content: userInput }
    setMessages(prev => [...prev, newUserMessage])
    setUserInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(userInput)
      const assistantMessage: Message = { type: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <section id="about" className="py-16">
      <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up">
        <User className="text-[#7b3fe4]" />
        <h2 className="text-3xl font-bold">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Me</span>
        </h2>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: "4+", label: "Projects Completed" },
          { value: "1+", label: "Years of Experience" },
          { value: "2+", label: "Happy Clients" },
          { value: "8+", label: "Technologies" },
        ].map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 text-center hover-lift rounded-lg"
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
          <div className="rounded-xl p-6 h-full border border-[#1e1b2f] backdrop-blur-sm bg-[#0a0612]/40">
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
                {["Game Development", "Web Development", "AI", "ML", "Open Source,", "and more..."].map((interest, i) => (
                  <span key={i} className="bg-[#1e1b2f] text-[#b799ff] px-3 py-1 rounded-full text-sm border border-[#7b3fe4]/20">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Code Editor / Chat */}
        <div className="lg:col-span-3">
          <div className="rounded-xl overflow-hidden h-full border border-[#1e1b2f] backdrop-blur-sm bg-[#0a0612]/40">
            {/* Code editor header */}
            <div className="bg-[#1e1b2f] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#7b3fe4]/30"></div>
                <div className="w-3 h-3 rounded-full bg-[#7b3fe4]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#7b3fe4]/70"></div>
              </div>
              <div className="text-sm text-[#a5a5c8] ml-2">about.js</div>
            </div>

            {/* Chat Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[#0a0612]/60">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-[#7b3fe4] text-white'
                        : 'bg-[#1e1b2f] text-[#e9e9f5] border border-[#7b3fe4]/20'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#7b3fe4]">➜</span>
                        <span className="text-xs text-[#b799ff]">Kush</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1e1b2f] text-[#e9e9f5] border border-[#7b3fe4]/20 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#7b3fe4]">➜</span>
                      <span className="text-xs text-[#b799ff]">Kush</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="w-2 h-2 bg-[#7b3fe4] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#7b3fe4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-[#7b3fe4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Input */}
            <div className="bg-black p-4 border-t border-[#1e1b2f]">
              <div className="flex items-center gap-2">
                <span className="text-[#b799ff]">➜</span>
                <span className="text-[#7b3fe4]">~</span>
                <Input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything... (e.g., 'tech stack', 'projects', 'contact')"
                  className="flex-1 bg-transparent border-none text-[#e9e9f5] placeholder:text-[#a5a5c8]/50 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-[#7b3fe4] hover:bg-[#6b2fd4] text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
