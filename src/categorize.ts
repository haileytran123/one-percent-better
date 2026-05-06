import { StressorCategory, HappinessDriver } from './types'

// ---------------------------------------------------------------------------
// Stressor categorization
// Rule-based keyword mapping. Each rule is checked in order; first match wins.
// Structure is intentionally separate so AI categorization can replace the
// matchStressor() call later without touching callers.
// ---------------------------------------------------------------------------

interface StressorRule {
  category: StressorCategory
  keywords: string[]
}

const STRESSOR_RULES: StressorRule[] = [
  {
    category: 'Diet / nutrition',
    keywords: ['eat', 'ate', 'food', 'diet', 'meal', 'hungry', 'nutrition', 'calories', 'snack', 'lunch', 'dinner', 'breakfast', 'junk', 'sugar', 'protein'],
  },
  {
    category: 'Sleep',
    keywords: ['sleep', 'slept', 'tired', 'exhausted', 'insomnia', 'rest', 'nap', 'fatigue', 'woke up', "couldn't sleep", 'oversleep'],
  },
  {
    category: 'Work',
    keywords: ['work', 'job', 'boss', 'meeting', 'deadline', 'project', 'office', 'coworker', 'colleague', 'client', 'email', 'manager', 'career', 'presentation', 'task'],
  },
  {
    category: 'Fitness',
    keywords: ['gym', 'workout', 'exercise', 'run', 'running', 'training', 'lift', 'cardio', 'sport', 'class', 'stretch', 'yoga', 'steps', 'walk'],
  },
  {
    category: 'Relationships',
    keywords: ['partner', 'boyfriend', 'girlfriend', 'relationship', 'fight', 'argument', 'breakup', 'dating', 'romantic', 'love', 'hurt', 'ignored', 'lonely'],
  },
  {
    category: 'Money',
    keywords: ['money', 'bills', 'rent', 'finance', 'debt', 'budget', 'expensive', 'cost', 'afford', 'savings', 'payment', 'salary', 'income'],
  },
  {
    category: 'Health',
    keywords: ['sick', 'pain', 'headache', 'doctor', 'health', 'illness', 'injury', 'medication', 'stomach', 'anxious', 'anxiety', 'mental health', 'stress', 'fever'],
  },
  {
    category: 'Time management',
    keywords: ['time', 'late', 'rush', 'busy', 'overwhelm', 'schedule', 'procrastin', 'distract', 'focus', 'productive', 'priorit', 'behind'],
  },
  {
    category: 'Self-doubt',
    keywords: ['doubt', 'confidence', 'insecure', 'failure', 'fail', 'not good enough', 'compare', 'worthless', 'stupid', 'embarrass', 'judge', 'wrong'],
  },
  {
    category: 'Social life',
    keywords: ['friend', 'friends', 'social', 'party', 'hangout', 'invite', 'excluded', 'fomo', 'group', 'people', 'conversation'],
  },
  {
    category: 'Family',
    keywords: ['family', 'mom', 'dad', 'parent', 'sibling', 'brother', 'sister', 'relative', 'home', 'household'],
  },
]

export function categorizeStressor(text: string): { category: StressorCategory; related: string[] } {
  const lower = text.toLowerCase()

  let primary: StressorCategory = 'Other'
  const related: StressorCategory[] = []

  for (const rule of STRESSOR_RULES) {
    const matched = rule.keywords.some((kw) => lower.includes(kw))
    if (matched) {
      if (primary === 'Other') {
        primary = rule.category
      } else {
        related.push(rule.category)
      }
    }
  }

  return {
    category: primary,
    related: related.slice(0, 2),
  }
}

// ---------------------------------------------------------------------------
// Happiness driver extraction
// Scans betterBy + grateful + goalWorked fields.
// ---------------------------------------------------------------------------

interface DriverRule {
  driver: HappinessDriver
  keywords: string[]
}

const DRIVER_RULES: DriverRule[] = [
  { driver: 'Fitness',    keywords: ['gym', 'workout', 'run', 'exercise', 'training', 'lift', 'cardio', 'yoga', 'walk', 'steps', 'sport'] },
  { driver: 'Health',     keywords: ['health', 'sleep', 'sleep well', 'rest', 'recovery', 'energy', 'doctor', 'meditation', 'mindful'] },
  { driver: 'Learning',   keywords: ['learn', 'read', 'book', 'course', 'study', 'research', 'podcast', 'skill', 'practice', 'improve'] },
  { driver: 'Growth',     keywords: ['grow', 'growth', 'improve', 'progress', 'goal', 'better', 'discipline', 'habit', 'focus', 'commit'] },
  { driver: 'Friends',    keywords: ['friend', 'friends', 'hangout', 'catch up', 'coffee', 'dinner', 'chat', 'social', 'laugh', 'time with'] },
  { driver: 'Family',     keywords: ['family', 'mom', 'dad', 'parent', 'sibling', 'home', 'brother', 'sister'] },
  { driver: 'Work',       keywords: ['work', 'project', 'meeting', 'task', 'finished', 'completed', 'shipped', 'client', 'career'] },
  { driver: 'Creativity', keywords: ['creat', 'art', 'design', 'write', 'music', 'photo', 'build', 'code', 'draw', 'idea'] },
  { driver: 'Food',       keywords: ['cook', 'meal', 'eat', 'food', 'recipe', 'bake', 'lunch', 'dinner', 'restaurant', 'coffee', 'tea'] },
  { driver: 'Rest',       keywords: ['rest', 'relax', 'nap', 'slow', 'calm', 'peace', 'recharge', 'unwind', 'chill', 'quiet'] },
]

export function extractHappinessDrivers(fields: {
  betterBy: string
  grateful: string
  goalWorked: string
}): HappinessDriver[] {
  const text = [fields.betterBy, fields.grateful, fields.goalWorked].join(' ').toLowerCase()
  const found: HappinessDriver[] = []

  for (const rule of DRIVER_RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      found.push(rule.driver)
    }
  }

  return found.length > 0 ? found : ['Other']
}

// ---------------------------------------------------------------------------
// Auto-tagger (general purpose tags for the entry)
// ---------------------------------------------------------------------------

const TAG_RULES: { tag: string; keywords: string[] }[] = [
  { tag: 'work',    keywords: ['work', 'job', 'meeting', 'deadline', 'boss', 'project', 'office', 'client', 'email'] },
  { tag: 'health',  keywords: ['gym', 'workout', 'run', 'exercise', 'sleep', 'diet', 'health', 'sick', 'tired', 'energy'] },
  { tag: 'friends', keywords: ['friend', 'friends', 'social', 'hangout', 'party', 'coffee', 'dinner', 'call', 'family'] },
  { tag: 'stress',  keywords: ['stress', 'stressed', 'anxious', 'anxiety', 'overwhelm', 'worry', 'pressure', 'frustrated'] },
  { tag: 'growth',  keywords: ['learn', 'read', 'book', 'course', 'study', 'practice', 'skill', 'improve', 'progress'] },
]

export function autoTag(entry: Pick<{ betterBy: string; grateful: string; goalWorked: string; bothered: string }, 'betterBy' | 'grateful' | 'goalWorked' | 'bothered'>): string[] {
  const text = [entry.betterBy, entry.grateful, entry.goalWorked, entry.bothered].join(' ').toLowerCase()
  return TAG_RULES.filter((r) => r.keywords.some((kw) => text.includes(kw))).map((r) => r.tag)
}
