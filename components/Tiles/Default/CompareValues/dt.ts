import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type ContentProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType
  keys?: string[]
  variant: ActionDimensionsType
}
