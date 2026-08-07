# Prompt to paste into opencode — macOS

Install **Hermes Agent** (Nous Research) on this Mac and configure it to match the **reference spec**
below. The reference spec was extracted from another laptop that is already working correctly.
Don't guess — match these values exactly.

> ⚠️ **Provenance of this file, stated up front (important):**
> The reference laptop is a **Windows** machine. So the paths/commands in this macOS document were
> extracted directly from the Hermes source code and have **not been verified end-to-end on an
> actual Mac.**
> - `HERMES_HOME = ~/.hermes` → `hermes_constants.py:53-59`, `scripts/install.sh:48`
> - Code location `~/.hermes/hermes-agent` → `scripts/install.sh:447`
> - uv at `~/.hermes/bin/uv` → `scripts/install.sh:560`
> - Node at `~/.hermes/node/bin/node` (POSIX layout) → `hermes_constants.py:285-301`, `install.sh:815-817, 927-942`
> - Python 3.11 / Node 22 targets → `scripts/install.sh:59-60`
> - `requires-python = ">=3.11,<3.14"` → `pyproject.toml:15`
>
> Version numbers (v0.19.1, Python 3.11.15) and the model list come from the reference laptop and
> are OS-independent.
> **If a path turns out different from this document, do NOT silently change course — report it to me.**

---

## Reference spec (target state)

