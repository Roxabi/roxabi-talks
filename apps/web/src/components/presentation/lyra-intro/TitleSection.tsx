import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'
import { LyraLogo } from './LyraLogo'

export default function TitleSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/6 blur-[120px]" />
      </div>

      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <div className="flex justify-center mb-2">
            <LyraLogo size={160} />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Badge className="border border-cyan-400/50 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 tracking-widest uppercase text-[10px] font-mono">
            {m.talk_li_title_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl font-mono leading-tight">
            <span className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-violet-600 dark:from-cyan-300 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              {m.talk_li_title_title()}
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-2xl text-base text-cyan-100/60 sm:text-lg uppercase tracking-[0.1em] font-mono">
            {m.talk_li_title_subtitle()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-300">{m.talk_li_title_stat1()}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-cyan-400/40" />
            <div className="flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-violet-600 dark:text-violet-300">{m.talk_li_title_stat2()}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-cyan-400/40" />
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-300">{m.talk_li_title_stat3()}</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="motion-safe:animate-pulse font-mono text-[11px] tracking-[0.3em] text-cyan-500/60 dark:text-cyan-400/60 select-none">
            {m.talk_li_title_scroll()}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
