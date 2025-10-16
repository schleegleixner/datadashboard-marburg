import TileFactory from '@/utils/factories/TileFactory'
import { TileDataType, TileType } from '@/types/tiles'
import { notFound } from 'next/navigation'
import { getCompleteTileset } from '@/lib/content'

export const revalidate = false

export default async function Share(props: { params: Promise<{ id: TileType }> }) {
  const params = await props.params;
  const { id } = params


  const collection = await getCompleteTileset()
  const tile = collection.find(tile => tile.tile_id === id) as TileDataType

  if (!tile) {
    return notFound()
  }


  return <TileFactory tile_data={tile.content} type={tile.tile_id} />
}
