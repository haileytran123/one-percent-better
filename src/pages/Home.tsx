import { useNavigate } from 'react-router-dom'
import {
  getEntryByDate, getTodayDateString,
  getStreak, getMomentumScore, getThisWeekEntries,
} from '../storage'
import { ratingEmoji, ratingLabel, ratingBg } from '../components/RatingPicker'
import WeekStrip from '../components/WeekStrip'
import TagPill from '../components/TagPill'
import { Entry } from '../types'

const AFFIRMATIONS = [
  'Small steps. Real change.',
  'Every reflection is data.',
  'You showed up yesterday.',
  'Growth lives in the details.',
  'Patterns emerge with time.',
  'Your story is unfolding.',
]

export default function Home() {
  const today      = getTodayDateString()
  const entry      = getEntryByDate(today)
  const streak     = getStreak()
  const { score: momentum, trend } = getMomentumScore()
  const weekEntries = getThisWeekEntries()
  const navigate   = useNavigate()

  const hour     = new Date().getHours()
  const greeting = hour < 5 ? 'Still up?' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Good night'
  const affirmation = AFFIRMATIONS[new Date().getDay() % AFFIRMATIONS.length]

  const avgMood = weekEntries.length > 0
    ? Math.round((weekEntries.reduce((s, e) => s + e.rating, 0) / weekEntries.length) * 10) / 10
    : null

  const trendIcon  = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
  const trendClass = trend === 'up' ? 'text-sage-600' : trend === 'down' ? 'text-red-400' : 'text-stone-400'

  return (
    <div className="px-5 pt-10 pb-4 flex flex-col gap-5">

      {/* Greeting */}
      <div className="flex flex-col gap-0.5 animate-fade-down">
        <p className="text-stone-400 text-sm font-medium tracking-wide">{greeting}, Hailey</p>
        <h1 className="font-display text-[28px] font-semibold text-stone-900 leading-tight">
          {affirmation}
        </h1>
      </div>

      {/* Week strip */}
      <div className="card px-4 py-4 animate-fade-up delay-75">
        <p className="section-label mb-3">This week</p>
        <WeekStrip />
        {streak > 0 && (
          <div className="mt-3 pt-3 border-t border-sand-100 flex items-center gap-2">
            <span className="animate-float text-base">🔥</span>
            <span className="text-stone-500 text-xs font-medium">{streak} day streak — keep the momentum</span>
          </div>
        )}
      </div>

      {/* Today card */}
      <div className="animate-fade-up delay-150">
        {entry
          ? <CompletedCard entry={entry} onEdit={() => navigate('/check-in')} />
          : <PendingCard   onStart={() => navigate('/check-in')} />
        }
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 animate-fade-up delay-225">
        <StatCard
          label="Avg mood"
          value={avgMood !== null ? `${ratingEmoji(avgMood)} ${avgMood}` : '—'}
          sub="this week"
        />
        <StatCard
          label="Momentum"
          value={<span>{momentum} <span className={`text-sm font-semibold ${trendClass}`}>{trendIcon}</span></span>}
          sub={streak > 0 ? `${streak}-day run` : 'Start logging'}
        />
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------

function PendingCard({ onStart }: { onStart: () => void }) {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  return (
    <div className="card overflow-hidden">
      {/* Warm gradient banner */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sand-300 via-sage-300 to-periwinkle-300" />
      <div className="px-5 py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-stone-400 text-xs font-medium">{date}</p>
          <p className="text-stone-900 font-semibold text-[17px] leading-snug">
            How did today go?
          </p>
          <p className="text-stone-400 text-sm">Takes less than a minute.</p>
        </div>

        <button onClick={onStart} className="btn-primary relative overflow-hidden group">
          <span className="absolute inset-3 rounded-xl bg-white/10 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out" />
          <span className="relative">Begin today's reflection →</span>
        </button>
      </div>
    </div>
  )
}

function CompletedCard({ entry, onEdit }: { entry: Entry; onEdit: () => void }) {
  return (
    <div className="card overflow-hidden animate-scale-up">
      <div className="h-1.5 w-full bg-gradient-to-r from-sage-300 to-sage-200" />
      <div className="px-5 py-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-stone-500 text-sm font-medium">Today's reflection</p>
          <span className={`pill ${ratingBg(entry.rating)}`}>
            {ratingEmoji(entry.rating)} {ratingLabel(entry.rating)}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <QuoteRow label="Got 1% better" text={entry.betterBy} />
          <QuoteRow label="Grateful for"  text={entry.grateful} />
        </div>

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((t) => <TagPill key={t} tag={t} />)}
          </div>
        )}

        <button onClick={onEdit} className="btn-ghost">
          Edit today's entry
        </button>
      </div>
    </div>
  )
}

function QuoteRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      <p className="text-stone-700 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: React.ReactNode; sub: string }) {
  return (
    <div className="card px-4 py-4 hover:shadow-warm-lg transition-shadow duration-300">
      <p className="section-label mb-2">{label}</p>
      <p className="text-stone-900 font-semibold text-xl leading-none mb-1">{value}</p>
      <p className="text-stone-400 text-xs">{sub}</p>
    </div>
  )
}
