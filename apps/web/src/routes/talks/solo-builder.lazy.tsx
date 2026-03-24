import { cn, PresentationNav } from '@repo/ui'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { ClosingSection } from '@/components/presentation/solo-builder/ClosingSection'
import { DriftSection } from '@/components/presentation/solo-builder/DriftSection'
import { IntroSection } from '@/components/presentation/solo-builder/IntroSection'
import { PreviouslySection } from '@/components/presentation/solo-builder/PreviouslySection'
import { LessonsSection } from '@/components/presentation/solo-builder/LessonsSection'
import { ProductSection } from '@/components/presentation/solo-builder/ProductSection'
import { SectionChrome } from '@/components/presentation/solo-builder/SectionChrome'
import { colorMap, SOLO_SECTION_IDS, soloSections } from '@/components/presentation/solo-builder/soloConfig'
import { StackSection } from '@/components/presentation/solo-builder/StackSection'
import { ToolingSection } from '@/components/presentation/solo-builder/ToolingSection'
import { ToolShowcaseSection } from '@/components/presentation/solo-builder/ToolShowcaseSection'
import { VelocitySection } from '@/components/presentation/solo-builder/VelocitySection'
import { SectionContainer } from '@/components/presentation/SectionContainer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { m } from '@/paraglide/messages'

export const Route = createLazyFileRoute('/talks/solo-builder')({
  component: SoloBuilderPresentation,
})

const sectionIds = SOLO_SECTION_IDS

export function SoloBuilderPresentation() {
  const sections = useMemo(
    () => [
      { id: 'intro', label: m.talk_sb_nav_intro() },
      { id: 'previously', label: m.talk_sb_nav_previously() },
      { id: 'stack', label: m.talk_sb_nav_stack() },
      { id: 'tooling', label: m.talk_sb_nav_tooling() },
      { id: 'showcase', label: m.talk_sb_nav_showcase() },
      { id: 'velocity', label: m.talk_sb_nav_velocity() },
      { id: 'product', label: m.talk_sb_nav_product() },
      { id: 'drift', label: m.talk_sb_nav_drift() },
      { id: 'lessons', label: m.talk_sb_nav_lessons() },
      { id: 'closing', label: m.talk_sb_nav_closing() },
    ],
    []
  )
  const navigate = useNavigate()
  const handleEscape = useCallback(() => navigate({ to: '/talks' }), [navigate])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  useSectionTracking(sectionIds, setCurrentSectionIndex, { root: scrollContainerRef.current })

  const currentSection = soloSections[(sectionIds[currentSectionIndex] ?? '') as keyof typeof soloSections]
  const currentSectionColors = currentSection ? colorMap[currentSection.color] : null

  return (
    <div
      data-presentation
      data-mode="solo-builder"
      className="relative bg-[var(--sb-bg)] text-[var(--sb-text)] min-h-dvh"
    >
      {/* Breadcrumb */}
      <div className="fixed left-6 top-6 z-50 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <a
            href={import.meta.env.VITE_APP_URL ?? '/'}
            className="font-mono text-xs font-bold tracking-wider text-[var(--sb-accent)]/50 hover:text-[var(--sb-accent)] transition-colors uppercase"
          >
            Roxabi
          </a>
          <ChevronRight className="size-3 text-[var(--sb-accent)]/30" aria-hidden="true" />
          <Link
            to="/talks"
            className="font-mono text-xs font-bold tracking-wider text-[var(--sb-accent)]/50 hover:text-[var(--sb-accent)] transition-colors uppercase"
          >
            {m.talk_index_title()}
          </Link>
        </div>
        {currentSection && currentSectionColors && (
          <span className={cn('font-mono text-xs font-bold tracking-widest uppercase', currentSectionColors.text)}>
            {currentSection.phase}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2 text-[var(--sb-accent)]/60 [&_button]:hover:text-[var(--sb-accent)] [&_button]:hover:bg-[var(--sb-accent)]/10">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      {/* Progress counter */}
      <div className="fixed left-6 bottom-6 z-50 hidden md:block">
        <p className="font-mono text-[9px] tracking-widest text-[var(--sb-accent)]/40 uppercase">
          {currentSectionIndex + 1} / {sectionIds.length}
        </p>
      </div>

      {/* Section navigation */}
      <PresentationNav
        sections={sections}
        onEscape={handleEscape}
        scrollContainerRef={scrollContainerRef}
        syncHash
      />

      {/* Scroll-snap container */}
      <div
        ref={scrollContainerRef}
        className="md:h-dvh md:overflow-y-auto md:snap-y md:snap-mandatory"
      >
        <SectionContainer id="intro" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,var(--sb-glow)_0%,transparent_100%)]">
          <IntroSection />
        </SectionContainer>

        <SectionContainer id="previously" className="relative">
          <PreviouslySection />
        </SectionContainer>

        <SectionContainer id="stack" className="relative">
          <SectionChrome sectionId="stack" />
          <StackSection />
        </SectionContainer>

        <SectionContainer id="tooling" className="relative">
          <SectionChrome sectionId="tooling" />
          <ToolingSection />
        </SectionContainer>

        <SectionContainer id="showcase" className="relative">
          <SectionChrome sectionId="showcase" />
          <ToolShowcaseSection />
        </SectionContainer>

        <SectionContainer id="velocity" className="relative">
          <SectionChrome sectionId="velocity" />
          <VelocitySection />
        </SectionContainer>

        <SectionContainer id="product" className="relative">
          <SectionChrome sectionId="product" />
          <ProductSection />
        </SectionContainer>

        <SectionContainer id="drift" className="relative">
          <SectionChrome sectionId="drift" />
          <DriftSection />
        </SectionContainer>

        <SectionContainer id="lessons" className="relative">
          <SectionChrome sectionId="lessons" />
          <LessonsSection />
        </SectionContainer>

        <SectionContainer id="closing" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,var(--sb-glow)_0%,transparent_100%)]">
          <ClosingSection />
        </SectionContainer>
      </div>
    </div>
  )
}
