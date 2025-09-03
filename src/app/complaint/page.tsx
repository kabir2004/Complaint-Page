'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Captcha from '../../components/Captcha'

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    advisorName: '',
    body: '',
    supportingDocs: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [captchaError, setCaptchaError] = useState('')
  const router = useRouter()

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB limit
    })
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setCaptchaError('')

    // Check CAPTCHA verification
    if (!isCaptchaVerified) {
      setCaptchaError('Please complete the security verification to submit your complaint.')
      setIsSubmitting(false)
      return
    }

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate mock ticket number
    const randomNum = Math.floor(Math.random() * 900000) + 100000
    const ticketNumber = 'TKT-' + randomNum

    // Store ticket number for success page
    localStorage.setItem('ticketNumber', ticketNumber)
    router.push('/complaint/success')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sterling Mutuals Header */}
      <header className="relative z-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <main className="relative z-0 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="section-title mb-6">Submit Your Complaint</h1>
            <p className="section-subtitle max-w-3xl mx-auto leading-relaxed">
              Sterling Mutuals Inc. takes client complaints very seriously. We have developed detailed complaint procedures to address your concerns in a timely manner. Your complaint will be thoroughly investigated by our Compliance team.
            </p>
          </div>

          {/* Process Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Our Complaint Resolution Process</h3>
              <p className="text-slate-600 text-sm">Comprehensive approach to addressing your concerns</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center group">
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-blue-900 text-white border-2 border-blue-900 rounded-lg flex items-center justify-center text-sm font-semibold mx-auto transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-blue-900">
                    1
                  </div>
                </div>
                <h4 className="font-medium text-slate-900 text-sm mb-1">Initial Receipt</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Submission & acknowledgement within 5 business days</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-blue-900 text-white border-2 border-blue-900 rounded-lg flex items-center justify-center text-sm font-semibold mx-auto transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-blue-900">
                    2
                  </div>
                </div>
                <h4 className="font-medium text-slate-900 text-sm mb-1">Investigation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Thorough investigation by our Compliance team</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-blue-900 text-white border-2 border-blue-900 rounded-lg flex items-center justify-center text-sm font-semibold mx-auto transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-blue-900">
                    3
                  </div>
                </div>
                <h4 className="font-medium text-slate-900 text-sm mb-1">Review Period</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Comprehensive review period up to 90 days</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-blue-900 text-white border-2 border-blue-900 rounded-lg flex items-center justify-center text-sm font-semibold mx-auto transition-all duration-300 ease-in-out group-hover:bg-white group-hover:text-blue-900">
                    4
                  </div>
                </div>
                <h4 className="font-medium text-slate-900 text-sm mb-1">Resolution</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Detailed response with findings and recommendations</p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="card max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Account Information Section */}
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
                  <div>
                    <label htmlFor="advisorName" className="form-label">
                      Sterling Advisor Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="advisorName"
                      required
                      value={formData.advisorName}
                      onChange={(e) => setFormData({ ...formData, advisorName: e.target.value })}
                      className="form-input"
                      placeholder="Name of your Sterling Advisor"
                    />
                  </div>
                </div>

                {/* Complaint Details Section */}
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Complaint Details</h3>
                  <div>
                    <label htmlFor="body" className="form-label">
                      Description of Your Complaint
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="body"
                      rows={6}
                      required
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      className="form-input resize-none"
                      placeholder="Please provide a detailed description of your complaint. Include relevant dates, specific incidents, and any other information that will help us investigate your concerns effectively..."
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Be as specific as possible to ensure timely resolution. Include dates, names, and specific incidents.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="supportingDocs" className="form-label">
                      Supporting Documentation
                    </label>
                    <textarea
                      id="supportingDocs"
                      rows={3}
                      value={formData.supportingDocs}
                      onChange={(e) => setFormData({ ...formData, supportingDocs: e.target.value })}
                      className="form-input resize-none"
                      placeholder="List any supporting documentation you have (e.g., statements, emails, correspondence, etc.)"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Please note: You may be asked to provide copies of supporting documents during our investigation.
                    </p>
                    
                    {/* File Upload Section */}
                    <div className="mt-4">
                      <label className="form-label flex items-center mb-2">
                        <svg className="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Upload Files
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                          isDragOver 
                            ? 'border-blue-900 bg-blue-50' 
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <div className="text-slate-600">
                            <span className="font-medium text-blue-900">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-slate-500">
                            Images (JPG, PNG, GIF), Documents (PDF, DOC, DOCX) up to 10MB each
                          </p>
                        </div>
                      </div>
                      
                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium text-slate-700">Uploaded Files:</p>
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div>
                                  <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-900 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">What happens after you submit:</p>
                      <ul className="space-y-1 text-blue-900">
                        <li>• Acknowledgement letter within 5 business days</li>
                        <li>• Thorough investigation by our Compliance team</li>
                        <li>• Response within 90 days (or explanation for any delay)</li>
                        <li>• Industry brochure with alternative dispute resolution options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Verification */}
              <div className="border-b border-slate-200 pb-6">
                <Captcha 
                  onVerify={setIsCaptchaVerified} 
                  error={captchaError}
                />
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting || !isCaptchaVerified}
                  className="w-full bg-blue-900 text-white border-2 border-blue-900 rounded-lg px-6 py-4 font-semibold text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-900 disabled:hover:text-white"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : !isCaptchaVerified ? (
                    <span className="flex items-center justify-center whitespace-nowrap">
                      Complete Security Verification
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center whitespace-nowrap">
                      Submit Complaint
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-slate-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Need to submit via other methods? Contact us directly</span>
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
