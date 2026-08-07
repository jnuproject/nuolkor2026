# opencode에 붙여넣을 프롬프트 — macOS 버전

이 Mac에 **Hermes Agent**(Nous Research)를 설치하고, 아래 **참조 스펙**과 동일하게 설정해줘.
참조 스펙은 이미 정상 동작 중인 다른 노트북에서 실제로 추출한 값이야. 추측하지 말고 이 값 그대로 맞춰줘.

> ⚠️ **이 파일의 근거를 먼저 밝혀둠 (중요):**
> 참조 노트북은 **Windows** 기기야. 그래서 이 macOS 문서의 경로/명령은
> Hermes 소스 코드에서 직접 추출한 값이고, **실제 Mac에서 끝까지 검증된 건 아니야.**
> - `HERMES_HOME = ~/.hermes` → `hermes_constants.py:53-59`, `scripts/install.sh:48`
> - 코드 위치 `~/.hermes/hermes-agent` → `scripts/install.sh:447`
> - uv `~/.hermes/bin/uv` → `scripts/install.sh:560`
> - Node `~/.hermes/node/bin/node` (POSIX 레이아웃) → `hermes_constants.py:285-301`, `install.sh:815-817, 927-942`
> - Python 3.11 / Node 22 목표 → `scripts/install.sh:59-60`
> - `requires-python = ">=3.11,<3.14"` → `pyproject.toml:15`
>
> 버전 번호(v0.19.1, Python 3.11.15)와 모델 목록은 참조 노트북에서 가져온 값이라 OS와 무관해.
> **경로가 문서와 다르게 나오면 임의로 바꾸지 말고 나한테 보고해.**

---

## 참조 스펙 (목표 상태)

| 항목 | 값 |
|---|---|
| 제품 | Hermes Agent v0.19.1 (2026.7.30) 이상, install method = `git` |
| 플랫폼 | macOS 네이티브 (Apple Silicon / Intel 둘 다 지원) |
| HERMES_HOME | `~/.hermes` |
| 코드 위치 | `~/.hermes/hermes-agent` (venv 포함) |
| Python | **3.11.x** (uv가 provisioning). 허용 범위 `>=3.11,<3.14` |
| uv | `~/.hermes/bin/uv` (설치 스크립트가 자동 설치) |
| 실행 파일 | `~/.hermes/hermes-agent/venv/bin/hermes` ← **Windows의 `venv\Scripts\` 아님** |
| PATH 등록 | 설치 스크립트가 `~/.zshrc` / `~/.zprofile` 에 추가 (zsh 기본) |
| 추론 프로바이더 | **NVIDIA NIM** (Hermes 기본 내장 `nvidia` 프로바이더. `custom` 아님) |
| model.provider | `nvidia` |
| model.default | `nvidia/nemotron-3-ultra-550b-a55b` |
| model.base_url | `https://integrate.api.nvidia.com/v1` |
| API 키 | `~/.hermes/.env` 안에 `NVIDIA_API_KEY=nvapi-...` |
| Node.js | Hermes 관리형 Node 22.x → **`~/.hermes/node/bin/node`**. install.sh 가 버전 부족 시 자동 설치 |
| ripgrep | **install.sh 가 Homebrew 로 자동 설치해줌** (Windows와 다름). brew 가 없으면 수동 필요 |
| Skills | 기본 번들만. **optional-skills 추가 설치 안 함** |
| MCP 서버 | 없음 |
| plugins / hooks / cron job | 없음 (전부 비어 있음) |
| SOUL.md | 기본값 그대로. 커스텀 페르소나 없음 |
| 기타 로그인 | Nous Portal / OpenAI Codex / xAI / MiniMax **전부 로그인 안 함**. 인증은 NVIDIA API 키 하나뿐 |
| ❌ 해당 없음 | `HERMES_GIT_BASH_PATH` (Windows 전용), cp949 인코딩 문제 (macOS는 UTF-8 기본) |

---

## Windows 버전과 다른 점 요약 (먼저 읽어)

