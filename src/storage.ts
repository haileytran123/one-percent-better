import { Entry, WeekInsights, StressorCategory, HappinessDriver } from './types'

const KEY = '1percent_entries'

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

export function getAllEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Partial<Entry>[]
    // Migrate old entries that are missing fields added in later versions
    return parsed.map((e) => ({
      date:               e.date ?? '',
      betterBy:           e.betterBy ?? '',
      grateful:           e.grateful ?? '',
      goalWorked:         e.goalWorked ?? '',
      bothered:           e.bothered ?? '',
      rating:             e.rating ?? 3,
      tags:               e.tags ?? [],
      stressorCategory:   e.stressorCategory ?? 'Other',
      stressorRelated:    e.stressorRelated ?? [],
      happinessDrivers:   e.happinessDrivers ?? [],
      createdAt:          e.createdAt ?? '',
      updatedAt:          e.updatedAt ?? e.createdAt ?? '',
    }))
  } catch {
    return []
  }
}

export function getEntryByDate(date: string): Entry | undefined {
  return getAllEntries().find((e) => e.date === date)
}

// Always upserts by date — one entry per calendar day
export function saveEntry(entry: Entry): void {
  const entries = getAllEntries().filter((e) => e.date !== entry.date)
  entries.push(entry)
  entries.sort((a, b) => a.date.localeCompare(b.date))
  localStorage.setItem(KEY, JSON.stringify(entries))
}

export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}

// ---------------------------------------------------------------------------
// Streak
// ---------------------------------------------------------------------------

export function getStreak(): number {
  const entries = getAllEntries()
  if (entries.length === 0) return 0
  const today = getTodayDateString()
  let streak = 0
  const cursor = new Date(today)
  while (true) {
    const dateStr = cursor.toISOString().slice(0, 10)
    if (!entries.find((e) => e.date === dateStr)) break
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

// ---------------------------------------------------------------------------
// Momentum score: +1 per day, +0.5 bonus per consecutive day
// ---------------------------------------------------------------------------

export function getMomentumScore(): { score: number; trend: 'up' | 'down' | 'neutral' } {
  const entries = getAllEntries()
  if (entries.length === 0) return { score: 0, trend: 'neutral' }

  let score = 0
  let prevDate: Date | null = null
  for (const e of entries) {
    score += 1
    if (prevDate) {
      const diff = (new Date(e.date).getTime() - prevDate.getTime()) / 86400000
      if (diff === 1) score += 0.5
    }
    prevDate = new Date(e.date)
  }

  const today = new Date(getTodayDateString())
  const last7 = entries.filter((e) => {
    const diff = (today.getTime() - new Date(e.date).getTime()) / 86400000
    return diff >= 0 && diff < 7
  }).length
  const prior7 = entries.filter((e) => {
    const diff = (today.getTime() - new Date(e.date).getTime()) / 86400000
    return diff >= 7 && diff < 14
  }).length

  return {
    score: Math.round(score * 10) / 10,
    trend: last7 > prior7 ? 'up' : last7 < prior7 ? 'down' : 'neutral',
  }
}

// ---------------------------------------------------------------------------
// Week helpers
// ---------------------------------------------------------------------------

export function getThisWeekDates(): string[] {
  const now = new Date()
  const dayOfWeek = (now.getDay() + 6) % 7 // Mon = 0
  const monday = new Date(now)
  monday.setDate(now.getDate() - dayOfWeek)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.toISOString().slice(0, 10)
  })
}

export function getThisWeekEntries(): Entry[] {
  const dates = new Set(getThisWeekDates())
  return getAllEntries().filter((e) => dates.has(e.date))
}

// ---------------------------------------------------------------------------
// Weekly insights
// ---------------------------------------------------------------------------

