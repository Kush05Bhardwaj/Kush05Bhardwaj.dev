"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Star } from 'lucide-react'

interface Testimonial {
  _id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
}

export default function TestimonialsManagement() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/testimonials')
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
      await fetch(`/api/testimonials/${id}`, {
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
          <h1 className="text-3xl font-bold text-white mb-2">Testimonials Management</h1>
          <p className="text-[#a5a5c8]">Manage client testimonials</p>
        </div>
        <Button className="bg-gradient-to-r from-[#7b3fe4] to-[#b799ff]">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="animate-pulse bg-[#2d2640] h-64 rounded"></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item._id} className="bg-[#1e1b2f] border-[#2d2640]">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-[#7b3fe4]">{item.position} at {item.company}</p>
                    </div>
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
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[#2d2640]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#a5a5c8] text-sm italic">"{item.content}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
