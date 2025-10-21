export const ButtonVariants = {
  variant: {
    primary: 'border-primary text-primary fill-primary stroke-primary',
    secondary:
      'border-secondary text-secondary fill-secondary stroke-secondary',
    live: 'border-primary',
    ecology: 'border-ecology text-ecology fill-ecology stroke-ecology',
    society: 'border-society text-society fill-society stroke-society',
    economy: 'border-economy text-economy fill-economy stroke-economy',
    mobility: 'border-mobility text-mobility fill-mobility stroke-mobility',
    inverse: 'text-white border-white text-white',
    danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
    overlay: 'border-white text-white',
    barebone: '',
    inherit: 'border-inherit text-inherit',
    brown: 'border-brown text-brown fill-brown stroke-brown',
    'green-dark':
      'border-green-dark text-green-dark fill-green-dark stroke-green-dark',
    pink: 'border-pink text-pink fill-pink stroke-pink',
    black: 'border-black text-black fill-black stroke-black',
    neutral:
      'border-neutral-500 text-neutral-500 fill-neutral-500 stroke-neutral-500',
    yellow: 'border-yellow text-yellow fill-yellow stroke-yellow',
  },
  size: {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-md',
    lg: 'py-3 px-5 text-lg',
    link: 'pr-6 md:pr-10 pl-5 md:pl-8 py-2 xl:py-3 text-xl xl:text-2xl',
    main_menu: 'py-1 xl:py-3 px-3 xl:px-5  text-lg min-h-12',
    filter_dimensions:
      'py-3 px-5 text-xl lg:text-2xl min-h-24 w-full border-0 shadow',
    filter_fields: 'py-3 px-5 text-lg min-h-16 w-full h-full',
  },
  hover: {
    primary:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-primary',
    secondary: '',
    live: '',
    ecology:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-ecology',
    society:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-society',
    economy:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-economy',
    mobility:
      'hover:fill-white hover:stroke-white hover:text-white hover:bg-mobility',
    inverse: 'hover:text-primary hover:border-white hover:bg-white',
    danger: '',
    overlay: 'hover:text-primary hover:bg-white',
    barebone: '',
    inherit: '',
    brown: '',
    'green-dark': '',
    pink: '',
    black: '',
    neutral: '',
    yellow: '',
  },
  active: {
    primary: '',
    secondary: '',
    live: '',
    ecology:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-ecology',
    society:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-society',
    economy:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-economy',
    mobility:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-mobility',
    inverse:
      '[.active_&]:text-primary [.active_&]:border-white [.active_&]:bg-white',
    danger: '',
    overlay: '',
    barebone: '',
    inherit: '',
    brown:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-brown',
    'green-dark':
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-green-dark',
    pink: '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-pink',
    black:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-black',
    neutral:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-neutral-500',
    yellow:
      '[.active_&]:text-white [.active_&]:stroke-white [.active_&]:bg-yellow',
  },
} as const

export type ButtonVariant = keyof typeof ButtonVariants.variant
export type ButtonSize = keyof typeof ButtonVariants.size

export const ButtonDefaultVariants: {
  variant: ButtonVariant
  size: ButtonSize
} = {
  variant: 'primary',
  size: 'md',
}
