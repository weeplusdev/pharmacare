import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register']
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Check if user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Doctor-only routes
  if (path.startsWith('/doctor') && token.role !== 'DOCTOR') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // Admin-only routes
  if (path.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/doctor/:path*',
    '/admin/:path*',
    '/checkout/:path*'
  ]
}