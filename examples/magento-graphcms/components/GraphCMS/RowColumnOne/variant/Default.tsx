import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from '../RowColumnOne.gql'

export function Default(props: RowColumnOneFragment) {
  const { colOne } = props

  return (
    <ColumnOne>
      <RichText {...colOne} />
    </ColumnOne>
  )
}
