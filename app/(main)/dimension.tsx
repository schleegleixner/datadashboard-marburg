import TileCollectionView from '@/components/Views/TileCollectionView'
import DimensionFilter from '@/components/Layout/DimensionFilter'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import { getCompleteTileset } from '@/lib/content'
import { notFound } from 'next/navigation'
import { findPage } from '@/utils/content'

type DimensionPageProps = {
  action_dimension: string
  slug: string[]
}

export default async function Page({
  action_dimension,
  slug,
}: DimensionPageProps) {
  const collection = await getCompleteTileset()
  const action_dimension_page = findPage(action_dimension || '')

  // check if the action_dimension_page exists
  if (!action_dimension_page) {
    notFound()
  }

  // check if the action_field_page exists
  if (slug?.length > 0) {
    const action_field_page = findPage(slug[0])
    if (!action_field_page || slug?.length > 1) {
      notFound()
    }
  }

  return (
    <>
      <PageIntro container slug={action_dimension_page.id} />
      <DimensionFilter />
      <Container>
        <TileCollectionView collection={collection} />
      </Container>
    </>
  )
}
