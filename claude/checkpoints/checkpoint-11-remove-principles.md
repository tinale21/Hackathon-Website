# Checkpoint 11 — Remove the principles row
**Date:** 2026-10-21
**Branch:** main
**Status:** Removed. Builds cleanly.

---

## 1. Context

Builds on checkpoint 10. The About section ended with a row of three principles under a divider:
- Explains, never defends
- Student comfort first
- Nobody can demand a letter

**What changed:**
- The `PRINCIPLES` data and the `principles` block are gone from `src/App.jsx`.
- The `.principles` CSS is gone, including the narrow-screen rules.
- About now ends with the six feature cards.

---

## 2. Human Directions

1. "can you remove this", with a screenshot of the principles row.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- No leftover references, and the build passes.
