import { RichTextSpread } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from './RowColumnOne.gql'

export function RowColumnOneSpread(props: RowColumnOneFragment) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichTextSpread {...colOne} />
    </ColumnOne>
  )
}
