import { Flame, Mic, Star, Leaf, ChevronRight, CheckCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

function LearningPathCard({ title, progress, locked }) {
  return (
    <div className={`min-w-[220px] bg-white rounded-2xl shadow-sm border border-white/70 p-4 mr-4 relative ${locked ? 'opacity-80' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {locked ? (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Locked</span>
        ) : (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{progress}%</span>
        )}
      </div>
      <ProgressBar value={progress} />
      <button className="mt-3 text-sm text-green-700 hover:text-green-800 inline-flex items-center gap-1">
        Continue <ChevronRight className="h-4 w-4" />
      </button>
      {locked && (
        <Leaf className="h-10 w-10 text-green-200 absolute -right-1 -bottom-1" />
      )}
    </div>
  )
}

export default function Dashboard({ name = 'Alex' }) {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Speak 5 mins a day', done: true },
    { id: 2, text: 'Maintain 7-day streak', done: false },
    { id: 3, text: 'Improve pronunciation by 5%', done: false },
  ])

  const streak = 5
  const xp = 1240
  const nextMilestone = 1500
  const milestonePct = useMemo(() => Math.min(100, Math.round((xp / nextMilestone) * 100)), [xp, nextMilestone])

  const toggleGoal = (id) => {
    setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))
  }

  return (
    <div className="p-5 md:p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white/95">Hello {name} 🌱</h1>
        <p className="text-white/80 mt-1">Your fluency is taking root.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Streak & XP</h3>
              <p className="text-sm text-gray-500">Every word makes you stronger.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-orange-600 font-semibold"><Flame className="h-5 w-5" /> {streak} day</span>
              <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><Star className="h-5 w-5" /> {xp} XP</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Next milestone</span>
              <span>{milestonePct}%</span>
            </div>
            <ProgressBar value={milestonePct} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70 flex items-center justify-center">
          <button className="relative h-36 w-36 md:h-40 md:w-40 rounded-full bg-green-600 text-white flex items-center justify-center shadow-2xl ring-8 ring-green-200/60">
            <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20" />
            <Mic className="h-10 w-10" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white/90 font-semibold mb-2">Learning Paths</h3>
        <div className="flex overflow-x-auto pb-2 no-scrollbar">
          <LearningPathCard title="Interview Preparation" progress={35} locked={false} />
          <LearningPathCard title="Daily Conversations" progress={62} locked={false} />
          <LearningPathCard title="Fluency Practice" progress={18} locked={false} />
          <LearningPathCard title="Pronunciation Practice" progress={0} locked={true} />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-lg p-5 border border-white/70">
        <h3 className="font-semibold text-gray-800 mb-3">Weekly Goals</h3>
        <ul className="grid md:grid-cols-3 gap-3">
          {goals.map((g) => (
            <li key={g.id}>
              <button
                onClick={() => toggleGoal(g.id)}
                className={`w-full flex items-center gap-2 p-3 rounded-xl border transition-shadow ${
                  g.done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:shadow'
                }`}
              >
                <CheckCircle className={`h-5 w-5 ${g.done ? 'text-green-600' : 'text-gray-300'}`} />
                <span className={g.done ? 'text-green-800' : 'text-gray-700'}>{g.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
