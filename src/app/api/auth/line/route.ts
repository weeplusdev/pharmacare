import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { lineId, displayName } = await request.json()
    
    // Find or create user
    const user = await prisma.user.upsert({
      where: { lineId },
      update: { displayName },
      create: {
        lineId,
        displayName,
        role: 'CUSTOMER'
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process user' },
      { status: 500 }
    )
  }
}