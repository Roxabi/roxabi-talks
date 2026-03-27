import { introSections, type SectionId } from './introConfig'

type SectionChromeProps = {
  sectionId: SectionId
}

export function SectionChrome({ sectionId }: SectionChromeProps) {
  const section = introSections[sectionId]
  if (!section || !section.label) return null

  return (
    <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-3">
      <span className="font-mono text-[7px] text-cyan-400/50">{section.label}</span>
    </div>
  )
}
