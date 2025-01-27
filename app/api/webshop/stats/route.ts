import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
    })

    const totalOrders = orders.length
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    return NextResponse.json({
      totalOrders,
      totalSales,
      averageOrderValue,
    })
  } catch (error) {
    console.error("Failed to fetch webshop stats:", error)
    return NextResponse.json({ error: "Failed to fetch webshop stats" }, { status: 500 })
  }
}

