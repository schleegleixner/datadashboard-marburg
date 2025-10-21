import * as SwitchPrimitive from '@radix-ui/react-switch'
import { useState } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Text from '../Elements/Text'
import {
  SwitchDefaultVariants,
  SwitchVariants,
} from '@/utils/variants/SwitchVariants'
import {
  BorderDefaultVariants,
  BorderVariants,
} from '@/utils/variants/BorderVariants'

const switchThumbStyle = cva(
  'flex h-3 w-3 md:h-5 md:w-5 items-center justify-center rounded-full transition-all',
  {
    variants: SwitchVariants,
    defaultVariants: SwitchDefaultVariants,
  },
)

const switchThumbInnerStyle = cva(
  'h-[10px] w-[10px] md:h-4 md:w-4 rounded-full bg-white transition-opacity',
  {
    variants: {
      checked: {
        false: 'opacity-100',
        true: 'opacity-0',
      },
    },
  },
)

const switchBorderStyle = cva(
  'w-[2.25rem] md:w-[3.25rem] p-1 rounded-full bg-white border-[1px] md:border-2 shadow-inner',
  {
    variants: BorderVariants,
    defaultVariants: BorderDefaultVariants,
  },
)

type SwitchProps = SwitchPrimitive.SwitchProps &
  VariantProps<typeof switchBorderStyle> & {
    aria_label?: string
    label?: string
  }

export default function Switch({ aria_label, label, variant, ...props }: SwitchProps) {
  const [checked, setChecked] = useState(props.defaultChecked)

  return (
    <div className="flex items-center space-x-4">
      <SwitchPrimitive.Root
        aria-label={(label ?? aria_label ?? 'Datenpunkt') + (checked ? ' aktiviert' : ' deaktiviert')}
        className={switchBorderStyle({ variant })}
        {...props}
        onCheckedChange={val => {
          if (props.onCheckedChange) {
            props.onCheckedChange(val)
          }
          setChecked(val)
        }}
      >
        <SwitchPrimitive.Thumb asChild>
          <div className={switchThumbStyle({ variant, checked })}>
            <div className={switchThumbInnerStyle({ checked })} />
          </div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && (
        <Text as={'h5'} variant={'primary'}>
          {label}
        </Text>
      )}
    </div>
  )
}
