'use client'

import Link, { LinkProps } from 'next/link'
import { buildTranslatedUrl, isTranslatedProxy } from '@/utils/gtranslate'

interface ProxyLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  rel?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export default function ProxyLink({
  href,
  children,
  className,
  rel = 'noopener noreferrer',
  target = '_self',
  ...rest
}: ProxyLinkProps) {
  if (!isTranslatedProxy()) {
    return (
      <Link
        className={className}
        href={href}
        rel={rel}
        target={target}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  const href_string =
    typeof href === 'string' ? href : href.pathname || String(href)

  return (
    <a
      className={className}
      href={buildTranslatedUrl(href_string)}
      rel={rel}
      target={target}
      {...rest}
    >
      {children}
    </a>
  )
}
