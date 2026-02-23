import { XMarkIcon } from '@heroicons/react/24/outline'
import { ComponentPropsWithRef } from 'react'
import { animated, AnimatedProps } from '@react-spring/web'
import { cva, VariantProps } from 'class-variance-authority'
import {
  BackgroundDefaultVariants,
  BackgroundVariants,
} from '@/utils/variants/BackgroundVariants'

export const overlayStyle = cva(
  'absolute left-0 top-0 z-20 h-full w-full bg-opacity-90 backdrop-blur p-8 md:pb-4 md:p-12 flex flex-col-reverse md:flex-row',
  {
    variants: BackgroundVariants,
    defaultVariants: BackgroundDefaultVariants,
  },
)

type BaseOverlayProps = VariantProps<typeof overlayStyle> &
  AnimatedProps<ComponentPropsWithRef<'div'>> & {
    children: React.ReactNode | React.ReactNode[]
    onClose?: () => void
  }

export default function BaseOverlay({
  variant,
  children,
  onClose,
  ...props
}: BaseOverlayProps) {
  return (
    <animated.div {...props} className={overlayStyle({ variant })}>
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden pr-4">
        {children}
      </div>
      <XMarkIcon
        className="h-12 cursor-pointer self-end text-white transition-all hover:text-secondary md:self-auto"
        onClick={onClose}
      />
    </animated.div>
  )
}
