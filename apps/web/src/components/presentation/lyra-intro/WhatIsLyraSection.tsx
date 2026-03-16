import { lazy, Suspense } from 'react'
import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const TelegramDemo = lazy(() => import('./demos/TelegramDemo').then((mod) => ({ default: mod.TelegramDemo })))

const colorMap = {
  cyan: {
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-500/8',
    text: 'text-cyan-600 dark:text-cyan-300',
  },
  violet: {
    border: 'border-violet-400/30',
    bg: 'bg-violet-500/8',
    text: 'text-violet-600 dark:text-violet-300',
  },
  emerald: {
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-500/8',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
}

export default function WhatIsLyraSection() {
  const principles = [
    {
      color: 'cyan' as const,
      getTitle: () => m.talk_li_what_p1_title(),
      getBody: () => m.talk_li_what_p1_body(),
    },
    {
      color: 'violet' as const,
      getTitle: () => m.talk_li_what_p2_title(),
      getBody: () => m.talk_li_what_p2_body(),
    },
    {
      color: 'emerald' as const,
      getTitle: () => m.talk_li_what_p3_title(),
      getBody: () => m.talk_li_what_p3_body(),
    },
  ]

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/6 blur-[150px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
            {m.talk_li_what_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 font-mono text-cyan-600 dark:text-cyan-300">
            {m.talk_li_what_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-2">
          <p className="max-w-2xl text-base text-foreground/80 leading-relaxed">
            {m.talk_li_what_body()}
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl">
            {principles.map((p) => {
              const c = colorMap[p.color]
              return (
                <div
                  key={p.color}
                  className={`rounded-xl border ${c.border} ${c.bg} p-5`}
                >
                  <p className={`font-mono text-sm font-bold ${c.text} mb-2`}>{p.getTitle()}</p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{p.getBody()}</p>
                </div>
              )
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <Badge className="border border-cyan-400/50 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-mono text-[10px] tracking-widest">
            {m.talk_li_what_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection className="mt-8 flex justify-center">
          <div className="max-w-sm w-full rounded-xl overflow-hidden border border-border/50 shadow-xl">
            <Suspense fallback={<div className="w-full aspect-[400/550] bg-muted/20 animate-pulse rounded-xl" />}>
              <TelegramDemo />
            </Suspense>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
