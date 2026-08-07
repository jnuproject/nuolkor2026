# opencode에 붙여넣을 프롬프트

이 Windows 노트북에 **Hermes Agent**(Nous Research)를 설치하고, 아래 **참조 스펙**과 동일하게 설정해줘.
참조 스펙은 이미 정상 동작 중인 다른 노트북에서 실제로 추출한 값이야. 추측하지 말고 이 값 그대로 맞춰줘.

---

## 참조 스펙 (목표 상태)

| 항목 | 값 |
|---|---|
| 제품 | Hermes Agent v0.19.1 (2026.7.30) 이상, install method = `git` |
| 플랫폼 | Windows 네이티브 (WSL 아님) |
| HERMES_HOME | `%LOCALAPPDATA%\hermes` |
| 코드 위치 | `%LOCALAPPDATA%\hermes\hermes-agent` (venv 포함) |
| Python | **3.11.15** (uv가 provisioning). 허용 범위 `>=3.11,<3.14` |
| uv | `%LOCALAPPDATA%\hermes\bin\uv.exe` (설치 스크립트가 자동 설치) |
| 실행 파일 | `%LOCALAPPDATA%\hermes\hermes-agent\venv\Scripts\hermes.exe` |
| User PATH 추가 | `%LOCALAPPDATA%\hermes\hermes-agent\venv\Scripts`, `%LOCALAPPDATA%\hermes\bin` |
| 추론 프로바이더 | **NVIDIA NIM** (Hermes 기본 내장 `nvidia` 프로바이더. `custom` 아님) |
| model.provider | `nvidia` |
| model.default | `nvidia/nemotron-3-ultra-550b-a55b` |
| model.base_url | `https://integrate.api.nvidia.com/v1` |
| API 키 | `%LOCALAPPDATA%\hermes\.env` 안에 `NVIDIA_API_KEY=nvapi-...` |
| Node.js | portable Node **v22.23.2** → `%LOCALAPPDATA%\hermes\node\node.exe`. ⚠️ 참조 노트북은 설치 스크립트가 배치한 Node로는 부족해서 **수동 교체**한 상태 (5단계에서 반드시 확인) |
| ripgrep | **winget으로 별도 설치** — `BurntSushi.ripgrep.MSVC` (참조 노트북 15.2.0). Hermes가 번들해주지 않으므로 안 깔면 doctor에서 ⚠ 로 뜸 |
| 추가 User 환경변수 | `HERMES_NODE = %LOCALAPPDATA%\hermes\node\node.exe`, `HERMES_GIT_BASH_PATH = C:\Program Files\Git\bin\bash.exe` |
| Skills | 기본 번들만 (apple, autonomous-ai-agents, creative, email, github, media, mlops, note-taking, productivity, research, smart-home, social-media, software-development). **optional-skills 추가 설치 안 함** |
| MCP 서버 | 없음 |
| plugins / hooks / cron job | 없음 (전부 비어 있음) |
| SOUL.md | 기본값 그대로. 커스텀 페르소나 없음 |
| 기타 로그인 | Nous Portal / OpenAI Codex / xAI / MiniMax **전부 로그인 안 함**. 인증은 NVIDIA API 키 하나뿐 |

---

## 작업 순서

### 0. 사전 점검
- Windows 버전, PowerShell 버전, `git --version` 확인
- 기존 설치 흔적 확인: `%LOCALAPPDATA%\hermes` 존재 여부, `where hermes`
  - 이미 설치돼 있으면 **지우지 말고** 먼저 나에게 보고하고 멈출 것

### 0-1. Python 준비 (설치 안 돼 있으면 설치, 버전 안 맞으면 맞추기)

Hermes가 요구하는 Python 범위는 `pyproject.toml` 기준 **`>=3.11,<3.14`** 이고,
참조 노트북은 **3.11.15** 를 쓰고 있어. 목표는 **3.11.x** 확보야.

**먼저 현재 상태를 조사해줘:**
```powershell
python --version
py -0p                                   # 설치된 모든 파이썬 런처 목록
(Get-Command python -ErrorAction SilentlyContinue).Source
```

