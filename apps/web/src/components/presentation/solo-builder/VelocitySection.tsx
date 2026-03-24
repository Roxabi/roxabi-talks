import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const LOCAL_MODELS = [
  { name: 'Qwen3', type: 'TTS', icon: '🔊' },
  { name: 'Chatterbox', type: 'TTS', icon: '🗣️' },
  { name: 'Whisper', type: 'STT', icon: '🎤' },
  { name: 'FLUX', type: 'Image', icon: '🖼️' },
  { name: 'SD3.5', type: 'Image', icon: '🎨' },
  { name: 'VLM', type: 'Vision', icon: '👁️' },
]

const WEEKLY_LINES = [
  { week: 'W03', lines: 11035, commits: 23, top: '2ndBrain' },
  { week: 'W04', lines: 44345, commits: 67, top: '2ndBrain, roxabi_site' },
  { week: 'W05', lines: 320636, commits: 305, top: '2ndBrain, boilerplate', note: 'Linear→GitHub migration + CV bulk' },
  { week: 'W06', lines: 70444, commits: 109, top: 'boilerplate, 2ndBrain' },
  { week: 'W07', lines: 83770, commits: 271, top: 'boilerplate, 2ndBrain' },
  { week: 'W08', lines: 71578, commits: 118, top: 'boilerplate, 2ndBrain' },
  { week: 'W09', lines: 219977, commits: 358, top: 'boilerplate, roxabi-plugins, voiceCLI' },
  { week: 'W10', lines: 284462, commits: 609, top: 'roxabi-plugins, boilerplate, ryvo' },
  { week: 'W11', lines: 377137, commits: 599, top: 'lyra, roxabi-plugins, voiceCLI' },
  { week: 'W12', lines: 201515, commits: 272, top: 'lyra, roxabi-production, roxabi-plugins' },
  { week: 'W13', lines: 112781, commits: 87, top: 'lyra, ryvo_brand, roxabi-plugins' },
]

const MAX_LINES = 377137

export function VelocitySection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-accent)]/50 bg-[var(--sb-accent)]/15 text-[var(--sb-accent)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_velocity_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_velocity_title()}</span>
          </h2>
        </AnimatedSection>

        {/* Commit timeline */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-accent)] uppercase tracking-wider mb-4">{m.talk_sb_velocity_timeline()}</p>
            <div className="flex items-end gap-1.5">
              {WEEKLY_LINES.map((w) => {
                const barH = Math.max(Math.round((w.lines / MAX_LINES) * 120), 6)
                const label = w.lines >= 1000 ? `${Math.round(w.lines / 1000)}K` : `${w.lines}`
                return (
                  <div key={w.week} className="group relative flex-1 flex flex-col items-center gap-1 cursor-default">
                    <span className="font-mono text-[7px] text-[var(--sb-accent)] font-bold">{label}</span>
                    <div
                      className="w-full rounded-sm bg-[var(--sb-accent)] group-hover:brightness-125 transition-all"
                      style={{ height: `${barH}px`, opacity: 0.3 + (w.lines / MAX_LINES) * 0.7 }}
                    />
                    <span className="font-mono text-[7px] text-[var(--sb-dim)]">{w.week}</span>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block">
                      <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-bg)] px-3 py-2 shadow-lg whitespace-nowrap">
                        <p className="font-mono text-[10px] text-[var(--sb-accent)] font-bold">{w.week} — {label} lines</p>
                        <p className="font-mono text-[9px] text-[var(--sb-dim)] mt-0.5">{w.commits} commits</p>
                        <p className="font-mono text-[9px] text-[var(--sb-text)]/60 mt-0.5">{w.top}</p>
                        {'note' in w && w.note && (
                          <p className="font-mono text-[8px] text-[var(--sb-ember)] italic mt-1">{w.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--sb-border)]">
              <span className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_velocity_timeline_start()}</span>
              <span className="font-mono text-[10px] text-[var(--sb-accent)] font-semibold">{m.talk_sb_velocity_timeline_end()}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Agent / Human flow */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
            <p className="font-mono text-xs text-[var(--sb-dim)] uppercase tracking-wider mb-4">{m.talk_sb_velocity_flow_title()}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-bg)] p-3 text-center">
                <p className="font-mono text-[9px] text-[var(--sb-dim)] uppercase mb-1">{m.talk_sb_velocity_for_agent()}</p>
                <p className="font-mono text-xs text-[var(--sb-text)]/80">analysis.md</p>
                <p className="font-mono text-xs text-[var(--sb-text)]/80">spec.md</p>
                <p className="font-mono text-xs text-[var(--sb-text)]/80">plan.md</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-[var(--sb-accent)]">
                <span className="font-mono text-[9px]">&rarr;</span>
              </div>
              <div className="flex-1 rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/5 p-3 text-center">
                <p className="font-mono text-[9px] text-[var(--sb-accent)] uppercase mb-1">{m.talk_sb_velocity_for_human()}</p>
                <p className="font-mono text-xs text-[var(--sb-text)]/80">{m.talk_sb_velocity_visual_doc()}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_velocity_visual_sub()}</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-[var(--sb-accent)]">
                <span className="font-mono text-[9px]">&rarr;</span>
              </div>
              <div className="flex-1 rounded-lg border border-[var(--sb-green)]/30 bg-[var(--sb-green)]/5 p-3 text-center">
                <p className="font-mono text-[9px] text-[var(--sb-green)] uppercase mb-1">{m.talk_sb_velocity_flow_decision()}</p>
                <p className="font-mono text-xs text-[var(--sb-green)]">GO / NO-GO</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Rprod. + Seeds */}
        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-4 flex items-start gap-3">
              <span className="text-xl">🎬</span>
              <div>
                <p className="font-mono text-sm text-[var(--sb-accent)] font-semibold">{m.talk_sb_velocity_rprod()}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{m.talk_sb_velocity_rprod_desc()}</p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-4 flex items-start gap-3">
              <span className="text-xl">🎲</span>
              <div>
                <p className="font-mono text-sm text-[var(--sb-accent)] font-semibold">{m.talk_sb_velocity_seeds()}</p>
                <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-1">{m.talk_sb_velocity_seeds_desc()}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Local models */}
        <AnimatedSection>
          <div className="flex flex-wrap gap-2">
            {LOCAL_MODELS.map((model) => (
              <div
                key={model.name}
                className="flex items-center gap-2 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] px-3 py-2"
              >
                <span>{model.icon}</span>
                <div>
                  <span className="font-mono text-xs text-[var(--sb-text)]">{model.name}</span>
                  <span className="font-mono text-[9px] text-[var(--sb-dim)] ml-1">{model.type}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_velocity_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
