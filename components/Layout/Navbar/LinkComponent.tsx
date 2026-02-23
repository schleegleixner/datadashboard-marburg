import { Button } from '@/components/Elements/Button'
import { MouseEvent } from 'react'
import { ButtonSize, ButtonVariant } from '@/utils/variants/ButtonVariants'
import { cx } from 'class-variance-authority'
import ProxyLink from '@/components/Elements/ProxyLink'
import { trackEvent } from 'fathom-client'

export type LinkProps = {
  ariaLabel?: string
  title?: string
  icon?: React.ComponentType<any>
  link: string
  variant?: ButtonVariant
  hover?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  LinkClass?: string
  ButtonClass?: string
  IconClass?: string
  preventDefault?: boolean
  whiteBackground?: boolean
}

export default function LinkComponent({
  ariaLabel,
  title,
  link,
  icon,
  variant = 'primary',
  hover,
  size = 'link',
  onClick,
  LinkClass,
  ButtonClass,
  IconClass,
  preventDefault,
  whiteBackground = false,
}: LinkProps) {
  const Icon = icon

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(`Link clicked: ${title || link}`)

    if (onClick) {
      onClick()

      if (preventDefault) {
        event.preventDefault()
      }
    }
  }

  return (
    <ProxyLink
      aria-label={ariaLabel || title || link}
      className={cx(LinkClass, 'my-1')}
      href={link}
      onClick={handleClick}
    >
      <Button
        className={ButtonClass}
        hover={hover ?? variant}
        size={size}
        startIcon={
          Icon ? <Icon className={cx(IconClass, 'transition-colors')} /> : null
        }
        variant={variant}
        whiteBackground={whiteBackground}
      >
        {title}
      </Button>
    </ProxyLink>
  )
}
