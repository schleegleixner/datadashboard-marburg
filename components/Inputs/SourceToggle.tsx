'use client'

import ToggleGroup from '@/components/Inputs/ToggleGroup'
import { TileDatasourceType } from '@/types/tiles'
import { ActionDimensionsDefaultType, ActionDimensionsType } from '@/types/dimensionMapping'

export default function SourceToggle({
  datasources,
  onChange,
  variant = ActionDimensionsDefaultType,
}: {
  datasources: TileDatasourceType[] | null
  onChange: (_id: number) => void
  variant: ActionDimensionsType
}) {
  if (!datasources || datasources.length < 2) {
    return null
  }

  return (
    <div className="mb-4 w-full">
      <ToggleGroup
        items={datasources.map((ds, index) => ({
          element: ds.label ?? ds.file_name,
          value: index.toString(),
        }))}
        onChange={(value: string) => {
          const index = parseInt(value, 10)
          if (!isNaN(index)) {
            onChange(index)
          }
        }}
        variant={variant}
      />
    </div>
  )
}
