import { useEffect, useMemo, useRef, useState } from 'react'
import { LumenMark } from './LumenMark.jsx'
import { holo } from './FeatureArt.jsx'

/* Intro before the site, after meganyap.me's welcome → visitor card → enter.
   In Lumen terms: a welcome screen, then a sealed letter addressed to the visitor
   (name and envelope color are theirs to pick), then they break the seal and the site opens.
   Nothing typed here leaves the page. */

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`
const calm = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

// The app's envelope colors (Hackathon/src/components/Envelope.jsx).
const ENVELOPES = [
  { id: 'lilac', label: 'Lilac', swatch: '#cdbff6', c: ['#d9ccfa', '#b9d6fa', '#ffd3e2', '#c7b6f2', '#efe9fd'] },
  { id: 'peach', label: 'Peach', swatch: '#ffc9b4', c: ['#ffd1b8', '#f7b8d2', '#fff1c2', '#ffc0cf', '#fde6e6'] },
  { id: 'mint', label: 'Mint', swatch: '#a9e0c5', c: ['#bfe8d4', '#d8f3e5', '#b8d8fa', '#9fdcbf', '#eaf7f0'] },
  { id: 'sky', label: 'Sky', swatch: '#a9cdf6', c: ['#b8d8fa', '#d4e9ff', '#c9b8f5', '#a9e3f2', '#e6f1fd'] },
  { id: 'rose', label: 'Rose', swatch: '#f4aecb', c: ['#f7b8d2', '#ffd6e5', '#d9ccfa', '#f2a8c5', '#fdeef4'] },
  { id: 'butter', label: 'Butter', swatch: '#f6dc8f', c: ['#fff1c2', '#ffd9b5', '#ffe9f0', '#fbe7a6', '#fff8e4'] },
]
const SPARKS = ['#a58cf0', '#f39cc0', '#ffb08a', '#8fbaf3', '#8fd3b4']

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return <span>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}</span>
}

export default function Intro({ onDone }) {
  const [step, setStep] = useState('welcome') // welcome → letter → opening
  const [name, setName] = useState('')
  const [env, setEnv] = useState(ENVELOPES[0])
  const [leaving, setLeaving] = useState(false)
  const first = useRef(null)
  const today = useMemo(() => new Date().toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' }), [])
  // Pastel sparkles drifting up, Lumen's take on the reference's starfield.
  const sparks = useMemo(() => Array.from({ length: 42 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, size: 3 + (i % 4), c: SPARKS[i % SPARKS.length],
    delay: `${-(i * 0.73) % 9}s`, dur: `${7 + (i % 5) * 1.6}s`,
  })), [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  useEffect(() => { if (first.current) first.current.focus() }, [step])

  const finish = () => {
    setLeaving(true)
    setTimeout(onDone, calm() ? 0 : 650)
  }
  const breakSeal = () => {
    if (calm()) { finish(); return }
    setStep('opening')
    setTimeout(finish, 900)
  }

  return (
    <div className={`intro${leaving ? ' leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome to Lumen">
      <span className="intro-glow a" aria-hidden="true" />
      <span className="intro-glow b" aria-hidden="true" />
      <div className="intro-sparks" aria-hidden="true">
        {sparks.map((s, i) => <i key={i} style={{ left: s.left, top: s.top, width: s.size, height: s.size, background: s.c, animationDelay: `${s.delay}, ${s.delay}`, animationDuration: `${s.dur}, 3.2s` }} />)}
      </div>

      {step === 'welcome' ? (
        <div className="intro-center" key="welcome">
          <span className="intro-label">Welcome to</span>
          <span className="intro-lockup"><LumenMark size={44} /><span>lumen</span></span>
          <button ref={first} className="pill" onClick={() => setStep('letter')}>Open your letter →</button>
          <button className="intro-skip" onClick={finish}>Skip intro</button>
          <p className="intro-tag">Every week has a middle. <b>Why not share it?</b></p>
        </div>
      ) : (
        <div className="intro-center" key="letter">
          <span className="intro-label">A letter for you</span>
          <p className="intro-sub">Lumen letters arrive sealed. Address it, pick an envelope, then open it.</p>
          <label className="intro-name">
            <span>To</span>
            <input ref={first} value={name} maxLength={24} placeholder="Your name" onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') breakSeal() }} disabled={step === 'opening'} />
          </label>
          <div className={`intro-env holo${step === 'opening' ? ' opening' : ''}`} style={{ '--holo': holo(env.c) }}>
            <svg viewBox="0 0 202 136" preserveAspectRatio="none" aria-hidden="true"><path d="M4 8l97 70L198 8" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="2.5" strokeLinejoin="round" /></svg>
            <span className="env-to">For {name.trim() || 'you'}</span>
            <span className="env-from">From the Lumen team · {today}</span>
            <span className="intro-seal" />
            <span className="intro-stamp"><img src={media('stamp-listen.jpg')} alt="" /></span>
          </div>
          <div className="intro-swatches" role="radiogroup" aria-label="Envelope color">
            {ENVELOPES.map((e) => (
              <button key={e.id} role="radio" aria-checked={env.id === e.id} aria-label={e.label} style={{ background: e.swatch }} onClick={() => setEnv(e)} disabled={step === 'opening'} />
            ))}
          </div>
          <button className="pill" onClick={breakSeal} disabled={step === 'opening'}>Break the seal</button>
          <button className="intro-skip" onClick={() => setStep('welcome')} disabled={step === 'opening'}>← Back</button>
        </div>
      )}

      <span className="intro-corner left"><Clock /></span>
      <span className="intro-corner right">SVSD Design Sprint 2026</span>
    </div>
  )
}
