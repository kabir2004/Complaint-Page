import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for testing (like what major companies start with)
// In production, this would be replaced with a proper database
const complaints: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.email || !body.body) {
      return NextResponse.json(
        { error: 'Name, email, and complaint body are required' },
        { status: 400 }
      )
    }

    // Generate a simple ticket number
    const ticketNumber = 'TKT-' + Date.now()
    
    // Create complaint object
    const complaint = {
      id: Date.now().toString(),
      ticketNumber,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      advisorName: body.advisorName || '',
      accountNumbers: body.accountNumbers || '',
      body: body.body,
      supportingDocs: body.supportingDocs || '',
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    }
    
    // Store in memory (for testing)
    complaints.push(complaint)
    
    // Send email notification (simplified)
    try {
      await sendSimpleEmail(complaint)
    } catch (emailError) {
      console.log('Email failed but continuing:', emailError)
    }
    
    return NextResponse.json({ 
      message: 'Complaint submitted successfully! Your ticket number is: ' + ticketNumber,
      ticketNumber: ticketNumber,
      status: 'success'
    })

  } catch (error) {
    console.error('Complaint submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit complaint. Please try again.' },
      { status: 500 }
    )
  }
}

// Simple email function (like major companies use)
async function sendSimpleEmail(complaint: any) {
  // For now, just log to console
  // In production, use a service like Resend, SendGrid, or AWS SES
  console.log(`
EMAIL NOTIFICATION:
===================
To: complaintssterling@gmail.com
Subject: New Complaint - ${complaint.ticketNumber}

Name: ${complaint.name}
Email: ${complaint.email}
Ticket: ${complaint.ticketNumber}
Complaint: ${complaint.body}
Date: ${complaint.createdAt}

This would be sent via email service.
  `)
  
  return true
}

// GET endpoint to view complaints (for testing)
export async function GET() {
  return NextResponse.json({
    totalComplaints: complaints.length,
    complaints: complaints.slice(-5), // Show last 5
    message: 'Simple complaint storage working'
  })
}