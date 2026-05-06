interface Props {
  value: number
  onChange: (v: number) => void
}

const options = [
  { value: 1, emoji: '😞', label: 'Rough'  },
  { value: 2, emoji: '😕', label: 'Meh'    },
  { value: 3, emoji: '😐', label: 'Okay'   },
  { value: 4, emoji: '🙂', label: 'Good'   },
  { value: 5, emoji: '😄', label: 'Great'  },
]

export default function RatingPicker({ value, onChange }: Props) {
  return (
    <div className="flex justify-between gap-2">
      {options.map((opt, i) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{ animationDelay: `${i * 55}ms` }}
            className={`animate-fade-up flex flex-col items-center gap-1.5 flex-1 py-3.5 rounded-2xl border transition-all duration-200 ${
              selected
                ? 'border-stone-900 bg-stone-900 scale-105 shadow-warm'
                : 'border-sand-200 bg-white hover:border-stone-300 hover:scale-[1.03] active:scale-95'
            }`}
          >
            <span className={`text-2xl leading-none transition-transform duration-200 ${selected ? 'scale-110' : ''}`}>
              {opt.emoji}
            </span>
            <span className={`text-[11px] font-medium ${selected ? 'text-white' : 'text-stone-400'}`}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function ratingEmoji(rating: number): string {
  return options.find((o) => o.value === Math.round(rating))?.emoji ?? '😐'
}
export function ratingLabel(rating: number): string {
  return options.find((o) => o.value === Math.round(rating))?.label ?? 'Okay'
}
export function ratingBg(rating: number): string {
  const map: Record<number, string> = {
    1: 'bg-red-100 text-red-700',
    2: 'bg-orange-100 text-orange-700',
    3: 'bg-sand-200 text-stone-600',
    4: 'bg-sage-100 text-sage-700',
    5: 'bg-sage-200 text-sage-800',
  }
  return map[Math.round(rating)] ?? 'bg-sand-100 text-stone-500'
}
