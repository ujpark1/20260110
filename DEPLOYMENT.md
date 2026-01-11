# 배포 가이드 (Deployment Guide)

이 프로젝트를 웹에서 다른 사람들도 볼 수 있도록 배포하는 방법입니다.

## 🚀 추천 방법: Vercel (가장 쉬움)

### 1단계: GitHub에 코드 업로드 (선택사항이지만 권장)

1. GitHub 계정이 없다면 [github.com](https://github.com)에서 계정 생성
2. 새 repository 생성
3. 다음 명령어 실행:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2단계: Vercel에 배포

1. [vercel.com](https://vercel.com) 접속 및 로그인 (GitHub 계정으로 로그인 가능)
2. "Add New..." → "Project" 클릭
3. GitHub repository 선택 (또는 "Import Git Repository"에서 직접 URL 입력)
4. 프로젝트 설정:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `build` (vite.config.ts에서 설정된 값)
   - **Install Command**: `npm install`
5. "Deploy" 버튼 클릭
6. 약 1-2분 후 배포 완료! 자동으로 URL이 생성됩니다.

### Vercel의 장점
- ✅ 완전 무료 (개인 프로젝트)
- ✅ 자동 HTTPS
- ✅ GitHub와 연동 시 자동 배포
- ✅ 커스텀 도메인 지원
- ✅ 빠른 속도 (글로벌 CDN)

---

## 🌐 대안 1: Netlify

1. [netlify.com](https://www.netlify.com) 접속 및 로그인
2. "Add new site" → "Import an existing project"
3. GitHub repository 연결 또는 "Deploy manually" 선택
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. "Deploy site" 클릭

---

## 📦 대안 2: GitHub Pages

### 1단계: vite.config.ts 수정

```typescript
export default defineConfig({
  // ... 기존 설정
  base: '/YOUR_REPO_NAME/', // GitHub repository 이름
})
```

### 2단계: GitHub Actions 설정

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### 3단계: GitHub 설정

1. Repository → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 코드를 push하면 자동 배포

---

## 🔧 대안 3: Render

1. [render.com](https://render.com) 접속 및 로그인
2. "New" → "Static Site"
3. GitHub repository 연결
4. 설정:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
5. "Create Static Site" 클릭

---

## 📝 로컬에서 빌드 테스트

배포 전에 로컬에서 빌드가 잘 되는지 확인:

```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# 빌드 결과물 확인 (build 폴더에 생성됨)
```

빌드된 파일을 로컬 서버로 테스트하려면:

```bash
# 간단한 HTTP 서버 실행 (Python 3)
cd build
python3 -m http.server 8000

# 또는 npx serve 사용
npx serve -s build -p 8000
```

브라우저에서 `http://localhost:8000` 접속하여 확인

---

## 🎯 빠른 배포 체크리스트

- [ ] 코드가 GitHub에 올라가 있음 (선택사항)
- [ ] `npm run build`가 에러 없이 완료됨
- [ ] Vercel/Netlify 등 배포 서비스 계정 생성
- [ ] Repository 연결 또는 파일 업로드
- [ ] 빌드 설정 확인 (Build Command: `npm run build`, Output: `build`)
- [ ] 배포 완료 후 URL 확인

---

## 💡 참고사항

- **환경 변수**: 필요하다면 배포 플랫폼에서 환경 변수 설정 가능
- **커스텀 도메인**: Vercel/Netlify 등에서 무료로 커스텀 도메인 연결 가능
- **자동 배포**: GitHub와 연동하면 코드를 push할 때마다 자동 배포됨
- **무료 한도**: 위의 모든 서비스는 개인 프로젝트에 대해 무료로 제공

---

## 🆘 문제 해결

### 빌드 에러가 발생하는 경우
1. 로컬에서 `npm run build` 실행하여 에러 확인
2. `node_modules` 삭제 후 `npm install` 재실행
3. 배포 플랫폼의 빌드 로그 확인

### 404 에러가 발생하는 경우
- React Router를 사용한다면 모든 경로를 `index.html`로 리다이렉트하도록 설정 필요
- Vercel: `vercel.json` 파일에 리라이트 규칙 추가
- Netlify: `_redirects` 파일 또는 `netlify.toml` 설정
