// hooks/useContentWidth.ts
import { useRef, useState, useEffect, RefObject } from 'react'

export function useContentWidth<T extends HTMLElement = HTMLDivElement>() {
  const el_ref = useRef<T | null>(null)
  const [content_width, setContentWidth] = useState(0)

  useEffect(() => {
    const el = el_ref.current
    if (!el) return

    // sofort messen
    setContentWidth(el.clientWidth)

    const ro = new ResizeObserver(([entry]) =>
      setContentWidth(Math.round(entry.contentRect.width)),
    )
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  // saubere Typ-Signatur fürs JSX
  return { el_ref: el_ref as RefObject<T>, content_width }
}
