# Checkpoint 04 — Gallery becomes an embedded prototype
**Date:** 2026-10-21
**Branch:** main
**Status:**
- The Gallery frame is in place with an "opens here soon" placeholder.
- Checked in Chrome, with no console errors.
- Waiting on the teammate's build.

---

## 1. Context

Builds on checkpoint 03. A teammate is building the gallery as its own click-through prototype. Her mockup shows a white 3D room with films hung on the walls, arrow buttons, ←/→ keys, and numbered chips: The middle of the story, Breaking the seal, A week in letters, Mom in Singapore. So the site no longer needs its own video grid.

**What changed:**
- **`src/App.jsx`:**
  - `Gallery` now embeds whatever `GALLERY_URL` points to.
  - It's a wide 4:3 frame (3:4 on phones) with an "Open full screen" link, and the iframe allows autoplay and fullscreen.
  - With no URL set, the frame shows a soft gradient and "The gallery opens here soon."
- **`src/gallery.js` (new):** holds `GALLERY_URL`. It takes a hosted link, or `'gallery/index.html'` for a build copied into `public/gallery/`.
- **Removed:** `src/videos.js`, the video cards, the lightbox and their CSS.
- **Hero:** the second button now reads "Visit the gallery" instead of "Watch the films".
- **README:** the "Adding videos" section is now "Adding the Gallery".

**Not done:**
- Connecting her build (the URL is still empty).

---

## 2. Human Directions

1. "this is what the gallery is going to look like. its going to be a build out prototype that they can click through each of the video like a art gallery", with her mockup.

---

## 3. Records of Resistance

- None. An earlier change (a new light backdrop on Tina's headshot) was reverted at the user's request before this, and that commit was dropped unpushed.

---

## 4. Successes

- The placeholder frame renders full width under the section heading, ready for the build.
