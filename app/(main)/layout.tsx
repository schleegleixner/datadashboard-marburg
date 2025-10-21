import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import ToTop from '@/components/Layout/ToTop'
import Providers from '@/components/Layout/Providers'
import Top from '@/components/Layout/Top'
import { getGlobal } from '@/lib/content'

export const revalidate = false

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const sitemap = await getSitemap()
  const global_seo = await getGlobal('seo')
  const page_title = global_seo?.page_title ?? ''

  return (
    <div className="flex min-h-screen flex-col">
      <Top />
      <Navbar page_title={page_title} />
      <div className="flex-1" id="content">
        <Providers>{children}</Providers>
      </div>
      <Footer />
      <ToTop />
    </div>
  )
}
