"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Experience {
  _id: string
  position: string
  company: string
  startDate: string
  endDate?: string
  isCurrentJob: boolean
  description: string
}

export default function ExperienceManagement() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/experience')
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
      await fetch(`/api/experience/${id}`, {
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
          <h1 className="text-3xl font-bold text-white mb-2">Experience Management</h1>
          <p className="text-[#a5a5c8]">Manage work experience</p>
        </div>
        <Button className="bg-gradient-to-r from-[#ffffff] to-[#cccccc]">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-[#2d2640] h-64 rounded"></div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item._id} className="bg-[#1a1a1a] border-[#2d2640]">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{item.position}</h3>
                    <p className="text-[#ffffff]">{item.company}</p>
                    <p className="text-sm text-[#a5a5c8]">
                      {new Date(item.startDate).toLocaleDateString()} - {item.isCurrentJob ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-[#a5a5c8]">{item.description}</p>
                  </div>
                  <div className="flex gap-2 h-fit">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
