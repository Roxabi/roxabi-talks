'use client'

import { lazy, Suspense, useId } from 'react'
import { useTheme } from 'next-themes'
import { AnimatedSection, useReducedMotion } from '@repo/ui'
import { m } from '@/paraglide/messages'

const VoiceDemo = lazy(() => import('./demos/VoiceDemo').then((mod) => ({ default: mod.VoiceDemo })))

// Pipeline step definitions
const STT_STEPS = ['Voice msg', 'Download', 'Whisper STT', 'Text', 'Process as 1.1']
const TTS_STEPS = ['Response text', 'Qwen TTS', 'WAV chunks', 'OGG/Opus', 'Send voice']
const DISCORD_STEPS = ['OGG', 'PCM frames', 'VoiceClient.play()', 'WebRTC stream']

const STT_COLOR = '#ec4899'
const TTS_COLOR = '#06b6d4'
const DISCORD_COLOR = '#5865f2'
const OUTPUT_COLOR = '#34d399'

// Layout constants
const SVG_WIDTH = 820
const SVG_HEIGHT = 320
const ROW_Y_0 = 60
const ROW_Y_1 = 160
const ROW_Y_2 = 260
const LABEL_X = 8
const PIPELINE_START_X = 100
const STEP_W = 112
const STEP_H = 36
const STEP_GAP = 18 // gap between steps (arrow zone)
const STEP_STRIDE = STEP_W + STEP_GAP

type PipelineRowProps = {
  steps: string[]
  color: string
  outputColor?: string
  y: number
  markerId: string
  animateArrows: boolean
}

