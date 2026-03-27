import { AnimatedSection } from '@repo/ui'
import { m } from '@/paraglide/messages'

const BRAND_PAGES = [
  {
    src: '/slides/solo-builder/brand-positioning.png',
    label: 'Positioning exploration',
    href: 'http://localhost:8080/lyra/brand/lyra-positioning-exploration.html',
  },
  {
    src: '/slides/solo-builder/brand-taglines.png',
    label: 'Taglines',
    href: 'http://localhost:8080/lyra/brand/lyra-taglines-extend.html',
  },
  {
    src: '/slides/solo-builder/brand-personas.png',
    label: 'Customer personas',
    href: 'http://localhost:8080/lyra/brand/lyra-customer-personas.html',
  },
  {
    src: '/slides/solo-builder/brand-messaging.png',
    label: 'Messaging framework',
    href: 'http://localhost:8080/lyra/brand/lyra-messaging-framework.html',
  },
  {
    src: '/slides/solo-builder/brand-visual-v1.png',
    label: 'Visual directions v1',
    href: 'http://localhost:8080/lyra/brand/lyra-visual-directions.html',
  },
  {
    src: '/slides/solo-builder/brand-visual-v2.png',
    label: 'Visual directions v2',
    href: 'http://localhost:8080/lyra/brand/lyra-visual-directions-v2.html',
  },
  {
    src: '/slides/solo-builder/brand-video-brief.png',
    label: 'Video brief',
    href: 'http://localhost:8080/lyra/brand/lyra-video-brief.html',
  },
]

export function HiddenBrandSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_hidden_brand_title()}</span>
          </h2>
          <p className="font-mono text-[10px] text-[var(--sb-dim)] mt-2">
            {m.talk_sb_hidden_brand_desc()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_PAGES.map((page) => (
              <a
                key={page.label}
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[var(--sb-border)] overflow-hidden hover:border-[var(--sb-ember)]/40 transition-colors group"
              >
                <img
                  src={page.src}
                  alt={page.label}
                  className="w-full h-auto group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--sb-surface)]">
                  <span className="font-mono text-[10px] text-[var(--sb-text)]/70">{page.label}</span>
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