**판정 기준:**

| 현재 상태 | 조치 |
|---|---|
| Python 없음 | 아래 "uv로 설치" 실행 |
| **3.11.x** | ✅ 그대로 사용. 아무것도 하지 마 |
| 3.12.x / 3.13.x | ✅ 호환됨. 그대로 둬도 되지만, 참조 노트북과 맞추려면 uv로 3.11을 **추가** 설치 |
| 3.10 이하 | ❌ 부족. uv로 3.11 **추가** 설치 (기존 건 그대로 두고) |
| 3.14 이상 | ❌ 지원 범위 밖. uv로 3.11 **추가** 설치 (기존 건 그대로 두고) |
| `python.exe` 경로가 `...\WindowsApps\...` 이거나 파일 크기가 0바이트 | ⚠️ Microsoft Store 스텁(가짜)임. 진짜 Python 아님 → 없는 것으로 간주하고 uv로 설치 |

**uv로 설치 (권장 · 관리자 권한 불필요):**
```powershell
# uv가 없으면 먼저 설치
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Python 3.11 설치
uv python install 3.11
uv python find 3.11        # 경로가 나오면 성공
```

**⚠️ 중요한 원칙:**
- 🚫 **기존에 설치된 Python을 제거하거나 덮어쓰지 마.** uv가 설치하는 Python은 별도 경로에 격리되고,
  Hermes는 자기 venv에서만 그걸 써. 시스템 Python / PATH 우선순위를 바꾸지 마.
- 🚫 Microsoft Store에서 Python 설치하지 마 (스텁 문제 재발).
- ℹ️ 사실 `install.ps1` 이 내부적으로 uv를 깔고 `uv python install 3.11` 까지 알아서 해.
  그러니 이 단계는 **"미리 확인하고, 실패했을 때 수동으로 고치기 위한 것"** 이야.
  현재 상태가 이미 3.11~3.13이면 굳이 손대지 말고 바로 1단계로 넘어가.
- ⚠️ 함정: 설치 스크립트의 fallback 로직은 **3.10도 일단 통과시켜**. 그런데 `pyproject.toml` 은 `>=3.11` 이라
  3.10으로 진행되면 나중에 패키지 설치 단계에서 터져. 3.10만 있는 상태면 **반드시** 먼저 3.11을 깔아둬.

설치 후 확인:
```powershell
uv python list             # 3.11.x 가 목록에 보여야 함
```

### 0-2. ripgrep 준비 (빼먹지 마 — Hermes가 안 깔아줌)

`hermes doctor` 의 `◆ External Tools` 에서 **ripgrep ✓** 가 나와야 하는데,
이건 Hermes 설치 스크립트가 넣어주는 게 **아니라** 별도로 깔아야 하는 도구야.
"Windows니까 원래 없는 게 정상"이 **아님.** 참조 노트북엔 winget으로 깔린 15.2.0 이 있어
(`%LOCALAPPDATA%\Microsoft\WinGet\Links\rg.exe`).

```powershell
# 이미 있는지 먼저 확인
(Get-Command rg -ErrorAction SilentlyContinue).Source

# 없으면 설치 (관리자 권한 불필요)
# ⚠️ 동의 플래그 2개 필수. 없으면 winget 이 첫 실행 때 소스 계약 동의를 대화형으로 물어보고
#    에이전트 셸에서는 입력을 못 받아 그대로 멈춘다 (실측 확인된 함정)
winget install --id BurntSushi.ripgrep.MSVC -e --accept-source-agreements --accept-package-agreements

# 확인. 설치 직후엔 이 셸의 PATH에 아직 안 잡혀 있으니 먼저 PATH를 갱신해
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
rg --version               # 15.x 이상이면 OK
```

- ⚠️ `.GNU` 말고 **`.MSVC`** 빌드를 깔아. 참조 노트북이 그걸 쓰고 있음.
- winget이 없거나 막혀 있으면 scoop(`scoop install ripgrep`)이나
  GitHub 릴리스 zip 을 받아 PATH 에 넣어도 됨. 방법은 상관없고 `rg` 가 PATH 에서 잡히면 돼.

