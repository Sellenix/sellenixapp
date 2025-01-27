"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cart } from "@/components/Cart"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()
  const { addToCart } = useCart()

  useEffect(() => {
    if (!session?.user?.hasWebshop) {
      router.push("/packages/webshop")
    } else {
      fetchProducts()
    }
  }, [session, router])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/webshop/products")
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold mt-2">Price: ${product.price.toFixed(2)}</p>
              <Button onClick={() => handleAddToCart(product)} className="mt-4">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-16">
        <Cart />
      </div>
    </div>
  )
}

