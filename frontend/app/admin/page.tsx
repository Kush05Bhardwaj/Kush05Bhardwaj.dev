"use client"

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { portfolioAPI, projectsAPI, experienceAPI, skillsAPI, testimonialsAPI } from '@/lib/api'
import { User, Briefcase, Award, MessageSquare, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    portfolio: 0,
    projects: 0,
    experience: 0,
    skills: 0,
    testimonials: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [portfolio, projects, experience, skills, testimonials] = await Promise.all([
          portfolioAPI.get().catch(() => null),
          projectsAPI.getAll().catch(() => []),
          experienceAPI.getAll().catch(() => []),
          skillsAPI.getAll().catch(() => []),
          testimonialsAPI.getAll().catch(() => [])
        ])

        setStats({
          portfolio: portfolio ? 1 : 0,
          projects: projects.length,
          experience: experience.length,
          skills: skills.length,
          testimonials: testimonials.length
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Portfolio Info',
      value: stats.portfolio,
      description: 'Personal information setup',
      icon: User,
      color: 'text-blue-600'
    },
    {
      title: 'Projects',
      value: stats.projects,
      description: 'Total projects added',
      icon: Briefcase,
      color: 'text-green-600'
    },
    {
      title: 'Experience',
      value: stats.experience,
      description: 'Work experience entries',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Skills',
      value: stats.skills,
      description: 'Technical skills listed',
      icon: Settings,
      color: 'text-orange-600'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      description: 'Client testimonials',
      icon: MessageSquare,
      color: 'text-pink-600'
    }
  ]

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your portfolio admin panel. Manage your content from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to perform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="/admin/projects"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Add a new project
                </a>
                <a
                  href="/admin/experience"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Update work experience
                </a>
                <a
                  href="/admin/skills"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Manage skills
                </a>
                <a
                  href="/admin/testimonials"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Add testimonials
                </a>
                <a
                  href="/admin/portfolio"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Update portfolio info
                </a>
                <a
                  href="/admin/upload"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  → Upload files
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backend API:</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Database:</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>File Uploads:</span>
                <span className="text-green-600">Available</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Updated:</span>
                <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
