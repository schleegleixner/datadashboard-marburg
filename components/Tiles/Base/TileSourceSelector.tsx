'use client'

import { useEffect, useState } from 'react'
import SourceToggle from '@/components/Inputs/SourceToggle'
import { getVariantType } from '@/utils/payload'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { ActionDimensionsType } from '@/types/dimensionMapping'
import {
  getCompiledDatasource,
  TileDatasourceType,
  TilePayloadType,
} from '@schleegleixner/react-statamic-api'

type SourceSelectorProps = {
  tile_payload: TilePayloadType
  children: (
    _payload: TilePayloadType,
    _datasource: TileDatasourceType,
    _variant: ActionDimensionsType,
  ) => React.ReactNode
}

export default function SourceSelector({
  tile_payload,
  children,
}: SourceSelectorProps) {
  const [datasource, setDatasource] = useState<TileDatasourceType | null>(null)
  const [datasource_id, setDatasourceId] = useState<number>(0)

  useEffect(() => {
    if (!tile_payload) {
      return
    }
    setDatasource(getCompiledDatasource(tile_payload, datasource_id))
  }, [datasource_id, tile_payload])

  if (!datasource || !datasource.content?.length) {
    return <RequestIndicator />
  }

  const variant = getVariantType(tile_payload)

  return (
    <>
      <SourceToggle
        datasources={tile_payload.datasources}
        onChange={setDatasourceId}
        variant={variant}
      />
      {children(tile_payload, datasource, variant)}
    </>
  )
}
