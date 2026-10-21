# Checkpoint 02 — Judges' site: About, Gallery, Demo
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Built and checked in Chrome at desktop width and at 400px. No horizontal scroll, and no console errors after the build.
- The gallery has placeholder cards until the films are done.

---

## 1. Context

This site goes to the judges, and it pairs with the `Hackathon` repo (the Lumen app). The reference was bepresents.org: a single scrolling page with a hero, a feature list, an embedded demo and a footer.

**What changed:**
- **Hero:** the eight splash photos sit in the same ring as the Lumen mark and turn slowly around the "lumen" wordmark. The headline is "Share the middle of the story."
- **About Lumen:** the problem and belief from the PRD, a student/parent "sees vs hides" pair, six feature cards with the app's painted art, and three principles (explains, never defends; student comfort first; nobody can demand a letter).
- **Gallery:** cards come from `src/videos.js`. YouTube, Vimeo and local `.mp4` files all work. A lightbox plays the video, and Esc closes it. Placeholder cards read "Coming soon".
- **Demo:** the live prototype (`tinale21.github.io/Hackathon/`) is embedded in a phone frame. It renders at 390 × 844 and is scaled to fit, and the frame is sticky beside five jump-to-screen steps. Steps change only the prototype's hash, so it moves screens without reloading. There are also Start over and Open full screen buttons.
- **Style:** tokens copied from the app's `styles.css`: Newsreader and Geist, `--desk` grey, white cards, black pills and pastel gradients.
- **Assets:** 8 splash photos and 8 painted `.webp` images copied into `public/media/` (about 0.9 MB).
- **README:** how to add videos, for the teammate making the gallery.

**Not done:**
- Real videos.
- A team or credits section (names not given yet).
- The README's design sections are still TBD.

---

## 2. Human Directions

1. "this website does pair with my hackathon repo… a video gallery (my friend is making it), About Lumen, and Demo (the prototype of it). This website is what we are giving to judges."
2. Reference: https://bepresents.org/#top. Prototype artifact: https://claude.ai/artifact/1nnWfTKHAN6M3XC7ehygd1
3. "you will have to build a page for it so she can put it in there. Please use the same style and design guidelines as our app Lumen"

---

## 3. Records of Resistance

- **Embedding the prototype:**
  - The claude.ai artifact link can't be framed.
  - The artifact is the same build as the Hackathon repo's GitHub Pages site, so the demo embeds that instead. Updates to the app show up on this site automatically.
- **Demo layout:**
  - At first, the phone sat under the section heading and its tab bar was cut off on a laptop screen.
  - Fix: the heading moved into the left column, and the phone height is capped to the window.

---

## 4. Successes

- Jumping to "Open a letter" moved the embedded prototype to the New mail screen without a reload.
- The phone layout stacks heading, phone, then steps.
