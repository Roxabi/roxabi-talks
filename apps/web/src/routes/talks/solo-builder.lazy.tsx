import { cn, PresentationNav } from '@repo/ui'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { BreathingSection } from '@/components/presentation/solo-builder/BreathingSection'
import { ClosingSection } from '@/components/presentation/solo-builder/ClosingSection'
import { DriftSection } from '@/components/presentation/solo-builder/DriftSection'
import { DriftSteeringSection } from '@/components/presentation/solo-builder/DriftSteeringSection'
import { HiddenBrandSection } from '@/components/presentation/solo-builder/HiddenBrandSection'
import { HiddenClawSection } from '@/components/presentation/solo-builder/HiddenClawSection'
import { HiddenDashboardSection } from '@/components/presentation/solo-builder/HiddenDashboardSection'
import { HiddenLocSection } from '@/components/presentation/solo-builder/HiddenLocSection'
import { HiddenLyraVisualsSection } from '@/components/presentation/solo-builder/HiddenLyraVisualsSection'
import { HiddenRefactoSection } from '@/components/presentation/solo-builder/HiddenRefactoSection'
import { HiddenToolingSection } from '@/components/presentation/solo-builder/HiddenToolingSection'
import { HiddenVisualsGallerySection } from '@/components/presentation/solo-builder/HiddenVisualsGallerySection'
import { IntroSection } from '@/components/presentation/solo-builder/IntroSection'
import { LessonsRecapSection } from '@/components/presentation/solo-builder/LessonsRecapSection'
import { LessonsSection } from '@/components/presentation/solo-builder/LessonsSection'
import { NextSection } from '@/components/presentation/solo-builder/NextSection'
import { PreviouslySection } from '@/components/presentation/solo-builder/PreviouslySection'
import { ReconSection } from '@/components/presentation/solo-builder/ReconSection'
import { ProductMethodsSection } from '@/components/presentation/solo-builder/ProductMethodsSection'
import { ProductSection } from '@/components/presentation/solo-builder/ProductSection'
import { SectionChrome } from '@/components/presentation/solo-builder/SectionChrome'
import { SlideHint, type HintLink } from '@/components/presentation/solo-builder/SlideHint'
import { colorMap, SOLO_SECTION_IDS, soloSections } from '@/components/presentation/solo-builder/soloConfig'
import { StackSection } from '@/components/presentation/solo-builder/StackSection'
import { ToolingSection } from '@/components/presentation/solo-builder/ToolingSection'
import { TipsSection } from '@/components/presentation/solo-builder/TipsSection'
import { ToolShowcaseSection } from '@/components/presentation/solo-builder/ToolShowcaseSection'
import { VelocitySection } from '@/components/presentation/solo-builder/VelocitySection'
import { VelocityVisualsSection } from '@/components/presentation/solo-builder/VelocityVisualsSection'
import { SectionContainer } from '@/components/presentation/SectionContainer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { m } from '@/paraglide/messages'

export const Route = createLazyFileRoute('/talks/solo-builder')({
  component: SoloBuilderPresentation,
})

const sectionIds = SOLO_SECTION_IDS

/** Hidden slide labels — shown in the phase breadcrumb when a hidden slide is in view */
const hiddenSlideLabels: Record<string, string> = {
  'hidden-loc': 'APPENDIX',
  'hidden-tooling': 'ECOSYSTEM',
  'hidden-refacto': 'REFACTO',
  'hidden-visuals-gallery': 'GALLERY',
  'hidden-lyra-visuals': 'VISUALS',
  'hidden-brand': 'BRAND',
  'hidden-dashboard': 'DASHBOARD',
  'hidden-claw': 'CLAW FAMILY',
  'hidden-tips': 'TIPS',
}

