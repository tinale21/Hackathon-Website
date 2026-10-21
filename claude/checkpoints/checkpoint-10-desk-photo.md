# Checkpoint 10 — Real work-in-progress photo for "Show me working"
**Date:** 2026-10-21
**Branch:** main
**Status:** Photo swapped and checked in Chrome.

---

## 1. Context

Builds on checkpoint 09. The Capture card's "taken" photo was Audrey's art box, which didn't say "showing the work" clearly. The user gave a photo of the team's actual hackathon desk: a water cup, a Pringles can, a tangle toy, and a laptop with the Lumen site open.

**What changed:**
- **New `public/media/desk-working.jpg`** (900 × 1200, 256 KB), exported from the iPhone original with a small Swift/CoreImage script:
  - The photo's rotation was applied, since the first `sips` pass came out sideways.
  - It was scaled down.
  - It was re-encoded with **no metadata**. The original had GPS coordinates and the camera model. The web copy has neither, checked with `sips` and `strings`.
- The camera view crops it with `object-position: 50% 22%`, so the cup, can, toy and laptop all sit in frame.
- `me-artbox.webp` was removed.

---

## 2. Human Directions

1. "for the show me working, can you use this photo instead to make sense", with the desk photo.

---

## 3. Records of Resistance

- **Location data:** the user's photo carried GPS location. It was stripped before the file went into a public repo.

---

## 4. Successes

- The loop now ends on a real "middle of the work" photo.
