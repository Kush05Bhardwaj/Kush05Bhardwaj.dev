"use client"

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { experienceAPI } from '@/lib/api'
import { Plus, Edit, Trash2, Calendar, MapPin, ExternalLink, Briefcase } from 'lucide-react'

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    responsibilities: '',
    technologies: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    location: '',
    companyUrl: '',
    logo: '',
    order: 0
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const data = await experienceAPI.getAll()
      setExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const experienceData = {
        ...formData,
        responsibilities: formData.responsibilities.split('\n').filter((item: string) => item.trim() !== ''),
        technologies: formData.technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech !== ''),
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null
      }

      if (editingExperience) {
        await experienceAPI.update((editingExperience as any)._id, experienceData)
      } else {
        await experienceAPI.create(experienceData)
      }

      await fetchExperiences()
      setIsFormOpen(false)
      setEditingExperience(null)
      setFormData({
        company: '',
        position: '',
        description: '',
        responsibilities: '',
        technologies: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        location: '',
        companyUrl: '',
        logo: '',
        order: 0
      })
    } catch (error) {
      console.error('Error saving experience:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (experience: any) => {
    setEditingExperience(experience)
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description || '',
      responsibilities: (experience.responsibilities || []).join('\n'),
      technologies: (experience.technologies || []).join(', '),
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
      isCurrentJob: experience.isCurrentJob || false,
      location: experience.location || '',
      companyUrl: experience.companyUrl || '',
      logo: experience.logo || '',
      order: experience.order || 0
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceAPI.delete(id)
        await fetchExperiences()
      } catch (error) {
        console.error('Error deleting experience:', error)
      }
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    })
  }

  const calculateDuration = (startDate: string, endDate: string | null, isCurrent: boolean) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(monthsDiff / 12)
    const months = monthsDiff % 12
    
    let duration = ''
    if (years > 0) duration += `${years} year${years > 1 ? 's' : ''}`
    if (months > 0) {
      if (duration) duration += ' '
      duration += `${months} month${months > 1 ? 's' : ''}`
    }
    
    return duration || '1 month'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Work Experience</h1>
            <p className="text-gray-600">Manage your professional work experience</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
              setEditingExperience(null)
              setFormData({
                company: '',
                position: '',
                description: '',
                responsibilities: '',
                technologies: '',
                startDate: '',
                endDate: '',
                isCurrentJob: false,
                location: '',
                companyUrl: '',
                logo: '',
                order: 0
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position/Title</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="City, Country / Remote"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyUrl">Company Website</Label>
                    <Input
                      id="companyUrl"
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({...formData, companyUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    placeholder="Brief description of your role and the company"
                  />
                </div>

                <div>
                  <Label htmlFor="responsibilities">Key Responsibilities (one per line)</Label>
                  <Textarea
                    id="responsibilities"
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                    rows={4}
                    placeholder="• Developed and maintained web applications&#10;• Led a team of 3 developers&#10;• Improved system performance by 40%"
                  />
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies Used (comma separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      disabled={formData.isCurrentJob}
                    />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isCurrentJob"
                      checked={formData.isCurrentJob}
                      onChange={(e) => {
                        setFormData({
                          ...formData, 
                          isCurrentJob: e.target.checked,
                          endDate: e.target.checked ? '' : formData.endDate
                        })
                      }}
                    />
                    <Label htmlFor="isCurrentJob">Currently working here</Label>
                  </div>
                  <div>
                    <Label htmlFor="logo">Company Logo URL</Label>
                    <Input
                      id="logo"
                      type="url"
                      value={formData.logo}
                      onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Experience'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {experiences.map((experience: any) => (
            <Card key={experience._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    {experience.logo && (
                      <img 
                        src={experience.logo} 
                        alt={`${experience.company} logo`}
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                    <div>
                      <CardTitle className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <span className="font-medium">{experience.company}</span>
                        {experience.companyUrl && (
                          <a 
                            href={experience.companyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(experience)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(experience._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(experience.startDate)} - {
                        experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)
                      }
                      <span className="ml-2 text-gray-500">
                        ({calculateDuration(experience.startDate, experience.endDate, experience.isCurrentJob)})
                      </span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {experience.location}
                      </div>
                    )}
                  </div>

                  {experience.description && (
                    <p className="text-gray-700">{experience.description}</p>
                  )}

                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {experience.responsibilities.map((resp: string, index: number) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {experiences.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No work experience found. Add your first experience!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
