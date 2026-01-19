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
    
    console.log('📤 Submitting form data:', formData)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('📥 Response:', data)

      if (response.ok && data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Thank you for your message! I will get back to you soon.' 
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        // Show validation errors if available
        let errorMessage = data.message || 'Something went wrong. Please try again.'
        if (data.errors && data.errors.length > 0) {
          errorMessage = data.errors.map((err: any) => err.message).join(', ')
        }
        setSubmitStatus({ 
          type: 'error', 
          message: errorMessage
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly via email.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-8 sm:py-10">
      <div className="text-center mb-8 sm:mb-12">
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
              <a href="https://leetcode.com/u/Kush05Bhardwaj/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1e1b2f] flex items-center justify-center text-[#a5a5c8] hover:text-[#7b3fe4] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
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
