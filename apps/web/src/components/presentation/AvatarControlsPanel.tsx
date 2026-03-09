import { cn } from '@repo/ui'
import type { ReactNode } from 'react'
import {
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  type AvatarPosition,
  type AvatarVariant,
} from '@/components/presentation/lyra-story/lyra.constants'
import { ChipButton, KEYBOARD_HINTS, POSITION_CLASSES, VARIANT_LABELS } from './AvatarControls'
import { m } from '@/paraglide/messages'

type SetAvatarParam = (
  params: Partial<{ avatar: AvatarVariant; avatarSize: number; avatarPos: AvatarPosition }>
) => void

type AvatarControlsPanelProps = {
  avatar: AvatarVariant
  avatarSize: number
  avatarPos: AvatarPosition
  setAvatarParam: SetAvatarParam
  /** Companion element (LyraCompanion, or a Link wrapping it) */
  children: ReactNode
}

/**
 * Fixed avatar companion panel with hover-reveal variant/size/position controls.
 * Hidden on mobile — presenter uses desktop + slide clicker.
 */
export function AvatarControlsPanel({
  avatar,
  avatarSize,
  avatarPos,
  setAvatarParam,
  children,
}: AvatarControlsPanelProps) {
  return (
    <div className={cn('fixed z-40 hidden md:block group', POSITION_CLASSES[avatarPos])}>
      {children}

      {/* Hover-reveal controls */}
      <div className="mt-1 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
        <div className="flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1">
          {AVATAR_VARIANTS.map((v) => (
            <ChipButton
              key={v}
              active={avatar === v}
              onClick={() => setAvatarParam({ avatar: v })}
              title={v}
              aria-label={m.talk_avatar_switch_variant()}
            >
              {VARIANT_LABELS[v]}
            </ChipButton>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1">
          {AVATAR_SIZES.map((s) => (
            <ChipButton
              key={s}
              active={avatarSize === s}
              onClick={() => setAvatarParam({ avatarSize: s })}
              aria-label={m.talk_avatar_set_size()}
            >
              {s}
            </ChipButton>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/40 backdrop-blur-sm px-2 py-1">
          {KEYBOARD_HINTS.map(({ key, label }) => (
            <span key={key} className="text-[9px] font-mono text-white/30">
              <span className="text-white/50">{key}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
