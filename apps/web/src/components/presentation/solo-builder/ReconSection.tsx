import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const RECON_STEPS = [
  { num: '01', text: () => m.talk_sb_recon_method_step1(), icon: '🔍' },
  { num: '02', text: () => m.talk_sb_recon_method_step2(), icon: '⚙️' },
  { num: '03', text: () => m.talk_sb_recon_method_step3(), icon: '✂️' },
  { num: '04', text: () => m.talk_sb_recon_method_step4(), icon: '🔧' },
]

export function ReconSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_recon_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_recon_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_recon_desc()}
          </p>
        </AnimatedSection>

        {/* Two examples side by side */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Example 1: Video scraping */}
            <div className="rounded-lg border border-[var(--sb-ember)]/30 bg-[var(--sb-surface)] p-5">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-sm text-[var(--sb-ember)] font-semibold">
                  {m.talk_sb_recon_example1_title()}
                </span>
                <span className="font-mono text-[10px] text-[var(--sb-red)] font-bold">
                  {m.talk_sb_recon_example1_score()}
                </span>
              </div>
              <p className="text-[11px] text-[var(--sb-text)]/60 leading-relaxed">
                {m.talk_sb_recon_example1_desc()}
              </p>
            </div>

            {/* Example 2: Claw family */}
            <div className="rounded-lg border border-[var(--sb-teal)]/30 bg-[var(--sb-surface)] p-5">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-sm text-[var(--sb-teal)] font-semibold">
                  {m.talk_sb_recon_example2_title()}
                </span>
              </div>
              <p className="text-[11px] text-[var(--sb-text)]/60 leading-relaxed">
                {m.talk_sb_recon_example2_desc()}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* The recon loop */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-4">{m.talk_sb_recon_method_title()}</p>
            <div className="grid gap-3 sm:grid-cols-4">
              {RECON_STEPS.map((step, i) => (
                <div key={step.num} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--sb-accent)]/10">
                    <span className="text-sm">{step.icon}</span>
                  </div>
                  <div className="flex-1 sm:flex-initial">
                    <p className="font-mono text-[10px] text-[var(--sb-accent)] font-bold mb-0.5">{step.num}</p>
                    <p className="text-[11px] text-[var(--sb-text)]/70">{step.text()}</p>
                    {i < RECON_STEPS.length - 1 && (
                      <span className="hidden sm:block font-mono text-[var(--sb-dim)] mt-2">↓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_recon_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
