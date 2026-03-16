import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

// ── Color tokens ────────────────────────────────────────────────────────────

const CAT_COLORS = {
  teal: {
    border: 'border-l-teal-400',
    iconBg: 'bg-teal-500/10 border border-teal-400/30',
    name: 'text-teal-600 dark:text-teal-300',
    badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-400/30',
    arrow: 'text-teal-500/60 dark:text-teal-400/60',
    nodeBg: 'bg-teal-500/10 border-teal-400/30',
    nodeText: 'text-teal-600 dark:text-teal-300',
  },
  violet: {
    border: 'border-l-violet-400',
    iconBg: 'bg-violet-500/10 border border-violet-400/30',
    name: 'text-violet-600 dark:text-violet-300',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-400/30',
    arrow: 'text-violet-500/60 dark:text-violet-400/60',
    nodeBg: 'bg-violet-500/10 border-violet-400/30',
    nodeText: 'text-violet-600 dark:text-violet-300',
  },
  pink: {
    border: 'border-l-pink-400',
    iconBg: 'bg-pink-500/10 border border-pink-400/30',
    name: 'text-pink-600 dark:text-pink-300',
    badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-400/30',
    arrow: 'text-pink-500/60 dark:text-pink-400/60',
    nodeBg: 'bg-pink-500/10 border-pink-400/30',
    nodeText: 'text-pink-600 dark:text-pink-300',
  },
  green: {
    border: 'border-l-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-400/30',
    name: 'text-emerald-600 dark:text-emerald-300',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30',
    arrow: 'text-emerald-500/60 dark:text-emerald-400/60',
    nodeBg: 'bg-emerald-500/10 border-emerald-400/30',
    nodeText: 'text-emerald-600 dark:text-emerald-300',
  },
  amber: {
    border: 'border-l-amber-400',
    iconBg: 'bg-amber-500/10 border border-amber-400/30',
    name: 'text-amber-600 dark:text-amber-300',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-400/30',
    arrow: 'text-amber-500/60 dark:text-amber-400/60',
    nodeBg: 'bg-amber-500/10 border-amber-400/30',
    nodeText: 'text-amber-600 dark:text-amber-300',
  },
  orange: {
    border: 'border-l-orange-400',
    iconBg: 'bg-orange-500/10 border border-orange-400/30',
    name: 'text-orange-600 dark:text-orange-300',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-400/30',
    arrow: 'text-orange-500/60 dark:text-orange-400/60',
    nodeBg: 'bg-orange-500/10 border-orange-400/30',
    nodeText: 'text-orange-600 dark:text-orange-300',
  },
  indigo: {
    border: 'border-l-indigo-400',
    iconBg: 'bg-indigo-500/10 border border-indigo-400/30',
    name: 'text-indigo-600 dark:text-indigo-300',
    badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-400/30',
    arrow: 'text-indigo-500/60 dark:text-indigo-400/60',
    nodeBg: 'bg-indigo-500/10 border-indigo-400/30',
    nodeText: 'text-indigo-600 dark:text-indigo-300',
  },
} as const

type CatColorKey = keyof typeof CAT_COLORS

// ── Data ────────────────────────────────────────────────────────────────────

interface Category {
  name: string
  count: number
  icon: string
  color: CatColorKey
  flow: string[]
}

function getCategories(): Category[] {
  return [
    {
      name: m.talk_li_hp_cat1_name(),
      count: 4,
      icon: '💬',
      color: 'teal',
      flow: ['Adapter', 'Bus', 'Hub', 'Pool', 'Agent', 'LLM', 'Dispatch'],
    },
    {
      name: m.talk_li_hp_cat2_name(),
      count: 5,
      icon: '⌨️',
      color: 'violet',
      flow: ['Parser', 'Router', 'Handler', 'Response'],
    },
    {
      name: m.talk_li_hp_cat3_name(),
      count: 3,
      icon: '🎤',
      color: 'pink',
      flow: ['Adapter', 'STT', 'Text', 'Agent', 'TTS', 'Voice'],
    },
    {
      name: m.talk_li_hp_cat4_name(),
      count: 5,
      icon: '🧠',
      color: 'green',
      flow: ['Pool', 'History', 'Compact', 'L3 Semantic'],
    },
    {
      name: m.talk_li_hp_cat5_name(),
      count: 4,
      icon: '🔀',
      color: 'amber',
      flow: ['SmartRoute', 'CircuitBreaker', 'Retry', 'Driver'],
    },
    {
      name: m.talk_li_hp_cat6_name(),
      count: 3,
      icon: '🔐',
      color: 'orange',
      flow: ['AuthMiddleware', 'TrustLevel', 'Isolate'],
    },
    {
      name: m.talk_li_hp_cat7_name(),
      count: 2,
      icon: '📊',
      color: 'indigo',
      flow: ['Attach', 'Agent', 'Render', 'TurnStore'],
    },
  ]
}

