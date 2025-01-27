import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { MollieClient } from "@mollie/api-client"

const prisma = new PrismaClient()
const mollieClient = new MollieClient({ apiKey: process.env.MOLLIE_API_KEY || "" })

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { cart, total, ...shippingInfo } = await request.json()

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: total,
        status: "pending",
        shippingInfo: JSON.stringify(shippingInfo),
        items: {
          create: cart.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    })

    // Create payment with Mollie
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: total.toFixed(2),
      },
      description: `Order ${order.id}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/webshop/order-confirmation/${order.id}`,
      webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webshop/mollie-webhook`,
      metadata: {
        orderId: order.id,
      },
    })

    // Update order with payment ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.id },
    })

    return NextResponse.json({ orderId: order.id, paymentUrl: payment.getCheckoutUrl() })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}

