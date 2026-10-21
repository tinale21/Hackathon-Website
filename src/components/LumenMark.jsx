// Same mark as the app (Hackathon/src/screens/Onboarding.jsx): eight rounded petals in a ring.
export function LumenMark({ size = 26, color = '#111214' }) {
  return (
    <svg width={size} height={size} viewBox="-27 -27 54 54" aria-hidden="true">
      <g fill={color}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="-3.86" y="-5.40" width="7.71" height="10.80" rx="1.80" transform={`rotate(${a}) translate(0 -21.60)`} />)}
      </g>
    </svg>
  )
}

export function Lockup({ size = 22 }) {
  return (
    <span className="lockup" role="img" aria-label="Lumen">
      <LumenMark size={size} /><span className="lockup-word" style={{ fontSize: size }}>lumen</span>
    </span>
  )
}
