import { TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type InputDataType = {
  INDEX: string
  [key: string]: string
}

export type DataType = {
  datum: number
  [key: number]: number | null
}

export type EnergyConsumptionContentProps = {
  waermeDataInput: InputDataType[]
  stromDataInput: InputDataType[]
  tile_payload: TilePayloadType
}

export type BuildingType = Omit<DataType, 'datum'>

export type BuildingDataType = {
  [_key in keyof BuildingType]: {
    strom: {
      current: number[]
      previous: number[] | null
      currentSum: number
      previousSum: number | null
    }
    waerme: {
      current: number[]
      previous: number[] | null
      currentSum: number
      previousSum: number | null
    }
    label: string
    icon: string | null
  }
}

export interface ViewProps {
  data: BuildingDataType
  mode: 'strom' | 'waerme'
  variant: ActionDimensionsType
  yearIndex: number
  years: Array<number>
}
