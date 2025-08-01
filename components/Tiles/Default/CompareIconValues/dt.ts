import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type ContentProps = {
  tile_payload: TilePayloadType
  keys?: string[]
  iconBackground?: React.ReactElement
  iconLeft?: React.ReactElement
  iconRight?: React.ReactElement
  datasource: TileDatasourceType
  variant: ActionDimensionsType
}
