'use client'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

// ─── Color tokens ─────────────────────────────────────────────────────────────

const TEAL_BG = '#0d1117'
const HEADER_BG = '#17212b'
const USER_BUBBLE = '#2b5278'
const BOT_BUBBLE = '#182533'
const TEXT_PRIMARY = '#e8eaed'
const TEXT_SECONDARY = '#708da5'
const TEXT_MUTED = '#4a6278'
const ONLINE_GREEN = '#4ade80'
const LINK_COLOR = '#6ab3f3'
const ACCENT_CYAN = '#22d3ee'

// ─── Waveform bar heights (normalized 0–1) ───────────────────────────────────

const WAVEFORM_BARS_USER = [0.3, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8, 0.6, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.3]
const WAVEFORM_BARS_BOT  = [0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3, 0.9, 0.5, 0.7]

// ─── Chat Header ─────────────────────────────────────────────────────────────

function ChatHeader() {
  return (
    <div
      style={{
        background: HEADER_BG,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        ⚡
        {/* Online status dot */}
        <div
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: ONLINE_GREEN,
            border: `2px solid ${HEADER_BG}`,
          }}
        />
      </div>

      {/* Name + status */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: TEXT_PRIMARY,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          Lyra{' '}
          <span
            style={{
              fontSize: 13,
              color: ACCENT_CYAN,
              fontWeight: 400,
            }}
          >
            ⚡
          </span>
        </div>
        <div
          style={{
            color: ONLINE_GREEN,
            fontSize: 11,
            fontFamily: 'system-ui, sans-serif',
            marginTop: 1,
            fontWeight: 500,
          }}
        >
          online
        </div>
      </div>
    </div>
  )
}

// ─── Timestamp ───────────────────────────────────────────────────────────────

function Timestamp({ label }: { label: string }) {
  return (
    <div
      style={{
        textAlign: 'right',
        fontSize: 10,
        color: TEXT_MUTED,
        fontFamily: 'system-ui, sans-serif',
        marginTop: 3,
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </div>
  )
}

// ─── User Bubble ─────────────────────────────────────────────────────────────

type UserBubbleProps = {
  children: React.ReactNode
  enterFrame: number
  fps: number
}

function UserBubble({ children, enterFrame, fps }: UserBubbleProps) {
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.8 },
  })

  const opacity = interpolate(progress, [0, 1], [0, 1])
  const translateX = interpolate(progress, [0, 1], [40, 0])
  const scale = interpolate(progress, [0, 1], [0.9, 1])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: 60,
        paddingRight: 12,
        marginBottom: 4,
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          background: USER_BUBBLE,
          borderRadius: '18px 18px 4px 18px',
          padding: '10px 14px',
          maxWidth: '82%',
        }}
      >
        <div
          style={{
            color: TEXT_PRIMARY,
            fontSize: 14,
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
        <Timestamp label="14:32" />
      </div>
    </div>
  )
}

// ─── Bot name badge ────────────────────────────────────────────────────────

function BotName() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
      }}
    >
      <span
        style={{
          color: ACCENT_CYAN,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Lyra
      </span>
      <span
        style={{
          background: `${ACCENT_CYAN}22`,
          border: `1px solid ${ACCENT_CYAN}55`,
          color: ACCENT_CYAN,
          fontSize: 9,
          fontWeight: 700,
          fontFamily: 'ui-monospace, monospace',
          padding: '1px 5px',
          borderRadius: 4,
          letterSpacing: '0.04em',
        }}
      >
        BOT
      </span>
    </div>
  )
}

// ─── Bot Bubble ───────────────────────────────────────────────────────────────

type BotBubbleProps = {
  children: React.ReactNode
  enterFrame: number
  fps: number
  showName?: boolean
}

