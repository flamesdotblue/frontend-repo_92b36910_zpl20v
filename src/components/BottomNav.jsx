import { Home, Mic, Gift, User } from 'lucide-react'

export default function BottomNav({ current, onChange }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'speak', label: 'Speak', icon: Mic },
    { key: 'rewards', label: 'Rewards', icon: Gift },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[720px] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/60">
      <ul className="flex items-center justify-around py-3">
        {items.map(({ key, label, icon: Icon }) => {
          const active = current === key
          return (
            <li key={key}>
              <button
                onClick={() => onChange(key)}
                className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                  active ? 'text-green-700' : 'text-gray-500 hover:text-green-600'
                }`}
              >
                <Icon className={`h-6 w-6 ${active ? 'fill-green-100' : ''}`} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
