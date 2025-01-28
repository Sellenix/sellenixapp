import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = "admin@sellenix.com" // Vervang dit met je gewenste email
    const password = "jouw_wachtwoord_hier" // Vervang dit met je gewenste wachtwoord

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    })

    console.log(`Admin user created successfully: ${user.email}`)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

