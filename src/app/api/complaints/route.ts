import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/utils'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, advisorName, accountNumbers, body, supportingDocs } = await request.json()

    if (!name || !email || !advisorName || !accountNumbers || !body) {
      return NextResponse.json(
        { error: 'Name, email, advisor name, account numbers, and complaint body are required' },
        { status: 400 }
      )
    }

    const verifyToken = generateToken()
    const verifyExp = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const complaint = await prisma.complaint.create({
      data: {
        name,
        email,
        phone: phone || '',
        advisorName,
        accountNumbers,
        body,
        supportingDocs: supportingDocs || '',
        verifyToken,
        verifyExp,
      },
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, verifyToken, complaint.id)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Still create the complaint even if email fails
    }

    return NextResponse.json({ 
      message: 'Complaint submitted successfully. Please check your email for verification.' 
    })

  } catch (error) {
    console.error('Error creating complaint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
