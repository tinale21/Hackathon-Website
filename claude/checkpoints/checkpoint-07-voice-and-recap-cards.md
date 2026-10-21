# Checkpoint 07 — Voice recorder and Recap cover cards
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome, with no console errors.
- The recorder's timer counted up during a pretend recording and then reset.

---

## 1. Context

Builds on checkpoint 06. The user picked different prototype screens for two of the feature cards.

**What changed (`src/components/FeatureArt.jsx`, `src/styles.css`):**
- **Write back in your voice:** now shows the recorder from the Capture screen (`VoiceOrb` in `Create.jsx`).
  - The layout is the same: a grey panel, the soft three-layer holo orb, the 0:00 timer and the black mic button.
  - It loops a pretend recording: idle for 2.2s, then 6.5s of "recording", then back.
  - While recording, the timer counts up in red with the blinking dot, the mic turns into a stop square, and the orb and halos move with the prototype's speech-like level.
  - The orb uses the "slice of your day" prompt's green and pink, as in the user's screenshot.
- **A semester recap:** now shows the Recap book cover (`Receive.jsx`).
  - Green haze background with drifting glows, "FALL 2026", "Your fall, in letters" sliding up line by line, and three postage-stamp photos dropping in.
  - The stats line reads "9 letters · 8 photos · 1 voice note". It uses the singular "note", where the prototype's live count says "1 voice notes".
  - The entrance replays every 7s.
- `useFit` now takes a base height, so each piece scales from its own layout size.

**Assets:**
- Added `mom-changi.webp`, `me-six-flags.webp` and `mom-albania-still.webp`.
- Removed `voice-bg.mp4`, `voice-wave.webp` and `src/components/sceneArt.js` (plus its `pa-*` CSS), which are no longer used.

---

## 2. Human Directions

1. "for the Write back in your voice use:", with a screenshot of the voice recorder (orb, 0:00, mic button).
2. "for the A semester recap use this:", with a screenshot of the Recap book cover.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- Both cards match their screens in the prototype and fit their art boxes.
- With reduced motion on, they settle on their resting states.
