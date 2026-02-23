import '@/styles/globals.css'
import { headers } from 'next/headers'
import {
  EyeAble,
  FathomAnalytics,
  getCollection,
  getCurrentPageServer,
  getGlobal,
  PasswordForm,
  TranslationContext
} from '@schleegleixner/react-statamic-api'
import { notFound } from 'next/navigation'
import Head from '@/components/Layout/Head'

const getLangFromSiteId = (locale: string) => {
  const locale_map: Record<string, string> = {
    default: 'de',
    preview: 'de',
  }
  return locale_map[locale] || 'de'
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const current_headers = await headers()
  const is_authenticated = current_headers.get('x-site-auth') === 'true'

  const { locale: site_id } = await params

  if (site_id === '.well-known') {
    return notFound()
  }

  // check if password protection is enabled
  if (!is_authenticated) {
    return <PasswordForm className="" lang={getLangFromSiteId(site_id)} />
  }

  const pathname = current_headers.get('x-pathname') || '/'

  // fetch global data
  const global_seo = await getGlobal('seo', site_id)
  const strings = await getGlobal('strings', site_id)
  const sitemap = await getCollection('pages', site_id)
  const page_data = await getCurrentPageServer(sitemap, pathname)

  return (
    <html lang={getLangFromSiteId(site_id)}>
      <Head
        global_seo={global_seo}
        page_data={page_data}
        pathname={pathname}
        site_id={site_id}
      />
      <body className="touch-pan-y overflow-x-hidden">
        <FathomAnalytics />
        <TranslationContext site_id={site_id} strings={strings?.entries}>
          <main id="app-root">{children}</main>
        </TranslationContext>
        <EyeAble src="https://cdn.eye-able.com/configs/marburginzahlen.marburg.de.js" />
      </body>
    </html>
  )
}
