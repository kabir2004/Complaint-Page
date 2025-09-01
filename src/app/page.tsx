export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-64 h-40 rounded-lg flex items-center justify-center overflow-hidden mx-auto mb-4 bg-gradient-to-br from-green-600 to-blue-800">
          <div className="text-white text-center">
            <div className="text-4xl font-bold">STERLING</div>
            <div className="text-sm font-semibold">MUTUALS INC.</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Sterling Mutuals Inc.</h1>
        <p className="text-slate-600 mb-8">Complaint Management System</p>
        <a 
          href="/complaint" 
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Submit a Complaint
        </a>
      </div>
    </div>
  )
}
