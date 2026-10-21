import { useEffect, useRef, useState } from 'react'

/* Live pieces of the Lumen app for the About feature cards.
   Copied from the prototype (Hackathon repo) so they look and move the same:
   prompt cards (Swipe.jsx), stamps (data.js), the envelope (Envelope.jsx),
   the voice recorder (Create.jsx) and the Recap book cover (Receive.jsx). */

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`
const calm = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

const PROMPTS = {
  sound: { img: 'prompt-sound.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#d8f7ec', veil: .06, fade: .6, lead: 'A sound from', accentText: 'where you are', sub: 'ten seconds is plenty', desc: 'The studio fan, the bus, the rain, your roommate laughing. Let them hear your day.', card: ['#d2f0ec', '#7fd0c6'], grad: ['#1f9488', '#5cc5b8'], ink: '#0d3a35' },
  smile: { img: 'prompt-smile.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#fac57f', veil: .06, fade: .6, lead: 'Something that', accentText: 'made you smile', sub: 'even for a second', desc: 'A sky, a snack, a friend’s face, a sticker on a lamp post. Tiny counts.', card: ['#fbf0c7', '#efd06a'], grad: ['#a86a08', '#c98a1c'], ink: '#3d300a' },
  home: { img: 'prompt-home.webp', imgSize: 'cover', imgPos: '50% 100%', imgBg: '#dedff6', veil: .06, fade: .6, lead: 'What do you', accentText: 'miss from home?', sub: 'a taste, a place, a habit', desc: 'Something small you didn’t notice until you left. They might be able to send a little piece of it.', card: ['#fadde8', '#f2a7c3'], grad: ['#d94f86', '#f08bb4'], ink: '#4a1430' },
}

const paint = (p) => `${p.fade ? `linear-gradient(transparent 82%, rgba(255,255,255,${p.fade}) 93%), ` : ''}linear-gradient(rgba(255,255,255,${p.veil}), rgba(255,255,255,${p.veil})), url(${media(p.img)}) ${p.imgPos}/${p.imgSize} no-repeat, ${p.imgBg}`

// Cards are laid out at the prototype's own size and scaled to fit the art box.
const CARD_W = 342, CARD_H = 500
function useFit(ref, h, base = CARD_H) {
  const [s, setS] = useState(0.4)
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setS((e.contentRect.height * h) / base))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref, h, base])
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

/* Show me working: the Capture screen's photo mode (Create.jsx). It loops: empty camera view,
   the shutter is pressed, a flash, the photo with Retake / Use photo, then back. */
const CAM_W = 342, CAM_H = 360
function Working() {
  const box = useRef(null)
  const s = useFit(box, 0.9, CAM_H)
  const [phase, setPhase] = useState('ready') // ready → press → taken
  useEffect(() => {
    if (calm()) return
    const steps = { ready: ['press', 2200], press: ['taken', 260], taken: ['ready', 3400] }
    let t
    const run = (p) => { setPhase(p); t = setTimeout(() => run(steps[p][0]), steps[p][1]) }
    t = setTimeout(() => run('ready'), 0)
    return () => clearTimeout(t)
  }, [])
  const taken = phase === 'taken'
  return (
    <div className="fa fa-camera" ref={box}>
      <div className="fa-stage" style={{ width: CAM_W, height: CAM_H, transform: `translate(-50%, -50%) scale(${s})` }}>
        <div className="cam">
          {taken
            ? <img key="shot" src={media('desk-working.jpg')} alt="" className="cam-shot" />
            : <>
                <span className="cam-ph">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
                  Camera view
                </span>
                <span className="brackets"><i /><i /><i /><i /></span>
              </>}
          {taken ? <span key="flash" className="cam-flash" /> : null}
        </div>
        <div className="cam-row">
          {taken
            ? <>
                <span className="pill outline">Retake</span>
                <span className="pill">Use photo</span>
              </>
            : <>
                <span />
                <span className="shutter" style={{ transform: phase === 'press' ? 'scale(.9)' : 'none' }}><span /></span>
                <span className="cam-lib">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></svg>
                </span>
              </>}
        </div>
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
export const holo = ([a, b, c, d, e]) => `radial-gradient(circle at 25% 25%, ${a} 0%, transparent 45%), radial-gradient(circle at 75% 30%, ${b} 0%, transparent 45%), radial-gradient(circle at 40% 75%, ${c} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${d} 0%, transparent 45%), ${e}`
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

/* Write back in your voice: the recorder from the Capture screen (VoiceOrb in Create.jsx).
   It loops a pretend recording: the timer runs and the orb moves like speech, then it resets. */
const ORB = 220, VOICE_W = 340, VOICE_H = 330
function Voice() {
  const box = useRef(null)
  const s = useFit(box, 0.94, VOICE_H)
  const orb = useRef(null), halo = useRef(null), halo2 = useRef(null)
  const [rec, setRec] = useState(false)
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    if (calm()) return
    let t
    const cycle = (on) => { setRec(on); if (!on) setSecs(0); t = setTimeout(() => cycle(!on), on ? 6500 : 2200) }
    t = setTimeout(() => cycle(true), 1200)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (!rec) return
    const t = setInterval(() => setSecs((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [rec])
  // Same speech-like level as the prototype's pretend recording, driving the orb and its halos.
  useEffect(() => {
    if (!rec) return
    let raf = 0, level = 0
    const t0 = performance.now()
    const tick = () => {
      const t = (performance.now() - t0) / 1000
      const target = Math.min(1, Math.max(0, Math.sin(t * 8.5)) * Math.max(0, Math.sin(t * 1.6) + 0.35) * 0.75 + Math.random() * 0.06)
      level += (target - level) * (target > level ? 0.35 : 0.1)
      if (orb.current) orb.current.style.transform = `scale(${1 + level * 0.22})`
      if (halo.current) { halo.current.style.transform = `scale(${1.06 + level * 0.45})`; halo.current.style.opacity = String(0.35 + level * 0.5) }
      if (halo2.current) { halo2.current.style.transform = `scale(${1.12 + level * 0.8})`; halo2.current.style.opacity = String(0.15 + level * 0.35) }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ;[orb, halo, halo2].forEach((r) => { if (r.current) { r.current.style.transform = ''; r.current.style.opacity = '' } })
    }
  }, [rec])

  // The "slice of your day" prompt's colors, as the orb takes them from the prompt being answered.
  const colors = ['#dff5df', '#ffd3e2', '#a8e6a6', '#d9ccfa', '#f6f2ff']
  const layer = (ref, inset, blur, stop, still) => (
    <span ref={ref} className="orb-layer" style={{ inset, WebkitMaskImage: `radial-gradient(circle, #000 ${stop}%, transparent 71%)`, maskImage: `radial-gradient(circle, #000 ${stop}%, transparent 71%)`, opacity: rec || ref === orb ? undefined : 0.45, transition: rec ? 'none' : 'transform .6s ease, opacity .6s ease' }}>
      <span style={{ background: holo(colors), filter: `blur(${blur}px)`, animation: still ? 'none' : `holoDrift ${rec ? 4 : 12}s ease-in-out infinite alternate` }} />
    </span>
  )
  return (
    <div className="fa fa-voice" ref={box}>
      <div className="fa-stage" style={{ width: VOICE_W, height: VOICE_H, transform: `translate(-50%, -50%) scale(${s})` }}>
        <div className="vrec">
          <div className="vorb" style={{ width: ORB, height: ORB, animation: rec ? 'none' : 'breathe 6s ease-in-out infinite' }}>
            {layer(halo2, 0, 30, 20, true)}
            {layer(halo, ORB * 0.093, 24, 30, true)}
            {layer(orb, ORB * 0.18, 16, 45, false)}
          </div>
          <span className="vclock" style={{ color: rec ? '#e5484d' : 'var(--ink)' }}>
            <span className="vdot" style={{ width: rec ? 10 : 0, marginLeft: rec ? 0 : -10, animation: rec ? 'recDot 1.2s ease-in-out infinite' : 'none' }} />
            0:{String(secs).padStart(2, '0')}
          </span>
        </div>
        <span className="vmic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {rec ? <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" stroke="none" /> : <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>}
          </svg>
        </span>
      </div>
    </div>
  )
}

