export default function Reviews() {
  const reviews = [
    { name: 'Camille', text: 'Service impeccable, réservation ultra simple !' },
    { name: 'Maxime', text: 'Très pro, à l’écoute. Je recommande.' },
    { name: 'Sarah', text: 'Réponse rapide et prise de rendez-vous en 2 minutes.' },
  ]
  return (
    <section className="px-4 py-10">
      <h2 className="text-white text-xl font-semibold mb-4">Avis clients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="text-white font-medium">{r.name}</div>
            <div className="text-slate-300 text-sm mt-1">{r.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
