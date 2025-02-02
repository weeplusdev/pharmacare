'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import liff from '@line/liff'

export default function Navbar() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_PHARMACY! })
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile()
          setProfile(userProfile)
        }
      } catch (err) {
        console.error('LIFF initialization failed', err)
      }
    }
    initLiff()
  }, [])

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">PharmaCare</Link>
          <div className="flex items-center gap-4">
            {profile && (
              <img 
                src={profile.pictureUrl} 
                alt={profile.displayName}
                className="w-8 h-8 rounded-full"
              />
            )}
            <Link href="/cart" className="relative">
              <span className="material-icons">shopping_cart</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}