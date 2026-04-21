import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'
import Text, { headlineTags } from './Text'

export const TileStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

export type TileStyleProps = VariantProps<typeof TileStyle>

type TitleProps = TileStyleProps & HTMLAttributes<HTMLSpanElement>

export default function Title({
  as,
  variant,
  children,
  className,
  margin,
  ...props
}: TitleProps) {
  margin = headlineTags.includes(
    (margin ?? as) as (typeof headlineTags)[number],
  )
    ? ((margin ?? as) as (typeof headlineTags)[number])
    : 'none'

  return (
    <Text
      as={as}
      className={className}
      margin={margin}
      tag={as as string}
      variant={variant}
      {...props}
    >
      {children}
    </Text>
  )
}
