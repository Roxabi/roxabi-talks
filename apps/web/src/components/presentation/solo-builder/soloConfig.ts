export type SoloPhaseColor = 'forge' | 'ember' | 'steel' | 'teal' | 'red'

export type SoloSectionConfig = {
  phase: string
  acte: string
  color: SoloPhaseColor
}

export const soloSections = {
  previously: { phase: 'RECAP', acte: '—', color: 'ember' },
  intro: { phase: 'INIT', acte: 'ACTE 0', color: 'forge' },
  stack: { phase: 'STACK', acte: 'ACTE 1', color: 'ember' },
  tooling: { phase: 'TOOLING', acte: 'ACTE 2', color: 'teal' },
  velocity: { phase: 'VELOCITY', acte: 'ACTE 3', color: 'forge' },
  product: { phase: 'PRODUCT', acte: 'ACTE 4', color: 'ember' },
  drift: { phase: 'DRIFT', acte: 'ACTE 5', color: 'red' },
  lessons: { phase: 'LESSONS', acte: 'ACTE 6', color: 'steel' },
  closing: { phase: 'FORGE', acte: '—', color: 'forge' },
} satisfies Record<string, SoloSectionConfig>

export const colorMap: Record<
  SoloPhaseColor,
  { text: string; border: string; bg: string; glow: string }
> = {
  forge: {
    text: 'text-[var(--sb-accent)]',
    border: 'border-[var(--sb-accent)]/30',
    bg: 'bg-[var(--sb-accent)]/8',
    glow: 'var(--sb-glow)',
  },
  ember: {
    text: 'text-[var(--sb-ember)]',
    border: 'border-[var(--sb-ember)]/30',
    bg: 'bg-[var(--sb-ember)]/8',
    glow: 'var(--sb-glow)',
  },
  steel: {
    text: 'text-[var(--sb-dim)]',
    border: 'border-[var(--sb-dim)]/30',
    bg: 'bg-[var(--sb-dim)]/8',
    glow: 'var(--sb-glow)',
  },
  teal: {
    text: 'text-[var(--sb-teal)]',
    border: 'border-[var(--sb-teal)]/30',
    bg: 'bg-[var(--sb-teal)]/8',
    glow: 'var(--sb-glow)',
  },
  red: {
    text: 'text-[var(--sb-red)]',
    border: 'border-[var(--sb-red)]/30',
    bg: 'bg-[var(--sb-red)]/8',
    glow: 'var(--sb-glow)',
  },
}

export type SectionId = keyof typeof soloSections
export const SOLO_SECTION_IDS = Object.keys(soloSections) as string[]
