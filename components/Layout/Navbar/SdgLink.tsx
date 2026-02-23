import Link from 'next/link'
import Image from 'next/image'

const image_map: Record<string, string> = {
  'keine-armut': require('@/assets/icons/SDG/SDG-icon-DE-01.jpg').default.src,
  'kein-hunger': require('@/assets/icons/SDG/SDG-icon-DE-02.jpg').default.src,
  'gesundheit-und-wohlergehen': require('@/assets/icons/SDG/SDG-icon-DE-03.jpg').default.src,
  'hochwertige-bildung': require('@/assets/icons/SDG/SDG-icon-DE-04.jpg').default.src,
  'geschlechtergerechtigkeit': require('@/assets/icons/SDG/SDG-icon-DE-05.jpg').default.src,
  'sauberes-wasser-und-sanitaereinrichtungen': require('@/assets/icons/SDG/SDG-icon-DE-06.jpg').default.src,
  'bezahlbare-und-saubere-energie': require('@/assets/icons/SDG/SDG-icon-DE-07.jpg').default.src,
  'menschenwuerdige-arbeit-und-wirtschaftswachstum': require('@/assets/icons/SDG/SDG-icon-DE-08.jpg').default.src,
  'industrie-innovation-und-infrastruktur': require('@/assets/icons/SDG/SDG-icon-DE-09.jpg').default.src,
  'weniger-ungleichheiten': require('@/assets/icons/SDG/SDG-icon-DE-10.jpg').default.src,
  'nachhaltige-staedte-und-gemeinden': require('@/assets/icons/SDG/SDG-icon-DE-11.jpg').default.src,
  'nachhaltiger-konsum-und-produktion': require('@/assets/icons/SDG/SDG-icon-DE-12.jpg').default.src,
  'massnahmen-zum-klimaschutz': require('@/assets/icons/SDG/SDG-icon-DE-13.jpg').default.src,
  'leben-unter-wasser': require('@/assets/icons/SDG/SDG-icon-DE-14.jpg').default.src,
  'leben-an-land': require('@/assets/icons/SDG/SDG-icon-DE-15.jpg').default.src,
  'frieden-gerechtigkeit-und-starke-institutionen': require('@/assets/icons/SDG/SDG-icon-DE-16.jpg').default.src,
  'partnerschaften-zur-erreichung-der-ziele': require('@/assets/icons/SDG/SDG-icon-DE-17.jpg').default.src,
}

export type SdgLinkProps = {
  link: string
  active: boolean
  onClick?: () => void
  target: string
  title: string
  slug: string
}

export default function SdgLink({
  link,
  active,
  onClick,
  target,
  title,
  slug
}: SdgLinkProps) {
  const image_src: string | null = image_map[target] ?? null
  const alt = `Nachhaltigkeitsziel ${title}`

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault() // prevent link navigation
      onClick()
    }
  }

  return (
    <Link
      className={active ? 'active' : '' + ' id-' + slug}
      href={link}
      onClick={handleClick} // attach the click handler
    >
      <div className="aspect-square w-32 border-4 border-white bg-white shadow transition-all hover:scale-110 [.active_&]:scale-110 [.active_&]:border-secondary">
        {image_src && (
        <Image
          alt={alt}
          className="aspect-square w-32"
          height={256}
          src={image_src}
          width={256}
        />
        )}
      </div>
    </Link>
  )
}