/* A semester recap: the Recap book's cover (Receive.jsx). Its entrance replays every few seconds. */
const COVER_W = 390, COVER_H = 400
const POSTAGE = ['mom-changi.webp', 'me-six-flags.webp', 'mom-albania-still.webp']
function Recap() {
  const box = useRef(null)
  const s = useFit(box, 0.92, COVER_H)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (calm()) return
    const t = setInterval(() => setRun((n) => n + 1), 7000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fa fa-recap" ref={box}>
      <span className="glow-a" />
      <span className="glow-b" />
      <div key={run} className="fa-stage cover" style={{ width: COVER_W, height: COVER_H, transform: `translate(-50%, -50%) scale(${s})` }}>
        <span className="label cover-in" style={{ animation: 'popIn .6s cubic-bezier(.16,1,.3,1) both' }}>Fall 2026</span>
        <h4 className="cover-title" aria-label="Your fall, in letters">
          <span className="mask"><span style={{ animationDelay: '.1s' }}>Your fall,</span></span>
          <span className="mask"><span style={{ animationDelay: '.22s' }}>in letters</span></span>
        </h4>
        <div className="cover-stack">
          {POSTAGE.map((p, k) => (
            <div key={p} className="postage-wrap" style={{ left: 30 + k * 52, top: k === 1 ? 0 : 18, '--tilt': `${[-9, 3, 11][k]}deg`, zIndex: k === 1 ? 2 : 1, animationDelay: `${0.35 + [0.08, 0, 0.16][k]}s` }}>
              <div className="postage"><img src={media(p)} alt="" /></div>
            </div>
          ))}
        </div>
        <span className="small cover-stats">9 letters · 8 photos · 1 voice note</span>
      </div>
    </div>
  )
}

export const FEATURE_ART = { deck: Deck, working: Working, stamps: Stamps, sealed: Sealed, voice: Voice, recap: Recap }
