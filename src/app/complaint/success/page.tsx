'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SuccessPage() {
  const [ticketNumber, setTicketNumber] = useState('')

  useEffect(() => {
    const ticket = localStorage.getItem('ticketNumber')
    if (ticket) {
      setTicketNumber(ticket)
      localStorage.removeItem('ticketNumber') // Clean up
    }
  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Sterling Mutuals Header */}
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

      {/* Main Content */}
      <main className="relative z-0 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <h1 className="section-title mb-6">Complaint Submitted Successfully</h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-slate-600 leading-relaxed">
                Thank you for bringing your concerns to Sterling Mutuals Inc. We have received your complaint and will begin processing it immediately according to our established procedures.
              </p>
              
              {ticketNumber && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-blue-700">Your Ticket Number</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-mono text-lg font-bold tracking-wider">
                      {ticketNumber}
                    </div>
                    <p className="text-blue-600 text-sm mt-2">
                      Please save this number for your records. You can reference this ticket number in any future communications.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-700">Complaint Submitted Successfully</span>
                </div>
                <p className="text-slate-600 text-sm">
                  Your complaint has been submitted and our Compliance team has been notified. Please keep your ticket number for future reference.
                </p>
              </div>
            </div>

            {/* Sterling Mutuals Process */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-8">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">What happens after you submit:</h3>
              <div className="space-y-2 text-sm text-blue-900">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>Acknowledgement letter within 5 business days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>Thorough investigation by our Compliance team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>Response within 90 days (or explanation for delay)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>Industry brochure with alternative dispute resolution</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
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
                <span className="whitespace-nowrap">Need Help?</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-slate-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Need to contact us directly? Use the information below</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Email: complaints@sterlingmutuals.com | Phone: 1-800-354-4956</p>
              <p>Mail: Sterling Mutuals Inc., 1090 University Ave. West, 2nd Floor, Windsor, Ontario</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
