'use client'

import React, { JSX } from 'react'
import Spinner from '@/components/Elements/Spinner'
import Container from '@/components/Layout/Container'
import Markdown from '@/components/Elements/Markdown'
import { PageMappingType } from '@schleegleixner/react-statamic-api'
import Title from '../Elements/Title'

export default function ContentTemplate({ page_data }: { page_data: PageMappingType }): JSX.Element {
  if (!page_data) {
    return (
      <Container>
        <Spinner className="mx-auto" />
      </Container>
    )
  }

  return (
    <Container>
      <main className="mx-auto max-w-[1136px]">
        <Title as="h1">
          {page_data.content.headline}
        </Title>
        <Markdown content={page_data.content.content} />
      </main>
    </Container>
  )
}
