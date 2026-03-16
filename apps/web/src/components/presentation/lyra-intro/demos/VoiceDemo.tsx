'use client'

import { Player } from '@remotion/player'
import { VoicePipelineScene } from './VoicePipelineDemo'

export function VoiceDemo() {
  return (
    <Player
      component={VoicePipelineScene}
      durationInFrames={300}
      fps={30}
      compositionWidth={700}
      compositionHeight={250}
      style={{ width: '100%', height: 'auto' }}
      loop
      autoPlay
      controls={false}
      inputProps={{}}
    />
  )
}
