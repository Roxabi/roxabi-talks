import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function DriftSteeringSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-red)]/50 bg-[var(--sb-red)]/15 text-[var(--sb-red)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_steering_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_steering_title()}</span>
          </h2>
        </AnimatedSection>

        {/* 50/50 */}
        <AnimatedSection>
          <div className="flex items-center gap-4">
            <div className="flex-1 rounded-lg bg-[var(--sb-accent)]/20 p-4 text-center">
              <p className="font-mono text-2xl font-bold text-[var(--sb-accent)]">50%</p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)] uppercase mt-1">{m.talk_sb_drift_features()}</p>
            </div>
            <div className="flex-1 rounded-lg bg-[var(--sb-teal)]/20 p-4 text-center">
              <p className="font-mono text-2xl font-bold text-[var(--sb-teal)]">50%</p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)] uppercase mt-1">{m.talk_sb_drift_refacto()}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* The steering pyramid */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-3">{m.talk_sb_drift_dashboard_title()}</p>
            <div className="flex gap-2">
              {['PROD', 'CI/CD', 'PR', 'ISSUES'].map((label, i) => (
                <div
                  key={label}
                  className="flex-1 rounded border border-[var(--sb-border)] p-2 text-center"
                  style={{ opacity: 1 - i * 0.15 }}
                >
                  <p className={`font-mono text-[9px] uppercase ${i === 0 ? 'text-[var(--sb-red)]' : 'text-[var(--sb-dim)]'}`}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-3">{m.talk_sb_drift_dashboard_desc()}</p>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-red)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_steering_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
