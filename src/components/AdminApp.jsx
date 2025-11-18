import { useState } from 'react'
import AdminAuth from './AdminAuth'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const [session, setSession] = useState(null)

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <header className="px-4 py-4 sticky top-0 bg-slate-900/80 backdrop-blur border-b border-white/5">Espace Pro</header>
        <AdminAuth onLogin={setSession} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="px-4 py-4 sticky top-0 bg-slate-900/80 backdrop-blur border-b border-white/5 flex items-center justify-between">
        <div>Espace Pro</div>
        <button onClick={()=>setSession(null)} className="text-slate-300 text-sm">Se déconnecter</button>
      </header>
      <AdminDashboard />
    </div>
  )
}
