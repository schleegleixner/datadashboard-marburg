import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'
import { TileSplitView } from '../../Base/TileSplitView'
import EnergyConsumptionContent from './EnergyConsumptionContent'
import { InputDataType } from './dt'
import { getSource } from '@/utils/payload'

export default function Tile({ type, tile_payload }: TileProps) {
  const waermeDataInput: InputDataType[] = getSource(
    tile_payload,
    'waerme.csv',
  )
  const stromDataInput: InputDataType[] = getSource(
    tile_payload,
    'strom.csv',
  )

  // render component with fetched data
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileSplitView>
        <TileSplitView.Left>
          <div className="mt-4">
            <EnergyConsumptionContent
              stromDataInput={stromDataInput}
              tile_payload={tile_payload}
              waermeDataInput={waermeDataInput}
            />
          </div>
        </TileSplitView.Left>
      </TileSplitView>
    </BaseTile>
  )
}
