import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Lockup } from './LumenMark.jsx'
import { holo } from './FeatureArt.jsx'

/* Intro: the Lumen logo, then a sealed letter that opens into the site.
   The letter is the homepage itself (`preview`), laid out at full window size and scaled down
   into the envelope. Opening it scales it back up to exactly fill the window, where it matches
   the real page behind, so the hand-off is seamless. Plays on its own; a click or a key skips it. */

const LILAC = holo(['#d9ccfa', '#b9d6fa', '#ffd3e2', '#c7b6f2', '#efe9fd'])
// When each beat starts, in ms.
const BEATS = [['logo', 0], ['out', 1400], ['letter', 1800], ['open', 2700], ['rise', 3200], ['expand', 3900], ['done', 4900]]

export default function Intro({ onDone, preview }) {
  const [beat, setBeat] = useState('logo')
  const [fit, setFit] = useState(null) // where the letter sits in the envelope
  const done = useRef(onDone)
  done.current = onDone
  const env = useRef(null)
  const letter = useRef(null)

  useEffect(() => {
    const onDone = () => done.current()
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return }
    document.body.style.overflow = 'hidden'
    // The letter lands on the top of the page, so start there (a reload would otherwise restore an old scroll).
    try { window.history.scrollRestoration = 'manual' } catch { /* older browsers */ }
    window.scrollTo(0, 0)
    const timers = BEATS.map(([b, t]) => setTimeout(() => (b === 'done' ? onDone() : setBeat(b)), t))
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown', skip); document.body.style.overflow = '' }
  }, [])

  const at = (b) => BEATS.findIndex(([x]) => x === beat) >= BEATS.findIndex(([x]) => x === b)
  const showLetter = at('letter')

  // Size the letter from the envelope and the window: a full-window page, scaled to fit inside.
  useLayoutEffect(() => {
    if (!showLetter || fit) return
    const e = env.current
    const vw = window.innerWidth, vh = window.innerHeight, ew = e.offsetWidth, eh = e.offsetHeight
    const k = Math.min((ew * 0.88) / vw, (eh * 0.84) / vh)
    // The envelope is centered in the full-window intro, so the window's corner is at -(left, top) in its coordinates.
    setFit({ k, x: (ew - vw * k) / 2, y: eh - vh * k - eh * 0.06, lift: vh * k * 0.62, left: (vw - ew) / 2, top: (vh - eh) / 2 })
  }, [showLetter, fit])

  // Just before it grows, line the letter's spinning photo ring up with the real one behind it.
  useEffect(() => {
    if (beat !== 'expand' || !letter.current) return
    window.scrollTo(0, 0)
    const real = document.querySelector('main .ring'), mini = letter.current.querySelector('.ring')
    const a = real && real.getAnimations()[0], b = mini && mini.getAnimations()[0]
    if (a && b) b.currentTime = a.currentTime
  }, [beat])

  let letterStyle = { opacity: 0 }
  if (fit) {
    letterStyle = at('expand')
      // Grow to the window: undo the envelope's offset, full scale.
      ? { transform: `translate(${-fit.left}px, ${-fit.top}px) scale(1)`, borderRadius: 0, zIndex: 6 }
      : { transform: `translate(${fit.x}px, ${fit.y - (at('rise') ? fit.lift : 0)}px) scale(${fit.k})`, borderRadius: 12 / fit.k }
  }

  return (
    <div className={`intro${at('expand') ? ' leaving' : ''}`} onClick={() => done.current()} role="presentation">
      <span className="intro-glow a" aria-hidden="true" />
      <span className="intro-glow b" aria-hidden="true" />

      <Lockup size={44} wordSize={64} gap={12} className={`intro-lockup${at('out') ? ' out' : ''}`} />

      {showLetter ? (
        <div ref={env} className={`ienv${at('open') ? ' open' : ''}${at('expand') ? ' expand' : ''}`} aria-hidden="true">
          <span className="ienv-back holo" style={{ '--holo': LILAC }} />
          <div ref={letter} className="ienv-letter" style={letterStyle}>{preview}</div>
          <span className="ienv-front holo" style={{ '--holo': LILAC }} />
          <span className="ienv-flap holo" style={{ '--holo': LILAC }} />
          <span className="ienv-seal" />
        </div>
      ) : null}

      <span className="intro-skip">Click anywhere to skip</span>
    </div>
  )
}
