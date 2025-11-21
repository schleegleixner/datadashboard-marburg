import Image from 'next/image'
import StadtLogo from '@/assets/logos/logo_marburg_invertiert.svg'

export default function CityLogoInverted() {
  return (
    <Image
      alt="Logo der Stadt Marburg"
      className="pointer-events-none h-20 w-auto"
      src={StadtLogo}
    />
  )
}
