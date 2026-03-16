import { cn, useReducedMotion } from '@repo/ui'
import { useId } from 'react'

type LyraLogoProps = {
  size?: number
  className?: string
  animated?: boolean
}

export function LyraLogo({ size = 200, className, animated = true }: LyraLogoProps) {
  const uid = useId()
  const reducedMotion = useReducedMotion()
  const animate = animated && !reducedMotion

  // Unique IDs for SVG defs
  const ids = {
    coreGrad: `ll-core-grad-${uid}`,
    auraGrad: `ll-aura-grad-${uid}`,
    arcGrad: `ll-arc-grad-${uid}`,
    innerGlow: `ll-inner-glow-${uid}`,
    softBlur: `ll-soft-blur-${uid}`,
    coreBlur: `ll-core-blur-${uid}`,
    auraBlur: `ll-aura-blur-${uid}`,
    particleBlur: `ll-particle-blur-${uid}`,
    ring1: `ll-ring1-${uid}`,
    ring2: `ll-ring2-${uid}`,
    ring3: `ll-ring3-${uid}`,
  }

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn(className)}
      aria-hidden="true"
      role="img"
    >
      {animate && (
        <style>{`
          @keyframes ll-core-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes ll-aura-breathe {
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50% { opacity: 0.18; transform: scale(1.08); }
          }
          @keyframes ll-ring1-spin {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(360deg); }
          }
          @keyframes ll-ring2-spin {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(-360deg); }
          }
          @keyframes ll-ring3-spin {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(360deg); }
          }
          @keyframes ll-electron1 {
            from { transform: rotateZ(0deg); }
            to { transform: rotateZ(360deg); }
          }
          @keyframes ll-electron2 {
            from { transform: rotateZ(120deg); }
            to { transform: rotateZ(480deg); }
          }
          @keyframes ll-electron3 {
            from { transform: rotateZ(240deg); }
            to { transform: rotateZ(600deg); }
          }
          @keyframes ll-arc-flicker1 {
            0%, 100% { opacity: 0.3; }
            30% { opacity: 1.0; }
            60% { opacity: 0.5; }
            80% { opacity: 0.9; }
          }
          @keyframes ll-arc-flicker2 {
            0%, 100% { opacity: 0.4; }
            20% { opacity: 0.8; }
            50% { opacity: 0.2; }
            75% { opacity: 1.0; }
          }
          @keyframes ll-arc-flicker3 {
            0%, 100% { opacity: 0.2; }
            40% { opacity: 1.0; }
            70% { opacity: 0.6; }
          }
          @keyframes ll-arc-flicker4 {
            0%, 100% { opacity: 0.5; }
            15% { opacity: 0.2; }
            55% { opacity: 1.0; }
            85% { opacity: 0.3; }
          }
          @keyframes ll-arc-flicker5 {
            0%, 100% { opacity: 0.3; }
            35% { opacity: 0.9; }
            65% { opacity: 0.4; }
          }
          @keyframes ll-arc-flicker6 {
            0%, 100% { opacity: 0.6; }
            25% { opacity: 0.2; }
            60% { opacity: 1.0; }
          }
          @keyframes ll-particle-drift1 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.6; }
            33% { transform: translate(3px, -4px); opacity: 0.3; }
            66% { transform: translate(-2px, 3px); opacity: 0.7; }
          }
          @keyframes ll-particle-drift2 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.4; }
            50% { transform: translate(-4px, -3px); opacity: 0.8; }
          }
          @keyframes ll-particle-drift3 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
            40% { transform: translate(5px, 2px); opacity: 0.2; }
            80% { transform: translate(-3px, -5px); opacity: 0.7; }
          }
          @keyframes ll-particle-drift4 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.3; }
            60% { transform: translate(2px, 5px); opacity: 0.7; }
          }
          @keyframes ll-particle-drift5 {
            0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
            45% { transform: translate(-5px, 1px); opacity: 0.2; }
          }
        `}</style>
      )}

      <defs>
        {/* Core sphere gradient */}
        <radialGradient id={ids.coreGrad} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="1" />
          <stop offset="30%" stopColor="#2D7FF9" stopOpacity="1" />
          <stop offset="70%" stopColor="#8B5CF6" stopOpacity="1" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.9" />
        </radialGradient>

        {/* Electromagnetic aura gradient */}
        <radialGradient id={ids.auraGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#2D7FF9" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2D7FF9" stopOpacity="0" />
        </radialGradient>

        {/* Lightning arc gradient */}
        <linearGradient id={ids.arcGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2D7FF9" stopOpacity="0.4" />
        </linearGradient>

        {/* Inner glow blur */}
        <filter id={ids.innerGlow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Soft blur for aura */}
        <filter id={ids.auraBlur} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        {/* Core inner glow */}
        <filter id={ids.coreBlur} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/* Soft particle blur */}
        <filter id={ids.particleBlur} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        {/* Soft blur for arc paths */}
        <filter id={ids.softBlur} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      {/* ── Electromagnetic aura (outermost, behind everything) ── */}
      <circle
        cx="100"
        cy="100"
        r="72"
        fill={`url(#${ids.auraGrad})`}
        filter={`url(#${ids.auraBlur})`}
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-aura-breathe 3.2s ease-in-out infinite',
        } : { opacity: 0.12 }}
      />

      {/* ── Orbital ring 1 — tilted -35deg, electric blue ── */}
      <g
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-ring1-spin 8s linear infinite',
        } : undefined}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="62"
          ry="22"
          fill="none"
          stroke="#2D7FF9"
          strokeWidth="0.8"
          opacity="0.55"
          transform="rotate(-35, 100, 100)"
        />
        {/* Electron on ring 1 */}
        <circle
          cx="162"
          cy="100"
          r="3"
          fill="#7dd3fc"
          opacity="0.9"
          filter={`url(#${ids.particleBlur})`}
          transform="rotate(-35, 100, 100)"
        />
        <circle
          cx="38"
          cy="100"
          r="2"
          fill="#2D7FF9"
          opacity="0.7"
          filter={`url(#${ids.particleBlur})`}
          transform="rotate(-35, 100, 100)"
        />
      </g>

      {/* ── Orbital ring 2 — tilted +55deg, violet ── */}
      <g
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-ring2-spin 12s linear infinite',
        } : undefined}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="58"
          ry="18"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.6"
          opacity="0.45"
          transform="rotate(55, 100, 100)"
        />
        {/* Electron on ring 2 */}
        <circle
          cx="158"
          cy="100"
          r="2.5"
          fill="#a78bfa"
          opacity="0.85"
          filter={`url(#${ids.particleBlur})`}
          transform="rotate(55, 100, 100)"
        />
      </g>

      {/* ── Orbital ring 3 — near-horizontal, thin cyan ── */}
      <g
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-ring3-spin 18s linear infinite',
        } : undefined}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="68"
          ry="10"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.5"
          opacity="0.3"
          transform="rotate(10, 100, 100)"
        />
        {/* Two electrons on ring 3 */}
        <circle
          cx="168"
          cy="100"
          r="2"
          fill="#06b6d4"
          opacity="0.75"
          filter={`url(#${ids.particleBlur})`}
          transform="rotate(10, 100, 100)"
        />
        <circle
          cx="32"
          cy="100"
          r="1.5"
          fill="#06b6d4"
          opacity="0.5"
          filter={`url(#${ids.particleBlur})`}
          transform="rotate(10, 100, 100)"
        />
      </g>

      {/* ── Lightning arcs ── */}
      {/* Arc 1 — upper right */}
      <path
        d="M 100 100 L 115 88 L 122 82 L 130 74 L 138 70"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker1 0.9s ease-in-out infinite',
          animationDelay: '0s',
        } : { opacity: 0.6 }}
      />
      {/* Arc 2 — right */}
      <path
        d="M 100 100 L 118 95 L 128 92 L 140 88 L 150 86"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="1.0"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker2 1.3s ease-in-out infinite',
          animationDelay: '0.2s',
        } : { opacity: 0.5 }}
      />
      {/* Arc 3 — lower right */}
      <path
        d="M 100 100 L 113 112 L 120 120 L 126 130 L 134 138"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker3 1.1s ease-in-out infinite',
          animationDelay: '0.45s',
        } : { opacity: 0.55 }}
      />
      {/* Arc 4 — upper left */}
      <path
        d="M 100 100 L 86 88 L 80 80 L 72 72 L 66 64"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="1.0"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker4 0.8s ease-in-out infinite',
          animationDelay: '0.15s',
        } : { opacity: 0.6 }}
      />
      {/* Arc 5 — left */}
      <path
        d="M 100 100 L 84 96 L 74 92 L 62 89 L 52 88"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker5 1.5s ease-in-out infinite',
          animationDelay: '0.6s',
        } : { opacity: 0.45 }}
      />
      {/* Arc 6 — top */}
      <path
        d="M 100 100 L 96 83 L 100 72 L 96 60 L 100 50"
        stroke={`url(#${ids.arcGrad})`}
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        filter={`url(#${ids.softBlur})`}
        style={animate ? {
          animation: 'll-arc-flicker6 1.0s ease-in-out infinite',
          animationDelay: '0.35s',
        } : { opacity: 0.55 }}
      />

      {/* ── Particle field ── */}
      {/* Each particle: small circle with individual drift animation */}
      <circle cx="68" cy="58" r="2" fill="#7dd3fc" opacity="0.6"
        style={animate ? { animation: 'll-particle-drift1 4.1s ease-in-out infinite' } : undefined} />
      <circle cx="140" cy="65" r="1.5" fill="#a78bfa" opacity="0.5"
        style={animate ? { animation: 'll-particle-drift2 5.3s ease-in-out infinite' } : undefined} />
      <circle cx="148" cy="118" r="2.5" fill="#2D7FF9" opacity="0.4"
        style={animate ? { animation: 'll-particle-drift3 3.7s ease-in-out infinite' } : undefined} />
      <circle cx="60" cy="130" r="1.5" fill="#06b6d4" opacity="0.55"
        style={animate ? { animation: 'll-particle-drift4 6.1s ease-in-out infinite' } : undefined} />
      <circle cx="130" cy="148" r="2" fill="#7dd3fc" opacity="0.35"
        style={animate ? { animation: 'll-particle-drift5 4.8s ease-in-out infinite' } : undefined} />
      <circle cx="52" cy="95" r="1" fill="#ffffff" opacity="0.45"
        style={animate ? { animation: 'll-particle-drift1 3.3s ease-in-out infinite', animationDelay: '0.7s' } : undefined} />
      <circle cx="155" cy="95" r="1.5" fill="#a78bfa" opacity="0.4"
        style={animate ? { animation: 'll-particle-drift2 5.8s ease-in-out infinite', animationDelay: '1.2s' } : undefined} />
      <circle cx="100" cy="42" r="1" fill="#7dd3fc" opacity="0.55"
        style={animate ? { animation: 'll-particle-drift3 4.5s ease-in-out infinite', animationDelay: '0.3s' } : undefined} />
      <circle cx="78" cy="148" r="2" fill="#2D7FF9" opacity="0.3"
        style={animate ? { animation: 'll-particle-drift4 7.2s ease-in-out infinite', animationDelay: '0.9s' } : undefined} />
      <circle cx="126" cy="55" r="1.5" fill="#ffffff" opacity="0.5"
        style={animate ? { animation: 'll-particle-drift5 3.9s ease-in-out infinite', animationDelay: '0.5s' } : undefined} />
      {/* Comet-like particles with trail using gradient blur */}
      <circle cx="58" cy="72" r="3" fill="#2D7FF9" opacity="0.45"
        filter={`url(#${ids.particleBlur})`}
        style={animate ? { animation: 'll-particle-drift2 5.0s ease-in-out infinite', animationDelay: '1.5s' } : undefined} />
      <circle cx="143" cy="135" r="2.5" fill="#a78bfa" opacity="0.35"
        filter={`url(#${ids.particleBlur})`}
        style={animate ? { animation: 'll-particle-drift1 6.4s ease-in-out infinite', animationDelay: '0.8s' } : undefined} />
      <circle cx="110" cy="158" r="1.5" fill="#06b6d4" opacity="0.5"
        style={animate ? { animation: 'll-particle-drift3 4.2s ease-in-out infinite', animationDelay: '0.2s' } : undefined} />
      <circle cx="44" cy="115" r="1" fill="#7dd3fc" opacity="0.6"
        style={animate ? { animation: 'll-particle-drift4 5.5s ease-in-out infinite', animationDelay: '1.1s' } : undefined} />
      <circle cx="162" cy="78" r="1" fill="#ffffff" opacity="0.25"
        style={animate ? { animation: 'll-particle-drift5 7.0s ease-in-out infinite', animationDelay: '0.4s' } : undefined} />

      {/* ── Core sphere — inner glow layer ── */}
      <circle
        cx="100"
        cy="100"
        r="36"
        fill="#2D7FF9"
        opacity="0.25"
        filter={`url(#${ids.coreBlur})`}
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-core-pulse 2.8s ease-in-out infinite',
        } : undefined}
      />

      {/* ── Core sphere — main body ── */}
      <circle
        cx="100"
        cy="100"
        r="28"
        fill={`url(#${ids.coreGrad})`}
        filter={`url(#${ids.innerGlow})`}
        style={animate ? {
          transformOrigin: '100px 100px',
          animation: 'll-core-pulse 2.8s ease-in-out infinite',
        } : undefined}
      />

      {/* ── Core sphere — specular highlight ── */}
      <ellipse
        cx="92"
        cy="88"
        rx="10"
        ry="7"
        fill="white"
        opacity="0.18"
      />

      {/* ── Core center bright point ── */}
      <circle
        cx="100"
        cy="100"
        r="8"
        fill="white"
        opacity="0.35"
        filter={`url(#${ids.particleBlur})`}
      />
    </svg>
  )
}
