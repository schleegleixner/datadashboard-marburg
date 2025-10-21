import TileCollectionView from '@/components/Views/TileCollectionView'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import { getCompleteTileset } from '@/lib/content'

export default async function Live() {
  const collection = await getCompleteTileset()

  return (
    <>
      <PageIntro container slug="live" />
      <Container>
        <TileCollectionView category={'live'} collection={collection} />
      </Container>
    </>
  )
}
