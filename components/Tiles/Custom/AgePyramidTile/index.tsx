import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './AgePyramidContent'
import SourceSelector from '@/components/Tiles/Base/TileSourceSelector'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile dataSource={false} embedId={type} tile_payload={tile_payload}>
      <SourceSelector tile_payload={tile_payload}>
        {(payload, ds) => <Content datasource={ds} tile_payload={payload} />}
      </SourceSelector>
    </IconTile>
  )
}
