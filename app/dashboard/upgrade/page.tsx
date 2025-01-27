"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const packages = [
  {
    name: "Webshop",
    price: 29.99,
    features: ["Product management", "Order processing", "Payment integration"],
  },
  {
    name: "Website",
    price: 19.99,
    features: ["Custom domain", "Website builder", "Analytics"],
  },
  {
    name: "SEO Tools",
    price: 39.99,
    features: ["Keyword research", "Site audit", "Backlink analysis"],
  },
]

export default function UpgradePage() {
  const [selectedPackage, setSelectedPackage] = useState("")
  const { data: session } = useSession()
  const router = useRouter()

  const handleUpgrade = async () => {
    if (!selectedPackage) return

    try {
      const response = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: selectedPackage }),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        throw new Error("Upgrade failed")
      }
    } catch (error) {
      console.error("Upgrade error:", error)
      // Here you would typically show an error message to the user
    }
  }

  if (!session) {
    return <div>Please log in to upgrade your account.</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Upgrade Your Account</h1>
      <Card>
        <CardHeader>
          <CardTitle>Choose a Package</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
            {packages.map((pkg) => (
              <div key={pkg.name} className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value={pkg.name} id={pkg.name} />
                <Label htmlFor={pkg.name}>
                  <span className="font-bold">{pkg.name}</span> - ${pkg.price}/month
                  <ul className="list-disc list-inside ml-4">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={handleUpgrade} className="mt-4" disabled={!selectedPackage}>
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

