import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function TitleSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <Badge className="border border-amber-400/50 bg-amber-500/15 text-amber-300 tracking-widest uppercase text-[10px] font-mono">
            {m.talk_lp_title_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl font-mono leading-tight">
            <span className="bg-gradient-to-br from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              {m.talk_lp_title_title()}
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-2xl text-base text-amber-100/60 sm:text-lg uppercase tracking-[0.1em] font-mono">
            {m.talk_lp_title_subtitle()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <blockquote className="mx-auto max-w-2xl border-l-2 border-amber-500/40 pl-4 text-left">
            <p className="text-sm italic text-muted-foreground/70 leading-relaxed">
              {m.talk_lp_title_epigraph()}
            </p>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-amber-300">
                {m.talk_lp_title_stat1()}
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-amber-400/40" />
            <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-amber-300">
                {m.talk_lp_title_stat2()}
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-amber-400/40" />
            <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/8 px-4 py-2">
              <span className="font-mono text-sm font-bold text-amber-300">
                {m.talk_lp_title_stat3()}
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="motion-safe:animate-pulse font-mono text-[11px] tracking-[0.3em] text-amber-400/60 select-none">
            {m.talk_lp_title_prompt()}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
