import { AnimatedSection, Badge, StatCounter } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function IntroSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-ember)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_intro_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="sb-title mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="bg-gradient-to-br from-[var(--sb-ember)] via-[var(--sb-accent)] to-[#ea580c] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(232,93,4,0.4)]">
              {m.talk_sb_intro_title()}
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-2xl text-base text-[var(--sb-text)]/60 sm:text-lg uppercase tracking-[0.1em] font-mono">
            {m.talk_sb_intro_subtitle()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-1 rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/8 px-6 py-3 [&_p:first-child]:text-2xl [&_p:first-child]:text-[var(--sb-accent)] [&_p:last-child]:hidden">
              <StatCounter value={4196} label={m.talk_sb_intro_stat_commits()} />
              <span className="font-mono text-[10px] text-[var(--sb-dim)] uppercase tracking-wider">
                {m.talk_sb_intro_stat_commits()}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/8 px-6 py-3 [&_p:first-child]:text-2xl [&_p:first-child]:text-[var(--sb-accent)] [&_p:last-child]:hidden">
              <StatCounter value={18} label={m.talk_sb_intro_stat_repos()} />
              <span className="font-mono text-[10px] text-[var(--sb-dim)] uppercase tracking-wider">
                {m.talk_sb_intro_stat_repos()}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/8 px-6 py-3 [&_p:first-child]:text-2xl [&_p:first-child]:text-[var(--sb-accent)] [&_p:last-child]:hidden">
              <StatCounter value={83} label={m.talk_sb_intro_stat_days()} />
              <span className="font-mono text-[10px] text-[var(--sb-dim)] uppercase tracking-wider">
                {m.talk_sb_intro_stat_days()}
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <blockquote className="mx-auto max-w-2xl border-l-2 border-[var(--sb-accent)]/40 pl-4 text-left">
            <p className="text-sm italic text-[var(--sb-text)]/50 leading-relaxed">
              {m.talk_sb_intro_hook()}
            </p>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection>
          <p className="motion-safe:animate-pulse font-mono text-[11px] tracking-[0.3em] text-[var(--sb-accent)]/60 select-none">
            {m.talk_sb_intro_scroll()}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
