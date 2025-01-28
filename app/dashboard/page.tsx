import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Website Management"
          items={["Website Builder", "Templates", "Domain Management", "SSL Certificates"]}
        />

        <DashboardCard
          title="SEO Tools"
          items={["Keyword Research", "Site Audit", "Backlink Analysis", "Rankings Monitor"]}
        />

        <DashboardCard
          title="User Management"
          items={["User Accounts", "Permissions", "Activity Logs", "Security Settings"]}
        />

        <DashboardCard title="Business Tools" items={["Analytics", "Reports", "Invoicing", "Support Tickets"]} />

        <DashboardCard
          title="Settings"
          items={["General Settings", "Email Configuration", "API Integration", "Backup & Restore"]}
        />

        <DashboardCard title="Help & Support" items={["Documentation", "Video Tutorials", "Contact Support", "FAQ"]} />
      </div>
    </div>
  )
}

function DashboardCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  )
}

