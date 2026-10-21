import { useEffect, useRef, useState } from 'react'
import { Lockup } from './components/LumenMark.jsx'
import { VIDEOS } from './videos.js'

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`
const DEMO = 'https://tinale21.github.io/Hackathon/'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Demo />
        <Team />
      </main>
      <Footer />
    </>
  )
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="header">
      <div className="wrap header-row">
        <a href="#top" className="home-link" aria-label="Lumen, back to top"><Lockup /></a>
        <nav className="nav" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#team">Team</a>
          <a href="#demo" className="pill small">Try the demo</a>
        </nav>
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */
// Eight photos in the same ring as the Lumen mark, the way the app's splash builds the logo.
const TILES = ['1-cafe', '2-lake-poster', '3-sunglasses', '4-statues', '5-aquarium', '6-night-friends-poster', '7-six-flags', '8-night-street']

function Hero() {
  return (
    <section id="top" className="hero wrap">
      <div className="hero-text rise">
        <p className="label">Made for the SVSD Design Sprint</p>
        <h1 className="display">Share the middle of the&nbsp;story.</h1>
        <p className="lede">Lumen is a sealed letter between immigrant and international art students and their families. A few short prompts let each side show what the week really took, not just how it turned out.</p>
        <div className="actions">
          <a href="#demo" className="pill">Try the demo</a>
          <a href="#gallery" className="pill ghost">Watch the films</a>
        </div>
      </div>
      <div className="ring-wrap rise" style={{ animationDelay: '.12s' }} aria-hidden="true">
        <div className="ring">
          {TILES.map((t, i) => (
            <span key={t} className="petal" style={{ '--a': `${i * 45}deg`, backgroundImage: `url(${media(`splash-tile-${t}.jpg`)})` }} />
          ))}
        </div>
        <span className="ring-word">lumen</span>
      </div>
    </section>
  )
}

/* ---------- About ---------- */
const FEATURES = [
  { title: 'Prompts, not a blank page', text: 'Each letter is a few short prompts picked for your family. Answer by photo, video, words or icons, and skip any of them.', art: 'words-sky.webp' },
  { title: 'Show me working', text: 'Students can show the critique, the rework and the late nights, so parents see what the work took.', art: 'wins-sky.webp' },
  { title: 'Say what you need', text: 'Listen, cheer me on, advice, support, space, a distraction or a taste of home. The stamp tells the reader how to respond.', art: 'happy-petals.webp' },
  { title: 'Sealed, never a chat', text: 'Letters arrive sealed and open with a tap. No read receipts, no streaks, no live back-and-forth.', art: 'people-clouds.webp' },
  { title: 'Write back in your voice', text: 'Parents reply by voice, words or photo, and share their own story through the same prompts.', art: 'voice-wave.webp' },
  { title: 'A semester recap', text: 'After a semester, the letters become a recap of everything the two of you shared.', art: 'wins-star.webp' },
]

const PRINCIPLES = [
  ['Explains, never defends', 'Nothing counts hours, grades or output. A letter shows the work; it never has to prove it.'],
  ['Student comfort first', 'When the two sides want different things, the student’s boundaries win.'],
  ['Nobody can demand a letter', 'Either person can write. There are no reminders aimed at the other person.'],
]

function About() {
  return (
    <section id="about" className="section wrap">
      <div className="section-head">
        <p className="label">About Lumen</p>
        <h2 className="display sm">We all want the same things. The middle gets lost.</h2>
        <p className="lede">Parents read outcomes as a measure of effort. In art, the two are loosely linked: critiques are subjective, progress is slow, and setbacks like visa delays are out of a student’s control. So students stop sharing and say “I’m fine.” Parents carry a hidden middle too: the sacrifice behind their expectations.</p>
      </div>

      <div className="sides">
        <div className="side">
          <span className="dot" style={{ background: 'var(--lilac)' }} />
          <h3>The student</h3>
          <p><b>Sees</b> the whole process: critiques, rework, visa stress.</p>
          <p><b>Hides</b> the struggle, because a weak result reads as “you didn’t try.”</p>
        </div>
        <div className="side">
          <span className="dot" style={{ background: 'var(--peach)' }} />
          <h3>The parent</h3>
          <p><b>Sees</b> only outcomes: grades, jobs, polished posts.</p>
          <p><b>Hides</b> their own sacrifice, worry and loneliness.</p>
        </div>
        <div className="side belief">
          <h3 className="serif">Emotional connection needs the process, not just the outcome, in both directions.</h3>
          <p>Lumen gives both sides a calm, sealed place to share it.</p>
        </div>
      </div>

      <div className="features">
        {FEATURES.map((f) => (
          <article key={f.title} className="feature">
            <div className="feature-art" style={{ backgroundImage: `url(${media(f.art)})` }} />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>

      <div className="principles">
        {PRINCIPLES.map(([t, d]) => (
          <div key={t}><h3>{t}</h3><p>{d}</p></div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
function parseVideo(src) {
  if (!src) return null
  const yt = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/)
  if (yt) return { kind: 'embed', url: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`, thumb: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg` }
  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return { kind: 'embed', url: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` }
  return { kind: 'file', url: /^https?:/.test(src) ? src : `${import.meta.env.BASE_URL}${src}` }
}

