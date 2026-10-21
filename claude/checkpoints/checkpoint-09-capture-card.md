# Checkpoint 09 — "Show me working" uses the Capture screen
**Date:** 2026-10-21
**Branch:** main
**Status:**
- Checked in Chrome, with no console errors.
- Both states (camera view, and the taken photo) were seen on screen.

---

## 1. Context

Builds on checkpoint 08. The user asked for the "Show me working" card to use the photo mode of the Capture screen (`Create.jsx`). That's the screen with the bracketed "Camera view", the shutter and the library button.

**What changed:**
- **`Working` in `src/components/FeatureArt.jsx`** now rebuilds that screen: the grey rounded camera view, the four corner brackets, the camera icon with "Camera view", the black ring shutter and the library button.
- **The loop:**
  - 2.2s ready, with the brackets breathing.
  - The shutter presses in.
  - A white flash (the prototype's `crackFlash`).
  - The photo rises in with "Retake" and "Use photo" pills for 3.4s.
  - Then it starts over.
- **The photo** is `me-artbox.webp`, Audrey's art box from the demo letters. It's the team's own photo, so it needs no credit.
- **Removed:** the workstation prompt card, its `prompt-workstation-blue.webp` and the `fa-bob` CSS.

---

## 2. Human Directions

1. "do this for show me working", with a screenshot of the Capture screen in photo mode ("What's a little slice of your day?").

---

## 3. Records of Resistance

- None. The prompt title, the Photo/Voice/Words switch and the caption line were left out. At card size they would be too small to read, so the card shows the camera and the controls.

---

## 4. Successes

- The card reads as "take a photo of the work in progress", in the app's own UI.
