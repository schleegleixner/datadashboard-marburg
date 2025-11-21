import { TileProps } from '@/types/tiles'
import IconTile from '@/components/Tiles/Base/IconTile'
import Content from './LineChartContent'
import { TileSplitView } from '../../Base/TileSplitView'
import Markdown from '@/components/Elements/Markdown'
import SourceSelector from '@/components/Tiles/Base/TileSourceSelector'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <IconTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <SourceSelector tile_payload={tile_payload}>
            {(payload, ds, variant) => (
              <Content
                datasource={ds}
                tile_payload={payload}
                variant={variant}
              />
            )}
          </SourceSelector>
        </TileSplitView.Left>
        {tile_payload?.legend && (
          <TileSplitView.Right>
            <Markdown
              content={tile_payload?.legend}
              tile_payload={tile_payload}
            />
          </TileSplitView.Right>
        )}
      </TileSplitView>
    </IconTile>
  )
}
