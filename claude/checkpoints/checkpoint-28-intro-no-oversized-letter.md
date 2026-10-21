# Checkpoint 28 — No oversized letter flash in the intro
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome. Holding at the "letter" beat showed a clean sealed envelope, with the letter at its in-pocket position from the very first frame.
- The full run ends at scroll 0. No console errors.

---

## 1. Context

Builds on checkpoint 27. The user's screenshot showed the homepage letter at nearly full window size, half-faded, with the small envelope and the fading "lumen" lockup on top of it.

**Cause:** the letter's position was measured in a layout effect after its first render. For one render it had no transform, so it sat at full size. The transform transition then visibly shrank it into the envelope. The lockup was also still mid-fade when the envelope arrived.

**What changed (`src/components/Intro.jsx`):**
- **New `letterFit()`:** works out the letter's scale, its in-envelope offset and the window offset from the envelope's CSS size (`min(78vw, 320px)` wide, 202:136) before anything renders. It's used as the initial state, so the letter is in the pocket on its first frame, and the measuring effect is gone.
- **Timing:** the envelope enters at 2.0s (was 1.8s), so the lockup has finished fading. Every later beat moves 0.2s; done is now at 5.1s.

---

## 2. Human Directions

1. "ok it getting a lot better but we shouldn't see this part", with a screenshot of the oversized, half-faded letter behind the envelope.

---

## 3. Records of Resistance

- **Testing:**
  - The dev server's file watcher had missed `sed -i` edits, which replace the file. The page kept importing an old version-stamped copy that Chrome had cached. The dev server was restarted, and test edits are now written in place.
  - The first "hold at letter" test removed the later beats, which made the beat check report every beat as reached. The hold was redone by pushing the later beats out to 9e8 ms.
  - The real timing was restored from a saved copy and confirmed on the server.

---

## 4. Successes

- The sequence now reads cleanly: logo, then an empty sealed envelope, then the letter rising and growing into the site.
