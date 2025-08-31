import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received request:', body)
    
    // Basic validation
    if (!body.name || !body.email || !body.body) {
      return NextResponse.json(
        { error: 'Name, email, and complaint body are required' },
        { status: 400 }
      )
    }

    // Test database connection step by step
    let dbResult = 'Not tested'
    try {
      console.log('Attempting to connect to database...')
      const { prisma } = await import('@/lib/prisma')
      
      console.log('Prisma imported successfully')
      await prisma.$connect()
      console.log('Database connected successfully')
      
      // Simple insert
      const complaint = await prisma.complaint.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone || '',
          advisorName: body.advisorName || 'Not provided',
          accountNumbers: body.accountNumbers || 'Not provided',
          body: body.body,
          supportingDocs: body.supportingDocs || '',
          verifyToken: 'simple-' + Date.now(),
          verifyExp: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      })
      
      console.log('Complaint created:', complaint.id)
      dbResult = `Success - ID: ${complaint.id}`
      
      await prisma.$disconnect()
      
    } catch (dbError) {
      console.error('Database error:', dbError)
      dbResult = `Database Error: ${dbError instanceof Error ? dbError.message : 'Unknown'}`
    }

    return NextResponse.json({ 
      message: 'Simple complaint endpoint test',
      status: 'success',
      database: dbResult,
      receivedData: {
        name: body.name,
        email: body.email,
        hasBody: !!body.body
      }
    })

  } catch (error) {
    console.error('Simple complaint error:', error)
    return NextResponse.json(
      { 
        error: 'Simple endpoint failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}