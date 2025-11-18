import { useEffect, useState } from 'react'

function Row({ item, onView }) {
  return (
    <tr className="border-b border-white/10">
      <td className="px-3 py-2">{item.name}</td>
      <td className="px-3 py-2">{item.service_id || '-'}</td>
      <td className="px-3 py-2 text-slate-300 text-sm line-clamp-1">{item.message}</td>
      <td className="px-3 py-2 text-slate-400 text-sm">{new Date(item.created_at).toLocaleString()}</td>
      <td className="px-3 py-2"><span className="px-2 py-1 rounded bg-white/10 text-xs">{item.status}</span></td>
      <td className="px-3 py-2 text-right"><button onClick={()=>onView(item)} className="text-blue-400 hover:text-blue-300">Voir détails</button></td>
    </tr>
  )
}

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const mark = async (id, status) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests/${id}/status`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    await load()
    setSelected(s => ({ ...s, status }))
  }

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-white text-xl font-semibold mb-4">Demandes</h1>
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-slate-200 text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-3 py-2">Nom</th>
              <th className="text-left px-3 py-2">Service</th>
              <th className="text-left px-3 py-2">Message</th>
              <th className="text-left px-3 py-2">Reçu</th>
              <th className="text-left px-3 py-2">Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => <Row key={i.id} item={i} onView={setSelected} />)}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 w-full max-w-md" onClick={e=>e.stopPropagation()}>
            <div className="text-white text-lg font-semibold">{selected.name}</div>
            <div className="text-slate-300 text-sm mt-1">{selected.email} • {selected.phone}</div>
            <div className="text-slate-300 text-sm mt-1">Service: {selected.service_id || '-'}</div>
            <div className="text-slate-200 mt-3 whitespace-pre-wrap">{selected.message}</div>
            <div className="text-slate-400 text-xs mt-3">Reçu: {new Date(selected.created_at).toLocaleString()}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={()=>mark(selected.id,'Confirmé')} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm">Marquer Confirmé</button>
              <button onClick={()=>mark(selected.id,'Annulé')} className="rounded-xl bg-rose-600 hover:bg-rose-500 px-3 py-2 text-sm">Marquer Annulé</button>
            </div>
            <div className="mt-3">
              <a className="text-blue-400 hover:text-blue-300 text-sm" href={`mailto:${selected.email}?subject=Confirmation de rendez-vous`}>Envoyer un email de confirmation</a>
            </div>
            <History id={selected.id} />
          </div>
        </div>
      )}
    </div>
  )
}

function History({ id }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests/${id}/history`)
      const data = await res.json()
      setItems(data)
    }
    load()
  }, [id])
  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <div className="text-slate-200 font-medium">Historique</div>
      <div className="text-slate-300 text-sm mt-1 space-y-1">
        {items.map((l,i)=>(
          <div key={i}>{l.status} • {new Date(l.timestamp).toLocaleString()}</div>
        ))}
        {items.length===0 && <div className="text-slate-400">Aucun événement</div>}
      </div>
    </div>
  )
}
