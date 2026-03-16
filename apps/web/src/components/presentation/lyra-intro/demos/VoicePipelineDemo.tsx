'use client'

import { useEffect, useState } from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

// ─── Theme detection ──────────────────────────────────────────────────────────

function useIsDark() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () => {
      const html = document.documentElement
      setIsDark(html.classList.contains('dark') || html.getAttribute('data-theme') === 'dark')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    return () => observer.disconnect()
  }, [])
  return isDark
}

// ─── Color tokens (matching VoiceSection.tsx palette) ────────────────────────

const STT_COLOR    = '#ec4899'  // pink
const TTS_COLOR    = '#06b6d4'  // cyan/teal
const HUB_COLOR    = '#6366f1'  // indigo
const AGENT_COLOR  = '#a78bfa'  // violet
const LLM_COLOR    = '#f59e0b'  // amber
const OUTPUT_COLOR = '#34d399'  // emerald

const DARK_BG         = '#0d1117'
const DARK_TEXT        = '#e8eaed'
const DARK_PANEL_BG    = 'rgba(255,255,255,0.04)'
const DARK_PANEL_BORDER = 'rgba(255,255,255,0.08)'

const LIGHT_BG         = '#ffffff'
const LIGHT_TEXT        = '#1e293b'
const LIGHT_PANEL_BG    = 'rgba(0,0,0,0.04)'
const LIGHT_PANEL_BORDER = 'rgba(0,0,0,0.08)'

// ─── Pipeline node definitions ───────────────────────────────────────────────

type PipelineNode = {
  id: string
  label: string
  color: string
  activeFrame: number
  deactiveFrame: number
}

// Timeline:
// 0–30   : waveform appears
// 30–90  : STT active, text appears
// 90–120 : Hub active
// 120–150: Agent active
// 150–210: LLM active, response text appears
// 210–240: TTS active
// 240–270: output waveform appears
// 270–300: "voice message sent"

const NODES: PipelineNode[] = [
  { id: 'stt',   label: 'STT',   color: STT_COLOR,   activeFrame: 30,  deactiveFrame: 90  },
  { id: 'hub',   label: 'Hub',   color: HUB_COLOR,   activeFrame: 90,  deactiveFrame: 120 },
  { id: 'agent', label: 'Agent', color: AGENT_COLOR, activeFrame: 120, deactiveFrame: 150 },
  { id: 'llm',   label: 'LLM',   color: LLM_COLOR,   activeFrame: 150, deactiveFrame: 210 },
  { id: 'tts',   label: 'TTS',   color: TTS_COLOR,   activeFrame: 210, deactiveFrame: 270 },
]

// ─── Waveform SVG path builder ────────────────────────────────────────────────

const VOICE_HEIGHTS_IN  = [0.2, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.3, 0.6, 0.8, 0.4, 0.9, 0.5, 0.3, 0.7, 0.8, 0.4, 0.6]
const VOICE_HEIGHTS_OUT = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.7, 0.9, 0.5, 0.4, 0.8, 0.6, 0.7, 0.3, 0.9, 0.5, 0.6]

type WaveformProps = {
  bars: number[]
  color: string
  width: number
  height: number
  progress: number
}

function Waveform({ bars, color, width, height, progress }: WaveformProps) {
  const barW = Math.floor(width / (bars.length * 2 - 1))
  const stride = barW * 2
  const revealCount = Math.floor(progress * bars.length)

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {bars.map((h, i) => {
        const barH = Math.max(4, h * (height - 8))
        const x = i * stride
        const y = (height - barH) / 2
        const revealed = i <= revealCount

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={barW / 2}
            fill={color}
            opacity={revealed ? 0.85 : 0.18}
          />
        )
      })}
    </svg>
  )
}

// ─── Flowing particles along a connection ────────────────────────────────────

type FlowingParticlesProps = {
  x1: number
  y: number
  x2: number
  color: string
  active: boolean
  frame: number
}

function FlowingParticles({ x1, y, x2, color, active, frame }: FlowingParticlesProps) {
  if (!active) {
    return (
      <line
        x1={x1} y1={y} x2={x2} y2={y}
        stroke={color}
        strokeWidth={1}
        opacity={0.15}
      />
    )
  }

  const lineLen = x2 - x1
  const numParticles = 3

  return (
    <g>
      {/* Base line */}
      <line
        x1={x1} y1={y} x2={x2} y2={y}
        stroke={color}
        strokeWidth={1}
        opacity={0.35}
      />
      {/* Particles */}
      {Array.from({ length: numParticles }).map((_, i) => {
        const offset = ((frame * 1.5 + (i * lineLen) / numParticles) % lineLen)
        const px = x1 + offset

        if (px < x1 || px > x2) return null

        return (
          <circle key={i} cx={px} cy={y} r={3} fill={color} opacity={0.9} />
        )
      })}
    </g>
  )
}

