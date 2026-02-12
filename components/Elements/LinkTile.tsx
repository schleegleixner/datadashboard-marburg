import Text from '@/components/Elements/Text'
import Markdown from '@/components/Elements/Markdown'
import Background from '@/components/Layout/Background'
import ClientLink from './ClientLink'

export default async function LinkTile({
  headline,
  content,
  label,
  link,
}: {
  headline?: string | null
  content?: string | null
  label?: string | null
  link?: string | null
}) {
  return (
    <Background light>
      <div className="flex h-full w-full flex-col justify-between gap-8 px-6 py-4 xs:p-8 md:p-12 lg:px-8 lg:py-6 xl:px-12 xl:py-10">
        <div className="flex flex-col gap-4">
          {headline && (
            <Text as="h3" font="normal" tag="h2" variant="primary">
              {headline}
            </Text>
          )}

          {content && (
            <div className="">
              <Markdown content={content} />
            </div>
          )}
        </div>

        {link && <ClientLink label={label ?? 'Mehr Erfahren'} link={link} />}
      </div>
    </Background>
  )
}
