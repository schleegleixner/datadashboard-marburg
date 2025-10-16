import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'
import type { PieSeriesOption } from 'echarts'

export type PieChartDataType = PieSeriesOption['data']

export type ChartProps = {
  tile_payload: TilePayloadType
  datasource: TileDatasourceType
  variant: ActionDimensionsType
}
