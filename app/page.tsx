import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Sellenix</h1>
        <p className="text-xl text-muted-foreground mb-8">Your all-in-one SaaS solution for business growth</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Easy Setup" description="Get started in minutes with our intuitive setup process." />
          <FeatureCard
            title="Powerful Analytics"
            description="Gain insights into your business with advanced analytics tools."
          />
          <FeatureCard title="24/7 Support" description="Our team is always here to help you succeed." />
        </div>
        <div className="mt-8">
          <Link href="/auth/login">
            <Button variant="default">Admin Login</Button>
          </Link>
        </div>
      </main>
      <footer className="bg-muted">
        <div className="container mx-auto py-4 px-4 text-center text-muted-foreground">
          © 2023 Sellenix. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  )
}

