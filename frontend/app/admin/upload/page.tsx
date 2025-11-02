"use client"

import { useState, useRef } from 'react'
import AdminLayout from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadAPI } from '@/lib/api'
import { Upload, File, Image, X, Copy, Check, Cloud, FileText } from 'lucide-react'

export default function UploadAdmin() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const multipleFileInputRef = useRef<HTMLInputElement>(null)

  const handleSingleUpload = async (file: File) => {
    setIsLoading(true)
    try {
      const result = await uploadAPI.single(file)
      setUploadedFiles(prev => [result, ...prev])
      return result
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMultipleUpload = async (files: File[]) => {
    setIsLoading(true)
    try {
      const result = await uploadAPI.multiple(files)
      setUploadedFiles(prev => [...result.files, ...prev])
      return result
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    if (files.length === 1) {
      await handleSingleUpload(files[0])
    } else {
      await handleMultipleUpload(Array.from(files))
    }

    // Reset input
    if (event.target) {
      event.target.value = ''
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    if (files.length === 1) {
      await handleSingleUpload(files[0])
    } else {
      await handleMultipleUpload(files)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImageFile = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  const getFileIcon = (filename: string) => {
    return isImageFile(filename) ? <Image className="w-8 h-8" /> : <File className="w-8 h-8" />
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">File Upload</h1>
          <p className="text-gray-600">Upload and manage files for your portfolio</p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Upload images, documents, and other files for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Cloud className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop files here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to select files
              </p>
              <div className="space-x-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Single File
                </Button>
                <Button
                  variant="outline"
                  onClick={() => multipleFileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Multiple Files
                </Button>
              </div>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <input
              ref={multipleFileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />

            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Uploading...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Management */}
        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>
                Manage your uploaded files and copy URLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 text-gray-400">
                      {getFileIcon(file.filename)}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {file.originalName || file.filename}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatFileSize(file.size || 0)}</span>
                        <span>Uploaded: {new Date(file.uploadDate || Date.now()).toLocaleDateString()}</span>
                      </div>
                      
                      {/* File Preview for Images */}
                      {isImageFile(file.filename) && file.url && (
                        <div className="mt-2">
                          <img 
                            src={file.url} 
                            alt={file.filename}
                            className="h-20 w-auto object-cover rounded border"
                          />
                        </div>
                      )}
                      
                      {/* File URL */}
                      <div className="mt-2 flex items-center space-x-2">
                        <Input
                          value={file.url || ''}
                          readOnly
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(file.url || '')}
                        >
                          {copiedUrl === file.url ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">Supported Formats</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Images: JPG, PNG, GIF, WebP, SVG</li>
                  <li>• Documents: PDF, DOC, DOCX, TXT</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use descriptive filenames</li>
                  <li>• Optimize images for web</li>
                  <li>• Keep file sizes reasonable</li>
                  <li>• Use appropriate formats for content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick CV Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick CV/Resume Upload</CardTitle>
            <CardDescription>
              Quickly upload your CV/Resume PDF. This will also update your portfolio information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Upload CV/Resume
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  PDF files only, up to 5MB
                </p>
                <Button
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.pdf'
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        if (file.type !== 'application/pdf') {
                          alert('Please select a PDF file')
                          return
                        }
                        await handleSingleUpload(file)
                      }
                    }
                    input.click()
                  }}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select CV/Resume PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
