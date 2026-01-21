'use client'

import Link from 'next/link'
import { Button } from './Button'
import { scrollToTop } from '@/utils/scroll'

export default function ClientLink({
  link,
  label,
}: {
  link: string
  label: string
}) {
  const handleClick = () => {
    scrollToTop()
  }

  return (
    <Link href={link} onClick={handleClick}>
      <Button className="w-full" size="lg" variant="primary">
        {label}
      </Button>
    </Link>
  )
}
