'use client'

import { useId } from 'react'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

// ─── Decorator Pipeline SVG ───────────────────────────────────────────────────

type DecoratorNode = {
  label: string
  color: string
  textColor: string
}

const DECORATORS: DecoratorNode[] = [
  { label: 'SmartRouting', color: '#fbbf24', textColor: '#1c1917' },
  { label: 'CircuitBreaker', color: '#f87171', textColor: '#1c1917' },
  { label: 'Retry', color: '#818cf8', textColor: '#1c1917' },
  { label: 'Driver', color: '#a78bfa', textColor: '#1c1917' },
]

const BOX_W = 110
const BOX_H = 36
const BOX_R = 6
const ARROW_W = 28
const LABEL_PAD = 20

const ENDPOINT_W = 64
const PIPELINE_H = 80

function DecoratorPipelineSVG({ reduced }: { reduced: boolean }) {
  const id = useId()
  const arrowId = `${id}-arrow`

  // Compute x positions for each element
  const cy = PIPELINE_H / 2

  // Layout: [pad] [Message] [arrow] [box]×4 [arrow] [LLM] [pad]
  const segments: Array<{ type: 'endpoint' | 'box' | 'arrow'; x: number; node?: DecoratorNode; label?: string }> = []

  let cx = LABEL_PAD

  // "Message" endpoint
  segments.push({ type: 'endpoint', x: cx, label: 'Message' })
  cx += ENDPOINT_W

  for (const node of DECORATORS) {
    segments.push({ type: 'arrow', x: cx })
    cx += ARROW_W
    segments.push({ type: 'box', x: cx, node })
    cx += BOX_W
  }

  segments.push({ type: 'arrow', x: cx })
  cx += ARROW_W
  segments.push({ type: 'endpoint', x: cx, label: 'LLM' })

  const viewW = cx + ENDPOINT_W + LABEL_PAD

  return (
    <svg
      viewBox={`0 0 ${viewW} ${PIPELINE_H}`}
      width="100%"
      aria-label="Decorator pipeline: Message flows through SmartRouting, CircuitBreaker, Retry, Driver, then reaches the LLM"
      role="img"
      style={{ maxWidth: 760 }}
    >
      <defs>
        <marker
          id={arrowId}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#475569" />
        </marker>
      </defs>

      {segments.map((seg, i) => {
        if (seg.type === 'endpoint') {
          return (
            <text
              key={i}
              x={seg.x + (seg.label === 'LLM' ? 0 : 0)}
              y={cy + 5}
              fontFamily="monospace"
              fontSize={12}
              fill="#94a3b8"
              textAnchor={seg.label === 'LLM' ? 'start' : 'start'}
            >
              {seg.label}
            </text>
          )
        }

        if (seg.type === 'arrow') {
          const x1 = seg.x
          const x2 = seg.x + ARROW_W - 2
          return (
            <line
              key={i}
              x1={x1}
              y1={cy}
              x2={x2}
              y2={cy}
              stroke="#475569"
              strokeWidth={1.5}
              markerEnd={`url(#${arrowId})`}
            >
              {!reduced && (
                <animate
                  attributeName="stroke-dashoffset"
                  from={ARROW_W}
                  to={0}
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          )
        }

        if (seg.type === 'box' && seg.node) {
          const { node } = seg
          return (
            <g key={i}>
              <rect
                x={seg.x}
                y={cy - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx={BOX_R}
                fill={node.color}
                fillOpacity={0.15}
                stroke={node.color}
                strokeWidth={1.5}
                strokeOpacity={0.7}
              />
              <text
                x={seg.x + BOX_W / 2}
                y={cy + 4.5}
                fontFamily="monospace"
                fontSize={10}
                fontWeight="600"
                fill={node.color}
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          )
        }

        return null
      })}
    </svg>
  )
}

// ─── Circuit Breaker State Machine SVG ───────────────────────────────────────

const CB_W = 560
const CB_H = 160
const STATE_W = 90
const STATE_H = 38
const STATE_R = 19

type CbState = { label: string; cx: number; cy: number; color: string }

const CB_STATES: CbState[] = [
  { label: 'CLOSED', cx: 80, cy: 80, color: '#4ade80' },
  { label: 'OPEN', cx: 280, cy: 80, color: '#f87171' },
  { label: 'HALF_OPEN', cx: 480, cy: 80, color: '#fb923c' },
]

function CircuitBreakerSVG({ reduced }: { reduced: boolean }) {
  const id = useId()
  const arrowId = `${id}-cb-arrow`
  const arrowRedId = `${id}-cb-arrow-red`

  // Named refs for each state — avoids TS "possibly undefined" on array indexing
  const sClosed = CB_STATES[0]!
  const sOpen = CB_STATES[1]!
  const sHalfOpen = CB_STATES[2]!

  return (
    <svg
      viewBox={`0 0 ${CB_W} ${CB_H}`}
      width="100%"
      aria-label="Circuit breaker state machine: CLOSED transitions to OPEN after 5 failures, OPEN transitions to HALF_OPEN after 60s timeout, HALF_OPEN transitions back to CLOSED on success or back to OPEN on failure"
      role="img"
      style={{ maxWidth: 600 }}
    >
      <defs>
        <marker id={arrowId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#475569" />
        </marker>
        <marker id={arrowRedId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#f87171" />
        </marker>
      </defs>

      {/* CLOSED → OPEN: straight arrow */}
      <line
        x1={sClosed.cx + STATE_W / 2}
        y1={sClosed.cy}
        x2={sOpen.cx - STATE_W / 2 - 2}
        y2={sOpen.cy}
        stroke="#475569"
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
      >
        {!reduced && (
          <animate
            attributeName="stroke-dashoffset"
            from={200}
            to={0}
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </line>
      <text x={180} y={68} fontFamily="monospace" fontSize={9} fill="#94a3b8" textAnchor="middle">
        5 failures
      </text>

      {/* OPEN → HALF_OPEN: straight arrow */}
      <line
        x1={sOpen.cx + STATE_W / 2}
        y1={sOpen.cy}
        x2={sHalfOpen.cx - STATE_W / 2 - 2}
        y2={sHalfOpen.cy}
        stroke="#475569"
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
      />
      <text x={380} y={68} fontFamily="monospace" fontSize={9} fill="#94a3b8" textAnchor="middle">
        60s timeout
      </text>

      {/* HALF_OPEN → CLOSED: curved arc below */}
      <path
        d={`M ${sHalfOpen.cx} ${sHalfOpen.cy + STATE_H / 2} C ${sHalfOpen.cx} 140, ${sClosed.cx} 140, ${sClosed.cx} ${sClosed.cy + STATE_H / 2}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
        strokeDasharray="4 3"
      />
      <text x={280} y={152} fontFamily="monospace" fontSize={9} fill="#4ade80" textAnchor="middle">
        success
      </text>

      {/* HALF_OPEN → OPEN: small curved arc above */}
      <path
        d={`M ${sHalfOpen.cx - 10} ${sHalfOpen.cy - STATE_H / 2} C ${sHalfOpen.cx - 10} 20, ${sOpen.cx + 10} 20, ${sOpen.cx + 10} ${sOpen.cy - STATE_H / 2}`}
        fill="none"
        stroke="#f87171"
        strokeWidth={1.5}
        markerEnd={`url(#${arrowRedId})`}
        strokeDasharray="4 3"
      />
      <text x={380} y={16} fontFamily="monospace" fontSize={9} fill="#f87171" textAnchor="middle">
        failure
      </text>

      {/* State nodes */}
      {CB_STATES.map((s) => (
        <g key={s.label}>
          <rect
            x={s.cx - STATE_W / 2}
            y={s.cy - STATE_H / 2}
            width={STATE_W}
            height={STATE_H}
            rx={STATE_R}
            fill={s.color}
            fillOpacity={0.12}
            stroke={s.color}
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />
          <text
            x={s.cx}
            y={s.cy + 4}
            fontFamily="monospace"
            fontSize={10}
            fontWeight="700"
            fill={s.color}
            textAnchor="middle"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── Smart Routing Table ──────────────────────────────────────────────────────

type RoutingLevel = {
  tier: string
  example: string
  model: string
  color: string
  barColor: string
  barWidth: string
}

function getRoutingLevels(): RoutingLevel[] {
  return [
    {
      tier: m.talk_li_res_tier_trivial(),
      example: m.talk_li_res_example_trivial(),
      model: 'haiku',
      color: '#4ade80',
      barColor: 'bg-green-400/70',
      barWidth: 'w-1/4',
    },
    {
      tier: m.talk_li_res_tier_simple(),
      example: m.talk_li_res_example_simple(),
      model: 'haiku',
      color: '#2dd4bf',
      barColor: 'bg-teal-400/70',
      barWidth: 'w-2/4',
    },
    {
      tier: m.talk_li_res_tier_moderate(),
      example: m.talk_li_res_example_moderate(),
      model: 'sonnet',
      color: '#a78bfa',
      barColor: 'bg-violet-400/70',
      barWidth: 'w-3/4',
    },
    {
      tier: m.talk_li_res_tier_complex(),
      example: m.talk_li_res_example_complex(),
      model: 'opus',
      color: '#f472b6',
      barColor: 'bg-pink-400/70',
      barWidth: 'w-full',
    },
  ]
}

function SmartRoutingTable() {
  const ROUTING_LEVELS = getRoutingLevels()
  return (
    <div className="flex flex-col gap-2 max-w-xl">
      {ROUTING_LEVELS.map((lvl) => (
        <div key={lvl.tier} className="flex items-center gap-3">
          {/* Tier + example */}
          <div className="w-40 shrink-0">
            <span className="font-mono text-[11px] font-bold" style={{ color: lvl.color }}>
              {lvl.tier}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground ml-1.5">({lvl.example})</span>
          </div>
          {/* Bar */}
          <div className="flex-1 h-4 rounded bg-foreground/5 overflow-hidden">
            <div className={`h-full rounded ${lvl.barColor} ${lvl.barWidth} transition-all`} />
          </div>
          {/* Model */}
          <div
            className="w-14 shrink-0 text-right font-mono text-[11px] font-semibold"
            style={{ color: lvl.color }}
          >
            {lvl.model}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

type Stat = { value: string; label: string; color: string }

function StatsRow() {
  const STATS: Stat[] = [
    { value: m.talk_li_res_stat1_value(), label: m.talk_li_res_stat1_label(), color: '#fbbf24' },
    { value: m.talk_li_res_stat2_value(), label: m.talk_li_res_stat2_label(), color: '#818cf8' },
    { value: m.talk_li_res_stat3_value(), label: m.talk_li_res_stat3_label(), color: '#f87171' },
  ]
  return (
    <div className="flex flex-wrap gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border px-4 py-2.5"
          style={{
            borderColor: `${stat.color}33`,
            background: `${stat.color}0d`,
          }}
        >
          <p className="font-mono text-xs font-bold" style={{ color: stat.color }}>
            {stat.value}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResilienceSection() {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute right-0 bottom-1/3 h-[250px] w-[250px] rounded-full bg-red-500/4 blur-[100px]" />
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Heading */}
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {m.talk_li_res_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl font-mono text-foreground">
            {m.talk_li_res_title_prefix()} <span className="text-red-500 dark:text-red-400">{m.talk_li_res_title_highlight()}</span>
          </h2>
        </AnimatedSection>

        {/* Part 1: Decorator pipeline */}
        <AnimatedSection>
          <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">
            {m.talk_li_res_decorator_label()}
          </p>
          <DecoratorPipelineSVG reduced={reduced} />
        </AnimatedSection>

        {/* Part 2: Circuit breaker state machine */}
        <AnimatedSection>
          <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">
            {m.talk_li_res_cb_label()}
          </p>
          <CircuitBreakerSVG reduced={reduced} />
        </AnimatedSection>

        {/* Part 3: Smart routing */}
        <AnimatedSection>
          <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">
            {m.talk_li_res_routing_label()}
          </p>
          <SmartRoutingTable />
        </AnimatedSection>

        {/* Part 4: Stats */}
        <AnimatedSection>
          <StatsRow />
        </AnimatedSection>
      </div>
    </div>
  )
}
