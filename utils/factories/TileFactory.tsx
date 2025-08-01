'use client'

import { TilePayloadType, TileType } from '@/types/tiles'

// import default tiles
import IconValues from '@/components/Tiles/Default/IconValues'
import LineChart from '@/components/Tiles/Default/LineChart'
import TreemapChart from '@/components/Tiles/Default/TreemapChart'
import IconText from '@/components/Tiles/Default/IconText'
import CompareIconValues from '@/components/Tiles/Default/CompareIconValues'
import CompareValues from '@/components/Tiles/Default/CompareValues'
import Basic from '@/components/Tiles/Default/BasicTile'
import FallbackTile from '@/components/Tiles/Default/FallbackTile'
import PieChart from '@/components/Tiles/Default/PieChart'

// ecology
import EnergyConsumptionTile from '@/components/Tiles/Ecology/EnergyConsumptionTile'
import WeatherTile from '@/components/Tiles/Ecology/WeatherTile'
import UVTile from '@/components/Tiles/Ecology/UVTile'
import ClimateDevelopmentTile from '@/components/Tiles/Ecology/ClimateDevelopmentTile'
import ClimateIndicesTile from '@/components/Tiles/Ecology/ClimateIndicesTile'
import StadtradelnTile from '@/components/Tiles/Ecology/StadtradelnTile'
import PassengerTile from '@/components/Tiles/Ecology/PassengerTile'
import AirqualityTile from '@/components/Tiles/Ecology/AirqualityTile'
import PollenTile from '@/components/Tiles/Ecology/PollenTile'
import ThermalHazardTile from '@/components/Tiles/Ecology/ThermalHazardTile'
import Co2EmissionsTile from '@/components/Tiles/Ecology/Co2EmissionsTile'
import DriveTypes from '@/components/Tiles/Ecology/DriveTypes'

// society
// ...

// economy
// ...

interface TileFactoryProps {
  type: TileType
  tile_data: TilePayloadType | undefined
}

// Mapping der Tile-Komponenten
const tileMap: Record<
  TileType,
  React.FC<{ type: TileType; tile_payload: TilePayloadType }>
> = {
  // ---- DEFAULT ----
  icontext: IconText,
  compareiconvalues: CompareIconValues,
  comparevalues: CompareValues,
  iconvalues: IconValues,
  linechart: LineChart,
  treemapchart: TreemapChart,
  basic: Basic,
  piechart: PieChart,
  co2emissions: Co2EmissionsTile,

  // ---- ECOLOGY ----
  weather: WeatherTile,
  energyconsumption: EnergyConsumptionTile,
  uv: UVTile,
  climatedevelopment: ClimateDevelopmentTile,
  climateindices: ClimateIndicesTile,
  stadtradeln: StadtradelnTile,
  passenger: PassengerTile,
  airquality: AirqualityTile,
  pollen: PollenTile,
  thermalhazard: ThermalHazardTile,
  drivetypes: DriveTypes,

  // ---- SOCIETY ----

  // ---- ECONOMY ----
}

export default function TileFactory({ type, tile_data }: TileFactoryProps) {
  if (!tile_data) {
    return <div className="text-secondary">Could not fetch tile data for tile: {type}. Please contact an administrator.</div>
  }

  // get tile component by tile id (type), tile_data.tile_type or use fallback
  const Tile =
    tileMap[type] ||
    (tile_data?.tile_type ? tileMap[tile_data.tile_type] : undefined) ||
    FallbackTile
  return <Tile tile_payload={tile_data} type={type} />
}
