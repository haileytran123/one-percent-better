import { useNavigate } from 'react-router-dom'
import Luma from '../components/Luma'
import { LumaStage, LumaState, STAGE_META, computeLumaState } from '../luma'
import { getAllEntries, getThisWeekEntries, getStreak } from '../storage'

const ALL_STAGES: LumaStage[] = [
  'new_sprout', 'first_leaves', 'growing', 'thriving', 'flourishing', 'fully_bloomed',
]

const STAGE_THRESHOLDS: Record<LumaStage, number> = {
  new_sprout:    7,
  first_leaves:  21,
  growing:       41,
  thriving:      71,
  flourishing:   100,
  fully_bloomed: Infinity,
}

function stagePreviewState(stage: LumaStage): LumaState {
  return {
    stage,
    mood:      stage === 'fully_bloomed' ? 'blooming' : stage === 'flourishing' ? 'glowing' : 'calm',
    totalDays: 0,
    droop:     0,
    hasGlow:   stage === 'fully_bloomed' || stage === 'flourishing',
    message:   STAGE_META[stage].caption,
  }
}

export default function LumaPage() {
  const navigate    = useNavigate()
  const allEntries  = getAllEntries()
  const weekEntries = getThisWeekEntries()
  const streak      = getStreak()
  const luma        = computeLumaState(allEntries, weekEntries, streak)

  const currentIdx  = ALL_STAGES.indexOf(luma.stage)
  const total       = luma.totalDays
  const nextThresh  = STAGE_THRESHOLDS[luma.stage]
  const isMaxStage  = luma.stage === 'fully_bloomed'

  // Progress within current stage
  const stageStart  = currentIdx === 0 ? 0
    : STAGE_THRESHOLDS[ALL_STAGES[currentIdx - 1]]
  const stageRange  = isMaxStage ? 1 : nextThresh - stageStart
  const stageProgress = isMaxStage ? 1 : Math.min(1, (total - stageStart) / stageRange)
  const daysUntilNext = isMaxStage ? 0 : nextThresh - total

  const moodLabel =
    luma.mood === 'blooming'   ? 'Blooming'
    : luma.mood === 'glowing'  ? 'Glowing'
    : luma.mood === 'tender'   ? 'Taking it easy'
    : luma.mood === 'reflective' ? 'Reflective'
    : 'Growing steadily'

  const completionRate = weekEntries.length / 7
  const weekPct = Math.round(completionRate * 100)

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sand-50 to-white pb-10">

      {/* Header */}
      <div className="flex items-center px-5 pt-12 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 transition-colors -ml-1"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Hero — Luma large, centered */}
      <div className="flex flex-col items-center gap-3 px-5 pt-6 pb-8 animate-fade-down">
        <div className="relative flex items-center justify-center">
          <Luma state={luma} size={130} />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="text-[11px] font-semibold text-sage-600 bg-sage-100 px-3 py-1 rounded-full tracking-widest uppercase">
            {STAGE_META[luma.stage].label}
          </span>
          <p className="font-display text-2xl font-semibold text-stone-900 mt-1">{moodLabel}</p>
          <p className="text-stone-400 text-sm italic leading-relaxed max-w-[240px]">{luma.message}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5 px-5 animate-fade-up delay-75">
        <StatTile label="Days logged" value={String(total || 0)} />
        <StatTile label="Streak"      value={streak > 0 ? `${streak}d` : '—'} />
        <StatTile label="This week"   value={`${weekPct}%`} />
      </div>

      {/* Progress to next stage */}
      {!isMaxStage && (
        <div className="px-5 mt-5 animate-fade-up delay-100">
          <div className="card px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-stone-600 text-sm font-medium">
                Next: {STAGE_META[ALL_STAGES[currentIdx + 1]].label}
              </p>
              <p className="text-stone-400 text-xs">
                {daysUntilNext} day{daysUntilNext !== 1 ? 's' : ''} away
              </p>
            </div>
            <div className="h-1.5 bg-sand-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sage-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.round(stageProgress * 100)}%` }}
              />
            </div>
            <p className="text-stone-400 text-[11px] italic">
              {STAGE_META[ALL_STAGES[currentIdx + 1]].caption}
            </p>
          </div>
        </div>
      )}
      {isMaxStage && (
        <div className="px-5 mt-5 animate-fade-up delay-100">
          <div className="card px-5 py-4 text-center">
            <p className="text-sage-600 text-sm font-medium">Full bloom reached</p>
            <p className="text-stone-400 text-xs italic mt-1">A beautiful reflection of your journey.</p>
          </div>
        </div>
      )}

      {/* Journey timeline */}
      <div className="px-5 mt-7 animate-fade-up delay-150">
        <p className="section-label mb-4">Luma's Journey</p>

        <div className="flex flex-col gap-2.5">
          {ALL_STAGES.map((stage, i) => {
            const isCurrent = stage === luma.stage
            const isPast    = i < currentIdx
            const isFuture  = i > currentIdx
            const meta      = STAGE_META[stage]

            return (
              <div
                key={stage}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-sage-50 border border-sage-200 shadow-warm-sm'
                    : isPast
                    ? 'bg-sand-50 border border-sand-100'
                    : 'bg-white border border-sand-100 opacity-45'
                }`}
              >
                {/* Stage number + connector */}
                <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent  ? 'bg-sage-500 text-white'
                    : isPast   ? 'bg-sage-200 text-sage-700'
                    : 'bg-sand-200 text-stone-400'
                  }`}>
                    {isPast ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                </div>

                {/* Mini Luma preview */}
                <div className={isFuture ? 'opacity-40 grayscale' : ''}>
                  <Luma state={stagePreviewState(stage)} size={40} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-stone-800' : isPast ? 'text-stone-600' : 'text-stone-400'}`}>
                    {meta.label}
                  </p>
                  <p className="text-[11px] text-stone-400">{meta.range}</p>
                  {isCurrent && (
                    <p className="text-[10px] italic text-sage-600 mt-0.5 leading-relaxed">{meta.caption}</p>
                  )}
                </div>

                {isCurrent && (
                  <span className="shrink-0 text-[9px] font-semibold text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full tracking-wide uppercase">
                    Now
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Closing message */}
      <div className="px-5 mt-7 animate-fade-up delay-225">
        <div className="rounded-3xl bg-stone-900 px-6 py-5">
          <p className="font-display text-stone-100 text-base leading-relaxed">
            Every reflection plants a seed.
          </p>
          <p className="text-stone-400 text-sm mt-1.5 leading-relaxed">
            Luma grows with you — quietly, consistently, without judgment.
          </p>
        </div>
      </div>

    </div>
  )
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-3 py-3.5 flex flex-col gap-1 items-center text-center">
      <p className="text-stone-900 font-semibold text-lg leading-none">{value}</p>
      <p className="text-stone-400 text-[10px]">{label}</p>
    </div>
  )
}
