import Image from 'next/image'
import StadtLogo from '@/assets/logos/logo_marburg.svg'

export default function CityLogo() {
  return (
    <Image
      alt="Logo der Stadt Marburg"
      className="pointer-events-none ml-auto h-10 md:h-16 w-auto"
      src={StadtLogo}
    />
  )
}