| | Windows | **macOS (이 문서)** |
|---|---|---|
| HERMES_HOME | `%LOCALAPPDATA%\hermes` | `~/.hermes` |
| venv 실행 파일 | `venv\Scripts\hermes.exe` | `venv/bin/hermes` |
| Node 경로 | `hermes\node\node.exe` | `~/.hermes/node/bin/node` |
| 설치 명령 | `iex (irm .../install.ps1)` | `curl -fsSL .../install.sh \| sh` |
| ripgrep | winget 으로 **직접** 깔아야 함 | **install.sh 가 brew 로 알아서 깜** |
| PATH 적용 | User 환경변수 → 새 창 필요 | `~/.zshrc` → `source` 또는 전체 경로 |
| Node 부족 시 | 설치 스크립트가 낮은 버전 배치하는 함정 있음 | install.sh 가 최신 22.x 를 자동 설치 (함정 덜함) |

---

## 작업 순서

### 0. 사전 점검
```bash
sw_vers                          # macOS 버전
uname -m                         # arm64 = Apple Silicon, x86_64 = Intel
echo "$SHELL"                    # /bin/zsh 가 기본
git --version
ls -d ~/.hermes 2>/dev/null || echo "no ~/.hermes"
command -v hermes || echo "hermes not on PATH"
```
- 이미 설치돼 있으면 **지우지 말고** 먼저 나에게 보고하고 멈출 것
  - 단, 내가 "이어서 해"라고 명시했으면 그때는 지우지 않고 이어서 진행해

### 0-1. Python 준비

Hermes가 요구하는 범위는 **`>=3.11,<3.14`** 이고 목표는 **3.11.x** 확보야.

```bash
python3 --version
command -v python3
ls ~/.hermes/bin/uv 2>/dev/null && ~/.hermes/bin/uv python list
```

**판정 기준:**

| 현재 상태 | 조치 |
|---|---|
| Python 없음 | 아래 "uv로 설치" 실행 |
| **3.11.x** | ✅ 그대로 사용 |
| 3.12.x / 3.13.x | ✅ 호환됨. 그대로 둬도 되고, 참조와 맞추려면 uv로 3.11 **추가** 설치 |
| 3.10 이하 | ❌ 부족. uv로 3.11 **추가** 설치 (기존 건 그대로) |
| 3.14 이상 | ❌ 지원 범위 밖. uv로 3.11 **추가** 설치 (기존 건 그대로) |

**uv로 설치 (권장 · sudo 불필요):**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.11
uv python find 3.11
```

**⚠️ macOS 특유의 함정:**
- 🚫 **`/usr/bin/python3` (Xcode Command Line Tools 딸린 것) 을 건드리거나 지우지 마.** 시스템이 씀.
- 🚫 Homebrew python 을 업그레이드/다운그레이드해서 버전을 맞추려 하지 마. 다른 brew 패키지가 깨져.
  uv가 설치하는 Python 은 별도 경로에 격리되고, Hermes 는 자기 venv 에서만 그걸 써.
- ℹ️ `python` (3 없는) 명령은 macOS 에 아예 없는 게 정상이야. `python3` 만 봐.
- ℹ️ 사실 `install.sh` 가 uv 설치와 Python 3.11 provisioning 까지 알아서 해 (`install.sh:59` `PYTHON_VERSION="3.11"`).
  이 단계는 **"미리 확인하고, 실패했을 때 수동으로 고치기 위한 것"** 이야. 이미 3.11~3.13이면 바로 1단계로.

### 0-2. ripgrep / Homebrew 준비

**Windows 버전과 결정적으로 다른 점**: macOS 에서는 `install.sh` 가 ripgrep 을
**Homebrew 로 자동 설치해줘** (`scripts/install.sh:1070-1081`). 그래서 brew 만 있으면 아무것도 안 해도 돼.

```bash
command -v rg && rg --version
command -v brew && brew --version
```

| 상태 | 조치 |
|---|---|
| `rg` 있음 | ✅ 아무것도 하지 마 |
| `rg` 없고 `brew` 있음 | ✅ 1단계 install.sh 가 알아서 깐다. 그냥 넘어가 |
| `rg` 없고 `brew` 없음 | ⚠️ 아래 참고 — **Homebrew 설치는 네가 하지 마** |

- 🚫 **Homebrew 설치 명령을 네가 실행하지 마.** `sudo` 암호를 대화형으로 물어보고
  네 셸에서는 입력을 못 받아 그대로 멈춰. 이 경우엔 나한테 이렇게 알려주고 넘어가:
  > "Homebrew 가 없습니다. 터미널에서 직접 아래를 실행해주세요:
  >  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  >  그 다음 `brew install ripgrep` 까지 해주시면 이어서 진행합니다."
- brew 가 이미 있으면 `brew install ripgrep` 은 비대화형이라 네가 직접 실행해도 괜찮아.

### 1. 설치

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh
```

