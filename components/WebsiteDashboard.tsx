import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WebsiteDashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Website Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>1,234 visitors this month</p>
          <Button asChild className="mt-2">
            <Link href="/website/analytics">View Analytics</Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Last updated: 3 days ago</p>
          <Button asChild className="mt-2">
            <Link href="/website/content">Manage Content</Link>
          </Button>
        </CardContent>
      </Card>
      <Button asChild className="w-full">
        <Link href="/website">Go to Website Dashboard</Link>
      </Button>
    </div>
  )
}

