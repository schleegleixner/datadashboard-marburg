import { cva } from 'class-variance-authority'

export const TextVariants = {
  variant: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    live: 'text-primary',
    ecology: 'text-ecology',
    society: 'text-society',
    economy: 'text-economy',
    mobility: 'text-mobility',
    inverse: 'text-white',
    dark: 'text-black',
    blue: 'text-primary-medium',
    green: 'text-green',
    white: 'text-white',
    inherit: 'text-inherit',
    light: 'text-gray-300',
    brown: 'text-brown',
    'green-dark': 'text-green-dark',
    pink: 'text-pink',
    black: 'text-black',
    neutral: 'text-neutral-500',
    yellow: 'text-yellow',
  },
} as const

export type TextVariant = keyof typeof TextVariants.variant

export const TextDefaultVariants: { variant: TextVariant } = {
  variant: 'primary',
}

export const TextStyle = cva('', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})
