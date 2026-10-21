import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Lockup } from './components/LumenMark.jsx'
import { FEATURE_ART } from './components/FeatureArt.jsx'
import Intro from './components/Intro.jsx'
import { GALLERY_URL } from './gallery.js'

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`
const DEMO = 'https://tinale21.github.io/Hackathon/'

/* ---------- Pages ----------
   The site is one page, plus the Video Gallery on its own full-screen page at #/gallery.
   Going there expands whatever was clicked (the gallery preview, the hero button or the nav link)
   into the full page with a View Transition; closing shrinks it back. */
const isGallery = () => window.location.hash === '#/gallery'
const calm = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
let origin = '.gallery-frame' // what to shrink back into on close
let homeY = 0

function transition(update, after) {
  if (!document.startViewTransition || calm()) { update(); if (after) after(); return }
  const t = document.startViewTransition(() => flushSync(update))
  // A skipped transition (say, in a background tab) rejects these; the page still updates.
  t.ready.catch(() => {})
  t.finished.catch(() => {}).then(() => { if (after) after() })
}

export default function App() {
  const [page, setPage] = useState(isGallery() ? 'gallery' : 'home')
  // The intro plays once per visit (browser session), and not when someone lands straight on the gallery.
  const [intro, setIntro] = useState(() => {
    if (isGallery()) return false
    try { return !sessionStorage.getItem('lumen-intro') } catch { return true }
  })
  const endIntro = () => {
    try { sessionStorage.setItem('lumen-intro', '1') } catch { /* private mode: it just plays again next time */ }
    setIntro(false)
  }
  const pageRef = useRef(page)
  pageRef.current = page

  const openGallery = (e, from) => {
    e.preventDefault()
    origin = from
    homeY = window.scrollY
    const el = document.querySelector(from)
    if (el) el.style.viewTransitionName = 'gallery'
    transition(() => {
      window.history.pushState({ lumenGallery: true }, '', '#/gallery')
      setPage('gallery')
      window.scrollTo(0, 0)
    })
  }

  // Close button, or the browser's Back button.
  useEffect(() => {
    const onHash = () => {
      if (isGallery()) { setPage('gallery'); return }
      if (pageRef.current === 'home') return // an in-page link like #about
      transition(() => {
        flushSync(() => setPage('home'))
        window.scrollTo(0, homeY)
        const el = document.querySelector(origin)
        if (el) el.style.viewTransitionName = 'gallery'
      }, () => { const el = document.querySelector(origin); if (el) el.style.viewTransitionName = '' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const closeGallery = () => {
    if (window.history.state && window.history.state.lumenGallery) window.history.back()
    else { window.history.replaceState(null, '', window.location.pathname); window.dispatchEvent(new HashChangeEvent('hashchange')) }
  }

  if (page === 'gallery') return <GalleryPage onClose={closeGallery} />
  return (
    <>
      {intro ? <Intro onDone={endIntro} /> : null}
      <Header openGallery={openGallery} />
      <main>
        {/* Keyed on the intro so the hero's entrance plays as the intro lifts away. */}
        <Hero key={intro ? 'behind' : 'shown'} openGallery={openGallery} />
        <About />
        <Gallery openGallery={openGallery} />
        <Demo />
        <Team />
      </main>
      <Footer />
    </>
  )
}

/* ---------- Header ---------- */
function Header({ openGallery }) {
  return (
    <header className="header">
      <div className="wrap header-row">
        <a href="#top" className="home-link" aria-label="Lumen, back to top"><Lockup /></a>
        <nav className="nav" aria-label="Sections">
          <a href="#about" className="nav-about">About</a>
          <a href="#/gallery" className="nav-gallery" onClick={(e) => openGallery(e, '.nav-gallery')}>Video Gallery</a>
          <a href="#demo">Try the demo</a>
          <a href="#team">Team</a>
        </nav>
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */
// Eight photos in the same ring as the Lumen mark, the way the app's splash builds the logo.
const TILES = ['1-cafe', '2-lake-poster', '3-sunglasses', '4-statues', '5-aquarium', '6-night-friends-poster', '7-six-flags', '8-night-street']

function Hero({ openGallery }) {
  return (
    <section id="top" className="hero wrap">
      <div className="hero-text rise">
        <p className="label">Made for the SVSD Design Sprint</p>
        <h1 className="display">Share the middle of the&nbsp;story.</h1>
        <p className="lede">Lumen is a sealed letter between immigrant and international art students and their families. A few short prompts let each side show what the week really took, not just how it turned out.</p>
        <div className="actions">
          <a href="#/gallery" className="pill hero-gallery" onClick={(e) => openGallery(e, '.hero-gallery')}>Visit the video gallery</a>
          <a href="#demo" className="pill ghost">Try the demo</a>
        </div>
      </div>
      <div className="ring-wrap rise" style={{ animationDelay: '.12s' }} aria-hidden="true">
        <div className="ring">
          {TILES.map((t, i) => (
            <span key={t} className="petal" style={{ '--a': `${i * 45}deg`, backgroundImage: `url(${media(`splash-tile-${t}.jpg`)})` }} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- About ---------- */
const FEATURES = [
  { title: 'Prompts, not a blank page', text: 'Each letter is a few short prompts picked for your family. Answer by photo, video, words or icons, and skip any of them.', art: 'deck' },
  { title: 'Show me working', text: 'Students can show the critique, the rework and the late nights, so parents see what the work took.', art: 'working' },
  { title: 'Say what you need', text: 'Listen, cheer me on, advice, support, space, a distraction or a taste of home. The stamp tells the reader how to respond.', art: 'stamps' },
  { title: 'Sealed, never a chat', text: 'Letters arrive sealed and open with a tap. No read receipts, no streaks, no live back-and-forth.', art: 'sealed' },
  { title: 'Parents write back', text: 'A parent answers what their child asked for, not the grade: a voice note, a few words or a photo, in their own time.', art: 'voice' },
  { title: 'A semester recap', text: 'After a semester, the letters become a recap of everything the two of you shared.', art: 'recap' },
]

function About() {
  return (
    <section id="about" className="section wrap">
      <div className="section-head">
        <p className="label">About Lumen</p>
        <h2 className="display sm">We all want the same things. The middle gets lost.</h2>
        <p className="lede">Parents read outcomes as a measure of effort, but in art the two are loosely linked. So students stop sharing and say “I’m fine.” Parents carry a hidden middle too: the sacrifice behind their expectations.</p>
      </div>

      <div className="features">
        {FEATURES.map((f) => {
          const Art = FEATURE_ART[f.art]
          return (
            <article key={f.title} className="feature">
              <div className="feature-art"><Art /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
// The gallery is its own prototype, built by a teammate. Point GALLERY_URL (src/gallery.js) at it.
const gallerySrc = GALLERY_URL && (/^https?:/.test(GALLERY_URL) ? GALLERY_URL : `${import.meta.env.BASE_URL}${GALLERY_URL}`)

function GalleryView({ preview }) {
  return gallerySrc
    ? <iframe src={gallerySrc} title="Lumen video gallery" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen tabIndex={preview ? -1 : undefined} />
    : (
      <div className="gallery-soon">
        <span className="video-holo" aria-hidden="true" />
        {preview ? null : <span className="play">The video gallery opens here soon</span>}
      </div>
    )
}

// On the home page: a preview of the gallery. Clicking it expands into the full-screen page.
function Gallery({ openGallery }) {
  return (
    <section id="gallery" className="section wrap">
      <div className="section-head">
        <p className="label">Video Gallery</p>
        <h2 className="display sm">The films</h2>
        <p className="lede">Walk through Lumen like an art gallery. Each screen is a short film about a student and a parent finding the middle of the story.</p>
      </div>
      <a href="#/gallery" className="gallery-frame gallery-link" onClick={(e) => openGallery(e, '.gallery-frame')} aria-label="Enter the video gallery">
        <GalleryView preview />
        <span className="gallery-enter"><span className="play">Enter the video gallery →</span></span>
      </a>
    </section>
  )
}

function GalleryPage({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="gpage">
      <header className="gpage-bar">
        <a href="#top" className="home-link" aria-label="Lumen, back to the site" onClick={(e) => { e.preventDefault(); onClose() }}><Lockup /></a>
        <span className="label">Video Gallery</span>
        <button className="pill small ghost" onClick={onClose}>Close ✕</button>
      </header>
      <div className="gpage-frame" style={{ viewTransitionName: 'gallery' }}>
        <GalleryView />
      </div>
    </div>
  )
}

/* ---------- Demo ---------- */
// Screens a judge can jump straight to. Ids match the prototype's routes (Hackathon/src/App.jsx).
const STEPS = [
  { id: 'splash', title: 'Meet Lumen' },
  { id: 'home', title: 'Home' },
  { id: 'prompt', title: 'Write a letter' },
  { id: 'mail', title: 'Open a letter' },
  { id: 'recap', title: 'The recap' },
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
                  <b>{s.title}</b>
                </button>
              </li>
            ))}
            <li className="demo-links">
              <button className="pill small ghost" onClick={() => jump('splash')}>Start over</button>
              <a className="pill small outline" href={DEMO} target="_blank" rel="noreferrer">Open full screen ↗</a>
            </li>
          </ol>
        </div>
        {/* iPhone frame: bezel, side buttons and Dynamic Island around the live prototype. */}
        <div className="device">
          <span className="device-btn action" /><span className="device-btn vol-up" /><span className="device-btn vol-down" /><span className="device-btn power" />
          <div className="device-screen" ref={box}>
            <iframe
              key={reload}
              ref={frame}
              src={DEMO}
              title="Lumen prototype"
              allow="microphone; camera; autoplay"
              style={{ transform: `scale(${scale})` }}
            />
            <span className="device-island" />
          </div>
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
        <p className="small">Made for the SVSD Design Sprint, 2026.</p>
        <a href="#top" className="small">Back to top ↑</a>
      </div>
    </footer>
  )
}
