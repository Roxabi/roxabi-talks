'use client'

import { Player } from '@remotion/player'
import { useEffect, useRef, useState } from 'react'
import { TelegramChatScene } from './TelegramChatDemo'

export function TelegramDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 350 }}>
      {size && (
        <Player
          component={TelegramChatScene}
          durationInFrames={300}
          fps={30}
          compositionWidth={400}
          compositionHeight={550}
          style={{ width: size.w, height: size.h }}
          loop
          autoPlay
          controls={false}
          inputProps={{}}
        />
      )}
    </div>
  )
}