export function buildWeekInsights(entries: Entry[]): WeekInsights {
  const today = getTodayDateString()
  const weekDates = getThisWeekDates()
  // elapsedDays = days in the week that have already passed (including today)
  const elapsedDays = weekDates.filter((d) => d <= today).length

  const empty: WeekInsights = {
    avgRating: null,
    moodDistribution: { good: 0, neutral: 0, bad: 0 },
    completedDays: 0,
    elapsedDays,
    topWins: [],
    stressorCategories: [],
    happinessDrivers: [],
    keywordInsights: [],
    suggestedFocus: '',
  }

  if (entries.length === 0) return empty

  const avgRating =
    Math.round((entries.reduce((s, e) => s + e.rating, 0) / entries.length) * 10) / 10

  const moodDistribution = { good: 0, neutral: 0, bad: 0 }
  entries.forEach((e) => {
    if (e.rating >= 4) moodDistribution.good++
    else if (e.rating === 3) moodDistribution.neutral++
    else moodDistribution.bad++
  })

  const topWins = entries.map((e) => e.betterBy).filter(Boolean).slice(0, 5)

  // Stressor category frequency
  const stressorMap = new Map<StressorCategory, number>()
  entries.forEach((e) => {
    stressorMap.set(e.stressorCategory, (stressorMap.get(e.stressorCategory) ?? 0) + 1)
  })
  const stressorCategories = [...stressorMap.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)

  // Happiness driver frequency
  const driverMap = new Map<HappinessDriver, number>()
  entries.forEach((e) => {
    e.happinessDrivers.forEach((d) => {
      driverMap.set(d, (driverMap.get(d) ?? 0) + 1)
    })
  })
  const happinessDrivers = [...driverMap.entries()]
    .map(([driver, count]) => ({ driver, count }))
    .sort((a, b) => b.count - a.count)

  // Pattern insights from full history
  const allEntries = getAllEntries()
  const keywordInsights: string[] = []

  if (allEntries.length >= 5) {
    const allText = allEntries.map((e) => ({
      words: [e.betterBy, e.grateful, e.goalWorked]
        .join(' ')
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3),
      rating: e.rating,
    }))

    const STOP = new Set(['that','this','with','have','been','they','from','your','more','also','some','when','will','what','just'])
    const wordStats = new Map<string, { total: number; sumRating: number }>()
    allText.forEach(({ words, rating }) => {
      new Set(words).forEach((w) => {
        if (STOP.has(w)) return
        const s = wordStats.get(w) ?? { total: 0, sumRating: 0 }
        s.total++
        s.sumRating += rating
        wordStats.set(w, s)
      })
    })

    const overallAvg = allEntries.reduce((s, e) => s + e.rating, 0) / allEntries.length
    wordStats.forEach((stat, word) => {
      if (stat.total < 2) return
      const avg = stat.sumRating / stat.total
      if (avg >= overallAvg + 0.8) {
        keywordInsights.push(`You tend to feel better on days you mention "${word}"`)
      }
    })
  }

  // Suggested focus: based on most common stressor this week
  const topStressor = stressorCategories[0]?.category
  const focusMap: Partial<Record<StressorCategory, string>> = {
    'Sleep':           'Prioritise getting 7–8 hours. Your mood data shows sleep has an outsized impact.',
    'Work':            'Try time-blocking tomorrow — protect 90 min of deep work before checking messages.',
    'Diet / nutrition':'Plan one nutritious meal in advance. Small food wins compound fast.',
    'Fitness':         'Even a 20-min walk counts. Consistency beats intensity.',
    'Relationships':   "Reach out to one person you've been meaning to connect with.",
    'Money':           'Spend 15 min reviewing your budget. Clarity reduces financial anxiety.',
    'Self-doubt':      'Write down three things you did well this week. Evidence beats feelings.',
    'Time management': 'Pick your top 3 priorities for tomorrow tonight — before you sleep.',
    'Health':          "Book that appointment or take that rest day you've been skipping.",
    'Social life':     "Plan one low-effort social event. Quality time doesn't need to be elaborate.",
    'Family':          'A short check-in call can go a long way.',
  }
  const suggestedFocus = topStressor ? (focusMap[topStressor] ?? '') : ''

  return {
    avgRating,
    moodDistribution,
    completedDays: entries.length,
    elapsedDays,
    topWins,
    stressorCategories,
    happinessDrivers,
    keywordInsights: keywordInsights.slice(0, 3),
    suggestedFocus,
  }
}
