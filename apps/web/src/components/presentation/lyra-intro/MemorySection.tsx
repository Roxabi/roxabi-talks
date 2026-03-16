import { useId } from 'react'
import { useTheme } from 'next-themes'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

type MemLevel = {
  id: string
  status: 'live' | 'planned'
  getName: () => string
  getDesc: () => string
}

const levels: MemLevel[] = [
  {
    id: 'L0',
    status: 'live',
    getName: () => m.talk_li_mem_l0_name(),
    getDesc: () => m.talk_li_mem_l0_desc(),
  },
  {
    id: 'L1',
    status: 'live',
    getName: () => m.talk_li_mem_l1_name(),
    getDesc: () => m.talk_li_mem_l1_desc(),
  },
  {
    id: 'L2',
    status: 'planned',
    getName: () => m.talk_li_mem_l2_name(),
    getDesc: () => m.talk_li_mem_l2_desc(),
  },
  {
    id: 'L3',
    status: 'live',
    getName: () => m.talk_li_mem_l3_name(),
    getDesc: () => m.talk_li_mem_l3_desc(),
  },
  {
    id: 'L4',
    status: 'planned',
    getName: () => m.talk_li_mem_l4_name(),
    getDesc: () => m.talk_li_mem_l4_desc(),
  },
]

// Per-status color tokens (Tailwind arbitrary values kept minimal — no dynamic class names)
const STATUS_STYLES = {
  live: {
    border: 'border-emerald-400/35',
    bg: 'bg-emerald-500/6',
    accent: '#10b981',
    accentBorder: 'rgba(16,185,129,0.35)',
    idColor: 'text-emerald-600 dark:text-emerald-300',
    badgeText: 'text-emerald-500 dark:text-emerald-400',
    badgeBorder: 'border-emerald-400/30',
    getLabel: () => m.talk_li_road_status_live(),
  },
  planned: {
    border: 'border-slate-400/20',
    bg: 'bg-slate-500/4',
    accent: '#94a3b8',
    accentBorder: 'rgba(148,163,184,0.25)',
    idColor: 'text-muted-foreground',
    badgeText: 'text-muted-foreground',
    badgeBorder: 'border-slate-400/25',
    getLabel: () => m.talk_li_road_status_planned(),
  },
} satisfies Record<MemLevel['status'], unknown>

// L3 gets teal override on top of base 'live' styles
const L3_OVERRIDES = {
  border: 'border-cyan-400/35',
  bg: 'bg-cyan-500/6',
  accent: '#06b6d4',
  accentBorder: 'rgba(6,182,212,0.35)',
  idColor: 'text-cyan-600 dark:text-cyan-300',
  badgeText: 'text-cyan-500 dark:text-cyan-400',
  badgeBorder: 'border-cyan-400/30',
  getLabel: () => m.talk_li_road_status_live(),
}

function getStyles(level: MemLevel) {
  if (level.id === 'L3') return L3_OVERRIDES
  return STATUS_STYLES[level.status]
}

function MemCard({ level }: { level: MemLevel }) {
  const s = getStyles(level)
  return (
    <div
      className={`relative flex flex-col gap-3 rounded-lg border ${s.border} ${s.bg} p-4 overflow-hidden`}
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: s.accent }}
      />

      {/* Level number */}
      <span className={`font-mono text-2xl font-bold leading-none ${s.idColor}`}>
        {level.id}
      </span>

      {/* Name */}
      <span className="font-mono text-sm font-semibold text-foreground leading-snug">
        {level.getName()}
      </span>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground/75 leading-relaxed flex-1">{level.getDesc()}</p>

      {/* Status badge */}
      <span
        className={`self-start font-mono text-[9px] font-bold uppercase tracking-wide border rounded px-1.5 py-0.5 ${s.badgeText} ${s.badgeBorder}`}
      >
        {s.getLabel()}
      </span>
    </div>
  )
}

