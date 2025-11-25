"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Calendar, User, MessageSquare } from 'lucide-react'

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: string
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setContacts(data.data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contact Submissions</h1>
        <p className="text-[#a5a5c8]">View messages from visitors</p>
      </div>

      {loading ? (
        <Card className="bg-[#1e1b2f] border-[#2d2640]">
          <CardContent className="pt-6">
            <div className="h-64 animate-pulse bg-[#2d2640] rounded"></div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts.length === 0 ? (
            <Card className="bg-[#1e1b2f] border-[#2d2640]">
              <CardContent className="pt-6">
                <div className="text-center py-12 text-[#a5a5c8]">
                  No contact submissions yet.
                </div>
              </CardContent>
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card
                key={contact._id}
                className="bg-[#1e1b2f] border-[#2d2640] hover:border-[#7b3fe4]/50 transition-all cursor-pointer"
                onClick={() => setSelectedContact(selectedContact?._id === contact._id ? null : contact)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-[#7b3fe4]" />
                        <span className="font-semibold text-white">{contact.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#a5a5c8]">
                        <Calendar className="h-4 w-4" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#a5a5c8]">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${contact.email}`} className="hover:text-[#7b3fe4]">
                        {contact.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#a5a5c8]" />
                      <span className="font-medium text-white">{contact.subject}</span>
                    </div>

                    {selectedContact?._id === contact._id && (
                      <div className="mt-4 pt-4 border-t border-[#2d2640]">
                        <p className="text-sm text-[#a5a5c8] leading-relaxed whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
