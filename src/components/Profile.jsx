import { User, Clock, Flame, Star, Pencil, Lock } from 'lucide-react'
import { useState } from 'react'

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-white/70">
      <Icon className="h-5 w-5 text-green-600" />
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-gray-800 font-semibold">{value}</div>
      </div>
    </div>
  )
}

function TargetItem({ value, onChange }) {
  const [editing, setEditing] = useState(false)
  const [temp, setTemp] = useState(value)
  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-white/70 shadow-sm">
      {editing ? (
        <input
          className="w-full outline-none bg-transparent text-gray-800"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={() => {
            onChange(temp)
            setEditing(false)
          }}
          autoFocus
        />
      ) : (
        <span className="text-gray-700">{value}</span>
      )}
      <button
        onClick={() => setEditing((v) => !v)}
        className="ml-3 text-gray-400 hover:text-green-600"
        aria-label="Edit goal"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function Profile() {
  const [targets, setTargets] = useState([
    'Speak 5 mins a day',
    'Maintain 7-day streak',
    'Improve pronunciation by 5%',
  ])

  const updateTarget = (index, text) => {
    setTargets((ts) => ts.map((t, i) => (i === index ? text : t)))
  }

  return (
    <div className="p-5 md:p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-white/70 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 flex items-center justify-center text-white shadow-inner">
          <User className="h-8 w-8" />
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-900">Alex Learner</div>
          <div className="text-gray-600">Growth-focused English Speaker</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <Stat label="Hours practiced" value="42h" icon={Clock} />
        <Stat label="Best streak" value="12 days" icon={Flame} />
        <Stat label="XP total" value="2,340" icon={Star} />
      </div>

      <div className="mt-6">
        <h3 className="text-white/90 font-semibold mb-2">Targets</h3>
        <div className="grid gap-3">
          {targets.map((t, i) => (
            <TargetItem key={i} value={t} onChange={(text) => updateTarget(i, text)} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white/90 font-semibold mb-2">Learning Paths</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Interview Preparation', progress: 35, locked: false },
            { title: 'Daily Conversations', progress: 62, locked: false },
            { title: 'Fluency Practice', progress: 18, locked: false },
            { title: 'Pronunciation Practice', progress: 0, locked: true },
          ].map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-white/70 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{p.title}</div>
                <div className="mt-2 w-40 h-2 bg-green-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              {p.locked ? (
                <span className="inline-flex items-center gap-1 text-gray-500"><Lock className="h-4 w-4" /> Locked</span>
              ) : (
                <span className="text-sm text-green-700 font-medium">{p.progress}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
