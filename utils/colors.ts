import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

export function isValidHexColor(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
}

export function hexToRgb(hex: string): [number, number, number] | null {
  if (!isValidHexColor(hex)) {
    return null
  }
  const parsed = parseInt(hex.slice(1), 16)
  let r = Math.floor((parsed >> 16) & 255)
  let g = Math.floor((parsed >> 8) & 255)
  let b = Math.floor(parsed & 255)
  return [r, g, b]
}

export function darkenHexColor(hex: string, factor: number): string {
  let [r, g, b] = hexToRgb(hex) || [0, 0, 0]
  r = Math.floor(r * factor)
  g = Math.floor(g * factor)
  b = Math.floor(b * factor)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function getThemeColor(
  variant: string = 'primary',
  shade: string = 'DEFAULT',
): string {
  const { theme } = resolveConfig(tailwindConfig)
  // @ts-ignore
  const defaultColor = theme?.colors['primary']?.DEFAULT
  // @ts-ignore
  return theme?.colors[variant]?.[shade] || defaultColor
}
