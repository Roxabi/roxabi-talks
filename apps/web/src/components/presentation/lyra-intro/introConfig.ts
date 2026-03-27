export type IntroPhaseColor = 'cyan' | 'violet' | 'emerald' | 'slate'

export type IntroSectionConfig = {
  phase: string
  label: string
  color: IntroPhaseColor
}

export const introSections = {
  title: { phase: 'INTRO', label: '', color: 'cyan' },
  'the-problem': { phase: 'CONTEXT', label: 'Why', color: 'slate' },
  'what-is-lyra': { phase: 'VISION', label: 'What', color: 'cyan' },
  'the-hardware': { phase: 'INFRA', label: 'Where', color: 'slate' },
  architecture: { phase: 'CORE', label: 'How', color: 'cyan' },
  'agents-pools': { phase: 'CORE', label: 'Agents', color: 'violet' },
  'happy-paths': { phase: 'DEMO', label: 'Flows', color: 'emerald' },
  memory: { phase: 'DEEP', label: 'Memory', color: 'violet' },
  'multi-channel': { phase: 'DEEP', label: 'Channels', color: 'cyan' },
  voice: { phase: 'DEEP', label: 'Voice', color: 'emerald' },
  resilience: { phase: 'DEEP', label: 'Resilience', color: 'slate' },
  'whats-next': { phase: 'FUTURE', label: 'Next', color: 'violet' },
  roadmap: { phase: 'FUTURE', label: 'Roadmap', color: 'cyan' },
  closing: { phase: 'END', label: '', color: 'cyan' },
} satisfies Record<string, IntroSectionConfig>

export const introColorMap: Record<
  IntroPhaseColor,
  { text: string; border: string; bg: string; glow: string }
> = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-500/8',
    glow: 'rgba(34,211,238,0.15)',
  },
  violet: {
    text: 'text-violet-400',
    border: 'border-violet-400/30',
    bg: 'bg-violet-500/8',
    glow: 'rgba(139,92,246,0.15)',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-500/8',
    glow: 'rgba(52,211,153,0.15)',
  },
  slate: {
    text: 'text-slate-400',
    border: 'border-slate-400/30',
    bg: 'bg-slate-500/8',
    glow: 'rgba(148,163,184,0.15)',
  },
}

export type SectionId = keyof typeof introSections
export const INTRO_SECTION_IDS = Object.keys(introSections) as string[]
