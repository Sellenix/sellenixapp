"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  totalAmount: number
  status: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

export default function OrderConfirmation({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/webshop/orders/${params.orderId}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data)
        } else {
          throw new Error("Failed to fetch order")
        }
      } catch (error) {
        console.error("Error fetching order:", error)
        // Here you would typically show an error message to the user
      }
    }

    fetchOrder()
  }, [params.orderId])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Confirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
          <p className="mb-4">Your order number is: {order.id}</p>
          <p className="mb-4">Order status: {order.status}</p>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="font-bold mt-4">Total: ${order.totalAmount.toFixed(2)}</div>
          <Button className="mt-8" onClick={() => router.push("/webshop")}>
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

