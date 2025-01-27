"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Zap, Shield, Globe, BarChart, Check, X } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 29,
    features: {
      "SEO Tools": "Basic",
      "Website Templates": 5,
      "Monthly Visitors": "1,000",
      Support: "Email",
      "Custom Domain": true,
      "SSL Certificate": true,
      "Analytics Dashboard": "Basic",
      "API Access": false,
      "White-label Solution": false,
    },
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Pro",
    price: 79,
    features: {
      "SEO Tools": "Advanced",
      "Website Templates": 20,
      "Monthly Visitors": "50,000",
      Support: "Priority",
      "Custom Domain": true,
      "SSL Certificate": true,
      "Analytics Dashboard": "Advanced",
      "API Access": true,
      "White-label Solution": false,
    },
    color: "from-purple-500 to-pink-400",
  },
  {
    name: "Enterprise",
    price: 199,
    features: {
      "SEO Tools": "Custom",
      "Website Templates": "Unlimited",
      "Monthly Visitors": "Unlimited",
      Support: "24/7 Dedicated",
      "Custom Domain": true,
      "SSL Certificate": true,
      "Analytics Dashboard": "Custom",
      "API Access": true,
      "White-label Solution": true,
    },
    color: "from-orange-500 to-red-400",
  },
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("Starter")
  const [isAnnual, setIsAnnual] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle form submission (e.g., send data to server)
      console.log("Form submitted:", formData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-purple-900 dark:to-violet-800 text-gray-900 dark:text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">Choose Your Plan</h1>

        <div className="flex justify-center items-center mb-8">
          <span className="mr-2">Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-purple-500" />
          <span className="ml-2">Annual (Save 20%)</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`bg-gradient-to-br ${plan.color} text-white`}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-white/80">
                  ${isAnnual ? (plan.price * 12 * 0.8).toFixed(2) : plan.price}/{isAnnual ? "year" : "month"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Object.entries(plan.features)
                    .slice(0, 5)
                    .map(([feature, value]) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-5 h-5 mr-2" /> {feature}: {value.toString()}
                      </li>
                    ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedPlan === plan.name ? "secondary" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mb-16 bg-white/10 backdrop-blur-lg border-purple-500/50 text-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {plans.map((plan) => (
                    <TableHead key={plan.name}>{plan.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(plans[0].features).map((feature) => (
                  <TableRow key={feature}>
                    <TableCell>{feature}</TableCell>
                    {plans.map((plan) => (
                      <TableCell key={plan.name}>
                        {typeof plan.features[feature] === "boolean" ? (
                          plan.features[feature] ? (
                            <Check className="text-green-500" />
                          ) : (
                            <X className="text-red-500" />
                          )
                        ) : (
                          plan.features[feature]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-purple-500/50 text-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" value={formData.company} onChange={handleInputChange} />
                  </div>
                </>
              )}
              {step === 2 && (
                <div>
                  <Label>Selected Plan</Label>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    {plans.map((plan) => (
                      <div key={plan.name} className="flex items-center space-x-2">
                        <RadioGroupItem value={plan.name} id={plan.name} />
                        <Label htmlFor={plan.name}>
                          {plan.name} - ${isAnnual ? (plan.price * 12 * 0.8).toFixed(2) : plan.price}/
                          {isAnnual ? "year" : "month"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {step === 3 && (
                <>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" value={formData.cvv} onChange={handleInputChange} required />
                    </div>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              {step === 3 ? "Subscribe Now" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-white/20">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 Sellenix. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:text-purple-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

