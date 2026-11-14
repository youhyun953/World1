import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Globe2,
  HelpCircle,
  MapPin,
  XCircle,
} from 'lucide-react';
import {
  Country,
  LastReportData,
  Mission,
  MissionChoice,
  ResourceDelta,
} from '../types/game';
import { formatFriendlyFirebaseError } from '../firebase/errors';
import { completeMissionTransaction } from '../services/gameService';
import { playChoiceChime, playSoftAlert, playStampSound, playSuccessChime } from '../utils/sound';

interface MissionPlayerProps {
  uid: string;
  country: Country;
  mission: Mission;
  alreadyCompleted: boolean;
  onBack: () => void;
  onCompleted: (report: LastReportData) => void;
}

const MISSION_TYPE_META = {
  geography: { label: 'MISSION A · 지리 챌린지', icon: Globe2, accent: 'text-sky-700' },
  psychology: { label: 'MISSION B · 심리학 선택', icon: Brain, accent: 'text-teal-700' },
  exploration: { label: 'MISSION C · 여행 탐험', icon: Compass, accent: 'text-amber-700' },
};

export function MissionPlayer({
  uid,
  country,
  mission,
  alreadyCompleted,
  onBack,
  onCompleted,
}: MissionPlayerProps) {
  const [selectedChoice, setSelectedChoice] = useState<MissionChoice | null>(null);
  const [pinCoords, setPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [exploredHotspots, setExploredHotspots] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reportDraft, setReportDraft] = useState<LastReportData | null>(null);

  const meta = MISSION_TYPE_META[mission.missionType];
  const MetaIcon = meta.icon;

  const isPinpointMode =
    mission.missionType === 'exploration' && mission.explorationMode === 'pinpoint';
  const isHotspotMode =
    mission.missionType === 'exploration' && mission.explorationMode === 'hotspot';

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (submitted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPinCoords({ x, y });
    // Also match nearest choice if within radius
    const matched = mission.choices.find(
      (c) => c.x !== undefined && c.y !== undefined && Math.hypot(c.x - x, c.y - y) <= 14
    );
    setSelectedChoice(matched || { id: 'CUSTOM', label: `지도 좌표 (${x}%, ${y}%)`, x, y });
  };

  const handleHotspotInspect = (choiceId: string) => {
    if (!exploredHotspots.includes(choiceId)) {
      setExploredHotspots((prev) => [...prev, choiceId]);
    }
  };

  const handleSubmitAnswer = async () => {
    setSubmitError(null);

    if (isPinpointMode && !pinCoords && !selectedChoice) {
      setSubmitError('탐험 지도 위의 목표 지점을 클릭하거나 선택지를 골라 주세요.');
      return;
    }
    if (!isPinpointMode && !selectedChoice) {
      setSubmitError('선택지를 하나 선택해 주세요.');
      return;
    }

    let success = true;
    let delta: ResourceDelta = { budget: 0, time: -1, safety: 2, satisfaction: 5 };
    let resultLabel = '탐험 완료';
    let learnedConcept = mission.psychologyConcept || '세계 지리 이해';
    let answerLabel = selectedChoice ? `${selectedChoice.id}. ${selectedChoice.label}` : '';

    if (mission.missionType === 'geography' || (mission.missionType === 'exploration' && !isPinpointMode)) {
      success = selectedChoice?.id === mission.correctAnswer;
      resultLabel = success ? '정답 및 미션 성공' : '오답 (지리 학습 완료)';
      delta = success
        ? { budget: 0, time: -1, safety: 3, satisfaction: 8 }
        : { budget: 0, time: -2, safety: 0, satisfaction: 2 };
    } else if (isPinpointMode && mission.targetZone) {
      const target = mission.targetZone;
      const checkX = pinCoords?.x ?? selectedChoice?.x ?? -999;
      const checkY = pinCoords?.y ?? selectedChoice?.y ?? -999;
      const dist = Math.hypot(checkX - target.x, checkY - target.y);
      success = dist <= target.radius;
      resultLabel = success ? '정확한 위치 탐색 성공' : '목표 위치 오차 (탐험 완료)';
      answerLabel = pinCoords
        ? `지도 위치 (${pinCoords.x}%, ${pinCoords.y}%)`
        : `${selectedChoice?.id}. ${selectedChoice?.label}`;
      delta = success
        ? { budget: 0, time: -1, safety: 4, satisfaction: 10 }
        : { budget: 0, time: -2, safety: 0, satisfaction: 3 };
    } else if (mission.missionType === 'psychology' && selectedChoice) {
      success = true;
      resultLabel = selectedChoice.psychologyConcept || '의사결정 완료';
      delta = selectedChoice.resourceDelta || { budget: 0, time: -1, safety: 0, satisfaction: 5 };
      learnedConcept = selectedChoice.psychologyConcept || mission.psychologyConcept || '의사결정 심리';
    }

    setSubmitting(true);
    try {
      const report = await completeMissionTransaction({
        uid,
        country,
        mission,
        selectedAnswer: answerLabel,
        resultLabel,
        isSuccessForPoints: success,
        resourceDelta: delta,
        learnedConcept,
      });

      setIsCorrect(success);
      setSubmitted(true);
      setReportDraft(report);

      if (report.newlyEarnedStamp) {
        playStampSound();
      } else if (mission.missionType === 'psychology') {
        playChoiceChime();
      } else if (success) {
        playSuccessChime();
      } else {
        playSoftAlert();
      }
    } catch (err) {
      const friendly = formatFriendlyFirebaseError(err);
      setSubmitError(friendly.message);
    } finally {
      setSubmitting(false);
    }
  };

  const correctChoiceObj = mission.choices.find((c) => c.id === mission.correctAnswer);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{country.countryName} 정보로 돌아가기</span>
        </button>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>{country.flag} {country.countryName}</span>
          <span aria-hidden="true">·</span>
          <span>난이도 {mission.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">+{mission.rewards.score}점 / +{mission.rewards.experience} XP</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${meta.accent}`}>
            <MetaIcon className="w-4 h-4" aria-hidden="true" />
            <span>{meta.label}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{mission.title}</h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{mission.description}</p>
        </div>

        {alreadyCompleted && !submitted && (
          <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            이미 완료한 미션입니다. 연습 모드로 다시 체험할 수 있으며 점수와 경험치는 중복 적립되지 않습니다.
          </div>
        )}

        {/* Hotspot Exploration Clues */}
        {isHotspotMode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">현장 탐사 단서 확인 ({exploredHotspots.length}/{mission.choices.length})</span>
              <span>각 지점을 눌러 지리 단서를 먼저 살펴보세요</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mission.choices.map((spot) => {
                const opened = exploredHotspots.includes(spot.id);
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleHotspotInspect(spot.id)}
                    className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                      opened
                        ? 'bg-teal-50/70 border-teal-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-900">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                        {spot.label}
                      </span>
                      <span className="text-[11px] text-teal-700">{opened ? '확인됨' : '열기'}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {opened ? spot.hint : '클릭하여 현장 지리 단서를 확인하세요.'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pinpoint Interactive Local Exploration Map */}
        {isPinpointMode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">인터랙티브 지역 탐험 지도 (클릭하여 위치 지정)</span>
              {pinCoords && (
                <span className="font-mono tabular-nums text-teal-700">
                  선택 좌표: X {pinCoords.x}% · Y {pinCoords.y}%
                </span>
              )}
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-sky-50">
              <svg
                viewBox="0 0 100 65"
                onClick={handleMapClick}
                className="w-full h-auto max-h-[300px] cursor-crosshair select-none"
                role="img"
                aria-label={`${country.countryName} 랜드마크 위치 찾기 지도`}
              >
                <rect x="0" y="0" width="100" height="65" fill="#F1F5F9" />
                {/* Stylized geography features tailored per country */}
                {country.countryId === 'france' && (
                  <>
                    <path d="M 0 42 Q 25 30, 50 38 T 100 32" fill="none" stroke="#38BDF8" strokeWidth="4.5" />
                    <text x="50" y="34" fontSize="3.2" fill="#0369A1" textAnchor="middle">센강 (Seine)</text>
                    <rect x="18" y="39" width="12" height="12" rx="1.5" fill="#BBF7D0" opacity="0.7" />
                    <text x="24" y="54" fontSize="2.8" fill="#166534" textAnchor="middle">마르스 광장</text>
                    <circle cx="54" cy="13" r="6" fill="#E2E8F0" />
                    <text x="54" y="14" fontSize="2.8" fill="#475569" textAnchor="middle">몽마르트르</text>
                    <ellipse cx="64" cy="35" rx="6" ry="2.6" fill="#FDE68A" />
                    <text x="64" y="40" fontSize="2.8" fill="#92400E" textAnchor="middle">시테섬</text>
                  </>
                )}
                {country.countryId === 'uk' && (
                  <>
                    <path d="M 0 38 Q 28 42, 42 32 T 78 30 T 100 34" fill="none" stroke="#38BDF8" strokeWidth="4.5" />
                    <text x="52" y="28" fontSize="3.2" fill="#0369A1" textAnchor="middle">템스강 (Thames)</text>
                    <rect x="24" y="33" width="11" height="8" rx="1" fill="#E2E8F0" />
                    <text x="30" y="45" fontSize="2.8" fill="#334155" textAnchor="middle">웨스트민스터</text>
                    <text x="74" y="25" fontSize="2.8" fill="#334155" textAnchor="middle">타워 브리지</text>
                    <text x="84" y="50" fontSize="2.8" fill="#334155" textAnchor="middle">그리니치</text>
                  </>
                )}
                {country.countryId === 'usa' && (
                  <>
                    <path d="M 8 14 L 85 16 L 90 36 L 74 52 L 38 50 L 10 38 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.6" />
                    <path d="M 85 0 L 100 0 L 100 65 L 74 65 L 90 36 Z" fill="#BAE6FD" opacity="0.6" />
                    <text x="88" y="50" fontSize="3" fill="#0369A1" textAnchor="middle">대서양</text>
                    <text x="78" y="21" fontSize="2.8" fill="#334155" textAnchor="middle">뉴욕 항만</text>
                    <text x="26" y="40" fontSize="2.8" fill="#334155" textAnchor="middle">애리조나</text>
                    <text x="14" y="26" fontSize="2.8" fill="#334155" textAnchor="middle">서부 해안</text>
                  </>
                )}
                {country.countryId === 'egypt' && (
                  <>
                    <rect x="0" y="0" width="100" height="12" fill="#BAE6FD" />
                    <text x="50" y="7.5" fontSize="3.2" fill="#0369A1" textAnchor="middle">지중해</text>
                    <path d="M 58 65 L 55 24 L 38 11 M 55 24 L 68 11" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <text x="54" y="22" fontSize="2.8" fill="#0369A1" textAnchor="middle">나일강 삼각주</text>
                    <text x="36" y="15" fontSize="2.7" fill="#334155" textAnchor="middle">알렉산드리아</text>
                    <text x="64" y="46" fontSize="2.7" fill="#334155" textAnchor="middle">룩소르</text>
                  </>
                )}

                {/* Reference target candidates */}
                {mission.choices.map((ch) =>
                  ch.x !== undefined && ch.y !== undefined ? (
                    <g key={ch.id} transform={`translate(${ch.x}, ${(ch.y / 100) * 65})`}>
                      <circle r="3.2" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.6" />
                      <text y="0.9" fontSize="2.6" fontWeight="700" fill="#334155" textAnchor="middle">
                        {ch.id}
                      </text>
                    </g>
                  ) : null
                )}

                {/* Reveal Target Zone after submission */}
                {submitted && mission.targetZone && (
                  <g
                    transform={`translate(${mission.targetZone.x}, ${(mission.targetZone.y / 100) * 65})`}
                  >
                    <circle
                      r={(mission.targetZone.radius / 100) * 65}
                      fill="#0D9488"
                      opacity="0.2"
                      stroke="#0D9488"
                      strokeWidth="0.7"
                      strokeDasharray="1.5 1.5"
                    />
                    <circle r="2.2" fill="#0D9488" />
                  </g>
                )}

                {/* User clicked pin */}
                {pinCoords && (
                  <g transform={`translate(${pinCoords.x}, ${(pinCoords.y / 100) * 65})`}>
                    <circle r="2.8" fill="#E11D48" stroke="#FFFFFF" strokeWidth="0.8" />
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* Question & Choices */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">{mission.question}</h2>

          <div className="space-y-2.5">
            {mission.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              const isCorrectChoice =
                submitted &&
                mission.correctAnswer &&
                choice.id === mission.correctAnswer;
              const isWrongSelected =
                submitted &&
                mission.missionType !== 'psychology' &&
                isSelected &&
                !isCorrect;

              let borderClass = 'border-slate-200 hover:border-teal-400 bg-white';
              if (isSelected && !submitted) {
                borderClass = 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600';
              } else if (isCorrectChoice) {
                borderClass = 'border-emerald-500 bg-emerald-50/70';
              } else if (isWrongSelected) {
                borderClass = 'border-rose-400 bg-rose-50/70';
              } else if (submitted && isSelected && mission.missionType === 'psychology') {
                borderClass = 'border-teal-600 bg-teal-50/70';
              }

              return (
                <button
                  key={choice.id}
                  type="button"
                  disabled={submitted}
                  onClick={() => {
                    setSelectedChoice(choice);
                    if (isPinpointMode && choice.x !== undefined && choice.y !== undefined) {
                      setPinCoords({ x: choice.x, y: choice.y });
                    }
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${borderClass}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {choice.id}
                  </span>
                  <span className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                    {choice.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {submitError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {submitError}
          </div>
        )}

        {/* Submit Action */}
        {!submitted ? (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitAnswer}
              className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting ? '결과 저장 중...' : '선택 확정 및 결과 확인'}
            </button>
          </div>
        ) : (
          /* Post-Submission Feedback Panel */
          <div className="pt-4 border-t border-slate-200 space-y-5">
            {mission.missionType === 'psychology' && selectedChoice ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
                  <div className="text-xs font-semibold text-teal-800">1. 선택에 따른 상황 변화</div>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {selectedChoice.outcomeSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-xs font-semibold text-slate-700">2. 여행에 미치는 영향</div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedChoice.travelImpact}
                    </p>
                    {selectedChoice.resourceDelta && (
                      <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 tabular-nums">
                        <span>예산 {selectedChoice.resourceDelta.budget >= 0 ? `+${selectedChoice.resourceDelta.budget}` : selectedChoice.resourceDelta.budget}</span>
                        <span>시간 {selectedChoice.resourceDelta.time >= 0 ? `+${selectedChoice.resourceDelta.time}` : selectedChoice.resourceDelta.time}h</span>
                        <span>안전 {selectedChoice.resourceDelta.safety >= 0 ? `+${selectedChoice.resourceDelta.safety}` : selectedChoice.resourceDelta.safety}%</span>
                        <span>만족 {selectedChoice.resourceDelta.satisfaction >= 0 ? `+${selectedChoice.resourceDelta.satisfaction}` : selectedChoice.resourceDelta.satisfaction}%</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                    <div className="text-xs font-semibold text-sky-800">
                      3. 관련 심리학 개념 · {selectedChoice.psychologyConcept}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedChoice.psychologyExplanation}
                    </p>
                  </div>
                </div>

                {selectedChoice.reflectionQuestion && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-semibold text-amber-900">4. 생각해 볼 만한 질문</div>
                      <p className="text-sm text-slate-800 mt-1">{selectedChoice.reflectionQuestion}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="space-y-1">
                    <div className="text-sm font-bold">
                      {isCorrect ? '정확한 정답입니다!' : '아쉽지만 오답입니다. 지리 해설을 확인해 보세요.'}
                    </div>
                    {!isCorrect && correctChoiceObj && (
                      <div className="text-xs font-medium">
                        정답: {correctChoiceObj.id}. {correctChoiceObj.label}
                      </div>
                    )}
                    {!isCorrect && isPinpointMode && mission.targetZone && (
                      <div className="text-xs font-medium">
                        목표 지점: {mission.targetZone.label} (초록색 점선 원)
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    지리 해설 및 여행지 연관 지식 · {mission.psychologyConcept}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{mission.explanation}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-600 tabular-nums">
                {reportDraft?.alreadyCompleted
                  ? '연습 모드 완료 (기존 점수가 유지됩니다)'
                  : `획득 보상: +${reportDraft?.scoreEarned ?? 0}점 · +${reportDraft?.experienceEarned ?? 0} XP`}
              </div>
              <button
                type="button"
                onClick={() => reportDraft && onCompleted(reportDraft)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>여행 결과 리포트 보기</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
