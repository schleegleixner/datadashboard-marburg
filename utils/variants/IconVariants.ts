import { cva } from 'class-variance-authority'

export const IconVariants = {
  variant: {
    primary: 'fill-primary stroke-primary text-primary',
    secondary: 'fill-secondary stroke-secondary text-secondary',
    live: 'fill-primary stroke-primary text-primary',
    ecology: 'fill-ecology stroke-ecology text-ecology',
    society: 'fill-society stroke-society text-society',
    economy: 'fill-economy stroke-economy text-economy',
    mobility: 'fill-mobility stroke-mobility text-mobility',
    green: 'fill-green stroke-green text-green',
    inverse: 'fill-inverse stroke-inverse text-inverse',
    dark: 'fill-dark stroke-dark text-dark',
    blue: 'fill-blue stroke-blue text-blue',
    white: 'fill-white stroke-white text-white',
    inherit: 'fill-inherit stroke-inherit text-inherit',
    light: 'fill-neutral-300 stroke-neutral-300 text-neutral-300',
    brown: 'fill-brown stroke-brown text-brown',
    'green-dark': 'fill-green-dark stroke-green-dark text-green-dark',
    pink: 'fill-pink stroke-pink text-pink',
    black: 'fill-black stroke-black text-black',
    neutral: 'fill-neutral-500 stroke-neutral-500 text-neutral-500',
    yellow: 'fill-yellow stroke-yellow text-yellow',
  },
} as const

export type IconVariant = keyof typeof IconVariants.variant

export const IconDefaultVariants: { variant: IconVariant } = {
  variant: 'primary',
}

export const IconStyle = cva('', {
  variants: IconVariants,
  defaultVariants: IconDefaultVariants,
})