### 1. 설치
PowerShell(관리자 아님, 일반 사용자)에서 공식 설치 스크립트 실행:

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

- 설치 중 프로바이더/모델을 물으면 **NVIDIA**를 고르고, 모델은 뒤에서 CLI로 정확히 맞출 거니까 아무거나 넘어가도 됨
- 설치가 끝나면 **PowerShell 창을 새로 열어야** PATH/환경변수가 적용됨

**⚠️ 네가(에이전트가) 실행하는 경우 — 여기서 헛다리 짚기 쉬움:**
너는 "새 PowerShell 창"을 열 수 없으니, 설치 직후 이 셸의 PATH에는 `hermes` 가 **없어.**
그래서 바로 `hermes --version` 을 때리면 command not found 가 나는데, **이건 설치 실패가 아니야.**
아래 (a) 를 먼저 하고, 그래도 안 되면 (b) 로 전체 경로 호출해:

```powershell
# (a) 이 셸의 PATH를 레지스트리에서 다시 읽어와 갱신 (2단계 이후 모든 hermes 명령 전에 한 번)
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')

# (b) 그래도 안 잡히면 전체 경로로 직접 호출
$hermes = "$env:LOCALAPPDATA\hermes\hermes-agent\venv\Scripts\hermes.exe"
& $hermes --version
```

- 이 파일의 이후 단계에서 `hermes ...` 로 적힌 건 전부 `& $hermes ...` 로 바꿔 실행해도 동일해.
- 🚫 PATH가 안 잡혔다고 재설치하지 마. 먼저 위 (a)/(b) 를 시도해.

### 2. 설치 결과 검증
```powershell
hermes --version          # v0.19.1 이상, Install method: git, Python: 3.11.x 확인
hermes config path        # %LOCALAPPDATA%\hermes\config.yaml 이어야 함
```
- `hermes --version` 출력의 `Python:` 줄이 **3.11.x** 인지 꼭 봐줘.
  3.10 이하나 3.14 이상이면 0-1 단계로 돌아가서 3.11을 깔고 재설치해야 함.

### 3. API 키 설정
`%LOCALAPPDATA%\hermes\.env` 파일에서 `NVIDIA_API_KEY` 줄을 찾아 아래처럼 만들어줘.
주석 처리(`#`)돼 있으면 주석을 풀고, 없으면 파일 맨 끝에 새 줄로 추가:

```
NVIDIA_API_KEY=<<<여기에_내_nvapi_키를_붙여넣을_것>>>
```

🚫 **위 `<<<...>>>` 는 자리표시자야. 이 문자열을 `.env` 에 그대로 쓰면 안 돼.**
반드시 실제 `nvapi-` 키로 치환해서 써. 키를 아직 못 구했으면 **아무것도 쓰지 말고 그냥 비워둬** —
자리표시자를 넣어두면 `hermes auth list` / `doctor` 가 "키 있음"으로 오판하고 API 호출에서만 실패해서
원인 찾기가 훨씬 어려워져. (또한 한글이 들어간 이 문자열은 UTF-8 인코딩 규칙 위반이기도 해)

