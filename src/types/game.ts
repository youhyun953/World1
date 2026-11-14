export type MissionType = 'geography' | 'psychology' | 'exploration';
export type DifficultyLevel = '쉬움' | '보통' | '도전';
export type AppView =
  | 'landing'
  | 'dashboard'
  | 'map'
  | 'mission'
  | 'report'
  | 'passport'
  | 'history'
  | 'ranking';

export interface ResourceDelta {
  budget: number;
  time: number;
  safety: number;
  satisfaction: number;
}

export interface MissionChoice {
  id: string;
  label: string;
  // For psychology missions
  outcomeSummary?: string;
  travelImpact?: string;
  psychologyConcept?: string;
  psychologyExplanation?: string;
  reflectionQuestion?: string;
  resourceDelta?: ResourceDelta;
  // For exploration pinpoint / match
  x?: number;
  y?: number;
  hint?: string;
  matchTarget?: string;
}

export interface Mission {
  missionId: string;
  countryId: string;
  missionType: MissionType;
  explorationMode?: 'pinpoint' | 'hotspot' | 'quiz';
  title: string;
  description: string;
  question: string;
  choices: MissionChoice[];
  correctAnswer?: string;
  targetZone?: { x: number; y: number; radius: number; label: string };
  explanation: string;
  psychologyConcept?: string;
  rewards: {
    score: number;
    experience: number;
  };
  difficulty: DifficultyLevel;
}

export interface Country {
  countryId: string;
  countryName: string;
  englishName: string;
  continent: '유럽' | '아시아' | '북아메리카' | '아프리카';
  capital: string;
  representativeCity: string;
  flag: string;
  coordinates: { lat: number; lng: number };
  description: string;
  climate: string;
  geography: string;
  culture: string;
  landmarks: string[];
  stampName: string;
  stampCode: string;
  stampAccent: string;
  unlockOrder: number;
  unlockCondition: string;
  nextCountryId?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  nickname: string;
  level: number;
  experience: number;
  totalScore: number;
  visitedCountries: string[];
  completedMissions: number;
  createdAt: unknown;
  updatedAt: unknown;
}

export interface TravelProgress {
  userId: string;
  currentCountry: string;
  currentMission: string;
  unlockedCountries: string[];
  visitedCountries: string[];
  collectedStamps: string[];
  completedMissionIds: string[];
  totalBudget: number; // 0 ~ 10000 (starts at 3000)
  totalTravelTime: number; // 0 ~ 500 hours remaining (starts at 120)
  safety: number; // 0 ~ 100 (starts at 85)
  satisfaction: number; // 0 ~ 100 (starts at 75)
  unlockAllMode: boolean;
  updatedAt: unknown;
}

export interface GameRecord {
  id?: string;
  userId: string;
  missionId: string;
  countryId: string;
  missionType: MissionType;
  missionTitle: string;
  selectedAnswer: string;
  result: string;
  scoreEarned: number;
  experienceEarned: number;
  budgetChange: number;
  timeChange: number;
  safetyChange: number;
  satisfactionChange: number;
  learnedConcept: string;
  playedAt: unknown;
}

export interface RankingEntry {
  userId: string;
  nickname: string;
  totalScore: number;
  level: number;
  visitedCountryCount: number;
  completedMissionCount: number;
  stampCount: number;
  updatedAt: unknown;
}

export interface TravelEnding {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  highlight: string;
}

export interface LastReportData {
  countryId: string;
  missionId: string;
  missionTitle: string;
  missionType: MissionType;
  selectedAnswer: string;
  resultLabel: string;
  scoreEarned: number;
  experienceEarned: number;
  resourceDelta: ResourceDelta;
  learnedConcept: string;
  newlyUnlockedCountryId?: string;
  newlyEarnedStamp?: string;
  alreadyCompleted: boolean;
  leveledUpTo?: number;
}
