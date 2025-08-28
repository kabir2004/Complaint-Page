import crypto from 'crypto'

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TKT-${timestamp}${random}`
}

export function isTokenExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate
}
