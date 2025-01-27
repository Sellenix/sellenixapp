import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { dbHost, dbPort, dbName, dbUser, dbPassword, adminEmail, adminPassword, siteName, siteUrl } =
      await request.json()

    // TODO: Update database connection string in .env file
    // This would typically involve writing to the .env file, which is not recommended in a production environment
    // For security reasons, you might want to handle this part manually or through a separate setup process

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    })

    // Create site settings
    await prisma.siteSettings.create({
      data: {
        siteName,
        siteUrl,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Installation error:", error)
    return NextResponse.json({ error: "Installation failed" }, { status: 500 })
  }
}

