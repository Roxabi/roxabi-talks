import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

export default function ClosingSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/7 blur-[160px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[200px] w-[200px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <h1 className="text-5xl font-bold tracking-tight lg:text-7xl font-mono">
            <span className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-violet-600 dark:from-cyan-300 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.35)]">
              Lyra
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-xl text-base text-foreground/70 leading-relaxed">
            {m.talk_li_closing_tagline1()}
            <br />
            {m.talk_li_closing_tagline2()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[m.talk_li_closing_pill1(), m.talk_li_closing_pill2(), m.talk_li_closing_pill3()].map((pill) => (
              <div
                key={pill}
                className="rounded-full border border-cyan-400/25 bg-cyan-500/8 px-4 py-2"
              >
                <span className="font-mono text-sm text-cyan-600 dark:text-cyan-300">{pill}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="font-mono text-sm text-muted-foreground/50">{m.talk_li_closing_thanks()}</p>
        </AnimatedSection>
      </div>
    </div>
  )
}
