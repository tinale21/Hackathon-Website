import { useLayoutEffect, useRef } from 'react'

// Same mark as the app (Hackathon/src/screens/Onboarding.jsx): eight rounded petals in a ring.
export function LumenMark({ size = 26, color = '#111214' }) {
  return (
    <svg className="lumen-mark" width={size} height={size} viewBox="-27 -27 54 54" aria-hidden="true">
      <g fill={color}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="-3.86" y="-5.40" width="7.71" height="10.80" rx="1.80" transform={`rotate(${a}) translate(0 -21.60)`} />)}
      </g>
    </svg>
  )
}

// Centers the wordmark's letters (baseline to the top of the "l") on the mark's center line,
// whatever font metrics the browser ends up with. Ported from the app's fitLockup (Onboarding.jsx).
function fitLockup(el) {
  const mark = el && el.querySelector('.lumen-mark'), word = el && el.querySelector('.lockup-word')
  if (!mark || !word) return
  word.style.transform = 'none'
  const cs = getComputedStyle(word)
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
  const asc = ctx.measureText('lumen').actualBoundingBoxAscent
  const probe = document.createElement('span')
  probe.style.cssText = 'display:inline-block;width:0;height:0'
  word.appendChild(probe)
  const baseline = probe.getBoundingClientRect().top
  probe.remove()
  // Measure in the lockup's own pixels, even while an animation scales it.
  const m = mark.getBoundingClientRect(), zoom = m.height / (mark.getAttribute('height') || m.height) || 1
  word.style.transform = `translateY(${((m.top + m.height / 2 - baseline) / zoom + asc / 2).toFixed(2)}px)`
}

export function Lockup({ size = 22, wordSize = size, gap = Math.round(size * 0.32), className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    fitLockup(el)
    if (document.fonts) document.fonts.ready.then(() => fitLockup(el))
  }, [size, wordSize])
  return (
    <span ref={ref} className={`lockup ${className}`} style={{ gap }} role="img" aria-label="Lumen">
      <LumenMark size={size} /><span className="lockup-word" style={{ fontSize: wordSize }}>lumen</span>
    </span>
  )
}
