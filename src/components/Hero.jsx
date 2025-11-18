import { motion } from 'framer-motion'

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.25),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          Prenez rendez-vous en quelques clics
        </motion.h1>
        <p className="mt-3 text-slate-300">Un assistant intelligent vous répond et organise votre demande.</p>
        <div className="mt-6">
          <button onClick={onCTAClick} className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold shadow-lg shadow-blue-600/30">
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </section>
  )
}
