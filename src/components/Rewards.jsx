import { Flame, Star, Trophy, Leaf } from 'lucide-react'

function Tile({ day }) {
  const colorMap = {
    none: 'bg-gray-100',
    mint: 'bg-green-100',
    leaf: 'bg-green-300',
    forest: 'bg-green-500',
    emerald: 'bg-emerald-400 shadow-emerald-300',
  }

  const bg = colorMap[day.level]

  return (
    <div className="relative group">
      <div
        className={`h-6 w-6 rounded-md ${bg} transition-transform duration-200 group-hover:scale-105`}
        aria-label={`Performance tile for ${day.date}`}
      />
      <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs shadow-lg border border-gray-100">
          <div className="font-medium text-gray-800">{day.date}</div>
          <div className="text-gray-600 mt-0.5">Accuracy: {day.accuracy}%</div>
          <div className="text-gray-600">Duration: {day.minutes}m</div>
          <div className="text-green-700 font-semibold">+{day.xp} XP</div>
        </div>
      </div>
    </div>
  )
}

function Grid() {
  // Generate 7x4 grid (28 days)
  const days = Array.from({ length: 28 }).map((_, i) => {
    const accuracy = Math.floor(Math.random() * 100)
    const minutes = Math.floor(Math.random() * 20) + 1
    const xp = Math.floor(minutes * (accuracy / 100) * 10)
    let level = 'none'
    if (xp > 0 && xp < 20) level = 'mint'
    if (xp >= 20 && xp < 60) level = 'leaf'
    if (xp >= 60) level = 'forest'
    if (xp >= 120 || (i % 13 === 0 && xp > 40)) level = 'emerald'
    return {
      date: `Day ${i + 1}`,
      accuracy,
      minutes,
      xp,
      level,
    }
  })

  const weeks = [0, 1, 2, 3]

  return (
    <div className="flex gap-2">
      {weeks.map((w) => (
        <div key={w} className="grid grid-rows-7 gap-1">
          {days.slice(w * 7, w * 7 + 7).map((d, idx) => (
            <Tile key={idx} day={d} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Rewards() {
  const streakOngoing = true
  const level = 7
  const progressPct = 68

  return (
    <div className="p-5 md:p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <h2 className="text-white/95 text-2xl font-bold">Rewards</h2>
        <p className="text-white/80">Visual progress, not chaos.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70">
        <h3 className="font-semibold text-gray-800 mb-3">Daily Practice</h3>
        <p className="text-gray-600 text-sm mb-3">Hover to see details. Tile colors do not change on hover.</p>
        <Grid />
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70">
          <div className="flex items-center gap-2 text-green-700 font-semibold mb-3"><Star className="h-5 w-5" /> Level Progress</div>
          <div className="text-sm text-gray-600 mb-1">Level {level}</div>
          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-800">Badges</span>
          </div>
          <div className="flex gap-3">
            <span className="h-12 w-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center"><Leaf className="text-green-600" /></span>
            <span className="h-12 w-12 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center"><Trophy className="text-yellow-600" /></span>
            <span className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center"><Star className="text-emerald-600" /></span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/70">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-gray-800">Streak</span>
          </div>
          {streakOngoing ? (
            <div className="text-orange-700 font-semibold">🔥 Streak ongoing! Keep the fire alive.</div>
          ) : (
            <div className="text-gray-500">No active streak</div>
          )}
          {/* Confetti trigger only when streak milestones hit - simulated banner */}
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
            ✨ Milestone reached! Emerald day unlocked.
          </div>
        </div>
      </div>
    </div>
  )
}
