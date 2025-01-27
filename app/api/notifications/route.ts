import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { logger } from "@/utils/logger"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    logger.warn(`Unauthorized access attempt to notifications API`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
        read: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    logger.info(`Fetched ${notifications.length} notifications for user ${session.user.id}`)
    return NextResponse.json(notifications)
  } catch (error) {
    logger.error(`Failed to fetch notifications: ${error}`)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    })

    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Failed to update notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}

