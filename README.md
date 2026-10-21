# Lumen — Hackathon Website
**SVSD Design Sprint 2026**

> *Share the middle of the story.*

The site we give to judges. It has three parts: **About Lumen**, a **Gallery** (a click-through film gallery prototype), and a **Demo** that embeds the working prototype from the [Hackathon](https://github.com/tinale21/Hackathon) repo (live at https://tinale21.github.io/Hackathon/). The look follows the Lumen app: Newsreader and Geist, light grey and white with black pills, and pastel painted art.

---

## Live URL

https://tinale21.github.io/Hackathon-Website/

---

## Adding the Gallery

The Gallery is its own click-through prototype, built by a teammate. The site embeds it in a wide frame, the same way the Demo embeds the app. Until it's connected, the frame shows "The gallery opens here soon."

To connect it, set `GALLERY_URL` in [`src/gallery.js`](src/gallery.js):

- **Hosted build (recommended):** paste its link, e.g. `'https://<username>.github.io/<repo>/'`.
- **Files in this repo:** copy the build's `index.html` and files into `public/gallery/`, then set `GALLERY_URL` to `'gallery/index.html'`. The build must use relative paths (Vite: `base: './'`), and video files must each be under 100 MB.

Push to `main`, and the site redeploys in about a minute.

---

## Design Argument

TBD

---

## Research Documentation

TBD

---

## Platform Rationale

TBD

---

## AI Direction Log

| # | Date | Prompt | AI Output | Decision | Notes |
|---|------|--------|-----------|----------|-------|
| 1 | 2026-10-21 | Set up the repo like my other SCAD projects | Vite + React scaffold, GitHub Pages deploy, README, CC0 license, `claude/` folders | Accepted | Placeholder page until the site's purpose is set |
| 2 | 2026-10-21 | Build the judges' site (About Lumen, video gallery, demo) in Lumen's style, using bepresents.org as the reference | One-page site: hero with the splash photo ring, About from the PRD, a gallery driven by `src/videos.js`, and the prototype embedded in a phone frame with jump-to-screen steps | Accepted for review | Gallery has placeholders until the films are ready |

---

## Records of Resistance

None yet.

---

## Five Questions Reflection

1. **Can I defend this?** TBD
2. **Is this mine?** TBD
3. **Did I verify this?** TBD
4. **Would I teach this?** TBD
5. **Is my documentation honest?** TBD

---

## Post-Mortem

TBD

---

## Mermaid Diagram

TBD

---

## User Testing Evidence

TBD
