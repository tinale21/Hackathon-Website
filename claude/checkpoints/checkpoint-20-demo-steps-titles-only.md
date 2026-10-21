# Checkpoint 20 — Demo steps show titles only
**Date:** 2026-10-21
**Branch:** main
**Status:** Builds cleanly.

---

## 1. Context

Builds on checkpoint 19. Each of the five Demo jump steps had a one-line description under its title. The user asked to remove them.

**What changed:**
- **`src/App.jsx`:** the `text` fields are gone from `STEPS`, and each step button now shows just its number and title: Meet Lumen, Home, Write a letter, Open a letter, The recap.
- **`src/styles.css`:**
  - The step row centers the number with the title.
  - Padding is a little tighter (14px top and bottom).
  - The unused description styles are gone.

---

## 2. Human Directions

1. "can you remove the descriptor for these", with a screenshot of the five Demo steps.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The step list is now a compact menu beside the phone.
