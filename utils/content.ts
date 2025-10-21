import { PageMappingType, sitemap as sitemap_static } from '@/lib/sitemap'
import { getCollection, getGlobal } from '@/lib/content'
import { readLocalStorage, writeLocalStorage } from '@/utils/localstorage'

export function getPermalink(
  id_or_slug: string,
  node: PageMappingType[],
  parent_path = '',
): string | null {
  for (const page of node) {
    const current_path = `${parent_path}/${page.slug}`.replace(/\/+$/, '')

    if (page.id === id_or_slug || page.slug === id_or_slug) {
      return current_path || '/'
    }

    if (page.children) {
      const child_path = getPermalink(id_or_slug, page.children, current_path)
      if (child_path) {
        return child_path
      }
    }
  }

  return null
}

export function findCurrentPage(): PageMappingType | null {
  if (typeof window === 'undefined') {
    return null
  }

  const pathname = window.location.pathname.replace(/\/+$/, '')
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return findPage('home', sitemap_static)
  }

  const id_or_slug = segments[segments.length - 1]
  return findPage(id_or_slug, sitemap_static)
}

export function findPage(
  id_or_slug: string,
  sitemap?: PageMappingType[],
): PageMappingType | null {
  if (!sitemap) {
    sitemap = sitemap_static
  }

  const findInchildren = (pages: PageMappingType[]): PageMappingType | null => {
    for (const page of pages) {
      if (page.id === id_or_slug || page.slug === id_or_slug) {
        return page
      }
      if (page.children) {
        const result = findInchildren(page.children)
        if (result) {
          return result
        }
      }
    }
    return null
  }

  return findInchildren(sitemap)
}

export function findTitle(slug: string, sitemap: PageMappingType[]): string {
  if (!sitemap) {
    sitemap = sitemap_static
  }

  const page = findPage(slug, sitemap)
  return page ? page.title : ''
}

export async function getPageTitle(
  title: string,
  seo_title?: string,
): Promise<string> {
  if (!seo_title) {
    const global_seo = await getGlobal('seo')
    seo_title = global_seo?.page_title
  }
  return `${title} | ${seo_title}`
}

export async function setPageTitle(
  title: string,
  seo_title?: string,
): Promise<boolean> {
  if (typeof document !== 'undefined') {
    document.title = await getPageTitle(title, seo_title)
    return true
  }

  return false
}

export interface ImageMetaInterface {
  file_name: string
  url: string
  width: number
  height: number
  size: number
  alt: string | null
  copyright: string | null
}

export async function getImageMeta(
  file_name: string,
): Promise<ImageMetaInterface | false> {
  let images = readLocalStorage('collection.images') as ImageMetaInterface[]

  if (!images) {
    images = (await getCollection('images')) as ImageMetaInterface[]
    if (images) {
      writeLocalStorage('collection.images', images, 60) // cache for 1 hour
    }
  }

  if (!images || images.length === 0) {
    return false
  }

  const image = images.find(
    (img: ImageMetaInterface) => img.file_name === file_name,
  )

  return image ?? false
}
