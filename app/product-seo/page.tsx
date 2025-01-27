"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProductSEO() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [seoData, setSeoData] = useState(null)

  useEffect(() => {
    // Fetch products from your API here
    // For now, we'll use placeholder data
    setProducts([
      { id: 1, name: "Product 1", description: "Description 1", price: 19.99 },
      { id: 2, name: "Product 2", description: "Description 2", price: 29.99 },
    ])
  }, [])

  const handleProductSelect = async (product) => {
    setSelectedProduct(product)
    // Fetch SEO data for the selected product
    const response = await fetch(`/api/seo/product-analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
    const data = await response.json()
    setSeoData(data)
  }

  const handleProductUpdate = async (e) => {
    e.preventDefault()
    // Update product and its SEO data
    // For now, we'll just log the data
    console.log("Updating product:", selectedProduct)
    console.log("SEO data:", seoData)
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Product SEO Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleProductSelect(product)}>Select</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {selectedProduct && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Product & SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductUpdate} className="space-y-4">
                <Input
                  placeholder="Product Name"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
                <Textarea
                  placeholder="Product Description"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                />
                {seoData && (
                  <>
                    <Input
                      placeholder="SEO Title"
                      value={seoData.title}
                      onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Meta Description"
                      value={seoData.metaDescription}
                      onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                    />
                    <Input
                      placeholder="Focus Keyword"
                      value={seoData.focusKeyword}
                      onChange={(e) => setSeoData({ ...seoData, focusKeyword: e.target.value })}
                    />
                  </>
                )}
                <Button type="submit">Update Product & SEO</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