function BotBubble({ children, enterFrame, fps, showName = true }: BotBubbleProps) {
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.8 },
  })

  const opacity = interpolate(progress, [0, 1], [0, 1])
  const translateX = interpolate(progress, [0, 1], [-40, 0])
  const scale = interpolate(progress, [0, 1], [0.9, 1])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: 12,
        paddingRight: 60,
        marginBottom: 4,
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
      }}
    >
      {/* Bot avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          marginRight: 8,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        ⚡
      </div>

      <div style={{ maxWidth: '80%' }}>
        {showName && <BotName />}
        <div
          style={{
            background: BOT_BUBBLE,
            borderRadius: '4px 18px 18px 18px',
            padding: '10px 14px',
            border: `1px solid rgba(255,255,255,0.05)`,
          }}
        >
          <div
            style={{
              color: TEXT_PRIMARY,
              fontSize: 14,
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.6,
            }}
          >
            {children}
          </div>
          <Timestamp label="14:32" />
        </div>
      </div>
    </div>
  )
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

type TypingIndicatorProps = {
  enterFrame: number
  fps: number
}

function TypingIndicator({ enterFrame, fps }: TypingIndicatorProps) {
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 20, stiffness: 220, mass: 0.7 },
  })

  const opacity = interpolate(progress, [0, 1], [0, 1])
  const translateX = interpolate(progress, [0, 1], [-30, 0])

  // Staggered dot bounce
  const dotBounce = (offset: number) => {
    const t = ((frame - enterFrame + offset) % 20) / 20
    return Math.sin(t * Math.PI) * -6
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: 12,
        paddingRight: 60,
        marginBottom: 4,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* Bot avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          marginRight: 8,
          flexShrink: 0,
        }}
      >
        ⚡
      </div>

      <div
        style={{
          background: BOT_BUBBLE,
          borderRadius: '4px 18px 18px 18px',
          padding: '14px 18px',
          border: `1px solid rgba(255,255,255,0.05)`,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {[0, 7, 14].map((offset, i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: TEXT_SECONDARY,
              transform: `translateY(${dotBounce(offset)}px)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Voice Message Bubble ─────────────────────────────────────────────────────

type VoiceMessageBubbleProps = {
  bars: number[]
  duration: string
  isBot: boolean
  enterFrame: number
  fps: number
}

function VoiceMessageBubble({ bars, duration, isBot, enterFrame, fps }: VoiceMessageBubbleProps) {
  const frame = useCurrentFrame()
  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.8 },
  })

  const opacity = interpolate(progress, [0, 1], [0, 1])
  const translateX = interpolate(progress, [0, 1], [isBot ? -40 : 40, 0])
  const scale = interpolate(progress, [0, 1], [0.9, 1])

  // Animate waveform playback (highlight bars progressively)
  const playProgress = interpolate(
    frame - enterFrame,
    [0, 60],
    [0, 1],
    { extrapolateRight: 'clamp' },
  )
  const playedCount = Math.floor(playProgress * bars.length)

  const bubbleBg = isBot ? BOT_BUBBLE : USER_BUBBLE
  const accentColor = isBot ? ACCENT_CYAN : '#6ab3f3'
  const borderRadius = isBot ? '4px 18px 18px 18px' : '18px 18px 4px 18px'

  const content = (
    <div
      style={{
        background: bubbleBg,
        borderRadius,
        padding: '10px 14px',
        border: isBot ? `1px solid rgba(255,255,255,0.05)` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 160,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Play button */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: `${accentColor}22`,
            border: `1.5px solid ${accentColor}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1 1L11 7L1 13V1Z" fill={accentColor} />
          </svg>
        </div>

        {/* Waveform */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            height: 28,
          }}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: Math.max(4, h * 28),
                borderRadius: 2,
                background: i < playedCount ? accentColor : `${accentColor}44`,
                transition: 'background 0.1s',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Duration */}
      <div
        style={{
          color: TEXT_MUTED,
          fontSize: 11,
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {duration}
      </div>

      <Timestamp label="14:33" />
    </div>
  )

  if (isBot) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: 12,
          paddingRight: 60,
          marginBottom: 4,
          opacity,
          transform: `translateX(${translateX}px) scale(${scale})`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            marginRight: 8,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          ⚡
        </div>
        <div style={{ maxWidth: '80%' }}>
          <BotName />
          {content}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: 60,
        paddingRight: 12,
        marginBottom: 4,
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
      }}
    >
      <div style={{ maxWidth: '80%' }}>
        {content}
      </div>
    </div>
  )
}

// ─── Lyra response content ────────────────────────────────────────────────────

function LyraResponseContent() {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>Here's a summary of the article:</div>
      <div style={{ color: TEXT_SECONDARY, fontWeight: 700, marginBottom: 6 }}>Key Points:</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[
          'Uses a hub-and-spoke architecture for isolation',
          'Per-agent memory with L1/L2/L3 hierarchy',
          'Circuit breakers prevent cascade failures',
        ].map((point, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: ACCENT_CYAN, flexShrink: 0, marginTop: 1 }}>•</span>
            <span>{point}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: TEXT_SECONDARY }}>
        Want me to save this to your vault?
      </div>
    </div>
  )
}

// ─── Main Composition ─────────────────────────────────────────────────────────

export function TelegramChatScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Timeline (at 30fps):
  // 0–30   : empty chat header fades in
  // 30–60  : user message slides in
  // 60–120 : typing indicator
  // 120–210: Lyra response
  // 210–250: user voice message
  // 250–300: Lyra voice reply

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  const showUserMsg    = frame >= 30
  const showTyping     = frame >= 60 && frame < 120
  const showBotMsg     = frame >= 120
  const showUserVoice  = frame >= 210
  const showBotVoice   = frame >= 250

  return (
    <AbsoluteFill
      style={{
        background: TEAL_BG,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ opacity: headerOpacity, flexShrink: 0 }}>
        <ChatHeader />
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          overflowY: 'hidden',
          padding: '12px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        {showUserMsg && (
          <UserBubble enterFrame={30} fps={fps}>
            <div>Hey Lyra, summarize this article for me</div>
            <div style={{ marginTop: 6 }}>
              <span style={{ color: LINK_COLOR, fontSize: 12 }}>
                https://github.com/mickael/lyra/blob/main/README.md
              </span>
            </div>
          </UserBubble>
        )}

        {showTyping && <TypingIndicator enterFrame={60} fps={fps} />}

        {showBotMsg && (
          <BotBubble enterFrame={120} fps={fps}>
            <LyraResponseContent />
          </BotBubble>
        )}

        {showUserVoice && (
          <VoiceMessageBubble
            bars={WAVEFORM_BARS_USER}
            duration="0:03"
            isBot={false}
            enterFrame={210}
            fps={fps}
          />
        )}

        {showBotVoice && (
          <VoiceMessageBubble
            bars={WAVEFORM_BARS_BOT}
            duration="0:05"
            isBot={true}
            enterFrame={250}
            fps={fps}
          />
        )}
      </div>

      {/* Input bar (static decoration) */}
      <div
        style={{
          background: HEADER_BG,
          borderTop: `1px solid rgba(255,255,255,0.06)`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 20,
            padding: '8px 16px',
            color: TEXT_MUTED,
            fontSize: 13,
          }}
        >
          Message
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: `${ACCENT_CYAN}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 18.5V5M5 12L12 5L19 12"
              stroke={ACCENT_CYAN}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  )
}
