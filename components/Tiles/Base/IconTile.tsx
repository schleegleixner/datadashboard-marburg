import Spacer from '@/components/Elements/Spacer'
import Divider from '@/components/Elements/Divider'
import Title from '@/components/Elements/Title'
import { cva, cx } from 'class-variance-authority'
import { ForwardRefExoticComponent, JSX, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import Markdown from '@/components/Elements/Markdown'
import LiveBadge from './LiveBadge'
import { ActionFieldsIconMap } from '@/types/dimensionMapping'
import {
  TextDefaultVariants,
  TextVariants,
} from '@/utils/variants/TextVariants'
import { TilePayloadType } from '@schleegleixner/react-statamic-api'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { getVariantType } from '@/utils/payload'
import DynamicText from '@/components/Elements/DynamicText'
import { ActionDimensionsType } from '@/types/dimensionMapping'

const iconTileTitleStyle = cva('', {
  variants: TextVariants,
  defaultVariants: TextDefaultVariants,
})

export type DataSourceProps = {
  dataRetrieval?: string
}

export type IconTileProps = DataSourceProps &
  EmbedTileProps & {
    variant?: ActionDimensionsType
    children?: React.ReactElement<any> | React.ReactElement<any>[]
    title?: string | React.ReactElement<any>
    subtitle?: string | React.ReactElement<any>
    dataSource?: string | boolean
    icon?:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    live?: boolean | null
    tile_payload?: TilePayloadType
  }

function getDownloadUrl(
  datasources: TilePayloadType['datasources'] | undefined,
): string | undefined {
  if (datasources && datasources.length > 0) {
    // check if allow_download is true for any datasource
    const allowed = datasources.find((ds: (typeof datasources)[number]) => ds.allow_download && ds.file_name)
    if (allowed && allowed.file_name) {
      return `/download/${allowed.file_name}`
    }
  }
  return undefined
}

/**
 * A tile that has an icon on top right
 * @param IconTileProps properties of the Icon tile
 * @returns Mobility Tile
 */
export default function IconTile({
  children,
  live,
  title,
  subtitle,
  icon,
  variant,
  dataRetrieval,
  dataSource,
  embedId,
  tile_payload,
}: IconTileProps) {
  if (!tile_payload) {
    return <></>
  }

  // if live (live-tag) is not set, use tile_payload.live
  live = live ?? tile_payload?.live
  variant = variant ?? getVariantType(tile_payload)

  const Icon =
    icon ||
    ActionFieldsIconMap[
      tile_payload?.tags?.action_field as keyof typeof ActionFieldsIconMap
    ] ||
    (() => <></>)
  const full_width = tile_payload?.layout === 'full'

  return (
    <BaseTile
      dataUrl={getDownloadUrl(tile_payload.datasources ?? [])}
      embedId={embedId}
      footerCenterElement={
        live ? <LiveBadge variant={variant as BackgroundVariant} /> : undefined
      }
      isFullWidth={full_width}
      moreInfo={tile_payload?.details}
      title={(title as string) ?? (tile_payload?.title as string)}
      variant={variant}
    >
      <div className="mb-4 flex flex-col gap-2">
        <div className="relative flex items-stretch gap-4">
          <div className="flex flex-grow flex-wrap items-center justify-start gap-x-4">
            <Title
              as={'h2'}
              className={cx('mb-0 min-w-fit', iconTileTitleStyle({ variant }))}
              font={'normal'}
              margin={'none'}
            >
              {title ?? (
                <DynamicText tile_payload={tile_payload}>
                  {tile_payload?.title ?? ''}
                </DynamicText>
              )}
            </Title>
          </div>
          <div className="flex w-full max-w-12 items-start justify-center lg:max-w-16">
            <div className="width-full aspect-square overflow-hidden">
              {
                <Icon
                  className={cx(
                    'h-full w-full object-contain',
                    iconTileTitleStyle({ variant }),
                  )}
                />
              }
            </div>
          </div>
        </div>
        <Divider variant={variant} />
        <div>
          {typeof subtitle !== 'string' && subtitle
            ? subtitle
            : (subtitle || tile_payload?.subtitle) && (
                <Title as={'subtitle'} className="2xl:max-w-[85%]">
                  {subtitle ?? tile_payload?.subtitle}
                </Title>
              )}
        </div>
      </div>

      <>{children}</>
      <>{children && <Spacer />}</>

      {tile_payload?.copy && (
        <Markdown content={tile_payload.copy} />
      )}

      <>{tile_payload?.copy && <Spacer />}</>

      <div className="flex flex-col gap-x-8 gap-y-1 text-sm text-primary md:flex-row">
        <div className="">
          <span className="font-semibold">Datenstand:</span>{' '}
          {tile_payload?.retrieval ??
            dataRetrieval ??
            (live ? 'live' : new Date().getFullYear())}
        </div>
        {dataSource !== false && (
          <div className="text-sm">
            <span className="font-semibold">Quelle:</span>{' '}
            {tile_payload?.source ?? dataSource ?? 'Stadt Marburg'}
          </div>
        )}
      </div>
    </BaseTile>
  )
}
