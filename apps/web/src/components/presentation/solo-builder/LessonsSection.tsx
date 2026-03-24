import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const LESSONS = [
  { key: 'product', color: 'var(--sb-accent)' },
  { key: 'init', color: 'var(--sb-accent)' },
  { key: 'split', color: 'var(--sb-accent)' },
  { key: 'tooling_budget', color: 'var(--sb-ember)' },
  { key: 'two_machines', color: 'var(--sb-ember)' },
  { key: 'exploratory', color: 'var(--sb-ember)' },
  { key: 'checkpoints', color: 'var(--sb-teal)' },
  { key: 'fifty_fifty', color: 'var(--sb-teal)' },
  { key: 'dashboard', color: 'var(--sb-teal)' },
] as const

export function LessonsSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-dim)]/50 bg-[var(--sb-dim)]/15 text-[var(--sb-dim)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_lessons_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_lessons_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_lessons_desc()}
          </p>
        </AnimatedSection>

        {/* The 9 lessons */}
        <div className="space-y-3">
          {LESSONS.map((lesson, i) => (
            <AnimatedSection key={lesson.key}>
              <div className="flex items-start gap-4 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-surface)] p-4">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                  style={{ backgroundColor: `color-mix(in srgb, ${lesson.color} 20%, transparent)`, color: `var(${lesson.color.slice(4, -1)})` }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold text-[var(--sb-text)]">
                    {(m[`talk_sb_lessons_${lesson.key}_title` as keyof typeof m] as () => string)()}
                  </p>
                  <p className="text-sm text-[var(--sb-text)]/50 mt-1">
                    {(m[`talk_sb_lessons_${lesson.key}_desc` as keyof typeof m] as () => string)()}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Closing message */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-accent)]/40 pl-4">
            <p className="text-lg text-[var(--sb-text)]/80 leading-relaxed font-medium">
              {m.talk_sb_lessons_closing()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
