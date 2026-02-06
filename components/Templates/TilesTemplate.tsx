'use client'

import React, { JSX, useState } from 'react'
import Container from '@/components/Layout/Container'
import PageIntro from '@/components/Elements/PageIntro'
import TileCollectionView from '@/components/Views/TileCollectionView'
import DimensionFilter from '@/components/Layout/DimensionFilter'
import { scrollToElement } from '@/utils/scroll'
import {
  findPageByIdOrSlug,
  PageMappingType,
  useTileset,
} from '@schleegleixner/react-statamic-api'

import RequestIndicator from '@/components/Elements/RequestIndicator'

export default function TilesTemplate({
  sitemap,
  page_data,
}: {
  sitemap: PageMappingType[]
  page_data: PageMappingType
}): JSX.Element {
  const [current_page_data, setCurrentPageData] =
    useState<PageMappingType>(page_data)
  const { collection, is_loading, has_error } = useTileset(
    current_page_data?.site_id,
  )

  function setNewPage(page_slug: string | null) {
    const new_page_data = findPageByIdOrSlug(
      sitemap,
      page_slug ?? current_page_data.parent?.slug ?? current_page_data.slug,
    )
    if (new_page_data) {
      window.history.pushState(null, '', new_page_data.full_url)
      setCurrentPageData(new_page_data)
    }
    if (page_slug) {
      scrollToElement()
    }
  }

  if (is_loading) {
    return (
      <Container>
        <RequestIndicator failed={has_error} timeoutMs={10000} />
      </Container>
    )
  }

  return (
    <>
      <PageIntro
        container
        content={current_page_data.content.copy}
        headline={current_page_data.content.headline}
      />
      <DimensionFilter
        current_page_data={current_page_data}
        onChange={setNewPage}
        sitemap={sitemap}
      />
      <Container>
        <TileCollectionView
          collection={collection}
          page_data={current_page_data}
          sitemap={sitemap}
        />
      </Container>
    </>
  )
}
