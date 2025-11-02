"use client"

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { projectsAPI } from '@/lib/api'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    category: 'web',
    featured: false,
    status: 'completed',
    images: '',
    order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map((tech: string) => tech.trim()),
        images: formData.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '')
      }

      if (editingProject) {
        await projectsAPI.update((editingProject as any).id, projectData)
      } else {
        await projectsAPI.create(projectData)
      }

      await fetchProjects()
      setIsFormOpen(false)
      setEditingProject(null)
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        technologies: '',
        liveUrl: '',
        githubUrl: '',
        category: 'web',
        featured: false,
        status: 'completed',
        images: '',
        order: 0
      })
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription || '',
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      category: project.category,
      featured: project.featured,
      status: project.status || 'completed',
      images: (project.images || []).join(', '),
      order: project.order || 0
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id)
        await fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-gray-600">Manage your portfolio projects</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
              setEditingProject(null)
              setFormData({
                title: '',
                description: '',
                shortDescription: '',
                technologies: '',
                liveUrl: '',
                githubUrl: '',
                category: 'web',
                featured: false,
                status: 'completed',
                images: '',
                order: 0
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="desktop">Desktop</option>
                      <option value="api">API</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies (comma separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="images">Project Images (comma separated URLs)</Label>
                  <Input
                    id="images"
                    value={formData.images}
                    onChange={(e) => setFormData({...formData, images: e.target.value})}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Project'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Card key={project._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="capitalize">{project.category}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{project.shortDescription}</p>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="capitalize">Status: {project.status}</span>
                    {project.order !== undefined && <span>Order: {project.order}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {project.featured && (
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Featured
                    </span>
                  )}
                  {project.images && project.images.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {project.images.length} image{project.images.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found. Add your first project!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
