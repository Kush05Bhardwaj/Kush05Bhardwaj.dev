"use client"

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { testimonialsAPI, projectsAPI } from '@/lib/api'
import { Plus, Edit, Trash2, Star, User, Quote } from 'lucide-react'

export default function TestimonialsAdmin() {
  type Project = { _id: string; title: string }
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
    projectRelated: '',
    order: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [testimonialsData, projectsData] = await Promise.all([
        testimonialsAPI.getAll(),
        projectsAPI.getAll()
      ])
      setTestimonials(testimonialsData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const testimonialData = {
        ...formData,
        projectRelated: formData.projectRelated || null
      }

      if (editingTestimonial) {
        await testimonialsAPI.update((editingTestimonial as any)._id, testimonialData)
      } else {
        await testimonialsAPI.create(testimonialData)
      }

      await fetchData()
      setIsFormOpen(false)
      setEditingTestimonial(null)
      setFormData({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        avatar: '',
        projectRelated: '',
        order: 0
      })
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      position: testimonial.position || '',
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating,
      avatar: testimonial.avatar || '',
      projectRelated: testimonial.projectRelated || '',
      order: testimonial.order || 0
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsAPI.delete(id)
        await fetchData()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
      }
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const getProjectTitle = (projectId: string) => {
    const project = projects.find((p: any) => p._id === projectId)
    return project ? project.title : 'Unknown Project'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Testimonials</h1>
            <p className="text-gray-600">Manage client testimonials and reviews</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
              setEditingTestimonial(null)
              setFormData({
                name: '',
                position: '',
                company: '',
                content: '',
                rating: 5,
                avatar: '',
                projectRelated: '',
                order: 0
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Client Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position/Title</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="e.g., CEO, Project Manager"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={4}
                    required
                    placeholder="Write the testimonial content here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectRelated">Related Project (optional)</Label>
                    <select
                      id="projectRelated"
                      value={formData.projectRelated}
                      onChange={(e) => setFormData({...formData, projectRelated: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">No specific project</option>
                      {projects.map((project: any) => (
                        <option key={project._id} value={project._id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Testimonial'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial: any) => (
            <Card key={testimonial._id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>
                        {testimonial.position && testimonial.company 
                          ? `${testimonial.position} at ${testimonial.company}`
                          : testimonial.position || testimonial.company || 'Client'}
                      </CardDescription>
                      <div className="flex items-center mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(testimonial._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="absolute top-0 left-0 w-6 h-6 text-gray-300 -translate-x-2 -translate-y-2" />
                  <p className="text-gray-700 italic pl-4">
                    "{testimonial.content}"
                  </p>
                </div>
                
                {testimonial.projectRelated && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Related to:</strong> {getProjectTitle(testimonial.projectRelated)}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  Added on {new Date(testimonial.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {testimonials.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials found. Add your first testimonial!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
