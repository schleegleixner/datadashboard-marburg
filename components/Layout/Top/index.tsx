'use client'

import { useState } from 'react'
import Container from '../Container'
import CityLogo from './CityLogo'
import {
  GlobeEuropeAfricaIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import TopLinkComponent from './TopLinkComponent'
import { getUriSegment } from '@/utils/uri'
import ProxyLink from '@/components/Elements/ProxyLink'
import LanguageOverlay from '@/components/Layout/LanguageOverlay'
import { isTranslatedProxy } from '@/utils/translate'

export default function Top() {
  const [show_overlay, setShowOverlay] = useState(false)
  const is_translated_proxy = isTranslatedProxy()

  return (
    <div className="z-100 w-full">
      <Container
        className="flex items-center justify-between gap-8 py-6"
        variant="flat"
      >
        <ProxyLink className="flex lg:flex-1" href="/">
          <div className="flex w-full items-center gap-4">
            <CityLogo />
            <div className="leading-tighter flex-grow pl-4 pt-0.5 text-center text-2xl font-bold text-primary max-lg:hidden md:text-3xl">
              <div>Marburg in Zahlen</div>
            </div>
          </div>
        </ProxyLink>

        <div className="flex gap-8">
          <TopLinkComponent
            active={getUriSegment() === 'suche'}
            icon={MagnifyingGlassIcon}
            link="/suche"
            title="Suche"
          />
          {!is_translated_proxy && (
            <TopLinkComponent
              icon={GlobeEuropeAfricaIcon}
              onClick={() => setShowOverlay(true)}
              title="Übersetzen"
            />
          )}
        </div>
      </Container>

      {show_overlay && (
        <LanguageOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  )
}
