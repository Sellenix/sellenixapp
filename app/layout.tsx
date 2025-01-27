import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { DarkModeProvider } from "@/contexts/DarkModeContext"
import { CartProvider } from "@/contexts/CartContext"
import { DarkModeToggle } from "@/components/DarkModeToggle"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sellenix",
  description: "E-commerce, websites, and SEO tools combined",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <DarkModeProvider>
          <CartProvider>
            <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
              <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                  <Link href="/" className="text-xl font-bold">
                    Sellenix
                  </Link>
                  <div className="space-x-4 flex items-center">
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/packages">Packages</Link>
                    <Link href="/seo-tools">SEO Tools</Link>
                    <Link href="/login">Login</Link>
                    <DarkModeToggle />
                  </div>
                </div>
              </nav>
              {children}
            </body>
          </CartProvider>
        </DarkModeProvider>
      </SessionProvider>
    </html>
  )
}

