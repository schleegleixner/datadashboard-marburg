export const BorderVariants = {
  variant: {
    primary: 'border-primary',
    secondary: 'border-secondary',
    live: 'border-primary',
    ecology: 'border-ecology',
    society: 'border-society',
    economy: 'border-economy',
    mobility: 'border-mobility',
    light: 'border-gray-300',
    blue: 'border-primary-medium',
    green: 'border-green',
    white: 'border-white',
    inherit: 'border-inherit',
    dark: 'border-black',
    inverse: 'border-white',
    brown: 'border-brown',
    'green-dark': 'border-green-dark',
    pink: 'border-pink',
    black: 'border-black',
    neutral: 'border-neutral-500',
    yellow: 'border-yellow',
  },
} as const

export type BorderVariantType = keyof typeof BorderVariants.variant

export const BorderDefaultVariants: { variant: BorderVariantType } = {
  variant: 'light',
}
