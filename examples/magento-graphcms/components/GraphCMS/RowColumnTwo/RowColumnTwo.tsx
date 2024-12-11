import { RichText } from '@graphcommerce/hygraph-ui'
import { ColumnTwo } from '@graphcommerce/next-ui'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

export function RowColumnTwo(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...colOne} />} colTwoContent={<RichText {...colTwo} />} />
  )
}
