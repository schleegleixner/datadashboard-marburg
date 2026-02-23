import Text from '@/components/Elements/Text'

export default function AxisLabel({ children = null }: { children?: string | null }) {
  if (!children) {
    return <></>
  }

  return (
    <Text as="h7" className="mb-1" font="semibold" variant={'primary'}>
      {children}
    </Text>
  )
}
