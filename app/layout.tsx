import '@/styles/globals.css'
import { headers } from 'next/headers'
import { findPage, getPageTitle } from '@/utils/content'
import { getContent, getGlobal } from '@/lib/content'
import { FathomAnalytics } from '@/components/Layout/Fathom'
import { EyeAble } from '@/components/Layout/EyeAble'

export const metadata = {
  icons: '/favicon.ico',
}

async function getPageTitleServer() {
  const current_headers = await headers()
  const full_url: string = current_headers.get('x-full-url') ?? ''
  const url = full_url === '/' ? '' : full_url.replace(/^\//, '')
  const segments = url.split('/').filter(Boolean)

  if (segments.length > 2) {
    const page =
      findPage(segments[segments.length - 1]) ??
      findPage(segments[segments.length - 2])

    // check for specific page slugs and return tile name if available
    if (page && (page.slug === 'share' || page.slug === 'embed')) {
      const tile_content = await getContent(
        'tile',
        segments[segments.length - 1],
      )
      if (tile_content) {
        return getPageTitle(tile_content.title + ' | ' + page?.title)
      }
    }

    return getPageTitle(page?.title ?? 'Seite nicht gefunden | 404')
  }

  // is start page
  const start_page = findPage('home')
  return getPageTitle(start_page?.title ?? '')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const global_seo = await getGlobal('seo')
  const page_title = await getPageTitleServer()
  const page_description = global_seo?.meta_description ?? ''

  return (
    <html lang="de">
      <head>
        <title>{page_title}</title>

        <link
          href="/favicon/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link href="/favicon/favicon.ico" rel="shortcut icon" />
        <link
          href="/favicon/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <meta content="Marburg in Zahlen" name="apple-mobile-web-app-title" />
        <link href="/favicon/site.webmanifest" rel="manifest" />

        <meta content={page_description} name="description" />
        <meta content={page_title} property="og:title" />
        <meta content={page_description} property="og:description" />
        <meta
          content={`/api/image?name=${global_seo?.share_image}&w=1200&h=630`}
          property="og:image"
        />
        <meta content="1200" property="og:image:width" />
        <meta content="630" property="og:image:height" />
        <meta content="website" property="og:type" />
      </head>
      <body className="touch-pan-y overflow-x-hidden">
        <FathomAnalytics />
        <main id="app-root">{children}</main>
        <EyeAble />
      </body>
    </html>
  )
}
