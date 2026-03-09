import { useEffect } from 'react'

/**
 * Tracks the currently visible section using IntersectionObserver.
 * Fires onSectionChange with the index of the first visible section.
 *
 * @param sectionIds - Ordered list of section IDs (order is load-bearing: matches index tracking)
 * @param onSectionChange - Called with the section index when visibility changes
 * @param options.threshold - Intersection threshold (default 0.5)
 * @param options.thinSectionId - Section ID that uses a lower threshold (e.g. a thin divider)
 * @param options.thinThreshold - Threshold for the thin section (default 0.1)
 * @param options.root - Scroll container root element (default: viewport)
 */
export function useSectionTracking(
  sectionIds: string[],
  onSectionChange: (index: number) => void,
  options?: {
    threshold?: number
    thinSectionId?: string
    thinThreshold?: number
    root?: Element | null
  }
) {
  useEffect(() => {
    const { threshold = 0.5, thinSectionId, thinThreshold = 0.1, root } = options ?? {}

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id)
          if (index !== -1) onSectionChange(index)
        }
      }
    }

    const observer = new IntersectionObserver(callback, { threshold, root })
    const thinObserver = thinSectionId
      ? new IntersectionObserver(callback, { threshold: thinThreshold, root })
      : null

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        if (id === thinSectionId && thinObserver) {
          thinObserver.observe(el)
        } else {
          observer.observe(el)
        }
      }
    }

    return () => {
      observer.disconnect()
      thinObserver?.disconnect()
    }
    // sectionIds and onSectionChange are stable module-level constants / setState setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
