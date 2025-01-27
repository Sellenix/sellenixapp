"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WebshopDashboard } from "@/components/WebshopDashboard"
import { WebsiteDashboard } from "@/components/WebsiteDashboard"
import { SEODashboard } from "@/components/SEODashboard"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { NotificationCenter } from "@/components/NotificationCenter"

const prisma = new PrismaClient()

async function getRecentActivity(userId: string) {
  const recentOrders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { orderItems: { include: { product: true } } },
  })

  return recentOrders
}

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/login")
    return null //added to prevent further rendering after redirect
  }

  const recentActivity = await getRecentActivity(session.user.id)
  const [webshopStats, setWebshopStats] = useState<WebshopStats | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.hasWebshop) {
      fetchWebshopStats()
    }
  }, [session])

  const fetchWebshopStats = async () => {
    try {
      const response = await fetch("/api/webshop/stats")
      const data = await response.json()
      setWebshopStats(data)
    } catch (error) {
      console.error("Failed to fetch webshop stats:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <NotificationCenter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p>No recent activity</p>
            ) : (
              <ul className="space-y-4">
                {recentActivity.map((order) => (
                  <li key={order.id} className="border-b pb-2">
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-sm">
                      Total: ${order.total.toFixed(2)} - Status: {order.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Webshop</CardTitle>
          </CardHeader>
          <CardContent>
            {session.user.hasWebshop ? (
              <WebshopDashboard stats={webshopStats} />
            ) : (
              <div>
                <p className="mb-4">Upgrade to access Webshop features</p>
                <Button asChild>
                  <Link href="/packages/webshop">Upgrade to Webshop</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Website</CardTitle>
          </CardHeader>
          <CardContent>
            {session.user.hasWebsite ? (
              <WebsiteDashboard />
            ) : (
              <div>
                <p className="mb-4">Upgrade to access Website features</p>
                <Button asChild>
                  <Link href="/packages/website">Upgrade to Website</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SEO Tools</CardTitle>
          </CardHeader>
          <CardContent>
            {session.user.hasSEOTools ? (
              <SEODashboard />
            ) : (
              <div>
                <p className="mb-4">Upgrade to access SEO Tools</p>
                <Button asChild>
                  <Link href="/packages/seo">Upgrade to SEO Tools</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface WebshopStats {
  totalOrders: number
  totalSales: number
  averageOrderValue: number
}