/** Per-slide reference links — fill in as needed */
const slideHints: Record<string, HintLink[]> = {
  intro: [],
  previously: [
    { label: 'Claude Code', href: '/talks/claude-code' },
    { label: 'Dev Process', href: '/talks/dev-process' },
    { label: 'Lyra — Story', href: '/talks/lyra-story' },
    { label: 'Lyra — Dev', href: '/talks/lyra-dev' },
    { label: 'Lyra — Product', href: '/talks/lyra-product' },
    { label: 'LOC overview', href: '#hidden-loc' },
  ],
  stack: [
    { label: 'LOC overview', href: '#hidden-loc' },
  ],
  tooling: [
    { label: 'Ecosystem map', href: '#hidden-tooling' },
  ],
  showcase: [
    { label: 'Lyra README', href: 'https://github.com/Roxabi/lyra' },
  ],
  velocity: [
    { label: 'Refacto phases', href: '#hidden-refacto' },
  ],
  visuals: [
    { label: 'Diagram gallery', href: '#hidden-visuals-gallery' },
    { label: 'Lyra visual explainers', href: '#hidden-lyra-visuals' },
    { label: 'Lyra user guide (visual-explainer)', href: 'http://localhost:8080/lyra-visuals/lyra-user-guide-v14.html' },
    { label: 'Exploratory loop', href: '#hidden-tips' },
    { label: 'First Lyra clip', href: 'https://www.youtube.com/watch?v=rMCRNwWiHr0' },
  ],
  recon: [
    { label: 'Claw family comparisons', href: '#hidden-claw' },
  ],
  breathing: [
    { label: 'Plant breathing moment', href: 'https://www.youtube.com/watch?v=GnmzcahoJ18' },
  ],
  product: [],
  methods: [
    { label: 'Brand playbook', href: '#hidden-brand' },
    { label: 'Brand Exploration Playbook', href: 'https://github.com/Roxabi/lyra/blob/staging/brand/BRAND-EXPLORATION-PLAYBOOK.md' },
    { label: 'Lyra presentation', href: 'https://www.youtube.com/watch?v=w_97kanWlc8' },
  ],
  drift: [
    { label: 'Refacto phases', href: '#hidden-refacto' },
  ],
  steering: [
    { label: 'Refacto phases', href: '#hidden-refacto' },
    { label: 'Dashboard', href: '#hidden-dashboard' },
  ],
  lessons: [
    { label: 'LOC overview', href: '#hidden-loc' },
    { label: 'Ecosystem map', href: '#hidden-tooling' },
    { label: 'Refacto phases', href: '#hidden-refacto' },
  ],
  recap: [],
  next: [],
  closing: [],
}

