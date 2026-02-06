'use client'

import Link from 'next/link'
import Background from '../Background'
import Container from '../Container'
import Logo from './CityLogoInverted'
import { getGlobal } from '@schleegleixner/react-statamic-api'
import { useEffect, useState } from 'react'
import FooterColumn from './FooterColumn'

type FooterContent = {
  [key: string]: any
}

export default function Footer({ site_id }: { site_id: string }) {
  const [content, setContent] = useState<FooterContent>({})

  useEffect(() => {
    getGlobal('footer', site_id).then(result => {
      if (result) {
        setContent(result)
      }
    })
  }, [])

  return (
    <Background className="border-t-8 border-secondary leading-4">
      <Container>
        <footer className="flex flex-col gap-12 md:flex-row md:gap-20 max-md:my-8">
          <FooterColumn
            copy={content?.city_copy}
            link_list={content?.city_links}
          >
            <Link
              aria-label="Universitätsstadt Marburg"
              href="https://www.marburg.de"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Logo />
            </Link>
          </FooterColumn>

          <div className="flex flex-col gap-8">
            <FooterColumn
              copy={content?.dept_copy}
              headline={content?.dept_headline}
              link_list={content?.dept_links}
            />
          </div>

          <div className="flex flex-col gap-8">
            <FooterColumn
              copy={content?.legal_copy}
              headline={content?.legal_headline}
              link_list={content?.legal_links}
            />
          </div>
        </footer>
      </Container>
    </Background>
  )
}
