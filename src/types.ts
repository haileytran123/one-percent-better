export interface Entry {
  date: string           // "2026-05-04" — primary key, one per calendar day
  betterBy: string
  grateful: string
  goalWorked: string
  bothered: string
  rating: number         // 1–5
  tags: string[]         // auto-generated from content
  stressorCategory: StressorCategory
  stressorRelated: string[]   // secondary categories
  happinessDrivers: HappinessDriver[]
  createdAt: string
  updatedAt: string
}

export type StressorCategory =
  | 'Diet / nutrition'
  | 'Sleep'
  | 'Work'
  | 'Fitness'
  | 'Relationships'
  | 'Money'
  | 'Health'
  | 'Time management'
  | 'Self-doubt'
  | 'Social life'
  | 'Family'
  | 'Other'

export type HappinessDriver =
  | 'Growth'
  | 'Health'
  | 'Friends'
  | 'Learning'
  | 'Fitness'
  | 'Rest'
  | 'Work'
  | 'Family'
  | 'Food'
  | 'Creativity'
  | 'Other'

export interface WeekInsights {
  avgRating: number | null
  moodDistribution: { good: number; neutral: number; bad: number }
  completedDays: number
  elapsedDays: number        // days so far in the week (for accurate completion %)
  topWins: string[]
  stressorCategories: { category: StressorCategory; count: number }[]
  happinessDrivers: { driver: HappinessDriver; count: number }[]
  keywordInsights: string[]
  suggestedFocus: string
}
