import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type ContentProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType
  keys?: string[]
  variant: ActionDimensionsType
}
