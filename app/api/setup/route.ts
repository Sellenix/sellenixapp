import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

// Create a single PrismaClient instance
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { siteName, siteUrl, defaultLanguage, metaDescription, metaKeywords, adminEmail, adminPassword } = body

    // Validate required fields
    if (!siteName || !siteUrl || !defaultLanguage || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create site settings
    const siteSettings = await prisma.siteSettings.create({
      data: {
        siteName,
        siteUrl,
        defaultLanguage,
        metaDescription: metaDescription || "",
        metaKeywords: metaKeywords || "",
      },
    })

    // Hash password and create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    })

    // Write to a file to indicate installation is complete
    // Note: In production, you should use a more secure method
    process.env.IS_INSTALLED = "true"

    return NextResponse.json({
      success: true,
      siteSettings,
      user: { email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Setup failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}

