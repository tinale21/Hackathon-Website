# Checkpoint 01 — Repo setup
**Date:** 2026-10-21
**Branch:** main
**Status:** Scaffold only. The page is a placeholder until the site's purpose is decided.

---

## 1. Context

The Hackathon-Website repo was created empty on GitHub on 2026-10-21 and cloned to `~/Documents/GitHub/Hackathon-Website`. This is a separate repo from `Hackathon` (the Letters prototype).

**What was added:**
- A Vite 5 + React 18 scaffold (`index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css`).
- `vite.config.js` with `base: '/Hackathon-Website/'` so assets load on GitHub Pages.
- `.github/workflows/deploy.yml`, `LICENSE` (CC0), `.gitignore` and `.gitattributes`, all copied from `Hackathon`.
- A README with the standard sections, filled with TBD for now.
- The `claude/` folders: `checkpoints/`, `docs/` and `figma-screens/`.

---

## 2. Human Directions

1. "I want to work on my Hackathon Website repo"
2. "it not the hackathon one, there should be one called hackathon website (i just made it)"
3. "yes" (to setting it up like the other SCAD repos)

---

## 3. Records of Resistance

- None. At first Claude opened the wrong repo (`Hackathon`). The user corrected it, and Claude found the new repo on GitHub.

---

## 4. Successes

- `npm run build` succeeds, and the repo matches the shape of the other SCAD projects.
