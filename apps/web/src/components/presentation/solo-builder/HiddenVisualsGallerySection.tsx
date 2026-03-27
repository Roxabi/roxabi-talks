import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const DIAGRAMS = import.meta.env.VITE_DIAGRAMS_URL ?? 'http://localhost:8080'

export function HiddenVisualsGallerySection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_visuals_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_visuals_desc()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <a
            href={DIAGRAMS}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-[var(--sb-accent)]/30 overflow-hidden hover:border-[var(--sb-accent)]/60 transition-colors group"
          >
            <img
              src="/slides/solo-builder/visuals-index.png"
              alt="Make Visuals gallery index"
              className="w-full h-auto group-hover:opacity-90 transition-opacity"
              loading="lazy"
            />
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--sb-surface)]">
              <span className="font-mono text-[10px] text-[var(--sb-dim)]">{new URL(DIAGRAMS).host}</span>
              <span className="font-mono text-[10px] text-[var(--sb-accent)]">
                {m.talk_sb_hidden_visuals_open()} ↗
              </span>
            </div>
          </a>
        </AnimatedSection>
      </div>
    </div>
  )
}