function PipelineRow({ steps, color, outputColor, y, markerId, animateArrows }: PipelineRowProps) {
  const top = y - STEP_H / 2
  const lastIdx = steps.length - 1

  return (
    <g>
      {steps.map((label, i) => {
        const x = PIPELINE_START_X + i * STEP_STRIDE
        const isLast = i === lastIdx
        const fill = isLast && outputColor ? outputColor : color
        const arrowX1 = x + STEP_W
        const arrowX2 = x + STEP_STRIDE - 4 // stop just before next rect

        return (
          <g key={label}>
            {/* Step rect */}
            <rect
              x={x}
              y={top}
              width={STEP_W}
              height={STEP_H}
              rx={6}
              fill={`${fill}18`}
              stroke={fill}
              strokeWidth={1.5}
            />
            {/* Step label */}
            <text
              x={x + STEP_W / 2}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
              fill={fill}
            >
              {label}
            </text>
            {/* Arrow to next step */}
            {!isLast && (
              <line
                x1={arrowX1}
                y1={y}
                x2={arrowX2}
                y2={y}
                stroke={color}
                strokeWidth={1.5}
                strokeDasharray={animateArrows ? '4 3' : '0'}
                markerEnd={`url(#${markerId})`}
                opacity={0.7}
              >
                {animateArrows && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-14"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                )}
              </line>
            )}
          </g>
        )
      })}
    </g>
  )
}

type ArrowMarkerProps = {
  id: string
  color: string
}

function ArrowMarker({ id, color }: ArrowMarkerProps) {
  return (
    <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill={color} opacity={0.7} />
    </marker>
  )
}

export default function VoiceSection() {
  const uid = useId()
  const reducedMotion = useReducedMotion()
  const animate = !reducedMotion
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const markerStt = `${uid}-arrow-stt`
  const markerTts = `${uid}-arrow-tts`
  const markerDc = `${uid}-arrow-dc`
  const dotPatternId = `${uid}-dots`

  return (
    <div className="relative mx-auto max-w-5xl w-full overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-[150px]" />
      </div>

      <div className="relative flex flex-col lg:flex-row lg:gap-8 lg:items-stretch">
        {/* Left column — title + SVG pipeline */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <AnimatedSection>
            <div className="mb-2 font-mono text-[10px] tracking-widest text-pink-500 dark:text-pink-400 uppercase">
              {m.talk_li_voice_phase()}
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 font-mono text-pink-600 dark:text-pink-300">
              {m.talk_li_voice_title()}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-4">
            <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-muted/10 p-4">
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width="100%"
                aria-label="Voice pipeline diagram showing STT, TTS, and Discord voice pipelines"
                role="img"
                style={{ display: 'block' }}
              >
                <defs>
                  <pattern
                    id={dotPatternId}
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" fill={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} />
                  </pattern>
                  <ArrowMarker id={markerStt} color={STT_COLOR} />
                  <ArrowMarker id={markerTts} color={TTS_COLOR} />
                  <ArrowMarker id={markerDc} color={DISCORD_COLOR} />
                </defs>

                {/* Dot grid background */}
                <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill={`url(#${dotPatternId})`} />

                {/* Row labels */}
                <text
                  x={LABEL_X}
                  y={ROW_Y_0}
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
                  fill={STT_COLOR}
                  opacity={0.8}
                  writingMode="lr"
                >
                  STT
                </text>
                <text
                  x={LABEL_X}
                  y={ROW_Y_1}
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
                  fill={TTS_COLOR}
                  opacity={0.8}
                >
                  TTS
                </text>
                <text
                  x={LABEL_X}
                  y={ROW_Y_2}
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
                  fill={DISCORD_COLOR}
                  opacity={0.8}
                >
                  DC
                </text>

                {/* STT pipeline */}
                <PipelineRow
                  steps={STT_STEPS}
                  color={STT_COLOR}
                  outputColor={OUTPUT_COLOR}
                  y={ROW_Y_0}
                  markerId={markerStt}
                  animateArrows={animate}
                />

                {/* TTS pipeline */}
                <PipelineRow
                  steps={TTS_STEPS}
                  color={TTS_COLOR}
                  outputColor={OUTPUT_COLOR}
                  y={ROW_Y_1}
                  markerId={markerTts}
                  animateArrows={animate}
                />

                {/* Discord Voice pipeline */}
                <PipelineRow
                  steps={DISCORD_STEPS}
                  color={DISCORD_COLOR}
                  outputColor={OUTPUT_COLOR}
                  y={ROW_Y_2}
                  markerId={markerDc}
                  animateArrows={animate}
                />

                {/* Stats badges — STT */}
                <rect
                  x={PIPELINE_START_X}
                  y={ROW_Y_0 + STEP_H / 2 + 8}
                  width={90}
                  height={18}
                  rx={4}
                  fill={`${STT_COLOR}18`}
                  stroke={STT_COLOR}
                  strokeWidth={1}
                  opacity={0.7}
                />
                <text
                  x={PIPELINE_START_X + 45}
                  y={ROW_Y_0 + STEP_H / 2 + 17}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
                  fill={STT_COLOR}
                  opacity={0.7}
                >
                  ~3GB VRAM
                </text>

                {/* Stats badges — TTS */}
                <rect
                  x={PIPELINE_START_X}
                  y={ROW_Y_1 + STEP_H / 2 + 8}
                  width={90}
                  height={18}
                  rx={4}
                  fill={`${TTS_COLOR}18`}
                  stroke={TTS_COLOR}
                  strokeWidth={1}
                  opacity={0.7}
                />
                <text
                  x={PIPELINE_START_X + 45}
                  y={ROW_Y_1 + STEP_H / 2 + 17}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="ui-monospace, 'Cascadia Code', Menlo, monospace"
                  fill={TTS_COLOR}
                  opacity={0.7}
                >
                  ~5GB VRAM
                </text>
              </svg>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-6">
            <div className="rounded-xl border border-[#5865f2]/20 bg-[#5865f2]/5 p-4">
              <p className="font-mono text-[10px] text-[#5865f2] uppercase tracking-widest mb-1">
                {m.talk_li_voice_discord_label()}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {m.talk_li_voice_discord_desc()}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Right column — Voice pipeline Remotion demo, stretches to match */}
        <div className="mt-8 lg:mt-0 w-full lg:w-[380px] shrink-0 flex flex-col">
          <div className="w-full max-w-[380px] mx-auto rounded-xl overflow-hidden border border-border/50 shadow-xl flex-1 flex flex-col">
            <Suspense fallback={<div className="w-full flex-1 min-h-[200px] bg-muted/20 animate-pulse rounded-xl" />}>
              <VoiceDemo />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
