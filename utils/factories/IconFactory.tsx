import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'
import IconStadtkarte from '@/components/Icons/Stadtkarte'
import ReactIcons, { IconComponent } from '@schleegleixner/react-icons-package'

import {
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongRightIcon as ArrowRight,
} from '@heroicons/react/24/outline'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: TileVariantTypes
}

const iconMap: Record<string, IconComponent> = {
  stadtkarte: IconStadtkarte,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,

  // Fallback
  placeholder: Placeholder,
} as const

/**
 * The IconFactory is a helper function to create Icons dynamically.
 *
 * @param param IconFactoryProps
 * @returns Icon
 */
export default function IconFactory({
  className = '',
  variant = 'primary',
  type,
}: IconFactoryProps) {
  // extend iconMap with icons from @schleegleixner/react-icons-package
  Object.assign(iconMap, ReactIcons)

  if (!type || !iconMap[type]) {
    return <Placeholder />
  }

  const Icon = iconMap[type]
  return <Icon className={cx(IconStyle({ variant }), className)} />
}
