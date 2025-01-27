import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Zap, Shield, Globe, BarChart, Star } from "lucide-react"
import { Testimonial } from "@/components/Testimonial"
import { FeatureShowcase } from "@/components/FeatureShowcase"
import { CallMeForm } from "@/components/CallMeForm"
import { DomainSearch } from "@/components/DomainSearch"
import { AuthButtons } from "@/components/AuthButtons"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:via-purple-900 dark:to-violet-800 text-gray-900 dark:text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Welcome to Sellenix</h1>
          <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
            The future of e-commerce, websites, and SEO tools combined
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started <ChevronRight className="ml-2" />
              </Link>
            </Button>
            <AuthButtons />
          </div>
        </div>

        <DomainSearch />

        <FeatureShowcase />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Webshop",
              description: "Create and manage your online store with ease",
              link: "/packages/webshop",
            },
            {
              title: "Website",
              description: "Build a professional website for your business",
              link: "/packages/website",
            },
            {
              title: "SEO Tools",
              description: "Boost your online presence with powerful SEO tools",
              link: "/packages/seo",
            },
          ].map((package, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-lg border-purple-500/50 text-gray-900 dark:text-white"
            >
              <CardHeader>
                <CardTitle>{package.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{package.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={package.link}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              name="John Doe"
              company="Tech Innovators Inc."
              image="/placeholder.svg?height=100&width=100"
              rating={5}
            >
              Sellenix has transformed our online presence. The SEO tools are incredibly powerful and user-friendly.
            </Testimonial>
            <Testimonial
              name="Jane Smith"
              company="Global E-commerce Ltd."
              image="/placeholder.svg?height=100&width=100"
              rating={4}
            >
              The e-commerce integration is seamless. Our sales have increased by 30% since we started using Sellenix.
            </Testimonial>
            <Testimonial
              name="Mike Johnson"
              company="Digital Marketing Experts"
              image="/placeholder.svg?height=100&width=100"
              rating={5}
            >
              As a digital marketing agency, we've tried many tools. Sellenix stands out with its comprehensive features
              and excellent support.
            </Testimonial>
          </div>
        </div>

        <CallMeForm />

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to revolutionize your online business?</h2>
          <Link href="/signup" passHref>
            <Button size="lg" variant="secondary" className="mr-4">
              Sign Up Now
            </Button>
          </Link>
          <Link href="/demo" passHref>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-900 dark:text-white border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Request a Demo
            </Button>
          </Link>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Sellenix. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

