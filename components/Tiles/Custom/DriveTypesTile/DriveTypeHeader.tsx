import Spacer from '@/components/Elements/Spacer'
import Text from '@/components/Elements/Text'
import Title from '@/components/Elements/Title'
import { ActionDimensionsType } from '@/types/dimensionMapping'

export default function DriveTypeHeader(props: {
  title: React.ReactNode
  year: string | number
  AllYear: string | number
  variant: ActionDimensionsType
}) {
  return (
    <>
      <div className="flex flex-wrap justify-start gap-x-4 lg:max-w-[87%]">
        <Text
          as={'h1'}
          className="min-w-fit tracking-tighter xl:text-6xl 2xl:text-7xl mb-2"
          font={'normal'}
          tag={'h3'}
          variant={props.variant}
        >
          {props.title} Autos
        </Text>

        <Title as={'subtitle'}>
          {props.year !== 'Alle Jahre' ? (
            <>
              waren <span className={'text-' + props.variant}>{props.year}</span> in
              Marburg angemeldet.{' '}
              Aufgeteilt auf folgende Antriebsarten:
            </>
          ) : (
            <>
              sind <span className={'text-' + props.variant}>seit {props.AllYear}</span>{' '}
              in Marburg hinzugekommen, aufgeteilt auf folgende Antriebsarten:
            </>
          )}
        </Title>
      </div>
      <Spacer />
    </>
  )
}
