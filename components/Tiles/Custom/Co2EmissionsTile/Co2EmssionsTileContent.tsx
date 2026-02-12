'use client'

import { useMemo, useState } from 'react'
import Switch from '@/components/Inputs/Switch'
import ChartContent from '@/components/Tiles/Default/LineChart/ChartContent'
import { getVariantType } from '@/utils/payload'
import { getDataSource, getString, TilePayloadType } from '@schleegleixner/react-statamic-api'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function Co2EmissionsTileContent({
  tile_payload,
}: {
  tile_payload: TilePayloadType
}) {
  const [showFuture, setShowFuture] = useState(false)
  const variant = getVariantType(tile_payload)
  const switch_label = getString(tile_payload, 'switch_label')

  const filtered_payload = useMemo(() => {
    if (!showFuture || !tile_payload.datasources?.[0]) {
      return tile_payload
    }

    const payload_copy = structuredClone(tile_payload)
    if (!payload_copy.datasources || !payload_copy.datasources[0]) {
      return payload_copy
    }
    const ds = payload_copy.datasources[0]

    if (ds.content && ds.content.length > 0) {
      const lastEntry = ds.content[ds.content.length - 1] as Record<
        string,
        unknown
      >
      for (const key of Object.keys(lastEntry)) {
        if (key !== 'INDEX') {
          lastEntry[key] = 0
        }
      }
    }

    return payload_copy
  }, [showFuture, tile_payload])

  const datasource = getDataSource(filtered_payload)

  if (!datasource || !datasource.content?.length) {
    return <RequestIndicator />
  }

  return (
    <ChartContent
      datasource={datasource}
      switch={
        <div className="flex items-center justify-end">
          <Switch
            checked={showFuture}
            label={switch_label || 'Prognose'}
            onCheckedChange={setShowFuture}
            variant={variant}
          />
        </div>
      }
      tile_payload={filtered_payload}
    />
  )
}
