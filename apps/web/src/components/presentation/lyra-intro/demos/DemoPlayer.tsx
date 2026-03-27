'use client'

import { cn } from '@repo/ui'
import { lazy, Suspense, type ComponentType } from 'react'

const LazyPlayer = lazy(() =>
  import('@remotion/player').then((mod) => ({ default: mod.Player }))
)

type DemoPlayerProps = {
  // biome-ignore lint/suspicious/noExplicitAny: Remotion Player expects a loose component type
  component: ComponentType<any>
  durationInFrames: number
  fps?: number
  width?: number
  height?: number
  className?: string
}

export function DemoPlayer({
  component,
  durationInFrames,
  fps = 30,
  width = 400,
  height = 600,
  className,
}: DemoPlayerProps) {
  if (typeof window === 'undefined') return null

  return (
    <div className={cn('rounded-xl overflow-hidden border border-border/50 shadow-xl', className)}>
      <Suspense fallback={
        <div style={{ width: '100%', aspectRatio: `${width}/${height}` }} className="bg-muted/20 animate-pulse rounded-xl" />
      }>
        <LazyPlayer
          component={component}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={width}
          compositionHeight={height}
          style={{ width: '100%', height: 'auto' }}
          loop
          autoPlay
          controls={false}
          inputProps={{}}
        />
      </Suspense>
    </div>
  )
}
