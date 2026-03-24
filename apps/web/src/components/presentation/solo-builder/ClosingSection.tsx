import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function ClosingSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_closing_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "'Chakra Petch', system-ui, sans-serif" }}>
            <span className="bg-gradient-to-br from-[var(--sb-ember)] via-[var(--sb-accent)] to-[#ea580c] bg-clip-text text-transparent">
              {m.talk_sb_closing_title()}
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <blockquote className="mx-auto max-w-2xl">
            <p className="text-lg text-[var(--sb-text)]/70 leading-relaxed italic">
              {m.talk_sb_closing_quote()}
            </p>
          </blockquote>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a
              href="https://github.com/Roxabi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] px-4 py-2 font-mono text-sm text-[var(--sb-text)]/70 hover:text-[var(--sb-accent)] hover:border-[var(--sb-accent)]/30 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Roxabi/roxabi-plugins"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] px-4 py-2 font-mono text-sm text-[var(--sb-text)]/70 hover:text-[var(--sb-accent)] hover:border-[var(--sb-accent)]/30 transition-colors"
            >
              roxabi-plugins
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="font-mono text-sm text-[var(--sb-dim)]">
            {m.talk_sb_closing_by()}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
