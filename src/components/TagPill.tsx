const TAG_STYLES: Record<string, string> = {
  work:    'bg-periwinkle-100 text-periwinkle-700 border-periwinkle-200',
  health:  'bg-sage-100 text-sage-700 border-sage-200',
  friends: 'bg-rose-100 text-rose-700 border-rose-200',
  stress:  'bg-orange-100 text-orange-700 border-orange-200',
  growth:  'bg-sand-200 text-stone-700 border-sand-300',
}

export default function TagPill({ tag }: { tag: string }) {
  const style = TAG_STYLES[tag] ?? 'bg-sand-100 text-stone-500 border-sand-200'
  return (
    <span className={`pill border ${style}`}>
      {tag}
    </span>
  )
}
