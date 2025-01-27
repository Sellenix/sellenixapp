"use client"

import React, { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BuilderComponent } from "@/components/BuilderComponent"
import { BuilderToolbox } from "@/components/BuilderToolbox"
import { TemplateCategory } from "@/templates/template.entity"

export default function WebsiteBuilder() {
  const [components, setComponents] = useState([])
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch templates from your API here
    // For now, we're using dummy data
    setTemplates([
      {
        id: 1,
        name: "Basic Shop Template",
        category: TemplateCategory.ECOMMERCE,
        components: [
          { id: 1, type: "Heading", content: "Welcome to Our Shop" },
          { id: 2, type: "Paragraph", content: "Find the best products here!" },
          { id: 3, type: "Button", content: "Shop Now" },
        ],
        previewImageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 2,
        name: "Basic Website Template",
        category: TemplateCategory.BUSINESS,
        components: [
          { id: 1, type: "Heading", content: "Our Business" },
          { id: 2, type: "Paragraph", content: "We provide top-notch services." },
          { id: 3, type: "Button", content: "Contact Us" },
        ],
        previewImageUrl: "/placeholder.svg?height=200&width=400",
      },
      { id: 3, name: "Portfolio Template", category: TemplateCategory.PORTFOLIO, components: [] },
      { id: 4, name: "Blog Template", category: TemplateCategory.BLOG, components: [] },
    ])
  }, [])

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      content: getDefaultContent(type),
      src: type === "Image" ? "/placeholder.svg?height=200&width=400" : "",
    }
    setComponents([...components, newComponent])
  }

  const getDefaultContent = (type) => {
    switch (type) {
      case "Heading":
        return "New Heading"
      case "Paragraph":
        return "New paragraph text"
      case "Button":
        return "Click me"
      default:
        return ""
    }
  }

  const moveComponent = (dragIndex, hoverIndex) => {
    const dragComponent = components[dragIndex]
    setComponents(
      components.reduce((acc, component, idx) => {
        if (idx === dragIndex) return acc
        if (idx === hoverIndex) {
          return [...acc, dragComponent, component]
        }
        return [...acc, component]
      }, []),
    )
  }

  const updateComponent = (id, updatedComponent) => {
    setComponents(
      components.map((component) => (component.id === id ? { ...component, ...updatedComponent } : component)),
    )
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedTemplate(null)
    setComponents([])
  }

  const handleTemplateChange = (templateId) => {
    const selected = templates.find((t) => t.id === Number.parseInt(templateId))
    if (selected) {
      setSelectedTemplate(selected)
      setComponents(selected.components)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-8">Website Builder</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Toolbox</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={handleCategoryChange} className="mb-4">
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
              {selectedCategory && (
                <Select onValueChange={handleTemplateChange} className="mb-4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates
                      .filter((t) => t.category === selectedCategory)
                      .map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
              {selectedTemplate && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Template Preview</h3>
                  <img
                    src={selectedTemplate.previewImageUrl || "/placeholder.svg"}
                    alt={selectedTemplate.name}
                    className="w-full h-auto mb-2"
                  />
                  <div className="bg-white p-4 rounded-md">
                    {selectedTemplate.components.map((component, index) => (
                      <div key={index} className="mb-2">
                        {component.type === "Heading" && <h4 className="text-xl font-bold">{component.content}</h4>}
                        {component.type === "Paragraph" && <p>{component.content}</p>}
                        {component.type === "Button" && (
                          <button className="bg-blue-500 text-white px-4 py-2 rounded">{component.content}</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <BuilderToolbox onAddComponent={addComponent} />
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[500px] border-2 border-dashed border-gray-300 p-4">
              {components.map((component, index) => (
                <BuilderComponent
                  key={component.id}
                  index={index}
                  id={component.id}
                  type={component.type}
                  component={component}
                  moveComponent={moveComponent}
                  updateComponent={updateComponent}
                />
              ))}
            </CardContent>
          </Card>
        </div>
        <Button className="mt-4" onClick={() => console.log(JSON.stringify(components, null, 2))}>
          Save Website
        </Button>
      </div>
    </DndProvider>
  )
}

