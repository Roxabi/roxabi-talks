import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

const MISSING_ITEMS = [
  'talk_sb_product_missing_personas',
  'talk_sb_product_missing_positioning',
  'talk_sb_product_missing_voice',
  'talk_sb_product_missing_marketing',
  'talk_sb_product_missing_visual',
] as const

export function ProductSection() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="space-y-8">
        <AnimatedSection>
          <Badge className="border border-[var(--sb-ember)]/50 bg-[var(--sb-ember)]/15 text-[var(--sb-ember)] tracking-widest uppercase text-[10px] font-mono">
            {m.talk_sb_product_badge()}
          </Badge>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--sb-text)]">{m.talk_sb_product_title()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <p className="max-w-2xl text-base text-[var(--sb-text)]/60 leading-relaxed">
            {m.talk_sb_product_desc()}
          </p>
        </AnimatedSection>

        {/* The checklist of what's missing */}
        <AnimatedSection>
          <div className="rounded-lg border border-[var(--sb-red)]/30 bg-[var(--sb-red)]/5 p-5 space-y-3">
            <p className="font-mono text-xs text-[var(--sb-red)] uppercase tracking-wider">{m.talk_sb_product_not_done()}</p>
            {MISSING_ITEMS.map((key) => (
              <div key={key} className="flex items-center gap-3">
                <div className="size-4 rounded border border-[var(--sb-red)]/40 flex items-center justify-center">
                  <span className="text-[var(--sb-red)] text-[10px]">✗</span>
                </div>
                <span className="font-mono text-sm text-[var(--sb-text)]/60">{m[key]()}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* The order problem */}
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--sb-red)]/20 bg-[var(--sb-surface)] p-4">
              <p className="font-mono text-[10px] text-[var(--sb-red)] uppercase tracking-wider mb-3">{m.talk_sb_product_actual_order()}</p>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-[var(--sb-text)]/70">1. Stack technique</p>
                <p className="text-[var(--sb-text)]/60">2. Outillage</p>
                <p className="text-[var(--sb-text)]/50">3. Vitesse</p>
                <p className="text-[var(--sb-ember)] font-semibold">4. Produit ← ?!</p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--sb-green)]/20 bg-[var(--sb-surface)] p-4">
              <p className="font-mono text-[10px] text-[var(--sb-green)] uppercase tracking-wider mb-3">{m.talk_sb_product_ideal_order()}</p>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-[var(--sb-green)] font-semibold">1. Produit</p>
                <p className="text-[var(--sb-text)]/70">2. Stack technique</p>
                <p className="text-[var(--sb-text)]/60">3. Outillage</p>
                <p className="text-[var(--sb-text)]/50">4. Vitesse</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ryvo_brand stat */}
        <AnimatedSection>
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-[var(--sb-ember)]/30 bg-[var(--sb-ember)]/8 px-5 py-3">
              <span className="font-mono text-xl font-bold text-[var(--sb-ember)]">766</span>
              <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2">{m.talk_sb_product_before_brief()}</span>
            </div>
            <div className="text-[var(--sb-dim)]">&rarr;</div>
            <div className="rounded-lg border border-[var(--sb-ember)]/30 bg-[var(--sb-ember)]/8 px-5 py-3">
              <span className="font-mono text-xl font-bold text-[var(--sb-ember)]">8</span>
              <span className="font-mono text-[10px] text-[var(--sb-dim)] ml-2">{m.talk_sb_product_brand_day()}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Revelation */}
        <AnimatedSection>
          <div className="border-l-2 border-[var(--sb-ember)]/40 pl-4">
            <p className="text-base text-[var(--sb-text)]/70 leading-relaxed">
              {m.talk_sb_product_reveal()}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
