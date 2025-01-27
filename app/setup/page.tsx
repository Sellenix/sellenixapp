"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SetupPage() {
  const [formData, setFormData] = useState({
    siteName: "",
    siteUrl: "",
    defaultLanguage: "en",
    metaDescription: "",
    metaKeywords: "",
    adminEmail: "",
    adminPassword: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        throw new Error("Setup failed")
      }
    } catch (error) {
      console.error("Setup error:", error)
      // Here you would typically show an error message to the user
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Sellenix Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input id="siteUrl" name="siteUrl" value={formData.siteUrl} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select
                value={formData.defaultLanguage}
                onValueChange={(value) => handleSelectChange("defaultLanguage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  {/* Add more languages as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Input
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input id="metaKeywords" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" name="adminEmail" value={formData.adminEmail} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input
                id="adminPassword"
                name="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Complete Setup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

