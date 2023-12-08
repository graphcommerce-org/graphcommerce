import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnThree } from '@graphcommerce/next-ui'
import { RowColumnThreeProps } from './type'

export function RowColumnThree(props: RowColumnThreeProps) {
  const { colOne, colTwo, colThree } = props

  return (
    <ColumnThree
      colOneContent={<RichText {...colOne} />}
      colTwoContent={<RichText {...colTwo} />}
      colThreeContent={<RichText {...colThree} />}
    />
  )
}
