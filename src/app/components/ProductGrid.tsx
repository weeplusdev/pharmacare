'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/app/lib/types'

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow p-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="font-bold">฿{product.price}</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}