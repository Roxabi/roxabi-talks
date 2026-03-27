import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const REFACTO_PHASES = [
  {
    phase: 'Phase 1',
    what: () => m.talk_sb_steering_lyra_phase1(),
    commits: 47,
    period: 'Week 2–3',
    impact: 'Boundary enforcement — each domain owns its directory',
    color: 'var(--sb-teal)',
  },
  {
    phase: 'Phase 2',
    what: () => m.talk_sb_steering_lyra_phase2(),
    commits: 32,
    period: 'Week 3',
    impact: 'Readability — no file exceeds 300 lines, forced decomposition',
    color: 'var(--sb-accent)',
  },
  {
    phase: 'Phase 3',
    what: () => m.talk_sb_steering_lyra_phase3(),
    commits: 68,
    period: 'Week 3–4',
    impact: 'Stream architecture — clean event flow, testable pipeline',
    color: 'var(--sb-ember)',
  },
]

const FEATURE_PHASES = [
  { what: 'Telegram adapter + message routing', commits: 89, period: 'Week 1' },
  { what: 'Discord adapter + voice channels', commits: 64, period: 'Week 1–2' },
  { what: 'Hub-and-spoke multi-LLM routing', commits: 112, period: 'Week 2–3' },
  { what: 'Memory system + context management', commits: 78, period: 'Week 3–4' },
  { what: 'Supervisor integration + deploy', commits: 55, period: 'Week 4' },
]

export function HiddenRefactoSection() {
  const refactoTotal = REFACTO_PHASES.reduce((s, p) => s + p.commits, 0)
  const featureTotal = FEATURE_PHASES.reduce((s, p) => s + p.commits, 0)

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_refacto_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_refacto_desc()}
          </p>
        </AnimatedSection>

        {/* Feature / Refacto split bar */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-[var(--sb-accent)]" />
                <span className="font-mono text-[10px] text-[var(--sb-dim)]">Features ({featureTotal})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-sm bg-[var(--sb-teal)]" />
                <span className="font-mono text-[10px] text-[var(--sb-dim)]">Refacto ({refactoTotal})</span>
              </div>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden">
              <div
                className="bg-[var(--sb-accent)] transition-all"
                style={{ width: `${(featureTotal / (featureTotal + refactoTotal)) * 100}%` }}
              />
              <div
                className="bg-[var(--sb-teal)] transition-all"
                style={{ width: `${(refactoTotal / (featureTotal + refactoTotal)) * 100}%` }}
              />
            </div>
            <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2 text-center">
              {Math.round((refactoTotal / (featureTotal + refactoTotal)) * 100)}% refacto — {Math.round((featureTotal / (featureTotal + refactoTotal)) * 100)}% features
            </p>
          </div>
        </AnimatedSection>

        {/* Refacto phases table */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-teal)]/30 bg-[var(--sb-surface)] overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--sb-border)]">
              <span className="font-mono text-xs text-[var(--sb-teal)] font-semibold uppercase tracking-wider">Refactoring phases</span>
            </div>
            <table className="w-full font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[var(--sb-border)] text-left">
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">{m.talk_sb_hidden_refacto_col_phase()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">{m.talk_sb_hidden_refacto_col_what()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal text-right">{m.talk_sb_hidden_refacto_col_commits()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal hidden sm:table-cell">{m.talk_sb_hidden_refacto_col_impact()}</th>
                </tr>
              </thead>
              <tbody>
                {REFACTO_PHASES.map((p, i) => (
                  <tr key={p.phase} className={i % 2 === 0 ? 'bg-[var(--sb-bg)]/50' : ''}>
                    <td className="px-4 py-1.5 text-[var(--sb-teal)] font-semibold">{p.phase}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-text)]/80">{p.what()}</td>
                    <td className="px-4 py-1.5 text-right tabular-nums" style={{ color: p.color }}>{p.commits}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-dim)] hidden sm:table-cell">{p.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Feature phases table */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--sb-border)]">
              <span className="font-mono text-xs text-[var(--sb-accent)] font-semibold uppercase tracking-wider">Feature phases</span>
            </div>
            <table className="w-full font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[var(--sb-border)] text-left">
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">Period</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">What shipped</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal text-right">Commits</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_PHASES.map((p, i) => (
                  <tr key={p.what} className={i % 2 === 0 ? 'bg-[var(--sb-bg)]/50' : ''}>
                    <td className="px-4 py-1.5 text-[var(--sb-dim)]">{p.period}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-text)]/80">{p.what}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-accent)] text-right tabular-nums">{p.commits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
