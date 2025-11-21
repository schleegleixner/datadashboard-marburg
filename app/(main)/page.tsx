import Container from '@/components/Layout/Container'
import { getContent } from '@/lib/content'
import { PageContentType } from '@/types/PageContent'
import PageIntro from '@/components/Elements/PageIntro'
import LinkTile from '@/components/Elements/LinkTile'
import Grid from '@/components/Layout/Grid'
import ContentImage from '@/components/Elements/ContentImage'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import Searchfield from '@/components/Elements/Searchfield'

export const revalidate = false

export default async function Home() {
  const page_content: PageContentType = await getContent('page', 'home')
  const tiles = page_content?.tiles || []

  return (
    <div>
      {page_content?.hero && (
        <div className="relative max-h-[67vh] w-full border-b-8 border-primary bg-slate-200 lg:aspect-[16/5] lg:min-h-80">
          <div className="absolute inset-0 hidden md:block">
            <ContentImage
              className="absolute"
              src={page_content.hero.image}
              width={1920}
            />
          </div>
          <div className="absolute inset-0 md:hidden">
            <ContentImage
              className="absolute"
              src={page_content.hero.image}
              width={1024}
            />
          </div>
          <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
            <Container>
              <div className="flex w-fit flex-col items-start gap-4">
                <div className="w-fit bg-white px-6 py-4 xs:px-8 md:px-12 lg:px-8 lg:py-6 xl:px-12">
                  {page_content.hero.topline && (
                    <Text className="mb-2 text-lg" variant="primary">
                      {page_content.hero.topline}
                    </Text>
                  )}
                  <Title as="h1" margin="none" variant="primary">
                    {page_content.hero.title}
                  </Title>
                </div>
                <Searchfield />
              </div>
            </Container>
          </div>
        </div>
      )}

      <Container variant="compact">
        <div className="mb-8 flex w-full flex-col gap-8">
          <PageIntro
            content={page_content?.content}
            headline={page_content?.headline}
          />

          <Grid columns={3}>
            {tiles.map((tile, index) => {
              return <LinkTile key={index} {...tile} />
            })}
          </Grid>
        </div>
      </Container>
    </div>
  )
}
