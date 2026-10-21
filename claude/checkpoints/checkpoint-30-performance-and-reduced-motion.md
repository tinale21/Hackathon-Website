# Checkpoint 30 — Faster graphics, and reduced motion
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome. At the top of the page the demo prototype isn't requested; it starts loading once the Demo is about a screen away.
- With every animation and transition forced off, all six feature cards, the hero, demo and team still show their content. The only hidden elements are the off-row stamps, as designed.

---

## 1. Context

Builds on checkpoint 29. The user asked to "make sure like graphics look in as fast as possible and the site works even for those with reduce motion preferences".

**Speed:**
- **Images:** resized to about 2× their displayed size, for sharp Retina screens. `public/media` went from about 1.2 MB to 412 KB.

  | Images | Before | After |
  |---|---|---|
  | Hero ring photos | 300×420 | 150×210 (~12 KB each) |
  | Stamps | 420px | 200px |
  | Desk photo | 900×1200, 256 KB | 480×640, 76 KB |
  | Recap postage photos (were WebP, now JPEG) | up to 1170px, 162 KB | 300px long side, 17–30 KB |
  | Prompt card paintings (were WebP, now JPEG) | 928×1232 | 450×600, 25–34 KB |

  The macOS `sips` tool can't write WebP, so those became JPEGs.
- **Hero photos:** `index.html` preloads the 8 ring photos, the first thing on screen and on the intro's letter.
- **Demo prototype** (the heaviest thing on the page: the whole app and its videos): the iframe gets its `src` only when an IntersectionObserver sees the Demo within one screen height.
- **Lazy images:** stamps, postage and team photos use `loading="lazy" decoding="async"`. `loading` now comes before `src`, because React 18 sets attributes in order, and a `src` set first starts the download before the browser sees the lazy flag.
- **Gallery preview iframe:** lazy, once connected.
- **Desk photo:** preloaded when the camera card first appears, so it doesn't pop in blank on the first shutter.

**Reduced motion:**
- **Intro:** never mounts. It used to mount and close itself, which could flash for a frame.
- **Gallery transitions:** were already instant.
- **"Show me working":** holds on the taken photo with Retake / Use photo, the frame that tells the story, instead of an empty camera view.
- **The other cards:** already hold a sensible still (one prompt card, the front stamp, the sealed envelope, the idle recorder, the recap cover), and their timers don't run.
- **CSS:** the global reduced-motion rule turns off every animation and transition. All end states are each element's base style, so nothing is stuck invisible.

---

## 2. Human Directions

1. "can you make sure like graphics look in as fast as possible and the site works even for those with reduce motion preferences"

---

## 3. Records of Resistance

- **Lazy loading wasn't working:** the first measurement showed every image and the demo requested at page load. Traced to React 18's attribute order, and the demo was moved to an IntersectionObserver.
- **Testing limits:** in Chrome's hidden background tab, IntersectionObserver callbacks and lazy loading don't behave as they do in a visible tab. Results were confirmed after bringing the tab forward.

---

## 4. Successes

- The first screen needs only the page code, fonts and about 100 KB of hero photos. Everything heavier waits until it's needed.
