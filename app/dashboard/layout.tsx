import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Settings, LayoutDashboard, Globe, Search, BarChart, Users, HelpCircle } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r">
        <div className="p-6">
          <Link href="/dashboard" className="text-xl font-bold">
            Sellenix Admin
          </Link>
        </div>
        <nav className="px-4 py-2">
          <div className="space-y-2">
            <NavLink href="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/websites" icon={Globe}>
              Websites
            </NavLink>
            <NavLink href="/dashboard/seo" icon={Search}>
              SEO Tools
            </NavLink>
            <NavLink href="/dashboard/analytics" icon={BarChart}>
              Analytics
            </NavLink>
            <NavLink href="/dashboard/users" icon={Users}>
              User Management
            </NavLink>
            <NavLink href="/dashboard/settings" icon={Settings}>
              Settings
            </NavLink>
            <NavLink href="/dashboard/help" icon={HelpCircle}>
              Help & Support
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  href,
  children,
  icon: Icon,
}: {
  href: string
  children: React.ReactNode
  icon: React.ComponentType<any>
}) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="w-full justify-start">
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </Link>
  )
}

