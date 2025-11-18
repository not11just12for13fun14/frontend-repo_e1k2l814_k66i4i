import { useState } from 'react'

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour 👋 Comment puis-je vous aider ?' }
  ])
  const [input, setInput] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', phone: '', service: '' })
  const [sending, setSending] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsgs = [...messages, { role: 'user', content: input }]
    setMessages(newMsgs)
    setInput('')
    setSending(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, ...contact })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
      setSending(false)
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: "Désolé, une erreur est survenue." }])
      setSending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-[60vh] overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role==='user'?'text-right':''}`}>
            <div className={`inline-block px-3 py-2 rounded-xl ${m.role==='user'?'bg-blue-600 text-white':'bg-white/10 text-slate-100'}`}>{m.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 space-y-3">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Posez votre question" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input placeholder="Nom" value={contact.name} onChange={e=>setContact({...contact, name:e.target.value})} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" />
          <input type="email" placeholder="Email" value={contact.email} onChange={e=>setContact({...contact, email:e.target.value})} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" />
          <input placeholder="Téléphone" value={contact.phone} onChange={e=>setContact({...contact, phone:e.target.value})} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <button disabled={sending} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-semibold text-white">{sending? 'Envoi…' : 'Envoyer'}</button>
      </form>
    </div>
  )
}
