import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const REPOS = [
  { name: 'roxabi_boilerplate', commits: '1,200', role: 'SaaS monorepo — auth, RBAC, multi-tenant', type: 'product' },
  { name: 'lyra', commits: '545', role: 'AI agent — Telegram + Discord, hub-and-spoke', type: 'product' },
  { name: 'roxabi-plugins', commits: '360', role: 'Claude Code skills & plugins — dev-core, design', type: 'tooling' },
  { name: 'roxabi-dashboard', commits: '735', role: 'Multi-project steering dashboard (WIP)', type: 'tooling' },
  { name: 'roxabi-talks', commits: '280', role: 'Presentation system — i18n, snap-scroll', type: 'content' },
  { name: 'roxabi-production', commits: '145', role: 'Video production pipeline — Remotion renders', type: 'content' },
  { name: 'voiceCLI', commits: '122', role: 'TTS/STT CLI — Qwen3, Chatterbox, Whisper', type: 'tooling' },
  { name: '2ndBrain', commits: '98', role: 'Knowledge vault + Telegram bot', type: 'product' },
  { name: 'roxabi-vault', commits: '85', role: 'SQLite + FTS5 knowledge store — CLI & SDK', type: 'tooling' },
  { name: 'roxabi-vault-tags', commits: '62', role: 'Tag taxonomy & FTS5 search layer', type: 'tooling' },
  { name: 'imageCLI', commits: '36', role: 'Image generation CLI — FLUX, SD3.5', type: 'tooling' },
  { name: 'roxabi-claude-config', commits: '28', role: 'Shared Claude Code config & permissions', type: 'tooling' },
  { name: 'lyra-stack', commits: '21', role: 'Supervisord orchestrator — all daemons', type: 'infra' },
  { name: 'remotion-factory', commits: '45', role: 'Remotion template factory', type: 'tooling' },
  { name: 'ryvo', commits: '766', role: 'Product app (built on boilerplate)', type: 'product' },
  { name: 'ryvo_brand', commits: '8', role: 'Brand book — personas, messaging, visuals', type: 'product' },
  { name: 'roxabi_site', commits: '15', role: 'Landing page — roxabi.com', type: 'product' },
  { name: 'compte_appart', commits: '12', role: 'Apartment expense tracker', type: 'product' },
]

const TYPE_COLORS: Record<string, { bg: string; text: string; label: () => string }> = {
  tooling: { bg: 'var(--sb-teal)', text: 'var(--sb-teal)', label: () => m.talk_sb_hidden_tooling_type_tooling() },
  product: { bg: 'var(--sb-accent)', text: 'var(--sb-accent)', label: () => m.talk_sb_hidden_tooling_type_product() },
  infra: { bg: 'var(--sb-ember)', text: 'var(--sb-ember)', label: () => m.talk_sb_hidden_tooling_type_infra() },
  content: { bg: 'var(--sb-dim)', text: 'var(--sb-dim)', label: () => m.talk_sb_hidden_tooling_type_content() },
}

const toolingCount = REPOS.filter((r) => r.type === 'tooling').length

export function HiddenToolingSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_tooling_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_tooling_desc()}
          </p>
        </AnimatedSection>

        {/* Type legend */}
        <AnimatedSection>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(TYPE_COLORS).map(([type, style]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: style.bg }}
                />
                <span className="font-mono text-[10px] text-[var(--sb-dim)]">{style.label()}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] overflow-hidden">
            <table className="w-full font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[var(--sb-border)] text-left">
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">{m.talk_sb_hidden_tooling_col_repo()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal text-right">{m.talk_sb_hidden_tooling_col_commits()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal hidden sm:table-cell">{m.talk_sb_hidden_tooling_col_role()}</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal text-center">{m.talk_sb_hidden_tooling_col_type()}</th>
                </tr>
              </thead>
              <tbody>
                {REPOS.map((r, i) => {
                  const typeStyle = TYPE_COLORS[r.type]
                  return (
                    <tr
                      key={r.name}
                      className={i % 2 === 0 ? 'bg-[var(--sb-bg)]/50' : ''}
                    >
                      <td className="px-4 py-1.5" style={{ color: typeStyle?.text }}>{r.name}</td>
                      <td className="px-4 py-1.5 text-[var(--sb-text)] text-right tabular-nums">{r.commits}</td>
                      <td className="px-4 py-1.5 text-[var(--sb-dim)] hidden sm:table-cell">{r.role}</td>
                      <td className="px-4 py-1.5 text-center">
                        <span
                          className="inline-block rounded-sm px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider"
                          style={{
                            color: typeStyle?.text,
                            backgroundColor: `color-mix(in srgb, ${typeStyle?.bg} 15%, transparent)`,
                          }}
                        >
                          {typeStyle?.label()}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--sb-accent)]/30">
                  <td className="px-4 py-2 text-[var(--sb-accent)] font-bold">{REPOS.length} repos</td>
                  <td className="px-4 py-2 text-[var(--sb-accent)] font-bold text-right tabular-nums">4,196</td>
                  <td className="px-4 py-2 text-[var(--sb-dim)] hidden sm:table-cell">83 days · Jan → Mar 2026</td>
                  <td className="px-4 py-2 text-center">
                    <span className="font-mono text-[9px] text-[var(--sb-teal)]">{toolingCount} tooling</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
