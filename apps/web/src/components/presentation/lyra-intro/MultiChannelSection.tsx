import { lazy, Suspense } from 'react'
import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const DiscordDemo = lazy(() => import('./demos/DiscordDemo').then((mod) => ({ default: mod.DiscordDemo })))

const colorMap = {
  cyan: { border: 'border-cyan-400/30', bg: 'bg-cyan-500/5', title: 'text-cyan-600 dark:text-cyan-300' },
  violet: { border: 'border-violet-400/30', bg: 'bg-violet-500/5', title: 'text-violet-600 dark:text-violet-300' },
  emerald: { border: 'border-emerald-400/30', bg: 'bg-emerald-500/5', title: 'text-emerald-600 dark:text-emerald-300' },
}

export default function MultiChannelSection() {
  const points = [
    {
      getTitle: () => m.talk_li_mc_p1_title(),
      getBody: () => m.talk_li_mc_p1_body(),
      color: 'cyan' as const,
    },
    {
      getTitle: () => m.talk_li_mc_p2_title(),
      getBody: () => m.talk_li_mc_p2_body(),
      color: 'violet' as const,
    },
    {
      getTitle: () => m.talk_li_mc_p3_title(),
      getBody: () => m.talk_li_mc_p3_body(),
      color: 'emerald' as const,
    },
    {
      getTitle: () => m.talk_li_mc_p4_title(),
      getBody: () => m.talk_li_mc_p4_body(),
      color: 'cyan' as const,
    },
  ]

  return (
    <div className="relative mx-auto max-w-5xl w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[150px]" />
      </div>

      <div className="relative flex flex-col lg:flex-row lg:gap-8 lg:items-stretch">
        {/* Left column — content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <AnimatedSection>
            <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
              {m.talk_li_mc_phase()}
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-cyan-600 dark:text-cyan-300">
              {m.talk_li_mc_title()}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {points.map((p, i) => {
                const c = colorMap[p.color]
                return (
                  <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-5`}>
                    <p className={`font-mono text-sm font-bold ${c.title} mb-2`}>{p.getTitle()}</p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{p.getBody()}</p>
                  </div>
                )
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-6">
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-5">
              <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
                {m.talk_li_mc_routing_label()}
              </p>
              <div className="font-mono text-xs sm:text-sm break-all">
                <span className="text-cyan-600 dark:text-cyan-300">(platform, bot_id, scope_id)</span>
                <span className="text-muted-foreground mx-1">→</span>
                <span className="text-violet-600 dark:text-violet-300">(agent, pool_id)</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground/60">
                {m.talk_li_mc_routing_note()}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Right column — Discord demo, stretches to match left column */}
        <div className="mt-8 lg:mt-0 w-full lg:w-[360px] shrink-0 flex flex-col">
          <div className="w-full max-w-[360px] mx-auto rounded-xl overflow-hidden border border-border/50 shadow-xl flex-1 flex flex-col">
            <Suspense fallback={<div className="w-full flex-1 min-h-[300px] bg-muted/20 animate-pulse rounded-xl" />}>
              <DiscordDemo />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