// ─── Pipeline node box ────────────────────────────────────────────────────────

type NodeBoxProps = {
  x: number
  y: number
  w: number
  h: number
  label: string
  color: string
  active: boolean
  activeProgress: number
}

function NodeBox({ x, y, w, h, label, color, active, activeProgress }: NodeBoxProps) {
  const glowOpacity   = active ? interpolate(activeProgress, [0, 1], [0, 0.6]) : 0
  const borderOpacity = active ? interpolate(activeProgress, [0, 1], [0.3, 1]) : 0.2
  const bgOpacity     = active ? interpolate(activeProgress, [0, 1], [0.05, 0.2]) : 0.05

  return (
    <g>
      {/* Glow */}
      {active && (
        <rect
          x={x - 6} y={y - 6}
          width={w + 12} height={h + 12}
          rx={10}
          fill={color}
          opacity={glowOpacity * 0.3}
          style={{ filter: 'blur(8px)' }}
        />
      )}
      {/* Box */}
      <rect
        x={x} y={y}
        width={w} height={h}
        rx={6}
        fill={color}
        fillOpacity={bgOpacity}
        stroke={color}
        strokeWidth={1.5}
        strokeOpacity={borderOpacity}
      />
      {/* Label */}
      <text
        x={x + w / 2}
        y={y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11}
        fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
        fontWeight="700"
        fill={color}
        fillOpacity={active ? 1 : 0.45}
      >
        {label}
      </text>
    </g>
  )
}

// ─── Text label with fade-in ──────────────────────────────────────────────────

type FadingTextProps = {
  children: React.ReactNode
  enterFrame: number
  fps: number
  style?: React.CSSProperties
}

function FadingText({ children, enterFrame, fps, style }: FadingTextProps) {
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 200, mass: 0.8 },
  })
  const opacity    = interpolate(progress, [0, 1], [0, 1])
  const translateY = interpolate(progress, [0, 1], [8, 0])

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, ...style }}>
      {children}
    </div>
  )
}

// ─── Main Composition ─────────────────────────────────────────────────────────

