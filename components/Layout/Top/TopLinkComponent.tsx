import ProxyLink from '@/components/Elements/ProxyLink'
import { MouseEvent } from 'react'
import { cx } from 'class-variance-authority'

export type LinkProps = {
  title?: string
  icon?: React.ComponentType<any>
  link?: string
  onClick?: () => void
  active?: boolean
}

export default function TopLinkComponent({
  title,
  link,
  icon,
  onClick,
  active = false,
}: LinkProps) {
  const Icon = icon

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <ProxyLink
      aria-label={title}
      className={cx(
        'group flex flex-col items-center stroke-primary fill-primary text-lg font-medium text-primary hover:stroke-secondary hover:text-secondary hover:fill-secondary transition-all',
        { 'text-secondary': active },
      )}
      href={link ?? ''}
      onClick={handleClick}
    >
      {Icon && <Icon className="mr-2 inline w-8 xs:w-6 h-8 xs:h-6" />}
      <div className="hidden xs:block text-sm xl:text-lg">{title}</div>
    </ProxyLink>
  )
}
