import { useEffect, useRef, useState } from 'react'
import { LumenMark } from './LumenMark.jsx'
import { holo } from './FeatureArt.jsx'

/* Intro: the Lumen logo, then a sealed letter that opens into the site.
   It plays on its own (about 4s); a click or a key skips it. */

const LILAC = holo(['#d9ccfa', '#b9d6fa', '#ffd3e2', '#c7b6f2', '#efe9fd'])
// When each beat starts, in ms.
const BEATS = [['logo', 0], ['out', 1400], ['letter', 1800], ['open', 2700], ['rise', 3200], ['expand', 3900], ['done', 4600]]

export default function Intro({ onDone }) {
  const [beat, setBeat] = useState('logo')
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const onDone = () => done.current()
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return }
    document.body.style.overflow = 'hidden'
    const timers = BEATS.map(([b, t]) => setTimeout(() => (b === 'done' ? onDone() : setBeat(b)), t))
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown', skip); document.body.style.overflow = '' }
  }, [])

  const at = (b) => BEATS.findIndex(([x]) => x === beat) >= BEATS.findIndex(([x]) => x === b)

  return (
    <div className={`intro${at('expand') ? ' leaving' : ''}`} onClick={onDone} role="presentation">
      <span className="intro-glow a" aria-hidden="true" />
      <span className="intro-glow b" aria-hidden="true" />

      <span className={`intro-lockup${at('out') ? ' out' : ''}`} role="img" aria-label="Lumen">
        <LumenMark size={44} /><span>lumen</span>
      </span>

      {at('letter') ? (
        <div className={`ienv${at('open') ? ' open' : ''}${at('rise') ? ' rise' : ''}${at('expand') ? ' expand' : ''}`} aria-hidden="true">
          <span className="ienv-back holo" style={{ '--holo': LILAC }} />
          <span className="ienv-letter">
            <span className="ienv-mark"><LumenMark size={18} /></span>
            <span className="ienv-line">Share the middle of the&nbsp;story.</span>
          </span>
          <span className="ienv-front holo" style={{ '--holo': LILAC }} />
          <span className="ienv-flap holo" style={{ '--holo': LILAC }} />
          <span className="ienv-seal" />
        </div>
      ) : null}

      <span className="intro-skip">Click anywhere to skip</span>
    </div>
  )
}
