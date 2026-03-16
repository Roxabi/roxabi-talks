import { useId } from 'react'
import { useTheme } from 'next-themes'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

function LyraArchitectureDiagram() {
  const uid = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const patternId = `dot-${uid}`
  const markerTg = `mtg-${uid}`
  const markerDc = `mdc-${uid}`
  const markerBus = `mbus-${uid}`
  const markerHub = `mhub-${uid}`
  const markerOut = `mout-${uid}`

  const animClass = reduced ? '' : 'svgfl'
  const animClass2 = reduced ? '' : 'svgfl2'

  return (
    <>
      {!reduced && (
        <style>{`
          @keyframes lyra-flow {
            from { stroke-dashoffset: 20 }
            to   { stroke-dashoffset: 0  }
          }
          .svgfl  { stroke-dasharray: 6 4; animation: lyra-flow 1.4s linear infinite; }
          .svgfl2 { stroke-dasharray: 6 4; animation: lyra-flow 2.1s linear infinite; }
        `}</style>
      )}

      <svg
        viewBox="0 0 800 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="Lyra architecture data-flow diagram"
        role="img"
      >
        <defs>
          {/* Arrow markers */}
          <marker id={markerTg}  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#26a5e4" />
          </marker>
          <marker id={markerDc}  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#5865f2" />
          </marker>
          <marker id={markerBus} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#fbbf24" />
          </marker>
          <marker id={markerHub} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#818cf8" />
          </marker>
          <marker id={markerOut} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#34d399" />
          </marker>

          {/* Dot grid */}
          <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.7" fill={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="800" height="520" rx="12" fill={isDark ? '#07090f' : '#f8fafc'} />
        <rect width="800" height="520" rx="12" fill={`url(#${patternId})`} />

        {/* Hub glow */}
        <ellipse cx="400" cy="260" rx="220" ry="180" fill="rgba(129,140,248,0.04)" />

        {/* ─── ROW 1: Adapters (y=30..90) ─── */}
        <text x="24" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill={isDark ? '#3d4f6b' : '#94a3b8'} letterSpacing="1.5">INBOUND ADAPTERS</text>

        {/* Telegram adapter */}
        <rect x="24" y="32" width="200" height="58" rx="7" fill={isDark ? '#091626' : '#f1f5f9'} stroke="#26a5e4" strokeWidth="1.5" />
        <text x="124" y="54" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#26a5e4" letterSpacing="1">TELEGRAM</text>
        <text x="124" y="70" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#26a5e4" opacity="0.6">aiogram v3 · polling</text>
        <text x="124" y="83" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#1a4a6a' : '#64748b'}>tg_inbound_queue</text>

        {/* Discord adapter */}
        <rect x="576" y="32" width="200" height="58" rx="7" fill={isDark ? '#0b0c26' : '#f1f5f9'} stroke="#5865f2" strokeWidth="1.5" />
        <text x="676" y="54" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#7c84f8" letterSpacing="1">DISCORD</text>
        <text x="676" y="70" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#5865f2" opacity="0.8">discord.py v2 · gateway</text>
        <text x="676" y="83" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#2a2a5a' : '#64748b'}>dc_inbound_queue</text>

        {/* Arrows: adapters → bus */}
        {/* TG: right edge of TG box → bus left */}
        <line x1="124" y1="90" x2="124" y2="130" stroke="#26a5e4" strokeWidth="1.5" markerEnd={`url(#${markerTg})`} className={animClass} />
        <line x1="676" y1="90" x2="676" y2="130" stroke="#5865f2" strokeWidth="1.5" markerEnd={`url(#${markerDc})`} className={animClass} style={{ animationDelay: '0.35s' }} />

        {/* ─── ROW 2: InboundBus (y=130..175) ─── */}
        <text x="24" y="126" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fbbf24" letterSpacing="1.5">INBOUND BUS · staging queue</text>
        <rect x="24" y="132" width="752" height="43" rx="8" fill={isDark ? '#120d06' : '#fef9f0'} stroke="#fbbf24" strokeWidth="1.5" />
        <text x="400" y="151" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#fbbf24">InboundBus</text>
        <text x="400" y="167" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#8a6a20' : '#92600a'}>per-platform bounded queues (maxsize=100) · backpressure via await put()</text>

        {/* Arrow: Bus → Hub */}
        <line x1="400" y1="175" x2="400" y2="215" stroke="#818cf8" strokeWidth="2" markerEnd={`url(#${markerHub})`} className={animClass} />

        {/* ─── ROW 3: Hub (y=215..305) ─── */}
        <text x="24" y="211" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#818cf8" letterSpacing="1.5">HUB · orchestration</text>

        {/* Hub box */}
        <rect x="160" y="217" width="480" height="88" rx="9" fill={isDark ? '#0f0d1e' : '#f5f3ff'} stroke="#818cf8" strokeWidth="1.5" />
        <text x="400" y="240" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#818cf8">Hub.run_loop()</text>
        <text x="400" y="258" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a78bfa">resolve_binding(platform, bot_id, scope_id)</text>
        <text x="400" y="274" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#a78bfa">get_or_create_pool(binding)</text>
        <text x="400" y="290" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={isDark ? '#6a5a8a' : '#7c3aed'}>agent.process(msg, pool)</text>

        {/* Arrow: Hub → split */}
        <line x1="400" y1="305" x2="400" y2="340" stroke="#818cf8" strokeWidth="2" markerEnd={`url(#${markerHub})`} className={animClass} style={{ animationDelay: '0.2s' }} />

        {/* ─── ROW 4: Splitter line (y=340) ─── */}
        {/* Horizontal bar connecting the two output branches */}
        <line x1="200" y1="355" x2="600" y2="355" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Down left */}
        <line x1="200" y1="340" x2="200" y2="395" stroke="#34d399" strokeWidth="1.5" markerEnd={`url(#${markerOut})`} className={animClass2} />
        {/* Down right */}
        <line x1="600" y1="340" x2="600" y2="395" stroke="#34d399" strokeWidth="1.5" markerEnd={`url(#${markerOut})`} className={animClass2} style={{ animationDelay: '0.3s' }} />

        {/* ─── ROW 5: Outbound queues (y=395..460) ─── */}
        <text x="24" y="391" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#34d399" letterSpacing="1.5">OUTBOUND</text>

        {/* tg_outbound */}
        <rect x="60" y="397" width="280" height="58" rx="7" fill={isDark ? '#091a12' : '#f0fdf4'} stroke="#34d399" strokeWidth="1.5" />
        <text x="200" y="419" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#34d399">tg_outbound</text>
        <text x="200" y="435" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#34d399" opacity="0.6">adapter.send(msg)</text>
        <text x="200" y="450" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#1a6a3a' : '#15803d'}>→ Telegram</text>

        {/* dc_outbound */}
        <rect x="460" y="397" width="280" height="58" rx="7" fill={isDark ? '#0a0f1a' : '#f8fafc'} stroke="#34d399" strokeWidth="1.5" />
        <text x="600" y="419" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#34d399">dc_outbound</text>
        <text x="600" y="435" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#34d399" opacity="0.6">adapter.send(msg)</text>
        <text x="600" y="450" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#1a3a6a' : '#1d4ed8'}>→ Discord</text>

        {/* ─── "one lookup" label ─── */}
        <text x="400" y="495" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={isDark ? '#3d4f6b' : '#94a3b8'} letterSpacing="1">
          one lookup · deterministic routing · no guesswork
        </text>
      </svg>
    </>
  )
}

export default function ArchitectureSection() {
  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[150px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
            {m.talk_li_arch_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-cyan-600 dark:text-cyan-300">
            {m.talk_li_arch_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <div className="rounded-xl border border-border/50 overflow-hidden max-w-3xl">
            <LyraArchitectureDiagram />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <div className="max-w-2xl rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-5">
            <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
              {m.talk_li_arch_routing_label()}
            </p>
            <p className="font-mono text-sm text-foreground/80">
              <span className="text-cyan-600 dark:text-cyan-300">(platform, bot_id, scope_id)</span>
              <span className="text-muted-foreground mx-2">→</span>
              <span className="text-violet-600 dark:text-violet-300">(agent, pool_id)</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground/70 leading-relaxed">
              {m.talk_li_arch_routing_desc()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
