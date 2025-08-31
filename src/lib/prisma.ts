import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Emergency fallback for environment variables
const databaseUrl = process.env.DATABASE_URL || 
  process.env.POSTGRES_URL || 
  'postgresql://postgres:NelsonCheng%23123@db.qnbqiljzyjcosfmumbqz.supabase.co:5432/postgres'

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
