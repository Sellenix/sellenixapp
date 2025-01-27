"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CallMeForm() {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend
    console.log("Call request submitted for:", phoneNumber)
    // Reset the form
    setPhoneNumber("")
  }

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Request a Call Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Button type="submit">Call Me</Button>
        </form>
      </CardContent>
    </Card>
  )
}

