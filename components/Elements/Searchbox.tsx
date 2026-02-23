'use client'

import Container from '@/components/Layout/Container'
import Searchfield from '@/components/Elements/Searchfield'
import { useSearch } from '@schleegleixner/react-statamic-api'

function SearchComponent() {
  const { searchTerm, setSearchTerm, clearSearch } = useSearch()

  return (
    <div className={'group w-full'}>
      <Container className={'flex'} variant={'flat'}>
        <Searchfield
          catchCursor={true}
          classes="mt-8 border-2 border-primary"
          clearSearch={clearSearch}
          handleChange={e => setSearchTerm(e.target.value)}
          handleSubmit={e => e.preventDefault()}
          search_term={searchTerm}
        />
      </Container>
    </div>
  )
}

export default SearchComponent
