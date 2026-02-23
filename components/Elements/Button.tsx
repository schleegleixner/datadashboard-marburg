import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva, cx } from 'class-variance-authority'
import {
  ButtonDefaultVariants,
  ButtonVariants,
} from '@/utils/variants/ButtonVariants'
import Spinner from '@/components/Elements/Spinner'

const button = cva(
  'flex items-center justify-center border font-medium focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 group transition-colors rounded-br-xl',
  {
    variants: ButtonVariants,
    defaultVariants: ButtonDefaultVariants,
  },
)

type IconProps = {
  startIcon?: React.ReactElement<any> | null
  endIcon?: React.ReactElement<any> | null
  whiteBackground?: boolean
}

export type ButtonProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof button> &
  IconProps & {
    isLoading?: boolean
  }

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      className = '',
      variant,
      size,
      hover,
      active,
      isLoading = false,
      startIcon,
      endIcon,
      whiteBackground = false,
      ...props
    },
    ref,
  ) => {
    if (!hover) {
      hover = variant
    }
    if (!active) {
      active = hover
    }
    return (
      <div
        className={cx(
          className,
          whiteBackground ? 'bg-white' : '',
          button({ variant, size, hover, active }),
        )}
        {...props}
        ref={ref}
      >
        {isLoading && <Spinner className="text-current" size="sm" />}
        {!isLoading && startIcon && (
          <span className="mr-1 md:mr-2">{startIcon}</span>
        )}
        {props.children && <span>{props.children}</span>}
        {!isLoading && endIcon}
      </div>
    )
  },
)

Button.displayName = 'Button'
