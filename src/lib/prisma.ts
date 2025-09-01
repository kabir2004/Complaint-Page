import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Build database URL with proper encoding
function buildDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  if (process.env.POSTGRES_URL) return process.env.POSTGRES_URL
  
  // Fallback: build URL with properly encoded password
  const host = 'db.qnbqiljzyjcosfmumbqz.supabase.co'
  const port = '5432'
  const database = 'postgres'
  const username = 'postgres'
  const password = encodeURIComponent('NelsonCheng#123') // Properly encode the password
  
  return `postgresql://${username}:${password}@${host}:${port}/${database}`
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: buildDatabaseUrl()
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
