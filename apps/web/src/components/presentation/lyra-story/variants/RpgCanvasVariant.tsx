import { cn, useReducedMotion } from '@repo/ui'
import { useCallback, useEffect, useRef } from 'react'

export type RpgColors = {
  primary: string
  secondary: string
  hair: string
  dark: string
}

const DEFAULT_COLORS: RpgColors = {
  primary: '#2D7FF9',
  secondary: '#8B5CF6',
  hair: '#2D7FF9',
  dark: '#1a1a3e',
}

type RpgCanvasVariantProps = {
  stage: number
  size: number
  className?: string
  colors?: Partial<RpgColors>
}

// Colors
const SKIN = '#e0c8a8'
const GOLD = '#ffd700'
const SILVER = '#c0c0c0'

// 16x16 grid sprite frames — each is an array of [x, y, color] tuples
type Pixel = [number, number, string]

function getCharacterPixels(stage: number, c: RpgColors): Pixel[] {
  const pixels: Pixel[] = []
  const primaryDark = blendWithBlack(c.primary, 0.35)

  if (stage === 0) {
    pixels.push([8, 9, c.primary])
    return pixels
  }

  if (stage === 1) {
    pixels.push([8, 8, c.primary], [7, 9, c.secondary], [9, 9, c.secondary])
    return pixels
  }

  if (stage === 2) {
    pixels.push(
      [7, 7, c.primary], [8, 7, c.primary], [9, 7, c.primary],
      [7, 8, c.primary], [8, 8, '#ff4444'], [9, 8, c.primary],
      [7, 9, c.primary], [8, 9, c.primary], [9, 9, c.primary]
    )
    return pixels
  }

  // Base character (stage 3+)
  for (let x = 7; x <= 10; x++) for (let y = 3; y <= 6; y++) pixels.push([x, y, SKIN])
  pixels.push([8, 4, c.dark], [10, 4, c.dark])
  for (let x = 7; x <= 10; x++) for (let y = 7; y <= 10; y++) pixels.push([x, y, c.primary])
  for (let y = 11; y <= 13; y++) {
    pixels.push([7, y, c.dark], [8, y, c.dark], [9, y, c.dark], [10, y, c.dark])
  }

  if (stage >= 4) pixels.push([8, 5, '#c89878'], [9, 5, '#c89878'])
  if (stage >= 5) {
    pixels.push([5, 7, SKIN], [6, 7, SKIN], [11, 7, SKIN], [12, 7, SKIN])
    pixels.push([5, 8, SKIN], [5, 9, SKIN], [12, 8, SKIN], [12, 9, SKIN])
  }
  if (stage >= 6) {
    pixels.push([8, 8, primaryDark], [9, 8, primaryDark], [8, 9, primaryDark], [9, 9, primaryDark])
  }
  if (stage >= 7) {
    for (let y = 4; y <= 11; y++) pixels.push([6, y, c.secondary])
    for (let y = 4; y <= 11; y++) pixels.push([11, y, c.secondary])
    pixels.push([5, 11, c.secondary], [6, 12, c.secondary], [11, 11, c.secondary], [12, 12, c.secondary])
  }
  if (stage >= 8) {
    pixels.push([7, 2, c.hair], [8, 2, c.hair], [9, 2, c.hair], [10, 2, c.hair])
    pixels.push([6, 3, c.hair], [6, 4, c.hair], [11, 3, c.hair], [11, 4, c.hair])
  }
  if (stage >= 9) {
    pixels.push([7, 1, GOLD], [9, 1, GOLD], [8, 0, GOLD], [9, 0, GOLD], [10, 1, GOLD])
  }
  if (stage >= 10) {
    pixels.push([8, 4, c.primary], [10, 4, c.primary])
  }
  if (stage >= 11) {
    pixels.push([2, 5, c.primary], [15, 5, c.secondary], [2, 12, c.secondary])
  }
  if (stage >= 12) {
    pixels.push(
      [13, 5, SILVER], [13, 6, SILVER],
      [13, 7, '#a0a0a0'], [13, 8, '#a0a0a0'], [13, 9, '#a0a0a0'],
      [12, 7, GOLD], [14, 7, GOLD]
    )
  }
  if (stage >= 13) {
    pixels.push(
      [3, 7, c.primary], [4, 7, c.primary],
      [3, 8, c.primary], [4, 8, primaryDark],
      [3, 9, c.primary], [4, 9, primaryDark],
      [4, 8, GOLD]
    )
  }
  if (stage >= 14) {
    pixels.push([6, 0, GOLD], [11, 0, GOLD], [4, 2, GOLD], [13, 2, GOLD])
  }
  if (stage >= 16) {
    pixels.push([6, 13, '#4a2800'], [7, 13, '#4a2800'], [10, 13, '#4a2800'], [11, 13, '#4a2800'])
    pixels.push([8, 5, '#ff9999'], [9, 5, '#ff9999'])
  }

  return pixels
}

function blendWithBlack(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const nr = Math.round(r * (1 - amount))
  const ng = Math.round(g * (1 - amount))
  const nb = Math.round(b * (1 - amount))
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`
}

export function RpgCanvasVariant({ stage, size, className, colors }: RpgCanvasVariantProps) {
  const c: RpgColors = { ...DEFAULT_COLORS, ...colors }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const reducedMotion = useReducedMotion()

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const w = 18
      const h = 18
      canvas.width = w * dpr * (size / 18)
      canvas.height = h * dpr * (size / 18)
      ctx.setTransform(dpr * (size / 18), 0, 0, dpr * (size / 18), 0, 0)

      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = false

      // Idle bounce (2-frame animation)
      const bounce = !reducedMotion && stage >= 3 ? (Math.sin(timestamp / 400) > 0.3 ? -0.5 : 0) : 0

      // Glitch offset for stage 2
      const glitchX = stage === 2 && !reducedMotion ? Math.sin(timestamp / 50) * 0.5 : 0

      const pixels = getCharacterPixels(stage, c)

      ctx.save()
      ctx.translate(glitchX, bounce)

      for (const [x, y, color] of pixels) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, 1, 1)
      }

      ctx.restore()

      // XP bar
      if (stage >= 3) {
        const t = stage / 16
        ctx.fillStyle = c.dark
        ctx.fillRect(1, 16, 16, 1)
        ctx.fillStyle = c.primary
        ctx.fillRect(1, 16, 16 * t, 1)
      }

      frameRef.current = requestAnimationFrame(draw)
    },
    [stage, size, reducedMotion]
  )

  useEffect(() => {
    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={cn('transition-all duration-500', className)}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
      role="img"
    />
  )
}
