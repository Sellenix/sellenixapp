import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sellenix
            </Link>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Sellenix</h1>
          <p className="text-xl text-muted-foreground">Your complete business solution platform</p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              title="Website Builder"
              description="Create professional websites with our drag-and-drop builder"
            />
            <FeatureCard title="SEO Tools" description="Optimize your online presence with advanced SEO tools" />
            <FeatureCard title="Business Solutions" description="Comprehensive tools for your business growth" />
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">© 2024 Sellenix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

