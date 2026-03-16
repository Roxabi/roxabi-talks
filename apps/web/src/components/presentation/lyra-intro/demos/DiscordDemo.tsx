'use client'

import { Player } from '@remotion/player'
import { DiscordChatScene } from './DiscordChatDemo'

export function DiscordDemo() {
  return (
    <Player
      component={DiscordChatScene}
      durationInFrames={300}
      fps={30}
      compositionWidth={500}
      compositionHeight={450}
      style={{ width: '100%', height: 'auto' }}
      loop
      autoPlay
      controls={false}
      inputProps={{}}
    />
  )
}
