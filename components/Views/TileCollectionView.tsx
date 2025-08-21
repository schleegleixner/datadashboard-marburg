'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import BaseView from './BaseView'
import TileCollection from '@/components/Elements/TileCollection'
import { getCategorySegments } from '@/utils/uri'
import {
  ActionDimensionsType,
  ActionFieldsType,
} from '@/types/dimensionMapping'
import type { TileDataType } from '@/types/tiles'
import type CategoryType from '@/types/TilesCategory'

interface DimensionViewProps {
  category?: CategoryType | null
  collection: TileDataType[]
}

export default function TileCollectionView({
  collection,
  category,
}: DimensionViewProps) {
  const [action_dimension, setActionDimension] =
    useState<ActionDimensionsType | null>(null)
  const [action_field, setActionField] = useState<ActionFieldsType | null>(null)
  const [sdg_target, setSdgTarget] = useState<string | null>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const { dimension, field, sdg_target } = getCategorySegments()
    setActionDimension(dimension ? (dimension as ActionDimensionsType) : null)
    setActionField(field ? (field as ActionFieldsType) : null)
    setSdgTarget(sdg_target ?? null)
  }, [pathname, searchParams])

  return (
    <BaseView>
      <TileCollection
        action_dimension={action_dimension}
        action_field={action_field}
        category={category}
        collection={collection}
        sdg_target={sdg_target}
      />
    </BaseView>
  )
}
