import { AnimatedSection, Badge } from '@repo/ui'
import { Link } from '@tanstack/react-router'
import { m } from '@/paraglide/messages'

export function ClosingSection() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <div className="relative space-y-8 py-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl font-mono text-amber-300">
            {m.talk_lp_closing_title()}
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-xl text-base text-muted-foreground/70 leading-relaxed">
            {m.talk_lp_closing_body()}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <p className="mx-auto max-w-2xl text-2xl font-bold italic text-amber-300 lg:text-3xl">
            &ldquo;{m.talk_lp_closing_cta()}&rdquo;
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-col items-center gap-3">
            <Badge className="border border-amber-400/50 bg-amber-500/10 text-amber-300 font-mono text-[10px] tracking-widest">
              {m.talk_lp_closing_links_label()}
            </Badge>
            <p className="font-mono text-xs text-muted-foreground/50">
              {m.talk_lp_closing_contact()}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Link
            to="/talks"
            className="font-mono text-[10px] text-amber-400/40 hover:text-amber-400/70 transition-colors tracking-widest uppercase"
          >
            ← /talks
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
