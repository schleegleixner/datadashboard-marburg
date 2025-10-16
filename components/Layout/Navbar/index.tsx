'use client'

import BaseNavbar from './BaseNavbar'
import React from 'react'
import { useBreadcrumbs } from '@/utils/breadcrumbs'
import { setPageTitle } from '@/utils/content'
import { getUriSegment } from '@/utils/uri'

export default function Navbar({ page_title }: { page_title: string }) {
  const breadcrumbs = useBreadcrumbs()
  const current_page_title = breadcrumbs[breadcrumbs.length - 1].title ?? page_title;
  // ToDo: add tile title if available (share)

  // split the URL into segments and filter out empty strings
  setPageTitle(current_page_title)

  return (
    <BaseNavbar current_url={getUriSegment() ?? ''} page_title={current_page_title}  />
  )
}
