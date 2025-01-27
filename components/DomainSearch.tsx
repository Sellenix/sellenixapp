"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DomainSearch() {
  const [domain, setDomain] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to check domain availability
    console.log("Searching for domain:", domain)
  }

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Find Your Perfect Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter your domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
          <Button type="submit">Search</Button>
        </form>
      </CardContent>
    </Card>
  )
}

