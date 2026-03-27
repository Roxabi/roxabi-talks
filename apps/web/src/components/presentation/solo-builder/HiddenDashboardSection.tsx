import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

export function HiddenDashboardSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_dashboard_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_dashboard_desc()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <a
            href="http://localhost:3333"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-[var(--sb-red)]/30 overflow-hidden hover:border-[var(--sb-red)]/60 transition-colors group"
          >
            <img
              src="/slides/solo-builder/dashboard.png"
              alt="Roxabi steering dashboard"
              className="w-full h-auto group-hover:opacity-90 transition-opacity"
              loading="lazy"
            />
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--sb-surface)]">
              <span className="font-mono text-[10px] text-[var(--sb-dim)]">localhost:3333</span>
              <span className="font-mono text-[10px] text-[var(--sb-red)]">↗</span>
            </div>
          </a>
        </AnimatedSection>
      </div>
    </div>
  )
}
