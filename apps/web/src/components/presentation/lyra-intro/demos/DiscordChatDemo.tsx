'use client'

import { createContext, useContext, useEffect, useState } from 'react'
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

// ─── Color palettes ───────────────────────────────────────────────────────────

const DARK_PALETTE = {
  BG_PRIMARY:   '#36393f',
  BG_SECONDARY: '#2f3136',
  TEXT_PRIMARY: '#dcddde',
  TEXT_MUTED:   '#72767d',
  TEXT_HEADER:  '#ffffff',
  INPUT_BG:     '#40444b',
  INPUT_TEXT:   '#72767d',
  BORDER:       'rgba(0,0,0,0.3)',
}

const LIGHT_PALETTE = {
  BG_PRIMARY:   '#ffffff',
  BG_SECONDARY: '#f2f3f5',
  TEXT_PRIMARY: '#2e3338',
  TEXT_MUTED:   '#747f8d',
  TEXT_HEADER:  '#060607',
  INPUT_BG:     '#ebedef',
  INPUT_TEXT:   '#747f8d',
  BORDER:       'rgba(0,0,0,0.08)',
}

type Palette = typeof DARK_PALETTE

const PaletteCtx = createContext<Palette>(DARK_PALETTE)
const usePalette = () => useContext(PaletteCtx)

// ─── Shared constants ─────────────────────────────────────────────────────────

const BLURPLE      = '#5865f2'
const BOT_BADGE_BG = '#5865f2'
const EMBED_GREEN  = '#4ade80'
const EMBED_AMBER  = '#fb923c'
const EMBED_PURPLE = '#a78bfa'

// ─── Channel header ───────────────────────────────────────────────────────────

