import { useState } from 'react'
import { Mic } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Rewards from './components/Rewards'
import Profile from './components/Profile'
import BottomNav from './components/BottomNav'

function SpeakScreen() {
  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h2 className="text-white/95 text-2xl font-bold">Speak</h2>
        <p className="text-white/80">Practice out loud. We’re cheering for you!</p>
      </header>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-white/70 flex flex-col items-center">
        <button className="relative h-48 w-48 rounded-full bg-green-600 text-white flex items-center justify-center shadow-2xl ring-8 ring-green-200/60">
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20" />
          <span className="absolute inset-0 rounded-full animate-pulse bg-emerald-300/10" />
          <span className="absolute -inset-4 rounded-full bg-emerald-500/10 blur-xl" />
          <Mic className="h-16 w-16" strokeWidth={2.5} />
        </button>
        <div className="mt-6 text-center">
          <div className="text-gray-800 font-semibold">Tap to start speaking</div>
          <div className="text-gray-500 text-sm">“Every word makes you stronger.”</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-green-100 to-green-200" />
      <div className="absolute inset-0 opacity-60">
        <div className="pointer-events-none absolute -top-24 -left-16 h-96 w-96 rounded-full bg-emerald-300 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-green-300 blur-3xl" />
      </div>
      <main className="relative">
        {tab === 'dashboard' && <Dashboard name="Alex" />}
        {tab === 'speak' && <SpeakScreen />}
        {tab === 'rewards' && <Rewards />}
        {tab === 'profile' && <Profile />}
      </main>
      <BottomNav current={tab} onChange={setTab} />
    </div>
  )
}
