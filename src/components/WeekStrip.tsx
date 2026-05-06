import { getThisWeekDates, getEntryByDate, getTodayDateString } from '../storage'
import { ratingEmoji } from './RatingPicker'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function WeekStrip() {
  const dates = getThisWeekDates()
  const today = getTodayDateString()

  return (
    <div className="flex justify-between gap-1">
      {dates.map((date, i) => {
        const entry   = getEntryByDate(date)
        const isToday = date === today
        const isPast  = date < today

        return (
          <div
            key={date}
            className="flex flex-col items-center gap-2 flex-1 animate-fade-up"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <span className="text-[11px] text-stone-400 font-medium">{DAY_LABELS[i]}</span>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                entry
                  ? 'bg-stone-900 text-white shadow-warm scale-105'
                  : isToday
                  ? 'border-2 border-stone-900 text-stone-900 bg-transparent'
                  : isPast
                  ? 'bg-sand-200 text-stone-300'
                  : 'bg-sand-100 text-stone-200 border border-dashed border-sand-300'
              }`}
            >
              {entry ? ratingEmoji(entry.rating) : isToday ? '·' : '·'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
