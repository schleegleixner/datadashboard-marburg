import Text from '@/components/Elements/Title'
import { TileDataType, TileType } from '@/types/tiles'
import TileFactory from '@/utils/factories/TileFactory'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StadtLogo from '@/assets/logos/logo_marburg.svg'
import { getCompleteTileset } from '@/lib/content'
import Image from 'next/image'

export const revalidate = false

export default async function Embed(props: {
  params: Promise<{ id: TileType }>
}) {
  const params = await props.params
  const { id } = params

  const url = process.env.NEXT_PUBLIC_URL || ''
  const collection = await getCompleteTileset()
  const tile = collection.find(tile => tile.tile_id === id) as TileDataType

  if (!tile) {
    return notFound()
  }

  return (
    <div>
      <TileFactory tile_data={tile.content} type={tile.tile_id} />

      <div className="mt-4 flex h-full w-full flex-col justify-end gap-4 md:flex-row md:items-center">
        <Image
          alt="Logo der Stadt Marburg"
          className="h-10 w-fit"
          src={StadtLogo}
        />
        <Text as="h7" className="leading-normal" variant={'primary'}>
          Mehr Marburg in Zahlen gibt es unter{' '}
          <Link className="underline" href={`${url}`} target="_blank">
            {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </Link>
        </Text>
      </div>
    </div>
  )
}
