import { devZones, type SectionId } from './devConfig'

type SectionChromeProps = {
  sectionId: SectionId
}

export function SectionChrome({ sectionId }: SectionChromeProps) {
  const zone = devZones[sectionId]
  if (!zone) return null

  if (!zone.xp) return null

  return (
    <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-3">
      <span className="font-mono text-[7px] text-amber-400/50">
        +{zone.xp.toLocaleString()} XP
      </span>
    </div>
  )
}
