import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'

type RowColumnOneProps = {
  id: string
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    raw: any
  }
  __typename: string
}

export function Default(props: RowColumnOneProps) {
  const { colOne } = props

  return (
    <ColumnOne>
      <RichText {...colOne} />
    </ColumnOne>
  )
}
