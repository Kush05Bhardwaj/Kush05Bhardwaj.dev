"use client"

import { useState, useEffect, useRef } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { portfolioAPI, uploadAPI } from '@/lib/api'
import { Save, Upload, FileText, Download, X } from 'lucide-react'

export default function PortfolioAdmin() {
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      resume: ''
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      website: ''
    },
    about: {
      description: '',
      highlights: [],
      yearsOfExperience: 0
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingCV, setIsUploadingCV] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  const fetchPortfolioData = async () => {
    try {
      const data = await portfolioAPI.get()
      setPortfolioData(data)
    } catch (error) {
      console.error('Error fetching portfolio data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    try {
      await portfolioAPI.update(portfolioData)
      setMessage('Portfolio updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error updating portfolio')
      console.error('Error saving portfolio:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePersonalInfoChange = (field: string, value: any) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const handleSocialLinksChange = (field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }))
  }

  const handleAboutChange = (field: string, value: any) => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value
      }
    }))
  }

  const handleHighlightsChange = (value: string) => {
    const highlights = value.split('\n').filter(highlight => highlight.trim() !== '')
    handleAboutChange('highlights', highlights)
  }

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setMessage('Please select a PDF file for your CV/Resume')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size should be less than 5MB')
      return
    }

    setIsUploadingCV(true)
    setMessage('')

    try {
      const result = await uploadAPI.single(file)
      
      // Update the resume URL in the portfolio data
      handlePersonalInfoChange('resume', result.url)
      
      setMessage('CV/Resume uploaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error uploading CV/Resume. Please try again.')
      console.error('Error uploading CV:', error)
    } finally {
      setIsUploadingCV(false)
      // Reset the file input
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const handleRemoveCV = () => {
    if (confirm('Are you sure you want to remove the current CV/Resume?')) {
      handlePersonalInfoChange('resume', '')
      setMessage('CV/Resume removed. Don\'t forget to save changes.')
    }
  }

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Information</h1>
            <p className="text-gray-600">Manage your personal information and about section</p>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={portfolioData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={portfolioData.personalInfo.title}
                    onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={portfolioData.personalInfo.bio}
                  onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={portfolioData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={portfolioData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={portfolioData.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={portfolioData.personalInfo.avatar}
                    onChange={(e) => handlePersonalInfoChange('avatar', e.target.value)}
                  />
                </div>
              </div>

              {/* CV/Resume Management Section */}
              <div>
                <Label>CV/Resume Management</Label>
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  {portfolioData.personalInfo.resume ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-red-600" />
                          <div>
                            <p className="font-medium">Current CV/Resume</p>
                            <p className="text-sm text-gray-600">PDF document uploaded</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(portfolioData.personalInfo.resume, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveCV}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p><strong>Current URL:</strong></p>
                        <Input
                          value={portfolioData.personalInfo.resume}
                          onChange={(e) => handlePersonalInfoChange('resume', e.target.value)}
                          className="mt-1 text-xs"
                          placeholder="Or manually enter resume URL"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-3">No CV/Resume uploaded</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Upload a PDF file or enter a URL manually
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center space-x-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingCV}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploadingCV ? 'Uploading...' : 'Upload New CV/Resume'}
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleCVUpload}
                      className="hidden"
                    />
                    
                    <span className="text-sm text-gray-500">or</span>
                    
                    <Input
                      placeholder="Enter resume URL manually"
                      value={portfolioData.personalInfo.resume}
                      onChange={(e) => handlePersonalInfoChange('resume', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500 text-center">
                    <p>Supported: PDF files up to 5MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Your social media and professional profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    type="url"
                    value={portfolioData.socialLinks.github}
                    onChange={(e) => handleSocialLinksChange('github', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={portfolioData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinksChange('linkedin', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={portfolioData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinksChange('twitter', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={portfolioData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinksChange('instagram', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={portfolioData.socialLinks.website}
                    onChange={(e) => handleSocialLinksChange('website', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Detailed information about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={portfolioData.about.description}
                  onChange={(e) => handleAboutChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="highlights">Highlights (one per line)</Label>
                <Textarea
                  id="highlights"
                  value={portfolioData.about.highlights.join('\n')}
                  onChange={(e) => handleHighlightsChange(e.target.value)}
                  rows={5}
                  placeholder="3+ years of development experience&#10;Full-stack web development&#10;Modern JavaScript frameworks"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={portfolioData.about.yearsOfExperience}
                  onChange={(e) => handleAboutChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
