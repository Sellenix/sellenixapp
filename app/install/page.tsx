"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function InstallPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    dbHost: "",
    dbPort: "",
    dbName: "",
    dbUser: "",
    dbPassword: "",
    adminEmail: "",
    adminPassword: "",
    siteName: "",
    siteUrl: "",
  })
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session || session.user.role !== "SUPERADMIN") {
      router.push("/dashboard")
    }
  }, [session, status, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        const response = await fetch("/api/install", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          router.push("/dashboard")
        } else {
          throw new Error("Installation failed")
        }
      } catch (error) {
        console.error("Installation error:", error)
        // Here you would typically show an error message to the user
      }
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== "SUPERADMIN") {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Sellenix Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Step 1: Database Configuration</h2>
                <div>
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input id="dbHost" name="dbHost" value={formData.dbHost} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="dbPort">Database Port</Label>
                  <Input id="dbPort" name="dbPort" value={formData.dbPort} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input id="dbName" name="dbName" value={formData.dbName} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="dbUser">Database User</Label>
                  <Input id="dbUser" name="dbUser" value={formData.dbUser} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="dbPassword">Database Password</Label>
                  <Input
                    id="dbPassword"
                    name="dbPassword"
                    type="password"
                    value={formData.dbPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Step 2: Admin User</h2>
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                  />
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
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Step 3: Site Settings</h2>
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" name="siteUrl" value={formData.siteUrl} onChange={handleChange} required />
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button type="submit">{step < 3 ? "Next" : "Complete Installation"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

