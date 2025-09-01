import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateTicketNumber, isTokenExpired } from '@/lib/utils'
import { sendInternalEmail, sendAcknowledgementEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    const complaint = await prisma.complaint.findUnique({
      where: { verifyToken: token },
    })

    if (!complaint) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    if (complaint.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Complaint has already been verified' },
        { status: 400 }
      )
    }

    if (isTokenExpired(complaint.verifyExp)) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    const ticketNumber = generateTicketNumber()

    // Update complaint status
    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaint.id },
      data: {
        status: 'SUBMITTED',
        ticketNumber,
      },
    })

    // Send internal email
    try {
      await sendInternalEmail(updatedComplaint)
    } catch (emailError) {
      console.error('Failed to send internal email:', emailError)
    }

    // Send acknowledgement email
    try {
      await sendAcknowledgementEmail(updatedComplaint)
    } catch (emailError) {
      console.error('Failed to send acknowledgement email:', emailError)
    }

    return NextResponse.json({ 
      ticketNumber,
      message: 'Complaint verified successfully' 
    })

  } catch (error) {
    console.error('Error verifying complaint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
