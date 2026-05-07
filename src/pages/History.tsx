import { useState } from 'react'
import { getAllEntries, saveEntry } from '../storage'
import { autoTag, categorizeStressor, extractHappinessDrivers } from '../categorize'
import { Entry } from '../types'
import { ratingEmoji, ratingLabel, ratingBg } from '../components/RatingPicker'
import RatingPicker from '../components/RatingPicker'
import TagPill from '../components/TagPill'

export default function History() {
  const [entries, setEntries] = useState(() => getAllEntries().slice().reverse())
  const [open,    setOpen]    = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)

  function handleSave(updated: Entry) {
    saveEntry(updated)
    setEntries(getAllEntries().slice().reverse())
    setEditing(null)
  }

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
              isEditing={editing === entry.date}
              onToggle={() => {
                if (editing === entry.date) return
                setOpen(open === entry.date ? null : entry.date)
              }}
              onEdit={() => {
                setOpen(entry.date)
                setEditing(entry.date)
              }}
              onCancel={() => setEditing(null)}
              onSave={handleSave}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

interface CardProps {
  entry:     Entry
  isOpen:    boolean
  isEditing: boolean
  onToggle:  () => void
  onEdit:    () => void
  onCancel:  () => void
  onSave:    (e: Entry) => void
}

function EntryCard({ entry, isOpen, isEditing, onToggle, onEdit, onCancel, onSave }: CardProps) {
  const [draft, setDraft] = useState<Entry>(entry)

  // Reset draft if entry changes (after save)
  function startEdit() {
    setDraft(entry)
    onEdit()
  }

  function save() {
    const { category: stressorCategory, related: stressorRelated } = categorizeStressor(draft.bothered)
    const happinessDrivers = extractHappinessDrivers(draft)
    const tags = autoTag(draft)
    onSave({
      ...draft,
      stressorCategory,
      stressorRelated,
      happinessDrivers,
      tags,
      updatedAt: new Date().toISOString(),
    })
  }

  const date = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric',
  })

  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
      isOpen ? 'border-stone-200 shadow-warm' : 'border-sand-200/60 shadow-warm-sm'
    }`}>
      {/* Header row — always visible */}
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
          {entry.freeWrite && !isOpen && (
            <span className="text-[10px] text-violet-500 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full font-medium">
              Journal
            </span>
          )}
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

      {/* Expanded body */}
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-5 flex flex-col gap-4 border-t border-sand-100 pt-4">

          {isEditing ? (
            /* ── EDIT MODE ── */
            <>
              <EditField label="Got 1% better" value={draft.betterBy}   onChange={(v) => setDraft((d) => ({ ...d, betterBy: v }))} />
              <EditField label="Grateful for"  value={draft.grateful}   onChange={(v) => setDraft((d) => ({ ...d, grateful: v }))} />
              <EditField label="Worked toward" value={draft.goalWorked} onChange={(v) => setDraft((d) => ({ ...d, goalWorked: v }))} />
              <EditField label="Bothered by"   value={draft.bothered}   onChange={(v) => setDraft((d) => ({ ...d, bothered: v }))} />

              <div className="flex flex-col gap-1.5">
                <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">Day rating</span>
                <RatingPicker value={draft.rating} onChange={(v) => setDraft((d) => ({ ...d, rating: v }))} />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">Free write</span>
                <textarea
                  rows={5}
                  value={draft.freeWrite}
                  onChange={(e) => setDraft((d) => ({ ...d, freeWrite: e.target.value }))}
                  placeholder="Write freely…"
                  className="w-full bg-sand-50 border border-sand-200 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-200/50 rounded-2xl px-4 py-3 text-stone-800 placeholder-stone-300 text-sm leading-relaxed transition-all duration-200"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={save}
                  className="flex-1 py-3 rounded-2xl bg-stone-900 text-white text-sm font-medium active:scale-[0.98] transition-transform"
                >
                  Save changes
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-2xl bg-sand-100 text-stone-600 text-sm font-medium active:scale-[0.98] transition-transform border border-sand-200"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            /* ── READ MODE ── */
            <>
              <Row label="Got 1% better" text={entry.betterBy} />
              <Row label="Grateful for"  text={entry.grateful} />
              <Row label="Worked toward" text={entry.goalWorked} />
              <Row label="Bothered by"   text={entry.bothered} />

              {entry.freeWrite && (
                <div className="flex flex-col gap-1 pt-1 border-t border-sand-100">
                  <span className="text-violet-400 text-[11px] font-semibold uppercase tracking-wider">Free write</span>
                  <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">{entry.freeWrite}</p>
                </div>
              )}

              {entry.stressorCategory !== 'Other' && (
                <div className="flex items-center gap-2">
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

              <button
                onClick={startEdit}
                className="w-full py-2.5 rounded-2xl border border-sand-200 text-stone-500 text-sm font-medium hover:bg-sand-50 active:scale-[0.98] transition-all duration-150 mt-1"
              >
                Edit this entry
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      <p className="text-stone-700 text-sm leading-relaxed">{text || <span className="italic text-stone-300">—</span>}</p>
    </div>
  )
}

function EditField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-sand-50 border border-sand-200 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-200/50 rounded-2xl px-4 py-3 text-stone-800 placeholder-stone-300 text-sm leading-relaxed transition-all duration-200"
      />
    </div>
  )
}
