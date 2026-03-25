import { useState, useRef, useEffect, type ReactNode } from 'react'

export type HintLink = {
  label: string
  href: string
}

type SlideHintProps = {
  links: HintLink[]
  /** Optional extra content rendered below the links */
  children?: ReactNode
}

export function SlideHint({ links, children }: SlideHintProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (links.length === 0 && !children) return null

  return (
    <div ref={ref} className="absolute bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center justify-center size-7 rounded border border-[var(--sb-border)]/40 bg-[var(--sb-surface)]/50 text-[var(--sb-dim)]/30 hover:text-[var(--sb-dim)]/60 hover:border-[var(--sb-border)]/60 transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Slide references"
      >
        <span className="text-[10px] font-mono leading-none select-none">?</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-64 rounded-lg border border-[var(--sb-border)] bg-[var(--sb-bg)] p-3 shadow-lg">
          <div className="space-y-1.5">
            {links.map((link) => {
              const isHash = link.href.startsWith('#')
              const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://')
              const resolvedHref = isHash ? link.href : isExternal ? link.href : `${window.location.origin}${link.href}`
              return (
                <a
                  key={link.href}
                  href={resolvedHref}
                  target={isHash ? undefined : '_blank'}
                  rel={isHash ? undefined : 'noopener noreferrer'}
                  onClick={isHash ? () => setOpen(false) : undefined}
                  className="flex items-center gap-2 font-mono text-[11px] text-[var(--sb-accent)]/80 hover:text-[var(--sb-accent)] transition-colors"
                >
                  <span className="text-[9px] text-[var(--sb-dim)]">{isHash ? '↓' : '↗'}</span>
                  {link.label}
                </a>
              )
            })}
          </div>
          {children && <div className="mt-2 pt-2 border-t border-[var(--sb-border)]">{children}</div>}
        </div>
      )}
    </div>
  )
}
