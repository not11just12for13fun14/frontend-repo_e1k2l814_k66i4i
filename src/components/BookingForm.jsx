import { useEffect, useState } from 'react'

export default function BookingForm() {
  const [services, setServices] = useState([])
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service_id: '',
    message: ''
  })

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content`)
        const data = await res.json()
        setServices(data.services || [])
      } catch (e) {
        setServices([{ title: 'Consultation' }, { title: 'Accompagnement' }])
      }
    }
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service_id: form.service_id || null,
        message: form.message,
        status: 'Nouveau'
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Erreur')
      setStatus('sent')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      {status !== 'sent' && (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-slate-200 text-sm mb-1">Nom</label>
            <input className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-200 text-sm mb-1">Email</label>
              <input type="email" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            </div>
            <div>
              <label className="block text-slate-200 text-sm mb-1">Numéro</label>
              <input className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
            </div>
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Service souhaité</label>
            <select className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" value={form.service_id} onChange={e=>setForm({...form, service_id:e.target.value})}>
              <option value="">Choisir…</option>
              {services.map((s, i) => (
                <option key={i} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Message (optionnel)</label>
            <textarea className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" rows="4" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
          </div>
          <button className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold shadow-lg shadow-blue-600/30">Envoyer ma demande</button>
          {status === 'error' && <div className="text-red-400 text-sm">Une erreur est survenue. Merci de réessayer.</div>}
        </form>
      )}
      {status === 'sent' && (
        <div className="text-center">
          <div className="text-white text-lg font-semibold">Merci ! Votre demande a bien été envoyée.</div>
          <div className="text-slate-300 mt-2">Vous pouvez continuer la discussion avec l’assistant.</div>
          <a href="#/assistant" className="inline-block mt-6 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-semibold text-white">Continuer la discussion avec l’assistant</a>
        </div>
      )}
    </div>
  )
}
