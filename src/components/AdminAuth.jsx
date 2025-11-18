import { useState } from 'react'

export default function AdminAuth({ onLogin }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('demo')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('bad')
      const data = await res.json()
      onLogin(data)
    } catch (e) {
      setErr("Identifiants invalides")
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto px-4 py-10 space-y-3">
      <div>
        <label className="block text-slate-200 text-sm mb-1">Email</label>
        <input className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label className="block text-slate-200 text-sm mb-1">Mot de passe</label>
        <input type="password" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      {err && <div className="text-red-400 text-sm">{err}</div>}
      <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold">Se connecter</button>
    </form>
  )
}
