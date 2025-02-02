import { NextResponse } from 'next/server'
import type { Product } from '@/app/lib/types'

export async function GET(request: Request) {
  // Mock data - ในการใช้งานจริงควรดึงจาก Database
  const products: Product[] = [
    {
      id: '1',
      name: 'พาราเซตามอล',
      description: 'ยาแก้ปวด ลดไข้',
      price: 35,
      image: '/images/paracetamol.jpg',
      category: 'ยาทั่วไป',
      stock: 100
    },
    // เพิ่มสินค้าอื่นๆ
  ]

  return NextResponse.json({ products })
}