import { getThisWeekEntries, getThisWeekDates, buildWeekInsights, getStreak } from '../storage'
import { ratingEmoji } from '../components/RatingPicker'
import MoodChart from '../components/MoodChart'

const DRIVER_STYLE: Record<string, string> = {
  Growth:     'bg-sage-100 text-sage-700 border-sage-200',
  Health:     'bg-lime-50 text-lime-700 border-lime-200',
  Friends:    'bg-rose-50 text-rose-700 border-rose-100',
  Learning:   'bg-periwinkle-100 text-periwinkle-700 border-periwinkle-200',
  Fitness:    'bg-orange-50 text-orange-700 border-orange-200',
  Rest:       'bg-teal-50 text-teal-700 border-teal-200',
  Work:       'bg-periwinkle-50 text-periwinkle-600 border-periwinkle-100',
  Family:     'bg-pink-50 text-pink-700 border-pink-100',
  Food:       'bg-sand-200 text-stone-700 border-sand-300',
  Creativity: 'bg-violet-50 text-violet-700 border-violet-200',
  Other:      'bg-sand-100 text-stone-500 border-sand-200',
}

const STRESSOR_STYLE: Record<string, string> = {
  'Work':             'bg-periwinkle-50 text-periwinkle-700 border-periwinkle-100',
  'Sleep':            'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Diet / nutrition': 'bg-sand-200 text-stone-700 border-sand-300',
  'Fitness':          'bg-orange-50 text-orange-700 border-orange-200',
  'Relationships':    'bg-rose-50 text-rose-700 border-rose-100',
  'Money':            'bg-sage-50 text-sage-700 border-sage-100',
  'Health':           'bg-red-50 text-red-600 border-red-100',
  'Time management':  'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Self-doubt':       'bg-purple-50 text-purple-700 border-purple-100',
  'Social life':      'bg-pink-50 text-pink-600 border-pink-100',
  'Family':           'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
  'Other':            'bg-sand-100 text-stone-500 border-sand-200',
}

