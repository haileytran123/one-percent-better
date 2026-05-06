import { Entry } from '../types'
import { ratingEmoji } from './RatingPicker'

interface Props {
  entries: Entry[]
  weekDates: string[]
}

const BAR_COLOR: Record<number, string> = {
  1: 'bg-red-300',
  2: 'bg-orange-300',
  3: 'bg-sand-400',
  4: 'bg-sage-400',
  5: 'bg-sage-500',
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function MoodChart({ entries, weekDates }: Props) {
  return (
    <div className="flex items-end justify-between gap-2 h-32">
      {weekDates.map((date, i) => {
        const entry  = entries.find((e) => e.date === date)
        const rating = entry?.rating ?? 0
        const pct    = rating ? (rating / 5) * 100 : 0

        return (
          <div key={date} className="flex flex-col items-center gap-1 flex-1">
            {rating > 0 ? (
              <span className="text-[15px] leading-none animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                {ratingEmoji(rating)}
              </span>
            ) : (
              <span className="text-[15px] leading-none opacity-0">·</span>
            )}

            <div className="w-full flex flex-col justify-end rounded-xl overflow-hidden bg-sand-100" style={{ height: '72px' }}>
              <div
                className={`w-full rounded-xl transition-all duration-700 ease-out ${entry ? BAR_COLOR[rating] : ''}`}
                style={{
                  height: entry ? `${Math.max(pct, 12)}%` : '0%',
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            </div>

            <span className="text-[10px] text-stone-400 font-medium">{DAY_LABELS[i]}</span>
          </div>
        )
      })}
    </div>
  )
}
