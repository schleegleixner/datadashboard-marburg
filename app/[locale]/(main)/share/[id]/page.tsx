import TileFactory from '@/utils/factories/TileFactory'
import { getTileset, TileDataType, TileType } from '@schleegleixner/react-statamic-api'
import { notFound } from 'next/navigation'

export const revalidate = false

export default async function Share(props: { params: Promise<{ id: TileType, locale: string }> }) {
  const params = await props.params;
  const { id, locale: site_id } = params

  const collection = await getTileset(site_id)
  const tile = collection.find(tile => tile.tile_id === id) as TileDataType

  if (!tile) {
    return notFound()
  }

  return <TileFactory tile_data={tile.content} type={tile.tile_id} />
}
