'use client'

import { useEffect, useState } from 'react'
import { getImageMeta, ImageMetaInterface } from '@/utils/content'
import Spinner from '@/components/Elements/Spinner'
import { cx } from 'class-variance-authority'

export default function ContentImage({
  src,
  alt = null,
  width = 800,
  height = null,
  className = '',
  loading = 'lazy',
}: {
  src: string
  alt?: string | null
  width?: number | null
  height?: number | null
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const [has_error, setHasError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [meta, setMeta] = useState<ImageMetaInterface | null | false>(null)
  const [file_path, setFilePath] = useState<string | null>(null)
  const [aspect_ratio, setAspectRatio] = useState<string | number>('auto')

  useEffect(() => {
    if (src.startsWith('http')) {
      setFilePath(src)
    } else {
      const file_name = src.split('/').pop() || src
      getImageMeta(file_name)
        .then(result => result && setMeta(result))
        .catch(() => setMeta(false))
    }
  }, [src])

  useEffect(() => {
    if (meta) {
      const image_aspect_ratio = meta.width / meta.height
      setAspectRatio(image_aspect_ratio)
    }
  }, [meta, aspect_ratio])

  useEffect(() => {
    if (meta) {
      const image_width = width || meta.width
      const image_height =
        height || Math.round(image_width / (typeof aspect_ratio === 'number' ? aspect_ratio : 1))
      setFilePath(
        `/api/image/?name=${encodeURIComponent(meta.file_name as string)}&w=${image_width}&h=${image_height}`,
      )
    }
  }, [meta, width, height, aspect_ratio])

  if (file_path === null) {
    return (
      <span className="flex h-full w-full items-center justify-center">
        <Spinner />
      </span>
    )
  }

  if (has_error || (meta === false && file_path === null)) {
    return (
      <span className="block text-center">
        <span className="block w-full rounded border-2 border-secondary p-3 font-bold text-secondary">
          Unbekanntes Bild: {alt || src}
        </span>
      </span>
    )
  }

  return (
    <span
      className="relative block h-full w-full"
      style={{ aspectRatio: aspect_ratio }}
    >
      {!loaded && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <Spinner />
        </span>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt || (meta && meta.alt) || ''}
        className={cx(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        loading={loading}
        onError={() => setHasError(true)}
        onLoad={() => setLoaded(true)}
        src={file_path}
      />

      {meta && meta.copyright && loaded && (
        <span className="absolute bottom-0 right-0 z-20 bg-primary px-2 py-1 text-xs text-white">
          © {meta.copyright}
        </span>
      )}
    </span>
  )
}
