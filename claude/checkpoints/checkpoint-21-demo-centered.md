# Checkpoint 21 — Demo phone centered with the left column
**Date:** 2026-10-21
**Branch:** main
**Status:** Measured in Chrome.

---

## 1. Context

Builds on checkpoint 20. Once the step descriptions were removed, the left column (heading, steps, buttons) got shorter than the phone. Both were top-aligned, so the column sat high next to the phone.

**What changed:**
- `.demo` grid: `align-items: start` → `center`. The phone and the left column now share a vertical center.
- On narrow screens nothing changes, because the layout already stacks.

---

## 2. Human Directions

1. "can you make the iphone centered to the left side section", with a screenshot of the Demo section.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- At 1728px, the left column's center and the phone's center were both 481px from the top of the viewport.
