import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const LOOP_STEPS = [
  { num: '1', text: () => m.talk_sb_tips_exploratory_step1(), icon: '◇' },
  { num: '2', text: () => m.talk_sb_tips_exploratory_step2(), icon: '◆' },
  { num: '3', text: () => m.talk_sb_tips_exploratory_step3(), icon: '◇' },
  { num: '4', text: () => m.talk_sb_tips_exploratory_step4(), icon: '↻' },
]

export function TipsSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-teal)]/50 bg-[var(--sb-teal)]/15 text-[var(--sb-teal)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_tips_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_tips_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_tips_desc()}
          </p>
        </AnimatedSection>

        {/* The exploratory loop */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-teal)]/30 bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-teal)] uppercase tracking-wider mb-4">{m.talk_sb_tips_exploratory_title()}</p>

            {/* Visual loop */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
              {LOOP_STEPS.map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 rounded-lg border border-[var(--sb-teal)]/30 px-4 py-3"
                    style={{ backgroundColor: `color-mix(in srgb, var(--sb-teal) ${i === 3 ? 15 : 6}%, transparent)` }}
                  >
                    <span className="font-mono text-sm text-[var(--sb-teal)]">{step.icon}</span>
                    <span className="font-mono text-[11px] text-[var(--sb-text)]/80">{step.text()}</span>
                  </div>
                  {i < LOOP_STEPS.length - 1 && (
                    <span className="font-mono text-[var(--sb-dim)] text-sm">→</span>
                  )}
                </div>
              ))}
            </div>

            <p className="font-mono text-[10px] text-[var(--sb-dim)] leading-relaxed">
              {m.talk_sb_tips_exploratory_desc()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