- 설치 중 프로바이더/모델을 물으면 **NVIDIA**를 고르고, 모델은 뒤에서 CLI로 정확히 맞출 거니까 아무거나 넘어가도 됨
- `| sh` 로 파이프하면 stdin 이 TTY 가 아니라서 대화형 프롬프트는 기본값으로 넘어갈 가능성이 높아.
  중간에 입력을 기다리며 멈추면 **강제 종료하고 나한테 보고해.** 임의로 우회하지 마.

**⚠️ 네가(에이전트가) 실행하는 경우 — 여기서 헛다리 짚기 쉬움:**
설치 스크립트는 PATH 를 `~/.zshrc` / `~/.zprofile` 에 추가해 (`install.sh:1827-1832`).
너의 셸은 그걸 다시 읽지 않으니 설치 직후 `hermes` 는 **command not found 야. 이건 실패가 아니야.**
**전체 경로 변수를 만들어서 이후 모든 단계에서 그걸 써:**

```bash
HERMES=~/.hermes/hermes-agent/venv/bin/hermes
"$HERMES" --version
```

- 이 파일의 이후 단계에서 `hermes ...` 로 적힌 건 전부 `"$HERMES" ...` 로 실행해.
- 🚫 PATH 가 안 잡혔다고 재설치하지 마. 위 전체 경로를 먼저 써봐.
- ℹ️ `source ~/.zshrc` 는 네 셸이 bash/sh 면 실패하거나 부작용이 있을 수 있어. 전체 경로가 더 안전해.

### 2. 설치 결과 검증
```bash
HERMES=~/.hermes/hermes-agent/venv/bin/hermes
"$HERMES" --version          # v0.19.1 이상, Install method: git, Python: 3.11.x 확인
"$HERMES" config path        # ~/.hermes/config.yaml 이어야 함
```
- `Python:` 줄이 **3.11.x** 인지 꼭 봐줘. 3.10 이하나 3.14 이상이면 0-1로 돌아가 3.11을 깔고 재설치.

### 3. API 키 설정

`~/.hermes/.env` 의 `NVIDIA_API_KEY` 줄을 실제 키로 만들어줘. 주석(`#`)이면 풀고, 없으면 새 줄로 추가.

🚫 **자리표시자를 그대로 쓰지 마.** 키를 못 구했으면 **아무것도 쓰지 말고 비워둬** —
가짜 값을 넣으면 `auth list` / `doctor` 가 "키 있음"으로 오판하고 API 호출에서만 실패해서 원인 찾기가 어려워져.

- 키는 `nvapi-` 로 시작하는 **70자** 문자열이야. 보안상 이 파일 안에 적어두지 않았어.
- **키 조달 순서 (이 순서대로. 나한테 묻는 건 맨 마지막 수단이야)**:
  1. 내가 이 프롬프트와 **같은 메시지에** `nvapi-...` 를 붙여넣었으면 그걸 써.
  2. 없으면 **먼저 스스로 찾아봐 — 지금 너(opencode)를 돌리고 있는 그 NVIDIA 키가 재사용할 키야.**
     ```bash
     # opencode 가 nvidia 로 인증돼 있으면 여기 있음
     A="$HOME/.local/share/opencode/auth.json"
     [ -f "$A" ] && python3 -c "import json,sys;print(*json.load(open(sys.argv[1])).keys())" "$A"   # nvidia 있는지만
     python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['nvidia']['key'],end='')" "$A" | pbcopy   # 화면에 찍지 말고 클립보드로
     ```
  3. 위에서 못 찾았으면 그때 나한테 요청해. **키를 화면/로그에 출력하지 말고** 요청만 해.
