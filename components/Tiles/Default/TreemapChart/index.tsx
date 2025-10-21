import { TileProps } from '@/types/tiles'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './TreemapChartContent'
import SourceSelector from '@/components/Tiles/Base/TileSourceSelector'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <SourceSelector tile_payload={tile_payload}>
        {(payload, ds, variant) => (
          <Content datasource={ds} tile_payload={payload} variant={variant} />
        )}
      </SourceSelector>
    </IconTile>
  )
}
