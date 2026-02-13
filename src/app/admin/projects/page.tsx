"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function ProjectsManagement() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setItems(data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    const token = localStorage.getItem('adminToken')
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      fetchItems()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
          <p className="text-[#a5a5c8]">Manage portfolio projects</p>
        </div>
        <Button className="bg-gradient-to-r from-[#ffffff] to-[#cccccc]">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-[#2d2640] h-64 rounded"></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item._id} className="bg-[#1a1a1a] border-[#2d2640]">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#2d2640]">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item._id)}
                        className="border-[#2d2640] hover:border-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#a5a5c8] text-sm">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies?.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-[#ffffff]/10 text-[#ffffff] text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Live
                      </a>
                    )}
                    {item.githubUrl && (
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
