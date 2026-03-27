import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

export default function TheProblemSection() {
  const problems = [
    {
      tool: m.talk_li_problem_tool1(),
      pain: m.talk_li_problem_pain1(),
    },
    {
      tool: m.talk_li_problem_tool2(),
      pain: m.talk_li_problem_pain2(),
    },
    {
      tool: m.talk_li_problem_tool3(),
      pain: m.talk_li_problem_pain3(),
    },
    {
      tool: m.talk_li_problem_tool4(),
      pain: m.talk_li_problem_pain4(),
    },
  ]

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-[350px] w-[350px] rounded-full bg-rose-500/5 blur-[130px]" />
        <div className="absolute right-0 bottom-1/4 h-[250px] w-[250px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {m.talk_li_problem_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-foreground">
            {m.talk_li_problem_title_prefix()}{' '}
            <span className="text-rose-500 dark:text-rose-400">{m.talk_li_problem_title_highlight()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
            {problems.map((p) => (
              <div
                key={p.tool}
                className="rounded-xl border border-border bg-muted/30 p-5 hover:bg-muted/50 transition-colors"
              >
                <p className="font-mono text-xs font-bold text-foreground/80 mb-2">{p.tool}</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{p.pain}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="flex items-center gap-3 max-w-xl">
            <div className="h-px flex-1 bg-cyan-400/20" />
            <p className="font-mono text-base font-semibold text-cyan-600 dark:text-cyan-300">
              {m.talk_li_problem_tagline()}
            </p>
            <div className="h-px flex-1 bg-cyan-400/20" />
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
