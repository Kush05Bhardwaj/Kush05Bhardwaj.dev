"use client"

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { skillsAPI } from '@/lib/api'
import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react'

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    proficiency: 50,
    icon: '',
    color: '#3B82F6',
    order: 0
  })

  const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'tools', label: 'Tools' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'other', label: 'Other' }
  ]

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const data = await skillsAPI.getAll()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (editingSkill) {
        await skillsAPI.update((editingSkill as any)._id, formData)
      } else {
        await skillsAPI.create(formData)
      }

      await fetchSkills()
      setIsFormOpen(false)
      setEditingSkill(null)
      setFormData({
        name: '',
        category: 'frontend',
        proficiency: 50,
        icon: '',
        color: '#3B82F6',
        order: 0
      })
    } catch (error) {
      console.error('Error saving skill:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (skill: any) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || '',
      color: skill.color || '#3B82F6',
      order: skill.order || 0
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id)
        await fetchSkills()
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 80) return 'bg-green-500'
    if (proficiency >= 60) return 'bg-blue-500'
    if (proficiency >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Skills</h1>
            <p className="text-gray-600">Manage your technical skills and proficiency levels</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
              setEditingSkill(null)
              setFormData({
                name: '',
                category: 'frontend',
                proficiency: 50,
                icon: '',
                color: '#3B82F6',
                order: 0
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="e.g., React, Node.js, MongoDB"
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
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="proficiency">Proficiency (1-100)</Label>
                    <Input
                      id="proficiency"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.proficiency}
                      onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
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

                <div>
                  <Label htmlFor="icon">Icon (optional)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="URL to icon or icon class name"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Skill'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {categories.map(category => {
            const categorySkills = groupedSkills[category.value] || []
            if (categorySkills.length === 0) return null

            return (
              <Card key={category.value}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {category.label}
                    <span className="ml-2 text-sm text-gray-500">({categorySkills.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill: any) => (
                      <div key={skill._id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{skill.name}</h3>
                            <div className="flex items-center mt-1">
                              <TrendingUp className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-600">{skill.proficiency}%</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(skill)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(skill._id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${getProficiencyColor(skill.proficiency)}`}
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        
                        {skill.color && (
                          <div className="flex items-center mt-2">
                            <div
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: skill.color }}
                            />
                            <span className="text-xs text-gray-500">Color: {skill.color}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {skills.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No skills found. Add your first skill!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
