# Lumen — Hackathon Website
**SVSD Design Sprint 2026**

> *Share the middle of the story.*

The site we give to judges. It has three parts: **About Lumen**, a **Gallery** of our films, and a **Demo** that embeds the working prototype from the [Hackathon](https://github.com/tinale21/Hackathon) repo (live at https://tinale21.github.io/Hackathon/). The look follows the Lumen app: Newsreader and Geist, light grey and white with black pills, and pastel painted art.

---

## Live URL

https://tinale21.github.io/Hackathon-Website/

---

## Adding videos to the Gallery

All videos are listed in [`src/videos.js`](src/videos.js). To add one:

1. **YouTube or Vimeo (recommended for big files):** paste the share link into `src`. The thumbnail comes from YouTube automatically.
2. **A video file:** put the `.mp4` in `public/videos/` and write `src: 'videos/my-film.mp4'`. Optionally add a still as `poster: 'videos/my-film.jpg'`. Keep files under 100 MB; GitHub won't accept anything larger.
3. Fill in `title` and `description`. For video shot on a phone, add `ratio: '9/16'`.
4. Delete the `placeholder: true` sample entries once the real videos are in.

```js
{ title: 'Lumen in two minutes', description: 'Our pitch.', src: 'https://youtu.be/XXXXXXXXXXX' },
{ title: 'Audrey’s week', description: 'A letter from prompt to seal.', src: 'videos/audreys-week.mp4', poster: 'videos/audreys-week.jpg', ratio: '9/16' },
```

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
