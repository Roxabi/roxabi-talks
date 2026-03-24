import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const INIT_STEPS = [
  { cmd: 'prereqs', desc: 'bun, gh, biome' },
  { cmd: 'discover', desc: 'detect stack' },
  { cmd: 'create-project', desc: 'GH Project V2' },
  { cmd: 'labels', desc: 'S/M/L + priority' },
  { cmd: 'workflows', desc: 'CI/CD pipelines' },
  { cmd: 'protect-branches', desc: 'branch rules' },
  { cmd: 'scaffold-rules', desc: 'CLAUDE.md + stack.yml' },
  { cmd: 'scaffold-docs', desc: 'standards & guides' },
  { cmd: 'scaffold', desc: 'artifacts dirs' },
]

const MAKE_TARGETS = [
  { cmd: 'make lyra', desc: 'Telegram + Discord' },
  { cmd: 'make tts', desc: 'voicecli_tts daemon' },
  { cmd: 'make stt', desc: 'voicecli_stt daemon' },
  { cmd: 'make deploy', desc: 'git pull → test → restart' },
  { cmd: 'make remote status', desc: 'prod supervisor' },
]


export function ToolShowcaseSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-teal)]/50 bg-[var(--sb-teal)]/15 text-[var(--sb-teal)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_showcase_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_showcase_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_showcase_desc()}
          </p>
        </AnimatedSection>

        {/* Top row: /init (left) + Plugins ops (right) */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* /init terminal */}
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--sb-border)] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-[var(--sb-red)]/60" />
                  <div className="size-2.5 rounded-full bg-[var(--sb-ember)]/60" />
                  <div className="size-2.5 rounded-full bg-[var(--sb-green)]/60" />
                </div>
                <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2">roxabi-plugins — /init</span>
              </div>
              <div className="p-4 space-y-1.5">
                <p className="font-mono text-xs text-[var(--sb-accent)]">
                  <span className="text-[var(--sb-green)]">$</span> /init
                </p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mb-2">{m.talk_sb_showcase_init_running()}</p>
                {INIT_STEPS.map((step) => (
                  <div key={step.cmd} className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-[var(--sb-green)]">✓</span>
                    <span className="text-[var(--sb-teal)] w-36">{step.cmd}</span>
                    <span className="text-[var(--sb-dim)]">{step.desc}</span>
                  </div>
                ))}
                <p className="font-mono text-[10px] text-[var(--sb-green)] mt-2">
                  ✓ {m.talk_sb_showcase_init_done()}
                </p>
              </div>
            </div>

            {/* Plugins: sync + supervisord + make targets */}
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 border-b border-[var(--sb-border)] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-[var(--sb-red)]/60" />
                  <div className="size-2.5 rounded-full bg-[var(--sb-ember)]/60" />
                  <div className="size-2.5 rounded-full bg-[var(--sb-green)]/60" />
                </div>
                <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2">{m.talk_sb_showcase_ops_header()}</span>
              </div>
              <div className="p-4 space-y-4 flex-1">
                {/* rsync */}
                <div>
                  <p className="font-mono text-[10px] text-[var(--sb-accent)] uppercase tracking-wider mb-2">{m.talk_sb_showcase_ops_sync()}</p>
                  <div className="rounded border border-[var(--sb-border)] bg-[var(--sb-bg)] p-3">
                    <p className="font-mono text-[11px] text-[var(--sb-text)]/70">
                      <span className="text-[var(--sb-green)]">$</span> <span className="text-[var(--sb-accent)]">rsync</span> plugins → ~/.claude/
                    </p>
                    <p className="font-mono text-[9px] text-[var(--sb-dim)] mt-1">{m.talk_sb_showcase_ops_sync_desc()}</p>
                  </div>
                </div>

                {/* supervisord make targets */}
                <div>
                  <p className="font-mono text-[10px] text-[var(--sb-accent)] uppercase tracking-wider mb-2">{m.talk_sb_showcase_ops_daemons()}</p>
                  <div className="space-y-1">
                    {MAKE_TARGETS.map((t) => (
                      <div key={t.cmd} className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-[var(--sb-green)]">▸</span>
                        <span className="text-[var(--sb-teal)] w-36">{t.cmd}</span>
                        <span className="text-[var(--sb-dim)]">{t.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coming soon */}
                <div className="rounded border border-[var(--sb-ember)]/30 border-dashed bg-[var(--sb-ember)]/5 p-3 mt-auto">
                  <p className="font-mono text-[10px] text-[var(--sb-ember)] uppercase tracking-wider mb-1">{m.talk_sb_showcase_ops_soon()}</p>
                  <p className="font-mono text-[11px] text-[var(--sb-text)]/60">{m.talk_sb_showcase_ops_soon_vercel()}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-teal)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_showcase_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
