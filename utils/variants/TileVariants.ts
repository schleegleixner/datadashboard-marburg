import { HeadlineVariants } from '@/utils/variants/HeadlineVariants'
import { TextVariants } from '@/utils/variants/TextVariants'
import { FontVariant, FontVariants } from '@/utils/variants/FontVariants'

export const TileVariants = {
  as: HeadlineVariants.as,
  variant: TextVariants.variant,
  font: FontVariants.font,
  margin: {
    none: '',
    h1: 'mb-4 lg:mb-6',
    h2: 'mb-4',
    h3: 'mb-4',
    h4: 'mb-4',
    h5: 'mb-4',
    h6: 'mb-4',
    p: 'mb-2',
  },
} as const

export type TileVariantTypes = keyof typeof TileVariants.variant

export const TileDefaultVariants: { font: FontVariant } = {
  font: 'medium',
}
