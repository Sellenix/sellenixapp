import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { MollieClient } from "@mollie/api-client"

const prisma = new PrismaClient()
const mollieClient = new MollieClient({ apiKey: process.env.MOLLIE_API_KEY || "" })

export async function POST(request: Request) {
  const body = await request.text()
  const paymentId = new URLSearchParams(body).get("id")

  if (!paymentId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    const payment = await mollieClient.payments.get(paymentId)
    const orderId = payment.metadata.orderId

    if (payment.isPaid()) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      })
    } else if (payment.isCanceled() || payment.isExpired()) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "cancelled" },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Mollie webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

