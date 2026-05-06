interface Props { streak: number }

export default function StreakBadge({ streak }: Props) {
  if (streak === 0) return null
  return (
    <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
      🔥 {streak} day{streak !== 1 ? 's' : ''}
    </span>
  )
}
