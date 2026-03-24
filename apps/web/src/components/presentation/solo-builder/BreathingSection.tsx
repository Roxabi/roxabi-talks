import { useReducedMotion } from '@repo/ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import { m } from '@/paraglide/messages'

const PIXEL = 6
const COLS = 48
const ROWS = 32

// Palette
const SKY_TOP = '#1a1a2e'
const SKY_BOT = '#16213e'
const GROUND = '#2a1f0e'
const STEM = '#2d5a27'
const STEM_DARK = '#1e3d1a'
const LEAF_1 = '#4a8c3f'
const LEAF_2 = '#5ea84e'
const LEAF_3 = '#78c45f'
const LEAF_TIP = '#8ed66e'
const POT = '#8b5e3c'
const POT_RIM = '#a0714b'

type Pixel = [number, number, string]

function getPlantPixels(frame: number): Pixel[] {
  const px: Pixel[] = []
  const sway = Math.sin(frame * 0.04) * 0.8

  // Ground line
  for (let x = 0; x < COLS; x++) {
    px.push([x, ROWS - 1, GROUND])
    px.push([x, ROWS - 2, GROUND])
  }

  // Pot
  const potCx = 24
  for (let y = ROWS - 5; y <= ROWS - 3; y++) {
    const w = y === ROWS - 5 ? 4 : y === ROWS - 4 ? 3 : 3
    for (let dx = -w; dx <= w; dx++) {
      px.push([potCx + dx, y, y === ROWS - 5 ? POT_RIM : POT])
    }
  }

  // Main stem
  for (let i = 0; i < 12; i++) {
    const sx = Math.round(potCx + Math.sin((i + frame * 0.03) * 0.5) * sway)
    const sy = ROWS - 6 - i
    px.push([sx, sy, i % 3 === 0 ? STEM_DARK : STEM])
  }

  // Leaves (alternate sides, sway with frame)
  const leaves: [number, number, string, string][] = [
    [2, -1, LEAF_1, LEAF_2],
    [4, 1, LEAF_2, LEAF_3],
    [6, -1, LEAF_3, LEAF_TIP],
    [8, 1, LEAF_1, LEAF_3],
    [10, -1, LEAF_2, LEAF_TIP],
  ]

  for (const [stemIdx, dirX, color, tipColor] of leaves) {
    const baseX = Math.round(potCx + Math.sin((stemIdx + frame * 0.03) * 0.5) * sway)
    const baseY = ROWS - 6 - stemIdx
    const leafSway = Math.sin(frame * 0.05 + stemIdx) * 0.3
    for (let l = 1; l <= 4; l++) {
      const lx = Math.round(baseX + dirX * l + leafSway * l)
      const c = l >= 3 ? tipColor : color
      px.push([lx, baseY, c])
      if (l < 3) px.push([lx, baseY - 1, c])
    }
  }

  // Top leaves (small crown)
  const topX = Math.round(potCx + Math.sin((12 + frame * 0.03) * 0.5) * sway)
  const topY = ROWS - 18
  const topSway = Math.sin(frame * 0.045) * 0.4
  px.push([Math.round(topX + topSway), topY, LEAF_3])
  px.push([Math.round(topX - 1 + topSway), topY, LEAF_2])
  px.push([Math.round(topX + 1 + topSway), topY, LEAF_2])
  px.push([Math.round(topX + topSway), topY - 1, LEAF_TIP])

  return px
}

// Bird song — two-note warble with vibrato
function playSong(ctx: AudioContext) {
  const now = ctx.currentTime
  const type = Math.random()

  if (type < 0.4) {
    // Two-note warble (ascending)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()
    vibrato.frequency.value = 12 + Math.random() * 8
    vibratoGain.gain.value = 40 + Math.random() * 30
    vibrato.connect(vibratoGain).connect(osc.frequency)
    osc.type = 'sine'
    const base = 1400 + Math.random() * 800
    osc.frequency.setValueAtTime(base, now)
    osc.frequency.setValueAtTime(base * 1.25, now + 0.12)
    osc.frequency.exponentialRampToValueAtTime(base * 1.5, now + 0.25)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.04, now + 0.015)
    gain.gain.setValueAtTime(0.035, now + 0.1)
    gain.gain.linearRampToValueAtTime(0.045, now + 0.13)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc.connect(gain).connect(ctx.destination)
    vibrato.start(now)
    osc.start(now)
    osc.stop(now + 0.4)
    vibrato.stop(now + 0.4)
  } else if (type < 0.7) {
    // Descending trill
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    const base = 2200 + Math.random() * 600
    osc.frequency.setValueAtTime(base, now)
    for (let i = 0; i < 4; i++) {
      const t = now + i * 0.06
      osc.frequency.setValueAtTime(base - i * 120, t)
      osc.frequency.setValueAtTime(base - i * 120 + 80, t + 0.03)
    }
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.035, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.35)
  } else {
    // Soft coo (low, gentle)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    const base = 600 + Math.random() * 200
    osc.frequency.setValueAtTime(base, now)
    osc.frequency.exponentialRampToValueAtTime(base * 0.85, now + 0.2)
    osc.frequency.exponentialRampToValueAtTime(base * 0.9, now + 0.4)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.03, now + 0.03)
    gain.gain.setValueAtTime(0.025, now + 0.15)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.55)
  }
}

export function BreathingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const animRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const reducedMotion = useReducedMotion()
  const [muted, setMuted] = useState(false)
  const [visible, setVisible] = useState(false)

  // Track visibility — only play sound when this slide is on screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Suspend audio when leaving the slide
  useEffect(() => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    if (visible && !muted) {
      ctx.resume()
    } else {
      ctx.suspend()
    }
  }, [visible, muted])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frame = frameRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
    grad.addColorStop(0, SKY_TOP)
    grad.addColorStop(1, SKY_BOT)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw pixels
    const pixels = getPlantPixels(frame)
    for (const [x, y, color] of pixels) {
      ctx.fillStyle = color
      ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL)
    }

    frameRef.current++

    // Random bird song — only when visible and not muted
    if (!muted && visible && audioCtxRef.current && audioCtxRef.current.state === 'running' && Math.random() < 0.006) {
      playSong(audioCtxRef.current)
    }

    animRef.current = requestAnimationFrame(draw)
  }, [muted, visible])

  useEffect(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }

    if (reducedMotion) {
      frameRef.current = 0
      draw()
      cancelAnimationFrame(animRef.current)
      return
    }
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw, reducedMotion])

  const toggleSound = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    setMuted((m) => !m)
  }, [])

  return (
    <div ref={sectionRef} className="relative mx-auto flex flex-col items-center justify-center gap-6">
      <div className="rounded-lg border border-[var(--sb-accent)]/20 bg-[var(--sb-bg)] p-2 shadow-lg">
        <canvas
          ref={canvasRef}
          width={COLS * PIXEL}
          height={ROWS * PIXEL}
          className="rounded image-rendering-pixelated"
          style={{ width: COLS * PIXEL * 2, height: ROWS * PIXEL * 2, imageRendering: 'pixelated' }}
        />
      </div>

      <button
        type="button"
        onClick={toggleSound}
        className="font-mono text-[11px] text-[var(--sb-dim)] hover:text-[var(--sb-accent)] transition-colors cursor-pointer bg-transparent border-none"
      >
        {muted ? '🔇' : '🔊'} {muted ? m.talk_sb_breathing_unmute() : m.talk_sb_breathing_mute()}
      </button>

      <p className="font-mono text-[10px] text-[var(--sb-dim)]/50 tracking-widest uppercase">
        {m.talk_sb_breathing_pause()}
      </p>
    </div>
  )
}
