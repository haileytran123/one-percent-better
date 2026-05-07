import { useNavigate } from 'react-router-dom'
import { getStreak, getMomentumScore, getEntryByDate, getTodayDateString, getThisWeekEntries, getAllEntries } from '../storage'
import Luma from '../components/Luma'
import { computeLumaState } from '../luma'

const MESSAGES = [
  { title: 'Logged.',    sub: 'Thank you for showing up. Luma is proud of you.' },
  { title: 'Recorded.', sub: 'Another thread in the tapestry of your story.' },
  { title: 'Saved.',    sub: 'Small reflections compound into clarity.' },
  { title: 'Done.',     sub: 'Luma grows a little more with every entry.' },
]

export default function Confirmation() {
  const navigate    = useNavigate()
  const streak      = getStreak()
  const { score, trend } = getMomentumScore()
  const entry       = getEntryByDate(getTodayDateString())
  const weekEntries = getThisWeekEntries()
  const allEntries  = getAllEntries()
  const luma        = computeLumaState(allEntries, weekEntries, streak)
  const msg         = MESSAGES[new Date().getDay() % MESSAGES.length]

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh px-5 py-12 bg-gradient-to-b from-sand-100 to-sand-50">

      <div />

      {/* Central content */}
      <div className="flex flex-col items-center gap-6 text-center">

        {/* Luma — tappable, opens growth journey */}
        <button
          onClick={() => navigate('/luma')}
          className="flex flex-col items-center gap-1 animate-checkmark active:scale-95 transition-transform duration-150"
          aria-label="View Luma's growth journey"
        >
          <Luma state={luma} size={120} />
          <p className="text-stone-400 text-xs italic mt-1">{luma.message}</p>
        </button>

        <div className="flex flex-col gap-1.5 animate-fade-up delay-75">
          <h1 className="font-display text-4xl font-semibold text-stone-900">{msg.title}</h1>
          <p className="text-stone-500 text-lg">{msg.sub}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-1 animate-fade-up delay-150">
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
