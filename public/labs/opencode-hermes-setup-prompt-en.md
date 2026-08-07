# Prompt to paste into opencode — Windows

Install **Hermes Agent** (Nous Research) on this Windows laptop and configure it to match the
**reference spec** below. The reference spec was extracted from another laptop that is already
working correctly. Don't guess — match these values exactly.

---

## Reference spec (target state)

| Item | Value |
|---|---|
| Product | Hermes Agent v0.19.1 (2026-07-30) or newer, install method = `git` |
| Platform | Native Windows (not WSL) |
| HERMES_HOME | `%LOCALAPPDATA%\hermes` |
| Code location | `%LOCALAPPDATA%\hermes\hermes-agent` (contains venv) |
| Python | **3.11.15** (provisioned by uv). Allowed range `>=3.11,<3.14` |
| uv | `%LOCALAPPDATA%\hermes\bin\uv.exe` (installed automatically by the install script) |
| Executable | `%LOCALAPPDATA%\hermes\hermes-agent\venv\Scripts\hermes.exe` |
| Added to User PATH | `%LOCALAPPDATA%\hermes\hermes-agent\venv\Scripts`, `%LOCALAPPDATA%\hermes\bin` |
| Inference provider | **NVIDIA NIM** (Hermes's built-in `nvidia` provider — NOT `custom`) |
| model.provider | `nvidia` |
| model.default | `nvidia/nemotron-3-ultra-550b-a55b` |
| model.base_url | `https://integrate.api.nvidia.com/v1` |
| API key | `NVIDIA_API_KEY=nvapi-...` inside `%LOCALAPPDATA%\hermes\.env` |
| Node.js | portable Node **v22.23.2** → `%LOCALAPPDATA%\hermes\node\node.exe`. ⚠️ On the reference laptop the Node placed by the install script was insufficient and had to be **replaced manually** (verify in step 5) |
| ripgrep | **Installed separately via winget** — `BurntSushi.ripgrep.MSVC` (reference laptop: 15.2.0). Hermes does NOT bundle it, so doctor reports ⚠ if it's missing |
| Extra User env vars | `HERMES_NODE = %LOCALAPPDATA%\hermes\node\node.exe`, `HERMES_GIT_BASH_PATH = C:\Program Files\Git\bin\bash.exe` |
| Skills | Default bundle only (apple, autonomous-ai-agents, creative, email, github, media, mlops, note-taking, productivity, research, smart-home, social-media, software-development). **Do NOT install optional-skills** |
| MCP servers | None |
| plugins / hooks / cron jobs | None (all empty) |
| SOUL.md | Leave at default. No custom persona |
| Other logins | Nous Portal / OpenAI Codex / xAI / MiniMax — **all not logged in**. The NVIDIA API key is the only credential |

---

## Steps

### 0. Pre-flight check
- Check Windows version, PowerShell version, `git --version`
- Check for traces of an existing install: does `%LOCALAPPDATA%\hermes` exist, `where hermes`
  - If it's already installed, **do NOT delete anything** — report to me first and stop

### 0-1. Prepare Python (install if missing, align if the version is wrong)

The Python range Hermes requires is **`>=3.11,<3.14`** per `pyproject.toml`, and the reference
laptop runs **3.11.15**. The goal is to have **3.11.x** available.

**First, investigate the current state:**
```powershell
python --version
py -0p                                   # list all installed Python launchers
(Get-Command python -ErrorAction SilentlyContinue).Source
```

**Decision table:**

| Current state | Action |
|---|---|
| No Python | Run "install via uv" below |
| **3.11.x** | ✅ Use as-is. Do nothing |
| 3.12.x / 3.13.x | ✅ Compatible. Fine to leave, but to match the reference, **additionally** install 3.11 via uv |
| 3.10 or lower | ❌ Insufficient. **Additionally** install 3.11 via uv (leave the existing one alone) |
| 3.14 or higher | ❌ Out of supported range. **Additionally** install 3.11 via uv (leave the existing one alone) |
| `python.exe` path contains `...\WindowsApps\...` or the file is 0 bytes | ⚠️ That's a Microsoft Store stub (fake), not real Python → treat as missing and install via uv |

**Install via uv (recommended · no admin rights needed):**
```powershell
# install uv first if missing
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# install Python 3.11
uv python install 3.11
uv python find 3.11        # printing a path means success
```

**⚠️ Important principles:**
- 🚫 **Do NOT remove or overwrite any already-installed Python.** The Python uv installs is isolated
  in its own path, and Hermes only uses it inside its own venv. Do not change the system Python or
  PATH precedence.
- 🚫 Do NOT install Python from the Microsoft Store (the stub problem comes back).
- ℹ️ In fact `install.ps1` installs uv and runs `uv python install 3.11` on its own. So this step
  exists **to check in advance and to fix things by hand if it fails.** If you already have
  3.11–3.13, don't touch anything — go straight to step 1.
- ⚠️ Trap: the install script's fallback logic **lets 3.10 through**, but `pyproject.toml` requires
  `>=3.11`, so proceeding on 3.10 blows up later during package installation. If only 3.10 exists,
  you **must** install 3.11 first.

Verify after installing:
```powershell
uv python list             # 3.11.x must appear in the list
```

### 0-2. Prepare ripgrep (don't skip this — Hermes does not install it)

`hermes doctor` must show **ripgrep ✓** under `◆ External Tools`, but this is a tool you install
**separately** — the Hermes install script does not provide it.
"It's Windows, so it's normally missing" is **wrong.** The reference laptop has 15.2.0 installed
via winget (`%LOCALAPPDATA%\Microsoft\WinGet\Links\rg.exe`).

```powershell
# check whether it's already there
(Get-Command rg -ErrorAction SilentlyContinue).Source

# install if missing (no admin rights needed)
# ⚠️ Both agreement flags are required. Without them, winget prompts interactively for source
#    agreements on first run and will hang in an agent shell (verified trap)
winget install --id BurntSushi.ripgrep.MSVC -e --accept-source-agreements --accept-package-agreements

# Verify. Right after installing it isn't on this shell's PATH yet, so refresh PATH first
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
rg --version               # 15.x or newer is OK
```

- ⚠️ Install the **`.MSVC`** build, not `.GNU`. That's what the reference laptop uses.
- If winget is unavailable or blocked, scoop (`scoop install ripgrep`) or a GitHub release zip added
  to PATH is fine too. The method doesn't matter as long as `rg` resolves on PATH.

### 1. Install
Run the official install script in PowerShell (as a normal user, NOT as administrator):

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

- If it asks about provider/model during install, pick **NVIDIA**. The model gets pinned precisely
  via CLI later, so any choice is fine here.
- After installation, **a new PowerShell window is required** for PATH/env vars to apply.

**⚠️ If YOU (the agent) are running this — easy place to go down the wrong path:**
You cannot open "a new PowerShell window", so `hermes` is **not** on this shell's PATH right after
installation. Running `hermes --version` immediately gives command-not-found, and **that is not an
install failure.** Do (a) first; if that still fails, use (b) with the full path:

```powershell
# (a) refresh this shell's PATH from the registry (do this once before any hermes command in step 2+)
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')

# (b) if it still doesn't resolve, invoke by full path
$hermes = "$env:LOCALAPPDATA\hermes\hermes-agent\venv\Scripts\hermes.exe"
& $hermes --version
```

- Everywhere later in this file that says `hermes ...`, running `& $hermes ...` instead is equivalent.
- 🚫 Do NOT reinstall just because PATH didn't resolve. Try (a)/(b) first.

### 2. Verify the install
```powershell
hermes --version          # confirm v0.19.1+, Install method: git, Python: 3.11.x
hermes config path        # must be %LOCALAPPDATA%\hermes\config.yaml
```
- Make sure the `Python:` line of `hermes --version` says **3.11.x**. If it's 3.10 or lower, or
  3.14 or higher, go back to step 0-1, install 3.11, and reinstall.

### 3. Configure the API key
In `%LOCALAPPDATA%\hermes\.env`, find the `NVIDIA_API_KEY` line and make it look like the following.
If it's commented out (`#`), uncomment it; if it's absent, append it as a new line at the end:

```
NVIDIA_API_KEY=<<<PASTE_MY_NVAPI_KEY_HERE>>>
```

🚫 **The `<<<...>>>` above is a placeholder. Do NOT write that string into `.env`.**
Always substitute the real `nvapi-` key. If you haven't obtained the key yet, **write nothing and
leave it empty** — leaving a placeholder makes `hermes auth list` / `doctor` wrongly report "key
present" and then fail only at the API call, which makes the cause much harder to find.

- The key is a **70-character** string starting with `nvapi-`. For security it is not written in this file.
- **Key acquisition order (follow this order. Asking me is the LAST resort)**:
  1. If I pasted `nvapi-...` **in the same message** as this prompt, use that.
  2. If not, **look for it yourself first — the NVIDIA key currently running you (opencode) IS the key to reuse.**
     ```powershell
     # if opencode is authenticated with nvidia, it's here (path verified on the reference laptop)
     $a = "$env:USERPROFILE\.local\share\opencode\auth.json"
     if (Test-Path $a) { (Get-Content $a -Raw | ConvertFrom-Json).PSObject.Properties.Name }  # just check nvidia exists
     (Get-Content $a -Raw | ConvertFrom-Json).nvidia.key | Set-Clipboard                      # to clipboard, never to screen
     ```
     - If this laptop has traces of an earlier Hermes install, the `NVIDIA_API_KEY` line in
       `%LOCALAPPDATA%\hermes\.env` is another candidate. But **on a fresh install it is normally
       empty**, so don't give up just because it's not there.
  3. If you couldn't find it above, then ask me. **Do not print the key to screen/logs** — just ask.
- 📌 **Stopping here because the key is missing is correct behavior** (not a failure). But before
  stopping, **finish every remaining step that doesn't need the key (0-2, 4, 5) first** and ask me
  exactly once at the end. The only check that cannot pass without the key is
  `◆ API Connectivity → ✓ NVIDIA NIM` in step 6.
- When copying the same key from another laptop, never print it — clipboard only:
  ```powershell
  # (run on the laptop that already has the key)
  ((Select-String -Path "$env:LOCALAPPDATA\hermes\.env" -Pattern '^\s*NVIDIA_API_KEY=' |
    Select-Object -First 1).Line -split '=',2)[1].Trim() | Set-Clipboard
  ```
- A commented-out line may already exist, so to handle replace-or-append in one go:
  ```powershell
  $p = "$env:LOCALAPPDATA\hermes\.env"
  $k = 'nvapi-YOUR-KEY-HERE'
  $lines = Get-Content $p
  if ($lines -match '^\s*#?\s*NVIDIA_API_KEY\s*=') {
    ($lines -replace '^\s*#?\s*NVIDIA_API_KEY\s*=.*', "NVIDIA_API_KEY=$k") | Set-Content $p -Encoding utf8
  } else {
    Add-Content $p -Value "NVIDIA_API_KEY=$k" -Encoding utf8
  }
  ```
- **Encoding warning**: this is a Korean-locale Windows (cp949). Save `.env` as **UTF-8 without BOM**
  and never put Korean/non-ASCII characters in the file. When writing from PowerShell, pass
  `-Encoding utf8` explicitly.
- **Do NOT touch `auth.json` by hand.** Hermes generates it automatically by reading `.env`, and it
  contains a key fingerprint — hand-writing it corrupts it.

### 4. Configure model / provider
Skip the interactive wizard (`hermes model`) and pin it exactly with these 3 lines:

```powershell
hermes config set model.provider nvidia
hermes config set model.default nvidia/nemotron-3-ultra-550b-a55b
hermes config set model.base_url https://integrate.api.nvidia.com/v1
```

Verify:
```powershell
hermes config get model.provider   # nvidia
hermes config get model.default    # nvidia/nemotron-3-ultra-550b-a55b
hermes auth list                   # exactly 1 nvidia credential with source=env:NVIDIA_API_KEY
```

### 5. Node.js / TUI — ⚠️ Don't skip. This is where things fail silently

Hermes places its own Node under `%LOCALAPPDATA%\hermes\node`. The install script does provide it,
but **sometimes provides a version that's too old.** So this is not a "look at it if something
breaks" item — it is a **mandatory check.**

**5-1. Run this and show me the output:**
```powershell
& "$env:LOCALAPPDATA\hermes\node\node.exe" -v
[Environment]::GetEnvironmentVariable('HERMES_NODE','User')
```

**5-2. Decision:**

| `node -v` result | Action |
|---|---|
| **v22.22.0 or newer** (reference laptop = **v22.23.2**) | ✅ Pass. Move on |
| v22.12 – v22.21 | ❌ **Manual replacement in 5-3 is required.** The install reports "success" but the TUI is broken |
| File missing / anything else | ❌ Proceed to 5-3 |

- ⚠️ Known trap: the Node floor the install script requires (>=22.12) is lower than what the actual
  TUI dependency needs (`react-router` >= 22.22.0), so with Node 22.12–22.21 the npm install
  **fails silently with EBADENGINE**. The install log looks successful and `hermes -z` works fine,
  but `hermes --tui` won't come up. That's why you must catch this before step 6.

**5-3. Manual replacement (only if ❌ above) — run this script as-is:**

⚠️ Replacing `node.exe` alone is **not enough.** On the reference laptop
`%LOCALAPPDATA%\hermes\node` holds the entire extracted zip contents (`node.exe` + `npm` / `npx` /
`corepack` / `node_modules`). Swapping only node.exe leaves an outdated npm behind and they drift
apart. **Overwrite the whole contents.**

```powershell
$ver  = 'v22.23.2'                                  # pinned to the same version as the reference laptop
$dest = "$env:LOCALAPPDATA\hermes\node"
$tmp  = "$env:TEMP\node-$ver"
$zip  = "$tmp\node-$ver-win-x64.zip"

New-Item -ItemType Directory -Force $tmp  | Out-Null
New-Item -ItemType Directory -Force $dest | Out-Null

# Download (~34MB. URL format is verified and v22.23.2 does exist)
Invoke-WebRequest -Uri "https://nodejs.org/dist/$ver/node-$ver-win-x64.zip" -OutFile $zip -UseBasicParsing

# Extract — the zip has one wrapping folder, node-v22.23.2-win-x64\
Expand-Archive -Path $zip -DestinationPath $tmp -Force

# Overwrite hermes\node with that folder's CONTENTS (so node.exe sits directly under $dest)
Copy-Item "$tmp\node-$ver-win-x64\*" $dest -Recurse -Force

# Set the User env var — Hermes prefers this variable when launching the TUI
[Environment]::SetEnvironmentVariable('HERMES_NODE', "$dest\node.exe", 'User')

# Verify
& "$dest\node.exe" -v                               # v22.23.2 means success
Get-ChildItem $dest -Name | Select-Object -First 15  # npm / npx / node_modules should be visible
```

- ⚠️ If `Copy-Item` reports "file in use", a Hermes TUI or node process is running. Check with
  `Get-Process node -ErrorAction SilentlyContinue`, terminate it, and rerun.
- If the download is blocked (corporate network/firewall), do NOT work around it on your own —
  report that fact to me.
- 🚫 **Never touch the system Node.** No `nvm install` / `nvm use`. That's an area I manage myself
  with nvm. Hermes's dedicated Node must stay completely separate from the system Node.
- If Git Bash is installed, set this User env var too (value configured on the reference laptop):
  `HERMES_GIT_BASH_PATH = C:\Program Files\Git\bin\bash.exe`

### 6. Final verification — **run all of this and show me the actual output**

```powershell
hermes doctor
```
Pass criteria:
- `◆ Python Environment` → **Python 3.11.x ✓**, SQLite ✓, Virtual environment active ✓, Version files consistent ✓
- `◆ Configuration Files` → `.env` / `config.yaml` present ✓, "API key or custom endpoint configured" ✓
- `◆ API Connectivity` → **`✓ NVIDIA NIM`**
- `◆ Directory Structure` → all ✓
- `◆ External Tools` → git ✓, ripgrep ✓, Node.js ✓
- `◆ Tool Availability` → browser / code_execution / file / memory / skills / terminal / todo all ✓

> Note: the warnings below are **the same normal state as on the reference laptop**. Don't try to fix them.
> - Nous Portal / Codex / xAI / MiniMax "not logged in"
> - discord/telegram packages not installed, no EXA/TAVILY/XAI keys
> - npm audit vulnerability warnings (build-time tooling)
> - "Config version outdated (v0 → v33)" ← **appears on the reference laptop too.** The reference
>   laptop's `config.yaml` has no `version` key at all, so doctor infers v0. No functional impact.
>   Running `hermes doctor --fix` once to clear it is fine, and leaving it is fine (both normal).

> 🚫 Conversely, the items below are **NOT "normal on Windows" — they are real defects to fix.** Don't wave them through.
> - **`ripgrep not found`** → step 0-2 wasn't done.
>   Install with `winget install --id BurntSushi.ripgrep.MSVC -e --accept-source-agreements --accept-package-agreements`.
>   (Judging it as "normally absent on Windows" is **wrong** — the reference laptop has 15.2.0)
> - **`Node.js` below v22.22.0** → go back to step 5. The TUI is already broken.
> - **`✗ NVIDIA API key not configured`** → step 3. The only true blocker, and adding the key fixes it.

Then two real functional tests:
```powershell
hermes -z "What is 2 + 2? Answer with the number only."
hermes -z "List the files in the current working directory using the file tool and tell me only the file count."
```
- The first checks LLM responses; the second checks **tool-calling** (this one really matters)

Finally, TUI verification — 🚫 **do NOT run `hermes --tui` yourself.**
It's an interactive full-screen app, so in your non-interactive shell it can't receive input and
will hang until timeout. **Do these two things instead:**

**(1) You only verify the build artifacts (non-interactive, safe):**
```powershell
$root = "$env:LOCALAPPDATA\hermes\hermes-agent"
Test-Path "$root\ui-tui\dist\entry.js"                                   # must be True (≈3.6MB on the reference laptop)
(Get-Item "$root\ui-tui\dist\entry.js" -ErrorAction SilentlyContinue).Length
(Get-Content "$root\node_modules\react-router\package.json" -Raw |
  ConvertFrom-Json).version                                              # reference laptop = 8.3.0
```
- If `entry.js` is **missing** or `react-router` is absent → npm install failed silently with
  EBADENGINE. **Go back to step 5, replace Node with v22.23.2, and reinstall.** (This is the actual
  evidence of a broken TUI.)
- Note: `react-router` is **hoisted to the root `hermes-agent\node_modules`**, not
  `ui-tui\node_modules`. `ui-tui\node_modules` being absent is the same on the reference laptop, so
  that's normal.

**(2) Hand the actual on-screen check to me:**
> "Please run `hermes --tui` yourself in a terminal. If the screen comes up it's a success, and you
> can quit right away."
Tell me that and finish. Do not try to launch it yourself.

### 7. Report
Summarize and tell me:
1. Installed Hermes version + install method + **Python version** (state before → state after)
2. The full `model:` block of the final `config.yaml`
3. A ✓/⚠ summary of the `hermes doctor` results
4. The actual responses from the two functional tests
5. Everything that ended up **different** from the reference spec (don't hide anything)

---

## What NOT to do (important)
- ❌ Do NOT set `provider: custom`. Hermes ships an official `nvidia` provider plugin.
- ❌ Do NOT try to use a Hermes-3 **model**. "Hermes Agent" is the name of the agent framework; the
  LLM is an NVIDIA NIM model.
- ❌ Do NOT modify the system Node/nvm.
- ❌ Do NOT delete/overwrite existing Python, and do NOT change PATH precedence. If needed, only
  **additionally** install via uv.
- ❌ Do NOT try to move to Python 3.14+ (outside `requires-python = ">=3.11,<3.14"`).
- ❌ Do NOT hand-write `auth.json`.
- ❌ Do NOT install optional-skills, MCP servers, or plugins (the reference laptop has none).
- ❌ Do NOT copy a whole `config.yaml` from somewhere else. Schema versions can differ — adjust only
  via `hermes config set`.
- ❌ Do NOT export my API key to logs/commits/anywhere external. (That includes echoing/cat-ing it to screen.)
- ❌ Do NOT wave off `ripgrep not found` or a low Node version as **"that's just how Windows is."**
  Both are real defects.
- ❌ Do NOT skip step 6 verification wholesale as "couldn't do it, no key." Only `◆ API Connectivity`
  and the functional tests need the key; everything else is verifiable without it.
- ❌ **Do NOT run interactive (full-screen / input-waiting) commands yourself.** They will hang your
  shell: `hermes --tui`, the interactive `hermes model` wizard, `winget install` without the
  agreement flags. If something needs to be run, hand it to me and tell me what to run.
- ❌ Do NOT write the placeholder (`<<<...>>>`) into `.env` literally. If you couldn't get the key,
  **leave it empty** and report.

## Reference: models verified on this NVIDIA account
Tool-calling confirmed working — `deepseek-ai/deepseek-v4-pro`, `nvidia/nemotron-3-ultra-550b-a55b`,
`openai/gpt-oss-120b`, `minimax/minimax-m3`, `z-ai/glm-5.2`
- `z-ai/glm-5.2` takes over 90 seconds to respond — unsuitable for an agent loop
- `moonshotai/kimi-k2.6` returns 404 on this account (not provisioned) — don't pick it

If something goes wrong, do NOT improvise a workaround — first report to me which step failed and
what the error was.
