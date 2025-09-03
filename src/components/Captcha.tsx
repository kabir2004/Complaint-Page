'use client'

import { useState, useEffect } from 'react'

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void
  error?: string
}

export default function Captcha({ onVerify, error }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  // Generate random CAPTCHA text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setUserInput('')
    setIsVerified(false)
    onVerify(false)
  }

  // Generate initial CAPTCHA
  useEffect(() => {
    generateCaptcha()
  }, [])

  // Verify user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setUserInput(value)
    
    if (value === captchaText) {
      setIsVerified(true)
      onVerify(true)
    } else {
      setIsVerified(false)
      onVerify(false)
    }
  }

  return (
    <div className="space-y-4">
      <label className="form-label">
        Security Verification
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">Please verify you are human:</span>
          <button
            type="button"
            onClick={generateCaptcha}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            🔄 Refresh
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* CAPTCHA Display */}
          <div className="flex-1">
            <div className="bg-white border-2 border-slate-300 rounded-lg p-4 text-center">
              <div className="text-2xl font-mono font-bold text-slate-800 tracking-wider select-none">
                {captchaText}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Enter the text above
              </div>
            </div>
          </div>
          
          {/* Input Field */}
          <div className="flex-1">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter CAPTCHA"
              className={`w-full px-3 py-2 border rounded-lg text-center font-mono text-lg tracking-wider transition-all duration-200 ${
                userInput && !isVerified
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                  : isVerified
                  ? 'border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-500'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              maxLength={5}
            />
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="mt-3 flex items-center justify-center">
          {userInput && (
            <div className={`flex items-center space-x-2 text-sm font-medium ${
              isVerified ? 'text-green-600' : 'text-red-600'
            }`}>
              {isVerified ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>✓ Verified</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Incorrect - please try again</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-3 text-center">
            <div className="text-red-600 text-sm font-medium">
              {error}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Security Notice:</p>
            <p>This verification helps protect our complaint system from automated submissions and ensures legitimate complaints are processed efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


