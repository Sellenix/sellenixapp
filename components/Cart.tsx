"use client"

import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart()

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                className="w-16 mr-2"
              />
              <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
        <div>
          <Button variant="outline" onClick={clearCart} className="mr-2">
            Clear Cart
          </Button>
          <Button>Checkout</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

