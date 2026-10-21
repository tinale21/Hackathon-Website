# Checkpoint 33 — Ready to run inside an artifact
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome: the nav link, Close, the browser's Back button, and a direct `#/gallery` link closed with no history entry all open and close the gallery correctly.
- No console errors.

---

## 1. Context

Builds on checkpoint 32. The user asked for a claude.ai artifact of the site. The artifact viewer can't embed other sites, which rules out the GitHub Pages prototype, and it may block history changes. Two small changes let the same code run there.

**What changed (`src/App.jsx`):**
- **Demo address:**
  - `DEMO` reads `VITE_DEMO_URL` when a build sets it, and still defaults to the GitHub Pages prototype.
  - It's resolved to an absolute URL against `document.baseURI`, so the jump-to-screen `location.replace` works when the prototype is bundled at a relative path.
- **Gallery history:**
  - `pushState` and `replaceState` are wrapped in try/catch.
  - A new `goHome()` does the close transition directly. The Close button calls it when there's no history entry to go back to, and the hashchange handler calls it for the Back button. The gallery no longer depends on a history change to close.

---

## 2. Human Directions

1. "can you give me the artifact for this site"

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The live site behaves as before, and the same code can be bundled with its own copy of the prototype.
