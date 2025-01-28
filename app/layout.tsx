import { Providers } from "./providers"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import "./globals.css"

export const metadata = {
  title: "Sellenix",
  description: "Your all-in-one SaaS solution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <header className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Sellenix</h1>
              <ThemeToggle />
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

