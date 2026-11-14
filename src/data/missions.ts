import { Mission } from '../types/game';

export const MISSIONS_DATA: Mission[] = [
  // ==========================================
  // FRANCE (13 Missions: 5 Geo, 5 Psych, 3 Exploration)
  // ==========================================
  {
    missionId: 'fra_geo_1',
    countryId: 'france',
    missionType: 'geography',
    title: '프랑스의 심장, 수도 찾기',
    description: '센강 유역의 파리 분지에 자리 잡고 있으며, 유럽의 문화·예술·교통 중심지 역할을 해 온 프랑스의 수도를 확인해 봅니다.',
    question: '프랑스의 수도는 어디일까요?',
    choices: [
      { id: 'A', label: '런던' },
      { id: 'B', label: '파리' },
      { id: 'C', label: '로마' },
      { id: 'D', label: '베를린' },
    ],
    correctAnswer: 'B',
    explanation:
      '프랑스의 수도는 파리(Paris)입니다. 파리는 일드프랑스(Île-de-France) 지역 중앙의 완만한 분지에 위치하며, 센강을 통한 수운과 방사형 철도망 덕분에 프랑스 전역과 유럽을 잇는 관문 도시로 성장했습니다.',
    psychologyConcept: '도시 입지 조건 (수운과 교통의 결절점)',
    rewards: { score: 100, experience: 80 },
    difficulty: '쉬움',
  },
  {
    missionId: 'fra_geo_2',
    countryId: 'france',
    missionType: 'geography',
    title: '파리를 가로지르는 생명의 강',
    description: '루브르 박물관, 노트르담 대성당, 에펠탑이 모두 이 강을 따라 배치되어 있어 파리 여행 동선의 기준이 됩니다.',
    question: '프랑스 파리의 중심부를 동에서 서로 가로질러 영국 해협으로 흘러가는 강은 무엇일까요?',
    choices: [
      { id: 'A', label: '템스강' },
      { id: 'B', label: '라인강' },
      { id: 'C', label: '센강' },
      { id: 'D', label: '다뉴브강' },
    ],
    correctAnswer: 'C',
    explanation:
      '센강(Seine)은 부르고뉴 고원에서 발원해 파리를 가로질러 르아브르에서 영국 해협으로 빠져나갑니다. 파리 시내에서는 센강을 기준으로 북쪽을 우안(Rive Droite), 남쪽을 좌안(Rive Gauche)으로 구분해 길을 찾습니다.',
    psychologyConcept: '하천 지형과 도시 공간 구조',
    rewards: { score: 100, experience: 80 },
    difficulty: '쉬움',
  },
  {
    missionId: 'fra_geo_3',
    countryId: 'france',
    missionType: 'geography',
    title: '서유럽 최대 산맥과 자연 국경',
    description: '프랑스 남동부 국경 지역으로 이동하면 겨울 스포츠와 빙하 지형으로 유명한 높은 산악 지대를 만납니다.',
    question: '프랑스가 이탈리아·스위스와 국경을 맞대고 있는 남동부의 대표적인 산맥은 어디일까요?',
    choices: [
      { id: 'A', label: '알프스산맥' },
      { id: 'B', label: '우랄산맥' },
      { id: 'C', label: '애팔래치아산맥' },
      { id: 'D', label: '안데스산맥' },
    ],
    correctAnswer: 'A',
    explanation:
      '알프스산맥은 프랑스·이탈리아·스위스 등에 걸쳐 있는 유럽의 대표적 신기 습곡 산지입니다. 프랑스와 이탈리아 국경에 자리한 몽블랑(4,807m)은 서유럽 최고봉으로, 교통로인 몽블랑 터널이 양국을 연결합니다.',
    psychologyConcept: '자연 국경과 신기 습곡 산지',
    rewards: { score: 120, experience: 90 },
    difficulty: '보통',
  },
  {
    missionId: 'fra_geo_4',
    countryId: 'france',
    missionType: 'geography',
    title: '파리와 니스의 옷차림이 다른 이유',
    description: '같은 프랑스 안에서도 북부 파리와 남부 지중해 연안 도시 니스는 계절별 강수량과 일조량에 뚜렷한 차이가 나타납니다.',
    question: '프랑스 남부 지중해 연안(니스·마르세유)에서 주로 나타나는 기후 특성은 무엇일까요?',
    choices: [
      { id: 'A', label: '연중 기온이 영하에 머무는 빙설 기후' },
      { id: 'B', label: '여름에 맑고 건조하며 겨울에 온난 습윤한 지중해성 기후' },
      { id: 'C', label: '일 년 내내 매일 스콜이 내리는 열대 우림 기후' },
      { id: 'D', label: '연교차가 50도 이상인 극심한 냉대 대륙성 기후' },
    ],
    correctAnswer: 'B',
    explanation:
      '프랑스 북서부는 편서풍과 난류의 영향을 받는 서안 해양성 기후지만, 남부 지중해 연안은 여름철 아열대 고압대의 영향으로 맑고 건조한 지중해성 기후가 나타납니다. 덕분에 니스는 사계절 휴양지와 올리브·포도 재배지로 유명합니다.',
    psychologyConcept: '위도와 해류·기압대에 따른 기후 분화',
    rewards: { score: 120, experience: 90 },
    difficulty: '보통',
  },
  {
    missionId: 'fra_geo_5',
    countryId: 'france',
    missionType: 'geography',
    title: '프랑스를 둘러싼 두 바다',
    description: '프랑스는 서유럽에서 대서양과 지중해를 동시에 접하고 있어 오래전부터 해양 무역과 항구 도시가 발달했습니다.',
    question: '다음 중 프랑스 본토가 접하고 있는 바다의 조합으로 옳은 것은?',
    choices: [
      { id: 'A', label: '인도양과 태평양' },
      { id: 'B', label: '북극해와 흑해' },
      { id: 'C', label: '대서양(영국 해협·비스케이만)과 지중해' },
      { id: 'D', label: '홍해와 카스피해' },
    ],
    correctAnswer: 'C',
    explanation:
      '프랑스는 서쪽과 북서쪽으로는 대서양(비스케이만 및 영국 해협), 남쪽으로는 지중해와 접해 있습니다. 육각형 모양의 지형(L’Hexagone) 덕분에 내륙 교통과 해양 교통 모두에 유리한 입지를 갖습니다.',
    psychologyConcept: '해양 입지와 유럽 교통망',
    rewards: { score: 130, experience: 100 },
    difficulty: '도전',
  },

  // FRANCE PSYCHOLOGY (5 Missions)
  {
    missionId: 'fra_psy_1',
    countryId: 'france',
    missionType: 'psychology',
    title: '낯선 파리 골목에서 길을 잃었다!',
    description:
      '해가 저물어 가는 파리의 낯선 골목. 휴대전화 배터리는 10%밖에 남지 않았고 숙소 방향도 헷갈립니다. 주변에는 카페에서 대화하는 현지인과 거리의 간이 안내 표지판, 조금 떨어진 큰 도로변의 관광안내소가 보입니다.',
    question: '이 상황에서 당신은 어떻게 행동할 것인가요?',
    choices: [
      {
        id: 'A',
        label: '가까운 카페 직원이나 현지인에게 정중히 길을 물어본다.',
        outcomeSummary: '카페 점원이 친절하게 지하철역 방향과 주의할 골목을 종이에 그려 알려주었습니다.',
        travelImpact: '시간은 절약되었지만, 현지인과의 소통 과정에서 약간의 긴장을 경험했습니다.',
        psychologyConcept: '사회적 지원 (Social Support)',
        psychologyExplanation:
          '낯선 환경에서 타인에게 도움을 요청하는 행동은 사회적 지원을 활용하는 문제 해결 전략입니다. 다만 도움을 구할 때에는 상점 직원이나 공공장소처럼 신뢰성을 판단할 수 있는 단서를 함께 고려하는 것이 안전합니다.',
        reflectionQuestion: '도움을 요청할 때 상대방과 주변 환경의 신뢰도를 판단하는 나만의 기준은 무엇인가요?',
        resourceDelta: { budget: 0, time: -1, safety: 4, satisfaction: 8 },
      },
      {
        id: 'B',
        label: '배터리를 아끼기 위해 화면을 끄고, 아날로그 거리 표지판만 보며 혼자 찾아간다.',
        outcomeSummary: '방향을 몇 번 잘못 들어 40분 정도 돌아갔지만 결국 익숙한 큰길을 발견했습니다.',
        travelImpact: '비용은 들지 않았으나 시간이 더 소모되었고 체력과 안전도 여유가 줄었습니다.',
        psychologyConcept: '자기효능감과 인지적 부하 (Self-Efficacy & Cognitive Load)',
        psychologyExplanation:
          '스스로 문제를 해결하려는 태도는 자율성과 자기효능감을 높여 주지만, 정보와 자원이 부족한 상황에서는 불필요한 인지적 부하와 피로가 커질 수 있습니다.',
        reflectionQuestion: '혼자 해결하는 것과 도움을 받는 것 사이의 균형을 언제 전환해야 할까요?',
        resourceDelta: { budget: 0, time: -4, safety: -5, satisfaction: -2 },
      },
      {
        id: 'C',
        label: '사람이 많은 큰 도로변의 공식 관광안내소까지 걸어가 지도와 충전 도움을 요청한다.',
        outcomeSummary: '공식 안내소에서 종이 지도와 안전한 버스 노선을 안내받아 안심하고 숙소로 이동했습니다.',
        travelImpact: '이동에 약간 시간이 걸렸지만 안전도와 여행 신뢰감이 크게 높아졌습니다.',
        psychologyConcept: '위험 지각과 안전 탐색 (Risk Perception)',
        psychologyExplanation:
          '불확실한 상황에서 공인된 정보원(공식 안내소)을 찾는 행동은 위험 지각에 기반한 합리적 안전 전략입니다. 시간은 조금 더 걸려도 불확실성을 효과적으로 낮춥니다.',
        reflectionQuestion: '불확실성이 높을 때 나는 속도와 안전 중 무엇을 우선하는 경향이 있나요?',
        resourceDelta: { budget: -10, time: -2, safety: 10, satisfaction: 6 },
      },
    ],
    explanation: '낯선 환경에서의 길 찾기는 정보 탐색 방식과 위험 지각 수준의 차이를 잘 보여줍니다.',
    psychologyConcept: '사회적 지원과 위험 지각',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'fra_psy_2',
    countryId: 'france',
    missionType: 'psychology',
    title: '루브르 박물관 앞 기나긴 대기 줄',
    description:
      '루브르 박물관에 도착하니 비가 부슬부슬 내리고 입장 대기 줄이 매우 깁니다. 마침 옆에서 비공식 호객꾼이 "지금 두 배 가격을 내면 즉시 들어갈 수 있는 티켓이 있다"고 말을 걸어옵니다.',
    question: '기다림과 유혹 앞에서 어떤 선택을 하시겠습니까?',
    choices: [
      {
        id: 'A',
        label: '공식 매표소/모바일 예매 규정을 확인하고 정식 대기 줄을 유지한다.',
        outcomeSummary: '40분 정도 기다렸지만 안전하게 공식 티켓으로 입장해 모나리자를 여유롭게 감상했습니다.',
        travelImpact: '시간을 조금 소비했지만 예산 손실과 사기 위험을 완벽히 피했습니다.',
        psychologyConcept: '충동 통제와 지연 만족 (Delayed Gratification)',
        psychologyExplanation:
          '당장의 불편함을 피하려는 즉각적 보상을 참아내고 검증된 절차를 따르는 것은 장기적인 안전과 만족을 지키는 의사결정 능력입니다.',
        reflectionQuestion: '시간 압박을 받을 때 비공식 제안을 경계하기 위해 어떤 확인 절차를 거치나요?',
        resourceDelta: { budget: -25, time: -3, safety: 8, satisfaction: 7 },
      },
      {
        id: 'B',
        label: '시간을 아끼기 위해 비공식 판매자에게 웃돈을 주고 티켓을 구매한다.',
        outcomeSummary: '바코드가 이미 사용된 가짜 티켓이어서 입구에서 제지당하고 다시 공식 줄로 돌아왔습니다.',
        travelImpact: '예산과 시간, 안전 신뢰도가 모두 크게 감소하는 값비싼 교훈을 얻었습니다.',
        psychologyConcept: '희소성 편향과 매몰 비용 위험 (Scarcity Heuristic)',
        psychologyExplanation:
          '"지금 바로"라는 시간 압박과 희소성 자극은 비판적 검증을 약화시켜 성급한 결정을 유도할 수 있습니다.',
        reflectionQuestion: '긴급하거나 한정된 기회라는 말을 들었을 때 한 번 멈추어 확인하는 방법은 무엇일까요?',
        resourceDelta: { budget: -120, time: -4, safety: -12, satisfaction: -10 },
      },
      {
        id: 'C',
        label: '오늘은 야외 산책과 오르세 미술관 인근 카페 탐방으로 일정을 유연하게 바꾼다.',
        outcomeSummary: '비 오는 파리의 낭만을 즐기며 내일 오전 첫 시간대 공식 예약을 마쳤습니다.',
        travelImpact: '유연한 대처 덕분에 높은 만족도와 안전을 동시에 유지했습니다.',
        psychologyConcept: '인지적 유연성 (Cognitive Flexibility)',
        psychologyExplanation:
          '원래 계획에 과도하게 집착하지 않고 상황 변화에 맞춰 대안을 재구성하는 능력은 여행 스트레스를 줄여 주는 핵심 역량입니다.',
        reflectionQuestion: '계획이 틀어졌을 때 플랜 B를 기분 좋게 받아들이는 나만의 비결은 무엇인가요?',
        resourceDelta: { budget: -30, time: 0, safety: 5, satisfaction: 10 },
      },
    ],
    explanation: '예상치 못한 대기 상황은 희소성 자극에 대한 저항력과 계획 수정 능력을 시험합니다.',
    psychologyConcept: '희소성 편향과 인지적 유연성',
    rewards: { score: 150, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'fra_psy_3',
    countryId: 'france',
    missionType: 'psychology',
    title: '이미 사버린 오페라 티켓과 컨디션 난조',
    description:
      '파리 오페라 가르니에 공연 티켓을 150달러에 미리 예매했습니다. 그런데 오후부터 감기 기운이 돌고 비까지 내려 몸이 무겁습니다. 오늘 무리하면 내일 일정에도 영향이 갈 수 있습니다.',
    question: '이미 지불한 티켓 비용을 두고 어떻게 결정할까요?',
    choices: [
      {
        id: 'A',
        label: '티켓 값이 아깝지만 건강과 내일 일정을 위해 숙소에서 휴식한다.',
        outcomeSummary: '따뜻한 수프를 먹고 일찍 잠든 덕분에 다음 날 최상의 컨디션으로 여행을 이어갔습니다.',
        travelImpact: '당장의 티켓 활용은 포기했지만 안전도와 장기 만족도가 크게 회복되었습니다.',
        psychologyConcept: '매몰 비용 오류 극복 (Overcoming Sunk Cost Fallacy)',
        psychologyExplanation:
          '이미 지출해 되돌릴 수 없는 비용(매몰 비용)에 얽매이지 않고, 앞으로의 이익과 건강을 기준으로 선택하는 합리적 의사결정입니다.',
        reflectionQuestion: '이미 시간이나 돈을 썼다는 이유만으로 내게 해로운 선택을 이어간 경험이 있나요?',
        resourceDelta: { budget: -50, time: 2, safety: 12, satisfaction: 5 },
      },
      {
        id: 'B',
        label: '비싼 티켓이 아까우니 감기약을 먹고 끝까지 공연을 관람한다.',
        outcomeSummary: '공연은 화려했지만, 귀가 후 열이 올라 다음 날 일정을 반나절 쉬어야 했습니다.',
        travelImpact: '문화 만족도는 일부 얻었으나 안전도와 다음 날 시간이 줄어들었습니다.',
        psychologyConcept: '매몰 비용 오류 (Sunk Cost Fallacy)',
        psychologyExplanation:
          '회수할 수 없는 과거 투자 때문에 현재 더 큰 손실이 예상되는 행동을 계속하게 되는 심리적 경향을 보여 줍니다.',
        reflectionQuestion: '포기가 손해가 아니라 더 큰 손실을 막는 선택이 될 때는 언제일까요?',
        resourceDelta: { budget: -20, time: -4, safety: -10, satisfaction: 3 },
      },
      {
        id: 'C',
        label: '숙소 프런트에 공연 양도 또는 일정 변경 가능 여부를 문의한 뒤 판단한다.',
        outcomeSummary: '공식 재판매 플랫폼을 통해 일부 금액을 환급받고, 가벼운 산책 후 휴식을 취했습니다.',
        travelImpact: '예산 손실을 줄이면서 안전과 만족의 균형을 맞췄습니다.',
        psychologyConcept: '정보 탐색과 손실 최소화 전략 (Problem-Focused Coping)',
        psychologyExplanation:
          '포기와 강행이라는 이분법에서 벗어나 제3의 해결책을 탐색하는 문제 중심 대처 방식입니다.',
        reflectionQuestion: '두 가지 선택지만 보일 때 새로운 대안을 떠올리기 위해 무엇을 해볼 수 있을까요?',
        resourceDelta: { budget: 30, time: -1, safety: 8, satisfaction: 8 },
      },
    ],
    explanation: '매몰 비용 오류를 인식하면 여행 중 컨디션과 예산을 훨씬 건강하게 관리할 수 있습니다.',
    psychologyConcept: '매몰 비용 오류 (Sunk Cost Fallacy)',
    rewards: { score: 150, experience: 110 },
    difficulty: '보통',
  },
  {
    missionId: 'fra_psy_4',
    countryId: 'france',
    missionType: 'psychology',
    title: '줄이 끝없이 긴 맛집 vs 조용한 동네 비스트로',
    description:
      '점심시간, SNS에서 모두가 극찬하는 파리의 유명 레스토랑 앞에 1시간 30분 이상 대기 줄이 서 있습니다. 바로 건너편에는 현지 직장인들이 조용히 식사하는 소박한 비스트로가 보입니다.',
    question: '점심 식사 장소를 어디로 정하시겠습니까?',
    choices: [
      {
        id: 'A',
        label: '다수가 선택한 곳에는 이유가 있을 것이라며 유명 맛집 줄에 선다.',
        outcomeSummary: '오랜 기다림 끝에 대표 요리를 먹었지만, 오후 관광 시간이 촉박해졌습니다.',
        travelImpact: '만족도는 무난했으나 여행 시간이 크게 줄고 식비 지출도 높았습니다.',
        psychologyConcept: '사회적 증거와 동조 (Social Proof & Conformity)',
        psychologyExplanation:
          '불확실한 상황에서 다른 다수의 행동을 올바른 기준으로 삼는 현상을 사회적 증거라고 합니다. 정보 탐색 비용을 줄여 주지만 자신의 취향과 시간 가치를 놓칠 수 있습니다.',
        reflectionQuestion: '인기가 많다는 이유만으로 선택했다가 아쉬웠던 경험이 있나요?',
        resourceDelta: { budget: -65, time: -5, safety: 0, satisfaction: 4 },
      },
      {
        id: 'B',
        label: '메뉴판 가격과 현지 손님 분위기를 살펴본 뒤 건너편 동네 비스트로에 들어간다.',
        outcomeSummary: '합리적인 가격의 오늘의 요리를 여유롭게 즐기고, 주인과 파리 동네 이야기도 나누었습니다.',
        travelImpact: '시간과 예산을 모두 아끼고 특별한 현지 경험을 얻었습니다.',
        psychologyConcept: '독립적 판단과 본질적 가치 평가 (Independent Judgment)',
        psychologyExplanation:
          '외부의 평판보다 현재 나의 조건(시간, 예산, 분위기)에 맞는 단서를 직접 평가하여 내린 주체적 결정입니다.',
        reflectionQuestion: '남들의 평가 대신 나만의 기준으로 여행지를 고른다면 무엇을 가장 보고 싶나요?',
        resourceDelta: { budget: -35, time: -1, safety: 4, satisfaction: 10 },
      },
      {
        id: 'C',
        label: '유명 빵집에서 바게트 샌드위치를 포장해 센강 벤치에서 먹으며 시간을 아낀다.',
        outcomeSummary: '햇살 아래 센강을 바라보며 먹는 점심이 뜻밖의 최고의 순간이 되었습니다.',
        travelImpact: '예산과 시간을 크게 아끼면서도 높은 만족도를 얻었습니다.',
        psychologyConcept: '프레이밍 전환 (Positive Reframing)',
        psychologyExplanation:
          '식당에 앉아 먹는 형식에서 벗어나 환경 자체를 경험의 일부로 재해석함으로써 적은 비용으로도 큰 만족을 만들어냈습니다.',
        reflectionQuestion: '적은 자원으로도 만족감을 높일 수 있는 여행의 순간은 어떤 모습일까요?',
        resourceDelta: { budget: -15, time: 1, safety: 2, satisfaction: 9 },
      },
    ],
    explanation: '타인의 선택(사회적 증거)과 나의 우선순위 사이에서 균형을 잡는 연습입니다.',
    psychologyConcept: '사회적 증거 (Social Proof)',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'fra_psy_5',
    countryId: 'france',
    missionType: 'psychology',
    title: '기념품 가게의 문화적 오해',
    description:
      '파리의 작은 상점에 들어갔는데 직원이 다소 무뚝뚝해 보입니다. 알고 보니 프랑스에서는 상점에 들어갈 때 먼저 "봉주르(Bonjour)"라고 인사를 건네는 것이 기본 예절이라고 합니다.',
    question: '어색해진 분위기 속에서 어떻게 반응할까요?',
    choices: [
      {
        id: 'A',
        label: '미소와 함께 "봉주르!"라고 먼저 인사를 건네고 천천히 물건을 살펴본다.',
        outcomeSummary: '직원의 표정이 금세 밝아지며 프랑스어로 쓰인 엽서의 뜻까지 친절히 설명해 주었습니다.',
        travelImpact: '상호 존중을 통해 여행 만족도와 문화적 공감 경험이 크게 높아졌습니다.',
        psychologyConcept: '문화적 공감과 상호성 규범 (Cultural Empathy & Reciprocity)',
        psychologyExplanation:
          '상대의 행동이 무례해서가 아니라 문화적 규범이 다르기 때문임을 이해(귀인 오류 감소)하고 먼저 존중을 표현하면 긍정적 상호작용이 일어납니다.',
        reflectionQuestion: '타인의 태도를 보고 성격 때문이라고 단정 짓기 전에 상황적·문화적 배경을 떠올려 본 적이 있나요?',
        resourceDelta: { budget: -25, time: -1, safety: 5, satisfaction: 12 },
      },
      {
        id: 'B',
        label: '불친절하다고 느껴져 아무 말 없이 바로 가게를 나와 버린다.',
        outcomeSummary: '마음이 상해 한동안 기분이 가라앉았고 원하는 기념품도 사지 못했습니다.',
        travelImpact: '시간은 쓰지 않았으나 문화적 오해로 여행 만족도가 떨어졌습니다.',
        psychologyConcept: '기본적 귀인 오류 (Fundamental Attribution Error)',
        psychologyExplanation:
          '상대의 행동 뒤에 있는 문화적 맥락이나 상황 요인 대신, 상대의 성향 때문이라고 쉽게 판단해 버리는 인지 편향입니다.',
        reflectionQuestion: '다른 문화권의 행동을 이해할 때 어떤 열린 태도가 도움이 될까요?',
        resourceDelta: { budget: 0, time: -1, safety: 0, satisfaction: -6 },
      },
      {
        id: 'C',
        label: '짧은 인사 후 번역 앱을 보여주며 정중하게 필요한 품목만 빠르게 물어본다.',
        outcomeSummary: '정확하게 원하는 물건을 찾아 깔끔하게 계산을 마쳤습니다.',
        travelImpact: '명확한 소통으로 시간과 감정을 안정적으로 관리했습니다.',
        psychologyConcept: '도구 활용적 의사소통 (Adaptive Communication)',
        psychologyExplanation:
          '언어 장벽이 있을 때 보조 도구를 활용해 오해 가능성을 줄이고 목적을 달성하는 실용적 대처입니다.',
        reflectionQuestion: '언어가 통하지 않는 곳에서 상대에게 예의를 전하는 가장 좋은 방법은 무엇일까요?',
        resourceDelta: { budget: -25, time: 0, safety: 3, satisfaction: 6 },
      },
    ],
    explanation: '문화 차이를 개인의 성향으로 오해하지 않는 시각은 세계 여행의 핵심 소양입니다.',
    psychologyConcept: '기본적 귀인 오류와 문화적 공감',
    rewards: { score: 150, experience: 110 },
    difficulty: '보통',
  },

  // FRANCE EXPLORATION (3 Missions)
  {
    missionId: 'fra_exp_1',
    countryId: 'france',
    missionType: 'exploration',
    explorationMode: 'pinpoint',
    title: '파리 지도에서 에펠탑 위치 찾기',
    description:
      '파리 시내를 가로지르는 센강과 주요 랜드마크 배치를 살펴보세요. 1889년 만국박람회를 기념해 세워진 에펠탑은 센강 남서쪽 마르스 광장 끝에 자리 잡고 있습니다.',
    question: '아래 파리 탐험 지도에서 에펠탑(Eiffel Tower)이 위치한 지점을 클릭해 보세요!',
    choices: [
      { id: 'A', label: '센강 남서쪽 · 마르스 광장 인접 지점', x: 26, y: 60 },
      { id: 'B', label: '센강 북쪽 · 몽마르트르 언덕', x: 54, y: 20 },
      { id: 'C', label: '센강 중류 · 시테섬', x: 64, y: 54 },
    ],
    targetZone: { x: 26, y: 60, radius: 14, label: '에펠탑 (센강 좌안 서부)' },
    explanation:
      '정확합니다! 에펠탑은 파리 7구, 센강 좌안(남쪽)의 샹 드 마르스 공원 서북쪽 끝에 우뚝 서 있습니다. 강 건너편 샤요 궁전(트로카데로) 방향에서 바라보면 에펠탑 전경이 가장 잘 보입니다.',
    psychologyConcept: '공간 인지 지도와 도시 랜드마크 배치',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },
  {
    missionId: 'fra_exp_2',
    countryId: 'france',
    missionType: 'exploration',
    explorationMode: 'hotspot',
    title: '센강을 따라 걷는 파리 랜드마크 탐사',
    description:
      '센강변을 따라 파리의 대표 명소 3곳(루브르 박물관, 노트르담 대성당, 오르세 미술관)을 직접 눌러 현장 단서를 확인해 보세요.',
    question: '모든 현장 단서를 확인한 뒤, 원래 기차역 건물을 개조해 인상주의 작품을 전시하는 미술관을 고르세요.',
    choices: [
      {
        id: 'A',
        label: '루브르 박물관 (센강 우안)',
        hint: '과거 프랑스 왕궁으로 쓰였으며 유리 피라미드 입구와 모나리자가 있는 세계 최대 규모 박물관입니다.',
      },
      {
        id: 'B',
        label: '오르세 미술관 (센강 좌안)',
        hint: '1900년 파리 만국박람회 당시 기차역으로 지어진 건물을 개조해 고흐·모네 등 19세기 작품을 전시합니다.',
      },
      {
        id: 'C',
        label: '노트르담 대성당 (시테섬)',
        hint: '센강 가운데 시테섬에 위치한 고딕 양식의 대성당으로 파리 도로 거리 측정의 기준점(포앵 제로)이 있습니다.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      '오르세 미술관은 센강 남쪽(좌안)에 위치한 옛 기차역 건물을 문화 공간으로 재탄생시킨 대표적 도시 재생 사례입니다. 센강 주변을 따라 걷는 것만으로도 파리의 역사적 층위를 한눈에 이해할 수 있습니다.',
    psychologyConcept: '도시 재생과 유산 공간의 활용',
    rewards: { score: 200, experience: 140 },
    difficulty: '보통',
  },
  {
    missionId: 'fra_exp_3',
    countryId: 'france',
    missionType: 'exploration',
    explorationMode: 'quiz',
    title: '프랑스 지역별 지형과 산업 연결하기',
    description:
      '프랑스는 넓은 평야와 다양한 기후 덕분에 유럽 최대의 농업 강국이자 항공·우주, 명품·관광 산업이 발달한 나라입니다.',
    question: '다음 중 프랑스 도시와 대표적 지리·산업 특징이 바르게 연결된 것은 무엇일까요?',
    choices: [
      { id: 'A', label: '보르도 — 서부 대서양 인근 온화한 기후를 바탕으로 한 포도·와인 산업' },
      { id: 'B', label: '니스 — 북극권 툰드라 기후를 이용한 순록 유목 산업' },
      { id: 'C', label: '리옹 — 사하라 사막 한가운데 오아시스 농업' },
    ],
    correctAnswer: 'A',
    explanation:
      '프랑스 남서부의 보르도(Bordeaux)는 대서양에서 불어오는 온화한 바람과 가론강 유역의 자갈·점토 토양 덕분에 세계적인 와인 산지로 발전했습니다. 니스(지중해 휴양), 리옹(론강 합류 지점의 미식·실크·교통 도시) 역시 지리 조건과 산업이 긴밀히 연결되어 있습니다.',
    psychologyConcept: '기후·지형과 지역 산업의 연관성',
    rewards: { score: 200, experience: 150 },
    difficulty: '도전',
  },

  // ==========================================
  // ITALY (3 Missions)
  // ==========================================
  {
    missionId: 'ita_geo_1',
    countryId: 'italy',
    missionType: 'geography',
    title: '일곱 언덕 위의 영원의 도시',
    description: '고대 로마 제국의 중심지이자 도시 내부에 바티칸 시국이라는 독립 국가를 품고 있는 이탈리아의 수도를 찾습니다.',
    question: '이탈리아의 수도이자 콜로세움이 있는 도시는 어디일까요?',
    choices: [
      { id: 'A', label: '밀라노' },
      { id: 'B', label: '로마' },
      { id: 'C', label: '베네치아' },
      { id: 'D', label: '나폴리' },
    ],
    correctAnswer: 'B',
    explanation:
      '이탈리아의 수도는 로마(Roma)입니다. 테베레강 유역의 일곱 언덕을 중심으로 발달한 로마는 고대 유적과 현대 도시가 공존하며, 세계에서 가장 작은 나라인 바티칸 시국을 품고 있습니다.',
    psychologyConcept: '역사 도시의 입지와 도시 내부의 월경지',
    rewards: { score: 120, experience: 90 },
    difficulty: '쉬움',
  },
  {
    missionId: 'ita_psy_1',
    countryId: 'italy',
    missionType: 'psychology',
    title: '베네치아 수로 앞에서의 예산 고민',
    description:
      '물의 도시 베네치아에 도착했습니다. 로맨틱한 개인 곤돌라는 30분에 약 100달러인 반면, 시민들이 타는 수상버스(바포레토)는 단 10달러로 대운하 전체를 감상할 수 있습니다.',
    question: '제한된 여행 예산 속에서 어떤 교통수단을 선택할까요?',
    choices: [
      {
        id: 'A',
        label: '수상버스(바포레토)를 타고 현지인들과 함께 대운하 풍경을 즐긴다.',
        outcomeSummary: '1층 야외 좌석에 앉아 산 마르코 광장까지 대운하의 웅장한 건축물들을 합리적인 가격에 감상했습니다.',
        travelImpact: '예산을 크게 아끼면서도 현지 생활감을 느껴 만족도가 올랐습니다.',
        psychologyConcept: '기회비용과 가치 기반 소비 (Opportunity Cost)',
        psychologyExplanation:
          '한정된 자원을 쓸 때 다른 대안에서 얻을 수 있는 가치(기회비용)를 함께 고려하면 예산 대비 만족도를 크게 높일 수 있습니다.',
        reflectionQuestion: '여행에서 꼭 비용을 더 들이더라도 경험하고 싶은 것과 아끼고 싶은 것의 기준은 무엇인가요?',
        resourceDelta: { budget: -10, time: -1, safety: 4, satisfaction: 9 },
      },
      {
        id: 'B',
        label: '베네치아만의 특별한 경험이기에 개인 곤돌라를 타기로 결정한다.',
        outcomeSummary: '좁고 고요한 골목 수로를 지나며 잊지 못할 사진을 남겼습니다.',
        travelImpact: '예산 지출은 컸지만 정서적 만족감이 매우 높았습니다.',
        psychologyConcept: '경험 소비와 정서적 가치 (Experiential Consumption)',
        psychologyExplanation:
          '물질적 소유보다 특별한 경험에 지출할 때 기억의 가치가 오래 남는 경향이 있으나, 전체 여행 예산과의 균형을 살피는 것이 중요합니다.',
        reflectionQuestion: '추억을 위한 과감한 지출이 후회되지 않으려면 어떤 계획이 뒷받침되어야 할까요?',
        resourceDelta: { budget: -100, time: -1, safety: 3, satisfaction: 11 },
      },
    ],
    explanation: '같은 풍경도 예산 배분 기준에 따라 전혀 다른 만족과 여정의 여유를 만들어냅니다.',
    psychologyConcept: '기회비용과 경험 소비',
    rewards: { score: 150, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'ita_exp_1',
    countryId: 'italy',
    missionType: 'exploration',
    explorationMode: 'hotspot',
    title: '이탈리아 반도의 지형과 도시 탐험',
    description: '북부 공업 지대부터 아드리아해 석호 도시, 남부 지중해 화산 지역까지 이탈리아의 세 도시 단서를 확인하세요.',
    question: '118개의 작은 섬들이 400여 개의 다리로 이어진 아드리아해 석호 위의 수상 도시는 어디일까요?',
    choices: [
      { id: 'A', label: '밀라노', hint: '북부 포강 평야에 위치해 금융·패션·디자인 산업이 발달한 경제 중심지입니다.' },
      { id: 'B', label: '베네치아', hint: '아드리아해 북부 얕은 석호(라군) 안의 섬들을 다리와 운하로 연결해 건설한 해양 무역 도시입니다.' },
      { id: 'C', label: '피렌체', hint: '아르노강 유역 토스카나 지방의 중심 도시로 르네상스 미술과 건축이 꽃피었습니다.' },
    ],
    correctAnswer: 'B',
    explanation:
      '베네치아(Venezia)는 외적의 침입을 피하기 위해 얕은 바다 석호(라군) 위의 진흙 섬들에 나무 말뚝을 박아 건설한 독특한 수변 도시입니다. 최근에는 해수면 상승과 침수 문제를 막기 위해 모세(MOSE) 방조제 시스템을 운영하고 있습니다.',
    psychologyConcept: '석호 지형과 환경 적응 도시',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // UK (3 Missions)
  // ==========================================
  {
    missionId: 'uk_geo_1',
    countryId: 'uk',
    missionType: 'geography',
    title: '세계 시간의 기준, 그리니치 본초자오선',
    description: '영국 런던 남동부의 그리니치 천문대는 세계 표준시와 경도 계산의 출발점이 되는 지리적 기준선입니다.',
    question: '런던 그리니치를 지나는 경도 0도 선을 무엇이라고 부를까요?',
    choices: [
      { id: 'A', label: '적도' },
      { id: 'B', label: '본초자오선' },
      { id: 'C', label: '날짜변경선' },
      { id: 'D', label: '북회귀선' },
    ],
    correctAnswer: 'B',
    explanation:
      '경도 0도인 본초자오선(Prime Meridian)은 영국 런던 그리니치 천문대를 기준으로 정해졌습니다. 이 선을 기준으로 동경과 서경이 나뉘며, 세계 협정시(UTC)의 기준점이 됩니다.',
    psychologyConcept: '경도와 세계 표준시 체계',
    rewards: { score: 120, experience: 90 },
    difficulty: '쉬움',
  },
  {
    missionId: 'uk_psy_1',
    countryId: 'uk',
    missionType: 'psychology',
    title: '갑작스러운 런던 소나기와 일정 지연',
    description:
      '맑던 하늘에서 갑자기 비가 쏟아집니다. 영국은 하루에도 사계절이 있다는 말이 있을 만큼 날씨가 자주 변합니다. 야외 투어 시작 20분 전, 우산도 없는 상태입니다.',
    question: '변덕스러운 날씨 앞에서 어떤 대응을 선택할까요?',
    choices: [
      {
        id: 'A',
        label: '근처 상점에서 튼튼한 접이식 우산을 구매하고 무료 개방 중인 대영 박물관으로 일정을 바꾼다.',
        outcomeSummary: '비를 피하면서 실내에서 로제타석 등 세계 문명 유물을 쾌적하게 관람했습니다.',
        travelImpact: '소소한 지출이 있었지만 안전도와 만족도를 모두 지켰습니다.',
        psychologyConcept: '상황 적응과 대안 계획 (Adaptive Coping)',
        psychologyExplanation:
          '통제할 수 없는 변수(날씨)를 원망하기보다 즉시 통제 가능한 자원(우산, 실내 대안)으로 주의를 옮기는 것이 스트레스 관리에 효과적입니다.',
        reflectionQuestion: '통제할 수 없는 돌발 상황이 생겼을 때 내가 즉시 바꿀 수 있는 요소는 무엇일까요?',
        resourceDelta: { budget: -20, time: 0, safety: 6, satisfaction: 8 },
      },
      {
        id: 'B',
        label: '곧 그칠 거라 낙관하며 비를 맞은 채 야외 투어 출발지에서 기다린다.',
        outcomeSummary: '비가 1시간 넘게 이어져 옷이 젖고 투어마저 취소되어 체온이 떨어졌습니다.',
        travelImpact: '낙관 편향으로 인해 시간과 안전도가 모두 하락했습니다.',
        psychologyConcept: '낙관 편향 (Optimism Bias)',
        psychologyExplanation:
          '객관적 확률이나 준비 없이 "나에게는 별일 없을 것"이라고 기대하는 낙관 편향은 대비 행동을 늦출 수 있습니다.',
        reflectionQuestion: '긍정적 태도와 근거 없는 낙관을 어떻게 구분할 수 있을까요?',
        resourceDelta: { budget: 0, time: -3, safety: -8, satisfaction: -6 },
      },
    ],
    explanation: '서안 해양성 기후 지역에서는 날씨 변화에 맞춘 유연한 실내·외 대안 설계가 중요합니다.',
    psychologyConcept: '낙관 편향과 상황 적응',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'uk_exp_1',
    countryId: 'uk',
    missionType: 'exploration',
    explorationMode: 'pinpoint',
    title: '런던 템스강 변에서 빅벤 찾기',
    description: '영국 의회가 있는 웨스트민스터 궁전 북쪽 끝에 우뚝 선 시계탑 빅벤(엘리자베스 타워)은 런던의 상징입니다.',
    question: '템스강이 굽이쳐 흐르는 런던 중심 지도에서 빅벤(웨스트민스터)의 위치를 클릭해 보세요!',
    choices: [
      { id: 'A', label: '템스강 서부 만곡부 · 웨스트민스터 지구', x: 30, y: 58 },
      { id: 'B', label: '동부 하류 · 타워 브리지 인근', x: 74, y: 46 },
      { id: 'C', label: '남동부 · 그리니치 공원', x: 84, y: 74 },
    ],
    targetZone: { x: 30, y: 58, radius: 14, label: '빅벤 & 웨스트민스터 궁전' },
    explanation:
      '정확합니다! 빅벤은 템스강 서쪽 강변에 자리한 영국 국회의사당의 시계탑입니다. 동쪽 하류로 이동하면 개폐식 다리인 타워 브리지와 런던탑을 만날 수 있습니다.',
    psychologyConcept: '하천 만곡부와 수도의 정치·역사 공간',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // JAPAN (3 Missions)
  // ==========================================
  {
    missionId: 'jpn_geo_1',
    countryId: 'japan',
    missionType: 'geography',
    title: '불의 고리와 일본의 화산 지형',
    description: '일본은 지진과 온천이 매우 많고, 3,776m 높이의 성층 화산 후지산이 나라의 상징으로 자리 잡고 있습니다.',
    question: '일본에 화산과 온천, 지진이 빈번하게 발생하는 가장 근본적인 지리적 이유는 무엇일까요?',
    choices: [
      { id: 'A', label: '유라시아·태평양·필리핀판 등 여러 지각판이 만나는 환태평양 조산대에 위치해서' },
      { id: 'B', label: '국토 전체가 사막 기후로 건조하기 때문에' },
      { id: 'C', label: '적도 바로 위에 있어 태풍이 지나가지 않아서' },
    ],
    correctAnswer: 'A',
    explanation:
      '일본 열도는 여러 해양판과 대륙판이 충돌·섭입하는 환태평양 조산대("불의 고리") 위에 있습니다. 이로 인해 지진 대비 건축 기술과 방재 훈련이 발달했고, 풍부한 지열 에너지를 활용한 온천 문화도 형성되었습니다.',
    psychologyConcept: '판 구조론과 자연환경의 양면성',
    rewards: { score: 130, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'jpn_psy_1',
    countryId: 'japan',
    missionType: 'psychology',
    title: '출근길 신주쿠역의 복잡한 환승',
    description:
      '세계에서 이용객이 가장 많은 역 중 하나인 도쿄 신주쿠역. 수십 개의 출구와 노선 안내판 앞에서 마음이 급해집니다. 기차 출발까지 남은 시간은 8분입니다.',
    question: '혼잡한 환승역에서 어떻게 움직이는 것이 가장 현명할까요?',
    choices: [
      {
        id: 'A',
        label: '사람 흐름을 막지 않는 벽 쪽으로 비켜서서 노선 색상과 번호를 확인한 뒤 역무원에게 물어본다.',
        outcomeSummary: '정확한 승강장 번호를 빠르게 확인해 출발 2분 전에 여유롭게 탑승했습니다.',
        travelImpact: '안전과 시간, 타인에 대한 배려를 모두 지켰습니다.',
        psychologyConcept: '주의 통제와 규범 존중 (Attentional Control)',
        psychologyExplanation:
          '복잡한 자극(군중, 수많은 표지판) 속에서 핵심 단서(색상 코드, 번호)에만 집중하고 안전 공간을 확보하면 실수를 줄일 수 있습니다.',
        reflectionQuestion: '정보가 한꺼번에 쏟아질 때 나만의 정보 정리 방식은 무엇인가요?',
        resourceDelta: { budget: 0, time: 0, safety: 8, satisfaction: 8 },
      },
      {
        id: 'B',
        label: '일단 사람들이 많이 달려가는 계단 쪽으로 무작정 따라 뛰어간다.',
        outcomeSummary: '반대 방향 급행열차 승강장으로 잘못 들어가 다음 열차를 30분 기다려야 했습니다.',
        travelImpact: '군중 심리로 인해 시간과 만족도가 줄었습니다.',
        psychologyConcept: '조급함과 군중 추종 (Herd Behavior under Time Pressure)',
        psychologyExplanation:
          '시간 압박은 검증 없이 주변 다수의 움직임을 무비판적으로 따라가게 만드는 원인이 됩니다.',
        reflectionQuestion: '마음이 급할수록 잠깐 멈춰 확인해야 하는 이유는 무엇일까요?',
        resourceDelta: { budget: 0, time: -3, safety: -5, satisfaction: -5 },
      },
    ],
    explanation: '대도시 대중교통 시스템에서는 속도보다 정확한 기준(노선 색상·플랫폼 번호) 확인이 더 빠릅니다.',
    psychologyConcept: '주의 통제와 시간 압박 속 의사결정',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'jpn_exp_1',
    countryId: 'japan',
    missionType: 'exploration',
    explorationMode: 'hotspot',
    title: '일본의 고도 교토와 도쿄 비교 탐험',
    description: '일본을 대표하는 세 지역의 지리·문화적 특징을 확인하고 질문에 답해 보세요.',
    question: '바둑판 모양의 거리 구조를 간직한 천 년의 옛 수도이자 수많은 전통 목조 사찰이 있는 도시는 어디일까요?',
    choices: [
      { id: 'A', label: '도쿄', hint: '관동 평야와 도쿄만에 자리 잡은 현대 일본의 수도이자 경제·교통 중심지입니다.' },
      { id: 'B', label: '교토', hint: '분지 지형 안에 자리 잡은 옛 수도로 794년부터 천 년 넘게 일본 전통 문화의 중심이었습니다.' },
      { id: 'C', label: '삿포로', hint: '북쪽 홋카이도의 중심 도시로 겨울철 적설량이 많아 눈 축제로 유명합니다.' },
    ],
    correctAnswer: 'B',
    explanation:
      '교토(Kyoto)는 사방이 산으로 둘러싸인 분지 안에 건설된 계획도시로, 전쟁 피해를 비교적 적게 입어 기요미즈데라·금각사 등 수많은 세계문화유산이 보존되어 있습니다.',
    psychologyConcept: '분지 지형과 역사 도시 보존',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // CHINA (3 Missions)
  // ==========================================
  {
    missionId: 'chn_geo_1',
    countryId: 'china',
    missionType: 'geography',
    title: '서고동저 지형과 중국의 대하천',
    description: '중국 서부 티베트 고원은 평균 해발고도가 4,000m를 넘으며 "세계의 지붕"이라 불립니다.',
    question: '중국 지형이 서쪽이 높고 동쪽이 낮은 "서고동저" 형태이기 때문에 나타나는 자연 현상은 무엇일까요?',
    choices: [
      { id: 'A', label: '황허와 창장강 같은 큰 강들이 대체로 서쪽에서 동쪽 바다로 흐른다.' },
      { id: 'B', label: '모든 강이 동쪽 바다에서 서쪽 사막으로 거꾸로 흐른다.' },
      { id: 'C', label: '동부 해안 지역이 서부 고원보다 해발고도가 훨씬 높다.' },
    ],
    correctAnswer: 'A',
    explanation:
      '중국은 서쪽 티베트 고원 지대가 높고 동쪽 태평양 연안 평야가 낮은 지형 덕분에 황허와 창장강 등 주요 하천이 서에서 동으로 흐르며 비옥한 충적 평야를 형성했습니다.',
    psychologyConcept: '지형 고도와 하천의 유로',
    rewards: { score: 130, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'chn_psy_1',
    countryId: 'china',
    missionType: 'psychology',
    title: '현금 없는 거리에서의 결제 난관',
    description:
      '베이징의 한 골목 상점에서 간식을 사려는데, 상점 주인이 현금 잔돈이 부족하다며 QR 모바일 결제를 안내합니다. 다행히 당신은 국제 카드 연동 모바일 페이 앱을 미리 설치해 두었습니다.',
    question: '새로운 디지털 결제 환경에서 어떻게 행동할까요?',
    choices: [
      {
        id: 'A',
        label: '미리 준비한 모바일 페이 화면을 열어 금액과 상점명을 정확히 대조한 뒤 결제한다.',
        outcomeSummary: '단 5초 만에 결제를 마치고 따뜻한 군밤을 받아 들었습니다.',
        travelImpact: '사전 준비 덕분에 시간과 안전을 모두 챙겼습니다.',
        psychologyConcept: '사전 준비와 기술 수용성 (Proactive Coping)',
        psychologyExplanation:
          '여행지의 인프라 특성을 미리 조사해 대비하는 사전 대처 전략은 낯선 환경에서의 불안을 줄이고 실행력을 높여 줍니다.',
        reflectionQuestion: '새로운 환경으로 떠나기 전 미리 확인해 두면 불안을 가장 크게 줄여 주는 정보는 무엇일까요?',
        resourceDelta: { budget: -10, time: 0, safety: 6, satisfaction: 9 },
      },
      {
        id: 'B',
        label: '모바일 앱 사용이 번거로워 고액권 지폐만 내밀며 거스름돈이 나올 때까지 기다린다.',
        outcomeSummary: '주인이 옆 가게에서 잔돈을 바꿔 오느라 서로 난처하게 20분을 보냈습니다.',
        travelImpact: '익숙한 방식만 고수하다 시간이 소모되었습니다.',
        psychologyConcept: '현상 유지 편향 (Status Quo Bias)',
        psychologyExplanation:
          '더 효율적인 대안이 있어도 기존에 익숙한 방식만을 유지하려는 심리로, 환경 변화에 대한 적응 속도를 늦출 수 있습니다.',
        reflectionQuestion: '익숙함을 벗어나 새로운 방식을 시도할 때 가장 망설여지는 이유는 무엇인가요?',
        resourceDelta: { budget: -10, time: -2, safety: 0, satisfaction: -2 },
      },
    ],
    explanation: '지역 사회의 생활 기술 변화를 이해하고 준비하면 여행의 마찰을 크게 줄일 수 있습니다.',
    psychologyConcept: '현상 유지 편향과 사전 대처',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'chn_exp_1',
    countryId: 'china',
    missionType: 'exploration',
    explorationMode: 'quiz',
    title: '만리장성이 산맥 능선을 따라 지어진 이유',
    description: '베이징 북쪽 산악 지대에 위치한 만리장성 구간(바다링·무톈위)을 답사합니다.',
    question: '만리장성이 평지가 아닌 가파른 산맥의 능선을 따라 축조된 가장 큰 지리·군사적 이유는 무엇일까요?',
    choices: [
      { id: 'A', label: '험준한 산악 지형을 자연 방벽으로 삼고 높은 곳에서 시야를 넓게 확보하기 위해' },
      { id: 'B', label: '배가 지나가는 운하를 만들기 위해' },
      { id: 'C', label: '대규모 논농사를 짓기 위해' },
    ],
    correctAnswer: 'A',
    explanation:
      '만리장성은 북방 초원 유목 세력의 이동을 감시하고 방어하기 위해 산능선과 고개(관문)를 연결해 지어졌습니다. 지형을 활용해 방어 효율을 극대화한 대표적인 역사 건축물입니다.',
    psychologyConcept: '지형 활용과 방어 입지',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // THAILAND (3 Missions)
  // ==========================================
  {
    missionId: 'tha_geo_1',
    countryId: 'thailand',
    missionType: 'geography',
    title: '방콕을 적시는 짜오프라야강과 수상 생활',
    description: '방콕 시내에는 도로뿐 아니라 강과 운하를 오가는 수상 보트가 주요 교통수단으로 활용됩니다.',
    question: '태국 중앙 평야를 지나 방콕을 관통하며 태국만으로 흘러드는 강은 어디일까요?',
    choices: [
      { id: 'A', label: '짜오프라야강' },
      { id: 'B', label: '나일강' },
      { id: 'C', label: '아마존강' },
      { id: 'D', label: '미시시피강' },
    ],
    correctAnswer: 'A',
    explanation:
      '짜오프라야강(Chao Phraya River)은 태국 북부 산지에서 발원해 비옥한 삼각주 평야를 만들고 방콕을 거쳐 바다로 흐릅니다. 이 강 덕분에 태국은 세계적인 쌀 생산국이자 수상 시장 문화가 발달한 나라가 되었습니다.',
    psychologyConcept: '충적 평야와 수변 생활 문화',
    rewards: { score: 120, experience: 90 },
    difficulty: '쉬움',
  },
  {
    missionId: 'tha_psy_1',
    countryId: 'thailand',
    missionType: 'psychology',
    title: '방콕 왕궁 앞 복장 규정 안내',
    description:
      '무더운 열대 날씨 때문에 반바지와 민소매 차림으로 방콕 왕궁 입구에 도착했습니다. 그런데 사원과 왕궁은 신성한 공간이므로 어깨와 무릎을 가리는 단정한 복장만 입장이 허용된다고 합니다.',
    question: '이 상황에서 여행자는 어떻게 행동하는 것이 좋을까요?',
    choices: [
      {
        id: 'A',
        label: '현지 문화에 대한 존중의 의미로 공식 대여소나 주변 상점에서 긴 바지와 얇은 스카프를 준비한다.',
        outcomeSummary: '단정한 차림으로 입장해 에메랄드 사원의 황금빛 건축미를 경건하게 둘러보았습니다.',
        travelImpact: '문화 존중을 실천하며 안전도와 만족도를 높였습니다.',
        psychologyConcept: '문화 상대주의와 규범 존중 (Cultural Relativism)',
        psychologyExplanation:
          '방문지의 종교·역사적 규범을 내 기준과 다르다는 이유로 불편해하기보다 그 공동체의 맥락 안에서 이해하고 따르는 성숙한 태도입니다.',
        reflectionQuestion: '내가 속한 사회와 다른 규칙을 만났을 때 존중의 태도를 보이는 것이 왜 중요할까요?',
        resourceDelta: { budget: -15, time: -1, safety: 6, satisfaction: 10 },
      },
      {
        id: 'B',
        label: '규정이 까다롭다고 불평하며 주변 비공식 호객꾼이 추천하는 먼 보석 상점 투어로 급히 발길을 돌린다.',
        outcomeSummary: '왕궁이 휴무라고 속이는 호객꾼 말에 휩쓸려 불필요한 쇼핑 일정에 시간을 허비했습니다.',
        travelImpact: '감정적 반응으로 인해 정보 검증을 놓쳐 시간과 안전도가 떨어졌습니다.',
        psychologyConcept: '정서적 반응성과 확증 편향 (Emotional Reactivity)',
        psychologyExplanation:
          '당황하거나 불편한 감정이 올라올 때 사실 확인 없이 낯선 제안에 쉽게 설득될 수 있으므로, 잠시 숨을 고르고 공식 안내를 확인하는 것이 중요합니다.',
        reflectionQuestion: '기분이 상했을 때 내 판단력이 흐려지지 않도록 스스로를 진정시키는 방법이 있나요?',
        resourceDelta: { budget: -45, time: -4, safety: -10, satisfaction: -7 },
      },
    ],
    explanation: '사원 복장 규정을 존중하는 태도는 원활한 문화 체험과 사기 예방 모두에 도움이 됩니다.',
    psychologyConcept: '문화 상대주의와 정서 조절',
    rewards: { score: 150, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'tha_exp_1',
    countryId: 'thailand',
    missionType: 'exploration',
    explorationMode: 'hotspot',
    title: '방콕의 열대 몬순 기후와 수상 시장 탐사',
    description: '태국의 계절 변화와 수상 공간의 특징을 살펴보고 옳은 설명을 골라 보세요.',
    question: '열대 몬순 기후의 태국에서 농산물과 먹거리를 배에 싣고 거래하는 전통 문화가 발달한 이유는 무엇일까요?',
    choices: [
      { id: 'A', label: '강과 운하망이 촘촘히 연결되어 배를 이용한 이동과 교역이 육로보다 편리했기 때문' },
      { id: 'B', label: '일 년 내내 강물이 얼어붙어 썰매를 타기 때문' },
      { id: 'C', label: '비가 전혀 오지 않는 사막 지형이기 때문' },
    ],
    correctAnswer: 'A',
    explanation:
      '방콕과 중부 평야는 짜오프라야강에서 갈라져 나온 수많은 운하(클롱)로 연결되어 있어 예로부터 물 위에서 교역하는 수상 시장(담넌사두억 등)이 발달했습니다.',
    psychologyConcept: '하천 교통망과 생활 양식',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // USA (3 Missions)
  // ==========================================
  {
    missionId: 'usa_geo_1',
    countryId: 'usa',
    missionType: 'geography',
    title: '대서양에서 태평양까지: 미국의 광대한 시간대',
    description: '미국 본토는 동서 길이가 매우 길어 뉴욕(동부)과 로스앤젤레스(서부) 사이에 시차가 발생합니다.',
    question: '미국 본토(알래스카·하와이 제외)에는 몇 개의 표준 시간대가 적용될까요?',
    choices: [
      { id: 'A', label: '1개 (전국 동일)' },
      { id: 'B', label: '2개' },
      { id: 'C', label: '4개 (동부·중부·산악·태평양)' },
      { id: 'D', label: '10개' },
    ],
    correctAnswer: 'C',
    explanation:
      '미국 본토 48개 주는 동부(EST), 중부(CST), 산악(MST), 태평양(PST) 등 4개의 시간대를 사용하며 알래스카와 하와이까지 포함하면 총 6개 시간대가 있습니다. 따라서 대륙 횡단 비행 시 시차 계산이 필수입니다.',
    psychologyConcept: '경도 차이와 다중 시간대',
    rewards: { score: 130, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'usa_psy_1',
    countryId: 'usa',
    missionType: 'psychology',
    title: '그랜드 캐니언 사막 트레킹과 물 부족',
    description:
      '광활한 그랜드 캐니언 사우스 림 트레일. 내려가는 길은 수월하지만 다시 올라오는 오르막은 경사가 가파르고 햇볕이 강합니다. 현재 가지고 있는 물이 절반밖에 남지 않았습니다.',
    question: '더 깊이 내려가고 싶은 호기심과 안전 사이에서 어떻게 결정할까요?',
    choices: [
      {
        id: 'A',
        label: '돌아오는 오르막길에 필요한 물과 체력을 계산해 지금 지점에서 전망을 즐기고 되돌아간다.',
        outcomeSummary: '안전하게 탐방로 입구로 돌아와 충분한 수분을 보충하며 일몰까지 감상했습니다.',
        travelImpact: '위험을 미리 차단하여 안전도와 만족도가 모두 높게 유지되었습니다.',
        psychologyConcept: '자기 조절과 위험 관리 (Self-Regulation & Risk Management)',
        psychologyExplanation:
          '국립공원 조난 사고의 상당수는 "조금만 더 가보자"는 욕심 때문에 발생합니다. 반환점을 미리 정하는 규칙은 과신을 막아 주는 지혜입니다.',
        reflectionQuestion: '목표가 눈앞에 보일 때 안전을 위해 스스로 멈춤선을 정해 본 적이 있나요?',
        resourceDelta: { budget: 0, time: 0, safety: 10, satisfaction: 8 },
      },
      {
        id: 'B',
        label: '여기까지 온 김에 물이 부족해도 아래 계곡까지 끝까지 내려갔다 오기로 한다.',
        outcomeSummary: '오르막길에서 심한 탈수 증세를 겪어 레인저의 도움을 받고 겨우 복귀했습니다.',
        travelImpact: '안전도가 크게 떨어지고 구조 대기로 일정 시간도 소비했습니다.',
        psychologyConcept: '과신 편향 (Overconfidence Bias)',
        psychologyExplanation:
          '자신의 체력이나 환경의 난이도를 실제보다 낙관적으로 과대평가할 때 안전사고 위험이 높아집니다.',
        reflectionQuestion: '자연환경 앞에서 인간의 한계를 인정하는 태도가 왜 중요할까요?',
        resourceDelta: { budget: -30, time: -4, safety: -15, satisfaction: -6 },
      },
    ],
    explanation: '사막·고산 지형 탐험에서는 내려가는 에너지보다 돌아올 에너지와 수분을 먼저 계산해야 합니다.',
    psychologyConcept: '과신 편향과 자기 조절',
    rewards: { score: 150, experience: 110 },
    difficulty: '보통',
  },
  {
    missionId: 'usa_exp_1',
    countryId: 'usa',
    missionType: 'exploration',
    explorationMode: 'pinpoint',
    title: '미국의 지형: 자유의 여신상과 대서양 관문 뉴욕',
    description: '허드슨강 하구 리버티 섬에 자리한 자유의 여신상은 19~20세기 수많은 이민자들이 배를 타고 도착하며 가장 먼저 마주한 관문입니다.',
    question: '미국 지도에서 동부 대서양 연안의 관문 도시 뉴욕(자유의 여신상) 위치를 클릭해 보세요!',
    choices: [
      { id: 'A', label: '동부 대서양 연안 · 뉴욕 항만', x: 78, y: 40 },
      { id: 'B', label: '서부 애리조나 · 그랜드 캐니언', x: 26, y: 58 },
      { id: 'C', label: '서부 태평양 연안 · 샌프란시스코', x: 14, y: 44 },
    ],
    targetZone: { x: 78, y: 40, radius: 15, label: '뉴욕 자유의 여신상 (동부 연안)' },
    explanation:
      '정확합니다! 뉴욕은 미국 북동부 대서양 연안의 천연 양항에 자리 잡고 있어 유럽과 연결되는 해상 무역 및 이민의 중심 관문으로 발전했습니다.',
    psychologyConcept: '항만 입지와 대륙 횡단 지리',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // CANADA (3 Missions)
  // ==========================================
  {
    missionId: 'can_geo_1',
    countryId: 'canada',
    missionType: 'geography',
    title: '빙하가 빚어낸 호수의 나라',
    description: '캐나다 로키산맥의 밴프 국립공원에는 에메랄드빛을 띠는 수많은 호수들이 펼쳐져 있습니다.',
    question: '캐나다에 세계에서 가장 많은 호수가 분포하게 된 주요 지형 형성 원인은 무엇일까요?',
    choices: [
      { id: 'A', label: '과거 빙하기 거대한 대륙 빙하가 땅을 깎고 녹으면서 물이 고였기 때문' },
      { id: 'B', label: '열대 우림의 잦은 스콜 때문' },
      { id: 'C', label: '모든 호수가 인공 저수지로 건설되었기 때문' },
    ],
    correctAnswer: 'A',
    explanation:
      '캐나다는 빙하기 당시 거대한 빙상이 국토 대부분을 덮고 있었으며, 빙하가 후퇴하면서 남긴 빙식 작용과 퇴적 지형(모레인) 덕분에 레이크 루이스 같은 수많은 빙하 호수가 형성되었습니다.',
    psychologyConcept: '빙하 지형과 자연호의 형성',
    rewards: { score: 130, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'can_psy_1',
    countryId: 'canada',
    missionType: 'psychology',
    title: '로키산맥 숲길에서 야생동물 주의 표지판 발견',
    description:
      '밴프의 아름다운 숲길을 산책하던 중 "최근 곰 출현 지역 — 2인 이상 동행 및 곰 스프레이 휴대 권장" 안내판을 보았습니다. 조금만 더 걸으면 전망이 좋은 호수가 나옵니다.',
    question: '경고 안내판을 본 뒤 어떤 선택을 하시겠습니까?',
    choices: [
      {
        id: 'A',
        label: '탐방 안내소 레인저에게 최신 상황을 확인하고 다른 탐방객 그룹이 지나갈 때 안전거리를 맞춰 동행한다.',
        outcomeSummary: '전문 안내와 동행 덕분에 야생동물 안전 수칙을 지키며 무사히 호수 절경을 감상했습니다.',
        travelImpact: '안전 의식과 협력이 결합해 안심하고 자연을 만끽했습니다.',
        psychologyConcept: '예방적 안전 행동과 협력 (Precautionary Behavior)',
        psychologyExplanation:
          '위험 신호를 무시하지 않고 공식 가이드라인에 맞춰 사회적 협력을 활용하는 것은 자연 탐험의 기본 원칙입니다.',
        reflectionQuestion: '경고 신호를 접했을 때 지나치게 겁먹지도, 무시하지도 않는 태도는 어떤 모습일까요?',
        resourceDelta: { budget: 0, time: -1, safety: 10, satisfaction: 9 },
      },
      {
        id: 'B',
        label: '나에게는 나타나지 않을 거라며 혼자 조용히 호수까지 빠르게 다녀온다.',
        outcomeSummary: '다행히 마주치진 않았지만 작은 소리에도 크게 긴장해 풍경을 제대로 즐기지 못했습니다.',
        travelImpact: '과도한 긴장과 안전도 저하로 만족도가 낮아졌습니다.',
        psychologyConcept: '경고 둔감화와 불안 (Warning Desensitization)',
        psychologyExplanation:
          '경고문을 단순한 형식적 문구로 넘겨버리면 돌발 상황 대처 여력이 줄어들고 심리적 긴장이 오히려 커질 수 있습니다.',
        reflectionQuestion: '안전 수칙을 지키는 것이 오히려 마음의 여유를 주는 이유는 무엇일까요?',
        resourceDelta: { budget: 0, time: 0, safety: -10, satisfaction: -4 },
      },
    ],
    explanation: '캐나다 국립공원에서는 야생동물 보호와 탐방객 안전을 위해 거리 유지 수칙을 엄격히 지킵니다.',
    psychologyConcept: '예방적 안전 행동과 위험 신호 해석',
    rewards: { score: 150, experience: 100 },
    difficulty: '쉬움',
  },
  {
    missionId: 'can_exp_1',
    countryId: 'canada',
    missionType: 'exploration',
    explorationMode: 'quiz',
    title: '캐나다의 이중 언어 문화와 지리',
    description: '오타와와 몬트리올·퀘벡 지역을 여행하면 영어와 프랑스어 안내판이 함께 표기되어 있는 모습을 볼 수 있습니다.',
    question: '캐나다의 공식 공용어 조합으로 옳은 것은 무엇일까요?',
    choices: [
      { id: 'A', label: '영어와 프랑스어' },
      { id: 'B', label: '영어와 스페인어' },
      { id: 'C', label: '프랑스어와 독일어' },
    ],
    correctAnswer: 'A',
    explanation:
      '캐나다는 역사적 배경(프랑스와 영국의 식민 정착 역사)으로 인해 영어와 프랑스어를 모두 공식 연방 언어로 사용합니다. 특히 퀘벡주에서는 프랑스어가 중심 언어로 쓰입니다.',
    psychologyConcept: '역사적 배경과 다문화 공존',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // EGYPT (3 Missions)
  // ==========================================
  {
    missionId: 'egy_geo_1',
    countryId: 'egypt',
    missionType: 'geography',
    title: '사막을 적시는 나일강의 선물',
    description: '이집트 국토의 90% 이상은 사하라 사막에 속하지만, 인구의 대부분은 한 줄기의 강 주변에 모여 살아갑니다.',
    question: '이집트 남부에서 북쪽 지중해로 흐르며 삼각주(델타)를 형성하는 세계 최장 수준의 강은 무엇일까요?',
    choices: [
      { id: 'A', label: '유프라테스강' },
      { id: 'B', label: '나일강' },
      { id: 'C', label: '콩고강' },
      { id: 'D', label: '인더스강' },
    ],
    correctAnswer: 'B',
    explanation:
      '나일강(Nile River)은 이집트를 남에서 북으로 가로질러 지중해로 빠져나갑니다. 고대부터 나일강의 정기적 범람이 비옥한 토양을 공급하여 인류 최초의 문명 중 하나인 이집트 문명을 일구었습니다.',
    psychologyConcept: '외래 하천과 사막 문명의 입지',
    rewards: { score: 120, experience: 90 },
    difficulty: '쉬움',
  },
  {
    missionId: 'egy_psy_1',
    countryId: 'egypt',
    missionType: 'psychology',
    title: '카이로 전통 시장(칸 엘 칼릴리)에서의 흥정',
    description:
      '활기찬 카이로 전통 시장. 상인이 작은 파피루스 책갈피를 보여주며 처음 가격을 주변 시세보다 훨씬 높게 부른 뒤 "특별히 깎아 주겠다"고 제안합니다.',
    question: '흥정 문화가 보편적인 시장에서 어떻게 대응하시겠습니까?',
    choices: [
      {
        id: 'A',
        label: '처음 제시된 높은 가격에 흔들리지 않고 내가 생각하는 적정 예산 기준을 정한 뒤 웃으며 제안한다.',
        outcomeSummary: '유쾌한 대화 끝에 적정 가격으로 합의하고 상인과 악수하며 기념품을 구매했습니다.',
        travelImpact: '예산을 합리적으로 지켰고 현지 상인과의 교류도 즐거웠습니다.',
        psychologyConcept: '기준점 편향 극복 (Anchoring Effect Awareness)',
        psychologyExplanation:
          '협상에서 상대가 처음 부른 높은 숫자가 기준점(앵커)이 되어 판단을 흔드는 현상을 기준점 효과라고 합니다. 사전 시세와 내 한계 예산을 미리 정해 두면 현명하게 협상할 수 있습니다.',
        reflectionQuestion: '가격이나 조건을 협상할 때 상대가 제시한 첫 숫자에 영향을 덜 받으려면 어떻게 해야 할까요?',
        resourceDelta: { budget: -15, time: -1, safety: 3, satisfaction: 9 },
      },
      {
        id: 'B',
        label: '"원래 가격의 절반이나 깎아주다니 이득이다"라고 생각하며 바로 구매한다.',
        outcomeSummary: '옆 가게에서 똑같은 물건이 훨씬 저렴하게 팔리는 것을 뒤늦게 보았습니다.',
        travelImpact: '기준점 효과로 인해 예산을 더 많이 지출했습니다.',
        psychologyConcept: '기준점 효과 (Anchoring Effect)',
        psychologyExplanation:
          '최초로 제시된 비현실적인 가격을 기준으로 할인 폭만 계산하다 보면 실제 적정 가치를 놓치기 쉽습니다.',
        reflectionQuestion: '할인율(%)보다 실제 내가 느끼는 가치와 적정 가격을 먼저 따져 보는 습관이 왜 필요할까요?',
        resourceDelta: { budget: -60, time: 0, safety: 0, satisfaction: -3 },
      },
    ],
    explanation: '기준점 효과를 이해하면 시장 흥정뿐 아니라 일상 소비에서도 합리적인 판단을 내릴 수 있습니다.',
    psychologyConcept: '기준점 효과 (Anchoring Effect)',
    rewards: { score: 150, experience: 110 },
    difficulty: '보통',
  },
  {
    missionId: 'egy_exp_1',
    countryId: 'egypt',
    missionType: 'exploration',
    explorationMode: 'pinpoint',
    title: '기자 고원과 나일강 삼각주 위치 파악하기',
    description: '카이로 서쪽 기자 고원의 피라미드와, 나일강이 지중해와 만나 부채꼴로 갈라지는 삼각주의 관계를 살펴보세요.',
    question: '이집트 지도에서 나일강 삼각주 남단(카이로·기자 피라미드) 위치를 클릭해 보세요!',
    choices: [
      { id: 'A', label: '나일강 삼각주 꼭짓점 부근 · 카이로/기자', x: 54, y: 28 },
      { id: 'B', label: '남부 나일강 중류 · 룩소르', x: 58, y: 66 },
      { id: 'C', label: '지중해 항구 · 알렉산드리아', x: 36, y: 14 },
    ],
    targetZone: { x: 54, y: 28, radius: 14, label: '카이로 · 기자 피라미드' },
    explanation:
      '정확합니다! 카이로와 기자 피라미드는 나일강이 여러 갈래의 삼각주로 갈라지기 시작하는 전략적 요충지에 위치해 있습니다.',
    psychologyConcept: '삼각주 지형과 고대 문명 중심지',
    rewards: { score: 200, experience: 140 },
    difficulty: '쉬움',
  },

  // ==========================================
  // KENYA (3 Missions)
  // ==========================================
  {
    missionId: 'ken_geo_1',
    countryId: 'kenya',
    missionType: 'geography',
    title: '적도에 위치하지만 선선한 고원 도시 나이로비',
    description: '케냐는 위도상 적도가 지나는 열대 지역이지만, 수도 나이로비의 아침저녁 공기는 놀랍게도 선선합니다.',
    question: '적도 부근임에도 나이로비가 연중 온화하고 선선한 기후를 보이는 지리적 원인은 무엇일까요?',
    choices: [
      { id: 'A', label: '해발고도 약 1,700m의 높은 고원 지대에 위치해 기온이 낮아지기 때문' },
      { id: 'B', label: '거대한 빙하가 도시 바로 옆을 덮고 있기 때문' },
      { id: 'C', label: '바다 한가운데 섬이기 때문' },
    ],
    correctAnswer: 'A',
    explanation:
      '고도가 100m 높아질 때마다 기온은 약 0.6℃씩 내려갑니다. 동아프리카 고원 위에 자리한 나이로비는 적도 부근이지만 열대 고산 기후 특성 덕분에 사계절 내내 쾌적한 기온을 유지합니다.',
    psychologyConcept: '해발고도와 열대 고산 기후',
    rewards: { score: 130, experience: 100 },
    difficulty: '보통',
  },
  {
    missionId: 'ken_psy_1',
    countryId: 'kenya',
    missionType: 'psychology',
    title: '사바나 생태계에서의 책임 있는 여행 선택',
    description:
      '마사이마라 보호구역 사파리 투어 중, 사자 무리가 멀리서 쉬고 있습니다. 일부 관광객이 가이드에게 "사진이 잘 나오게 차량을 풀숲 가까이 더 몰아달라"고 요구하고 있습니다.',
    question: '야생동물과 탐방객이 함께 공존해야 하는 순간, 어떤 입장을 선택할까요?',
    choices: [
      {
        id: 'A',
        label: '생태 보호 규정대로 안전 거리를 유지하고 망원경과 줌 렌즈로 조용히 관찰하자고 동의한다.',
        outcomeSummary: '스트레스를 받지 않은 사자 무리가 자연스럽게 이동하는 진귀한 장면을 오래 지켜볼 수 있었습니다.',
        travelImpact: '윤리적 선택을 통해 깊은 감동과 높은 안전도를 얻었습니다.',
        psychologyConcept: '공감과 생태적 책임감 (Prosocial & Ecological Empathy)',
        psychologyExplanation:
          '즉각적인 개인의 욕구(가까운 사진)보다 다른 생명과 환경의 장기적 안녕을 배려하는 친사회적 의사결정입니다.',
        reflectionQuestion: '여행자로서 방문지의 자연과 지역 사회에 좋은 흔적을 남기기 위해 할 수 있는 일은 무엇일까요?',
        resourceDelta: { budget: 0, time: 0, safety: 10, satisfaction: 12 },
      },
      {
        id: 'B',
        label: '모처럼 온 사파리니 다른 사람들 의견에 맞춰 가까이 접근하길 바란다.',
        outcomeSummary: '차량 소리에 놀란 동물들이 풀숲 깊숙이 숨어버려 오히려 관찰 기회를 놓쳤습니다.',
        travelImpact: '동조 심리로 인해 생태계와 관찰 경험 모두 아쉬움이 남았습니다.',
        psychologyConcept: '집단 동조와 단기 보상 추구 (Group Conformity)',
        psychologyExplanation:
          '주변의 요구에 동조하여 규범을 어길 경우 단기적 기대와 달리 결과적으로 모두에게 손해가 돌아갈 수 있습니다.',
        reflectionQuestion: '다수가 원하더라도 원칙을 지켜야 할 때, 내 의견을 부드럽게 표현하는 방법은 무엇일까요?',
        resourceDelta: { budget: 0, time: -1, safety: -8, satisfaction: -5 },
      },
    ],
    explanation: '지속 가능한 여행은 자연을 소비하는 것이 아니라 존중하며 공존하는 선택에서 시작됩니다.',
    psychologyConcept: '공감과 지속 가능한 의사결정',
    rewards: { score: 150, experience: 110 },
    difficulty: '쉬움',
  },
  {
    missionId: 'ken_exp_1',
    countryId: 'kenya',
    missionType: 'exploration',
    explorationMode: 'hotspot',
    title: '동아프리카 지구대와 사바나 탐험',
    description: '케냐의 지형을 이루는 세 가지 핵심 자연 요소를 확인해 봅시다.',
    question: '지각판이 갈라지며 형성된 거대한 협곡 지대로, 케냐의 호수와 화산 지형을 만든 지형은 무엇일까요?',
    choices: [
      { id: 'A', label: '그레이트 리프트 밸리 (동아프리카 지구대)', hint: '아프리카판이 서서히 갈라지며 형성된 수천 km 길이의 대협곡으로 비옥한 호수들이 줄지어 있습니다.' },
      { id: 'B', label: '피오르 해안', hint: '고위도 지역에서 빙하가 계곡을 깎아 만든 좁고 깊은 만 지형입니다.' },
      { id: 'C', label: '산호초 환초', hint: '열대 바다 화산섬 주변에 산호가 자라 만들어진 고리 모양의 섬입니다.' },
    ],
    correctAnswer: 'A',
    explanation:
      '그레이트 리프트 밸리(동아프리카 지구대)는 지각이 양옆으로 갈라지는 발산형 경계에서 만들어진 거대한 지구대입니다. 이 지형 덕분에 나쿠루 호수 같은 호수들과 케냐산 같은 화산 지형이 탄생했습니다.',
    psychologyConcept: '발산형 경계와 지구대 지형',
    rewards: { score: 200, experience: 150 },
    difficulty: '보통',
  },
];

export function getMissionsByCountry(countryId: string): Mission[] {
  return MISSIONS_DATA.filter((m) => m.countryId === countryId);
}
