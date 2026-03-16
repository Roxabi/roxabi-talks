import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const phases = [
  {
    id: 'p1',
    status: 'done',
    getTitle: () => m.talk_li_road_phase1_title(),
    getDesc: () => m.talk_li_road_phase1_desc(),
  },
  {
    id: 'p2',
    status: 'next',
    getTitle: () => m.talk_li_road_phase2_title(),
    getDesc: () => m.talk_li_road_phase2_desc(),
  },
  {
    id: 'p3',
    status: 'future',
    getTitle: () => m.talk_li_road_phase3_title(),
    getDesc: () => m.talk_li_road_phase3_desc(),
  },
  {
    id: 'p4',
    status: 'future',
    getTitle: () => m.talk_li_road_phase4_title(),
    getDesc: () => m.talk_li_road_phase4_desc(),
  },
  {
    id: 'p5',
    status: 'future',
    getTitle: () => m.talk_li_road_phase5_title(),
    getDesc: () => m.talk_li_road_phase5_desc(),
  },
]

export default function RoadmapSection() {
  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-500 dark:text-cyan-400 uppercase">
            {m.talk_li_road_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-8 font-mono text-cyan-600 dark:text-cyan-300">
            {m.talk_li_road_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <div className="max-w-2xl space-y-3">
            {phases.map((phase, i) => {
              const isDone = phase.status === 'done'
              const isNext = phase.status === 'next'

              return (
                <div key={phase.id} className="flex items-start gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mt-2.5 shrink-0 ${
                        isDone
                          ? 'bg-emerald-400'
                          : isNext
                            ? 'bg-cyan-400 ring-2 ring-cyan-400/30'
                            : 'bg-muted-foreground/40'
                      }`}
                    />
                    {i < phases.length - 1 && (
                      <div className="w-px bg-border/50 mt-1 h-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-lg border p-4 ${
                      isDone
                        ? 'border-emerald-400/25 bg-emerald-500/5'
                        : isNext
                          ? 'border-cyan-400/25 bg-cyan-500/5'
                          : 'border-slate-400/10 bg-slate-500/3'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {phase.getTitle()}
                      </span>
                      <span
                        className={`ml-auto font-mono text-[9px] border rounded px-1.5 py-0.5 ${
                          isDone
                            ? 'text-emerald-500 dark:text-emerald-400 border-emerald-400/30'
                            : isNext
                              ? 'text-cyan-500 dark:text-cyan-400 border-cyan-400/30'
                              : 'text-muted-foreground border-muted-foreground/20'
                        }`}
                      >
                        {isDone ? m.talk_li_road_status_live() : isNext ? m.talk_li_road_status_next() : m.talk_li_road_status_planned()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">{phase.getDesc()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
