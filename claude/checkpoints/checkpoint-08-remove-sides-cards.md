# Checkpoint 08 — Remove the student/parent cards
**Date:** 2026-10-21
**Branch:** main
**Status:** Removed. Builds cleanly.

---

## 1. Context

Builds on checkpoint 07. The About section had a row of three cards between the intro and the feature cards:
- "The student" (sees / hides)
- "The parent" (sees / hides)
- The blue belief card ("Emotional connection needs the process…")

**What changed:**
- The `sides` block is gone from `About` in `src/App.jsx`.
- Its `.side` and `.sides` CSS is gone, including the narrow-screen rules.
- The intro paragraph still covers the problem.

---

## 2. Human Directions

1. "can you remove this", with a screenshot of the three cards.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The About section now goes straight from the intro to the six feature cards.
