import * as Icons from '@/components/Icons/ActionFields'

export type ActionDimensionsType = 'ecology' | 'economy' | 'society' | 'mobility'
export const ActionDimensionsDefaultType: ActionDimensionsType = 'ecology'

export type ActionFieldsType = string

export type FieldMappingType = {
  id: string
  slug: string
}

export type DimensionMappingType = {
  id: string
  fields: FieldMappingType[]
  slug: string
}

export const ActionFieldsIconMap = {
  arbeit: Icons.IconArbeit,
  'lokale-wirtschaft': Icons.IconArbeitUndWirtschaft,
  'energie-und-ressourcen': Icons.IconEnergie,
  'leben-und-wohnen': Icons.IconLebenUndWohnen,
  individualverkehr: Icons.IconMobilitaetUndInfrastruktur,
  oepnv: Icons.IconOepnv,
  'bildung-und-teilhabe': Icons.IconPartizipationUndTeilhabe,
  'umwelt-und-ressourcenschutz': Icons.IconUmweltUndRessourcenschutz,
  'wetter-und-klima': Icons.IconWetterUndKlima,
  'sicherheit-und-ordnung': Icons.IconSicherheitUndOrdnung,
}

export type TileVariantsType = DimensionMappingType & 'primary'
