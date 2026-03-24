import { cn, AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const DRIFT_PHASES = [
  { label: 'W1–W3', arch: 'clean', bugs: 2, devTime: '2h', color: 'var(--sb-green)' },
  { label: 'W4–W6', arch: 'exceptions', bugs: 7, devTime: '4h', color: 'var(--sb-ember)' },
  { label: 'W7–W9', arch: 'cracked', bugs: 18, devTime: '8h', color: 'var(--sb-red)' },
]

export function DriftSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-red)]/50 bg-[var(--sb-red)]/15 text-[var(--sb-red)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_drift_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_drift_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_drift_desc()}
          </p>
        </AnimatedSection>

        {/* The altitude problem */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4 flex items-start gap-3">
              <span className="text-3xl shrink-0">🏔️</span>
              <div>
                <p className="font-mono text-sm text-[var(--sb-text)] font-semibold">{m.talk_sb_drift_altitude()}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{m.talk_sb_drift_altitude_sub()}</p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4 flex items-start gap-3">
              <span className="text-3xl shrink-0">🔬</span>
              <div>
                <p className="font-mono text-sm text-[var(--sb-text)] font-semibold">{m.talk_sb_drift_detail()}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{m.talk_sb_drift_detail_sub()}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Architecture drift diagram */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-red)]/30 bg-[var(--sb-red)]/5 p-5">
            <p className="font-mono text-xs text-[var(--sb-red)] uppercase tracking-wider mb-4">{m.talk_sb_drift_example_title()}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {DRIFT_PHASES.map((phase, i) => (
                <div key={phase.label} className="text-center">
                  {/* Architecture box visual */}
                  <div
                    className={cn(
                      'mx-auto mb-3 flex size-20 items-center justify-center rounded-lg border-2 font-mono text-[9px] uppercase tracking-wider transition-all',
                      i === 0 && 'border-[var(--sb-green)]/60 bg-[var(--sb-green)]/5 text-[var(--sb-green)]',
                      i === 1 && 'border-[var(--sb-ember)]/60 bg-[var(--sb-ember)]/5 text-[var(--sb-ember)] rotate-2 border-dashed',
                      i === 2 && 'border-[var(--sb-red)]/60 bg-[var(--sb-red)]/5 text-[var(--sb-red)] rotate-6 skew-x-3 border-dashed',
                    )}
                  >
                    {i === 0 && m.talk_sb_drift_phase_clean()}
                    {i === 1 && m.talk_sb_drift_phase_eroding()}
                    {i === 2 && m.talk_sb_drift_phase_broken()}
                  </div>
                  <p className="font-mono text-[10px] text-[var(--sb-dim)] mb-2">{phase.label}</p>
                  {/* Metrics */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between px-2">
                      <span className="font-mono text-[9px] text-[var(--sb-dim)]">{m.talk_sb_drift_metric_bugs()}</span>
                      <span className="font-mono text-xs font-bold" style={{ color: phase.color }}>{phase.bugs}</span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <span className="font-mono text-[9px] text-[var(--sb-dim)]">{m.talk_sb_drift_metric_dev_time()}</span>
                      <span className="font-mono text-xs font-bold" style={{ color: phase.color }}>{phase.devTime}</span>
                    </div>
                    {/* Bug bar */}
                    <div className="mx-2 h-1.5 rounded-full bg-[var(--sb-border)]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${(phase.bugs / 18) * 100}%`, backgroundColor: phase.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* The hexagonal drift story */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--sb-dim)] w-6 shrink-0">01</span>
                <p className="text-sm text-[var(--sb-text)]/70">{m.talk_sb_drift_step1()}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--sb-dim)] w-6 shrink-0">02</span>
                <p className="text-sm text-[var(--sb-text)]/70">{m.talk_sb_drift_step2()}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--sb-red)] w-6 shrink-0">03</span>
                <p className="text-sm text-[var(--sb-red)]">{m.talk_sb_drift_step3()}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[var(--sb-dim)] w-6 shrink-0">04</span>
                <p className="text-sm text-[var(--sb-text)]/70">{m.talk_sb_drift_step4()}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-red)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_drift_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
