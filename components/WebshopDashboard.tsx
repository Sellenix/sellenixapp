import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WebshopStats {
  totalOrders: number
  totalSales: number
  averageOrderValue: number
}

interface WebshopDashboardProps {
  stats: WebshopStats | null
}

export function WebshopDashboard({ stats }: WebshopDashboardProps) {
  if (!stats) {
    return <div>Loading webshop statistics...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Button asChild className="w-full">
        <Link href="/webshop">Go to Webshop Dashboard</Link>
      </Button>
    </div>
  )
}

