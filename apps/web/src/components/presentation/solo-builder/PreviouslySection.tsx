import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const PREVIOUS_TALKS = [
  { key: 'claude_code', icon: '⚙️', color: 'var(--sb-teal)' },
  { key: 'dev_process', icon: '🔀', color: 'var(--sb-teal)' },
  { key: 'lyra_story', icon: '✨', color: 'var(--sb-ember)' },
  { key: 'lyra_dev', icon: '🗡️', color: 'var(--sb-green)' },
  { key: 'lyra_product', icon: '📈', color: 'var(--sb-amber)' },
  { key: 'lyra_intro', icon: '🔷', color: 'var(--sb-teal)' },
] as const

export function PreviouslySection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-10 py-4">
        <AnimatedSection>
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--sb-dim)] uppercase">
            {m.talk_sb_previously_label()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_previously_title()}</span>
          </h2>
        </AnimatedSection>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {PREVIOUS_TALKS.map((talk) => (
            <AnimatedSection key={talk.key}>
              <div className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{talk.icon}</span>
                  <p className="font-mono text-xs font-semibold" style={{ color: talk.color }}>
                    {(m[`talk_sb_previously_${talk.key}_name` as keyof typeof m] as () => string)()}
                  </p>
                </div>
                <p className="text-sm text-[var(--sb-text)]/60 leading-relaxed">
                  {(m[`talk_sb_previously_${talk.key}_desc` as keyof typeof m] as () => string)()}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4 text-left mx-auto max-w-2xl">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed italic">
              {m.talk_sb_previously_bridge()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
