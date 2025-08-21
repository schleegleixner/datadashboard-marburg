'use client'

import Title from '@/components/Elements/Title'
import Text from '@/components/Elements/Text'

export default function NoResults() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-br-xl border-2 border-secondary p-8 text-center bg-secondary-light">
      <Title as="h2" variant="secondary">
        Keine Ergebnisse gefunden
      </Title>
      <Text as="md">
        <p>
          Es wurden keine Inhalte gefunden, die mit den gewählten Filtern bzw.
          dem Suchbegriff übereinstimmen.
        </p>
      </Text>
    </div>
  )
}
