import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Reviews from './components/Reviews'
import HoursLocation from './components/HoursLocation'
import Footer from './components/Footer'
import BookingForm from './components/BookingForm'
import ChatAssistant from './components/ChatAssistant'
import AdminApp from './components/AdminApp'

function App() {
  const [route, setRoute] = useState('home')

  useEffect(() => {
    const onHash = () => {
      const r = window.location.hash.replace('#/', '') || 'home'
      setRoute(r)
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'booking') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <header className="px-4 py-4 sticky top-0 bg-slate-900/80 backdrop-blur border-b border-white/5">Prendre rendez-vous</header>
        <BookingForm />
      </div>
    )
  }

  if (route === 'assistant') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <header className="px-4 py-4 sticky top-0 bg-slate-900/80 backdrop-blur border-b border-white/5">Assistant</header>
        <ChatAssistant />
      </div>
    )
  }

  if (route === 'admin') {
    return <AdminApp />
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Hero onCTAClick={() => (window.location.hash = '#/booking')} />
      <Services onSelect={() => (window.location.hash = '#/booking')} />
      <Reviews />
      <HoursLocation />
      <Footer />
    </div>
  )
}

export default App
