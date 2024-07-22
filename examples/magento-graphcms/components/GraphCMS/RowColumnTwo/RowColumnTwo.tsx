import { ColumnTwo } from '@graphcommerce/next-ui'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'
import { RichText } from '@graphcommerce/graphcms-ui'

export function RowColumnTwo(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...colOne} />} colTwoContent={<RichText {...colTwo} />} />
  )
}
