import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL ? 'Set' : 'Missing',
      APP_BASE_URL: !!process.env.APP_BASE_URL ? 'Set' : 'Missing',
      NODE_ENV: process.env.NODE_ENV,
    }

    // Test database connection
    let dbStatus = 'Unknown'
    try {
      await prisma.$queryRaw`SELECT 1`
      dbStatus = 'Connected'
    } catch (error) {
      dbStatus = `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }

    return NextResponse.json({
      status: 'OK',
      environment: envCheck,
      database: dbStatus,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Health check failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}