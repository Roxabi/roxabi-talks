import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const STACK_ITEMS = [
  { key: 'frontend', label: 'TanStack Start', sub: 'React + Vinxi' },
  { key: 'backend', label: 'NestJS', sub: 'Fastify + Drizzle' },
  { key: 'auth', label: 'Better Auth', sub: 'RBAC + Multi-tenant' },
  { key: 'i18n', label: 'Paraglide', sub: 'Compile-time i18n' },
  { key: 'ui', label: 'shadcn/ui', sub: 'Design system' },
  { key: 'ci', label: 'GitHub Actions', sub: 'CI/CD + Auto-merge' },
  { key: 'deploy', label: 'Vercel + Neon', sub: 'Preview deploys' },
  { key: 'legal', label: 'GDPR + Cookies', sub: 'Consent management' },
  { key: 'docs', label: 'Fumadocs', sub: 'Documentation app' },
  { key: 'test', label: 'Playwright', sub: 'E2E testing' },
  { key: 'admin', label: 'Admin Panel', sub: 'Users, orgs, audit' },
  { key: 'api', label: 'API Keys', sub: 'Public API v1' },
]

export function StackSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-ember)]/50 bg-[var(--sb-ember)]/15 text-[var(--sb-ember)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_stack_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_stack_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_stack_desc()}
          </p>
        </AnimatedSection>

        {/* The boilerplate tree */}
        <AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {STACK_ITEMS.map((item) => (
              <div
                key={item.key}
                className="rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4 transition-colors hover:border-[var(--sb-accent)]/30"
              >
                <p className="font-mono text-sm font-semibold text-[var(--sb-text)]">{item.label}</p>
                <p className="font-mono text-[11px] text-[var(--sb-dim)] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* The stat */}
        <AnimatedSection>
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-[var(--sb-accent)]/30 bg-[var(--sb-accent)]/8 px-5 py-3">
              <span className="font-mono text-xl font-bold text-[var(--sb-accent)]">801</span>
              <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2 uppercase">{m.talk_sb_stack_commits()}</span>
            </div>
            <p className="text-sm text-[var(--sb-text)]/50 italic">{m.talk_sb_stack_just_boilerplate()}</p>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_stack_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
