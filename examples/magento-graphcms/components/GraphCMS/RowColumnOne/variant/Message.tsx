import { RichText } from '@graphcommerce/graphcms-ui'
import { VariantMessage } from '@graphcommerce/next-ui'

type RowColumnOneProps = {
  id: string
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw: any
  }
  __typename: string
}

export function Message(props: RowColumnOneProps) {
  const { colOne, id } = props

  return (
    <VariantMessage id={id}>
      <RichText {...colOne} />
    </VariantMessage>
  )
}