- 키는 `nvapi-` 로 시작하는 **70자** 문자열이야. 보안상 이 파일 안에 키를 적어두지 않았어.
- **키 조달 순서 (이 순서대로 확인해. 나한테 묻는 건 맨 마지막 수단이야)**:
  1. 내가 이 프롬프트와 **같은 메시지에** `nvapi-...` 를 함께 붙여넣었으면 그걸 써.
  2. 없으면 **먼저 스스로 찾아봐 — 지금 너(opencode)를 돌리고 있는 그 NVIDIA 키가 바로 재사용할 키야.**
     ```powershell
     # opencode 가 nvidia 로 인증돼 있으면 여기 있음 (참조 노트북에서 확인된 경로)
     $a = "$env:USERPROFILE\.local\share\opencode\auth.json"
     if (Test-Path $a) { (Get-Content $a -Raw | ConvertFrom-Json).PSObject.Properties.Name }  # nvidia 있는지만 확인
     (Get-Content $a -Raw | ConvertFrom-Json).nvidia.key | Set-Clipboard                      # 화면에 찍지 말고 클립보드로
     ```
     - 이 노트북에 예전 Hermes 흔적이 있으면 `%LOCALAPPDATA%\hermes\.env` 의 `NVIDIA_API_KEY` 줄도 후보야.
       단 **이번에 새로 설치한 경우엔 비어 있는 게 정상**이니 여기서 못 찾았다고 포기하지 마.
  3. 위에서 못 찾았으면 그때 나한테 요청해. **키를 화면/로그에 출력하지 말고** 요청만 해.
- 📌 **이 단계에서 키가 없다고 멈추는 건 정상 동작이야** (실패가 아님). 단, 멈추기 전에
  **키가 필요 없는 나머지 단계(0-2, 4, 5)를 먼저 다 끝내놓고** 마지막에 한 번만 물어봐.
  키 없이 통과 불가능한 항목은 6단계의 `◆ API Connectivity → ✓ NVIDIA NIM` 하나뿐이야.
- 다른 노트북에서 같은 키를 옮겨올 땐 화면에 찍지 말고 클립보드로만:
  ```powershell
  # (키가 이미 있는 노트북에서 실행)
  ((Select-String -Path "$env:LOCALAPPDATA\hermes\.env" -Pattern '^\s*NVIDIA_API_KEY=' |
    Select-Object -First 1).Line -split '=',2)[1].Trim() | Set-Clipboard
  ```
- 주석 처리된 줄이 이미 있을 수 있으니, 덮어쓰기/추가를 한 번에 처리하려면:
  ```powershell
  $p = "$env:LOCALAPPDATA\hermes\.env"
  $k = 'nvapi-여기에키'
  $lines = Get-Content $p
  if ($lines -match '^\s*#?\s*NVIDIA_API_KEY\s*=') {
    ($lines -replace '^\s*#?\s*NVIDIA_API_KEY\s*=.*', "NVIDIA_API_KEY=$k") | Set-Content $p -Encoding utf8
  } else {
    Add-Content $p -Value "NVIDIA_API_KEY=$k" -Encoding utf8
  }
  ```
- **인코딩 주의**: 이건 한글 Windows(cp949)야. `.env`는 반드시 **UTF-8(BOM 없음)** 으로 저장하고,
  파일 내용에 한글/비ASCII 문자를 절대 넣지 마. PowerShell에서 쓸 땐 `-Encoding utf8` 명시.
- `auth.json` 은 **직접 손대지 마.** Hermes가 `.env` 를 읽어 자동 생성하는 파일이고,
  키 지문(fingerprint)이 들어가서 손으로 쓰면 깨져.

### 4. 모델 / 프로바이더 설정
대화형 마법사(`hermes model`) 말고 아래 3줄로 정확히 고정해줘:

```powershell
hermes config set model.provider nvidia
hermes config set model.default nvidia/nemotron-3-ultra-550b-a55b
hermes config set model.base_url https://integrate.api.nvidia.com/v1
```

확인:
```powershell
hermes config get model.provider   # nvidia
hermes config get model.default    # nvidia/nemotron-3-ultra-550b-a55b
hermes auth list                   # nvidia 자격증명 1건이 source=env:NVIDIA_API_KEY 로 잡혀야 함
```

### 5. Node.js / TUI — ⚠️ 건너뛰지 마. 이 단계가 조용히 실패하는 지점이야

Hermes는 자기 전용 Node를 `%LOCALAPPDATA%\hermes\node` 에 배치해. 설치 스크립트가 넣어주긴 하는데
**버전이 부족한 걸 넣는 경우가 있어.** 그래서 이건 "문제 생기면 보는 항목"이 아니라 **필수 검사**야.

