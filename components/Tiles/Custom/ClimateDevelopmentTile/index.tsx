import { TileProps } from '@schleegleixner/react-statamic-api'
import IconTile from '@/components/Tiles/Base/IconTile'
import RadarChart from './RadarChart'
import LongTermAverageDiff from './LongTermAverageDiff'
import Text from '@/components/Elements/Text'
import Divider from '@/components/Elements/Divider'
import { getStrings } from '@schleegleixner/react-statamic-api'

export default function Tile({ type, tile_payload }: TileProps) {
  const strings = getStrings(tile_payload, {
    long_term_average_diff_text:
      'In den letzten 30 Tagen war es in Marburg im Durchschnitt [DIFFERENCE] – im Vergleich zum langjährigen Mittel (1961-1990).',
    long_term_average_diff_duration: '30',
  })

  return (
    <IconTile
      embedId={type}
      subtitle={
        <LongTermAverageDiff
          duration={Number(strings.long_term_average_diff_duration) ?? 30}
          text={strings.long_term_average_diff_text}
        />
      }
      tile_payload={tile_payload}
    >
      <Divider />

      <div>
        {tile_payload?.subtitle && (
          <>
            <Text>{tile_payload?.subtitle}</Text>
          </>
        )}
      </div>

      <div className="h-[316px] w-full md:h-[528px]">
        <div className="h-full w-full">
          <RadarChart />
        </div>
      </div>
    </IconTile>
  )
}
