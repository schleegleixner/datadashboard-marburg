'use client'

import { cva, VariantProps } from 'class-variance-authority'
import {
  BackgroundDefaultVariants,
  BackgroundVariants,
} from '@/utils/variants/BackgroundVariants'

const QualityBarStyle = cva(
  'flex h-full rounded-full duration-300 ease-in-out',
  {
    variants: BackgroundVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

export type QualityBarStyleProps = VariantProps<typeof QualityBarStyle>

type QualityBarProps = QualityBarStyleProps & {
  progress: number
  low_label?: string
  high_label?: string
}

export default function QualityBar({
  progress,
  low_label,
  high_label,
  ...variant_props
}: QualityBarProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <span
          className={QualityBarStyle(variant_props)}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs">
        <span>{low_label}</span>
        <span>{high_label}</span>
      </div>
    </div>
  )
}