**5-1. 반드시 실행하고 출력을 보여줘:**
```powershell
& "$env:LOCALAPPDATA\hermes\node\node.exe" -v
[Environment]::GetEnvironmentVariable('HERMES_NODE','User')
```

**5-2. 판정:**

| node -v 결과 | 조치 |
|---|---|
| **v22.22.0 이상** (참조 노트북 = **v22.23.2**) | ✅ 통과. 다음으로 |
| v22.12 ~ v22.21 | ❌ **아래 5-3 수동 교체 필수.** 설치는 "성공"으로 뜨지만 TUI가 깨져 있음 |
| 파일 없음 / 그 외 | ❌ 5-3 진행 |

- ⚠️ 알려진 함정: 설치 스크립트가 요구하는 Node 하한(>=22.12)이 실제 TUI 의존성(`react-router` >= 22.22.0)보다
  낮아서, Node가 22.12~22.21이면 npm install 이 **EBADENGINE으로 조용히 실패**해. 설치 로그는 성공으로 보이고
  `hermes -z` 도 잘 되는데 `hermes --tui` 만 안 뜨는 형태로 나타나. 그래서 6단계 전에 미리 잡아야 해.

**5-3. 수동 교체 (위 표에서 ❌ 인 경우에만) — 아래 스크립트를 그대로 실행해:**

⚠️ `node.exe` 하나만 갈아끼우면 **안 돼.** 참조 노트북의 `%LOCALAPPDATA%\hermes\node` 는
zip 내용물 전체(`node.exe` + `npm` / `npx` / `corepack` / `node_modules`)가 풀린 구조야.
node.exe만 바꾸면 npm이 구버전으로 남아 어긋나. **내용물 전체를 덮어써.**

```powershell
$ver  = 'v22.23.2'                                  # 참조 노트북과 동일 버전으로 고정
$dest = "$env:LOCALAPPDATA\hermes\node"
$tmp  = "$env:TEMP\node-$ver"
$zip  = "$tmp\node-$ver-win-x64.zip"

New-Item -ItemType Directory -Force $tmp  | Out-Null
New-Item -ItemType Directory -Force $dest | Out-Null

# 다운로드 (약 34MB. URL 형식은 확인된 값이고 v22.23.2 는 실재함)
Invoke-WebRequest -Uri "https://nodejs.org/dist/$ver/node-$ver-win-x64.zip" -OutFile $zip -UseBasicParsing

# 압축 해제 — zip 안에 node-v22.23.2-win-x64\ 폴더가 한 겹 있음
Expand-Archive -Path $zip -DestinationPath $tmp -Force

# 그 폴더의 "내용물"을 hermes\node 에 덮어씀 (node.exe 가 $dest 바로 아래 오도록)
Copy-Item "$tmp\node-$ver-win-x64\*" $dest -Recurse -Force

# User 환경변수 설정 — Hermes 가 TUI 실행 시 이 변수를 우선 사용함
[Environment]::SetEnvironmentVariable('HERMES_NODE', "$dest\node.exe", 'User')

# 검증
& "$dest\node.exe" -v                               # v22.23.2 나오면 성공
Get-ChildItem $dest -Name | Select-Object -First 15  # npm / npx / node_modules 가 같이 보여야 정상
```

- ⚠️ `Copy-Item` 이 "사용 중인 파일" 오류를 내면 Hermes TUI 나 node 프로세스가 떠 있는 거야.
  `Get-Process node -ErrorAction SilentlyContinue` 로 확인하고 종료한 뒤 다시 실행해.
- 다운로드가 막혀 있으면(사내망/방화벽) 임의로 우회하지 말고 그 사실을 나한테 보고해.
- 참조 노트북은 이 교체를 **이미 거친 상태**야 (`HERMES_NODE` 가 User 환경변수로 잡혀 있음).
  그러니 두 번째 노트북에서도 필요할 가능성이 높다고 보고 접근해.
- 🚫 **시스템 Node는 절대 건드리지 마.** `nvm install` / `nvm use` 금지. 내가 nvm으로 직접 관리하는 영역이야.
  Hermes 전용 Node는 시스템 Node와 완전히 분리돼 있어야 해.
