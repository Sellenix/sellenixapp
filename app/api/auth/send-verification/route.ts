import { NextResponse } from "next/server"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Generate a verification token (you might want to use a library for this)
    const verificationToken = Math.random().toString(36).substr(2, 8)

    // Save the token to the database (implementation depends on your database setup)
    // await saveVerificationToken(email, verificationToken)

    // Send the verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
  }
}