- 📌 **이 단계에서 키가 없다고 멈추는 건 정상 동작이야** (실패가 아님). 단, 멈추기 전에
  **키가 필요 없는 나머지 단계(0-2, 4, 5)를 먼저 다 끝내놓고** 마지막에 한 번만 물어봐.
  키 없이 통과 불가능한 항목은 6단계의 `◆ API Connectivity → ✓ NVIDIA NIM` 하나뿐이야.

**`.env` 에 쓰는 방법 (주석 줄까지 한 번에 처리):**
```bash
ENV="$HOME/.hermes/.env"
KEY='nvapi-여기에키'
if grep -qE '^[[:space:]]*#?[[:space:]]*NVIDIA_API_KEY[[:space:]]*=' "$ENV"; then
  sed -i '' -E "s|^[[:space:]]*#?[[:space:]]*NVIDIA_API_KEY[[:space:]]*=.*|NVIDIA_API_KEY=$KEY|" "$ENV"
else
  printf '\nNVIDIA_API_KEY=%s\n' "$KEY" >> "$ENV"
fi
grep -c '^NVIDIA_API_KEY=' "$ENV"      # 1 이어야 함 (0 이나 2 면 잘못됨)
```
- ⚠️ **macOS `sed` 는 BSD 판이라 `-i` 뒤에 빈 인자 `''` 가 필수야.** GNU 문법(`sed -i`)을 쓰면
  다음 인자를 백업 확장자로 먹어서 엉뚱하게 동작해. 위 명령 그대로 써.
- `auth.json` 은 **직접 손대지 마.** Hermes 가 `.env` 를 읽어 자동 생성하고, 키 지문이 들어가서 손으로 쓰면 깨져.

### 4. 모델 / 프로바이더 설정
대화형 마법사(`hermes model`) 말고 아래 3줄로 정확히 고정해줘:

```bash
"$HERMES" config set model.provider nvidia
"$HERMES" config set model.default nvidia/nemotron-3-ultra-550b-a55b
"$HERMES" config set model.base_url https://integrate.api.nvidia.com/v1
```

확인:
```bash
"$HERMES" config get model.provider   # nvidia
"$HERMES" config get model.default    # nvidia/nemotron-3-ultra-550b-a55b
"$HERMES" auth list                   # nvidia 자격증명 1건이 source=env:NVIDIA_API_KEY 로 잡혀야 함
```

### 5. Node.js / TUI — 확인은 필수

macOS 에서 Hermes 관리형 Node 는 **`~/.hermes/node/bin/node`** 야
(Windows 는 `hermes\node\node.exe` — 레이아웃이 다름. `hermes_constants.py:285-301`).
`install.sh` 는 시스템 node 가 부족하면 관리형 Node 22 LTS 를 **자동으로 받아서 깔아** (`install.sh:823`),
그래서 Windows 만큼 자주 깨지지는 않아. 그래도 **확인은 반드시 해.**

**5-1. 실행하고 출력을 보여줘:**
```bash
~/.hermes/node/bin/node -v 2>/dev/null || echo "관리형 Node 없음"
echo "HERMES_NODE=${HERMES_NODE:-(unset)}"
command -v node && node -v          # 시스템 node — 참고용. 절대 건드리지 마
```

**5-2. 판정:**

| `~/.hermes/node/bin/node -v` | 조치 |
|---|---|
| **v22.22.0 이상** | ✅ 통과 |
| v22.12 ~ v22.21 | ⚠️ 5-3 교체 권장 (TUI 의존성이 더 높은 버전을 요구함 — Windows 에서 확인된 함정) |
| 없음 + 시스템 node 가 v22.12 이상 | ✅ 통과 가능. install.sh 가 시스템 node 를 쓴 경우야 (`install.sh:808`) |
| 없음 + 시스템 node 도 부족/없음 | ❌ 5-3 진행 |

