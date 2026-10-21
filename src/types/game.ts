export type ImageCategory = 
  | 'PORTRAIT' 
  | 'ANIMAL' 
  | 'FOOD' 
  | 'NATURE' 
  | 'OBJECT' 
  | 'ARCHITECTURE';

export type GroundTruth = 'AI_GENERATED' | 'REAL_PHOTO' | 'NOT_ENOUGH_EVIDENCE';

export type GameMode = 'CLASSIC' | 'QUICK' | 'LEARNING';

export type MissionId = 
  | 'mission-1' 
  | 'mission-2' 
  | 'mission-3' 
  | 'mission-4' 
  | 'mission-5';

export interface Question {
  id: string;
  imagePath: string;
  groundTruth: GroundTruth;
  category: ImageCategory;
  categoryLabelTh: string;
  titleTh: string;
  shortExplanation: string;
  detailedClues: string[];
  provenance: string;
  license: string;
  learningTip: string;
}

export interface PlayerAnswerRecord {
  questionId: string;
  selected: GroundTruth;
  isCorrect: boolean;
  question: Question;
}

// Mission 2: AI Image Puzzle Types
export interface ClueHotspot {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  description: string;
  isSuspicious: boolean;
  explanation: string;
}

export interface PuzzleSubQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PuzzleCase {
  id: string;
  imagePath: string;
  title: string;
  scenarioContext: string;
  hotspots: ClueHotspot[];
  subQuestions: PuzzleSubQuestion[];
  verificationOptions: {
    id: string;
    text: string;
    isBestChoice: boolean;
    explanation: string;
  }[];
  hint: string;
  keyTakeaway: string;
  groundTruthLabel: string;
  provenance: string;
}

// Mission 3: Scam Message Decoder Types
export type MessageChannel = 'SMS' | 'CHAT' | 'EMAIL' | 'SOCIAL';
export type MessageClassification = 'SUSPICIOUS' | 'LEGITIMATE' | 'INSUFFICIENT_INFO';

export interface ScamMessageCase {
  id: string;
  channel: MessageChannel;
  senderName: string;
  senderAddress: string;
  timestamp: string;
  avatarText?: string;
  messageBody: string;
  highlightablePhrases: {
    text: string;
    isRedFlag: boolean;
    explanation: string;
  }[];
  classification: MessageClassification;
  actionOptions: {
    id: string;
    actionText: string;
    isSafest: boolean;
    feedback: string;
  }[];
  redFlagSummary: string[];
  detailedExplanation: string;
}

// Mission 4: Privacy Guardian Types
export type PrivacyCategory = 
  | 'PASSWORD' 
  | '2FA' 
  | 'OTP' 
  | 'APP_PERMISSIONS' 
  | 'PUBLIC_WIFI' 
  | 'SOCIAL_MEDIA' 
  | 'LOGIN_ALERT' 
  | 'LOST_DEVICE' 
  | 'PHISHING_SURVEY' 
  | 'COOKIES_TRACKING';

export interface PrivacyScenario {
  id: string;
  category: PrivacyCategory;
  categoryLabelTh: string;
  scenarioTitle: string;
  scenarioDescription: string;
  contextIcon?: string;
  choices: {
    id: string;
    text: string;
    isSafest: boolean;
    feedback: string;
  }[];
  whyItMatters: string;
  goldenRule: string;
}

// Mission 5: Master Challenge Mixed Item
export type ChallengeCategory = 'IMAGE_DETECTION' | 'IMAGE_PUZZLE' | 'SCAM_DECODER' | 'PRIVACY_GUARDIAN';

export interface MasterChallengeQuestion {
  id: string;
  category: ChallengeCategory;
  categoryLabelTh: string;
  prompt: string;
  imagePath?: string;
  messageSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Detective Ranks
export type DetectiveRank = 
  | 'Rookie Detective' 
  | 'Junior Detective' 
  | 'Skilled Detective' 
  | 'Master Detective';

export interface RankInfo {
  rank: DetectiveRank;
  rankTh: string;
  percentageRange: string;
  badgeColor: string;
  description: string;
}

export interface GameResult {
  id: string;
  date: string;
  missionId: MissionId;
  mode: GameMode;
  score: number;
  totalQuestions: number;
  correctCount: number;
  accuracyPercentage: number;
  maxStreak: number;
  rankTitle: string;
  answers: PlayerAnswerRecord[];
}

export interface MissionProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
}

export interface UserStats {
  totalGamesCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  highestScore: number;
  bestStreak: number;
  missionProgress: Record<MissionId, MissionProgress>;
  unlockedAchievements: string[];
  history: GameResult[];
}
