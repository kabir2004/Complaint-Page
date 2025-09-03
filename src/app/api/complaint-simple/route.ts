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

    // CAPTCHA validation (basic check - in production, use a proper CAPTCHA service)
    if (!body.captchaVerified) {
      return NextResponse.json(
        { error: 'Security verification is required. Please complete the CAPTCHA.' },
        { status: 400 }
      )
    }

    // Generate a random ticket number
    const randomNum = Math.floor(Math.random() * 900000) + 100000 // 6-digit random number
    const ticketNumber = 'TKT-' + randomNum
    
    // Create complaint object
    const complaint = {
      id: Date.now().toString(),
      ticketNumber,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      advisorName: body.advisorName || '',
      body: body.body,
      supportingDocs: body.supportingDocs || '',
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    }
    
    // Store in memory (for testing)
    complaints.push(complaint)
    
    // Log complaint submission (no email)
    console.log(`✅ Complaint submitted successfully: ${ticketNumber}`)
    console.log('Complaint details:', {
      ticketNumber,
      name: complaint.name,
      email: complaint.email,
      advisorName: complaint.advisorName,
      body: complaint.body.substring(0, 100) + '...',
      createdAt: complaint.createdAt
    })
    
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



// GET endpoint to view complaints (for testing)
export async function GET() {
  return NextResponse.json({
    totalComplaints: complaints.length,
    complaints: complaints.slice(-5), // Show last 5
    message: 'Simple complaint storage working'
  })
}