export function VoicePipelineScene() {
  const frame = useCurrentFrame()
  const { fps, width } = useVideoConfig()
  const isDark = useIsDark()

  const BG_COLOR     = isDark ? DARK_BG          : LIGHT_BG
  const TEXT_COLOR   = isDark ? DARK_TEXT         : LIGHT_TEXT
  const PANEL_BG     = isDark ? DARK_PANEL_BG     : LIGHT_PANEL_BG
  const PANEL_BORDER = isDark ? DARK_PANEL_BORDER : LIGHT_PANEL_BORDER

  // ── Layout constants ──
  const SVG_W = width - 40
  const SVG_H = 120
  const NODE_W = 64
  const NODE_H = 36
  const NODE_Y = (SVG_H - NODE_H) / 2

  const TOTAL_NODES = NODES.length
  const SPACING = SVG_W / (TOTAL_NODES + 1)

  const nodePositions = NODES.map((_, i) => ({
    x:  SPACING * (i + 1) - NODE_W / 2,
    cx: SPACING * (i + 1),
  }))

  function nodeActiveProgress(node: PipelineNode) {
    return spring({
      frame: frame - node.activeFrame,
      fps,
      config: { damping: 18, stiffness: 280, mass: 0.6 },
    })
  }

  const isActive = (node: PipelineNode) =>
    frame >= node.activeFrame && frame < node.deactiveFrame

  const showInWaveform  = frame >= 0
  const showText        = frame >= 60
  const showOutText     = frame >= 180
  const showOutWaveform = frame >= 240
  const showSentLabel   = frame >= 270

  const inWaveProgress  = interpolate(frame, [0, 30],   [0, 1], { extrapolateRight: 'clamp' })
  const outWaveProgress = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: BG_COLOR,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 20,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── Title ── */}
      <div
        style={{
          color: STT_COLOR,
          fontSize: 11,
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Voice Pipeline
      </div>

      {/* ── Input waveform ── */}
      {showInWaveform && (
        <FadingText enterFrame={0} fps={fps} style={{ textAlign: 'center' }}>
          <div
            style={{
              background: PANEL_BG,
              border: `1px solid ${PANEL_BORDER}`,
              borderRadius: 12,
              padding: '10px 16px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                color: STT_COLOR,
                fontSize: 10,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.08em',
                opacity: 0.7,
              }}
            >
              INCOMING VOICE MSG
            </div>
            <Waveform
              bars={VOICE_HEIGHTS_IN}
              color={STT_COLOR}
              width={180}
              height={40}
              progress={inWaveProgress}
            />
          </div>
        </FadingText>
      )}

      {/* ── Pipeline SVG ── */}
      <div style={{ width: SVG_W }}>
        <svg
          width={SVG_W}
          height={SVG_H}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          aria-label="Voice pipeline: STT → Hub → Agent → LLM → TTS"
          role="img"
        >
          {NODES.slice(0, -1).map((node, i) => {
            const fromCx      = nodePositions[i]!.cx + NODE_W / 2
            const toCx        = nodePositions[i + 1]!.cx - NODE_W / 2
            const nodeIsActive = isActive(node) || isActive(NODES[i + 1]!)

            return (
              <FlowingParticles
                key={node.id}
                x1={fromCx}
                y={SVG_H / 2}
                x2={toCx}
                color={node.color}
                active={nodeIsActive}
                frame={frame}
              />
            )
          })}

          {NODES.map((node, i) => {
            const pos      = nodePositions[i]!
            const active   = isActive(node)
            const progress = nodeActiveProgress(node)

            return (
              <NodeBox
                key={node.id}
                x={pos.x}
                y={NODE_Y}
                w={NODE_W}
                h={NODE_H}
                label={node.label}
                color={node.color}
                active={active}
                activeProgress={progress}
              />
            )
          })}
        </svg>
      </div>

      {/* ── Transcribed text ── */}
      {showText && (
        <FadingText enterFrame={60} fps={fps}>
          <div
            style={{
              background: PANEL_BG,
              border: `1px solid ${STT_COLOR}33`,
              borderRadius: 10,
              padding: '10px 16px',
              maxWidth: 320,
            }}
          >
            <div
              style={{
                color: STT_COLOR,
                fontSize: 9,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.1em',
                marginBottom: 6,
                opacity: 0.7,
              }}
            >
              TRANSCRIBED
            </div>
            <div
              style={{
                color: TEXT_COLOR,
                fontSize: 14,
                fontFamily: 'system-ui, sans-serif',
                lineHeight: 1.5,
              }}
            >
              "What's the weather in Paris?"
            </div>
          </div>
        </FadingText>
      )}

      {/* ── LLM response text ── */}
      {showOutText && (
        <FadingText enterFrame={180} fps={fps}>
          <div
            style={{
              background: PANEL_BG,
              border: `1px solid ${LLM_COLOR}33`,
              borderRadius: 10,
              padding: '10px 16px',
              maxWidth: 320,
            }}
          >
            <div
              style={{
                color: LLM_COLOR,
                fontSize: 9,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.1em',
                marginBottom: 6,
                opacity: 0.7,
              }}
            >
              RESPONSE
            </div>
            <div
              style={{
                color: TEXT_COLOR,
                fontSize: 14,
                fontFamily: 'system-ui, sans-serif',
                lineHeight: 1.5,
              }}
            >
              "It's 22°C and sunny in Paris today."
            </div>
          </div>
        </FadingText>
      )}

      {/* ── Output waveform ── */}
      {showOutWaveform && (
        <FadingText enterFrame={240} fps={fps} style={{ textAlign: 'center' }}>
          <div
            style={{
              background: PANEL_BG,
              border: `1px solid ${PANEL_BORDER}`,
              borderRadius: 12,
              padding: '10px 16px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Waveform
              bars={VOICE_HEIGHTS_OUT}
              color={TTS_COLOR}
              width={180}
              height={40}
              progress={outWaveProgress}
            />
            {showSentLabel && (
              <div
                style={{
                  color: OUTPUT_COLOR,
                  fontSize: 10,
                  fontFamily: 'ui-monospace, monospace',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  opacity: interpolate(frame, [270, 285], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                VOICE MESSAGE SENT
              </div>
            )}
          </div>
        </FadingText>
      )}
    </AbsoluteFill>
  )
}
