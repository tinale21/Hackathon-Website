import { useEffect, useId, useRef, useState } from 'react'
import SCENES from './sceneArt.js'

/* Live pieces of the Lumen app for the About feature cards.
   Copied from the prototype (Hackathon repo) so they look and move the same:
   prompt cards (Swipe.jsx), stamps (data.js), the envelope (Envelope.jsx),
   the voice tile video and the Home recap scene (sceneArt.js). */

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`
const calm = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

const PROMPTS = {
  sound: { img: 'prompt-sound.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#d8f7ec', veil: .06, fade: .6, lead: 'A sound from', accentText: 'where you are', sub: 'ten seconds is plenty', desc: 'The studio fan, the bus, the rain, your roommate laughing. Let them hear your day.', card: ['#d2f0ec', '#7fd0c6'], grad: ['#1f9488', '#5cc5b8'], ink: '#0d3a35' },
  smile: { img: 'prompt-smile.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#fac57f', veil: .06, fade: .6, lead: 'Something that', accentText: 'made you smile', sub: 'even for a second', desc: 'A sky, a snack, a friend’s face, a sticker on a lamp post. Tiny counts.', card: ['#fbf0c7', '#efd06a'], grad: ['#a86a08', '#c98a1c'], ink: '#3d300a' },
  home: { img: 'prompt-home.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#dedff6', veil: .06, fade: .6, lead: 'What do you', accentText: 'miss from home?', sub: 'a taste, a place, a habit', desc: 'Something small you didn’t notice until you left. They might be able to send a little piece of it.', card: ['#fadde8', '#f2a7c3'], grad: ['#d94f86', '#f08bb4'], ink: '#4a1430' },
  workstation: { img: 'prompt-workstation-blue.webp', imgSize: 'cover', imgPos: '50% -80px', imgBg: '#93bbe4', veil: .08, lead: 'Picture your', accentText: 'workstation', sub: 'mess and all', desc: 'Where the work actually happened this week. Not the finished piece, the middle of it.', card: ['#e3edfb', '#a9c6ee'], grad: ['#3a5bd9', '#7aa7ee'], ink: '#16285a' },
}

const paint = (p) => `${p.fade ? `linear-gradient(transparent 82%, rgba(255,255,255,${p.fade}) 93%), ` : ''}linear-gradient(rgba(255,255,255,${p.veil}), rgba(255,255,255,${p.veil})), url(${media(p.img)}) ${p.imgPos}/${p.imgSize} no-repeat, ${p.imgBg}`

// Cards are laid out at the prototype's own size and scaled to fit the art box.
const CARD_W = 342, CARD_H = 500
function useFit(ref, h) {
  const [s, setS] = useState(0.4)
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setS((e.contentRect.height * h) / CARD_H))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref, h])
  return s
}

function PromptCard({ p, live = true }) {
  return (
    <div className="pcard" style={{ background: paint(p) }}>
      <span className="pcard-paint" style={{ background: paint(p), animationPlayState: live ? 'running' : 'paused' }} />
      {live ? <span className="pcard-glow" style={{ background: `radial-gradient(circle, rgba(255,255,255,.26) 0%, ${p.card[0]}33 35%, transparent 65%)` }} /> : null}
      <div className="pc-blur pc-blur-top" />
      <div className="pc-blur pc-blur-bottom" />
      <div className="pcard-head">
        <h4 style={{ color: p.ink }}>{p.lead}<br /><span style={{ background: `linear-gradient(90deg, ${p.grad[0]}, ${p.grad[1]})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{p.accentText}</span></h4>
        <p style={{ color: `${p.ink}b3` }}>{p.sub}</p>
      </div>
      <p className="pcard-desc" style={{ color: p.ink }}>{p.desc}</p>
    </div>
  )
}

