import { RichText, ColumnThree } from '@graphcommerce/next-ui'
import { RowColumnThreeProps } from './type'

export function RowColumnThree(props: RowColumnThreeProps) {
  const { copy, copyTwo, copyThree } = props

  return (
    <ColumnThree
      colOneContent={<RichText {...copy} />}
      colTwoContent={<RichText {...copyTwo} />}
      colThreeContent={<RichText {...copyThree} />}
    />
  )
}
