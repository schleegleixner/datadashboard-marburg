'use client'

import Text from '@/components/Elements/Text'
import Markdown from '@/components/Elements/Markdown'
import { scrollToTop } from '@/utils/scroll'
import ProxyLink from '@/components/Elements/ProxyLink'

export interface FooterLinkProps {
  label: string
  url: string
}

export default function FooterColumn({
  children,
  copy,
  headline,
  link_list,
}: {
  children?: React.ReactNode
  copy?: string
  headline?: string
  link_list?: FooterLinkProps[]
}) {
  return (
    <div className="flex flex-col gap-8 text-white">
      {children && <div>{children}</div>}
      {headline && (
        <Text as="h3" variant={'white'}>
          {headline}
        </Text>
      )}
      {copy && (
        <div>
          <Markdown content={copy} />
        </div>
      )}
      {link_list && (
        <nav aria-label={`Navigation ${headline}`} className="flex flex-col gap-4">
          {link_list.map((link: FooterLinkProps, index: number) => (
            <ProxyLink
              href={link.url}
              key={index}
              onClick={() => {
                if (link.url.startsWith('/')) {
                  scrollToTop()
                }
              }}
              rel="noopener noreferrer"
              target={link.url.startsWith('/') ? '_self' : '_blank'}
            >
              <Text as="h5" className="underline" variant={'white'}>
                {link.label}
              </Text>
            </ProxyLink>
          ))}
        </nav>
      )}
    </div>
  )
}