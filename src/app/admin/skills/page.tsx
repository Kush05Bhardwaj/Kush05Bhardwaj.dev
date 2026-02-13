"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Skill {
  _id: string
  name: string
  proficiency: number
  category: string
}

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 80,
    category: 'frontend'
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills')
      const data = await response.json()
      setSkills(data.data || [])
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      const url = editingSkill ? `/api/skills/${editingSkill._id}` : '/api/skills'
      const method = editingSkill ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchSkills()
        setIsDialogOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const token = localStorage.getItem('adminToken')
    try {
      await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      fetchSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      proficiency: skill.proficiency,
      category: skill.category,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingSkill(null)
    setFormData({
      name: '',
      proficiency: 80,
      category: 'frontend'
    })
  }

  const categories = ['frontend', 'backend', 'database', 'tools', 'cloud', 'mobile', 'other']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills Management</h1>
          <p className="text-[#a5a5c8]">Manage your technical skills</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#ffffff] to-[#cccccc]">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2d2640] text-white">
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-[#a5a5c8]">Skill Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#000000] border-[#2d2640] text-white"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#a5a5c8]">Proficiency (1-100)</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="bg-[#000000] border-[#2d2640] text-white"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#a5a5c8]">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#000000] border border-[#2d2640] rounded-md text-white"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-[#ffffff] to-[#cccccc]">
                  <Save className="h-4 w-4 mr-2" />
                  {editingSkill ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card className="bg-[#1a1a1a] border-[#2d2640]">
          <CardContent className="pt-6">
            <div className="h-64 animate-pulse bg-[#2d2640] rounded"></div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#1a1a1a] border-[#2d2640]">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2d2640]">
                    <th className="text-left py-3 px-4 text-[#a5a5c8]">Skill</th>
                    <th className="text-left py-3 px-4 text-[#a5a5c8]">Category</th>
                    <th className="text-left py-3 px-4 text-[#a5a5c8]">Level</th>
                    <th className="text-right py-3 px-4 text-[#a5a5c8]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill._id} className="border-b border-[#2d2640]/50 hover:bg-[#2d2640]/30">
                      <td className="py-3 px-4 text-white">{skill.name}</td>
                      <td className="py-3 px-4 text-[#a5a5c8]">{skill.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#2d2640] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#ffffff] to-[#cccccc]"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-[#a5a5c8] text-sm">{skill.proficiency}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(skill)}
                            className="border-[#2d2640] hover:border-[#ffffff]"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(skill._id)}
                            className="border-[#2d2640] hover:border-red-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {skills.length === 0 && (
                <div className="text-center py-12 text-[#a5a5c8]">
                  No skills found. Add your first skill to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
