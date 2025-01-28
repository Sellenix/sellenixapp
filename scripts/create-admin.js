const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

const prisma = new PrismaClient()

async function createAdmin() {
  const email = "admin@sellenix.com" // Vervang dit met het gewenste e-mailadres
  const password = "admin123" // Vervang dit met het gewenste wachtwoord

  // Een eenvoudige hash functie (NIET VEILIG VOOR PRODUCTIE)
  const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex")
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
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

