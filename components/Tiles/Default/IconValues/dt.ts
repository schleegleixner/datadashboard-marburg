import { TileDatasourceType, TilePayloadType } from '@schleegleixner/react-statamic-api'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type InputDataType = {
  INDEX: number
  [key: string]: number | undefined
}

export type ContentProps = {
  keys?: string[]
  tile_payload: TilePayloadType
  children?: React.ReactElement<any> | React.ReactElement<any>[]
  datasource: TileDatasourceType
  variant: ActionDimensionsType
}

export interface DataValue {
  current: number
  previous: number | null
}