export function SoloBuilderPresentation() {
  const sections = useMemo(
    () => [
      { id: 'intro', label: m.talk_sb_nav_intro() },
      { id: 'previously', label: m.talk_sb_nav_previously() },
      { id: 'stack', label: m.talk_sb_nav_stack() },
      { id: 'tooling', label: m.talk_sb_nav_tooling() },
      { id: 'showcase', label: m.talk_sb_nav_showcase() },
      { id: 'velocity', label: m.talk_sb_nav_velocity() },
      { id: 'visuals', label: m.talk_sb_nav_visuals() },
      { id: 'recon', label: m.talk_sb_nav_recon() },
      { id: 'breathing', label: '·' },
      { id: 'product', label: m.talk_sb_nav_product() },
      { id: 'methods', label: m.talk_sb_nav_methods() },
      { id: 'drift', label: m.talk_sb_nav_drift() },
      { id: 'steering', label: m.talk_sb_nav_steering() },
      { id: 'recap', label: m.talk_sb_nav_recap() },
      { id: 'lessons', label: m.talk_sb_nav_lessons() },
      { id: 'next', label: m.talk_sb_nav_next() },
      { id: 'closing', label: m.talk_sb_nav_closing() },
    ],
    []
  )
  const navigate = useNavigate()
  const handleEscape = useCallback(() => navigate({ to: '/talks' }), [navigate])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [activeHiddenSlide, setActiveHiddenSlide] = useState<string | null>(null)

  useSectionTracking(sectionIds, setCurrentSectionIndex, { root: scrollContainerRef.current })

  // Track hidden slide visibility
  useEffect(() => {
    const hiddenIds = Object.keys(hiddenSlideLabels)
    const elements = hiddenIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHiddenSlide(entry.target.id)
            return
          }
        }
        setActiveHiddenSlide(null)
      },
      { threshold: 0.5 },
    )
    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const currentSection = soloSections[(sectionIds[currentSectionIndex] ?? '') as keyof typeof soloSections]
  const currentSectionColors = currentSection ? colorMap[currentSection.color] : null
  const phaseLabel = activeHiddenSlide ? hiddenSlideLabels[activeHiddenSlide] : currentSection?.phase

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
        {phaseLabel && (
          <span className={cn('font-mono text-xs font-bold tracking-widest uppercase', activeHiddenSlide ? 'text-[var(--sb-dim)]' : currentSectionColors?.text)}>
            {phaseLabel}
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
          <SlideHint links={slideHints.intro ?? []} />
        </SectionContainer>

        <SectionContainer id="previously" className="relative">
          <PreviouslySection />
          <SlideHint links={slideHints.previously ?? []} />
        </SectionContainer>

        <SectionContainer id="stack" className="relative">
          <SectionChrome sectionId="stack" />
          <StackSection />
          <SlideHint links={slideHints.stack ?? []} />
        </SectionContainer>

        <SectionContainer id="tooling" className="relative">
          <SectionChrome sectionId="tooling" />
          <ToolingSection />
          <SlideHint links={slideHints.tooling ?? []} />
        </SectionContainer>

        <SectionContainer id="showcase" className="relative">
          <SectionChrome sectionId="showcase" />
          <ToolShowcaseSection />
          <SlideHint links={slideHints.showcase ?? []} />
        </SectionContainer>

        <SectionContainer id="velocity" className="relative">
          <SectionChrome sectionId="velocity" />
          <VelocitySection />
          <SlideHint links={slideHints.velocity ?? []} />
        </SectionContainer>

        <SectionContainer id="visuals" className="relative">
          <SectionChrome sectionId="visuals" />
          <VelocityVisualsSection />
          <SlideHint links={slideHints.visuals ?? []} />
        </SectionContainer>

        <SectionContainer id="recon" className="relative">
          <SectionChrome sectionId="recon" />
          <ReconSection />
          <SlideHint links={slideHints.recon ?? []} />
        </SectionContainer>

        <SectionContainer id="breathing" className="relative">
          <BreathingSection />
        </SectionContainer>

        <SectionContainer id="product" className="relative">
          <SectionChrome sectionId="product" />
          <ProductSection />
          <SlideHint links={slideHints.product ?? []} />
        </SectionContainer>

        <SectionContainer id="methods" className="relative">
          <SectionChrome sectionId="methods" />
          <ProductMethodsSection />
          <SlideHint links={slideHints.methods ?? []} />
        </SectionContainer>

        <SectionContainer id="drift" className="relative">
          <SectionChrome sectionId="drift" />
          <DriftSection />
          <SlideHint links={slideHints.drift ?? []} />
        </SectionContainer>

        <SectionContainer id="steering" className="relative">
          <SectionChrome sectionId="steering" />
          <DriftSteeringSection />
          <SlideHint links={slideHints.steering ?? []} />
        </SectionContainer>

        <SectionContainer id="recap" className="relative">
          <SectionChrome sectionId="recap" />
          <LessonsRecapSection />
          <SlideHint links={slideHints.recap ?? []} />
        </SectionContainer>

        <SectionContainer id="lessons" className="relative">
          <SectionChrome sectionId="lessons" />
          <LessonsSection />
          <SlideHint links={slideHints.lessons ?? []} />
        </SectionContainer>

        <SectionContainer id="next" className="relative">
          <SectionChrome sectionId="next" />
          <NextSection />
          <SlideHint links={slideHints.next ?? []} />
        </SectionContainer>

        <SectionContainer id="closing" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,var(--sb-glow)_0%,transparent_100%)]">
          <ClosingSection />
          <SlideHint links={slideHints.closing ?? []} />
        </SectionContainer>

        {/* Hidden slides — inside snap container but not in nav or progress */}
        <SectionContainer id="hidden-visuals-gallery" className="relative">
          <HiddenVisualsGallerySection />
        </SectionContainer>

        <SectionContainer id="hidden-lyra-visuals" className="relative">
          <HiddenLyraVisualsSection />
        </SectionContainer>

        <SectionContainer id="hidden-brand" className="relative">
          <HiddenBrandSection />
        </SectionContainer>

        <SectionContainer id="hidden-dashboard" className="relative">
          <HiddenDashboardSection />
        </SectionContainer>

        <SectionContainer id="hidden-tips" className="relative">
          <TipsSection />
        </SectionContainer>

        <SectionContainer id="hidden-claw" className="relative">
          <HiddenClawSection />
        </SectionContainer>

        <SectionContainer id="hidden-tooling" className="relative">
          <HiddenToolingSection />
        </SectionContainer>

        <SectionContainer id="hidden-refacto" className="relative">
          <HiddenRefactoSection />
        </SectionContainer>

        <SectionContainer id="hidden-loc" className="relative">
          <HiddenLocSection />
        </SectionContainer>
      </div>
    </div>
  )
}
