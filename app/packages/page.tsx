import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const packages = [
  {
    name: "Webshop",
    description: "Create and manage your online store",
    price: "€29.99/month",
    features: ["Product management", "Order processing", "Payment integration"],
    link: "/packages/webshop",
  },
  {
    name: "Website",
    description: "Build a professional website for your business",
    price: "€19.99/month",
    features: ["Custom domain", "Website builder", "Analytics"],
    link: "/packages/website",
  },
  {
    name: "SEO Tools",
    description: "Boost your online presence",
    price: "€39.99/month",
    features: ["Keyword research", "Site audit", "Backlink analysis"],
    link: "/packages/seo",
  },
]

export default function Packages() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Choose Your Package</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.name}>
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{pkg.description}</p>
              <p className="font-bold mb-4">{pkg.price}</p>
              <ul className="list-disc list-inside mb-4">
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button asChild>
                <Link href={pkg.link}>Select {pkg.name}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

