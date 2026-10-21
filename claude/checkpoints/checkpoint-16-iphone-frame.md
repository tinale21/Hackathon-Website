# Checkpoint 16 — iPhone frame around the demo
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome on the splash and the Recap book screens.
- The Dynamic Island sits in the status strip and covers no app controls.

---

## 1. Context

Builds on checkpoint 15. The Demo showed the prototype in a plain white rounded rectangle. The user asked for an iPhone outline.

**What changed:**
- **`src/App.jsx`:** the iframe now sits in a `.device-screen` inside the `.device` frame, with four side-button spans and a Dynamic Island span. The ResizeObserver now measures the screen, not the frame, so the 390 × 844 prototype still scales to fit exactly.
- **`src/styles.css`:**
  - **Bezel:** 11px dark (`#1c1c20`) with a silver rim (layered box-shadows).
  - **Corners:** 60px outside, 49px on the screen.
  - **Dynamic Island:** a black pill, 31% wide, near the top.
  - **Side buttons:** action, volume up and down on the left, power on the right.
  - **Sizing:** the frame is capped at 412px and by the window height, so the whole phone stays on screen.
  - **Phones:** a thinner 9px bezel and smaller corners.

**Noticed, not changed (Hackathon repo):** at phone width the prototype is meant to hide its fake status bar. `.status svg { display: block }` comes later and outranks `.status > * { display: none }`, so the signal and battery icons show on the left with no time. The fix is in the Hackathon repo, so it was left for the user to decide.

---

## 2. Human Directions

1. "can you add a iphone outline to this", with a screenshot of the Demo's phone.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The demo now reads as an iPhone on the page, and taps still reach the prototype.
