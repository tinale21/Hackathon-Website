# Checkpoint 24 — Intro: a sealed letter for the visitor
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome: welcome → letter → color pick → Break the seal → site; Skip intro; no replay on reload.
- No console errors.

---

## 1. Context

Builds on checkpoint 23. The user wanted an intro screen like meganyap.me's, "with the brand of Lumen".

**The reference:** a dark starfield welcome ("Welcome to / Megan's World", Explore, Skip intro, a tagline with bold words, a live clock). Explore leads to a visitor ID card the visitor names and colors, then Enter.

**The Lumen version (new `src/components/Intro.jsx`):** the visitor card becomes a sealed Lumen letter.
- **Welcome:**
  - Desk-grey background with drifting lilac and peach glows, and 42 pastel sparkles that rise and twinkle (the starfield, in Lumen colors).
  - "WELCOME TO" above a large Lumen lockup, an "Open your letter →" pill and "Skip intro".
  - Tagline: "EVERY WEEK HAS A MIDDLE. **WHY NOT SHARE IT?**"
  - A live clock in the bottom left and "SVSD DESIGN SPRINT 2026" in the bottom right.
- **Letter:**
  - "A LETTER FOR YOU" and a short line on how Lumen letters arrive sealed.
  - A "To" name field (stays on the page and is never sent anywhere).
  - The holo envelope, which shows "For {name}" and "From the Lumen team · {date}" with the Listen stamp.
  - The app's six envelope colors as swatches, and Break the seal / ← Back.
- **Break the seal:** the seal pops, the envelope lifts and fades, and the intro fades and scales away.
  - The Hero is keyed on the intro, so its entrance animation plays as the site appears.
- **Rules:**
  - Plays once per browser session (`sessionStorage`).
  - Skipped when landing directly on `#/gallery`.
  - Locks page scroll while open.
  - With reduced motion on, it closes instantly.
- **Shared code:** `holo()` is now exported from `FeatureArt.jsx` and reused for the envelope.

---

## 2. Human Directions

1. "can you also add like an introduction loading screen into the site kind of like how this site does it: https://meganyap.me/ (made it make sense and with the brand of Lumen though)"

---

## 3. Records of Resistance

- **Visibility:** the first pass's pastel sparkles and glows nearly vanished on the light background. They were made bigger and more saturated, with a soft glow, and the background glows were brought up to 90% opacity.
- **Not copied:** the reference's dark theme and its separate visitor gallery. Lumen's identity is light, and the visitor's name stays on the page.

---

## 4. Successes

- The intro tells the product's story before the site does: you receive a sealed letter and open it.
