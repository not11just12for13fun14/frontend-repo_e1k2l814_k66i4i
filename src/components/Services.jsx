import { useEffect, useState } from 'react'

export default function Services({ onSelect }) {
  const [services, setServices] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content`)
        const data = await res.json()
        setServices(data.services || [])
      } catch (e) {
        setServices([
          { title: 'Consultation', description: 'Séance de découverte et conseils personnalisés.' },
          { title: 'Accompagnement', description: 'Programme sur mesure pour progresser.' },
          { title: 'Séance avancée', description: 'Perfectionnement et suivi précis.' },
        ])
      }
    }
    load()
  }, [])

  return (
    <section className="px-4 py-10 bg-slate-950/40">
      <h2 className="text-white text-xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((s, i) => (
          <button key={i} onClick={() => onSelect?.(s)} className="text-left rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
            <div className="text-white font-semibold">{s.title}</div>
            <div className="text-slate-300 text-sm mt-1">{s.description}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
