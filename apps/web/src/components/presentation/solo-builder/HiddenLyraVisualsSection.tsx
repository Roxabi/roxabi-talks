import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const DIAGRAMS = import.meta.env.VITE_DIAGRAMS_URL ?? 'http://localhost:8080'

const VISUALS = [
  {
    src: '/slides/solo-builder/lyra-ux-telegram.png',
    label: 'UX Telegram',
    href: `${DIAGRAMS}/lyra/visuals/lyra-ux-telegram.html`,
  },
  {
    src: '/slides/solo-builder/lyra-stream-ux.png',
    label: 'Stream UX',
    href: `${DIAGRAMS}/lyra/visuals/lyra-stream-ux.html`,
  },
  {
    src: '/slides/solo-builder/lyra-arch-gap.png',
    label: 'Architecture gap',
    href: `${DIAGRAMS}/lyra/visuals/lyra-arch-gap.html`,
  },
  {
    src: '/slides/solo-builder/lyra-persistence-arch.png',
    label: 'Persistence arch',
    href: `${DIAGRAMS}/lyra/visuals/lyra-persistence-arch.html#db`,
  },
]

export function HiddenLyraVisualsSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_lyra_visuals_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_lyra_visuals_desc()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-2">
            {VISUALS.map((v) => (
              <a
                key={v.label}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[var(--sb-border)] overflow-hidden hover:border-[var(--sb-accent)]/40 transition-colors group"
              >
                <img
                  src={v.src}
                  alt={v.label}
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--sb-surface)]">
                  <span className="font-mono text-[10px] text-[var(--sb-text)]/70">{v.label}</span>
                  <span className="font-mono text-[9px] text-[var(--sb-dim)]">↗</span>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
