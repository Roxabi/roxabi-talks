'use client'

import { useId } from 'react'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

function AgentPoolDiagram() {
  const id = useId()
  const reducedMotion = useReducedMotion()

  const dashAnimId = `${id}-dash`
  const glowId = `${id}-glow`
  const agentGradId = `${id}-agent-grad`
  const poolGradId = `${id}-pool-grad`

  // Layout constants
  const W = 700
  const H = 280
  const agentX = W / 2
  const agentY = 54
  const agentW = 148
  const agentH = 52

  const pools = [
    { x: 124, label: 'Pool A', scope: 'tg:chat:1' },
    { x: W / 2, label: 'Pool B', scope: 'dc:ch:42' },
    { x: W - 124, label: 'Pool C', scope: 'tg:chat:7' },
  ]
  const poolY = 190
  const poolW = 130
  const poolH = 52

  // Line endpoints: bottom-center of agent → top-center of each pool
  const agentLineY = agentY + agentH
  const poolLineY = poolY

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-label="Diagram: one Agent node connected to three Pool nodes"
      role="img"
      className="w-full max-w-[700px]"
      style={{ height: 'auto' }}
    >
      <defs>
        {/* Agent glow filter */}
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Agent fill gradient */}
        <linearGradient id={agentGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" />
        </linearGradient>

        {/* Pool fill gradient */}
        <linearGradient id={poolGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.06" />
        </linearGradient>

        {/* Dash march animation */}
        {!reducedMotion && (
          <style>{`
            @keyframes ${dashAnimId} {
              to { stroke-dashoffset: -24; }
            }
          `}</style>
        )}
      </defs>

      {/* Connector lines */}
      {pools.map((pool) => {
        const x1 = agentX
        const y1 = agentLineY
        const x2 = pool.x
        const y2 = poolLineY
        // Bezier control points for smooth curve
        const cy = (y1 + y2) / 2
        const d = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`
        return (
          <g key={pool.label}>
            {/* Glow track */}
            <path
              d={d}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="6"
              strokeOpacity="0.08"
              strokeLinecap="round"
            />
            {/* Animated dashed line */}
            <path
              d={d}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeOpacity="0.55"
              strokeLinecap="round"
              strokeDasharray="6 6"
              style={
                reducedMotion
                  ? undefined
                  : {
                      strokeDashoffset: 0,
                      animation: `${dashAnimId} 1.2s linear infinite`,
                    }
              }
            />
            {/* Arrow head */}
            <polygon
              points={`${x2},${y2 + 1} ${x2 - 5},${y2 - 8} ${x2 + 5},${y2 - 8}`}
              fill="#a78bfa"
              fillOpacity="0.7"
            />
          </g>
        )
      })}

      {/* Agent node */}
      <g filter={`url(#${glowId})`}>
        <rect
          x={agentX - agentW / 2}
          y={agentY}
          width={agentW}
          height={agentH}
          rx="10"
          fill={`url(#${agentGradId})`}
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
      </g>
      <text
        x={agentX}
        y={agentY + 20}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fontWeight="700"
        fill="#a78bfa"
        letterSpacing="0.08em"
      >
        AGENT: LYRA
      </text>
      <text
        x={agentX}
        y={agentY + 36}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        fill="#c4b5fd"
        fillOpacity="0.65"
        letterSpacing="0.04em"
      >
        immutable config
      </text>

      {/* Pool nodes */}
      {pools.map((pool) => (
        <g key={pool.label}>
          <rect
            x={pool.x - poolW / 2}
            y={poolY}
            width={poolW}
            height={poolH}
            rx="8"
            fill={`url(#${poolGradId})`}
            stroke="#22d3ee"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          {/* Pool label */}
          <text
            x={pool.x}
            y={poolY + 19}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fontWeight="700"
            fill="#22d3ee"
            letterSpacing="0.06em"
          >
            {pool.label}
          </text>
          {/* Scope id */}
          <text
            x={pool.x - 10}
            y={poolY + 34}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="#67e8f9"
            fillOpacity="0.6"
            letterSpacing="0.03em"
          >
            {pool.scope}
          </text>
          {/* Lock icon (simple SVG path) */}
          <g transform={`translate(${pool.x + 34}, ${poolY + 25})`}>
            <rect x="-6" y="-4" width="12" height="10" rx="2" fill="#22d3ee" fillOpacity="0.25" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
            <path
              d="M -3 -4 L -3 -7 Q 0 -10 3 -7 L 3 -4"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.2"
              strokeOpacity="0.6"
              strokeLinecap="round"
            />
            <circle cx="0" cy="1" r="1.5" fill="#22d3ee" fillOpacity="0.7" />
          </g>
          {/* history label */}
          <text
            x={pool.x}
            y={poolY + poolH + 14}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="8"
            fill="#94a3b8"
            fillOpacity="0.5"
            letterSpacing="0.04em"
          >
            (history)
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AgentsPoolsSection() {
  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-violet-500/6 blur-[130px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-violet-500 dark:text-violet-400 uppercase">
            {m.talk_li_ap_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-violet-600 dark:text-violet-300">
            {m.talk_li_ap_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
            {/* Agent */}
            <div className="flex-1 rounded-xl border border-violet-400/30 bg-violet-500/5 p-5">
              <p className="font-mono text-[10px] text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                {m.talk_li_ap_agent_label()}
              </p>
              <ul className="space-y-1">
                {[m.talk_li_ap_agent_item1(), m.talk_li_ap_agent_item2(), m.talk_li_ap_agent_item3(), m.talk_li_ap_agent_item4()].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-violet-400/60 text-xs">·</span>
                    <span className="font-mono text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pool */}
            <div className="flex-1 rounded-xl border border-cyan-400/30 bg-cyan-500/5 p-5">
              <p className="font-mono text-[10px] text-cyan-500 dark:text-cyan-400 uppercase tracking-widest mb-3">
                {m.talk_li_ap_pool_label()}
              </p>
              <ul className="space-y-1">
                {[m.talk_li_ap_pool_item1(), m.talk_li_ap_pool_item2(), m.talk_li_ap_pool_item3()].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-cyan-400/60 text-xs">·</span>
                    <span className="font-mono text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-5">
          <blockquote className="max-w-2xl border-l-2 border-violet-500/40 pl-4">
            <p className="text-base font-semibold text-violet-700/90 dark:text-violet-200/90 italic leading-snug">
              {m.talk_li_ap_quote()}
            </p>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection className="mt-6 flex justify-center">
          <AgentPoolDiagram />
        </AnimatedSection>
      </div>
    </div>
  )
}
