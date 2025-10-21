import { TilePayloadType } from '@/types/tiles'

export type PassengerDataType = {
  INDEX: number
  value: number
}

export type PassengerContentProps = {
  data: PassengerDataType[]
  tile_payload: TilePayloadType
}

export interface DataValue {
  current: number
  previous: number | null
}
