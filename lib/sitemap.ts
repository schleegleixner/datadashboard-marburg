export type PageMappingType = {
  id: string
  title: string
  slug: string
  is_dimension?: boolean
  children?: PageMappingType[]
}

export const sitemap: PageMappingType[] = [
  { id: 'home', title: 'Marburg in Zahlen', slug: '' },
  {
    id: 'ecology',
    is_dimension: true,
    title: 'Umwelt und Klima',
    slug: 'umwelt-und-klima',
    children: [
      {
        id: 'wetter-und-klima',
        title: 'Wetter und Klima',
        slug: 'wetter-und-klima',
      },
      {
        id: 'energie-und-ressourcen',
        title: 'Energie und Ressourcen',
        slug: 'energie-und-ressourcen',
      },
    ],
  },
  {
    id: 'society',
    is_dimension: true,
    title: 'Leben in Marburg',
    slug: 'leben-in-marburg',
    children: [
      {
        id: 'leben-und-wohnen',
        title: 'Leben und Wohnen',
        slug: 'leben-und-wohnen',
      },
      {
        id: 'bildung-und-teilhabe',
        title: 'Bildung und Teilhabe',
        slug: 'bildung-und-teilhabe',
      },
      {
        id: 'sicherheit-und-ordnung',
        title: 'Sicherheit und Ordnung',
        slug: 'sicherheit-und-ordnung',
      },
    ],
  },
  {
    id: 'economy',
    is_dimension: true,
    title: 'Wirtschaft und Arbeit',
    slug: 'wirtschaft-und-arbeit',
    children: [
      {
        id: 'lokale-wirtschaft',
        title: 'Lokale Wirtschaft',
        slug: 'lokale-wirtschaft',
      },
      {
        id: 'arbeit',
        title: 'Arbeit',
        slug: 'arbeit',
      },
    ],
  },
  {
    id: 'mobility',
    is_dimension: true,
    title: 'Mobilität und Verkehr',
    slug: 'mobilitaet-und-verkehr',
    children: [
      {
        id: 'individualverkehr',
        title: 'Individualverkehr',
        slug: 'individualverkehr',
      },
      {
        id: 'oepnv',
        title: 'ÖPNV',
        slug: 'oepnv',
      },
    ],
  },
  { id: 'live', title: 'Marburg Live', slug: 'live' },
  { id: 'search', title: 'Suche', slug: 'suche' },
  { id: 'imprint', title: 'Impressum', slug: 'impressum' },
  { id: 'privacy', title: 'Datenschutzerklärung', slug: 'datenschutz' },
  { id: 'adapt', title: 'Dashboard Adaptieren', slug: 'adaptieren' },
  { id: 'barrierefreiheitserklaerung', title: 'Barrierefreiheitserklärung', slug: 'barrierefreiheitserklaerung' },
  { id: 'share', title: 'Teilen', slug: 'share' },
  { id: 'embed', title: 'Einbetten', slug: 'embed' },
]

export default async function getSitemap(): Promise<PageMappingType[]> {
  // TODO (optional): fetch page titles from CMS
  return sitemap
}