function ChannelHeader() {
  const p = usePalette()
  return (
    <div style={{ flexShrink: 0 }}>
      {/* Server name bar */}
      <div
        style={{
          background: p.BG_SECONDARY,
          borderBottom: `1px solid ${p.BORDER}`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            color: p.TEXT_HEADER,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          My Server
        </span>
      </div>
      {/* Channel name bar */}
      <div
        style={{
          background: p.BG_PRIMARY,
          borderBottom: `1px solid ${p.BORDER}`,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ color: p.TEXT_MUTED, fontSize: 18, fontWeight: 700 }}>#</span>
        <span
          style={{
            color: p.TEXT_HEADER,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          general
        </span>
      </div>
    </div>
  )
}

// ─── User avatar ──────────────────────────────────────────────────────────────

type AvatarProps = {
  initials: string
  color: string
  size?: number
}

function Avatar({ initials, color, size = 38 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

// ─── BOT badge ────────────────────────────────────────────────────────────────

function BotBadge() {
  return (
    <span
      style={{
        background: BOT_BADGE_BG,
        color: '#ffffff',
        fontSize: 9,
        fontWeight: 700,
        fontFamily: 'ui-monospace, monospace',
        padding: '1px 5px',
        borderRadius: 3,
        letterSpacing: '0.05em',
        marginLeft: 6,
        verticalAlign: 'middle',
      }}
    >
      BOT
    </span>
  )
}

// ─── Timestamp ───────────────────────────────────────────────────────────────

function Timestamp({ label }: { label: string }) {
  const p = usePalette()
  return (
    <span
      style={{
        color: p.TEXT_MUTED,
        fontSize: 10,
        fontFamily: 'system-ui, sans-serif',
        marginLeft: 8,
        fontWeight: 400,
      }}
    >
      {label}
    </span>
  )
}

// ─── User message ─────────────────────────────────────────────────────────────

type UserMessageProps = {
  username: string
  avatarColor: string
  initials: string
  time: string
  children: React.ReactNode
  enterFrame: number
  fps: number
}

function UserMessage({ username, avatarColor, initials, time, children, enterFrame, fps }: UserMessageProps) {
  const p = usePalette()
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 220, mass: 0.7 },
  })

  const opacity    = interpolate(progress, [0, 1], [0, 1])
  const translateY = interpolate(progress, [0, 1], [12, 0])

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '4px 16px',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <Avatar initials={initials} color={avatarColor} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span
            style={{
              color: avatarColor,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {username}
          </span>
          <Timestamp label={time} />
        </div>
        <div
          style={{
            color: p.TEXT_PRIMARY,
            fontSize: 14,
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.5,
            marginTop: 2,
            wordBreak: 'break-word',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Embed fields ─────────────────────────────────────────────────────────────

type EmbedField = {
  name: string
  value: string
  valueColor?: string
}

type EmbedProps = {
  title: string
  accentColor: string
  fields: EmbedField[]
}

function DiscordEmbed({ title, accentColor, fields }: EmbedProps) {
  const p = usePalette()
  return (
    <div
      style={{
        background: p.BG_SECONDARY,
        borderRadius: 4,
        borderLeft: `4px solid ${accentColor}`,
        padding: '10px 14px',
        maxWidth: 340,
        marginTop: 6,
      }}
    >
      <div
        style={{
          color: p.TEXT_HEADER,
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
        {fields.map((f, i) => (
          <div key={i}>
            <div
              style={{
                color: p.TEXT_MUTED,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'ui-monospace, monospace',
                letterSpacing: '0.04em',
                marginBottom: 2,
                textTransform: 'uppercase',
              }}
            >
              {f.name}
            </div>
            <div
              style={{
                color: f.valueColor ?? p.TEXT_PRIMARY,
                fontSize: 13,
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
              }}
            >
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Bot message ──────────────────────────────────────────────────────────────

type BotMessageProps = {
  time: string
  children: React.ReactNode
  enterFrame: number
  fps: number
}

function BotMessage({ time, children, enterFrame, fps }: BotMessageProps) {
  const p = usePalette()
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 220, mass: 0.7 },
  })

  const opacity    = interpolate(progress, [0, 1], [0, 1])
  const translateY = interpolate(progress, [0, 1], [12, 0])

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '4px 16px',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Bot avatar */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: `linear-gradient(135deg, #22d3ee 0%, ${BLURPLE} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        ⚡
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              color: '#22d3ee',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Lyra
          </span>
          <BotBadge />
          <Timestamp label={time} />
        </div>

        {/* Content */}
        <div style={{ marginTop: 2, color: p.TEXT_PRIMARY, fontSize: 14, fontFamily: 'system-ui, sans-serif' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

type TypingIndicatorProps = {
  username: string
  enterFrame: number
  fps: number
}

function TypingIndicator({ username, enterFrame, fps }: TypingIndicatorProps) {
  const p = usePalette()
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 22, stiffness: 240, mass: 0.6 },
  })
  const opacity = interpolate(progress, [0, 1], [0, 1])

  const dotBounce = (offset: number) => {
    const t = ((frame - enterFrame + offset) % 18) / 18
    return Math.sin(t * Math.PI) * -4
  }

  return (
    <div
      style={{
        padding: '4px 16px',
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {[0, 6, 12].map((offset, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: p.TEXT_MUTED,
              transform: `translateY(${dotBounce(offset)}px)`,
            }}
          />
        ))}
      </div>
      <span
        style={{
          color: p.TEXT_MUTED,
          fontSize: 12,
          fontFamily: 'system-ui, sans-serif',
          fontStyle: 'italic',
        }}
      >
        <strong style={{ fontStyle: 'normal', fontWeight: 600 }}>{username}</strong> is typing...
      </span>
    </div>
  )
}

// ─── Smart routing table ──────────────────────────────────────────────────────

function RoutingTable() {
  const p = usePalette()
  const rows = [
    { tier: 'trivial',  example: 'ping / status', model: 'haiku',  color: EMBED_GREEN },
    { tier: 'simple',   example: 'summarize',     model: 'haiku',  color: '#2dd4bf' },
    { tier: 'moderate', example: 'analysis',      model: 'sonnet', color: EMBED_PURPLE },
    { tier: 'complex',  example: 'deep research', model: 'opus',   color: '#f472b6' },
  ]

  return (
    <div
      style={{
        background: p.BG_SECONDARY,
        borderRadius: 4,
        borderLeft: `4px solid ${EMBED_PURPLE}`,
        padding: '10px 14px',
        maxWidth: 340,
        marginTop: 6,
      }}
    >
      <div
        style={{
          color: p.TEXT_HEADER,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
          marginBottom: 10,
        }}
      >
        Smart Routing — Complexity Tiers
      </div>

      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr 0.7fr',
          gap: 4,
          marginBottom: 6,
          paddingBottom: 6,
          borderBottom: `1px solid ${p.BORDER}`,
        }}
      >
        {['TIER', 'EXAMPLE', 'MODEL'].map((h) => (
          <span
            key={h}
            style={{
              color: p.TEXT_MUTED,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'ui-monospace, monospace',
              letterSpacing: '0.05em',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr 0.7fr',
            gap: 4,
            marginBottom: 5,
            alignItems: 'center',
          }}
        >
          <span style={{ color: r.color, fontSize: 11, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>
            {r.tier}
          </span>
          <span style={{ color: p.TEXT_MUTED, fontSize: 11, fontFamily: 'ui-monospace, monospace' }}>
            {r.example}
          </span>
          <span style={{ color: r.color, fontSize: 11, fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>
            {r.model}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Main Composition ─────────────────────────────────────────────────────────

export function DiscordChatScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const isDark  = useIsDark()
  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE

  // Timeline (at 30fps):
  // 0–30   : channel header fades in
  // 30–60  : user message "@Lyra what's the circuit breaker status?"
  // 60–100 : Lyra typing indicator
  // 100–180: Lyra embed response (circuit breaker status)
  // 180–220: second user message (routing explanation)
  // 220–300: Lyra responds with routing table embed

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  const showUser1Msg   = frame >= 30
  const showTyping1    = frame >= 60 && frame < 100
  const showBotEmbed   = frame >= 100
  const showUser2Msg   = frame >= 180
  const showTyping2    = frame >= 210 && frame < 230
  const showBotRouting = frame >= 230

  return (
    <PaletteCtx.Provider value={palette}>
      <AbsoluteFill
        style={{
          background: palette.BG_PRIMARY,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ opacity: headerOpacity, flexShrink: 0 }}>
          <ChannelHeader />
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            paddingTop: 16,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          {showUser1Msg && (
            <UserMessage
              username="mickael"
              avatarColor="#f472b6"
              initials="M"
              time="Today at 14:32"
              enterFrame={30}
              fps={fps}
            >
              <span style={{ color: '#5865f2', fontWeight: 600 }}>@Lyra</span>
              {' '}what's the circuit breaker status?
            </UserMessage>
          )}

          {showTyping1 && (
            <TypingIndicator username="Lyra" enterFrame={60} fps={fps} />
          )}

          {showBotEmbed && (
            <BotMessage time="Today at 14:32" enterFrame={100} fps={fps}>
              Circuit breaker status report:
              <DiscordEmbed
                title="Circuit Breaker Status"
                accentColor={EMBED_GREEN}
                fields={[
                  { name: 'Anthropic API', value: '🟢 CLOSED',    valueColor: EMBED_GREEN },
                  { name: 'Ollama',        value: '🟡 HALF_OPEN', valueColor: EMBED_AMBER },
                  { name: 'Last Failure',  value: '2m ago',       valueColor: palette.TEXT_MUTED },
                  { name: 'Failures (5m)', value: '1 / 5',        valueColor: palette.TEXT_PRIMARY },
                ]}
              />
            </BotMessage>
          )}

          {showUser2Msg && (
            <UserMessage
              username="alice"
              avatarColor="#818cf8"
              initials="A"
              time="Today at 14:33"
              enterFrame={180}
              fps={fps}
            >
              Cool, can you explain the routing?
            </UserMessage>
          )}

          {showTyping2 && (
            <TypingIndicator username="Lyra" enterFrame={210} fps={fps} />
          )}

          {showBotRouting && (
            <BotMessage time="Today at 14:33" enterFrame={230} fps={fps}>
              Smart routing picks the cheapest model that can handle the task:
              <RoutingTable />
            </BotMessage>
          )}
        </div>

        {/* Input bar (static decoration) */}
        <div
          style={{
            background: palette.INPUT_BG,
            margin: '0 16px 16px',
            borderRadius: 8,
            padding: '11px 16px',
            color: palette.INPUT_TEXT,
            fontSize: 14,
            fontFamily: 'system-ui, sans-serif',
            flexShrink: 0,
          }}
        >
          Message #general
        </div>
      </AbsoluteFill>
    </PaletteCtx.Provider>
  )
}
