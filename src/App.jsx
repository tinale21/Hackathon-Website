import { useEffect, useRef, useState } from 'react'
import { Lockup } from './components/LumenMark.jsx'
import { FEATURE_ART } from './components/FeatureArt.jsx'
import { GALLERY_URL } from './gallery.js'

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
          <a href="#gallery">Video Gallery</a>
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
          <a href="#gallery" className="pill ghost">Visit the video gallery</a>
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
        <p className="lede">Parents read outcomes as a measure of effort. In art, the two are loosely linked: critiques are subjective, progress is slow, and setbacks like visa delays are out of a student’s control. So students stop sharing and say “I’m fine.” Parents carry a hidden middle too: the sacrifice behind their expectations.</p>
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
// The gallery is its own prototype, built by a teammate. Point GALLERY_URL (src/gallery.js) at it to embed it here.
function Gallery() {
  const src = GALLERY_URL && (/^https?:/.test(GALLERY_URL) ? GALLERY_URL : `${import.meta.env.BASE_URL}${GALLERY_URL}`)
  return (
    <section id="gallery" className="section wrap">
      <div className="section-head">
        <p className="label">Video Gallery</p>
        <h2 className="display sm">The films</h2>
        <p className="lede">Walk through Lumen like an art gallery. Each screen is a short film about a student and a parent finding the middle of the story.</p>
      </div>
      <div className="gallery-frame">
        {src
          ? <iframe src={src} title="Lumen video gallery" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          : (
            <div className="gallery-soon">
              <span className="video-holo" aria-hidden="true" />
              <span className="play">The video gallery opens here soon</span>
            </div>
          )}
      </div>
      {src && (
        <div className="frame-links">
          <a className="pill small outline" href={src} target="_blank" rel="noreferrer">Open full screen ↗</a>
        </div>
      )}
    </section>
  )
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
        <p className="small">Share the middle of the story. Made for the SVSD Design Sprint, 2026.</p>
        <a href="#top" className="small">Back to top ↑</a>
      </div>
    </footer>
  )
}
