# Checkpoint 27 — Centered lockup, and a letter that *is* the homepage
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome. The intro was held at the fully expanded letter and compared with the real page underneath: header, headline, text and buttons in identical positions, photo rings synced to the same animation time.
- Ends at scroll 0 even when reloaded mid-page. No console errors.

---

## 1. Context

Builds on checkpoint 26. Feedback: "for the logo and lumen text it doesn't seem like it is centered between the two", and "instead of the share the middle.. text on the letter make it like the homepage that then transitions into the site so it looks smooth".

**What changed:**

**Lockup alignment (`src/components/LumenMark.jsx`):**
- `Lockup` now runs `fitLockup`, ported from the app's splash (`Onboarding.jsx`).
  - It measures the "lumen" letters (baseline to the top of the "l") with canvas text metrics and moves the word so its middle sits on the mark's center line.
  - It runs again once fonts load, and still works while the lockup is scaled by an animation.
- `Lockup` takes `wordSize` and `gap`, so the intro uses the same component (44px mark, 64px word).
- The header logo gets the same alignment.
- In the intro, the mark's spin now runs on its inner `<g>`, so the measurement isn't thrown off by a rotated bounding box.
- **Result:** mark center and text center are within 2px, down from about 8px off.

**Homepage letter (`src/components/Intro.jsx`, `src/App.jsx`, intro CSS):**
- App passes `preview` (a static `Header` and `Hero`, with no handlers and no `#top` id) into the intro.
- The letter is a 100vw × 100vh page scaled by `k` (fit to 88% of the envelope's width and 84% of its height) and placed inside the envelope.
  - The flap opens, and it slides up with its bottom tucked in the pocket.
  - On expand, it moves to `translate(-left, -top) scale(1)`, exactly filling the window, and the envelope falls away.
- The envelope's window offset is computed from the centered layout, `(vw - ew) / 2`. Measuring the element mid-animation had been 16px and 50px off.
- Just before the expand, the letter's photo ring copies the real ring's `currentTime`, so the photos don't jump at the swap.
- The intro background stays solid until the letter covers the window, so the page never shows through twice.
- The real Hero no longer remounts when the intro ends, so nothing replays at the swap.
- **Scroll:** while the intro plays, `history.scrollRestoration = 'manual'`, and it scrolls to the top at the start and at the expand. A reload had been restoring an old scroll offset under the intro (42px, then 14px), which made the letter land off-target.

---

## 2. Human Directions

1. "it getting there. first of all for the logo and lumen text it doesn't seem like it is centered between the two."
2. "also for the letter, instead of the share the middle.. text on the letter make it like the homepage that then transitions into the site so it looks smooth"

---

## 3. Records of Resistance

- **Expand overshoot:** the letter overshot by about 700px horizontally. The envelope's rect was being read during render, while it was still settling. Fixed by computing the offset from the centered layout.
- **Content 30px low:** traced to the browser restoring the scroll under the intro, not to layout. Fixed with manual scroll restoration and a reset to the top.
- **Testing in a background tab:** Chrome pauses CSS transitions and animations there, so timing samples were unreliable. The check instead held the intro at the expand beat temporarily and compared screenshots with the intro visible and hidden. The temporary changes were reverted, and a diff against the saved copy showed only the intended fixes.

---

## 4. Successes

- Opening the letter now *is* arriving on the site: the miniature homepage grows into the real one with no visible cut.
