import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import readline from "readline"

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function createAdmin() {
  try {
    const email = await question("Enter admin email: ")
    const password = await question("Enter admin password: ")

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
    rl.close()
    await prisma.$disconnect()
  }
}

createAdmin()

