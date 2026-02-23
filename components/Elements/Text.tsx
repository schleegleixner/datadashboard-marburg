import { cx, VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import {
  TileDefaultVariants,
  TileVariants,
} from '@/utils/variants/TileVariants'

const TextStyle = cva('block', {
  variants: TileVariants,
  defaultVariants: TileDefaultVariants,
})

type TextProps = VariantProps<typeof TextStyle> &
  HTMLAttributes<HTMLSpanElement> & {
    margin?: (typeof headlineTags)[number] | 'none'
    tag?: string
  }

export const headlineTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export const validHtmlTags = [...headlineTags, 'span', 'div'] as const

type ValidHtmlTag = (typeof validHtmlTags)[number]

const getValidTag = (tag: string | null | undefined): ValidHtmlTag => {
  return validHtmlTags.includes(tag as ValidHtmlTag)
    ? (tag as ValidHtmlTag)
    : 'div'
}

export default function Text({
  as,
  variant,
  font,
  children,
  className,
  margin = 'none',
  tag = 'div',
  ...props
}: TextProps) {
  const Tag = getValidTag(tag)

  return (
    <Tag
      {...props}
      className={cx(className, TextStyle({ as, variant, font, margin }))}
      style={{ hyphens: 'auto', ...props.style }}
    >
      {children}
    </Tag>
  )
}
