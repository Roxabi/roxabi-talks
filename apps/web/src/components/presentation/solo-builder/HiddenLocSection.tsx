import { AnimatedSection } from '@repo/ui'

const PROJECTS = [
  { name: 'roxabi_boilerplate', loc: '91,779', desc: 'Production-ready SaaS monorepo — auth, RBAC, multi-tenant, AI team' },
  { name: 'lyra', loc: '75,628', desc: 'Personal AI agent — Telegram + Discord, hub-and-spoke architecture' },
  { name: '2ndBrain', loc: '62,377', desc: 'Personal knowledge vault + Telegram bot (roxabi-vault)' },
  { name: 'roxabi-talks', loc: '36,845', desc: 'This presentation — Remotion-based talk system, i18n, snap-scroll' },
  { name: 'roxabi-plugins', loc: '30,323', desc: 'Claude Code skills & plugins — dev-core, design, marketing, product' },
  { name: 'roxabi-production', loc: '12,126', desc: 'Video production pipeline — Remotion renders, assets, exports' },
  { name: 'voiceCLI', loc: '10,703', desc: 'Unified TTS/STT CLI — Qwen3, Chatterbox, Whisper daemons' },
  { name: 'remotion-factory', loc: '8,995', desc: 'Remotion template factory — reusable video components' },
  { name: 'Angelique', loc: '4,848', desc: 'Client project' },
  { name: 'roxabi-vault-tags', loc: '3,458', desc: 'Tag taxonomy & FTS5 search layer for the vault' },
  { name: 'roxabi-vault', loc: '2,980', desc: 'SQLite + FTS5 knowledge store — CLI & SDK' },
  { name: 'imageCLI', loc: '2,778', desc: 'Image generation CLI — FLUX, SD3.5, local GPU' },
  { name: 'roxabi-claude-config', loc: '1,508', desc: 'Shared Claude Code config — settings, permissions, hooks' },
  { name: 'compte_appart', loc: '765', desc: 'Apartment expense tracker' },
  { name: 'lyra-stack', loc: '534', desc: 'Supervisord orchestrator — single control plane for all daemons' },
  { name: 'roxabi_site', loc: '345', desc: 'Landing page — roxabi.com' },
]

const TOTAL = '345,992'

export function HiddenLocSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">Lines of code across ~/projects</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            Source only — .ts .tsx .js .jsx .py .sh .css .sql — excludes node_modules, build output, generated files
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] overflow-hidden">
            <table className="w-full font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[var(--sb-border)] text-left">
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal">Project</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal text-right">LOC</th>
                  <th className="px-4 py-2 text-[var(--sb-dim)] uppercase tracking-wider text-[9px] font-normal hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p, i) => (
                  <tr
                    key={p.name}
                    className={i % 2 === 0 ? 'bg-[var(--sb-bg)]/50' : ''}
                  >
                    <td className="px-4 py-1.5 text-[var(--sb-accent)]">{p.name}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-text)] text-right tabular-nums">{p.loc}</td>
                    <td className="px-4 py-1.5 text-[var(--sb-dim)] hidden sm:table-cell">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--sb-accent)]/30">
                  <td className="px-4 py-2 text-[var(--sb-accent)] font-bold">Total</td>
                  <td className="px-4 py-2 text-[var(--sb-accent)] font-bold text-right tabular-nums">{TOTAL}</td>
                  <td className="px-4 py-2 text-[var(--sb-dim)] hidden sm:table-cell">16 projects · ~346K lines</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
