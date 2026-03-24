import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const TOOL_CATEGORIES = [
  {
    headerKey: 'talk_sb_tooling_cat_init',
    color: 'var(--sb-teal)',
    repo: 'roxabi-plugins',
    items: [
      { name: '/init', desc: 'Bootstrap project' },
      { name: '/dev', desc: 'Full dev lifecycle' },
      { name: '/readme-upgrade', desc: 'Doc quality audit' },
      { name: '/doc-sync', desc: 'Sync docs after changes' },
      { name: 'make visuals', desc: 'HTML diagrams index' },
      { name: 'roxabi-dashboard', desc: 'Project health view' },
    ],
  },
  {
    headerKey: 'talk_sb_tooling_cat_extensions',
    color: 'var(--sb-accent)',
    items: [
      { name: 'voiceCLI', desc: 'TTS + STT local' },
      { name: 'imageCLI', desc: 'FLUX, SD3.5' },
      { name: 'roxabi-vault', desc: 'Knowledge store' },
      { name: 'lyra-stack', desc: 'Supervisord hub' },
    ],
  },
  {
    headerKey: 'talk_sb_tooling_cat_skills',
    color: 'var(--sb-ember)',
    items: [
      { name: 'content-generator', desc: 'Video scripts, posts' },
      { name: 'web-intel', desc: 'Scrape, summarize, adapt' },
      { name: 'logo-generator', desc: 'SVG + AI logos' },
      { name: 'rsync', desc: 'Sync plugins to Claude cache' },
    ],
  },
  {
    headerKey: 'talk_sb_tooling_cat_content',
    color: 'var(--sb-dim)',
    items: [
      { name: 'roxabi-production', desc: 'Video engine' },
      { name: 'roxabi-talks', desc: 'Presentations' },
    ],
  },
] as const

export function ToolingSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-teal)]/50 bg-[var(--sb-teal)]/15 text-[var(--sb-teal)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_tooling_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_tooling_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_tooling_desc()}
          </p>
        </AnimatedSection>

        {/* Migration */}
        <AnimatedSection>
          <div className="flex items-center gap-4 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
            <div className="font-mono text-sm text-[var(--sb-red)] line-through">Linear</div>
            <div className="text-[var(--sb-dim)]">&rarr;</div>
            <div className="font-mono text-sm text-[var(--sb-green)] font-semibold">GitHub</div>
            <div className="text-[11px] text-[var(--sb-dim)] ml-auto">{m.talk_sb_tooling_migration()}</div>
          </div>
        </AnimatedSection>

        {/* 8/20 repos = tooling */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/5 p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-[var(--sb-accent)]">8</span>
              <span className="font-mono text-lg text-[var(--sb-dim)]">/</span>
              <span className="font-mono text-3xl font-bold text-[var(--sb-text)]">20</span>
              <span className="text-sm text-[var(--sb-text)]/50 ml-2">{m.talk_sb_tooling_ratio()}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Tool categories grid */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {TOOL_CATEGORIES.map((cat) => (
              <div
                key={cat.headerKey}
                className="rounded-lg border bg-[var(--sb-surface)] p-4"
                style={{ borderColor: `color-mix(in srgb, ${cat.color} 30%, transparent)` }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <p
                    className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: `var(${cat.color.slice(4, -1)})` }}
                  >
                    {(m[cat.headerKey as keyof typeof m] as () => string)()}
                  </p>
                  {'repo' in cat && cat.repo && (
                    <span className="font-mono text-[9px] text-[var(--sb-dim)]">{cat.repo}</span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-2">
                      <span
                        className="font-mono text-[11px] font-semibold shrink-0"
                        style={{ color: `var(${cat.color.slice(4, -1)})` }}
                      >
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--sb-dim)]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-teal)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_tooling_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
