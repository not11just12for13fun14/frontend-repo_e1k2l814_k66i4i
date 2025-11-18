export default function HoursLocation() {
  const [content, setContent] = useState(null)
  return (
    <section className="px-4 py-10">
      <h2 className="text-white text-xl font-semibold mb-4">Horaires & localisation</h2>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-slate-300 text-sm">
        <div>Horaires: Lun-Ven 9h-18h</div>
        <div className="mt-2">Adresse: Centre-ville</div>
      </div>
    </section>
  )
}
