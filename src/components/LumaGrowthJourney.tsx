import Luma from './Luma'
import { LumaStage, LumaState, STAGE_META } from '../luma'

const ALL_STAGES: LumaStage[] = [
  'new_sprout', 'first_leaves', 'growing', 'thriving', 'flourishing', 'fully_bloomed',
]

function stageState(stage: LumaStage): LumaState {
  return {
    stage,
    mood:      stage === 'fully_bloomed' ? 'blooming' : 'calm',
    totalDays: 0,
    droop:     0,
    hasGlow:   stage === 'fully_bloomed' || stage === 'flourishing',
    message:   STAGE_META[stage].caption,
  }
}

interface Props {
  currentStage: LumaStage
}

export default function LumaGrowthJourney({ currentStage }: Props) {
  const currentIdx = ALL_STAGES.indexOf(currentStage)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-display text-lg font-semibold text-stone-800">Luma's Growth Journey</p>
        <p className="text-stone-400 text-xs mt-0.5">A living reflection of your consistency and growth.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ALL_STAGES.map((stage, i) => {
          const meta      = STAGE_META[stage]
          const isCurrent = stage === currentStage
          const isPast    = i < currentIdx
          const isFuture  = i > currentIdx

          return (
            <div
              key={stage}
              className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-4 transition-all duration-300 ${
                isCurrent
                  ? 'bg-sage-50 border border-sage-200 shadow-warm-sm'
                  : isPast
                  ? 'bg-sand-50 border border-sand-100 opacity-70'
                  : 'bg-white border border-sand-100 opacity-40'
              }`}
            >
              <div className={isFuture ? 'grayscale opacity-50' : ''}>
                <Luma state={stageState(stage)} size={52} />
              </div>
              <div className="text-center">
                <p className={`text-[11px] font-semibold ${isCurrent ? 'text-sage-700' : 'text-stone-500'}`}>
                  {meta.label}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">{meta.range}</p>
              </div>
              {isCurrent && (
                <span className="text-[9px] font-semibold text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full tracking-wide uppercase">
                  You are here
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Current stage caption */}
      <p className="text-stone-400 text-xs italic text-center leading-relaxed px-4">
        {STAGE_META[currentStage].caption}
      </p>
    </div>
  )
}