function RecallFlowSVG({ reducedMotion }: { reducedMotion: boolean }) {
  const uid = useId().replace(/:/g, '')
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const animStyle = reducedMotion ? {} : { animation: `svgfl-${uid} 1.4s linear infinite` }
  const animStyle2 = reducedMotion
    ? {}
    : { animation: `svgfl-${uid} 1.4s linear infinite`, animationDelay: '0.4s' }
  const animStyle3 = reducedMotion
    ? {}
    : { animation: `svgfl-${uid} 1.4s linear infinite`, animationDelay: '0.8s' }
  const animStyleUp = reducedMotion
    ? {}
    : { animation: `svgfl-${uid} 1.4s linear infinite`, animationDelay: '0.2s' }

  return (
    <>
      {!reducedMotion && (
        <style>{`@keyframes svgfl-${uid} { from { stroke-dashoffset: 20 } to { stroke-dashoffset: 0 } }`}</style>
      )}
      <svg
        viewBox="0 0 700 130"
        aria-label="Recall flow diagram: Message goes through BM25 and cosine search, pulling from L3 SQLite DB, into a MEMORY block, then injected into the System Prompt"
        role="img"
        className="w-full max-w-2xl"
      >
        <defs>
          <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
          </marker>
          <marker id={`arr2-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" />
          </marker>
        </defs>

        {/* Node: Message */}
        <rect x="10" y="44" width="96" height="36" rx="6" fill={isDark ? 'rgba(30,41,59,0.9)' : 'rgba(241,245,249,0.9)'} stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
        <text x="58" y="64" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#1e293b'}>Message</text>

        {/* Arrow: Message → BM25 */}
        <line x1="107" y1="62" x2="172" y2="62" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="6 4" markerEnd={`url(#arr-${uid})`} style={animStyle} />

        {/* Node: BM25 + cosine */}
        <rect x="174" y="38" width="136" height="48" rx="6" fill="rgba(109,40,217,0.12)" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
        <text x="242" y="59" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fontWeight="700" fill="#a78bfa">BM25 + cosine</text>
        <text x="242" y="74" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="#7c6eb0">hybrid search</text>

        {/* Arrow: BM25 → MEMORY block */}
        <line x1="311" y1="62" x2="386" y2="62" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="6 4" markerEnd={`url(#arr-${uid})`} style={animStyle2} />

        {/* Node: MEMORY block */}
        <rect x="388" y="38" width="110" height="48" rx="6" fill="rgba(6,182,212,0.09)" stroke="rgba(6,182,212,0.35)" strokeWidth="1" />
        <text x="443" y="57" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fontWeight="700" fill="#22d3ee">[MEMORY]</text>
        <text x="443" y="72" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="#0891b2">+ [PREFERENCES]</text>

        {/* Arrow: MEMORY → System Prompt */}
        <line x1="499" y1="62" x2="574" y2="62" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 4" markerEnd={`url(#arr2-${uid})`} style={animStyle3} />

        {/* Node: System Prompt */}
        <rect x="576" y="38" width="114" height="48" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
        <text x="633" y="57" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fontWeight="700" fill="#34d399">System Prompt</text>
        <text x="633" y="72" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="#059669">injected context</text>

        {/* L3 DB node below BM25 */}
        <rect x="192" y="100" width="100" height="26" rx="5" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <text x="242" y="116" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fontWeight="700" fill="#22d3ee">L3 SQLite DB</text>

        {/* Arrow: L3 DB ↑ to BM25 */}
        <line x1="242" y1="100" x2="242" y2="87" stroke="#06b6d4" strokeWidth="1.2" strokeDasharray="4 3" markerEnd={`url(#arr2-${uid})`} style={animStyleUp} />
      </svg>
    </>
  )
}

export default function MemorySection() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-violet-500/6 blur-[130px]" />
        <div className="absolute left-0 bottom-1/4 h-[200px] w-[200px] rounded-full bg-cyan-500/4 blur-[100px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-violet-500 dark:text-violet-400 uppercase">
            {m.talk_li_mem_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-violet-600 dark:text-violet-300">
            {m.talk_li_mem_title()}
          </h2>
        </AnimatedSection>

        {/* Memory level grid: 5 cols desktop, 2 cols mobile */}
        <AnimatedSection className="mt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {levels.map((level) => (
              <MemCard key={level.id} level={level} />
            ))}
          </div>
        </AnimatedSection>

        {/* Recall flow diagram */}
        <AnimatedSection className="mt-8">
          <div className="rounded-xl border border-violet-400/20 bg-violet-500/5 p-5">
            <p className="font-mono text-[10px] text-violet-400 uppercase tracking-widest mb-4">
              {m.talk_li_mem_recall_label()}
            </p>
            <RecallFlowSVG reducedMotion={reducedMotion} />
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
