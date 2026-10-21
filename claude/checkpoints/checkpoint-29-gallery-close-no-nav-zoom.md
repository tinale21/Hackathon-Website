# Checkpoint 29 — Closing the gallery doesn't zoom the nav text
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome. Opening from the nav and closing named no home-page element.
- Opening from the preview card and closing still shrinks into the card, with no names left over.
- No console errors.

---

## 1. Context

Builds on checkpoint 28. Closing the Video Gallery shrank the full page back into whatever had opened it. When that was the nav link, the page collapsed into the small "Video Gallery" text, which looked like the text zooming out.

**What changed (`src/App.jsx`):**
- On close, only the home page's gallery preview card (`.gallery-frame`) gets `view-transition-name: gallery`, and only when it's what was clicked.
- Opened from the nav link or the hero button, closing is a plain cross-fade back to the page.
- Opening still expands from whatever was clicked.

---

## 2. Human Directions

1. "now when users click on video gallery on the nav and then close, the text for video gallery on the nav shouldn't zoom out"

---

## 3. Records of Resistance

- None. The hero button gets the same treatment as the nav link, since a full page collapsing into a button would look the same.

---

## 4. Successes

- Closing from the nav returns smoothly, with the nav untouched.