/* Prompts: the swipe deck answers itself, one card every few seconds. */
const DECK = ['sound', 'smile', 'home']
function Deck() {
  const box = useRef(null)
  const s = useFit(box, 0.7)
  const [top, setTop] = useState(0)
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (calm()) return
    let t2
    const t = setInterval(() => {
      setLeaving(true)
      t2 = setTimeout(() => { setLeaving(false); setTop((n) => (n + 1) % DECK.length) }, 420)
    }, 3200)
    return () => { clearInterval(t); clearTimeout(t2) }
  }, [])
  return (
    <div className="fa fa-deck" ref={box}>
      {/* Lifted by half the back cards' offset so the whole stack sits centered. */}
      <div className="fa-stage" style={{ width: CARD_W, height: CARD_H, transform: `translate(-50%, -50%) scale(${s}) translateY(-34px)` }}>
        {[2, 1, 0].map((level) => {
          const p = PROMPTS[DECK[(top + level) % DECK.length]]
          const out = level === 0 && leaving
          const style = out
            ? { transform: 'translate(560px, -20px) rotate(24deg)', transition: 'transform .42s cubic-bezier(.4,0,.6,1)' }
            : { transform: `translateY(${level * 34}px) scale(${1 - level * 0.05})`, transition: leaving ? 'transform .42s cubic-bezier(.2,.8,.2,1)' : 'none' }
          const shift = leaving && level > 0 ? { transform: `translateY(${(level - 1) * 34}px) scale(${1 - (level - 1) * 0.05})` } : null
          return (
            <div key={`${DECK[(top + level) % DECK.length]}`} className="fa-slot" style={{ zIndex: 3 - level, ...style, ...shift }}>
              <PromptCard p={p} live={level === 0} />
              <span className="fa-mute" style={{ opacity: level === 0 || (leaving && level === 1) ? 0 : 0.45 + (level - 1) * 0.2 }} />
              {level === 0 ? <span className="fa-answer" style={{ opacity: leaving ? 1 : 0 }}>ANSWER</span> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* Show me working: the "Behind the outcome" prompt card, painting drifting. */
function Working() {
  const box = useRef(null)
  const s = useFit(box, 0.8)
  return (
    <div className="fa fa-working" ref={box}>
      <div className="fa-stage fa-bob" style={{ width: CARD_W, height: CARD_H, transform: `translate(-50%, -50%) scale(${s})` }}>
        <PromptCard p={PROMPTS.workstation} />
      </div>
    </div>
  )
}

/* Say what you need: the painted stamps, each taking a turn in front. */
const STAMPS = [['listen', 'Listen'], ['cheer', 'Cheer me on'], ['advice', 'Advice'], ['support', 'Support'], ['space', 'Space'], ['distract', 'Distract me']]
function Stamps() {
  const [on, setOn] = useState(0)
  useEffect(() => {
    if (calm()) return
    const t = setInterval(() => setOn((n) => (n + 1) % STAMPS.length), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fa fa-stamps">
      <div className="stamp-row">
        {STAMPS.map(([id, label], i) => {
          // d is the stamp's place relative to the front one: 0 in front, ±1 beside it, the rest hidden.
          const d = ((i - on + STAMPS.length + 2) % STAMPS.length) - 2
          const a = Math.abs(d)
          const style = { transform: `translate(calc(-50% + ${d * 78}%), -50%) rotate(${d * 5 - 3}deg) scale(${1 - Math.min(1, a) * 0.3})`, opacity: a > 1 ? 0 : 1 }
          return (
            <span key={id} className="stamp" data-d={d} style={style}>
              <img src={media(`stamp-${id}.jpg`)} alt="" />
              <b>{label}</b>
            </span>
          )
        })}
      </div>
    </div>
  )
}

/* Sealed: the lilac holo envelope with a stamp, floating. */
const holo = ([a, b, c, d, e]) => `radial-gradient(circle at 25% 25%, ${a} 0%, transparent 45%), radial-gradient(circle at 75% 30%, ${b} 0%, transparent 45%), radial-gradient(circle at 40% 75%, ${c} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${d} 0%, transparent 45%), ${e}`
function Sealed() {
  const k = 1.1
  return (
    <div className="fa fa-sealed">
      <span className="twinkle" style={{ left: '22%', top: '24%' }} />
      <span className="twinkle d2" style={{ right: '20%', top: '30%' }} />
      <span className="twinkle d3" style={{ left: '30%', bottom: '20%' }} />
      <div className="holo env" style={{ '--holo': holo(['#d9ccfa', '#b9d6fa', '#ffd3e2', '#c7b6f2', '#efe9fd']), width: 202 * k, height: 136 * k, borderRadius: 22 * k }}>
        <svg width={202 * k} height={136 * k} viewBox="0 0 202 136" aria-hidden="true">
          <path d="M4 8l97 70L198 8" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <span className="env-seal" style={{ left: 84 * k, top: 60 * k, width: 34 * k, height: 34 * k }} />
        <span className="env-stamp" style={{ right: 14 * k, bottom: 12 * k, width: 32 * k, height: 38 * k }}><img src={media('stamp-listen.jpg')} alt="" /></span>
      </div>
    </div>
  )
}

/* Write back in your voice: the voice tile's video. */
function Voice() {
  return (
    <div className="fa fa-voice">
      {/* React doesn't write the muted attribute, which some phones need before they autoplay; set it directly. */}
      <video src={media('voice-bg.mp4')} poster={media('voice-wave.webp')} autoPlay muted loop playsInline aria-hidden="true"
        ref={(v) => { if (v) { v.muted = true; v.play().catch(() => {}) } }} />
    </div>
  )
}

/* A semester recap: the Home recap tile's painted scene, with its floating and twinkling. */
function Recap() {
  const raw = useId().replace(/:/g, '')
  return (
    <div className="fa fa-recap">
      <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SCENES.recap((s) => `${raw}-${s}`) }} />
    </div>
  )
}

export const FEATURE_ART = { deck: Deck, working: Working, stamps: Stamps, sealed: Sealed, voice: Voice, recap: Recap }
