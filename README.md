# ころんり — 커미션 · 캐릭터 분양 공지 사이트

활동명 **ころんり**의 개인 공지 사이트입니다. 커미션 안내와 캐릭터 분양 안내를
두 개의 정적 HTML 페이지로 제공합니다. Vite + 순수 HTML/CSS/최소 Vanilla JS로
구성되어 있으며 프레임워크는 사용하지 않습니다.

- `index.html` — 커미션 공지 및 메인 랜딩
- `adoption.html` — 캐릭터 분양 공지

## 배포된 사이트

GitHub Pages로 자동 배포됩니다. `main`에 push하면 GitHub Actions 워크플로가
빌드 후 배포합니다.

- 커미션: https://jxding-dev.github.io/commission/
- 분양: https://jxding-dev.github.io/commission/adoption.html

## 실행 방법

### 서버 없이 바로 열기 (권장, 가장 간단)

빌드나 개발 서버 없이 **`index.html`을 브라우저로 직접 열면** 됩니다. 파일을
더블클릭하거나 브라우저로 드래그하세요. CSS·이미지·스크립트가 모두 상대 경로라
`file://`에서도 그대로 동작합니다.

### 개발 · 빌드 (선택)

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (Vite)
npm run build        # 프로덕션 빌드 → dist/
npm run preview      # 빌드 결과 미리보기
```

빌드 결과는 `dist/`에 생성되며 `index.html`, `adoption.html`, 이미지 자산이 모두
포함됩니다.

## 파일 구조

```text
/
├─ index.html              # 커미션 페이지
├─ adoption.html           # 분양 페이지
├─ package.json
├─ vite.config.js          # 다중 페이지 입력 + base './' (상대 경로)
├─ src/
│  └─ styles.css           # 공통 디자인 시스템 · 반응형 · 접근성
├─ images/                 # 웹용 최적화 이미지 (영문 파일명, 상대 경로 참조)
│  ├─ illustration-01.jpg
│  ├─ illustration-07.jpg
│  ├─ illustration-12.jpg
│  ├─ illustration-13.jpg
│  └─ illustration-14.jpg
└─ .github/workflows/
   └─ deploy.yml           # GitHub Pages 자동 배포
```

## 이미지 매핑

`images/`의 웹용 최적화 이미지를 `./images/…` 상대 경로로 참조합니다. 서버 없이
`file://`로 열어도, `npm run dev`/`build`에서도 동일하게 동작합니다. (빌드 시
이미지는 `dist/assets/`로 복사되며 링크가 자동 재작성됩니다.)

| 웹용 파일 | 사용 위치 |
|---|---|
| `illustration-01.jpg` | 분양 대표 이미지 (`adoption.html`) |
| `illustration-07.jpg` | 분양 보조 작품 (`adoption.html`) |
| `illustration-12.jpg` | 커미션 가로 작품 (`index.html`) |
| `illustration-13.jpg` | 커미션 메인 랜딩 대표 (`index.html`) |
| `illustration-14.jpg` | 커미션 세로 작품 (`index.html`) |

이미지를 교체하려면 `images/`의 해당 파일을 같은 이름의 새 이미지로 덮어쓰면
됩니다.

## 확정 정보

- 활동명: ころんり
- X: https://x.com/88xoxox88 (주 문의 수단)
- YouTube: https://www.youtube.com/@qXoX-999p
- 사이트 내부 결제 기능 없음 / 관리자 기능 없음

## 추후 공지문 수정 위치 (준비 중 콘텐츠)

아직 확정되지 않은 정책은 화면에 **준비 중 / 확정 전 / 정책 준비 중** 상태로
표시되어 있습니다. 값이 확정되면 아래 위치를 수정하세요.

### `index.html` (커미션)

- **접수 상태 / 타입·가격** — `01 Overview` 섹션의 `.info-grid` 카드
- **기본 안내 문구** — `#basic` 섹션 `.note-list`
- **신청 절차 / 양식 항목** — `#apply` 섹션 `.steps`, `#apply-form`(`.form-fields`)
- **작업 과정 안내** — `#process` 섹션 `.flow` 및 `.callout`
- **결제·취소·환불 규정** — `#payment` 섹션 `.callout`
- **저작권·사용 범위** — `#rights` 섹션 `.def-list` (각 값 `상세 기준 준비 중`)

### `adoption.html` (분양)

- **현재 상태** — `01 Current Status` (`Preparing` 배지)
- **분양 절차** — `02 Process` `.steps`
- **제공 파일** — `03 Included Files` `.def-list` (`확정 전`)
- **사용 가능 범위** — `04 Permitted Use` `.def-list`
- **금지사항** — `05 Restrictions` `.def-list` (`정책 준비 중`)
- **수정·양도·재분양** — `06 Transfer & Resale` `.def-list`
- **저작권과 출처** — `07 Copyright` `.def-list`

정책 값은 각 `<dd>` 안의 `<span class="pending">…</span>` 텍스트를 실제 내용으로
교체하면 됩니다. 확정 전에는 임의의 가격·기간·법적 조건을 채우지 마세요.

## 배포 도메인 확정 후 수정할 위치

로컬 정적 사이트라 실제 도메인이 없어 절대 URL을 임의로 만들지 않았습니다.
배포 도메인이 정해지면 아래를 갱신하세요.

- **Open Graph 이미지** — 두 HTML `<head>`의 `og:image` 값이 현재 절대 경로
  (`/images/…`)입니다. 크롤러용 절대 URL(`https://도메인/images/…`)로 교체하세요.
- **canonical / og:url** — 필요 시 `<head>`에 절대 URL로 추가하세요.
- **`vite.config.js`의 `base`** — 하위 경로(예: `/site/`)에 배포한다면
  `base: './'` 대신 해당 경로로 지정할 수 있습니다.

## 접근성 · 반응형 요약

- `lang="ko"`, 페이지별 단일 `h1`, 시맨틱 `header/nav/main/section/footer`
- skip link, `:focus-visible` 포커스 표시, 외부 링크 새 탭 안내(스크린리더용)
- `prefers-reduced-motion` 대응, 색상만으로 상태를 전달하지 않음
- 모바일 우선 CSS, 320 · 375 · 430 · 768 · 1024 · 1440 · 1920px 폭에서 가로
  overflow 없음 (검증 완료)
- 이미지 `width/height/alt/loading` 지정, 메인 대표 이미지는 `fetchpriority="high"`
- JavaScript 없이도 모든 내비게이션과 공지 내용을 이용 가능 (JS는 선택적 향상)

## 기술 참고

- 빌드는 Vite 4를 사용합니다. (개발 환경에서 Rollup 4의 네이티브 바이너리가 OS
  Application Control 정책에 의해 차단되어, 순수 JS Rollup 3 기반의 Vite 4로
  고정했습니다. 정책이 없는 환경이라면 상위 버전으로 올려도 됩니다.)
- 이미지는 이미 웹용으로 최적화되어 `images/`에 포함돼 있습니다. 별도 빌드
  의존성은 Vite뿐입니다.
