import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const LESSON_GROUPS = [
  {
    headerKey: 'talk_sb_lessons_group_before',
    color: 'var(--sb-accent)',
    lessons: [
      { key: 'product' },
      { key: 'init' },
      { key: 'split' },
    ],
  },
  {
    headerKey: 'talk_sb_lessons_group_during',
    color: 'var(--sb-ember)',
    lessons: [
      { key: 'tooling_budget' },
      { key: 'two_machines' },
      { key: 'exploratory' },
    ],
  },
  {
    headerKey: 'talk_sb_lessons_group_ongoing',
    color: 'var(--sb-teal)',
    lessons: [
      { key: 'checkpoints' },
      { key: 'fifty_fifty' },
      { key: 'dashboard' },
    ],
  },
] as const

export function LessonsSection() {
  let counter = 0

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

        {/* 3-column grouped lessons */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-3">
            {LESSON_GROUPS.map((group) => (
              <div
                key={group.headerKey}
                className="rounded-lg border bg-[var(--sb-surface)] p-4 space-y-3"
                style={{ borderColor: `color-mix(in srgb, ${group.color} 30%, transparent)` }}
              >
                <p
                  className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `var(${group.color.slice(4, -1)})` }}
                >
                  {(m[group.headerKey as keyof typeof m] as () => string)()}
                </p>
                <div className="space-y-3">
                  {group.lessons.map((lesson) => {
                    counter++
                    const num = counter
                    return (
                      <div key={lesson.key} className="flex items-start gap-3">
                        <span
                          className="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${group.color} 20%, transparent)`,
                            color: `var(${group.color.slice(4, -1)})`,
                          }}
                        >
                          {num}
                        </span>
                        <div>
                          <p className="font-mono text-xs font-semibold text-[var(--sb-text)]">
                            {(m[`talk_sb_lessons_${lesson.key}_title` as keyof typeof m] as () => string)()}
                          </p>
                          <p className="text-[11px] text-[var(--sb-text)]/50 mt-0.5 leading-snug">
                            {(m[`talk_sb_lessons_${lesson.key}_desc` as keyof typeof m] as () => string)()}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  )
}
