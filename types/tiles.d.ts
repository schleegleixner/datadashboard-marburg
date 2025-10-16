import { ActionDimensionsType, ActionFieldsType } from './dimensionMapping'
import { TargetType } from './targetMapping'
import { CategoryType } from './TilesCategory'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { InputDataType } from '@/utils/sources'

export type TileTypePrefix = 'ecology' | 'society' | 'economy'

export type TileType = `${TileTypePrefix}-${string}` | string

export type TileStringType = {
  [key: string]: string
}

export type TileDatapointType = {
  id: string
  val: number
}

export type TableRow = {
  key: string
  label: string | null
  unit?: string | null
  multiplier?: number | null
  visible?: Boolean | null
  variant?: TileVariantTypes | null
  icon?: string | null
  decimals?: number | null
  divider?: boolean | null
}

export type TileDatasourceType = {
  file_name: string
  label: string | null
  labely: string | null
  table_rows: TableRow[] | null
  content: InputDataType[]
  timeline: number[]
  entry_count: number
  allow_download: boolean
}

export interface TilePayloadType {
  tile_id: string
  subtitle: string | null
  title: string | null
  copy: string | ReactElement<any, string | JSXElementConstructor<any>> | null
  details: string
  legend: string | null
  retrieval: string | null
  source: string | null
  strings: TileStringType[] | null
  datapoints: TileDatapointType[] | null
  layout: string | null
  tile_type: string | null
  tags: {
    category: CategoryType
    action_dimension: ActionDimensionsType
    action_field: ActionFieldsType
    sdg_target: TargetType
  }
  live: boolean | null
  search: string
  table_keys: string[] | null
  icon: string | null
  datasources: TileDatasourceType[] | null
}

export interface TileProps {
  type: TileType
  tile_payload: TilePayloadType
}

export type TileDataType = {
  tile_id: TileIdType
  title: string
  layout: 'default' | 'full'
  tags: {
    category: CategoryType
    action_dimension: ActionDimensionsType
    action_field: ActionFieldsType
    sdg_target: TargetType
  }
  search: string
  content?: TilePayloadType
}
