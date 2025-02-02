import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
      const { lineId, email, medicalLicenseId, hospital } = await request.json()
      
      const doctor = await prisma.user.update({
        where: { lineId },
        data: {
          email,
          medicalLicenseId,
          hospital,
          role: 'DOCTOR',
          isVerified: false
        }
      })
      
      return NextResponse.json(doctor)
    } catch (error) {
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      )
    }
  }