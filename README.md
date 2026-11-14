# WORLD TRAVELER: THE CHOICE (세계 여행자의 선택)

> **"당신의 선택이 세계 여행의 이야기를 바꿉니다."**  
> 세계를 여행하고, 지리 지식을 발견하고, 심리학적 의사결정을 통해 나만의 이야기를 만들어 가는 인터랙티브 어드벤처 웹 게임입니다.

---

## 1. 게임 소개

**WORLD TRAVELER: THE CHOICE**는 단순한 퀴즈 앱이 아니라 **지리학**, **심리학**, **여행 자원 시뮬레이션**이 결합된 풀스택 웹 게임입니다.

- **대륙별 인터랙티브 세계지도 탐험**: 유럽(프랑스, 이탈리아, 영국), 아시아(일본, 중국, 태국), 북아메리카(미국, 캐나다), 아프리카(이집트, 케냐) 총 10개국을 탐험합니다.
- **3가지 유형의 미션**:
  - **MISSION A (지리 챌린지)**: 각 국가의 수도, 강, 산맥, 기후·지형 지식을 학습합니다.
  - **MISSION B (심리학 선택)**: 여행 중 마주하는 실제 딜레마에서 선택을 내리고, 예산·시간·안전도·만족도 변화와 함께 *매몰 비용 오류*, *사회적 지원*, *기준점 효과*, *기본적 귀인 오류* 등 심리학 개념을 학습합니다.
  - **MISSION C (여행 탐험)**: 인터랙티브 지역 지도에서 랜드마크 위치 찾기 및 현장 단서 탐사 미션을 수행합니다.
- **수집과 성장**: 경험치와 레벨(Lv.1 초보 여행자 ~ Lv.5 세계 여행 마스터), 나만의 여권 도장, 시간순 여행 기록, 실시간 랭킹을 제공합니다.

---

## 2. 사용 기술

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Backend / Database / Auth**: Firebase Authentication (Google 로그인 & 이메일/비밀번호), Cloud Firestore (트랜잭션 기반 중복 적립 방지 및 실시간 동기화)
- **Audio Feedback**: Web Audio API (별도 외부 파일 없는 경량 효과음)

---

## 3. 프로젝트 설치 방법

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd world-traveler-the-choice
npm install
```

---

## 4. Firebase 프로젝트 연결 방법

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트를 생성하거나 기존 프로젝트를 선택합니다.
2. **Authentication → Sign-in method**에서 다음 로그인 방식을 활성화합니다:
   - **Google** 로그인 (사용 설정)
   - **이메일/비밀번호** 로그인 (사용 설정)
3. **Firestore Database**를 생성하고, 저장소의 `firestore.rules` 내용을 Firestore 보안 규칙에 게시합니다.
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Firebase 웹 앱 설정값을 `firebase-applet-config.json` 또는 `.env.local`에 연결합니다.

---

## 5. 환경변수 설정 방법

`.env.example`을 복사하여 `.env.local` 파일을 생성합니다. (`.env.local`은 `.gitignore`에 의해 GitHub에 업로드되지 않습니다.)

```bash
cp .env.example .env.local
```

필요한 환경변수 항목:
```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_DATABASE_ID="(default)"
```

---

## 6. 로컬 실행 방법

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 플레이할 수 있습니다.  
프로덕션 빌드 및 타입 검사는 다음 명령어로 확인합니다.

```bash
npm run lint
npm run build
```

---

## 7. GitHub 연동 방법

비밀정보(`.env.local`)가 제외된 상태에서 GitHub 저장소에 안전하게 푸시합니다.

```bash
git init
git add .
git status   # .env.local이 포함되지 않았는지 확인
git commit -m "feat: WORLD TRAVELER: THE CHOICE 초기 버전 구축"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git push -u origin main
```

---

## 8. 배포 방법

### Vercel 배포
1. GitHub 저장소를 Vercel에 연결합니다.
2. Framework Preset을 **Vite**로 선택하고 Build Command를 `npm run build`, Output Directory를 `dist`로 지정합니다.
3. Environment Variables에 `VITE_FIREBASE_*` 값을 등록한 뒤 배포합니다.
4. 배포된 도메인을 Firebase Console → Authentication → Settings → Authorized domains에 추가합니다.

### Firebase Hosting 배포
```bash
npm run build
firebase init hosting
firebase deploy --only hosting,firestore:rules
```

---

## 9. 향후 확장 기능

- 남아메리카(페루·브라질) 및 오세아니아(호주·뉴질랜드) 대륙 추가
- 국가별 심화 탐험 챕터 및 멀티 스테이지 스토리 분기 확장
- 친구 초대 및 팀 탐험 협동 미션 모드
- 다국어(한국어/영어) 전환 학습 모드 지원
