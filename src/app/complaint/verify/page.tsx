'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [ticketNumber, setTicketNumber] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      setError('No verification token provided')
      return
    }

    verifyComplaint(token)
  }, [searchParams])

  const verifyComplaint = async (token: string) => {
    try {
      const response = await fetch('/api/complaints/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        const data = await response.json()
        setTicketNumber(data.ticketNumber)
        setStatus('success')
      } else {
        const data = await response.json()
        setError(data.error || 'Verification failed')
        setStatus('error')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white">
        <header className="relative z-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="w-64 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/Logo EPS.png" alt="Company Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-0 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card max-w-2xl mx-auto text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mx-auto mb-6"></div>
              <h2 className="section-title mb-4">Verifying Your Complaint</h2>
              <p className="text-slate-600 text-lg">
                Please wait while we process your verification request...
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-white">
        <header className="relative z-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="w-64 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/Logo EPS.png" alt="Company Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-0 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card max-w-2xl mx-auto text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-8">
                <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h1 className="section-title mb-6">Verification Failed</h1>
              
              <div className="space-y-6 mb-12">
                <p className="text-lg text-slate-600 leading-relaxed">
                  We encountered an issue while verifying your complaint. This could be due to an expired or invalid verification link.
                </p>
                
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-red-700">Error Details</span>
                  </div>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/complaint" className="bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-6 py-3 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20 inline-flex items-center justify-center">
                  <span className="whitespace-nowrap">Submit New Complaint</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
                
                <button className="bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-6 py-3 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20 inline-flex items-center justify-center">
                  <span className="whitespace-nowrap">Contact Support</span>
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Need assistance? Contact us at complaints@sterlingmutuals.com or call 1-800-354-4956</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">STERLING MUTUALS INC.</h1>
                <p className="text-sm text-slate-600">Client Complaint Procedures</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-0 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card max-w-2xl mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="section-title mb-6">Complaint Verified Successfully</h1>
            
            <div className="space-y-6 mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                Excellent! Sterling Mutuals Inc. has successfully verified your complaint and it is now being processed by our Compliance team. We've assigned you a unique ticket number for tracking purposes.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600 mb-2">Your Ticket Number</p>
                  <div className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg font-mono text-2xl font-bold tracking-wider">
                    {ticketNumber}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-8">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">What happens next:</h3>
              <div className="space-y-2 text-sm text-blue-900">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>We've sent you a confirmation email with all details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>Our Compliance team will review within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>You'll receive updates on your complaint status</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/complaint" className="bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-6 py-3 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20 inline-flex items-center justify-center">
                <span className="whitespace-nowrap">Submit Another Complaint</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
              
              <button className="bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-6 py-3 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20 inline-flex items-center justify-center">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="whitespace-nowrap">Contact Support</span>
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Keep your ticket number safe for future reference and status inquiries</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
