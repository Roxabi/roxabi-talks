'use client'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

// ─── Color tokens (Discord dark theme) ───────────────────────────────────────

const BG_PRIMARY   = '#36393f'
const BG_SECONDARY = '#2f3136'
const TEXT_PRIMARY  = '#dcddde'
const TEXT_MUTED    = '#72767d'
const TEXT_HEADER   = '#ffffff'
const BLURPLE       = '#5865f2'
const BOT_BADGE_BG  = '#5865f2'
const EMBED_GREEN   = '#4ade80'
const EMBED_AMBER   = '#fb923c'
const EMBED_PURPLE  = '#a78bfa'

// ─── Channel header ───────────────────────────────────────────────────────────

function ChannelHeader() {
  return (
    <div
      style={{
        background: BG_PRIMARY,
        borderBottom: `1px solid rgba(0,0,0,0.3)`,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span style={{ color: TEXT_MUTED, fontSize: 20, fontWeight: 700 }}>#</span>
      <div>
        <span
          style={{
            color: TEXT_HEADER,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          general
        </span>
        <span
          style={{
            color: TEXT_MUTED,
            fontSize: 11,
            fontFamily: 'system-ui, sans-serif',
            marginLeft: 8,
          }}
        >
          My Server
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
  return (
    <span
      style={{
        color: TEXT_MUTED,
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
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 220, mass: 0.7 },
  })

  const opacity   = interpolate(progress, [0, 1], [0, 1])
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
            color: TEXT_PRIMARY,
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
  return (
    <div
      style={{
        background: BG_SECONDARY,
        borderRadius: 4,
        borderLeft: `4px solid ${accentColor}`,
        padding: '10px 14px',
        maxWidth: 340,
        marginTop: 6,
      }}
    >
      <div
        style={{
          color: TEXT_HEADER,
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
                color: TEXT_MUTED,
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
                color: f.valueColor ?? TEXT_PRIMARY,
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
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 220, mass: 0.7 },
  })

  const opacity   = interpolate(progress, [0, 1], [0, 1])
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
        <div style={{ marginTop: 2 }}>{children}</div>
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
              background: TEXT_MUTED,
              transform: `translateY(${dotBounce(offset)}px)`,
            }}
          />
        ))}
      </div>
      <span
        style={{
          color: TEXT_MUTED,
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
  const rows = [
    { tier: 'trivial',  example: 'ping / status', model: 'haiku',  color: EMBED_GREEN },
    { tier: 'simple',   example: 'summarize',     model: 'haiku',  color: '#2dd4bf' },
    { tier: 'moderate', example: 'analysis',      model: 'sonnet', color: EMBED_PURPLE },
    { tier: 'complex',  example: 'deep research', model: 'opus',   color: '#f472b6' },
  ]

  return (
    <div
      style={{
        background: BG_SECONDARY,
        borderRadius: 4,
        borderLeft: `4px solid ${EMBED_PURPLE}`,
        padding: '10px 14px',
        maxWidth: 340,
        marginTop: 6,
      }}
    >
      <div
        style={{
          color: TEXT_HEADER,
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
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        {['TIER', 'EXAMPLE', 'MODEL'].map((h) => (
          <span
            key={h}
            style={{
              color: TEXT_MUTED,
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
          <span
            style={{
              color: r.color,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {r.tier}
          </span>
          <span
            style={{
              color: TEXT_MUTED,
              fontSize: 11,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {r.example}
          </span>
          <span
            style={{
              color: r.color,
              fontSize: 11,
              fontFamily: 'ui-monospace, monospace',
              fontWeight: 600,
            }}
          >
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
    <AbsoluteFill
      style={{
        background: BG_PRIMARY,
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
          overflowY: 'hidden',
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
            <div
              style={{
                color: TEXT_PRIMARY,
                fontSize: 14,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Circuit breaker status report:
            </div>
            <DiscordEmbed
              title="Circuit Breaker Status"
              accentColor={EMBED_GREEN}
              fields={[
                { name: 'Anthropic API', value: '🟢 CLOSED',    valueColor: EMBED_GREEN },
                { name: 'Ollama',        value: '🟡 HALF_OPEN', valueColor: EMBED_AMBER },
                { name: 'Last Failure',  value: '2m ago',       valueColor: TEXT_MUTED },
                { name: 'Failures (5m)', value: '1 / 5',        valueColor: TEXT_PRIMARY },
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
            <div
              style={{
                color: TEXT_PRIMARY,
                fontSize: 14,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Smart routing picks the cheapest model that can handle the task:
            </div>
            <RoutingTable />
          </BotMessage>
        )}
      </div>

      {/* Input bar (static decoration) */}
      <div
        style={{
          background: BG_SECONDARY,
          margin: '0 16px 16px',
          borderRadius: 8,
          padding: '11px 16px',
          color: TEXT_MUTED,
          fontSize: 14,
          fontFamily: 'system-ui, sans-serif',
          flexShrink: 0,
        }}
      >
        Message #general
      </div>
    </AbsoluteFill>
  )
}
