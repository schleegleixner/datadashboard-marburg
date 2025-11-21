import { TileProps } from '@/types/tiles'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './SunTimeTileContent'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile dataSource={false} embedId={type} tile_payload={tile_payload}>
        <Content />
    </IconTile>
  )
}
