import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function NextSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_next_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_next_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_next_desc()}
          </p>
        </AnimatedSection>

        {/* Wrong vs Right mental model */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Wrong model */}
            <div className="rounded-lg border border-[var(--sb-red)]/30 bg-[var(--sb-red)]/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">✗</span>
                <span className="font-mono text-sm text-[var(--sb-red)] font-semibold">
                  {m.talk_sb_next_wrong_title()}
                </span>
              </div>
              <p className="text-[11px] text-[var(--sb-text)]/60 leading-relaxed">
                {m.talk_sb_next_wrong_desc()}
              </p>
            </div>

            {/* Right model */}
            <div className="rounded-lg border border-[var(--sb-green)]/30 bg-[var(--sb-green)]/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">✓</span>
                <span className="font-mono text-sm text-[var(--sb-green)] font-semibold">
                  {m.talk_sb_next_right_title()}
                </span>
              </div>
              <p className="text-[11px] text-[var(--sb-text)]/60 leading-relaxed">
                {m.talk_sb_next_right_desc()}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Identity trap */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-3">
              {m.talk_sb_next_identity_title()}
            </p>
            <p className="text-sm text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_next_identity_desc()}
            </p>
          </div>
        </AnimatedSection>

        {/* The key question */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/5 p-6 text-center">
            <p className="text-base text-[var(--sb-text)]/80 leading-relaxed italic font-medium sm:text-lg">
              "{m.talk_sb_next_question()}"
            </p>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_next_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
