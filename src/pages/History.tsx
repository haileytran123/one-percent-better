import { useState } from 'react'
import { getAllEntries } from '../storage'
import { Entry } from '../types'
import { ratingEmoji, ratingLabel, ratingBg } from '../components/RatingPicker'
import TagPill from '../components/TagPill'

export default function History() {
  const entries  = getAllEntries().slice().reverse()
  const [open, setOpen] = useState<string | null>(null)

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-4">
        <span className="text-5xl animate-float">📭</span>
        <p className="font-display text-xl text-stone-700">Nothing here yet.</p>
        <p className="text-stone-400 text-sm leading-relaxed">
          Complete your first check-in to start building<br />your personal dataset.
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 pt-10 pb-6 flex flex-col gap-5">
      <div className="animate-fade-down">
        <h1 className="font-display text-2xl font-semibold text-stone-900">Your history</h1>
        <p className="text-stone-400 text-sm mt-0.5">{entries.length} reflection{entries.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <div
            key={entry.date}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(i * 40, 280)}ms` }}
          >
            <EntryCard
              entry={entry}
              isOpen={open === entry.date}
              onToggle={() => setOpen(open === entry.date ? null : entry.date)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function EntryCard({ entry, isOpen, onToggle }: { entry: Entry; isOpen: boolean; onToggle: () => void }) {
  const date = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric',
  })

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
      isOpen ? 'border-stone-200 shadow-warm' : 'border-sand-200/60 shadow-warm-sm'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3 hover:bg-sand-50 transition-colors duration-150"
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-stone-700 font-medium text-sm">{date}</span>
          {!isOpen && (
            <span className="text-stone-400 text-xs truncate leading-relaxed">{entry.betterBy}</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`pill text-xs ${ratingBg(entry.rating)}`}>
            {ratingEmoji(entry.rating)} {ratingLabel(entry.rating)}
          </span>
          <svg
            className={`w-4 h-4 text-stone-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-5 flex flex-col gap-3.5 border-t border-sand-100 pt-4">
          <Row label="Got 1% better" text={entry.betterBy} />
          <Row label="Grateful for"  text={entry.grateful} />
          <Row label="Worked toward" text={entry.goalWorked} />
          <Row label="Bothered by"   text={entry.bothered} />
          {entry.stressorCategory !== 'Other' && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-stone-400 text-xs">Stress category:</span>
              <span className="pill bg-rose-50 text-rose-600 border border-rose-100 text-xs">
                {entry.stressorCategory}
              </span>
            </div>
          )}
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((t) => <TagPill key={t} tag={t} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      <p className="text-stone-700 text-sm leading-relaxed">{text}</p>
    </div>
  )
}
