'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/complaint')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-64 h-40 rounded-lg flex items-center justify-center overflow-hidden mx-auto mb-4">
          <img src="/Logo EPS.png" alt="Company Logo" className="w-full h-full object-contain" />
        </div>
        <p className="text-slate-600">Redirecting to complaint form...</p>
      </div>
    </div>
  )
}
