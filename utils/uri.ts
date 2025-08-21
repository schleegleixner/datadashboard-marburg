import { findPage } from '@/utils/content'
import { usePathname } from 'next/navigation'

export function getUriSegment(id: number = 0): string | null {
  const pathname: string = usePathname() ?? '/'
  const url = pathname === '/' ? '' : pathname.replace(/^\//, '')
  const segments = url.split('/').filter(Boolean)

  return segments[id] ?? null
}

export function getCategorySegments(): {
  dimension: string | null
  field: string | null
  sdg_target: string | null
} {
  const path_segments = window.location.pathname.split('/').filter(Boolean)
  const parent_page = findPage('dimensions')
  const dimension_index = parent_page ? 1 : 0
  const field_index = parent_page ? 2 : 1

  const dimension_page = findPage(path_segments[dimension_index])
  const field_page = findPage(path_segments[field_index])

  return {
    dimension: dimension_page?.is_dimension ? dimension_page?.id : null,
    field: field_page?.id ?? null,
    sdg_target: null, // TBD
  }
}
