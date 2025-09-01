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
    
    // Send email notification using direct Gmail SMTP
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

// Simple email function using Gmail SMTP
async function sendSimpleEmail(complaint: any) {
  try {
    // Import nodemailer dynamically
    const nodemailer = await import('nodemailer')
    
    // Create Gmail transporter with your App Password
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'complaintssterling@gmail.com',
        pass: 'uhqb ehpv hbkw byav', // Your Gmail App Password
      },
    })

    // Send email to internal team
    await transporter.sendMail({
      from: 'Sterling Mutuals <complaintssterling@gmail.com>',
      to: 'complaintssterling@gmail.com',
      subject: `Sterling Mutuals - New Complaint - ${complaint.ticketNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🚨 NEW COMPLAINT RECEIVED</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Sterling Mutuals Inc. - Compliance Team</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #dc2626; margin-bottom: 20px;">Complaint Details</h2>
            
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
              <h3 style="color: #dc2626; margin-top: 0; font-size: 16px;">Ticket Information</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Ticket Number:</strong> ${complaint.ticketNumber}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Date Received:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Status:</strong> <span style="color: #dc2626; font-weight: bold;">NEW - REQUIRES IMMEDIATE ATTENTION</span></p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Client Information</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${complaint.name}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${complaint.email}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> ${complaint.phone || 'Not provided'}</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Account Information</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Advisor:</strong> ${complaint.advisorName || 'Not provided'}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Account Number(s):</strong> ${complaint.accountNumbers || 'Not provided'}</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Complaint Details</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Description:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #0f172a;">
                ${complaint.body}
              </div>
              ${complaint.supportingDocs ? `
              <p style="margin: 15px 0 5px 0; color: #475569;"><strong>Supporting Documentation:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0f172a;">
                ${complaint.supportingDocs}
              </div>
              ` : ''}
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">Required Actions</h3>
              <ul style="color: #1e40af; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Send acknowledgement letter within 5 business days</li>
                <li>Begin thorough investigation by Compliance team</li>
                <li>Provide detailed response within 90 days</li>
                <li>Include alternative dispute resolution options</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px; text-align: center;">
              This complaint requires immediate attention and investigation by the Compliance team.
            </p>
          </div>
        </div>
      `
    })

    // Send confirmation to customer
    await transporter.sendMail({
      from: 'Sterling Mutuals <complaintssterling@gmail.com>',
      to: complaint.email,
      subject: `Sterling Mutuals Inc. - Complaint Received - ${complaint.ticketNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">STERLING MUTUALS INC.</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Complaint Acknowledgement</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0f172a; margin-bottom: 20px;">Complaint Received and Acknowledged</h2>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Dear ${complaint.name},
            </p>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
              Thank you for submitting your complaint to Sterling Mutuals Inc. We have received your complaint and assigned ticket number <strong>${complaint.ticketNumber}</strong> for tracking purposes.
            </p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Complaint Summary</h3>
              <p style="margin: 5px 0; color: #475569;"><strong>Ticket Number:</strong> ${complaint.ticketNumber}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Date Received:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
              ${complaint.advisorName ? `<p style="margin: 5px 0; color: #475569;"><strong>Advisor:</strong> ${complaint.advisorName}</p>` : ''}
              ${complaint.accountNumbers ? `<p style="margin: 5px 0; color: #475569;"><strong>Account Number(s):</strong> ${complaint.accountNumbers}</p>` : ''}
              <p style="margin: 15px 0 5px 0; color: #475569;"><strong>Description:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #0f172a;">
                ${complaint.body}
              </div>
              ${complaint.supportingDocs ? `
              <p style="margin: 15px 0 5px 0; color: #475569;"><strong>Supporting Documentation:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0f172a;">
                ${complaint.supportingDocs}
              </div>
              ` : ''}
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">What happens next?</h3>
              <ul style="color: #1e40af; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>You will receive an acknowledgement letter within 5 business days</li>
                <li>Our Compliance team will conduct a thorough investigation</li>
                <li>You'll receive a detailed response within 90 days</li>
                <li>Alternative dispute resolution options will be provided</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px; text-align: center;">
              If you have any questions, please contact us at complaints@sterlingmutuals.com or call 1-800-354-4956.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
            <p>Sterling Mutuals Inc. | 1090 University Ave. West, 2nd Floor, Windsor, Ontario</p>
          </div>
        </div>
      `
    })

    console.log(`✅ Email sent successfully for ticket ${complaint.ticketNumber}`)
    return true

  } catch (error) {
    console.error('❌ Email failed:', error)
    console.log(`
📧 EMAIL NOTIFICATION (Failed - using console):
==========================================
🚨 NEW COMPLAINT RECEIVED - ${complaint.ticketNumber}
===========================================

CLIENT INFORMATION:
Name: ${complaint.name}
Email: ${complaint.email}
Phone: ${complaint.phone || 'Not provided'}
Advisor: ${complaint.advisorName || 'Not provided'}
Account: ${complaint.accountNumbers || 'Not provided'}

COMPLAINT DETAILS:
Ticket: ${complaint.ticketNumber}
Date: ${complaint.createdAt}
Description: ${complaint.body}
${complaint.supportingDocs ? `Supporting Docs: ${complaint.supportingDocs}` : ''}

❌ EMAIL SENDING FAILED - Check Gmail configuration
    `)
    return false
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