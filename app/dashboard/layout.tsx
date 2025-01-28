import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Settings, User } from "lucide-react"

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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r">
        <div className="p-6">
          <Link href="/dashboard" className="text-xl font-bold">
            Sellenix Admin
          </Link>
        </div>
        <nav className="px-4 py-2">
          <div className="space-y-2">
            <NavLink href="/dashboard" icon={User}>
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/settings" icon={Settings}>
              Settings
            </NavLink>
            <NavLink href="/auth/logout" icon={LogOut}>
              Logout
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-background">{children}</div>
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

