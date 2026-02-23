import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type PayloadDataType = {
  [key: string]: string
}

export function getVariantType(
  tile_payload: TilePayloadType,
): ActionDimensionsType {
  return tile_payload?.tags?.action_dimension ?? null
}