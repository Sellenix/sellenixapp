"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TemplateCategory } from "@/templates/template.entity"

export default function AdminTemplates() {
  const [templates, setTemplates] = useState([])
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    components: "",
    category: TemplateCategory.OTHER,
    previewImageUrl: "",
  })
  const [previewTemplate, setPreviewTemplate] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch templates from your API here
    // For now, we're using dummy data
    setTemplates([
      {
        id: 1,
        name: "Basic Shop Template",
        category: TemplateCategory.ECOMMERCE,
        previewImageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 2,
        name: "Basic Website Template",
        category: TemplateCategory.BUSINESS,
        previewImageUrl: "/placeholder.svg?height=200&width=400",
      },
    ])
  }, [])

  const handleAddTemplate = async (e) => {
    e.preventDefault()
    // In a real application, you would send this to your API
    console.log("Adding new template:", newTemplate)
    setTemplates([...templates, { id: Date.now(), ...newTemplate }])
    setNewTemplate({ name: "", components: "", category: TemplateCategory.OTHER, previewImageUrl: "" })
  }

  const handleUpdateTemplate = async (id) => {
    // In a real application, you would send this to your API
    console.log("Updating template:", id)
  }

  const handleDeleteTemplate = async (id) => {
    // In a real application, you would send this to your API
    console.log("Deleting template:", id)
    setTemplates(templates.filter((t) => t.id !== id))
  }

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template)
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Manage Templates</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Template</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTemplate} className="space-y-4">
            <Input
              placeholder="Template Name"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              required
            />
            <Textarea
              placeholder="Template Components (JSON)"
              value={newTemplate.components}
              onChange={(e) => setNewTemplate({ ...newTemplate, components: e.target.value })}
              required
            />
            <Select
              value={newTemplate.category}
              onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value as TemplateCategory })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TemplateCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Preview Image URL"
              value={newTemplate.previewImageUrl}
              onChange={(e) => setNewTemplate({ ...newTemplate, previewImageUrl: e.target.value })}
            />
            <Button type="submit">Add Template</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdateTemplate(template.id)} className="mr-2">
                      Update
                    </Button>
                    <Button onClick={() => handleDeleteTemplate(template.id)} variant="destructive" className="mr-2">
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handlePreviewTemplate(template)}>Preview</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <img
                              src={template.previewImageUrl || "/placeholder.svg"}
                              alt={template.name}
                              className="col-span-4 w-full h-auto"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <span className="col-span-4">Category: {template.category}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

