import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      envVars: {
        DATABASE_URL: process.env.DATABASE_URL ? 'Present' : 'Missing',
        DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
        DATABASE_URL_PREVIEW: process.env.DATABASE_URL?.substring(0, 50) + '...' || 'N/A',
        APP_BASE_URL: process.env.APP_BASE_URL || 'Missing',
        EMAIL_FROM_NO_REPLY: process.env.EMAIL_FROM_NO_REPLY || 'Missing',
        EMAIL_TO_INTERNAL: process.env.EMAIL_TO_INTERNAL || 'Missing',
        SMTP_HOST: process.env.SMTP_HOST || 'Missing',
      },
      prismaTest: 'Not tested yet'
    }

    // Test Prisma connection
    try {
      const { prisma } = await import('@/lib/prisma')
      await prisma.$connect()
      diagnostics.prismaTest = 'Connection successful'
      await prisma.$disconnect()
    } catch (prismaError) {
      diagnostics.prismaTest = `Failed: ${prismaError instanceof Error ? prismaError.message : 'Unknown error'}`
    }

    return NextResponse.json(diagnostics)

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Debug failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}