import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function ClosingSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-10 py-4">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_closing_badge()}
          </Badge>
        </AnimatedSection>

        {/* Hero title with glow */}
        <AnimatedSection>
          <div className="relative">
            {/* Glow behind text */}
            <div
              className="pointer-events-none absolute inset-0 blur-3xl opacity-20"
              style={{ background: 'radial-gradient(ellipse at center, var(--sb-accent) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <h2
              className="relative mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Chakra Petch', system-ui, sans-serif" }}
            >
              <span className="bg-gradient-to-br from-[var(--sb-ember)] via-[var(--sb-accent)] to-[#ea580c] bg-clip-text text-transparent">
                {m.talk_sb_closing_title()}
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <blockquote className="mx-auto max-w-2xl">
            <p className="text-lg text-[var(--sb-text)]/70 leading-relaxed italic sm:text-xl">
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
              className="flex items-center gap-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] px-5 py-2.5 font-mono text-sm text-[var(--sb-text)]/70 hover:text-[var(--sb-accent)] hover:border-[var(--sb-accent)]/30 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Roxabi/roxabi-plugins"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] px-5 py-2.5 font-mono text-sm text-[var(--sb-text)]/70 hover:text-[var(--sb-accent)] hover:border-[var(--sb-accent)]/30 transition-colors"
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
