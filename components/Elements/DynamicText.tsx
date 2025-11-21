import React from 'react'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { TilePayloadType } from '@/types/tiles'
import { getDataPoint, getVariantType } from '@/utils/payload'

interface DynamicTextProps {
  children: string
  tile_payload: TilePayloadType
}

export default function DynamicText({ children, tile_payload }: DynamicTextProps) {
  const parts = children.split(/\[animate:\s*([a-zA-Z0-9_]+)\]/g)
  const variant = getVariantType(tile_payload)

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <AnimatedNumber key={index} variant={variant}>
            {getDataPoint(tile_payload, part) ?? 0}
          </AnimatedNumber>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  )
}
