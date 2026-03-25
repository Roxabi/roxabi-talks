import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const CLAW_VISUALS = [
  {
    src: '/slides/solo-builder/clawfamily-comparison.png',
    label: 'Claw Family — Comparison Matrix',
    href: 'http://localhost:8080/clawfamily-comparison-matrix.html',
  },
  {
    src: '/slides/solo-builder/benchmark-2026.png',
    label: 'AI Agent Workflow Benchmark 2026',
    href: 'http://localhost:8080/benchmark-2026.html',
  },
  {
    src: '/slides/solo-builder/alphaclaw-visual.png',
    label: 'AlphaClaw',
    href: 'http://localhost:8080/alphaclaw-visual.html',
  },
  {
    src: '/slides/solo-builder/metaclaw-visual.png',
    label: 'MetaClaw',
    href: 'http://localhost:8080/metaclaw-visual.html',
  },
  {
    src: '/slides/solo-builder/scalyclaw-visual.png',
    label: 'ScalyClaw',
    href: 'http://localhost:8080/scalyclaw-visual.html',
  },
  {
    src: '/slides/solo-builder/clawvault-visual.png',
    label: 'ClawVault',
    href: 'http://localhost:8080/clawvault-visual.html',
  },
  {
    src: '/slides/solo-builder/ironclaw-architecture.png',
    label: 'IronClaw — For Lyra Comparison',
    href: 'http://localhost:8080/ironclaw-architecture-plan.html',
  },
]

export function HiddenClawSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_claw_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_claw_desc()}
          </p>
        </AnimatedSection>

        {/* Top two — full width highlights */}
        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-2">
            {CLAW_VISUALS.slice(0, 2).map((v) => (
              <a
                key={v.label}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[var(--sb-teal)]/30 overflow-hidden hover:border-[var(--sb-teal)]/60 transition-colors group"
              >
                <img
                  src={v.src}
                  alt={v.label}
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--sb-surface)]">
                  <span className="font-mono text-[10px] text-[var(--sb-text)]/70">{v.label}</span>
                  <span className="font-mono text-[9px] text-[var(--sb-dim)]">↗</span>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Rest — smaller grid */}
        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CLAW_VISUALS.slice(2).map((v) => (
              <a
                key={v.label}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[var(--sb-border)] overflow-hidden hover:border-[var(--sb-teal)]/40 transition-colors group"
              >
                <img
                  src={v.src}
                  alt={v.label}
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div className="px-2 py-1 bg-[var(--sb-surface)]">
                  <span className="font-mono text-[9px] text-[var(--sb-text)]/60">{v.label}</span>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