- Git Bash가 설치돼 있으면 User 환경변수로 함께 잡아줘 (참조 노트북에 설정된 값):
  `HERMES_GIT_BASH_PATH = C:\Program Files\Git\bin\bash.exe`

### 6. 최종 검증 — 아래를 **전부 실행하고 실제 출력을 보여줘**

```powershell
hermes doctor
```
합격 기준:
- `◆ Python Environment` → **Python 3.11.x ✓**, SQLite ✓, Virtual environment active ✓, Version files consistent ✓
- `◆ Configuration Files` → `.env` / `config.yaml` 존재 ✓, "API key or custom endpoint configured" ✓
- `◆ API Connectivity` → **`✓ NVIDIA NIM`**
- `◆ Directory Structure` → 전부 ✓
- `◆ External Tools` → git ✓, ripgrep ✓, Node.js ✓
- `◆ Tool Availability` → browser / code_execution / file / memory / skills / terminal / todo 가 ✓

> 참고: 아래 경고는 **참조 노트북에도 똑같이 나오는 정상 상태**야. 고치려고 애쓰지 마.
> - Nous Portal / Codex / xAI / MiniMax "not logged in"
> - discord/telegram 패키지 미설치, EXA/TAVILY/XAI 등 키 없음
> - npm audit 취약점 경고 (build-time 도구)
> - "Config version outdated (v0 → v33)" ← **참조 노트북에서도 뜸.** 참조 노트북의 `config.yaml` 에는
>   `version` 키 자체가 없어서 doctor가 v0으로 추정하는 것이고, 기능엔 영향 없음.
>   `hermes doctor --fix` 한 번 실행해서 없애도 되고 그냥 둬도 됨 (둘 다 정상).

> 🚫 반대로, 아래는 **"Windows니까 정상"이 아니라 실제로 고쳐야 하는 것들**이야. 넘어가지 마.
> - **`ripgrep not found`** → 0-2 단계 안 한 것.
>   `winget install --id BurntSushi.ripgrep.MSVC -e --accept-source-agreements --accept-package-agreements` 로 깔아.
>   ("Windows에선 원래 없음"이라고 판단하면 **틀렸음** — 참조 노트북엔 15.2.0 이 깔려 있어)
> - **`Node.js` 항목이 v22.22.0 미만** → 5단계로 돌아가. TUI가 이미 깨져 있는 상태야.
> - **`✗ NVIDIA API key not configured`** → 3단계. 키만 넣으면 해결되는 유일한 진짜 블로커.

이어서 실제 동작 테스트 2개:
```powershell
hermes -z "2 + 2 는? 숫자만 답해."
hermes -z "지금 작업 폴더의 파일 목록을 file 툴로 확인하고 파일 개수만 알려줘."
```
- 첫 번째는 LLM 응답 확인, 두 번째는 **tool-calling 확인**(이게 진짜 중요함)

마지막으로 TUI 확인 — 🚫 **`hermes --tui` 는 네가 실행하지 마.**
대화형 전체화면 앱이라 너의 비대화형 셸에서는 입력을 못 받고 타임아웃까지 매달려 있게 돼.
**대신 아래 두 가지를 해:**

**(1) 너는 빌드 산출물만 확인해 (비대화형, 안전):**
```powershell
$root = "$env:LOCALAPPDATA\hermes\hermes-agent"
Test-Path "$root\ui-tui\dist\entry.js"                                   # True 여야 함 (참조 노트북 ≈3.6MB)
(Get-Item "$root\ui-tui\dist\entry.js" -ErrorAction SilentlyContinue).Length
(Get-Content "$root\node_modules\react-router\package.json" -Raw |
  ConvertFrom-Json).version                                              # 참조 노트북 = 8.3.0
```
- `entry.js` 가 **없거나** `react-router` 가 없으면 → npm install 이 EBADENGINE 으로 조용히 실패한 것.
  **5단계로 돌아가서 Node 를 v22.23.2 로 교체하고 재설치해.** (이게 TUI 깨짐의 실제 증거야)