function Gallery() {
  const [open, setOpen] = useState(null)
  return (
    <section id="gallery" className="section wrap">
      <div className="section-head">
        <p className="label">Gallery</p>
        <h2 className="display sm">The films</h2>
        <p className="lede">See Lumen in the life of one family: Audrey, an art student, and her mom.</p>
      </div>
      <div className="videos">
        {VIDEOS.map((v, i) => {
          const p = parseVideo(v.src)
          const poster = v.poster ? `${import.meta.env.BASE_URL}${v.poster}` : p?.thumb
          return (
            <article key={i} className="video-card">
              <button className="video-thumb" disabled={!p} onClick={() => setOpen({ ...v, p })} aria-label={p ? `Play ${v.title}` : `${v.title}, coming soon`} style={{ aspectRatio: '16/9' }}>
                {poster
                  ? <img src={poster} alt="" loading="lazy" />
                  : p?.kind === 'file' ? <video src={`${p.url}#t=0.5`} muted playsInline preload="metadata" /> : <span className="video-holo" style={{ '--h': i * 40 }} />}
                <span className="play">{p ? <PlayIcon /> : 'Coming soon'}</span>
              </button>
              <h3>{v.title}</h3>
              {v.description && <p>{v.description}</p>}
            </article>
          )
        })}
      </div>
      {open && <Lightbox video={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

function Lightbox({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const { p } = video
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="lightbox-frame" style={{ aspectRatio: video.ratio || '16/9' }} onClick={(e) => e.stopPropagation()}>
        {p.kind === 'file'
          ? <video src={p.url} controls autoPlay playsInline />
          : <iframe src={p.url} title={video.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />}
      </div>
      <button className="icon-btn close" onClick={onClose} aria-label="Close video">✕</button>
    </div>
  )
}

function PlayIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
}

/* ---------- Demo ---------- */
// Screens a judge can jump straight to. Ids match the prototype's routes (Hackathon/src/App.jsx).
const STEPS = [
  { id: 'splash', title: 'Meet Lumen', text: 'Answer four quick questions. They shape which prompts arrive.' },
  { id: 'home', title: 'Home', text: 'Prompt of the day, new letters, and a pulse to say “thinking of you.”' },
  { id: 'prompt', title: 'Write a letter', text: 'Swipe right on a prompt to answer it, then add a photo or words, paper and a stamp, and seal it.' },
  { id: 'mail', title: 'Open a letter', text: 'Break the seal on Mom’s letter and write back by voice.' },
  { id: 'recap', title: 'The recap', text: 'Look back on the semester together.' },
]

function Demo() {
  const frame = useRef(null)
  const box = useRef(null)
  const [step, setStep] = useState('splash')
  const [reload, setReload] = useState(0)
  const [scale, setScale] = useState(1)

  // The prototype is laid out for a 390 × 844 phone; scale it down to fit the space instead of squeezing it.
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 390))
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  const jump = (id) => {
    setStep(id)
    if (id === 'splash') { setReload((n) => n + 1); return }
    // Changing only the hash moves the app to that screen without reloading it.
    try { frame.current.contentWindow.location.replace(`${DEMO}#/${id}`) } catch { setReload((n) => n + 1) }
  }

  return (
    <section id="demo" className="section wrap">
      <div className="demo">
        <div className="demo-side">
          <div className="section-head">
            <p className="label">Demo</p>
            <h2 className="display sm">Try Lumen</h2>
            <p className="lede">This is the working prototype. Tap through it like a phone, or jump to a moment.</p>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.id}>
                <button className="step" aria-current={step === s.id ? 'step' : undefined} onClick={() => jump(s.id)}>
                  <span className="step-n">{i + 1}</span>
                  <span><b>{s.title}</b><span>{s.text}</span></span>
                </button>
              </li>
            ))}
            <li className="demo-links">
              <button className="pill small ghost" onClick={() => jump('splash')}>Start over</button>
              <a className="pill small outline" href={DEMO} target="_blank" rel="noreferrer">Open full screen ↗</a>
            </li>
          </ol>
        </div>
        <div className="device" ref={box}>
          <iframe
            key={reload}
            ref={frame}
            src={DEMO}
            title="Lumen prototype"
            allow="microphone; camera; autoplay"
            style={{ transform: `scale(${scale})` }}
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
const TEAM = [
  { name: 'Audrey Keziah Castro', photo: 'audrey.jpg', linkedin: 'https://www.linkedin.com/in/audreykeziahdesign/' },
  { name: 'Tina Le', photo: 'tina.jpg', linkedin: 'https://www.linkedin.com/in/tinanle05' },
  { name: 'Tana Su', photo: 'tana.jpg', linkedin: 'https://www.linkedin.com/in/tana-su-91651a387/' },
]

function Team() {
  return (
    <section id="team" className="section wrap">
      <div className="section-head">
        <p className="label">Team</p>
        <h2 className="display sm">Made by</h2>
      </div>
      <div className="team">
        {TEAM.map((p) => (
          <article key={p.name} className="person">
            <img src={`${import.meta.env.BASE_URL}team/${p.photo}`} alt={`Portrait of ${p.name}`} loading="lazy" />
            <div className="person-row">
              <h3>{p.name}</h3>
              <a className="pill small outline" href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`}>LinkedIn ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <Lockup size={20} />
        <p className="small">Share the middle of the story. Made for the SVSD Design Sprint, 2026.</p>
        <a href="#top" className="small">Back to top ↑</a>
      </div>
    </footer>
  )
}
