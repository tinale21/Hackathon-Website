# Checkpoint 06 — Feature cards show the real app, in motion
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome at desktop width, with no console errors.
- The deck swipe and stamp rotation were confirmed over time.
- Voice video autoplay can't be confirmed in Chrome's background test tab, which won't play media. Check it in a normal browser window.

---

## 1. Context

Builds on checkpoint 05. The six About feature cards used still paintings. The user asked for "actual cards from our prototype… the cards that explain the feature", in motion.

**What changed (new `src/components/FeatureArt.jsx`):**

| Feature | What it shows now |
|---|---|
| Prompts, not a blank page | A three-card swipe deck of real prompt cards ("A sound from where you are", "Something that made you smile", "What do you miss from home?"). Every 3.2s the front card flies right with the green ANSWER stamp, and the next one moves up. |
| Show me working | The "Picture your workstation, mess and all" card (Behind the outcome), bobbing gently. |
| Say what you need | The six painted need stamps (Listen, Cheer me on, Advice, Support, Space, Distract me) slide past, each taking a turn in front with its label. |
| Sealed, never a chat | The lilac holo envelope with the Listen stamp in its corner. It floats, its holo blend drifts, and the seal glows. |
| Write back in your voice | The voice tile's looping video (`voice-bg.mp4`, with `voice-wave.webp` as the poster). |
| A semester recap | The Home recap tile's painted scene, with its floating photos and twinkles. |

How the pieces were copied:
- Prompt cards copy the prototype's markup, paint/veil backgrounds, `paintDrift`/`glowDrift` and frosted blur bands. They're laid out at 342 × 500 and scaled to fit with a ResizeObserver.
- `src/components/sceneArt.js` was copied from the Hackathon repo, along with the `pa-*` animations.
- Stamp positions are computed in JS, not with CSS `abs()`, which not every browser supports yet.
- The voice video's `muted` is set through a ref, as in the prototype, so phones allow autoplay.
- With reduced motion on, the timers don't run and the CSS animations are switched off.

**Assets:**
- Added to `public/media/`: 4 prompt `.webp` files, 6 stamp `.jpg` files and `voice-bg.mp4` (2 MB). They're the team's own app art, not listed in the prototype's `CREDITS.md`.
- Removed 7 paintings that are no longer used.
- `public/media/` is now 2.5 MB.

---

## 2. Human Directions

1. "for this section can you use like actual cards from our prototype rather than these images (the cards that explain the feature its talking about). if you could also make those motion that would be great"

---

## 3. Records of Resistance

- **Prompt cards too big:** the first pass overflowed the art boxes, cutting off the deck's back cards and the workstation card's top. Fix: the deck was scaled to 70% of the box height and lifted by half the stack offset, and the single card to 80%.

---

## 4. Successes

- In one 3.6s window, the deck's front card changed from "What do you miss from home?" to "A sound from where you are", and the front stamp changed from Support to Distract me.
