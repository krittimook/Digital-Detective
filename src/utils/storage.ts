import { GameResult, UserStats, MissionId, DetectiveRank, RankInfo } from '../types/game';

const STORAGE_KEY = 'digital_detective_user_stats_v2';

const DEFAULT_MISSION_PROGRESS: Record<MissionId, { completed: boolean; bestScore: number; attempts: number }> = {
  'mission-1': { completed: false, bestScore: 0, attempts: 0 },
  'mission-2': { completed: false, bestScore: 0, attempts: 0 },
  'mission-3': { completed: false, bestScore: 0, attempts: 0 },
  'mission-4': { completed: false, bestScore: 0, attempts: 0 },
  'mission-5': { completed: false, bestScore: 0, attempts: 0 }
};

const DEFAULT_STATS: UserStats = {
  totalGamesCompleted: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  highestScore: 0,
  bestStreak: 0,
  missionProgress: { ...DEFAULT_MISSION_PROGRESS },
  unlockedAchievements: [],
  history: []
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);

    const mergedProgress = {
      ...DEFAULT_MISSION_PROGRESS,
      ...(parsed.missionProgress || {})
    };

    return {
      totalGamesCompleted: parsed.totalGamesCompleted || 0,
      totalQuestionsAnswered: parsed.totalQuestionsAnswered || 0,
      totalCorrectAnswers: parsed.totalCorrectAnswers || 0,
      highestScore: parsed.highestScore || 0,
      bestStreak: parsed.bestStreak || 0,
      missionProgress: mergedProgress,
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [],
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveMissionScore(
  missionId: MissionId,
  score: number,
  isCompleted: boolean,
  questionsAnswered: number,
  correctCount: number,
  streak: number = 0
): UserStats {
  const current = loadUserStats();

  const prevMission = current.missionProgress[missionId] || { completed: false, bestScore: 0, attempts: 0 };
  const updatedMissionProgress = {
    ...current.missionProgress,
    [missionId]: {
      completed: prevMission.completed || isCompleted,
      bestScore: Math.max(prevMission.bestScore, score),
      attempts: prevMission.attempts + 1
    }
  };

  // Evaluate achievements
  const newAchievements = new Set(current.unlockedAchievements);
  newAchievements.add('FIRST_STEP'); // played any game

  if (isCompleted) {
    newAchievements.add(`COMPLETED_${missionId.toUpperCase().replace('-', '_')}`);
  }

  // Check if all 5 completed
  const allMissionsFinished = Object.values(updatedMissionProgress).every(m => m.completed);
  if (allMissionsFinished) {
    newAchievements.add('ALL_MISSIONS_MASTER');
  }

  if (streak >= 5) {
    newAchievements.add('STREAK_MASTER');
  }

  const updated: UserStats = {
    totalGamesCompleted: current.totalGamesCompleted + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + questionsAnswered,
    totalCorrectAnswers: current.totalCorrectAnswers + correctCount,
    highestScore: Math.max(current.highestScore, score),
    bestStreak: Math.max(current.bestStreak, streak),
    missionProgress: updatedMissionProgress,
    unlockedAchievements: Array.from(newAchievements),
    history: current.history
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // LocalStorage quota handling
  }

  return updated;
}

export function saveGameResult(result: GameResult): UserStats {
  const current = loadUserStats();
  const prevMission = current.missionProgress[result.missionId] || { completed: false, bestScore: 0, attempts: 0 };
  
  const updatedMissionProgress = {
    ...current.missionProgress,
    [result.missionId]: {
      completed: true,
      bestScore: Math.max(prevMission.bestScore, result.score),
      attempts: prevMission.attempts + 1
    }
  };

  const newAchievements = new Set(current.unlockedAchievements);
  newAchievements.add('FIRST_STEP');
  if (result.accuracyPercentage >= 80) {
    newAchievements.add('HIGH_ACCURACY');
  }
  if (result.missionId === 'mission-5' && result.accuracyPercentage >= 80) {
    newAchievements.add('MASTER_DETECTIVE_CERTIFIED');
  }

  const updated: UserStats = {
    totalGamesCompleted: current.totalGamesCompleted + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + result.totalQuestions,
    totalCorrectAnswers: current.totalCorrectAnswers + result.correctCount,
    highestScore: Math.max(current.highestScore, result.score),
    bestStreak: Math.max(current.bestStreak, result.maxStreak),
    missionProgress: updatedMissionProgress,
    unlockedAchievements: Array.from(newAchievements),
    history: [result, ...current.history].slice(0, 30)
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Safe fallback
  }

  return updated;
}

export function clearUserStats(): UserStats {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return DEFAULT_STATS;
}

// Detective Ranks according to prompt requirement:
// 0–39%: Rookie Detective
// 40–59%: Junior Detective
// 60–79%: Skilled Detective
// 80–100%: Master Detective
export function getDetectiveRank(percentage: number): RankInfo {
  if (percentage >= 80) {
    return {
      rank: 'Master Detective',
      rankTh: 'ยอดนักสืบระดับมาสเตอร์ (Master Detective)',
      percentageRange: '80–100%',
      badgeColor: 'text-[#7C3AED] bg-[#EDE9FE] border-[#C4B5FD]',
      description: 'วิเคราะห์หลักฐานเฉียบคม แยกแยะภาพ AI จับไต๋กลโกงฟิชชิง และรักษาความปลอดภัยไซเบอร์ได้อย่างยอดเยี่ยม'
    };
  } else if (percentage >= 60) {
    return {
      rank: 'Skilled Detective',
      rankTh: 'นักสืบชำนาญการ (Skilled Detective)',
      percentageRange: '60–79%',
      badgeColor: 'text-[#2563EB] bg-[#EFF6FF] border-[#BFDBFE]',
      description: 'มีความรอบคอบและสังเกตจุดน่าสงสัยได้ดีเยี่ยม ฝึกฝนอีกนิดจะเชี่ยวชาญทุกด้าน'
    };
  } else if (percentage >= 40) {
    return {
      rank: 'Junior Detective',
      rankTh: 'นักสืบสายตาไว (Junior Detective)',
      percentageRange: '40–59%',
      badgeColor: 'text-[#D97706] bg-[#FEF3C7] border-[#FDE68A]',
      description: 'มองเห็นเบาะแสสำคัญได้ดี เริ่มรู้ทันกลโกงและจุดสังเกตพื้นฐาน'
    };
  } else {
    return {
      rank: 'Rookie Detective',
      rankTh: 'นักสืบฝึกหัด (Rookie Detective)',
      percentageRange: '0–39%',
      badgeColor: 'text-[#4B5563] bg-[#F3F4F6] border-[#E5E7EB]',
      description: 'จุดเริ่มต้นแห่งการเรียนรู้! หมั่นตรวจสอบแหล่งที่มาและศึกษาข้อมูลใน Knowledge Center'
    };
  }
}

export function getRankTitle(accuracyPercent: number): { title: string; subtitle: string } {
  const info = getDetectiveRank(accuracyPercent);
  return {
    title: info.rankTh,
    subtitle: info.description
  };
}