- 참고: `react-router` 는 `ui-tui\node_modules` 가 아니라 **루트 `hermes-agent\node_modules` 로 hoist** 돼 있어.
  `ui-tui\node_modules` 가 없는 건 참조 노트북도 마찬가지니 정상이야.

**(2) 실제 화면 확인은 나한테 넘겨:**
> "터미널에서 `hermes --tui` 를 직접 실행해보세요. 화면이 뜨면 성공이고 바로 종료하셔도 됩니다."
라고 알려주고 끝내. 네가 직접 띄우려고 시도하지 마.

### 7. 보고
아래를 정리해서 알려줘:
1. 설치된 Hermes 버전 + install method + **Python 버전** (설치 전 상태 → 설치 후 상태)
2. 최종 `config.yaml` 의 `model:` 블록 전문
3. `hermes doctor` 결과 중 ✓/⚠ 요약
4. 동작 테스트 2개의 실제 응답
5. 참조 스펙과 **다르게** 끝난 부분이 있으면 전부 (숨기지 말고)

---

## 하지 말아야 할 것 (중요)
- ❌ `provider: custom` 으로 설정하지 마. Hermes에 `nvidia` 프로바이더 플러그인이 정식으로 들어있음.
- ❌ Hermes-3 **모델**을 쓰려고 하지 마. "Hermes Agent"는 에이전트 프레임워크 이름이고, LLM은 NVIDIA NIM 모델이야.
- ❌ 시스템 Node/nvm 변경 금지.
- ❌ 기존 Python 삭제/덮어쓰기 금지, PATH 우선순위 변경 금지. 필요하면 uv로 **추가** 설치만 해.
- ❌ Python 3.14 이상으로 맞추려 하지 마 (`requires-python = ">=3.11,<3.14"` 범위 밖).
- ❌ `auth.json` 직접 작성 금지.
- ❌ optional-skills, MCP 서버, plugins 추가 설치 금지 (참조 노트북에 없음).
- ❌ config.yaml 을 통째로 다른 데서 복사해오지 마. 스키마 버전이 달라질 수 있으니 `hermes config set` 으로만 조정.
- ❌ 내 API 키를 로그/커밋/외부로 내보내지 마. (화면에 echo/cat 으로 찍는 것도 포함)
- ❌ `ripgrep not found` 나 낮은 Node 버전을 **"Windows라서 원래 그럼"** 으로 넘기지 마. 둘 다 실제 결함이야.
- ❌ 6단계 검증을 "키가 없어서 못 했다"로 통째로 건너뛰지 마. 키가 필요한 건
  `◆ API Connectivity` 와 동작 테스트뿐이고, 나머지는 키 없이도 전부 확인 가능해.
- ❌ **대화형(전체화면 / 입력 대기) 명령을 네가 실행하지 마.** 네 셸에서 그대로 멈춘다:
  `hermes --tui`, `hermes model` 대화형 마법사, 동의 플래그 없는 `winget install`.
  실행이 필요하면 나한테 넘기고 무엇을 실행하라고 알려줘.
- ❌ `.env` 에 자리표시자(`<<<...>>>`)를 literal 로 쓰지 마. 키를 못 구했으면 **비워두고** 보고해.

## 참고: 이 NVIDIA 계정에서 검증된 모델
tool-calling 정상 확인됨 — `deepseek-ai/deepseek-v4-pro`, `nvidia/nemotron-3-ultra-550b-a55b`, `openai/gpt-oss-120b`, `minimax/minimax-m3`, `z-ai/glm-5.2`
- `z-ai/glm-5.2` 는 응답이 90초 이상 걸려서 에이전트 루프엔 부적합
- `moonshotai/kimi-k2.6` 은 이 계정에서 404 (미프로비저닝) — 고르지 말 것

문제가 생기면 임의로 우회하지 말고 어떤 단계에서 무슨 에러가 났는지 먼저 나한테 보고해줘.
