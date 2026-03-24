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

        {/* The split .md / HTML */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-5">
              <div className="font-mono text-xs text-[var(--sb-dim)] mb-3 uppercase tracking-wider">{m.talk_sb_velocity_for_agent()}</div>
              <div className="font-mono text-sm text-[var(--sb-text)]/80 space-y-1">
                <p className="text-[var(--sb-dim)]"># analysis.md</p>
                <p>## Problem Statement</p>
                <p className="text-[var(--sb-dim)]">## Acceptance Criteria</p>
                <p className="text-[var(--sb-dim)]">## File Manifest</p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/5 p-5">
              <div className="font-mono text-xs text-[var(--sb-accent)] mb-3 uppercase tracking-wider">{m.talk_sb_velocity_for_human()}</div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded bg-[var(--sb-accent)]/20 flex items-center justify-center text-[var(--sb-accent)] text-xs">◑</div>
                <div>
                  <p className="font-mono text-sm text-[var(--sb-text)]/80">{m.talk_sb_velocity_visual_doc()}</p>
                  <p className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_velocity_visual_sub()}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Make Visuals */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-surface)] p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-sm text-[var(--sb-accent)] font-semibold">make visuals</span>
              <span className="font-mono text-[10px] text-[var(--sb-dim)]">~/.agent/diagrams/</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-mono text-2xl font-bold text-[var(--sb-text)]">56</p>
                <p className="font-mono text-[9px] text-[var(--sb-dim)] uppercase">{m.talk_sb_velocity_html_files()}</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[var(--sb-text)]">109</p>
                <p className="font-mono text-[9px] text-[var(--sb-dim)] uppercase">{m.talk_sb_velocity_manifest()}</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[var(--sb-text)]">8</p>
                <p className="font-mono text-[9px] text-[var(--sb-dim)] uppercase">{m.talk_sb_velocity_categories()}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 2 Machines */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 rounded-full bg-[var(--sb-green)] motion-safe:animate-pulse" />
                <span className="font-mono text-xs text-[var(--sb-text)] font-semibold">ROXABITOWER</span>
              </div>
              <p className="font-mono text-[10px] text-[var(--sb-dim)]">Dev &middot; RTX 5070 Ti &middot; PopOS</p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_velocity_dev_role()}</p>
            </div>
            <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 rounded-full bg-[var(--sb-accent)] motion-safe:animate-pulse" />
                <span className="font-mono text-xs text-[var(--sb-text)] font-semibold">roxabituwer</span>
              </div>
              <p className="font-mono text-[10px] text-[var(--sb-dim)]">Prod 24/7 &middot; RTX 3080 &middot; Ubuntu Server</p>
              <p className="font-mono text-[10px] text-[var(--sb-dim)]">{m.talk_sb_velocity_prod_role()}</p>
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
