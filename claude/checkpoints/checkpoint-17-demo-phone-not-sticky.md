# Checkpoint 17 — Demo phone no longer sticks while scrolling
**Date:** 2026-10-21
**Branch:** main
**Status:** Fixed and measured in Chrome.

---

## 1. Context

Builds on checkpoint 16. The demo phone was `position: sticky; top: 88px`, so it pinned under the header and slid against the steps column as you scrolled. Scrolling back up, it "oddly moves up a bit". The phone is about as tall as the steps column, so sticky added nothing but that shift.

**What changed:**
- `.device` is now `position: relative`. It scrolls with the section like everything else.

---

## 2. Human Directions

1. "it like oddly moves up a bit when you scroll back up"

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The phone's offset from the top of the Demo section stayed at 96px at every scroll position, down and back up.
