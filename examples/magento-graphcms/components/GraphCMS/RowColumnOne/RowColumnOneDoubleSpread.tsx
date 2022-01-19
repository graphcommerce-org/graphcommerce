import { RichTextDoubleSpread } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from './RowColumnOne.gql'

type RowColumnOneDoubleSpreadProps = RowColumnOneFragment

export function RowColumnOneDoubleSpread(props: RowColumnOneDoubleSpreadProps) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichTextDoubleSpread {...colOne} />
    </ColumnOne>
  )
}
