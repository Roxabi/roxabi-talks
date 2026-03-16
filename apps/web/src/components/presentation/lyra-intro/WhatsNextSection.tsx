'use client'

import { useId } from 'react'
import { useTheme } from 'next-themes'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

function AgencyDiagrams() {
  const id = useId()
  const reducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const dashAnimId = `${id}-dash`
  const hubGradId = `${id}-hub-grad`
  const agentGradId = `${id}-agent-grad`
  const subGradId = `${id}-sub-grad`
  const natsGradId = `${id}-nats-grad`
  const glowId = `${id}-glow`

  // ── Current diagram (left half) ──────────────────────────────────
  // Hub at x=80, agents fan out to x=200 at y=60,130,200
  const curW = 260
  const H = 280
  const hubCx = 70
  const hubCy = H / 2
  const hubR = 26

  const currentAgents = [
    { x: 200, y: 80, label: 'Agent A' },
    { x: 200, y: 140, label: 'Agent B' },
    { x: 200, y: 200, label: 'Agent C' },
  ]
  const agentW = 78
  const agentH = 30

  // ── Future diagram (right half) ───────────────────────────────────
  const futW = 380
  const futOffsetX = curW + 40 // right panel starts here
  const fHubCx = futOffsetX + 50
  const fHubCy = H / 2

  const futureAgents = [
    { x: futOffsetX + 160, y: 80, label: 'Agent A', subs: ['Sub 1', 'Sub 2'] },
    { x: futOffsetX + 160, y: 160, label: 'Agent B', subs: ['Sub 3'] },
    { x: futOffsetX + 160, y: 228, label: 'Agent C', subs: [] },
  ]
  const subX = futOffsetX + 310
  const subW = 68
  const subH = 26

  const totalW = curW + 40 + futW
  const dividerX = curW + 20

  return (
    <svg
      viewBox={`0 0 ${totalW} ${H}`}
      aria-label="Two diagrams: current single-level hub-and-agent architecture, and future multi-level architecture with sub-agents"
      role="img"
      className="w-full max-w-[700px]"
      style={{ height: 'auto' }}
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id={hubGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.15" />
        </radialGradient>

        <linearGradient id={agentGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.07" />
        </linearGradient>

        <linearGradient id={subGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.06" />
        </linearGradient>

        {/* NATS amber band gradient */}
        <linearGradient id={natsGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.0" />
          <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.10" />
          <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
        </linearGradient>

        {!reducedMotion && (
          <style>{`
            @keyframes ${dashAnimId} {
              to { stroke-dashoffset: -20; }
            }
          `}</style>
        )}
      </defs>

      {/* ── Section labels ── */}
      <text
        x={curW / 2}
        y="14"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="8"
        fill={isDark ? '#94a3b8' : '#64748b'}
        fillOpacity="0.7"
        letterSpacing="0.1em"
      >
        CURRENT — SINGLE LEVEL
      </text>
      <text
        x={futOffsetX + futW / 2}
        y="14"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="8"
        fill="#a78bfa"
        fillOpacity="0.6"
        letterSpacing="0.1em"
      >
        FUTURE — MULTI-LEVEL
      </text>

      {/* Vertical divider */}
      <line
        x1={dividerX}
        y1="22"
        x2={dividerX}
        y2={H - 10}
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
      />

      {/* ═══════════════ CURRENT DIAGRAM ═══════════════ */}

      {/* Connector lines: hub → agents */}
      {currentAgents.map((agent) => {
        const x1 = hubCx + hubR
        const y1 = hubCy
        const x2 = agent.x
        const y2 = agent.y + agentH / 2
        return (
          <g key={agent.label}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#818cf8"
              strokeWidth="5"
              strokeOpacity="0.06"
              strokeLinecap="round"
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2 - 6}
              y2={y2}
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="5 5"
              style={
                reducedMotion
                  ? undefined
                  : { animation: `${dashAnimId} 1s linear infinite` }
              }
            />
            <polygon
              points={`${x2},${y2} ${x2 - 8},${y2 - 4} ${x2 - 8},${y2 + 4}`}
              fill="#818cf8"
              fillOpacity="0.55"
            />
          </g>
        )
      })}

      {/* Hub circle */}
      <circle
        cx={hubCx}
        cy={hubCy}
        r={hubR}
        fill={`url(#${hubGradId})`}
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        filter={`url(#${glowId})`}
      />
      <text
        x={hubCx}
        y={hubCy + 4}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fontWeight="700"
        fill="#818cf8"
        letterSpacing="0.04em"
      >
        Hub
      </text>

      {/* Agent boxes */}
      {currentAgents.map((agent) => (
        <g key={agent.label}>
          <rect
            x={agent.x}
            y={agent.y}
            width={agentW}
            height={agentH}
            rx="6"
            fill={`url(#${agentGradId})`}
            stroke="#a78bfa"
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <text
            x={agent.x + agentW / 2}
            y={agent.y + agentH / 2 + 4}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="600"
            fill="#c4b5fd"
            letterSpacing="0.04em"
          >
            {agent.label}
          </text>
        </g>
      ))}

      {/* ═══════════════ FUTURE DIAGRAM ═══════════════ */}

      {/* NATS amber background band */}
      <rect
        x={futOffsetX - 10}
        y={22}
        width={futW + 10}
        height={H - 30}
        rx="12"
        fill={`url(#${natsGradId})`}
      />
      {/* NATS label */}
      <text
        x={futOffsetX + futW - 8}
        y={H - 16}
        textAnchor="end"
        fontFamily="ui-monospace, monospace"
        fontSize="7.5"
        fill="#fbbf24"
        fillOpacity="0.45"
        letterSpacing="0.08em"
      >
        NATS bus
      </text>

      {/* Future: hub → agents */}
      {futureAgents.map((agent) => {
        const x1 = fHubCx + hubR
        const y1 = fHubCy
        const x2 = agent.x
        const y2 = agent.y + agentH / 2
        return (
          <g key={agent.label + '-line'}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#818cf8"
              strokeWidth="4"
              strokeOpacity="0.07"
              strokeLinecap="round"
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2 - 6}
              y2={y2}
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="5 5"
              style={
                reducedMotion
                  ? undefined
                  : { animation: `${dashAnimId} 1s linear infinite` }
              }
            />
            <polygon
              points={`${x2},${y2} ${x2 - 8},${y2 - 4} ${x2 - 8},${y2 + 4}`}
              fill="#818cf8"
              fillOpacity="0.55"
            />
          </g>
        )
      })}

      {/* Future: agents → sub-agents */}
      {futureAgents.map((agent) =>
        agent.subs.map((sub, i) => {
          const totalSubs = agent.subs.length
          const subSpacing = 30
          const subStartY =
            agent.y + agentH / 2 - ((totalSubs - 1) * subSpacing) / 2
          const subY = subStartY + i * subSpacing
          const x1 = agent.x + agentW
          const y1 = agent.y + agentH / 2
          const x2 = subX
          const y2 = subY + subH / 2
          return (
            <g key={sub}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#22d3ee"
                strokeWidth="3"
                strokeOpacity="0.07"
                strokeLinecap="round"
              />
              <line
                x1={x1}
                y1={y1}
                x2={x2 - 5}
                y2={y2}
                stroke="#22d3ee"
                strokeWidth="1.2"
                strokeOpacity="0.40"
                strokeDasharray="4 4"
                style={
                  reducedMotion
                    ? undefined
                    : {
                        animation: `${dashAnimId} 0.9s linear infinite`,
                      }
                }
              />
              <polygon
                points={`${x2},${y2} ${x2 - 7},${y2 - 3} ${x2 - 7},${y2 + 3}`}
                fill="#22d3ee"
                fillOpacity="0.5"
              />
              {/* Sub-agent box */}
              <rect
                x={subX}
                y={subY}
                width={subW}
                height={subH}
                rx="5"
                fill={`url(#${subGradId})`}
                stroke="#22d3ee"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={subX + subW / 2}
                y={subY + subH / 2 + 4}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="8.5"
                fontWeight="600"
                fill="#67e8f9"
                letterSpacing="0.03em"
              >
                {sub}
              </text>
            </g>
          )
        })
      )}

      {/* Future Hub circle */}
      <circle
        cx={fHubCx}
        cy={fHubCy}
        r={hubR}
        fill={`url(#${hubGradId})`}
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        filter={`url(#${glowId})`}
      />
      <text
        x={fHubCx}
        y={fHubCy + 4}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fontWeight="700"
        fill="#818cf8"
        letterSpacing="0.04em"
      >
        Hub
      </text>

      {/* Future agent boxes */}
      {futureAgents.map((agent) => (
        <g key={agent.label + '-box'}>
          <rect
            x={agent.x}
            y={agent.y}
            width={agentW}
            height={agentH}
            rx="6"
            fill={`url(#${agentGradId})`}
            stroke="#a78bfa"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <text
            x={agent.x + agentW / 2}
            y={agent.y + agentH / 2 + 4}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fontWeight="600"
            fill="#c4b5fd"
            letterSpacing="0.04em"
          >
            {agent.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function WhatsNextSection() {
  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/6 blur-[150px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-violet-500 dark:text-violet-400 uppercase">
            {m.talk_li_next_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-violet-600 dark:text-violet-300">
            {m.talk_li_next_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4 flex justify-center">
          <AgencyDiagrams />
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <div className="grid grid-cols-2 gap-3 max-w-2xl sm:grid-cols-4">
            {[
              { label: m.talk_li_next_item1_label(), desc: m.talk_li_next_item1_desc() },
              { label: m.talk_li_next_item2_label(), desc: m.talk_li_next_item2_desc() },
              { label: m.talk_li_next_item3_label(), desc: m.talk_li_next_item3_desc() },
              { label: m.talk_li_next_item4_label(), desc: m.talk_li_next_item4_desc() },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-violet-400/20 bg-violet-500/5 p-3 text-center"
              >
                <p className="font-mono text-xs font-bold text-violet-600 dark:text-violet-300">{item.label}</p>
                <p className="font-mono text-[10px] text-violet-500/50 dark:text-violet-400/50 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
