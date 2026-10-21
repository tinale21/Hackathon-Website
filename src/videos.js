/* Video gallery. Add one entry per video and the Gallery section picks it up.

   src can be either:
   - a file in public/videos/, written as 'videos/my-film.mp4'
   - a YouTube or Vimeo link (the normal share link works)

   poster (optional) is a still shown before playing, e.g. 'videos/my-film.jpg'.
   Leave it out for YouTube/Vimeo; their thumbnail is used.
   ratio (optional) is the video's shape: '16/9' (default) or '9/16' for phone-shot video.
   Delete the sample placeholders below once real videos are in. */
export const VIDEOS = [
  { title: 'Lumen in two minutes', description: 'The pitch: why the middle of the story gets lost, and how a sealed letter brings it back.', src: '', placeholder: true },
  { title: 'Audrey’s week', description: 'A student letter from prompt to seal.', src: '', placeholder: true },
  { title: 'Mom writes back', description: 'Breaking the seal and replying by voice.', src: '', placeholder: true },
]
