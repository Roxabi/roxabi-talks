import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const TOOLING_REPOS = [
  { name: 'roxabi-plugins', commits: 360, purpose: '17 skills, 9 agents' },
  { name: 'voiceCLI', commits: 122, purpose: 'TTS + STT local' },
  { name: 'imageCLI', commits: 36, purpose: 'FLUX, SD3.5' },
  { name: 'roxabi-vault', commits: 38, purpose: 'Memory store' },
  { name: 'roxabi-claude-config', commits: 15, purpose: 'Terminal config' },
  { name: 'lyra-stack', commits: 21, purpose: 'Supervisord hub' },
  { name: 'roxabi-production', commits: 18, purpose: 'Video engine' },
  { name: 'roxabi-talks', commits: 33, purpose: 'Presentations' },
]

const INIT_CMDS = [
  'prereqs', 'discover', 'create-project', 'labels', 'workflows',
  'protect-branches', 'scaffold-rules', 'scaffold-docs', 'scaffold',
]

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

        {/* Tooling repos grid */}
        <AnimatedSection>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLING_REPOS.map((repo) => (
              <div
                key={repo.name}
                className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-3"
              >
                <p className="font-mono text-xs font-semibold text-[var(--sb-teal)]">{repo.name}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{repo.commits} commits &middot; {repo.purpose}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* /init */}
        <AnimatedSection>
          <div className="space-y-3">
            <p className="font-mono text-sm text-[var(--sb-text)]/70">{m.talk_sb_tooling_init()}</p>
            <div className="flex flex-wrap gap-2">
              {INIT_CMDS.map((cmd) => (
                <span
                  key={cmd}
                  className="rounded border border-[var(--sb-border)] bg-[var(--sb-surface)] px-2 py-1 font-mono text-[11px] text-[var(--sb-accent)]"
                >
                  /init {cmd}
                </span>
              ))}
            </div>
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
