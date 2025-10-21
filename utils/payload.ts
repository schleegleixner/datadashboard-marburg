import { TileDatasourceType, TilePayloadType } from '@/types/tiles'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export type PayloadDataType = {
  [key: string]: string
}

export function getDataPoint(
  tile_payload: TilePayloadType,
  key: string,
  fallback: number = 0,
): number {
  const datapoint =
    tile_payload.datapoints?.find(datapoint => datapoint.id === key) || null

  if (datapoint) {
    return datapoint.val
  }

  return fallback
}

export function getString(
  tile_payload: TilePayloadType,
  key: string,
  fallback: string = '',
): string {
  const string = tile_payload.strings?.find(string => string.id === key) || null

  if (string) {
    return string.val
  }

  return fallback
}

export function getAllStrings(tile_payload: TilePayloadType): PayloadDataType {
  return (
    tile_payload.strings?.reduce((result: PayloadDataType, item) => {
      if (item.id && item.val) {
        result[item.id] = item.val
      }
      return result
    }, {}) || {}
  )
}

export function getVariantType(
  tile_payload: TilePayloadType,
): ActionDimensionsType {
  return tile_payload.tags.action_dimension
}

export function getDataSource(
  tile_payload: TilePayloadType,
  find: string | number | boolean = true,
): TileDatasourceType | null {
  const datasources = tile_payload.datasources
  if (!Array.isArray(datasources) || datasources.length === 0) {
    return null
  }

  // get first datasource if find is true
  if (find === true) {
    return datasources[0] ?? null
  }

  if (typeof find === 'number') {
    return datasources[find] ?? null
  }

  if (typeof find === 'string') {
    const found = datasources.find(entry => entry.file_name === find)
    return found ?? null
  }

  return null
}

export function getSource(
  tile_payload: TilePayloadType,
  find: string | number | boolean = true,
  fallback: any = null,
): any | null {
  const datasources = tile_payload.datasources
  if (!Array.isArray(datasources) || datasources.length === 0) {
    return fallback
  }

  // get first datasource if find is true
  if (find === true) {
    return datasources[0]?.content ?? fallback
  }

  if (typeof find === 'number') {
    return datasources[find]?.content ?? fallback
  }

  if (typeof find === 'string') {
    const found = datasources.find(entry => entry.file_name === find)
    return found ? found.content : fallback
  }

  return fallback
}

export function filterValidEntries(
  data: PayloadDataType[],
  needs_valid_data: boolean = false,
): PayloadDataType[] {
  if (!data.length) {
    return []
  }

  const firstColumnKey: string | undefined = Object.keys(data[0])[0]
  const firstKeyIsNumeric: boolean = !isNaN(Number(firstColumnKey)) // check if first key is numeric, should be year then

  if (!firstColumnKey) {
    throw new Error('Data does not contain any keys.')
  }

  return data
    .map(entry => {
      // create a new object with filtered keys
      const filtered_entry: PayloadDataType = {} as PayloadDataType
      for (const [key, value] of Object.entries(entry)) {
        if (key && !key.startsWith('_')) {
          filtered_entry[key] = value
        }
      }
      return filtered_entry
    })
    .filter(entry => {
      const isFirstColumnValid: boolean =
        (typeof entry[firstColumnKey] === 'string' &&
          entry[firstColumnKey].trim() !== '') ||
        (typeof entry[firstColumnKey] === 'number' &&
          !isNaN(Number(entry[firstColumnKey]))) ||
        firstKeyIsNumeric

      const hasValidData: boolean = Object.entries(entry).some(
        ([key, value]) => {
          return (
            key !== firstColumnKey &&
            typeof value === 'string' &&
            value.trim() !== ''
          )
        },
      )

      return isFirstColumnValid && (hasValidData || needs_valid_data)
    })
}

export function normalizeHeaders(data: PayloadDataType[]): PayloadDataType[] {
  return data.map(entry => {
    const normalizedEntry: PayloadDataType = {}

    Object.keys(entry).forEach(key => {
      // normalize timescale keys
      const normalizedKey =
        key.toUpperCase() === 'ZEIT' || key.toUpperCase() === 'JAHR'
          ? 'INDEX'
          : key
      normalizedEntry[normalizedKey] = entry[key]

      // remove leading and trailing whitespace from keys
      const trimmedKey = normalizedKey.trim()
      normalizedEntry[trimmedKey] = entry[key]
    })

    return normalizedEntry
  })
}