| Item | Value |
|---|---|
| Product | Hermes Agent v0.19.1 (2026-07-30) or newer, install method = `git` |
| Platform | Native macOS (both Apple Silicon and Intel supported) |
| HERMES_HOME | `~/.hermes` |
| Code location | `~/.hermes/hermes-agent` (contains venv) |
| Python | **3.11.x** (provisioned by uv). Allowed range `>=3.11,<3.14` |
| uv | `~/.hermes/bin/uv` (installed automatically by the install script) |
| Executable | `~/.hermes/hermes-agent/venv/bin/hermes` ← **not Windows's `venv\Scripts\`** |
| PATH registration | The install script appends to `~/.zshrc` / `~/.zprofile` (zsh is the default) |
| Inference provider | **NVIDIA NIM** (Hermes's built-in `nvidia` provider — NOT `custom`) |
| model.provider | `nvidia` |
| model.default | `nvidia/nemotron-3-ultra-550b-a55b` |
| model.base_url | `https://integrate.api.nvidia.com/v1` |
| API key | `NVIDIA_API_KEY=nvapi-...` inside `~/.hermes/.env` |
| Node.js | Hermes-managed Node 22.x → **`~/.hermes/node/bin/node`**. install.sh installs it automatically if the version is insufficient |
| ripgrep | **install.sh installs it automatically via Homebrew** (differs from Windows). Manual work needed only if brew is absent |
| Skills | Default bundle only. **Do NOT install optional-skills** |
| MCP servers | None |
| plugins / hooks / cron jobs | None (all empty) |
| SOUL.md | Leave at default. No custom persona |
| Other logins | Nous Portal / OpenAI Codex / xAI / MiniMax — **all not logged in**. The NVIDIA API key is the only credential |
| ❌ Not applicable | `HERMES_GIT_BASH_PATH` (Windows-only), cp949 encoding issues (macOS is UTF-8 by default) |

---

## Differences from the Windows version (read this first)

| | Windows | **macOS (this document)** |
|---|---|---|
| HERMES_HOME | `%LOCALAPPDATA%\hermes` | `~/.hermes` |
| venv executable | `venv\Scripts\hermes.exe` | `venv/bin/hermes` |
| Node path | `hermes\node\node.exe` | `~/.hermes/node/bin/node` |
| Install command | `iex (irm .../install.ps1)` | `curl -fsSL .../install.sh \| sh` |
| ripgrep | must be installed **manually** via winget | **install.sh installs it via brew** |
| PATH application | User env vars → new window required | `~/.zshrc` → `source` or full path |
| If Node is too old | trap: install script places a low version | install.sh auto-installs the latest 22.x (less of a trap) |

---

## Steps

### 0. Pre-flight check
```bash
sw_vers                          # macOS version
uname -m                         # arm64 = Apple Silicon, x86_64 = Intel
echo "$SHELL"                    # /bin/zsh is the default
git --version
ls -d ~/.hermes 2>/dev/null || echo "no ~/.hermes"
command -v hermes || echo "hermes not on PATH"
```
- If it's already installed, **do NOT delete anything** — report to me first and stop
  - Unless I explicitly said "continue from where it left off," in which case continue without deleting

### 0-1. Prepare Python

The range Hermes requires is **`>=3.11,<3.14`**, and the goal is to have **3.11.x** available.

```bash
python3 --version
command -v python3
ls ~/.hermes/bin/uv 2>/dev/null && ~/.hermes/bin/uv python list
```

**Decision table:**

| Current state | Action |
|---|---|
| No Python | Run "install via uv" below |
| **3.11.x** | ✅ Use as-is |
| 3.12.x / 3.13.x | ✅ Compatible. Fine to leave, or **additionally** install 3.11 via uv to match the reference |
| 3.10 or lower | ❌ Insufficient. **Additionally** install 3.11 via uv (leave the existing one alone) |
| 3.14 or higher | ❌ Out of supported range. **Additionally** install 3.11 via uv (leave the existing one alone) |

**Install via uv (recommended · no sudo needed):**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.11
uv python find 3.11
```

**⚠️ macOS-specific traps:**
- 🚫 **Do NOT touch or delete `/usr/bin/python3` (the one that comes with Xcode Command Line Tools).**
  The system uses it.
- 🚫 Do NOT upgrade/downgrade Homebrew python to align versions — it breaks other brew packages.
  The Python uv installs is isolated in its own path, and Hermes only uses it inside its own venv.
- ℹ️ It's normal for the `python` command (without the 3) to not exist at all on macOS. Only look at `python3`.
- ℹ️ In fact `install.sh` handles installing uv and provisioning Python 3.11 on its own
  (`install.sh:59` `PYTHON_VERSION="3.11"`). This step exists **to check in advance and to fix
  things by hand if it fails.** If you already have 3.11–3.13, go straight to step 1.

### 0-2. Prepare ripgrep / Homebrew

**The decisive difference from the Windows version**: on macOS, `install.sh` installs ripgrep
**automatically via Homebrew** (`scripts/install.sh:1070-1081`). So as long as brew exists, you don't
have to do anything.

```bash
command -v rg && rg --version
command -v brew && brew --version
```

| State | Action |
|---|---|
| `rg` present | ✅ Do nothing |
| `rg` absent, `brew` present | ✅ install.sh in step 1 will install it. Move on |
| `rg` absent, `brew` absent | ⚠️ See below — **do NOT install Homebrew yourself** |

- 🚫 **Do NOT run the Homebrew install command yourself.** It prompts interactively for a `sudo`
  password and your shell can't provide input, so it will just hang. In that case tell me this and move on:
  > "Homebrew is not installed. Please run the following yourself in a terminal:
  >  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  >  then `brew install ripgrep`, and I'll continue from there."
- If brew already exists, `brew install ripgrep` is non-interactive and you may run it yourself.

### 1. Install

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh
```

- If it asks about provider/model during install, pick **NVIDIA**. The model gets pinned precisely
  via CLI later, so any choice is fine here.
- Because of the `| sh` pipe, stdin isn't a TTY, so interactive prompts will most likely fall through
  to defaults. If it stops mid-way waiting for input, **kill it and report to me.** Do not improvise.

**⚠️ If YOU (the agent) are running this — easy place to go down the wrong path:**
The install script appends PATH entries to `~/.zshrc` / `~/.zprofile` (`install.sh:1827-1832`).
Your shell won't re-read those, so right after installation `hermes` is **command-not-found. That is
not a failure.**
**Create a full-path variable and use it for every later step:**

```bash
HERMES=~/.hermes/hermes-agent/venv/bin/hermes
"$HERMES" --version
```

- Everywhere later in this file that says `hermes ...`, run `"$HERMES" ...` instead.
- 🚫 Do NOT reinstall just because PATH didn't resolve. Try the full path first.
- ℹ️ `source ~/.zshrc` may fail or have side effects if your shell is bash/sh. The full path is safer.

### 2. Verify the install
```bash
HERMES=~/.hermes/hermes-agent/venv/bin/hermes
"$HERMES" --version          # confirm v0.19.1+, Install method: git, Python: 3.11.x
"$HERMES" config path        # must be ~/.hermes/config.yaml
```
- Make sure the `Python:` line says **3.11.x**. If it's 3.10 or lower, or 3.14 or higher, go back to
  0-1, install 3.11, and reinstall.

### 3. Configure the API key

Make the `NVIDIA_API_KEY` line in `~/.hermes/.env` hold the real key. If it's commented out (`#`),
uncomment it; if it's absent, append it as a new line.

🚫 **Do NOT write a placeholder literally.** If you couldn't get the key, **write nothing and leave
it empty** — a fake value makes `auth list` / `doctor` wrongly report "key present" and then fail
only at the API call, which makes the cause much harder to find.

- The key is a **70-character** string starting with `nvapi-`. For security it is not written in this file.
- **Key acquisition order (in this order. Asking me is the LAST resort)**:
  1. If I pasted `nvapi-...` **in the same message** as this prompt, use that.
  2. If not, **look for it yourself first — the NVIDIA key currently running you (opencode) is the key to reuse.**
     ```bash
     # if opencode is authenticated with nvidia, it's here
     A="$HOME/.local/share/opencode/auth.json"
     [ -f "$A" ] && python3 -c "import json,sys;print(*json.load(open(sys.argv[1])).keys())" "$A"   # just check nvidia exists
     python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['nvidia']['key'],end='')" "$A" | pbcopy   # to clipboard, never to screen
     ```
  3. If you couldn't find it above, then ask me. **Do not print the key to screen/logs** — just ask.
- 📌 **Stopping here because the key is missing is correct behavior** (not a failure). But before
  stopping, **finish every remaining step that doesn't need the key (0-2, 4, 5) first** and ask me
  exactly once at the end. The only check that cannot pass without the key is
  `◆ API Connectivity → ✓ NVIDIA NIM` in step 6.

**How to write `.env` (handles an existing commented-out line too):**
```bash
ENV="$HOME/.hermes/.env"
KEY='nvapi-YOUR-KEY-HERE'
if grep -qE '^[[:space:]]*#?[[:space:]]*NVIDIA_API_KEY[[:space:]]*=' "$ENV"; then
  sed -i '' -E "s|^[[:space:]]*#?[[:space:]]*NVIDIA_API_KEY[[:space:]]*=.*|NVIDIA_API_KEY=$KEY|" "$ENV"
else
  printf '\nNVIDIA_API_KEY=%s\n' "$KEY" >> "$ENV"
fi
grep -c '^NVIDIA_API_KEY=' "$ENV"      # must be 1 (0 or 2 means something went wrong)
```
- ⚠️ **macOS `sed` is the BSD variant, so `-i` requires an empty argument `''` after it.** Using GNU
  syntax (`sed -i`) makes it consume the next argument as a backup suffix and misbehave. Use the
  command above verbatim.
- **Do NOT touch `auth.json` by hand.** Hermes generates it by reading `.env`, and it contains a key
  fingerprint — hand-writing it corrupts it.

### 4. Configure model / provider
Skip the interactive wizard (`hermes model`) and pin it exactly with these 3 lines:

```bash
"$HERMES" config set model.provider nvidia
"$HERMES" config set model.default nvidia/nemotron-3-ultra-550b-a55b
"$HERMES" config set model.base_url https://integrate.api.nvidia.com/v1
```

Verify:
```bash
"$HERMES" config get model.provider   # nvidia
"$HERMES" config get model.default    # nvidia/nemotron-3-ultra-550b-a55b
"$HERMES" auth list                   # exactly 1 nvidia credential with source=env:NVIDIA_API_KEY
```

### 5. Node.js / TUI — verification is mandatory

On macOS the Hermes-managed Node is at **`~/.hermes/node/bin/node`**
(Windows uses `hermes\node\node.exe` — different layout. `hermes_constants.py:285-301`).
`install.sh` **automatically downloads and installs** managed Node 22 LTS when the system node is
insufficient (`install.sh:823`), so it breaks less often than on Windows. **Still, always verify.**

**5-1. Run this and show me the output:**
```bash
~/.hermes/node/bin/node -v 2>/dev/null || echo "no managed Node"
echo "HERMES_NODE=${HERMES_NODE:-(unset)}"
command -v node && node -v          # system node — for reference only. Never touch it
```

**5-2. Decision:**

| `~/.hermes/node/bin/node -v` | Action |
|---|---|
| **v22.22.0 or newer** | ✅ Pass |
| v22.12 – v22.21 | ⚠️ Replacement in 5-3 recommended (the TUI dependency needs a higher version — trap verified on Windows) |
| Missing, but system node is v22.12+ | ✅ Can pass. That's the case where install.sh used the system node (`install.sh:808`) |
| Missing, and system node is too old/absent | ❌ Proceed to 5-3 |

**5-3. Manual replacement (only if ⚠️/❌ above):**
```bash
VER=v22.23.2                                    # same version as the reference laptop
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

~/.hermes/node/bin/node -v                      # v22.23.2 means success
ls ~/.hermes/node/bin                           # node / npm / npx should be visible
```
- ℹ️ The tarball already contains `bin/`, so moving the whole folder to `~/.hermes/node` produces
  exactly the `~/.hermes/node/bin/node` layout (same approach as `install.sh:927`).
- The URL format is verified (`darwin-arm64` 47.7MB / `darwin-x64` 48.9MB, both HTTP 200).
- To pin `HERMES_NODE` (Hermes prefers this variable when launching the TUI):
  ```bash
  echo 'export HERMES_NODE="$HOME/.hermes/node/bin/node"' >> ~/.zshrc
  ```
- 🚫 **Never touch the system Node / nvm.** No `nvm install` / `nvm use` / `brew upgrade node`.
  That's an area I manage myself. Hermes's dedicated Node must stay completely separate.
- If the download is blocked (corporate network/firewall), do NOT work around it — report to me.

### 6. Final verification — **run all of this and show me the actual output**

```bash
"$HERMES" doctor
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
> - "Config version outdated (v0 → v33)" ← **appears on the reference laptop too.** `config.yaml` has
>   no `version` key, so doctor infers v0. No functional impact. Running `doctor --fix` once is fine,
>   and leaving it is fine (both normal).

> 🚫 Conversely, the items below are real defects to fix. Don't wave them through.
> - **`ripgrep not found`** → step 0-2. With brew present, `brew install ripgrep`; without it, hand it to me.
> - **`Node.js` below v22.12** → go back to step 5.
> - **`✗ NVIDIA API key not configured`** → step 3. The only true blocker, and adding the key fixes it.

Then two real functional tests:
```bash
"$HERMES" -z "What is 2 + 2? Answer with the number only."
"$HERMES" -z "List the files in the current working directory using the file tool and tell me only the file count."
```
- The first checks LLM responses; the second checks **tool-calling** (this one really matters)

Finally, TUI verification — 🚫 **do NOT run `hermes --tui` yourself.**
It's an interactive full-screen app, so in your non-interactive shell it can't receive input and will
hang until timeout. **Do these two things instead:**

**(1) You only verify the build artifacts (non-interactive, safe):**
```bash
ROOT="$HOME/.hermes/hermes-agent"
ls -la "$ROOT/ui-tui/dist/entry.js"                                  # must exist (≈3.6MB on the reference laptop)
python3 -c "import json;print(json.load(open('$ROOT/node_modules/react-router/package.json'))['version'])"
```
- If `entry.js` is **missing** or `react-router` is absent → npm install failed silently.
  **Go back to step 5, replace Node, and reinstall.**
- Note: `react-router` is **hoisted to the root `hermes-agent/node_modules`**, not
  `ui-tui/node_modules`. `ui-tui/node_modules` being absent is the same on the reference laptop, so
  that's normal (reference = react-router 8.3.0).

**(2) Hand the actual on-screen check to me:**
> "Please run `hermes --tui` yourself in a terminal. If the screen comes up it's a success, and you
> can quit right away."
Tell me that and finish. Do not try to launch it yourself.

### 7. Report
Summarize and tell me:
1. Installed Hermes version + install method + **Python version** (before → after)
2. The full `model:` block of the final `config.yaml`
3. A ✓/⚠ summary of the `hermes doctor` results
4. The actual responses from the two functional tests
5. **Any path that differed from this document** (this document's paths came from source and are not
   yet verified on a real Mac — definitely tell me if they differ)
6. Everything that ended up **different** from the reference spec (don't hide anything)

---

## What NOT to do (important)
- ❌ Do NOT set `provider: custom`. Hermes ships an official `nvidia` provider plugin.
- ❌ Do NOT try to use a Hermes-3 **model**. "Hermes Agent" is the agent framework's name; the LLM is
  an NVIDIA NIM model.
- ❌ **No system Node / nvm / `brew upgrade node`.**
- ❌ **Do NOT delete or change the version of `/usr/bin/python3` (Xcode CLT) or Homebrew python.**
  Only **additionally** install via uv.
- ❌ Do NOT try to move to Python 3.14+ (outside `requires-python = ">=3.11,<3.14"`).
- ❌ Do NOT hand-write `auth.json`.
- ❌ Do NOT install optional-skills, MCP servers, or plugins (the reference laptop has none).
- ❌ Do NOT copy a whole `config.yaml` from elsewhere. Adjust only via `hermes config set`.
- ❌ Do NOT export my API key to logs/commits/anywhere external. (That includes `cat`/`echo` to screen.)
- ❌ **Do NOT run commands that need `sudo`.** They stop at the password prompt. The Homebrew
  installer is the prime example.
- ❌ **Do NOT run interactive (full-screen / input-waiting) commands yourself.** `hermes --tui`, the
  `hermes model` wizard, the Homebrew install script. If something needs running, hand it to me and
  tell me what to run.
- ❌ Do NOT write a placeholder into `.env` literally. If you couldn't get the key, **leave it empty**
  and report.
- ❌ **Do NOT use GNU `sed -i` syntax.** macOS uses BSD sed, which needs the empty argument:
  `sed -i '' ...`.

## Reference: models verified on this NVIDIA account
Tool-calling confirmed working — `deepseek-ai/deepseek-v4-pro`, `nvidia/nemotron-3-ultra-550b-a55b`,
`openai/gpt-oss-120b`, `minimax/minimax-m3`, `z-ai/glm-5.2`
- `z-ai/glm-5.2` takes over 90 seconds to respond — unsuitable for an agent loop
- `moonshotai/kimi-k2.6` returns 404 on this account (not provisioned) — don't pick it

If something goes wrong, do NOT improvise a workaround — first report to me which step failed and
what the error was.
