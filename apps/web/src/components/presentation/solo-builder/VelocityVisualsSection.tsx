import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const VISUALS_SAMPLE = [
  { name: 'hub-spoke.html', cat: 'architecture' },
  { name: 'forgeflow.html', cat: 'flow' },
  { name: 'mission-control.html', cat: 'dashboard' },
  { name: 'benchmark-2026.html', cat: 'analysis' },
  { name: 'symphony.html', cat: 'architecture' },
  { name: 'deploy-pipeline.html', cat: 'infra' },
]

const GUIDE_SECTIONS = [
  { title: 'Split-file pattern', desc: 'HTML shell + css/ + js/ + tabs/' },
  { title: 'Light / dark mode', desc: 'CSS vars, data-theme toggle, localStorage' },
  { title: 'Diagram meta', desc: 'title, date, category, color — auto-indexed' },
  { title: 'Brand book priority', desc: 'Project palette overrides defaults' },
  { title: 'Version isolation', desc: 'tabs/v<N>/ — no collision across versions' },
]

const SEED_EXAMPLES = [
  { seed: '42', note: 'clean lines' },
  { seed: '137', note: 'bold contrast' },
  { seed: '256', note: 'warm tones' },
  { seed: '512', note: 'selected ✓', selected: true },
  { seed: '789', note: 'high detail' },
]

export function VelocityVisualsSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_visuals_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_visuals_title()}</span>
          </h2>
        </AnimatedSection>

        {/* make visuals terminal output */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--sb-border)] px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-[var(--sb-red)]/60" />
                <div className="size-2.5 rounded-full bg-[var(--sb-ember)]/60" />
                <div className="size-2.5 rounded-full bg-[var(--sb-green)]/60" />
              </div>
              <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2">make visuals</span>
            </div>
            <div className="p-4 space-y-2">
              <p className="font-mono text-xs text-[var(--sb-accent)]">
                <span className="text-[var(--sb-green)]">$</span> make visuals
              </p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)] mb-2">{m.talk_sb_visuals_scanning()}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {VISUALS_SAMPLE.map((v) => (
                  <div key={v.name} className="flex items-center gap-2 rounded border border-[var(--sb-border)] bg-[var(--sb-bg)] px-3 py-2">
                    <span className="text-[var(--sb-accent)] text-xs">◑</span>
                    <div>
                      <p className="font-mono text-[11px] text-[var(--sb-text)]/80">{v.name}</p>
                      <p className="font-mono text-[9px] text-[var(--sb-dim)]">{v.cat}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-4 mt-3 pt-2 border-t border-[var(--sb-border)]">
                <div className="font-mono text-[11px]">
                  <span className="text-[var(--sb-accent)] font-bold">57</span>
                  <span className="text-[var(--sb-dim)]"> {m.talk_sb_visuals_files()}</span>
                </div>
                <div className="font-mono text-[11px]">
                  <span className="text-[var(--sb-accent)] font-bold">8</span>
                  <span className="text-[var(--sb-dim)]"> {m.talk_sb_visuals_categories()}</span>
                </div>
                <div className="font-mono text-[11px]">
                  <span className="text-[var(--sb-green)]">✓</span>
                  <span className="text-[var(--sb-dim)]"> {m.talk_sb_visuals_manifest()}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Visual explainer guide */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-mono text-sm text-[var(--sb-accent)] font-semibold">{m.talk_sb_visuals_guide_title()}</span>
              <span className="font-mono text-[10px] text-[var(--sb-dim)]">visual-explainer-guide.md</span>
            </div>
            <div className="space-y-2">
              {GUIDE_SECTIONS.map((s) => (
                <div key={s.title} className="flex items-start gap-3 font-mono text-[11px]">
                  <span className="text-[var(--sb-accent)] mt-0.5">▸</span>
                  <div>
                    <span className="text-[var(--sb-text)]/90 font-semibold">{s.title}</span>
                    <span className="text-[var(--sb-dim)] ml-2">— {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-3 pt-3 border-t border-[var(--sb-border)]">
              {m.talk_sb_visuals_guide_desc()}
            </p>
          </div>
        </AnimatedSection>

        {/* Multiple seeds selection */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-4">{m.talk_sb_visuals_seeds_title()}</p>
            <div className="flex gap-2 flex-wrap">
              {SEED_EXAMPLES.map((s) => (
                <div
                  key={s.seed}
                  className={`rounded-lg border px-4 py-3 text-center transition-all ${
                    s.selected
                      ? 'border-[var(--sb-green)]/50 bg-[var(--sb-green)]/10 ring-1 ring-[var(--sb-green)]/30'
                      : 'border-[var(--sb-border)] bg-[var(--sb-bg)]'
                  }`}
                >
                  <p className={`font-mono text-sm font-bold ${s.selected ? 'text-[var(--sb-green)]' : 'text-[var(--sb-text)]'}`}>
                    #{s.seed}
                  </p>
                  <p className={`font-mono text-[9px] mt-1 ${s.selected ? 'text-[var(--sb-green)]/70' : 'text-[var(--sb-dim)]'}`}>
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-3">{m.talk_sb_visuals_seeds_desc()}</p>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_visuals_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
