import nodemailer from "npm:nodemailer@6.9.9"

/**
 * Supabase Edge Function for sending emails
 * Expected JSON payload:
 * {
 *   "to": "recipient@example.com",
 *   "subject": "Subject line",
 *   "html": "<p>Hello, world!</p>",
 *   "from": "Sterling Mutuals <complaints@sterlingmutuals.com>"
 * }
 */

Deno.serve(async (req: Request) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "POST only" }),
      { 
        status: 405, 
        headers: { "Content-Type": "application/json" } 
      },
    )
  }

  const { to, subject, html, from } = await req.json()

  // Basic validation
  if (!to || !subject || !html) {
    return new Response(
      JSON.stringify({ error: "Missing to / subject / html" }),
      { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      },
    )
  }

  // SMTP credentials are read from environment variables
  // Set them in the Supabase UI > Settings > Functions > Environment Variables
  console.log("SMTP_HOST:", Deno.env.get("SMTP_HOST"))
  console.log("SMTP_PORT:", Deno.env.get("SMTP_PORT"))
  console.log("SMTP_USER:", Deno.env.get("SMTP_USER"))
  console.log("SMTP_PASS:", Deno.env.get("SMTP_PASS") ? "***SET***" : "NOT SET")
  
  // Check if all required environment variables are set
  const smtpHost = Deno.env.get("SMTP_HOST")
  const smtpPort = Deno.env.get("SMTP_PORT")
  const smtpUser = Deno.env.get("SMTP_USER")
  const smtpPass = Deno.env.get("SMTP_PASS")
  
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.error("Missing SMTP environment variables")
    return new Response(
      JSON.stringify({ 
        error: "Missing SMTP configuration", 
        details: "SMTP environment variables not set" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      },
    )
  }
  
  const transporter = nodemailer.createTransporter({
    host: smtpHost,
    port: Number(smtpPort),
    secure: false, // Gmail uses STARTTLS on port 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailOptions = {
    from: from || `"${Deno.env.get("SMTP_FROM_NAME")}" <${Deno.env.get("SMTP_FROM_ADDRESS")}>`,
    to,
    subject,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    // Optionally log the message ID for troubleshooting
    console.info("Email sent:", info.messageId)
    
    return new Response(
      JSON.stringify({ success: true, id: info.messageId }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (err) {
    console.error("SMTP error:", err)
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send e‑mail", 
        details: err.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      },
    )
  }
})
