import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnThree } from '@graphcommerce/next-ui'
import { RowColumnThreeFragment } from './RowColumnThree.gql'

export function RowColumnThree(props: RowColumnThreeFragment) {
  const { colOne, colTwo, colThree } = props

  return (
    <ColumnThree
      colOneContent={<RichText {...colOne} />}
      colTwoContent={<RichText {...colTwo} />}
      colThreeContent={<RichText {...colThree} />}
    />
  )
}
