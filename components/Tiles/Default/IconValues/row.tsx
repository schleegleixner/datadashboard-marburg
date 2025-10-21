'use client'

import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'
import IconFactory from '@/utils/factories/IconFactory'
import { RowDataType } from '@/utils/sources'
import { ActionDimensionsType } from '@/types/dimensionMapping'
import Divider from '@/components/Elements/Divider'

interface RowType {
  data: RowDataType
  variant?: ActionDimensionsType
  single?: boolean
}

export default function Row({ data, single = false, variant }: RowType) {
  return (
    <div>
      <div className="flex items-center gap-4">
        {data.icon && (
          <div className="aspect-square w-16 min-w-16 py-2">
            <IconFactory
              className={'h-full w-full object-contain'}
              type={data.icon}
              variant={variant}
            />
          </div>
        )}
        <Text as={'h4'} variant={variant}>
          <span>{data.label}:</span> {single && <br />}
          <AnimatedNumber
            className={
              single
                ? 'sm:text-xl block pt-1 text-lg md:text-2xl'
                : 'inline-block min-w-32'
            }
            decimals={data.decimals}
            previous_value={data.previous}
            unit={data.unit}
          >
            {data.current}
          </AnimatedNumber>{' '}
        </Text>
      </div>
      {data.divider && <Divider className="-mb-2" slim variant={variant} />}
    </div>
  )
}
