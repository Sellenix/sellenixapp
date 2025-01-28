import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="Sellenix" />
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/auth/login">
                <Button variant="outline">Admin Login</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Sellenix</h1>
            <p className="text-xl text-gray-600 mb-8">Your all-in-one SaaS solution for business growth</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard title="Easy Setup" description="Get started in minutes with our intuitive setup process." />
              <FeatureCard
                title="Powerful Analytics"
                description="Gain insights into your business with advanced analytics tools."
              />
              <FeatureCard title="24/7 Support" description="Our team is always here to help you succeed." />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300">© 2023 Sellenix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

