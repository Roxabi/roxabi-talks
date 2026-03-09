import { useEffect } from 'react'
import type { RefObject } from 'react'
import {
  AVATAR_POSITIONS,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  type AvatarPosition,
  type AvatarVariant,
} from '@/components/presentation/lyra-story/lyra.constants'

type AvatarParams = { avatar: AvatarVariant; avatarSize: number; avatarPos: AvatarPosition }
type SetAvatarParam = (params: Partial<AvatarParams>) => void

/**
 * Registers keyboard shortcuts to cycle avatar variant, size, and position.
 * Uses a ref for current params so the listener never needs to re-register on param changes.
 *
 * Keys: V = cycle variant, [ = smaller, ] = larger, P = cycle position
 */
export function useAvatarKeyboardControls(
  avatarParamsRef: RefObject<AvatarParams>,
  setAvatarParam: SetAvatarParam
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const { avatar: av, avatarSize: sz, avatarPos: pos } = avatarParamsRef.current
      if (e.key === 'v' || e.key === 'V') {
        const idx = AVATAR_VARIANTS.indexOf(av)
        setAvatarParam({ avatar: AVATAR_VARIANTS[(idx + 1) % AVATAR_VARIANTS.length] })
      } else if (e.key === ']') {
        const idx = AVATAR_SIZES.indexOf(sz as (typeof AVATAR_SIZES)[number])
        setAvatarParam({ avatarSize: AVATAR_SIZES[Math.min(idx + 1, AVATAR_SIZES.length - 1)] })
      } else if (e.key === '[') {
        const idx = AVATAR_SIZES.indexOf(sz as (typeof AVATAR_SIZES)[number])
        setAvatarParam({ avatarSize: AVATAR_SIZES[Math.max(idx - 1, 0)] })
      } else if (e.key === 'p' || e.key === 'P') {
        const idx = AVATAR_POSITIONS.indexOf(pos)
        setAvatarParam({ avatarPos: AVATAR_POSITIONS[(idx + 1) % AVATAR_POSITIONS.length] })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setAvatarParam])
}
