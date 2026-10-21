# Checkpoint 32 — Demo steps follow the phone; team cards come alive on hover
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome, with the website pointed at a local build of the updated prototype.
  - Steps followed Home, Capture, Read, Recap and an onboarding question.
  - Team hover lifted the card and tinted the photo.
- No console errors.
- Needs the Hackathon repo pushed before it works on the live site.

---

## 1. Context

Builds on checkpoint 31. These are two of the suggested microinteractions the user picked.

**What changed:**
- **Demo steps follow along (`src/App.jsx`):**
  - New `STEP_OF` map from each prototype route to its step: onboarding screens → Meet Lumen; home, pulse → Home; the create flow → Write a letter; mail, read, reply, history → Open a letter; recap → The recap.
  - `Demo` listens for the prototype's `{ lumenRoute }` message (Hackathon checkpoint 11). It only accepts messages from its own iframe (`e.source`) and highlights the matching step.
- **Team hover (`src/App.jsx`, `src/styles.css`):**
  - Each headshot sits in a `.person-photo` wrapper.
  - On hover:
    - the card lifts 6px with a deeper shadow
    - the photo scales to 1.04 with a touch more contrast and brightness
    - a soft-light lilac and peach Lumen glow fades in over the photo
    - the LinkedIn ↗ nudges up and right
  - With reduced motion on, the hover states still apply, just instantly.

---

## 2. Human Directions

1. "do Demo steps show which screen you're on and Team cards bring their photo to life on hover."

---

## 3. Records of Resistance

- **No full color:** the suggestion was to warm the photos to color on hover. Audrey's original headshot is black and white, so a color reveal would only work for two of the three. A consistent Lumen-tinted glow was used for all three instead.

---

## 4. Successes

- The demo panel now feels connected to the phone, and the team section responds to the cursor.