**5-3. 수동 교체 (위에서 ⚠️/❌ 인 경우에만):**
```bash
VER=v22.23.2                                    # 참조 노트북과 동일 버전
case "$(uname -m)" in
  arm64)  NA=arm64 ;;                           # Apple Silicon
  x86_64) NA=x64 ;;                             # Intel
  *) echo "unknown arch: $(uname -m)"; exit 1 ;;
esac

TMP=$(mktemp -d)
curl -fsSL -o "$TMP/node.tar.gz" "https://nodejs.org/dist/$VER/node-$VER-darwin-$NA.tar.gz"
tar -xzf "$TMP/node.tar.gz" -C "$TMP"
rm -rf "$HOME/.hermes/node"
mv "$TMP/node-$VER-darwin-$NA" "$HOME/.hermes/node"
rm -rf "$TMP"

~/.hermes/node/bin/node -v                      # v22.23.2 나오면 성공
ls ~/.hermes/node/bin                           # node / npm / npx 가 보여야 정상
```
- ℹ️ tarball 안에 `bin/` 이 이미 있어서, 폴더째로 `~/.hermes/node` 로 옮기면
  `~/.hermes/node/bin/node` 구조가 정확히 맞아 (`install.sh:927` 과 같은 방식).
- URL 은 실측 확인된 형식이야 (`darwin-arm64` 47.7MB / `darwin-x64` 48.9MB, 둘 다 HTTP 200).
- `HERMES_NODE` 를 고정하려면 (Hermes 가 TUI 실행 시 이 변수를 우선 사용):
  ```bash
  echo 'export HERMES_NODE="$HOME/.hermes/node/bin/node"' >> ~/.zshrc
  ```
- 🚫 **시스템 Node / nvm 은 절대 건드리지 마.** `nvm install` / `nvm use` / `brew upgrade node` 금지.
  내가 직접 관리하는 영역이야. Hermes 전용 Node 는 완전히 분리돼 있어야 해.
- 다운로드가 막혀 있으면(사내망/방화벽) 임의로 우회하지 말고 그 사실을 나한테 보고해.

### 6. 최종 검증 — 아래를 **전부 실행하고 실제 출력을 보여줘**

