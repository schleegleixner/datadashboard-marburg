import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'
import type { LineSeriesOption } from 'echarts'
import { ReactElement } from 'react'
import { BorderVariantType }  from '@/utils/variants/BorderVariants'


export interface LineChartDataType {
  title: string
  unit?: string
  icon?: string
  color?: string
  visible?: Boolean
  seriesOption?: LineSeriesOption[]
  variant: BorderVariantType
}
export type LineChartDataTypes = Record<string, LineChartDataType>

export type ChartProps = {
  tile_payload: TilePayloadType
  switch?: ReactElement
  datasource: TileDatasourceType
  variant: ActionDimensionsType
}
