import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = 10
  const skip = (page - 1) * limit

  try {
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: { userId: session.user.id },
        skip,
        take: limit,
      }),
      prisma.product.count({ where: { userId: session.user.id } }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({ products, totalPages })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Failed to create product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

