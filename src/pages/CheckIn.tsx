import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveEntry, getEntryByDate, getTodayDateString } from '../storage'
import { autoTag, categorizeStressor, extractHappinessDrivers } from '../categorize'
import { Entry } from '../types'
import RatingPicker from '../components/RatingPicker'

const FIELDS = [
  {
    key: 'betterBy' as const,
    eyebrow: 'Growth',
    prompt: 'I got 1% better today by…',
    placeholder: 'A small win, a new habit, a kinder moment…',
    bg: 'from-sage-50 to-sand-50',
    dot: 'bg-sage-400',
  },
  {
    key: 'grateful' as const,
    eyebrow: 'Gratitude',
    prompt: "I'm grateful for…",
    placeholder: 'A person, a feeling, something simple…',
    bg: 'from-sand-100 to-sand-50',
    dot: 'bg-sand-400',
  },
  {
    key: 'goalWorked' as const,
    eyebrow: 'Purpose',
    prompt: 'One goal I worked toward…',
    placeholder: 'Fitness, career, creativity, connection…',
    bg: 'from-periwinkle-50 to-sand-50',
    dot: 'bg-periwinkle-400',
  },
  {
    key: 'bothered' as const,
    eyebrow: 'Release',
    prompt: 'One thing that bothered me…',
    placeholder: 'Name it honestly, then let it go…',
    bg: 'from-rose-50 to-sand-50',
    dot: 'bg-rose-300',
  },
]

export default function CheckIn() {
  const navigate = useNavigate()
  const today    = getTodayDateString()
  const existing = getEntryByDate(today)

  const [values, setValues] = useState({
    betterBy:   existing?.betterBy   ?? '',
    grateful:   existing?.grateful   ?? '',
    goalWorked: existing?.goalWorked ?? '',
    bothered:   existing?.bothered   ?? '',
    rating:     existing?.rating     ?? 3,
  })
  const [step, setStep]           = useState(0)
  const [dir,  setDir]            = useState<'fwd' | 'back'>('fwd')
  const [animKey, setAnimKey]     = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const totalSteps   = FIELDS.length + 1
  const isRatingStep = step === FIELDS.length
  const field        = !isRatingStep ? FIELDS[step] : null
  const progress     = ((step + 1) / totalSteps) * 100

  useEffect(() => {
    if (!isRatingStep) setTimeout(() => textareaRef.current?.focus(), 100)
  }, [step, isRatingStep])

  function canAdvance() {
    if (isRatingStep) return true
    return values[field!.key].trim().length > 0
  }

  function go(next: number) {
    setDir(next > step ? 'fwd' : 'back')
    setAnimKey((k) => k + 1)
    setStep(next)
  }

  function submit() {
    const { category: stressorCategory, related: stressorRelated } = categorizeStressor(values.bothered)
    const happinessDrivers = extractHappinessDrivers(values)
    const tags = autoTag(values)
    const now  = new Date().toISOString()
    const entry: Entry = {
      date: today, betterBy: values.betterBy, grateful: values.grateful,
      goalWorked: values.goalWorked, bothered: values.bothered, rating: values.rating,
      tags, stressorCategory, stressorRelated, happinessDrivers,
      createdAt: existing?.createdAt ?? now, updatedAt: now,
    }
    saveEntry(entry)
    navigate('/done', { replace: true })
  }

  const slideClass = dir === 'fwd' ? 'animate-fade-up' : 'animate-fade-down'

  return (
    <div className={`flex flex-col min-h-dvh bg-gradient-to-b ${field?.bg ?? 'from-sand-100 to-sand-50'} transition-colors duration-700`}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-3">
        <button
          onClick={() => step > 0 ? go(step - 1) : navigate('/')}
          className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-all active:scale-90 shadow-warm-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {FIELDS.map((f, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i < step ? 'w-4 bg-stone-900' : i === step ? 'w-6 bg-stone-900' : 'w-4 bg-stone-200'
              } ${isRatingStep ? 'bg-stone-900' : ''}`}
            />
          ))}
          <div className={`h-1.5 rounded-full transition-all duration-500 ${isRatingStep ? 'w-6 bg-stone-900' : 'w-4 bg-stone-200'}`} />
        </div>
        <span className="text-stone-400 text-sm font-medium w-9 text-right">{step + 1}/{totalSteps}</span>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col justify-center px-5 py-6 gap-6 ${slideClass}`} key={animKey}>
        {field && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${field.dot}`} />
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">{field.eyebrow}</span>
              </div>
              <label className="font-display text-[26px] font-medium text-stone-900 leading-snug" htmlFor="entry-input">
                {field.prompt}
              </label>
            </div>

            <textarea
              id="entry-input"
              ref={textareaRef}
              rows={5}
              value={values[field.key]}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canAdvance()) {
                  step < totalSteps - 1 ? go(step + 1) : submit()
                }
              }}
              placeholder={field.placeholder}
              className="w-full bg-white/60 border border-sand-200 focus:border-stone-400 focus:bg-white/90 focus:ring-2 focus:ring-stone-200/50 rounded-2xl px-4 py-4 text-stone-800 placeholder-stone-300 text-[15px] leading-relaxed transition-all duration-200 backdrop-blur-sm"
            />
            <p className="text-stone-300 text-xs text-right">⌘↵ to continue</p>
          </>
        )}

        {isRatingStep && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sand-400" />
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Day rating</span>
              </div>
              <p className="font-display text-[26px] font-medium text-stone-900">
                How was today, really?
              </p>
            </div>
            <RatingPicker value={values.rating} onChange={(v) => setValues((vals) => ({ ...vals, rating: v }))} />
          </>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-10">
        <button
          onClick={() => step < totalSteps - 1 ? go(step + 1) : submit()}
          disabled={!canAdvance()}
          className="btn-primary disabled:bg-stone-200 disabled:text-stone-400"
        >
          {isRatingStep ? (existing ? 'Update reflection' : 'Save reflection') : 'Continue'}
        </button>
      </div>
    </div>
  )
}
