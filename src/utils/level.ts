import { TravelEnding, TravelProgress } from '../types/game';

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  nextXp: number | null;
}

export const LEVEL_TABLE: LevelInfo[] = [
  { level: 1, title: '초보 여행자', minXp: 0, nextXp: 300 },
  { level: 2, title: '여행 입문자', minXp: 300, nextXp: 750 },
  { level: 3, title: '세계 탐험가', minXp: 750, nextXp: 1400 },
  { level: 4, title: '베테랑 여행자', minXp: 1400, nextXp: 2300 },
  { level: 5, title: '세계 여행 마스터', minXp: 2300, nextXp: null },
];

export function calculateLevelInfo(experience: number): {
  level: number;
  title: string;
  currentMinXp: number;
  nextXp: number | null;
  progressPercent: number;
} {
  let matched = LEVEL_TABLE[0];
  for (const tier of LEVEL_TABLE) {
    if (experience >= tier.minXp) {
      matched = tier;
    }
  }

  if (matched.nextXp === null) {
    return {
      level: matched.level,
      title: matched.title,
      currentMinXp: matched.minXp,
      nextXp: null,
      progressPercent: 100,
    };
  }

  const span = matched.nextXp - matched.minXp;
  const gained = Math.max(0, experience - matched.minXp);
  const progressPercent = Math.min(100, Math.round((gained / span) * 100));

  return {
    level: matched.level,
    title: matched.title,
    currentMinXp: matched.minXp,
    nextXp: matched.nextXp,
    progressPercent,
  };
}

export function clampResource(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function evaluateTravelEnding(
  progress: TravelProgress,
  totalScore: number
): TravelEnding {
  const stamps = progress.collectedStamps.length;
  const budget = progress.totalBudget;
  const safety = progress.safety;
  const satisfaction = progress.satisfaction;
  const completed = progress.completedMissionIds.length;

  if (stamps >= 8 && satisfaction >= 80 && totalScore >= 2000) {
    return {
      id: 'grand_explorer',
      title: '성공적인 세계 탐험',
      subtitle: '대륙을 잇는 통찰력 있는 여행가',
      summary:
        '여러 대륙의 지리적 특성과 문화적 맥락을 균형 있게 이해하고, 높은 만족도를 유지하며 여정을 이어가고 있습니다.',
      highlight: `수집한 도장 ${stamps}개 · 여행 만족도 ${satisfaction}%`,
    };
  }

  if (budget >= 2600 && completed >= 3) {
    return {
      id: 'frugal_planner',
      title: '알뜰한 여행',
      subtitle: '합리적 자원 배분의 전략가',
      summary:
        '예산을 신중하게 관리하며 불필요한 지출을 줄이고, 꼭 필요한 경험에 자원을 집중하는 알뜰한 여행 방식을 보여줍니다.',
      highlight: `보유 예산 $${budget.toLocaleString()} · 완료 미션 ${completed}개`,
    };
  }

  if (safety >= 88 && completed >= 2) {
    return {
      id: 'careful_planner',
      title: '신중한 계획가의 여행',
      subtitle: '위험을 미리 살피는 안전 중심 탐험',
      summary:
        '낯선 환경에서도 위험 요인을 차분히 점검하고 신뢰할 수 있는 경로를 선택하여 안전도를 높게 유지했습니다.',
      highlight: `안전도 ${safety}% · 안정적 일정 관리`,
    };
  }

  if (satisfaction >= 82 && stamps >= 1) {
    return {
      id: 'social_storyteller',
      title: '새로운 친구와 함께한 여행',
      subtitle: '열린 소통과 공감을 즐기는 여행자',
      summary:
        '현지 문화를 존중하고 사람들과 적극적으로 소통하며 예상치 못한 순간도 즐거운 추억으로 바꾸어 나갑니다.',
      highlight: `여행 만족도 ${satisfaction}% · 도장 ${stamps}개`,
    };
  }

  return {
    id: 'spontaneous_adventure',
    title: '예상하지 못한 사건이 가득한 여행',
    subtitle: '매 순간의 변수 속에서 배우는 모험가',
    summary:
      '계획과 다른 변수들을 직접 부딪혀 해결하며 살아있는 지리 지식과 의사결정 경험을 쌓아가고 있습니다.',
    highlight: `완료 미션 ${completed}개 · 남은 시간 ${progress.totalTravelTime}시간`,
  };
}
