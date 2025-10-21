// Divider.tsx
import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import {
  BorderDefaultVariants,
  BorderVariants,
} from '@/utils/variants/BorderVariants'

export type DividerProps = VariantProps<typeof SpacerLineStyle> & {
  title?: string
  slim?: boolean
  className?: string
}

const SpacerLineStyle = cva('mt-4 pb-4', {
  variants: {
    ...BorderVariants,
    slim: {
      true: 'border-t',
      false: 'border-t-2',
    },
  },
  defaultVariants: {
    ...BorderDefaultVariants,
    slim: false,
  },
})

export default function Divider({
  title,
  variant,
  slim,
  className = '',
}: DividerProps) {
  return (
    <div className={className}>
      <div className={SpacerLineStyle({ variant, slim })} />

      {title && (
        <div className="text-sm font-semibold">
          <span className="mb-2 mt-1 inline-block rounded-full bg-gray-300 px-4 py-1 text-gray-900">
            {title}
          </span>
        </div>
      )}
    </div>
  )
}
