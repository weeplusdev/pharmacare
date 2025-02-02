'use client'

import { useState } from 'react'

const categories = [
  'ทั้งหมด',
  'ยาทั่วไป',
  'ยาแก้ปวด',
  'วิตามิน',
  'อุปกรณ์การแพทย์',
  'เวชสำอาง'
] as const

type Category = typeof categories[number]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ทั้งหมด')

  return (
    <div className="space-y-2">
      <h3 className="font-medium">หมวดหมู่สินค้า</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}