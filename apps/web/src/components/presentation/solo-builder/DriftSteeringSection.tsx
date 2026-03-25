import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const LYRA_PHASES = [
  {
    num: '01',
    what: () => m.talk_sb_steering_lyra_phase1(),
    commits: () => m.talk_sb_steering_lyra_phase1_commits(),
    color: 'var(--sb-teal)',
  },
  {
    num: '02',
    what: () => m.talk_sb_steering_lyra_phase2(),
    commits: () => m.talk_sb_steering_lyra_phase2_commits(),
    color: 'var(--sb-accent)',
  },
  {
    num: '03',
    what: () => m.talk_sb_steering_lyra_phase3(),
    commits: () => m.talk_sb_steering_lyra_phase3_commits(),
    color: 'var(--sb-ember)',
  },
]

const GUARDRAILS = [
  { rule: 'noExplicitAny', value: 'warn', tool: 'biome', color: 'var(--sb-ember)' },
  { rule: 'noExcessiveCognitiveComplexity', value: 'warn', tool: 'biome', color: 'var(--sb-ember)' },
  { rule: 'noExcessiveLinesPerFunction', value: 'warn', tool: 'biome', color: 'var(--sb-ember)' },
  { rule: 'noExcessiveLinesPerFile', value: '500 max', tool: 'biome', color: 'var(--sb-red)' },
  { rule: 'strict + strictNullChecks', value: 'true', tool: 'tsconfig', color: 'var(--sb-teal)' },
  { rule: 'noUnusedImports / Variables', value: 'error', tool: 'biome', color: 'var(--sb-red)' },
]

const PYRAMID_LEVELS = [
  {
    key: 'prod',
    label: () => m.talk_sb_steering_pyramid_prod(),
    desc: () => m.talk_sb_steering_pyramid_prod_desc(),
    color: 'var(--sb-red)',
    width: '45%',
    icon: '●',
  },
  {
    key: 'ci',
    label: () => m.talk_sb_steering_pyramid_ci(),
    desc: () => m.talk_sb_steering_pyramid_ci_desc(),
    color: 'var(--sb-ember)',
    width: '60%',
    icon: '◑',
  },
  {
    key: 'pr',
    label: () => m.talk_sb_steering_pyramid_pr(),
    desc: () => m.talk_sb_steering_pyramid_pr_desc(),
    color: 'var(--sb-accent)',
    width: '78%',
    icon: '◐',
  },
  {
    key: 'issues',
    label: () => m.talk_sb_steering_pyramid_issues(),
    desc: () => m.talk_sb_steering_pyramid_issues_desc(),
    color: 'var(--sb-teal)',
    width: '100%',
    icon: '○',
  },
]

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

        {/* Lyra refacto phases (2/3) + 50/50 stacked (1/3) */}
        <AnimatedSection>
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Left 2/3: Lyra refacto phases */}
            <div className="lg:col-span-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
              <p className="font-mono text-[10px] text-[var(--sb-teal)] uppercase tracking-wider mb-3">{m.talk_sb_steering_lyra_title()}</p>
              <div className="space-y-2">
                {LYRA_PHASES.map((phase) => (
                  <div key={phase.num} className="flex items-start gap-2">
                    <span
                      className="font-mono text-[10px] font-bold w-5 shrink-0 mt-0.5"
                      style={{ color: phase.color }}
                    >
                      {phase.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-[var(--sb-text)]/80 leading-snug">{phase.what()}</p>
                    </div>
                    <span
                      className="font-mono text-[9px] font-semibold shrink-0 px-1.5 py-0.5 rounded"
                      style={{
                        color: phase.color,
                        backgroundColor: `color-mix(in srgb, ${phase.color} 15%, transparent)`,
                      }}
                    >
                      {phase.commits()}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[9px] text-[var(--sb-dim)] mt-3 pt-2 border-t border-[var(--sb-border)]">
                {m.talk_sb_steering_lyra_total()}
              </p>
            </div>

            {/* Right 1/3: 50/50 stacked */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-lg bg-[var(--sb-accent)]/20 p-4 text-center">
                <p className="font-mono text-2xl font-bold text-[var(--sb-accent)]">50%</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] uppercase mt-1">{m.talk_sb_drift_features()}</p>
              </div>
              <div className="flex-1 rounded-lg bg-[var(--sb-teal)]/20 p-4 text-center">
                <p className="font-mono text-2xl font-bold text-[var(--sb-teal)]">50%</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] uppercase mt-1">{m.talk_sb_drift_refacto()}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Automated guardrails */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-red)]/30 bg-[var(--sb-surface)] p-5">
            <div className="mb-4">
              <p className="font-mono text-xs text-[var(--sb-red)] uppercase tracking-wider">{m.talk_sb_steering_guardrails_title()}</p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{m.talk_sb_steering_guardrails_desc()}</p>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {GUARDRAILS.map((g) => (
                <div key={g.rule} className="flex items-center gap-2 rounded border border-[var(--sb-border)] bg-[var(--sb-bg)]/50 px-3 py-1.5">
                  <span className="font-mono text-[10px] text-[var(--sb-text)]/80 flex-1 truncate">{g.rule}</span>
                  <span
                    className="font-mono text-[9px] font-semibold shrink-0 px-1.5 py-0.5 rounded"
                    style={{
                      color: g.color,
                      backgroundColor: `color-mix(in srgb, ${g.color} 15%, transparent)`,
                    }}
                  >
                    {g.value}
                  </span>
                  <span className="font-mono text-[8px] text-[var(--sb-dim)] shrink-0">{g.tool}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Steering pyramid — vertical, top-down priority */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-4">{m.talk_sb_drift_dashboard_title()}</p>
            <div className="flex flex-col items-center gap-2">
              {PYRAMID_LEVELS.map((level) => (
                <div
                  key={level.key}
                  className="rounded-lg border p-3 transition-all"
                  style={{
                    width: level.width,
                    borderColor: `color-mix(in srgb, ${level.color} 40%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${level.color} 6%, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: level.color }}>{level.icon}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: level.color }}>
                      {level.label()}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[var(--sb-dim)] mt-1 ml-6">
                    {level.desc()}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-4 text-center">{m.talk_sb_drift_dashboard_desc()}</p>
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
