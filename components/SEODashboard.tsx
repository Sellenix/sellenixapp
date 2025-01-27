import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SEODashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>3 keywords in top 10</p>
          <Button asChild className="mt-2">
            <Link href="/seo/keywords">View Rankings</Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Site Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Last audit: 7 days ago</p>
          <Button asChild className="mt-2">
            <Link href="/seo/audit">Run New Audit</Link>
          </Button>
        </CardContent>
      </Card>
      <Button asChild className="w-full">
        <Link href="/seo">Go to SEO Dashboard</Link>
      </Button>
    </div>
  )
}

