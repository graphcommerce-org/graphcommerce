import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnTwo } from '@graphcommerce/next-ui'
import { RowColumnTwoProps } from './type'

export function RowColumnTwo(props: RowColumnTwoProps) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...colOne} />} colTwoContent={<RichText {...colTwo} />} />
  )
}
