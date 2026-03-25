import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const CYCLE_STEPS = [
  { num: '01', text: () => m.talk_sb_recap_cycle_step1(), color: 'var(--sb-teal)' },
  { num: '02', text: () => m.talk_sb_recap_cycle_step2(), color: 'var(--sb-accent)' },
  { num: '03', text: () => m.talk_sb_recap_cycle_step3(), color: 'var(--sb-ember)' },
  { num: '04', text: () => m.talk_sb_recap_cycle_step4(), color: 'var(--sb-red)' },
]

const PRACTICES = [
  { title: () => m.talk_sb_recap_practice1_title(), desc: () => m.talk_sb_recap_practice1_desc() },
  { title: () => m.talk_sb_recap_practice2_title(), desc: () => m.talk_sb_recap_practice2_desc() },
  { title: () => m.talk_sb_recap_practice3_title(), desc: () => m.talk_sb_recap_practice3_desc() },
  { title: () => m.talk_sb_recap_practice4_title(), desc: () => m.talk_sb_recap_practice4_desc() },
]

export function LessonsRecapSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-ember)]/50 bg-[var(--sb-ember)]/15 text-[var(--sb-ember)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_recap_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_recap_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_recap_desc()}
          </p>
        </AnimatedSection>

        {/* Fast cycle — 4 steps loop */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-4">{m.talk_sb_recap_cycle_title()}</p>
            <div className="grid gap-3 sm:grid-cols-4">
              {CYCLE_STEPS.map((step, i) => (
                <div key={step.num} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                    style={{
                      color: step.color,
                      backgroundColor: `color-mix(in srgb, ${step.color} 15%, transparent)`,
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 sm:flex-initial">
                    <p className="text-sm text-[var(--sb-text)]/80">{step.text()}</p>
                    {i < CYCLE_STEPS.length - 1 && (
                      <span className="hidden sm:block font-mono text-[var(--sb-dim)] mt-2">↓</span>
                    )}
                    {i === CYCLE_STEPS.length - 1 && (
                      <span className="hidden sm:block font-mono text-[var(--sb-accent)] mt-2">↻</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Good practices */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-ember)] uppercase tracking-wider mb-4">{m.talk_sb_recap_practices_title()}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-[var(--sb-ember)] font-bold w-6 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold text-[var(--sb-text)]">{p.title()}</p>
                    <p className="text-[11px] text-[var(--sb-text)]/50 mt-0.5 leading-snug">{p.desc()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-ember)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_recap_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
