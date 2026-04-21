'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import Text from '../Elements/Text'
import { ActionDimensionsDefaultType, ActionDimensionsType } from '@/types/dimensionMapping'
import { useContentWidth } from '@schleegleixner/react-statamic-api'

const rootStyle = cva(
  'overflow-hidden flex h-fit w-full overflow-hidden border-2 bg-white',
  {
    variants: {
      variant: {
        ecology: 'border-ecology',
        society: 'border-society',
        economy: 'border-economy',
        mobility: 'border-mobility',
      },
      layout: {
        horizontal: 'rounded-full flex-row',
        vertical: 'rounded-xl flex-col mb-6',
      },
    },

    defaultVariants: { variant: ActionDimensionsDefaultType, layout: 'horizontal' },
  },
)

const backgroundStyle = cva(
  'flex-1 px-4 md:px-8 md:py-2 transition-all duration-300 text-center',
  {
    variants: {
      variant: {
        ecology: '',
        economy: '',
        society: '',
        mobility: '',
      },
      showDivider: {
        true: 'border-r-2',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'ecology', showDivider: true, class: 'border-r-ecology' },
      { variant: 'society', showDivider: true, class: 'border-r-society' },
      { variant: 'economy', showDivider: true, class: 'border-r-economy' },
      { variant: 'mobility', showDivider: true, class: 'border-r-mobility' },
    ],
    defaultVariants: { variant: ActionDimensionsDefaultType, showDivider: false },
  },
)

const itemStyle = cva('transition-all duration-300 min-w-0', {
  variants: {
    variant: {
      ecology: 'bg-ecology',
      society: 'bg-society',
      economy: 'bg-economy',
      mobility: 'bg-mobility',
    },
    selected: {
      true: 'bg-opacity-100 text-white',
      false: 'bg-opacity-0',
    },
    layout: {
      horizontal: 'px-4 py-2',
      vertical: 'px-2 py-1',
    },
  },
  compoundVariants: [
    { variant: 'ecology', selected: false, class: 'text-ecology' },
    { variant: 'society', selected: false, class: 'text-society' },
    { variant: 'economy', selected: false, class: 'text-economy' },
    { variant: 'mobility', selected: false, class: 'text-mobility' },
  ],
  defaultVariants: {
    variant: ActionDimensionsDefaultType,
    selected: false,
    layout: 'horizontal',
  },
})

type ToggleValue = string | number

interface ToggleItem<T extends ToggleValue> {
  element: React.ReactNode
  value: T
}

interface ToggleGroupProps<T extends ToggleValue = string> {
  label: string
  defaultValue?: T
  items: ToggleItem<T>[]
  onChange?: (_value: T) => void
  variant?: ActionDimensionsType
}

export default function ToggleGroup<T extends ToggleValue>({
  label,
  defaultValue,
  items,
  variant = 'ecology',
  onChange,
}: ToggleGroupProps<T>) {
  const { elRef: el_ref, contentWidth: content_width } = useContentWidth<HTMLDivElement>()
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const toString = (v: T) => v.toString()
  const toOriginal = (v: string): T =>
    (typeof items[0].value === 'number' ? +v : v) as T

  useEffect(() => {
    setLayout(content_width < items.length * 180 ? 'vertical' : 'horizontal')
  }, [content_width, items.length])

  const [value, setValue] = useState<string>(
    defaultValue !== undefined
      ? toString(defaultValue)
      : toString(items[0].value),
  )

  return (
    <ToggleGroupPrimitive.Root
      aria-label={label}
      className={rootStyle({ variant, layout })}
      onValueChange={val => {
        if (!val) {
          return
        }
        setValue(val)
        onChange?.(toOriginal(val))
      }}
      ref={el_ref}
      type="single"
      value={value}
    >
      {items.map((item, idx) => {
        const valString = toString(item.value)
        const selected = valString === value

        return (
          <ToggleGroupPrimitive.Item
            className={cx(
              backgroundStyle({
                variant,
                showDivider:
                  idx !== items.length - 1 && layout === 'horizontal',
              }),
              itemStyle({ variant, selected, layout }),
            )}
            key={idx}
            value={valString}
          >
            {typeof item.element === 'string' ? (
              <Text
                className="w-full overflow-hidden text-ellipsis"
                style={{ hyphens: 'unset' }}
                tag="span"
              >
                {item.element}
              </Text>
            ) : (
              item.element
            )}
          </ToggleGroupPrimitive.Item>
        )
      })}
    </ToggleGroupPrimitive.Root>
  )
}
