import { cva } from 'class-variance-authority'

export const BackgroundVariants = {
  variant: {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    live: 'bg-primary',
    ecology: 'bg-ecology',
    society: 'bg-society',
    economy: 'bg-economy',
    mobility: 'bg-mobility',
    inverse: 'bg-white',
    dark: 'bg-black',
    blue: 'bg-primary-medium',
    green: 'bg-green',
    white: 'bg-white',
    inherit: 'bg-inherit',
    light: 'bg-gray-300',
    brown: 'bg-brown',
    'green-dark': 'bg-green-dark',
    pink: 'bg-pink',
    black: 'bg-black',
    neutral: 'bg-neutral-500',
    yellow: 'bg-yellow',
  },
}

export const BackgroundLightVariants = {
  variant: {
    primary: 'bg-primary-light',
    secondary: 'bg-secondary-light',
    live: 'bg-primary-light',
    ecology: 'bg-ecology-light',
    society: 'bg-society-light',
    economy: 'bg-economy-light',
    mobility: 'bg-mobility-light',
    inverse: 'bg-white',
    dark: 'bg-black',
    blue: 'bg-primary-light',
    green: 'bg-green-light',
    white: 'bg-white',
    inherit: 'bg-inherit',
    light: 'bg-gray-100',
    brown: 'bg-brown-light',
    'green-dark': 'bg-green',
    pink: 'bg-pink-light',
    black: 'bg-neutral-500',
    neutral: 'bg-neutral-100',
    yellow: 'bg-yellow-light',
  },
}

export type BackgroundVariant = keyof typeof BackgroundVariants.variant

export const BackgroundDefaultVariants: { variant: BackgroundVariant } = {
  variant: 'primary',
}

export const getVariantClass = (
  variant: BackgroundVariant,
  light: boolean = false,
): string => {
  return light
    ? BackgroundLightVariants.variant[variant]
    : BackgroundVariants.variant[variant]
}

export const BackgroundStyle = cva('', {
  variants: BackgroundVariants,
  defaultVariants: BackgroundDefaultVariants,
})

export const BackgroundLightStyle = cva('', {
  variants: BackgroundLightVariants,
  defaultVariants: BackgroundDefaultVariants,
})
