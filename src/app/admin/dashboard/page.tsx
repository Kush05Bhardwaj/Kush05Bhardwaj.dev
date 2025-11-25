"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Briefcase, FolderKanban, MessageSquare, Mail } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    experience: 0,
    projects: 0,
    testimonials: 0,
    contacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = {
        'Authorization': `Bearer ${token}`,
      }

      const [skills, experience, projects, testimonials, contacts] = await Promise.all([
        fetch('/api/skills').then(res => res.json()),
        fetch('/api/experience').then(res => res.json()),
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/testimonials').then(res => res.json()),
        fetch('/api/contact', { headers }).then(res => res.json()),
      ])

      setStats({
        skills: skills.data?.length || 0,
        experience: experience.data?.length || 0,
        projects: projects.data?.length || 0,
        testimonials: testimonials.data?.length || 0,
        contacts: contacts.data?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Skills', value: stats.skills, icon: Award, color: 'from-blue-500 to-blue-600' },
    { title: 'Experience', value: stats.experience, icon: Briefcase, color: 'from-green-500 to-green-600' },
    { title: 'Projects', value: stats.projects, icon: FolderKanban, color: 'from-purple-500 to-purple-600' },
    { title: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Contacts', value: stats.contacts, icon: Mail, color: 'from-red-500 to-red-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#a5a5c8]">Welcome to your admin panel</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-[#1e1b2f] border-[#2d2640]">
              <CardContent className="pt-6">
                <div className="h-24 animate-pulse bg-[#2d2640] rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-[#1e1b2f] border-[#2d2640] hover:border-[#7b3fe4]/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#a5a5c8]">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-[#a5a5c8] mt-1">Total {stat.title.toLowerCase()}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Quick Actions */}
      <Card className="bg-[#1e1b2f] border-[#2d2640]">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[#a5a5c8]">
            Use the navigation menu on the left to manage your portfolio content:
          </p>
          <ul className="space-y-2 text-[#a5a5c8] list-disc list-inside">
            <li>Add, edit, or delete skills</li>
            <li>Manage work experience entries</li>
            <li>Update project showcase</li>
            <li>Review testimonials</li>
            <li>View contact form submissions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
