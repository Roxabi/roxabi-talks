import { cn, PresentationNav } from '@repo/ui'
import { createLazyFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { AvatarControlsPanel } from '@/components/presentation/AvatarControlsPanel'
import { AbandonedQuestSection } from '@/components/presentation/lyra-dev/AbandonedQuestSection'
import { AwakeningNightSection } from '@/components/presentation/lyra-dev/AwakeningNightSection'
import { BuildChangeSection } from '@/components/presentation/lyra-dev/BuildChangeSection'
import { CharacterCreationSection } from '@/components/presentation/lyra-dev/CharacterCreationSection'
import { CharacterSheetSection } from '@/components/presentation/lyra-dev/CharacterSheetSection'
import { ClosingSection } from '@/components/presentation/lyra-dev/ClosingSection'
import { CraftSystemSection } from '@/components/presentation/lyra-dev/CraftSystemSection'
import { colorMap, DEV_SECTION_IDS, devZones } from '@/components/presentation/lyra-dev/devConfig'
import { EndgameSection } from '@/components/presentation/lyra-dev/EndgameSection'
import { GrandRespecSection } from '@/components/presentation/lyra-dev/GrandRespecSection'
import { GuildHallSection } from '@/components/presentation/lyra-dev/GuildHallSection'
import { IndustrializationSection } from '@/components/presentation/lyra-dev/IndustrializationSection'
import { PatchNotesSection } from '@/components/presentation/lyra-dev/PatchNotesSection'
import { QuestJournalSection } from '@/components/presentation/lyra-dev/QuestJournalSection'
import { SectionChrome } from '@/components/presentation/lyra-dev/SectionChrome'
import { SessionLogSection } from '@/components/presentation/lyra-dev/SessionLogSection'
import { SkillTreeSection } from '@/components/presentation/lyra-dev/SkillTreeSection'
import { TheLessonSection } from '@/components/presentation/lyra-dev/TheLessonSection'
import { TitleSection } from '@/components/presentation/lyra-dev/TitleSection'
import { TutorialZoneSection } from '@/components/presentation/lyra-dev/TutorialZoneSection'
import { LyraCompanion } from '@/components/presentation/lyra-story/LyraCompanion'
import { SectionContainer } from '@/components/presentation/SectionContainer'
import { ThemeToggle } from '@/components/ThemeToggle'
import { m } from '@/paraglide/messages'
import { useAvatarKeyboardControls } from '@/hooks/useAvatarKeyboardControls'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import {
  type AvatarPosition,
  type AvatarVariant,
} from '@/routes/talks/lyra-dev'

export const Route = createLazyFileRoute('/talks/lyra-dev')({
  component: LyraDevPresentation,
})

const sectionIds = DEV_SECTION_IDS

const sections = [
  { id: 'title', label: m.talk_ld_nav_title() },
  { id: 'character-creation', label: m.talk_ld_nav_char_creation() },
  { id: 'tutorial-zone', label: m.talk_ld_nav_tutorial() },
  { id: 'skill-tree', label: m.talk_ld_nav_skill_tree() },
  { id: 'abandoned-quest', label: m.talk_ld_nav_abandoned() },
  { id: 'build-change', label: m.talk_ld_nav_build_shift() },
  { id: 'grand-respec', label: m.talk_ld_nav_grand_respec() },
  { id: 'industrialization', label: m.talk_ld_nav_factory() },
  { id: 'patch-notes', label: m.talk_ld_nav_patch_notes() },
  { id: 'craft-system', label: m.talk_ld_nav_craft() },
  { id: 'awakening-night', label: m.talk_ld_nav_awakening() },
  { id: 'guild-hall', label: m.talk_ld_nav_guild_hall() },
  { id: 'quest-journal', label: m.talk_ld_nav_quest_journal() },
  { id: 'session-log', label: m.talk_ld_nav_session_log() },
  { id: 'endgame', label: m.talk_ld_nav_endgame() },
  { id: 'character-sheet', label: m.talk_ld_nav_char_sheet() },
  { id: 'the-lesson', label: m.talk_ld_nav_lesson() },
  { id: 'closing', label: m.talk_ld_nav_closing() },
]

export function LyraDevPresentation() {
  const navigate = useNavigate()
  const handleEscape = useCallback(() => navigate({ to: '/talks' }), [navigate])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const { avatar, avatarSize, avatarPos } = useSearch({ from: '/talks/lyra-dev' })

  const avatarParamsRef = useRef({ avatar, avatarSize, avatarPos })
  useEffect(() => {
    avatarParamsRef.current = { avatar, avatarSize, avatarPos }
  }, [avatar, avatarSize, avatarPos])

  const setAvatarParam = useCallback(
    (params: { avatar?: AvatarVariant; avatarSize?: number; avatarPos?: AvatarPosition }) =>
      navigate({
        to: '/talks/lyra-dev',
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

  const currentZone = devZones[sectionIds[currentSectionIndex] ?? '']
  const currentZoneColors = currentZone ? colorMap[currentZone.color] : null

  return (
    <div
      data-presentation
      data-mode="mmorpg"
      className="relative bg-[#060d08] text-foreground min-h-dvh"
    >
      {/* Breadcrumb */}
      <div className="fixed left-6 top-6 z-50 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <a
            href={import.meta.env.VITE_APP_URL ?? '/'}
            className="font-mono text-xs font-bold tracking-wider text-emerald-400/50 hover:text-emerald-400 transition-colors uppercase"
          >
            Roxabi
          </a>
          <ChevronRight className="size-3 text-emerald-400/30" aria-hidden="true" />
          <Link
            to="/talks"
            className="font-mono text-xs font-bold tracking-wider text-emerald-400/50 hover:text-emerald-400 transition-colors uppercase"
          >
            {m.talk_index_title()}
          </Link>
        </div>
        {currentZone && currentZoneColors && (
          <span className={cn('font-mono text-xs font-bold tracking-widest uppercase', currentZoneColors.text)}>
            {currentZone.zone}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2 text-emerald-400/60 [&_button]:hover:text-emerald-400 [&_button]:hover:bg-emerald-400/10">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      {/* XP counter */}
      <div className="fixed left-6 bottom-6 z-50 hidden md:block">
        <p className="font-mono text-[9px] tracking-widest text-emerald-400/40 uppercase">
          {currentSectionIndex + 1} / {sectionIds.length}
        </p>
      </div>

      {/* Lyra avatar companion — hidden on mobile */}
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
          rpgColors={{ primary: '#10b981', secondary: '#f59e0b', hair: '#6ee7b7', dark: '#0d2b1a' }}
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
        <SectionContainer id="title" className="relative [background:radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(16,185,129,0.08)_0%,transparent_100%)]">
          <SectionChrome sectionId="title" />
          <TitleSection />
        </SectionContainer>

        <SectionContainer id="character-creation" className="relative">
          <SectionChrome sectionId="character-creation" />
          <CharacterCreationSection />
        </SectionContainer>

        <SectionContainer id="tutorial-zone" className="relative">
          <SectionChrome sectionId="tutorial-zone" />
          <TutorialZoneSection />
        </SectionContainer>

        <SectionContainer id="skill-tree" className="relative">
          <SectionChrome sectionId="skill-tree" />
          <SkillTreeSection />
        </SectionContainer>

        <SectionContainer id="abandoned-quest" className="relative">
          <SectionChrome sectionId="abandoned-quest" />
          <AbandonedQuestSection />
        </SectionContainer>

        <SectionContainer id="build-change" className="relative">
          <SectionChrome sectionId="build-change" />
          <BuildChangeSection />
        </SectionContainer>

        <SectionContainer id="grand-respec" className="relative">
          <SectionChrome sectionId="grand-respec" />
          <GrandRespecSection />
        </SectionContainer>

        <SectionContainer id="industrialization" className="relative">
          <SectionChrome sectionId="industrialization" />
          <IndustrializationSection />
        </SectionContainer>

        <SectionContainer id="patch-notes" className="relative">
          <SectionChrome sectionId="patch-notes" />
          <PatchNotesSection />
        </SectionContainer>

        <SectionContainer id="craft-system" className="relative">
          <SectionChrome sectionId="craft-system" />
          <CraftSystemSection />
        </SectionContainer>

        <SectionContainer id="awakening-night" className="relative bg-[#0a0005]">
          <SectionChrome sectionId="awakening-night" />
          <AwakeningNightSection />
        </SectionContainer>

        <SectionContainer id="guild-hall" className="relative">
          <SectionChrome sectionId="guild-hall" />
          <GuildHallSection />
        </SectionContainer>

        <SectionContainer id="quest-journal" className="relative">
          <SectionChrome sectionId="quest-journal" />
          <QuestJournalSection />
        </SectionContainer>

        <SectionContainer id="session-log" className="relative">
          <SectionChrome sectionId="session-log" />
          <SessionLogSection />
        </SectionContainer>

        <SectionContainer id="endgame" className="relative">
          <SectionChrome sectionId="endgame" />
          <EndgameSection />
        </SectionContainer>

        <SectionContainer id="character-sheet" className="relative">
          <SectionChrome sectionId="character-sheet" />
          <CharacterSheetSection />
        </SectionContainer>

        <SectionContainer id="the-lesson" className="relative">
          <SectionChrome sectionId="the-lesson" />
          <TheLessonSection />
        </SectionContainer>

        <SectionContainer id="closing" className="relative">
          <SectionChrome sectionId="closing" />
          <ClosingSection />
        </SectionContainer>
      </div>
    </div>
  )
}
