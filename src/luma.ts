import { Entry } from './types'

export type LumaStage =
  | 'new_sprout'    // Day 1
  | 'first_leaves'  // 7–20 days
  | 'growing'       // 21–40 days
  | 'thriving'      // 41–70 days
  | 'flourishing'   // 71–100 days
  | 'fully_bloomed' // 100+ days

export type LumaMood =
  | 'calm'
  | 'glowing'
  | 'reflective'
  | 'tender'
  | 'blooming'

export interface LumaState {
  stage:       LumaStage
  mood:        LumaMood
  totalDays:   number
  droop:       number
  hasGlow:     boolean
  message:     string
}

export const STAGE_META: Record<LumaStage, { label: string; range: string; caption: string }> = {
  new_sprout:    { label: 'New Sprout',    range: 'Day 1',        caption: 'A tiny spark of intention.' },
  first_leaves:  { label: 'First Leaves',  range: '7–20 days',   caption: 'A new habit begins to take root.' },
  growing:       { label: 'Growing',       range: '21–40 days',  caption: "You're showing up. Luma grows with you." },
  thriving:      { label: 'Thriving',      range: '41–70 days',  caption: 'Consistency builds strength and balance.' },
  flourishing:   { label: 'Flourishing',   range: '71–100 days', caption: 'Your growth inspires more growth.' },
  fully_bloomed: { label: 'Fully Bloomed', range: '100+ days',   caption: 'A beautiful reflection of your journey.' },
}

export function computeLumaState(
  allEntries: Entry[],
  weekEntries: Entry[],
  streak: number
): LumaState {
  const total = allEntries.length

  const stage: LumaStage =
    total === 0     ? 'new_sprout'
    : total < 7     ? 'new_sprout'
    : total < 21    ? 'first_leaves'
    : total < 41    ? 'growing'
    : total < 71    ? 'thriving'
    : total < 100   ? 'flourishing'
    :                 'fully_bloomed'

  const avgRating = weekEntries.length > 0
    ? weekEntries.reduce((s, e) => s + e.rating, 0) / weekEntries.length
    : null

  const completionRate  = weekEntries.length / 7
  const hasStressor     = weekEntries.some((e) => e.stressorCategory !== 'Other')
  const isConsistent    = completionRate >= 0.7
  const isPerfectWeek   = weekEntries.length === 7
  const isLongStreak    = streak >= 7

  let mood: LumaMood
  if (isPerfectWeek || isLongStreak) {
    mood = 'blooming'
  } else if (avgRating !== null && avgRating >= 4 && isConsistent) {
    mood = 'glowing'
  } else if (avgRating !== null && avgRating <= 2.5 && hasStressor) {
    mood = 'tender'
  } else if (isConsistent) {
    mood = 'reflective'
  } else {
    mood = 'calm'
  }

  const hasGlow = mood === 'glowing' || mood === 'blooming'
  const droop   = mood === 'tender' ? 0.18 : 0

  const messages: Record<LumaMood, string[]> = {
    blooming:   ['Something is flourishing here.', 'This kind of consistency is rare.', "You're building something real."],
    glowing:    ['The light is coming through.', 'A strong week. Luma feels it too.', 'Balance looks good on you.'],
    reflective: ['Showing up, even quietly, matters.', 'Reflection is its own form of strength.', 'Luma grows with every entry.'],
    tender:     ["Hard weeks are part of the story too.", "You came back. That's everything.", 'Rest is part of growth.'],
    calm:       ["Every reflection plants a seed.", "Begin when you're ready.", 'Growth starts with noticing.'],
  }

  const pool    = messages[mood]
  const message = pool[total % pool.length]

  return { stage, mood, totalDays: total, droop, hasGlow, message }
}
