# GitHub에 프로젝트 업로드 가이드

이 파일에는 GitHub에 프로젝트를 업로드하는 방법이 설명되어 있습니다.

## 방법 1: 터미널 사용 (추천)

### 1단계: 터미널 열기

프로젝트 폴더로 이동:
```bash
cd "/Users/upark/Desktop/Insight Summary Iteration V0.52a-2 (Label - left menu)"
```

### 2단계: Git 초기화 및 파일 추가

```bash
# Git 저장소 초기화
git init

# Git 사용자 정보 설정 (처음 한 번만, GitHub 계정 정보로 변경)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Insight Capture AI Assistant application"

# 브랜치 이름을 main으로 변경
git branch -M main
```

### 3단계: GitHub에 Repository 생성

1. [github.com](https://github.com) 접속 및 로그인
2. 오른쪽 상단의 "+" 아이콘 클릭 → "New repository"
3. Repository 정보 입력:
   - **Repository name**: `insight-capture-ai` (원하는 이름)
   - **Description**: "Insight Capture AI Assistant" (선택사항)
   - **Visibility**: Public 또는 Private 선택
   - **⚠️ 중요**: "Initialize this repository with a README" 체크하지 않기!
4. "Create repository" 클릭

### 4단계: GitHub에 코드 업로드

GitHub에서 제공하는 명령어를 복사하거나, 아래 명령어 사용:

```bash
# GitHub repository URL을 YOUR_REPO_URL로 변경
# 예: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 코드 업로드
git push -u origin main
```

---

## 방법 2: GitHub Desktop 사용 (더 쉬움)

### 1단계: GitHub Desktop 설치

1. [desktop.github.com](https://desktop.github.com)에서 GitHub Desktop 다운로드 및 설치
2. GitHub 계정으로 로그인

### 2단계: Repository 추가

1. GitHub Desktop 실행
2. "File" → "Add Local Repository"
3. 프로젝트 폴더 선택:
   `/Users/upark/Desktop/Insight Summary Iteration V0.52a-2 (Label - left menu)`
4. "Add repository" 클릭

### 3단계: GitHub에 업로드

1. 왼쪽 하단 "Publish repository" 버튼 클릭
2. Repository 이름 입력 (예: `insight-capture-ai`)
3. "Keep this code private" 체크 여부 선택
4. "Publish repository" 클릭
5. 완료!

---

## 방법 3: GitHub 웹에서 직접 업로드

### 1단계: GitHub에 Repository 생성

1. [github.com](https://github.com) 접속 및 로그인
2. "+" → "New repository"
3. Repository 이름 입력
4. "Create repository" 클릭

### 2단계: 파일 업로드

1. 생성된 repository 페이지에서 "uploading an existing file" 클릭
2. 프로젝트 폴더의 모든 파일 드래그 앤 드롭
3. "Commit changes" 클릭

⚠️ **참고**: 이 방법은 `.gitignore` 파일이 있어도 node_modules까지 업로드될 수 있으므로 권장하지 않습니다.

---

## 업로드 후 확인사항

✅ GitHub repository 페이지에서 파일들이 올바르게 업로드되었는지 확인
✅ `.gitignore` 파일이 제대로 작동하여 `node_modules` 폴더가 업로드되지 않았는지 확인
✅ README.md 파일이 표시되는지 확인

---

## 문제 해결

### "Permission denied" 오류가 발생하는 경우

GitHub에서 Personal Access Token을 사용해야 할 수 있습니다:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 권한 선택: `repo` 체크
4. 생성된 토큰 복사
5. 패스워드 입력 시 토큰 사용

### "Repository not found" 오류가 발생하는 경우

Repository URL을 확인하고 올바른지 확인하세요.

### 이미 Git 저장소가 있는 경우

```bash
# 기존 remote 제거 (필요한 경우)
git remote remove origin

# 새로운 remote 추가
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 업로드
git push -u origin main
```

---

## 다음 단계

코드가 GitHub에 업로드되면:
1. **Vercel/Netlify로 배포**: `DEPLOYMENT.md` 파일 참고
2. **커밋 히스토리 관리**: 기능 추가 시 `git add`, `git commit`, `git push` 사용
3. **브랜치 관리**: 새 기능 개발 시 `git checkout -b feature-name` 사용
