import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const PLAYBOOK_PHASES = [
  { phase: '1', name: 'Discovery & Audit', desc: 'Inventory everything before creating', icon: '🔍' },
  { phase: '2', name: 'Strategic Exploration', desc: 'Diverge — positioning, personas, visuals', icon: '🌀' },
  { phase: '3', name: 'First Convergence', desc: 'Founder review, lock strategic pillars', icon: '🎯' },
  { phase: '4', name: 'Refined Exploration', desc: 'Converge — voice, typography, messaging', icon: '✏️' },
  { phase: '5', name: 'Final Convergence', desc: 'Lock brand book, sign off', icon: '🔒' },
  { phase: '6', name: 'Production Assets', desc: 'Logo, animation, handoff specs', icon: '🏭' },
  { phase: '7', name: 'Asset Iteration', desc: 'Sub-variant funnel, kill list, polish', icon: '🔄' },
  { phase: '8', name: 'Video Production', desc: 'Brand video brief, Remotion pipeline', icon: '🎬' },
]

const PRODUCT_METHODS = [
  {
    name: '5 Whys',
    desc: 'Root-cause the real need',
    when: 'frame',
    icon: '❓',
  },
  {
    name: 'Jobs-to-be-Done',
    desc: 'What job does the user hire this for?',
    when: 'frame',
    icon: '🎯',
  },
  {
    name: 'User Story Mapping',
    desc: 'Map the user journey before slicing',
    when: 'spec',
    icon: '🗺️',
  },
  {
    name: 'Impact Mapping',
    desc: 'Why → Who → How → What',
    when: 'frame',
    icon: '💥',
  },
  {
    name: 'MoSCoW',
    desc: 'Must / Should / Could / Won\'t',
    when: 'spec',
    icon: '📊',
  },
  {
    name: 'Pre-mortem',
    desc: 'Imagine it failed — why?',
    when: 'frame',
    icon: '💀',
  },
]

const WHEN_LABELS: Record<string, { label: string; color: string }> = {
  frame: { label: 'Frame', color: 'var(--sb-ember)' },
  spec: { label: 'Spec', color: 'var(--sb-teal)' },
}

export function ProductMethodsSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-ember)]/50 bg-[var(--sb-ember)]/15 text-[var(--sb-ember)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_methods_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_methods_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_methods_desc()}
          </p>
        </AnimatedSection>

        {/* Two-column layout */}
        <AnimatedSection>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Left: Brand Playbook */}
            <div className="rounded-lg border border-[var(--sb-ember)]/30 bg-[var(--sb-surface)] p-5">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-sm text-[var(--sb-ember)] font-semibold">{m.talk_sb_methods_playbook_title()}</span>
                <span className="font-mono text-[10px] text-[var(--sb-dim)]">8 phases</span>
              </div>
              <div className="space-y-2">
                {PLAYBOOK_PHASES.map((p) => (
                  <div key={p.phase} className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-6 rounded bg-[var(--sb-ember)]/10 shrink-0">
                      <span className="text-xs">{p.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-[var(--sb-ember)] font-bold">{p.phase}</span>
                        <span className="font-mono text-[11px] text-[var(--sb-text)]/90 font-semibold">{p.name}</span>
                      </div>
                      <p className="font-mono text-[9px] text-[var(--sb-dim)]">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[9px] text-[var(--sb-dim)] mt-3 pt-3 border-t border-[var(--sb-border)]">
                {m.talk_sb_methods_playbook_footer()}
              </p>
            </div>

            {/* Right: Product Methods */}
            <div className="rounded-lg border border-[var(--sb-teal)]/30 bg-[var(--sb-surface)] p-5">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-sm text-[var(--sb-teal)] font-semibold">{m.talk_sb_methods_toolbox_title()}</span>
                <span className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_methods_toolbox_sub()}</span>
              </div>
              <div className="space-y-2">
                {PRODUCT_METHODS.map((method) => {
                  const whenInfo = WHEN_LABELS[method.when]
                  return (
                    <div key={method.name} className="flex items-start gap-3">
                      <div className="flex items-center justify-center size-6 rounded bg-[var(--sb-teal)]/10 shrink-0">
                        <span className="text-xs">{method.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[11px] text-[var(--sb-text)]/90 font-semibold">{method.name}</span>
                          {whenInfo && (
                            <span
                              className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                              style={{ color: whenInfo.color, backgroundColor: `color-mix(in srgb, ${whenInfo.color} 15%, transparent)` }}
                            >
                              {whenInfo.label}
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[9px] text-[var(--sb-dim)]">{method.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* The key insight */}
              <div className="mt-4 pt-3 border-t border-[var(--sb-border)]">
                <p className="font-mono text-[10px] text-[var(--sb-ember)] font-semibold mb-1">{m.talk_sb_methods_when_title()}</p>
                <div className="space-y-1 font-mono text-[10px] text-[var(--sb-dim)]">
                  <p>
                    <span style={{ color: 'var(--sb-ember)' }}>Frame</span> → {m.talk_sb_methods_when_frame()}
                  </p>
                  <p>
                    <span style={{ color: 'var(--sb-teal)' }}>Spec</span> → {m.talk_sb_methods_when_spec()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-ember)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_methods_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
