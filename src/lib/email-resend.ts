import { Resend } from 'resend'
import { prisma } from './prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper function to log email activity to database
async function logEmail(
  complaintId: string,
  type: string,
  toEmail: string,
  fromEmail: string,
  subject: string,
  body: string,
  status: 'SENT' | 'FAILED' = 'SENT',
  errorMessage?: string
) {
  try {
    await prisma.email.create({
      data: {
        complaintId,
        type,
        toEmail,
        fromEmail,
        subject,
        body,
        status,
        sentAt: status === 'SENT' ? new Date() : null,
        errorMessage,
      },
    })
  } catch (error) {
    console.error('Failed to log email to database:', error)
  }
}

// Helper function to track status changes
async function logStatusChange(
  complaintId: string,
  oldStatus: string | null,
  newStatus: string,
  changedBy?: string,
  notes?: string
) {
  try {
    await prisma.complaintStatusHistory.create({
      data: {
        complaintId,
        oldStatus,
        newStatus,
        changedBy,
        notes,
      },
    })
  } catch (error) {
    console.error('Failed to log status change:', error)
  }
}

export async function sendVerificationEmail(email: string, token: string, complaintId: string) {
  const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000'
  const verificationUrl = `${baseUrl}/complaint/verify?token=${token}`
  const fromEmail = process.env.EMAIL_FROM_NO_REPLY || 'Sterling Mutuals <complaints@sterlingmutuals.com>'
  const subject = 'Sterling Mutuals Inc. - Complaint Verification Required'
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">STERLING MUTUALS INC.</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Client Complaint Procedures</p>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0f172a; margin-bottom: 20px;">Complaint Verification Required</h2>
        
        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
          Thank you for submitting your complaint to Sterling Mutuals Inc. To complete the submission process and begin our investigation, please verify your complaint by clicking the button below.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="display: inline-block; padding: 15px 30px; background-color: #0f172a; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Verify Complaint</a>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">What happens next?</h3>
          <ul style="color: #475569; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Your complaint will be acknowledged within 5 business days</li>
            <li>Our Compliance team will conduct a thorough investigation</li>
            <li>You'll receive a detailed response within 90 days</li>
            <li>Alternative dispute resolution options will be provided</li>
          </ul>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px; text-align: center;">
          This verification link will expire in 24 hours. If you have any questions, please contact us at complaints@sterlingmutuals.com or call 1-800-354-4956.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
        <p>Sterling Mutuals Inc. | 1090 University Ave. West, 2nd Floor, Windsor, Ontario</p>
      </div>
    </div>
  `
  
  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject,
      html: htmlBody,
    })
    
    await logEmail(complaintId, 'VERIFICATION', email, fromEmail, subject, htmlBody, 'SENT')
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    await logEmail(complaintId, 'VERIFICATION', email, fromEmail, subject, htmlBody, 'FAILED', errorMessage)
    throw error
  }
}

export async function sendInternalEmail(complaint: any) {
  const fromEmail = process.env.EMAIL_FROM_NO_REPLY || 'Sterling Mutuals <complaints@sterlingmutuals.com>'
  const toEmail = process.env.EMAIL_TO_INTERNAL || 'complaints@sterlingmutuals.com'
  const subject = `Sterling Mutuals - New Complaint - ${complaint.ticketNumber}`
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">STERLING MUTUALS INC.</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">New Client Complaint Received</p>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0f172a; margin-bottom: 20px;">Complaint Details</h2>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Ticket Information</h3>
          <p style="margin: 5px 0; color: #475569;"><strong>Ticket Number:</strong> ${complaint.ticketNumber}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Date Received:</strong> ${complaint.createdAt.toLocaleDateString()}</p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Client Information</h3>
          <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${complaint.name}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${complaint.email}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> ${complaint.phone || 'Not provided'}</p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Account Information</h3>
          <p style="margin: 5px 0; color: #475569;"><strong>Advisor:</strong> ${complaint.advisorName}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Account Number(s):</strong> ${complaint.accountNumbers}</p>
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
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px; text-align: center;">
          This complaint requires immediate attention and investigation by the Compliance team.
        </p>
      </div>
    </div>
  `

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html: htmlBody,
    })
    
    await logEmail(complaint.id, 'INTERNAL', toEmail, fromEmail, subject, htmlBody, 'SENT')
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    await logEmail(complaint.id, 'INTERNAL', toEmail, fromEmail, subject, htmlBody, 'FAILED', errorMessage)
    throw error
  }
}

export async function sendAcknowledgementEmail(complaint: any) {
  const fromEmail = process.env.EMAIL_FROM_NO_REPLY || 'Sterling Mutuals <complaints@sterlingmutuals.com>'
  const subject = `Sterling Mutuals Inc. - Complaint Received - ${complaint.ticketNumber}`
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">STERLING MUTUALS INC.</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Complaint Acknowledgement</p>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0f172a; margin-bottom: 20px;">Complaint Received and Verified</h2>
        
        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
          Dear ${complaint.name},
        </p>
        
        <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
          Sterling Mutuals Inc. has received and verified your complaint. We have assigned ticket number <strong>${complaint.ticketNumber}</strong> for tracking purposes.
        </p>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">Complaint Summary</h3>
          <p style="margin: 5px 0; color: #475569;"><strong>Advisor:</strong> ${complaint.advisorName}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Account Number(s):</strong> ${complaint.accountNumbers}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>Description:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #0f172a;">
            ${complaint.body}
          </div>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">Next Steps</h3>
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

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [complaint.email],
      subject,
      html: htmlBody,
    })
    
    await logEmail(complaint.id, 'ACKNOWLEDGEMENT', complaint.email, fromEmail, subject, htmlBody, 'SENT')
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    await logEmail(complaint.id, 'ACKNOWLEDGEMENT', complaint.email, fromEmail, subject, htmlBody, 'FAILED', errorMessage)
    throw error
  }
}

export { logStatusChange }
