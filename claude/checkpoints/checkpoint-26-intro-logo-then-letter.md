# Checkpoint 26 — Intro: Lumen logo, then a letter that opens into the site
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Each envelope stage was checked as a frozen still in Chrome.
- The real-time run finished cleanly with no console errors.

---

## 1. Context

Builds on checkpoint 25. The interactive intro (welcome screen, name field, color swatches, buttons) was more than wanted. The user asked for something simpler: "just make the intro like the lumen logo and text and then a letter that opens into the site".

**What changed (`src/components/Intro.jsx` rewritten, intro CSS replaced):** it now plays on its own, in about 4.6s.

| Time | Beat |
|---|---|
| 0s | The Lumen lockup blurs in, and the mark spins into place. Lilac and peach glows drift behind it. |
| 1.4s | The lockup lifts and blurs away. |
| 1.8s | A sealed lilac holo envelope drops in. It's built from layers: back, letter, front pocket, flap, seal. |
| 2.7s | The seal pops, and the flap folds open (`rotateX(180deg)`, then moves behind the letter). |
| 3.2s | The letter, "Share the middle of the story." with the Lumen mark, slides up. Its bottom stays tucked in the pocket. |
| 3.9s | The envelope falls away. The letter grows 9× and fades while the intro background clears, so the site shows through. |
| 4.6s | Done. The hero, keyed on the intro, plays its entrance. |

- **Skipping:** a click anywhere or any key skips it. "Click anywhere to skip" sits at the bottom.
- **Kept from before:** plays once per browser session, never on `#/gallery`, and closes instantly with reduced motion on.
- **Removed:** the welcome text and buttons, the tagline, the clock, the name field and the color swatches.

---

## 2. Human Directions

1. "can you just make the intro like the lumen logo and text and then a letter that opens into the site"

---

## 3. Records of Resistance

- **Overlap:** the logo was still fading out when the envelope arrived. A separate `out` beat was added, so the envelope enters after the logo has gone.
- **Letter layering:** the rising letter first jumped in front of the pocket. It now stays tucked until it expands.
- **Testing:** stage timings were reviewed by temporarily slowing the sequence 5× and by freezing each stage. The 5× change was reverted, and the file was confirmed identical to the intended version.

---

## 4. Successes

- The intro is the product in miniature: a sealed letter opens, and what's inside is the site.
