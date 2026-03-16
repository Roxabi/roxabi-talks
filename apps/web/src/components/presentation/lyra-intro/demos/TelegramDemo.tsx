'use client'

import { Player } from '@remotion/player'
import { TelegramChatScene } from './TelegramChatDemo'

export function TelegramDemo() {
  return (
    <Player
      component={TelegramChatScene}
      durationInFrames={300}
      fps={30}
      compositionWidth={400}
      compositionHeight={550}
      style={{ width: '100%', height: 'auto' }}
      loop
      autoPlay
      controls={false}
      inputProps={{}}
    />
  )
}