```bash
"$HERMES" doctor
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
> - "Config version outdated (v0 → v33)" ← **참조 노트북에서도 뜸.** `config.yaml` 에 `version` 키가
>   없어서 doctor 가 v0 으로 추정하는 것이고 기능엔 영향 없음.
>   `doctor --fix` 한 번 실행해도 되고 그냥 둬도 됨 (둘 다 정상).

> 🚫 반대로, 아래는 실제로 고쳐야 하는 것들이야. 넘어가지 마.
> - **`ripgrep not found`** → 0-2 단계. brew 있으면 `brew install ripgrep`, 없으면 나한테 넘겨.
> - **`Node.js` 항목이 v22.12 미만** → 5단계로 돌아가.
> - **`✗ NVIDIA API key not configured`** → 3단계. 키만 넣으면 해결되는 유일한 진짜 블로커.

이어서 실제 동작 테스트 2개:
```bash
"$HERMES" -z "2 + 2 는? 숫자만 답해."
"$HERMES" -z "지금 작업 폴더의 파일 목록을 file 툴로 확인하고 파일 개수만 알려줘."
```
- 첫 번째는 LLM 응답 확인, 두 번째는 **tool-calling 확인**(이게 진짜 중요함)

마지막으로 TUI 확인 — 🚫 **`hermes --tui` 는 네가 실행하지 마.**
대화형 전체화면 앱이라 너의 비대화형 셸에서는 입력을 못 받고 타임아웃까지 매달려 있게 돼.
**대신 아래 두 가지를 해:**

**(1) 너는 빌드 산출물만 확인해 (비대화형, 안전):**
```bash
ROOT="$HOME/.hermes/hermes-agent"
ls -la "$ROOT/ui-tui/dist/entry.js"                                  # 있어야 함 (참조 노트북 ≈3.6MB)
python3 -c "import json;print(json.load(open('$ROOT/node_modules/react-router/package.json'))['version'])"
```
- `entry.js` 가 **없거나** `react-router` 가 없으면 → npm install 이 조용히 실패한 것.
  **5단계로 돌아가서 Node 를 교체하고 재설치해.**
- 참고: `react-router` 는 `ui-tui/node_modules` 가 아니라 **루트 `hermes-agent/node_modules` 로 hoist** 돼 있어.
  `ui-tui/node_modules` 가 없는 건 참조 노트북도 마찬가지니 정상이야 (참조 = react-router 8.3.0).

**(2) 실제 화면 확인은 나한테 넘겨:**
> "터미널에서 `hermes --tui` 를 직접 실행해보세요. 화면이 뜨면 성공이고 바로 종료하셔도 됩니다."
라고 알려주고 끝내. 네가 직접 띄우려고 시도하지 마.

### 7. 보고
아래를 정리해서 알려줘:
1. 설치된 Hermes 버전 + install method + **Python 버전** (설치 전 → 설치 후)
2. 최종 `config.yaml` 의 `model:` 블록 전문
3. `hermes doctor` 결과 중 ✓/⚠ 요약
4. 동작 테스트 2개의 실제 응답
5. **경로가 이 문서와 달랐던 부분** (이 문서는 소스에서 추출한 값이라 실기기 검증 전이야. 다르면 꼭 알려줘)
6. 참조 스펙과 **다르게** 끝난 부분이 있으면 전부 (숨기지 말고)

---

## 하지 말아야 할 것 (중요)
- ❌ `provider: custom` 으로 설정하지 마. Hermes 에 `nvidia` 프로바이더 플러그인이 정식으로 들어있음.
- ❌ Hermes-3 **모델**을 쓰려고 하지 마. "Hermes Agent"는 에이전트 프레임워크 이름이고, LLM 은 NVIDIA NIM 모델이야.
- ❌ **시스템 Node / nvm / `brew upgrade node` 금지.**
- ❌ **`/usr/bin/python3` (Xcode CLT) 나 Homebrew python 을 지우거나 버전 바꾸지 마.** uv 로 **추가** 설치만 해.
- ❌ Python 3.14 이상으로 맞추려 하지 마 (`requires-python = ">=3.11,<3.14"` 범위 밖).
- ❌ `auth.json` 직접 작성 금지.
- ❌ optional-skills, MCP 서버, plugins 추가 설치 금지 (참조 노트북에 없음).
- ❌ config.yaml 을 통째로 다른 데서 복사해오지 마. `hermes config set` 으로만 조정.
- ❌ 내 API 키를 로그/커밋/외부로 내보내지 마. (`cat`/`echo` 로 화면에 찍는 것도 포함)
- ❌ **`sudo` 가 필요한 명령을 네가 실행하지 마.** 암호 프롬프트에서 멈춘다. Homebrew 설치가 대표적이야.
- ❌ **대화형(전체화면 / 입력 대기) 명령을 네가 실행하지 마.** `hermes --tui`, `hermes model` 마법사,
  Homebrew 설치 스크립트. 실행이 필요하면 나한테 넘기고 무엇을 실행하라고 알려줘.
- ❌ `.env` 에 자리표시자를 literal 로 쓰지 마. 키를 못 구했으면 **비워두고** 보고해.
- ❌ **GNU `sed -i` 문법 쓰지 마.** macOS 는 BSD sed 라서 `sed -i '' ...` 로 빈 인자가 필요해.

## 참고: 이 NVIDIA 계정에서 검증된 모델
tool-calling 정상 확인됨 — `deepseek-ai/deepseek-v4-pro`, `nvidia/nemotron-3-ultra-550b-a55b`, `openai/gpt-oss-120b`, `minimax/minimax-m3`, `z-ai/glm-5.2`
- `z-ai/glm-5.2` 는 응답이 90초 이상 걸려서 에이전트 루프엔 부적합
- `moonshotai/kimi-k2.6` 은 이 계정에서 404 (미프로비저닝) — 고르지 말 것

문제가 생기면 임의로 우회하지 말고 어떤 단계에서 무슨 에러가 났는지 먼저 나한테 보고해줘.
