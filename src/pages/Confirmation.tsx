import { useNavigate } from 'react-router-dom'
import { getStreak, getMomentumScore, getEntryByDate, getTodayDateString } from '../storage'

const MESSAGES = [
  { title: 'Logged.', sub: 'You showed up for yourself today.' },
  { title: 'Recorded.', sub: 'Another data point in your story.' },
  { title: 'Saved.', sub: 'Small reflections compound into clarity.' },
  { title: 'Done.', sub: 'Consistency is your superpower.' },
]

export default function Confirmation() {
  const navigate = useNavigate()
  const streak   = getStreak()
  const { score, trend } = getMomentumScore()
  const entry    = getEntryByDate(getTodayDateString())
  const msg      = MESSAGES[new Date().getDay() % MESSAGES.length]

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh px-5 py-12 bg-gradient-to-b from-sand-100 to-sand-50">

      <div /> {/* spacer */}

      {/* Central content */}
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Icon */}
        <div className="relative flex items-center justify-center mb-2">
          <div className="absolute w-28 h-28 rounded-full bg-sage-200 animate-pulse-ring" />
          <div className="relative w-24 h-24 rounded-full bg-white shadow-warm flex items-center justify-center animate-checkmark">
            <svg className="w-10 h-10 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 animate-fade-up delay-75">
          <h1 className="font-display text-4xl font-semibold text-stone-900">{msg.title}</h1>
          <p className="text-stone-500 text-lg">{msg.sub}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-2 animate-fade-up delay-150">
          {streak > 0 && (
            <div className="card px-4 py-3 flex items-center gap-2">
              <span className="animate-float">🔥</span>
              <div className="flex flex-col">
                <span className="text-stone-900 font-semibold text-sm">{streak} days</span>
                <span className="text-stone-400 text-xs">streak</span>
              </div>
            </div>
          )}
          <div className="card px-4 py-3 flex items-center gap-2">
            <span className="text-lg">{trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'}</span>
            <div className="flex flex-col">
              <span className="text-stone-900 font-semibold text-sm">{score}</span>
              <span className="text-stone-400 text-xs">momentum</span>
            </div>
          </div>
          {entry && (
            <div className="card px-4 py-3 flex items-center gap-2">
              <span className="text-lg">{['😞','😕','😐','🙂','😄'][entry.rating - 1]}</span>
              <div className="flex flex-col">
                <span className="text-stone-900 font-semibold text-sm">Today</span>
                <span className="text-stone-400 text-xs">logged</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 w-full animate-fade-up delay-300">
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to home
        </button>
        <button onClick={() => navigate('/weekly')} className="btn-ghost">
          View your insights →
        </button>
      </div>
    </div>
  )
}
