import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type ChartProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType,
  variant: ActionDimensionsType
}
