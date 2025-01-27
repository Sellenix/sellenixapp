import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { siteName, siteUrl, defaultLanguage, metaDescription, metaKeywords, adminEmail, adminPassword } =
      await request.json()

    // Create site settings
    await prisma.siteSettings.create({
      data: {
        siteName,
        siteUrl,
        defaultLanguage,
        metaDescription,
        metaKeywords,
      },
    })

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    })

    // Update the IS_INSTALLED environment variable
    // Note: In a production environment, you might want to use a more secure method to store this flag
    process.env.IS_INSTALLED = "true"

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}

