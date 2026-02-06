import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent, { LinkProps } from './LinkComponent'
import PulsatingCircle from '@/components/Icons/PulsatingCircle'
import { cx } from 'class-variance-authority'
import { scrollToTop } from '@/utils/scroll'
import { HomeIcon } from '@heroicons/react/24/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Collapsible from '@/components/Elements/Collapsible'
import Link from 'next/link'
import { getGlobalString, PageMappingType } from '@schleegleixner/react-statamic-api'

type BaseNavbarProps = {
  children?: React.ReactNode
  current_url: string
  sitemap: PageMappingType[]
  page_title?: string
  variant?: 'primary' | 'secondary'
}

export default function BaseNavbar({
  current_url,
  page_title,
  sitemap,
  variant = 'primary',
}: BaseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [navLinks, setNavLinks] = useState<LinkProps[]>([])
  const [linksMeta, setLinksMeta] = useState<LinkProps[]>([])
  const navbarRef = useRef<HTMLDivElement | null>(null)

  // foreach link in sitemap, add the link to links_categories
  useEffect(() => {
    if (!sitemap || sitemap.length === 0) {
      return
    }

    const fetchLinks = async () => {
      const main_menu_links = sitemap
        .filter((page: any) => page.content.menu_position === 'main' || page.content.template === 'home')
        .map((page: any) => ({
          icon: page.content.template === 'home' ? HomeIcon : undefined,
          title: page.content.template === 'home' ? null : page.title,
          link: `${page.full_url}`,
          IconClass:
          'stroke-white fill-white h-4 group-hover:fill-primary group-hover:stroke-primary md:h-6 [.active_&]:fill-primary [.active_&]:stroke-primary',
        }))
      setNavLinks(main_menu_links)

      const meta_links = sitemap
        .filter((page: any) => page.content.menu_position === 'meta')
        .map((page: any) => ({
          icon: page.content.category === 'live' ? PulsatingCircle : undefined,
          title: page.title,
          link: `${page.full_url}`,
          IconClass:
            'stroke-secondary fill-secondary h-4 text-white group-hover:text-primary md:h-6 [.active_&]:text-primary',
        }))
      setLinksMeta(meta_links)
    }

    fetchLinks()
  }, [sitemap])

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const { top } = navbarRef.current.getBoundingClientRect()
        if (window?.scrollY === 0) {
          setIsSticky(false)
        } else if (top <= 0) {
          setIsSticky(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    scrollToTop()
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const button_variants: Partial<LinkProps> = {
    variant: 'inverse',
    size: 'main_menu',
  }

  const link_classes = 'flex flex-col items-center gap-4 xl:flex-row'
  const button_classes = 'max-xl:min-w-80 hyphens-auto '

  return (
    <nav
      aria-label="Hauptnavigation"
      className={`sticky top-0 z-50 ${isSticky ? 'is-sticky' : 'not-sticky'}`}
      id="navbar"
      ref={navbarRef}
    >
      <Background variant={variant}>
        <Container
          className={'py-4 transition-all [.is-sticky_&]:shadow-lg'}
          variant={'flat'}
        >
          <div className="flex flex-col justify-between gap-4 xl:hidden">
            <div className="flex items-center justify-between gap-8 text-lg font-bold text-white">
              {page_title || 'Marburg in Zahlen'}
              <Link
                className="flex cursor-pointer items-center gap-4 font-medium text-white"
                href={'#'}
                onClick={toggleMenu}
              >
                <div>{getGlobalString('menu')}</div>{' '}
                <div className="group overflow-hidden rounded-br-xl border border-white">
                  {isOpen ? (
                    <XMarkIcon className="stroke w-8 bg-white p-2 text-primary transition-all md:w-12" />
                  ) : (
                    <Bars3Icon className="stroke w-8 p-2 text-white transition-all group-hover:bg-white group-hover:text-primary md:w-12" />
                  )}
                </div>
              </Link>
            </div>
          </div>

          <Collapsible
            alwaysOpenAbove="xl"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <div
              className={cx(
                'flex flex-col flex-nowrap justify-between gap-4 max-xl:pt-4 max-md:items-center xl:flex-row xl:items-center xl:gap-8',
              )}
            >
              <div className={link_classes}>
                {navLinks.map(l => (
                  <LinkComponent
                    key={l.link}
                    {...button_variants}
                    {...l}
                    ButtonClass={button_classes}
                    LinkClass={
                      l.link.replace(/^\//, '') === current_url ? 'active' : ''
                    }
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
              <div className={link_classes}>
                {linksMeta.map(l => (
                  <LinkComponent
                    key={l.link}
                    {...button_variants}
                    {...l}
                    ButtonClass={button_classes}
                    LinkClass={
                      l.link.replace(/^\//, '') === current_url ? 'active' : ''
                    }
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
            </div>
          </Collapsible>
        </Container>
      </Background>
    </nav>
  )
}
