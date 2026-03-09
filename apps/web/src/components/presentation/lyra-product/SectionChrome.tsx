import { productSections, type SectionId } from './productConfig'

type SectionChromeProps = {
  sectionId: SectionId
}

export function SectionChrome({ sectionId }: SectionChromeProps) {
  const section = productSections[sectionId]
  if (!section) return null

  if (section.day === '—') return null

  return (
    <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-3">
      <span className="font-mono text-[7px] text-amber-400/50">{section.day}</span>
    </div>
  )
}