export default function WeeklySummary() {
  const entries   = getThisWeekEntries()
  const weekDates = getThisWeekDates()
  const insights  = buildWeekInsights(entries)
  const streak    = getStreak()

  const completionPct = insights.elapsedDays > 0
    ? Math.round((insights.completedDays / insights.elapsedDays) * 100)
    : 0

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-4">
        <span className="text-5xl animate-float">🌱</span>
        <p className="font-display text-xl text-stone-700">Your insights are growing.</p>
        <p className="text-stone-400 text-sm leading-relaxed">
          Complete your first check-in this week<br />to start seeing your patterns.
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 pt-10 pb-8 flex flex-col gap-7">

      {/* Header */}
      <div className="animate-fade-down">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-stone-900">Your patterns</h1>
            <p className="text-stone-400 text-sm mt-0.5">Life data · this week</p>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-white border border-sand-200 px-3 py-1.5 rounded-full shadow-warm-sm">
              <span className="animate-float">🔥</span>
              <span className="text-stone-600 text-xs font-semibold">{streak}d streak</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Summary card */}
      <div className="animate-fade-up delay-75">
        <SummaryCard
          completedDays={insights.completedDays}
          avgRating={insights.avgRating}
          moodDist={insights.moodDistribution}
        />
      </div>

      {/* 2. Mood chart */}
      <div className="animate-fade-up delay-150">
        <p className="section-label mb-3">Mood this week</p>
        <div className="card px-4 py-4">
          <MoodChart entries={entries} weekDates={weekDates} />
        </div>
      </div>

      {/* 3. Stats */}
      <div className="grid grid-cols-3 gap-2.5 animate-fade-up delay-225">
        {[
          { label: 'Avg mood',   value: insights.avgRating !== null ? `${ratingEmoji(insights.avgRating)} ${insights.avgRating}` : '—' },
          { label: 'Logged',     value: `${insights.completedDays} / 7` },
          { label: 'Completion', value: `${completionPct}%` },
        ].map((s, i) => (
          <div key={s.label} className="card p-3.5 flex flex-col gap-1" style={{ animationDelay: `${i * 50}ms` }}>
            <p className="text-stone-900 font-semibold text-lg leading-none">{s.value}</p>
            <p className="text-stone-400 text-[11px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 4. Wins */}
      {insights.topWins.length > 0 && (
        <Section title="What helped · 1% wins" delay="delay-300">
          <div className="flex flex-col gap-2">
            {insights.topWins.map((win, i) => (
              <div
                key={i}
                className="bg-sage-50 border border-sage-100 rounded-2xl px-4 py-3.5 flex gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="text-sage-400 font-bold text-sm mt-0.5 shrink-0">↑</span>
                <p className="text-stone-700 text-sm leading-relaxed">{win}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 5. Happiness drivers */}
      {insights.happinessDrivers.length > 0 && (
        <Section title="Happiness drivers" delay="delay-300">
          <p className="text-xs text-stone-400 -mt-1">Recurring themes from what made you feel good</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {insights.happinessDrivers.map(({ driver, count }, i) => (
              <span
                key={driver}
                className={`pill border animate-scale-up hover:scale-105 transition-transform cursor-default ${DRIVER_STYLE[driver] ?? DRIVER_STYLE.Other}`}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {driver}
                {count > 1 && <span className="opacity-50 ml-0.5">×{count}</span>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Stress patterns */}
      {insights.stressorCategories.length > 0 && (
        <Section title="What drained you" delay="delay-375">
          <p className="text-xs text-stone-400 -mt-1">Categories from your "one thing that bothered me" field</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {insights.stressorCategories.map(({ category, count }, i) => (
              <span
                key={category}
                className={`pill border animate-scale-up hover:scale-105 transition-transform cursor-default ${STRESSOR_STYLE[category] ?? STRESSOR_STYLE.Other}`}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {category}
                {count > 1 && <span className="opacity-50 ml-0.5">×{count}</span>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Pattern insights */}
      {insights.keywordInsights.length > 0 && (
        <Section title="Patterns noticed" delay="delay-375">
          <div className="flex flex-col gap-2">
            {insights.keywordInsights.map((insight, i) => (
              <div
                key={i}
                className="card px-4 py-3.5 flex gap-3 items-start animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="text-base shrink-0 mt-0.5">💡</span>
                <p className="text-stone-600 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 7. Suggested focus */}
      {insights.suggestedFocus && (
        <Section title="Focus for next week" delay="delay-450">
          <div className="bg-stone-900 rounded-3xl px-5 py-5 flex gap-4 items-start shadow-warm-lg">
            <span className="text-xl shrink-0 mt-0.5">🎯</span>
            <p className="text-stone-200 text-sm leading-relaxed">{insights.suggestedFocus}</p>
          </div>
        </Section>
      )}

    </div>
  )
}

// ---------------------------------------------------------------------------

function Section({ title, children, delay = '' }: { title: string; children: React.ReactNode; delay?: string }) {
  return (
    <div className={`flex flex-col gap-2 animate-fade-up ${delay}`}>
      <p className="section-label">{title}</p>
      {children}
    </div>
  )
}

function SummaryCard({
  completedDays, avgRating, moodDist,
}: {
  completedDays: number
  avgRating: number | null
  moodDist: { good: number; neutral: number; bad: number }
}) {
  const total   = moodDist.good + moodDist.neutral + moodDist.bad
  const goodPct = total > 0 ? Math.round((moodDist.good    / total) * 100) : 0
  const neutPct = total > 0 ? Math.round((moodDist.neutral / total) * 100) : 0
  const badPct  = 100 - goodPct - neutPct

  const headline =
    avgRating === null        ? 'Keep going.'
    : avgRating >= 4.5        ? 'What a week. Truly.'
    : avgRating >= 4          ? 'Strong week. You showed up.'
    : avgRating >= 3          ? 'Steady week. Consistency counts.'
    : avgRating >= 2          ? 'Tough week. Still here, still logging.'
    :                           'Hard week. Showing up takes courage.'

  const sub =
    completedDays === 7       ? 'Perfect week — every day logged. Rare and meaningful.'
    : completedDays >= 5      ? `${completedDays} out of 7 days. You're building a real picture of yourself.`
    : completedDays >= 3      ? `${completedDays} entries this week. Every one matters.`
    :                           `${completedDays} day${completedDays !== 1 ? 's' : ''} logged. Start where you are.`

  return (
    <div className="card overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-sand-300 via-sage-300 to-periwinkle-300" />
      <div className="px-5 py-5 flex flex-col gap-4">
        <div>
          <p className="font-display text-xl font-medium text-stone-900">{headline}</p>
          <p className="text-stone-400 text-sm mt-1 leading-relaxed">{sub}</p>
        </div>

        {total > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
              {moodDist.good    > 0 && <div className="bg-sage-400 rounded-full transition-all duration-700" style={{ width: `${goodPct}%` }} />}
              {moodDist.neutral > 0 && <div className="bg-sand-400 rounded-full transition-all duration-700" style={{ width: `${neutPct}%`, transitionDelay: '100ms' }} />}
              {moodDist.bad     > 0 && <div className="bg-red-300 rounded-full transition-all duration-700"  style={{ width: `${badPct}%`,  transitionDelay: '200ms' }} />}
            </div>
            <div className="flex gap-4 text-xs text-stone-400">
              <LegendDot color="bg-sage-400" label={`Good ${goodPct}%`} />
              <LegendDot color="bg-sand-400" label={`Okay ${neutPct}%`} />
              <LegendDot color="bg-red-300"  label={`Rough ${badPct}%`} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
      {label}
    </span>
  )
}
