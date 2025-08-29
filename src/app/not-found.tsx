'use client'

import Link from 'next/link'

export default function NotFound() {
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
      <main className="relative z-0 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 404 Error Display */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-blue-900 mb-4">404</div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                The page you're looking for doesn't exist or has been moved. Please check the URL or return to our complaint submission form.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/complaint" 
                className="bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-8 py-4 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20"
              >
                <span className="flex items-center justify-center whitespace-nowrap">
                  Submit Complaint
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="bg-white text-blue-900 border-2 border-blue-900 rounded-lg px-8 py-4 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-900/20"
              >
                <span className="flex items-center justify-center whitespace-nowrap">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Go Back
                </span>
              </button>
            </div>

            {/* Help Information */}
            <div className="mt-12 bg-slate-50 rounded-lg p-6 border border-slate-200 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-900 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-2">Need help finding what you're looking for?</p>
                  <p className="text-blue-900 mb-3">Contact Sterling Mutuals directly:</p>
                  <div className="text-xs space-y-1">
                    <p>Email: complaints@sterlingmutuals.com</p>
                    <p>Phone: 1-800-354-4956</p>
                    <p>Mail: Sterling Mutuals Inc., 1090 University Ave. West, 2nd Floor, Windsor, Ontario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}