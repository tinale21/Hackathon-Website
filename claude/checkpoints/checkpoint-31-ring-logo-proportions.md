# Checkpoint 31 — Hero photo ring spaced like the Lumen mark
**Date:** 2026-10-21
**Branch:** main
**Status:** Checked in Chrome.

---

## 1. Context

Builds on checkpoint 30. The user wanted more space between the hero's photo cards, "so it looks more like the logo".

**The logo's geometry (`LumenMark`):** each petal is 7.71 × 10.80 at a radius of 21.6. That makes petal width 0.357× the radius and petal height 0.5× the radius. The ring had width ≈ 0.48× the radius, so its cards nearly touched.

**What changed (`.petal` in `src/styles.css`):**
- **Width:** 17% → 13.8% of the ring box.
- **Aspect ratio:** now exactly 7.71 / 10.8.
- **Radius:** `translateY(-150%)` → `-200%`, so the radius is 2× the petal height, as in the mark. That's 38.7% of the box, a little wider than before, and still inside it.
- **Corners:** the logo's rounding, `23% / 16.7%`.

---

## 2. Human Directions

1. "can you add more spacing between the photo cards just so it looks more like the logo", with a screenshot of the ring.

---

## 3. Records of Resistance

- None.

---

## 4. Successes

- The ring and the header mark now read as the same shape at two sizes.
