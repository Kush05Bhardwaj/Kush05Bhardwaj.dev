"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, ChangeEvent, FormEvent } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Thank you for your message! We will get back to you soon.' 
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.message || 'Something went wrong. Please try again.' 
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact us directly via email.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-8 sm:py-10">
      <div ref={ref} className={`text-center mb-8 sm:mb-12 reveal-on-scroll ${isVisible ? 'is-revealed' : ''}`}>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Get In Touch</span>
        </h2>
        <p className="mt-3 text-[#a5a5c8] max-w-2xl mx-auto">Let's collaborate on your next project or discuss opportunities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 rounded-xl overflow-hidden">
        {/* Contact Info Side */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 glass-card group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Let's Connect</h3>
          <p className="text-[#e9e9f5] mb-6 sm:mb-8">
            Feel free to reach out for collaborations, opportunities, or just to say hello. I'm always
            open to discussing new projects and ideas.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 transition-all duration-300 hover:translate-x-2">
              <div className="w-12 h-12 rounded-full bg-[#7b3fe4]/10 flex items-center justify-center text-[#7b3fe4] transition-all duration-300 hover:bg-[#7b3fe4]/20 hover:scale-110">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-[#a5a5c8]">Email</h4>
                <p className="text-[#7b3fe4] text-sm sm:text-base">kush2012bhardwaj@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 transition-all duration-300 hover:translate-x-2">
              <div className="w-12 h-12 rounded-full bg-[#b799ff]/10 flex items-center justify-center text-[#b799ff] transition-all duration-300 hover:bg-[#b799ff]/20 hover:scale-110">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-[#a5a5c8]">Phone</h4>
                <p className="text-[#b799ff] text-sm sm:text-base">+917428690322</p>
              </div>
            </div>

            <div className="flex items-center gap-4 transition-all duration-300 hover:translate-x-2">
              <div className="w-12 h-12 rounded-full bg-[#7b3fe4]/10 flex items-center justify-center text-[#7b3fe4] transition-all duration-300 hover:bg-[#7b3fe4]/20 hover:scale-110">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-[#a5a5c8]">Location</h4>
                <p className="text-[#7b3fe4] text-sm sm:text-base">Gurgaon, Haryana, India</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#1e1b2f]">
            <p className="text-[#a5a5c8] text-sm">Follow me on social media</p>
            <div className="flex gap-4 mt-3">
              <a href="https://www.linkedin.com/in/kush2012bhardwaj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/Kush05Bhardwaj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="https://x.com/Kush05Bhardwaj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 glass-card group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7b3fe4]/20">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">Send Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm text-[#a5a5c8] mb-1">Your Name</label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="bg-[#1e1b2f]/30 border-[#1e1b2f] focus:border-[#7b3fe4] focus:ring-[#7b3fe4]/20 transition-all duration-300 hover:border-[#7b3fe4]/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm text-[#a5a5c8] mb-1">Your Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="bg-[#1e1b2f]/30 border-[#1e1b2f] focus:border-[#7b3fe4] focus:ring-[#7b3fe4]/20 transition-all duration-300 hover:border-[#7b3fe4]/50"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-xs sm:text-sm text-[#a5a5c8] mb-1">Subject</label>
              <Input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder=""
                className="bg-[#1e1b2f]/30 border-[#1e1b2f] focus:border-[#7b3fe4] focus:ring-[#7b3fe4]/20 transition-all duration-300 hover:border-[#7b3fe4]/50"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm text-[#a5a5c8] mb-1">Message</label>
              <Textarea 
                id="message" 
                name="message" 
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=""
                className="bg-[#1e1b2f]/30 border-[#1e1b2f] focus:border-[#7b3fe4] focus:ring-[#7b3fe4]/20 resize-none transition-all duration-300 hover:border-[#7b3fe4]/50"
              />
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div className={`p-4 rounded-md transition-all duration-300 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}
            
            <div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#7b3fe4] to-[#b799ff] hover:from-[#6b2fd4] hover:to-[#a688ee] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg hover:shadow-[#7b3fe4]/30"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Sending...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
