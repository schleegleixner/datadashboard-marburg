'use client'

import React from 'react'
import Background from '@/components/Layout/Background'
import Container from '@/components/Layout/Container'
import LinkComponent from '@/components/Layout/Navbar/LinkComponent'
import { cx } from 'class-variance-authority'
import { ActionFieldsIconMap } from '@/types/dimensionMapping'
import { useEffect, useState } from 'react'
import { BackgroundVariant } from '@/utils/variants/BackgroundVariants'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Spinner from '@/components/Elements/Spinner'

function getFieldIcon(field: string) {
  return (
    ActionFieldsIconMap[field as keyof typeof ActionFieldsIconMap] || undefined
  )
}

interface ExtendedLinkProps {
  active?: boolean
  field: string
  slug: string
  link: string
  title: string
}

export default function DimensionFilter({
  sitemap,
  current_page_data,
  onChange,
}: {
  sitemap: PageMappingType[]
  current_page_data: PageMappingType
  onChange: (page_slug: string | null) => void
}) {
  const [fieldPages, setFieldPages] = useState<PageMappingType[] | null>(null)
  const [fieldLinks, setFieldLinks] = useState<ExtendedLinkProps[] | null>(
    null,
  )

  useEffect(() => {
    if (!current_page_data || !sitemap) {
      return
    }

    const action_dimension = current_page_data.content.action_dimension

    // filter the sitemap, only allow pages that have the content.filter.sdg_target set
    const filtered = sitemap.filter(
      page => page.content.action_dimension === action_dimension && page.content.action_field,
    )
    setFieldPages(filtered)
  }, [sitemap])

  useEffect(() => {
    if (fieldPages) {
      const links = fieldPages.map((page, index) => {
        const active = page.slug === current_page_data.slug

        return {
          index: index,
          slug: page.slug,
          link: active ? `${page.parent.full_url}` : `${page.full_url}`,
          title: page.title,
          active: active,
          field: page.content.action_field,
        }
      })
      setFieldLinks(links)
    }
  }, [fieldPages, current_page_data.slug])

  if (!fieldLinks) {
    return <Spinner className="mx-auto" />
  }

  return (
    <>
      {fieldLinks.length > 0 && (
        <Background
          light
          variant={
            current_page_data.content.action_dimension as BackgroundVariant
          }
        >
          <Container variant="compact">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex w-full flex-col gap-x-8 gap-y-2 md:flex-row">
                {fieldLinks.map(l => (
                  <LinkComponent
                    icon={getFieldIcon(l.field as string)}
                    IconClass={'h-6 md:h-8'}
                    key={l.title}
                    link={l.link}
                    LinkClass={cx(
                      'flex-grow self-stretch',
                      l.active && 'active',
                    )}
                    onClick={() => onChange(l.active ? null : l.slug)}
                    preventDefault
                    size={'filter_fields'}
                    title={l.title}
                    variant={current_page_data.content.action_dimension}
                    whiteBackground={true}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Background>
      )}
    </>
  )
}
