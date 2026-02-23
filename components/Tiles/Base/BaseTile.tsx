'use client'

import { cva, cx, VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import { useTransition } from '@react-spring/web'
import EmbedOverlay from './EmbedOverlay'
import ShareOverlay from './ShareOverlay'
import MoreInfoOverlay from './MoreInfoOverlay'
import TileFooter from './TileFooter'
import { TileType } from '@schleegleixner/react-statamic-api'
import { BorderDefaultVariants, BorderVariants } from '@/utils/variants/BorderVariants'
import Markdown from '@/components/Elements/Markdown'

const baseTileStyle = cva(
  'relative flex flex-col md:flex-row h-fit overflow-hidden rounded-br-xl bg-white border-2',
  {
    variants: BorderVariants,
    defaultVariants: BorderDefaultVariants,
  },
)

export type ImageProps =
  | { startImage: React.ReactElement<any>; endImage?: never }
  | { endImage: React.ReactElement<any>; startImage?: never }
  | { endImage?: undefined; startImage?: undefined }

export type EmbedTileProps = { embedId?: TileType }

export type BaseTileProps = VariantProps<typeof baseTileStyle> &
  EmbedTileProps &
  ImageProps & {
    children: React.ReactElement<any> | React.ReactElement<any>[]
    className?: string
    footerCenterElement?: React.ReactElement<any>
    moreInfo?: React.ReactNode
    isFullWidth?: boolean
    dataUrl?: string
    title?: string
  }

const transitionOpts = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

/**
 * A basic configruable tile
 * @param BaseTileProps basic properties of the tile
 * @returns BaseTile
 */
export function BaseTile({
  children,
  variant,
  className = '',
  startImage,
  endImage,
  footerCenterElement,
  embedId,
  moreInfo,
  isFullWidth,
  dataUrl,
  title = '',
}: BaseTileProps) {
  const [showEmbedOverlay, setShowEmbedOverlay] = useState(false)
  const [showShareOverlay, setShowShareOverlay] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const embedTransitions = useTransition(showEmbedOverlay, transitionOpts)
  const shareTransitions = useTransition(showShareOverlay, transitionOpts)

  const moreInfoTransitions = useTransition(showMoreInfo, transitionOpts)

  const openShareDialog = async () => {
    if (navigator && navigator.share) {
      try {
        await navigator.share({
          title: 'Marburg in Zahlen',
          url: `${window.location.origin}/share/${embedId}`,
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Could not share', e)
      } finally {
        return
      }
    }

    setShowShareOverlay(true)
  }

  return (
    <div className="pb-4 md:pb-8">
      <div className={cx(baseTileStyle({ variant }), className)}>
        {startImage}
        <div className="z-0 flex w-full flex-col justify-between px-6 py-4 xs:p-8 md:p-12 lg:px-8 lg:py-6 xl:px-12 xl:py-10">
          <div>{children}</div>
          <TileFooter
            dataURL={dataUrl ?? null}
            hasMoreDetails={!!moreInfo}
            onEmbedClick={() => setShowEmbedOverlay(true)}
            onMoreInfoClick={() => setShowMoreInfo(true)}
            onShareClick={openShareDialog}
            title={title}
            variant={variant === 'primary' ? 'inverse' : 'primary'}
          >
            {footerCenterElement}
          </TileFooter>
        </div>
        {endImage}
        {embedId &&
          embedTransitions(
            (styles, render) =>
              render && (
                <EmbedOverlay
                  embedId={embedId}
                  onClose={() => setShowEmbedOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {embedId &&
          shareTransitions(
            (styles, render) =>
              render && (
                <ShareOverlay
                  embedId={embedId}
                  onClose={() => setShowShareOverlay(false)}
                  style={styles}
                />
              ),
          )}
        {moreInfoTransitions(
          (styles, render) =>
            render && (
              <MoreInfoOverlay
                isFullWidth={isFullWidth}
                onClose={() => setShowMoreInfo(false)}
                style={styles}
                variant={variant}
              >
                {typeof moreInfo === 'string' ? (
                  <Markdown content={moreInfo} />
                ) : (
                  <div>{moreInfo}</div>
                )}
              </MoreInfoOverlay>
            ),
        )}
      </div>
    </div>
  )
}
