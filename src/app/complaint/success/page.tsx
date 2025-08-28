import Link from 'next/link'

export default function SuccessPage() {
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
            
            <div className="space-y-6 mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                Thank you for bringing your concerns to Sterling Mutuals Inc. We have received your complaint and will begin processing it immediately according to our established procedures.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-700">Verification Email Sent</span>
                </div>
                <p className="text-slate-600 text-sm">
                  We've sent a verification email to your inbox. Please check your email and click the verification link to complete your complaint submission and begin our investigation process.
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
              <span>Haven't received the email? Check your spam folder or contact us directly</span>
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
