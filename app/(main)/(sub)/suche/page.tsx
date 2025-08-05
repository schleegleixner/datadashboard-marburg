import TileCollectionView from '@/components/Views/TileCollectionView'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import { getCompleteTileset } from '@/lib/content'
import Searchbox from '@/components/Elements/Searchbox'

export default async function Suche() {
  const collection = await getCompleteTileset()

  return (
    <>
      <PageIntro container slug="search" />
      <Searchbox />
      <Container>
        <TileCollectionView collection={collection} />
      </Container>
    </>
  )
}