// ── Component legend entries ────────────────────────────────────────────────

const legendItems = [
  { label: 'Adapter', color: 'bg-teal-400' },
  { label: 'Bus', color: 'bg-amber-400' },
  { label: 'Hub', color: 'bg-indigo-400' },
  { label: 'Pool', color: 'bg-violet-400' },
  { label: 'Agent', color: 'bg-orange-400' },
  { label: 'LLM', color: 'bg-pink-400' },
  { label: 'Dispatch', color: 'bg-blue-400' },
]

// ── Sub-components ──────────────────────────────────────────────────────────

function FlowArrow({ colorClass }: { colorClass: string }) {
  return (
    <span className={`mx-1 shrink-0 font-mono text-[11px] leading-none ${colorClass}`} aria-hidden="true">
      →
    </span>
  )
}

function FlowNode({ label, nodeBg, nodeText }: { label: string; nodeBg: string; nodeText: string }) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 font-mono text-[10px] leading-none border ${nodeBg} ${nodeText} shrink-0`}
    >
      {label}
    </span>
  )
}

function FlowPipeline({ nodes, color }: { nodes: string[]; color: CatColorKey }) {
  const c = CAT_COLORS[color]
  return (
    <div className="flex flex-wrap items-center gap-y-1 mt-3">
      {nodes.map((node, i) => (
        <span key={node} className="flex items-center">
          <FlowNode label={node} nodeBg={c.nodeBg} nodeText={c.nodeText} />
          {i < nodes.length - 1 && <FlowArrow colorClass={c.arrow} />}
        </span>
      ))}
    </div>
  )
}

function CategoryCard({ cat }: { cat: Category }) {
  const c = CAT_COLORS[cat.color]
  return (
    <div
      className={`relative rounded-lg border border-border/50 bg-foreground/[0.03] border-l-[3px] ${c.border} p-4`}
    >
      <div className="flex items-start gap-3">
        {/* Icon badge */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${c.iconBg}`}
          aria-hidden="true"
        >
          {cat.icon}
        </span>

        <div className="min-w-0 flex-1">
          {/* Name + count */}
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${c.name}`}>
              {cat.name}
            </span>
            <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${c.badge}`}>
              {cat.count}
            </span>
          </div>

          {/* Mini flow pipeline */}
          <FlowPipeline nodes={cat.flow} color={cat.color} />
        </div>
      </div>
    </div>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function HappyPathsSection() {
  const categories = getCategories()
  const totalPaths = categories.reduce((sum, c) => sum + c.count, 0)

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-teal-500/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative">
        {/* ── Header ── */}
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-teal-600 dark:text-teal-400 uppercase">
            {m.talk_li_hp_phase()}
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-teal-700 dark:text-teal-300 lg:text-5xl">
            {m.talk_li_hp_title()}
          </h2>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            {m.talk_li_hp_subtitle()}
          </p>
        </AnimatedSection>

        {/* ── Part 1: Stats hero ── */}
        <AnimatedSection className="mt-8">
          <div className="inline-flex divide-x divide-border/50 overflow-hidden rounded-lg border border-border/50 bg-foreground/[0.03]">
            <div className="px-7 py-4 text-center">
              <div className="font-mono text-3xl font-bold text-foreground tabular-nums">{totalPaths}</div>
              <div className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.talk_li_hp_stat_paths()}
              </div>
            </div>
            <div className="px-7 py-4 text-center">
              <div className="font-mono text-3xl font-bold text-foreground tabular-nums">{categories.length}</div>
              <div className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.talk_li_hp_stat_categories()}
              </div>
            </div>
            <div className="px-7 py-4 text-center">
              <div className="font-mono text-3xl font-bold text-foreground tabular-nums">0</div>
              <div className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.talk_li_hp_stat_deps()}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Part 2: Category grid ── */}
        <AnimatedSection className="mt-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} cat={cat} />
            ))}
          </div>
        </AnimatedSection>

        {/* ── Part 3: Component legend ── */}
        <AnimatedSection className="mt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-border/50 bg-foreground/[0.03] px-4 py-3">
            <span className="mr-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {m.talk_li_hp_legend_label()}
            </span>
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${item.color}`} aria-hidden="true" />
                <span className="font-mono text-[10px] font-medium tracking-wide text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
