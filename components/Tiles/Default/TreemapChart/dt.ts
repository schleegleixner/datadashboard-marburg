import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type ChartProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType,
  variant: ActionDimensionsType
}
