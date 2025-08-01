import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import Content from './Co2EmssionsTileContent'
import { TileSplitView } from '../../Base/TileSplitView'
import Markdown from '@/components/Elements/Markdown'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <Content tile_payload={tile_payload} />
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
    </BaseTile>
  )
}
