import { cn } from '@repo/ui'
import { colorMap, soloSections, type SectionId } from './soloConfig'

type SectionChromeProps = {
  sectionId: SectionId
}

export function SectionChrome({ sectionId }: SectionChromeProps) {
  const section = soloSections[sectionId]
  if (!section || section.acte === '—') return null

  const colors = colorMap[section.color]

  return (
    <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-3">
      <span className={cn('font-mono text-[7px] tracking-widest uppercase', colors.text)}>
        {section.acte}
      </span>
    </div>
  )
}
