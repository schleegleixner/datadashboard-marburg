import Container from '@/components/Layout/Container'
import { ContentImage, PageMappingType } from '@schleegleixner/react-statamic-api'
import PageIntro from '@/components/Elements/PageIntro'
import LinkTile from '@/components/Elements/LinkTile'
import Grid from '@/components/Layout/Grid'
import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'
import Searchfield from '@/components/Elements/Searchfield'
import Spinner from '@/components/Elements/Spinner'
import React, { JSX } from 'react'

interface LinkTileProps {
  title: string
  url: string
  image?: string
  description?: string
}

export default function ContentTemplate({ page_data }: { page_data: PageMappingType }): JSX.Element {
  if (!page_data) {
    return (
      <Container>
        <Spinner className="mx-auto" />
      </Container>
    )
  }

  const { content, hero_image, hero_topline, hero_headline } = page_data.content
  const tiles: Array<LinkTileProps> = page_data.content.content_tiles || []

  // save list: bottom-0 right-0

  return (
    <div>
      {hero_image && (
        <div className="relative max-h-[67vh] w-full border-b-8 border-primary bg-slate-200 lg:aspect-[16/5] lg:min-h-80">
          <div className="absolute inset-0">
            <ContentImage
              className="absolute"
              src={hero_image}
            />
          </div>
          <div className="relative left-0 top-0 z-10 flex h-full w-full items-end justify-start py-6 lg:absolute">
            <Container>
              <div className="flex w-fit flex-col items-start gap-4">
                <div className="w-fit bg-white px-6 py-4 xs:px-8 md:px-12 lg:px-8 lg:py-6 xl:px-12">
                  {hero_topline && (
                    <Text className="mb-2 text-lg" variant="primary">
                      {hero_topline}
                    </Text>
                  )}
                  <Title as="h1" margin="none" variant="primary">
                    {hero_headline}
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
            content={content}
            headline={page_data.content.headline}
          />

          <Grid columns={3}>
            {tiles.map((tile: LinkTileProps, index: number) => {
              return <LinkTile key={index} {...tile} />
            })}
          </Grid>
        </div>
      </Container>
    </div>
  )
}
