// Simple email logging function for development
export function logEmail(type: string, to: string, subject: string) {
  console.log(`📧 ${type}: ${to} - ${subject}`)
}