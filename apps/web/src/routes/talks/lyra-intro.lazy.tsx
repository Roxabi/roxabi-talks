import { cn, PresentationNav } from '@repo/ui'
import { createLazyFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { m } from '@/paraglide/messages'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { AvatarControlsPanel } from '@/components/presentation/AvatarControlsPanel'
import { introColorMap, introSections, INTRO_SECTION_IDS } from '@/components/presentation/lyra-intro/introConfig'
import { SectionChrome } from '@/components/presentation/lyra-intro/SectionChrome'
import TitleSection from '@/components/presentation/lyra-intro/TitleSection'
import TheProblemSection from '@/components/presentation/lyra-intro/TheProblemSection'
import WhatIsLyraSection from '@/components/presentation/lyra-intro/WhatIsLyraSection'
import TheHardwareSection from '@/components/presentation/lyra-intro/TheHardwareSection'
import ArchitectureSection from '@/components/presentation/lyra-intro/ArchitectureSection'
import AgentsPoolsSection from '@/components/presentation/lyra-intro/AgentsPoolsSection'
import HappyPathsSection from '@/components/presentation/lyra-intro/HappyPathsSection'
import MemorySection from '@/components/presentation/lyra-intro/MemorySection'
import MultiChannelSection from '@/components/presentation/lyra-intro/MultiChannelSection'
import VoiceSection from '@/components/presentation/lyra-intro/VoiceSection'
import ResilienceSection from '@/components/presentation/lyra-intro/ResilienceSection'
import WhatsNextSection from '@/components/presentation/lyra-intro/WhatsNextSection'
import RoadmapSection from '@/components/presentation/lyra-intro/RoadmapSection'
import ClosingSection from '@/components/presentation/lyra-intro/ClosingSection'
import { LyraCompanion } from '@/components/presentation/lyra-story/LyraCompanion'
import { SectionContainer } from '@/components/presentation/SectionContainer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAvatarKeyboardControls } from '@/hooks/useAvatarKeyboardControls'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import type { AvatarPosition, AvatarVariant } from '@/routes/talks/lyra-intro'

export const Route = createLazyFileRoute('/talks/lyra-intro')({
  component: LyraIntroPresentation,
})

const sectionIds = INTRO_SECTION_IDS

export function LyraIntroPresentation() {
  const sections = useMemo(
    () => [
      { id: 'title', label: m.talk_li_nav_intro() },
      { id: 'the-problem', label: m.talk_li_nav_the_problem() },
      { id: 'what-is-lyra', label: m.talk_li_nav_what_is_lyra() },
      { id: 'the-hardware', label: m.talk_li_nav_hardware() },
      { id: 'architecture', label: m.talk_li_nav_architecture() },
      { id: 'agents-pools', label: m.talk_li_nav_agents_pools() },
      { id: 'happy-paths', label: m.talk_li_nav_happy_paths() },
      { id: 'memory', label: m.talk_li_nav_memory() },
      { id: 'multi-channel', label: m.talk_li_nav_multi_channel() },
      { id: 'voice', label: m.talk_li_nav_voice() },
      { id: 'resilience', label: m.talk_li_nav_resilience() },
      { id: 'whats-next', label: m.talk_li_nav_whats_next() },
      { id: 'roadmap', label: m.talk_li_nav_roadmap() },
      { id: 'closing', label: m.talk_li_nav_closing() },
    ],
    []
  )
  const navigate = useNavigate()
  const handleEscape = useCallback(() => navigate({ to: '/talks' }), [navigate])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const { avatar, avatarSize, avatarPos } = useSearch({ from: '/talks/lyra-intro' })

  const avatarParamsRef = useRef({ avatar, avatarSize, avatarPos })
  useEffect(() => {
    avatarParamsRef.current = { avatar, avatarSize, avatarPos }
  }, [avatar, avatarSize, avatarPos])

  const setAvatarParam = useCallback(
    (params: { avatar?: AvatarVariant; avatarSize?: number; avatarPos?: AvatarPosition }) =>
      navigate({
        to: '/talks/lyra-intro',
        search: {
          avatar: params.avatar ?? avatarParamsRef.current.avatar,
          avatarSize: params.avatarSize ?? avatarParamsRef.current.avatarSize,
          avatarPos: params.avatarPos ?? avatarParamsRef.current.avatarPos,
        },
        replace: true,
      }),
    [navigate]
  )

  useAvatarKeyboardControls(avatarParamsRef, setAvatarParam)
  useSectionTracking(sectionIds, setCurrentSectionIndex, { root: scrollContainerRef.current })

  const currentSection = introSections[(sectionIds[currentSectionIndex] ?? '') as keyof typeof introSections]
  const currentSectionColors = currentSection ? introColorMap[currentSection.color] : null

  return (
    <div
      data-presentation
      data-mode="intro"
      className="relative bg-background text-foreground min-h-dvh"
    >
      {/* Breadcrumb */}
      <div className="fixed left-6 top-6 z-50 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <a
            href={import.meta.env.VITE_APP_URL ?? '/'}
            className="font-mono text-xs font-bold tracking-wider text-primary/50 hover:text-primary transition-colors uppercase"
          >
            Roxabi
          </a>
          <ChevronRight className="size-3 text-primary/30" aria-hidden="true" />
          <Link
            to="/talks"
            className="font-mono text-xs font-bold tracking-wider text-primary/50 hover:text-primary transition-colors uppercase"
          >
            Talks
          </Link>
        </div>
        {currentSection && currentSectionColors && (
          <span className={cn('font-mono text-xs font-bold tracking-widest uppercase', currentSectionColors.text)}>
            {currentSection.phase}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2 text-primary/60 [&_button]:hover:text-primary [&_button]:hover:bg-primary/10">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      {/* Progress counter */}
      <div className="fixed left-6 bottom-6 z-50 hidden md:block">
        <p className="font-mono text-[9px] tracking-widest text-primary/40 uppercase">
          {currentSectionIndex + 1} / {sectionIds.length}
        </p>
      </div>

      {/* Lyra avatar companion */}
      <AvatarControlsPanel
        avatar={avatar}
        avatarSize={avatarSize}
        avatarPos={avatarPos}
        setAvatarParam={setAvatarParam}
      >
        <LyraCompanion
          stage={currentSectionIndex}
          variant={avatar}
          size={avatarSize}
          pokemonColors={{ primary: '#22d3ee', secondary: '#8b5cf6', light: '#a5f3fc', dark: '#164e63' }}
        />
      </AvatarControlsPanel>

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
        <SectionContainer id="title" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(34,211,238,0.06)_0%,transparent_100%)]">
          <SectionChrome sectionId="title" />
          <TitleSection />
        </SectionContainer>

        <SectionContainer id="the-problem" className="relative">
          <SectionChrome sectionId="the-problem" />
          <TheProblemSection />
        </SectionContainer>

        <SectionContainer id="what-is-lyra" className="relative">
          <SectionChrome sectionId="what-is-lyra" />
          <WhatIsLyraSection />
        </SectionContainer>

        <SectionContainer id="the-hardware" className="relative">
          <SectionChrome sectionId="the-hardware" />
          <TheHardwareSection />
        </SectionContainer>

        <SectionContainer id="architecture" className="relative">
          <SectionChrome sectionId="architecture" />
          <ArchitectureSection />
        </SectionContainer>

        <SectionContainer id="agents-pools" className="relative">
          <SectionChrome sectionId="agents-pools" />
          <AgentsPoolsSection />
        </SectionContainer>

        <SectionContainer id="happy-paths" className="relative">
          <SectionChrome sectionId="happy-paths" />
          <HappyPathsSection />
        </SectionContainer>

        <SectionContainer id="memory" className="relative">
          <SectionChrome sectionId="memory" />
          <MemorySection />
        </SectionContainer>

        <SectionContainer id="multi-channel" className="relative">
          <SectionChrome sectionId="multi-channel" />
          <MultiChannelSection />
        </SectionContainer>

        <SectionContainer id="voice" className="relative">
          <SectionChrome sectionId="voice" />
          <VoiceSection />
        </SectionContainer>

        <SectionContainer id="resilience" className="relative">
          <SectionChrome sectionId="resilience" />
          <ResilienceSection />
        </SectionContainer>

        <SectionContainer id="whats-next" className="relative">
          <SectionChrome sectionId="whats-next" />
          <WhatsNextSection />
        </SectionContainer>

        <SectionContainer id="roadmap" className="relative">
          <SectionChrome sectionId="roadmap" />
          <RoadmapSection />
        </SectionContainer>

        <SectionContainer id="closing" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(34,211,238,0.06)_0%,transparent_100%)]">
          <SectionChrome sectionId="closing" />
          <ClosingSection />
        </SectionContainer>
      </div>
    </div>
  )
}
