import { RichText } from '../RichText'
import { ColumnThree } from './ColumnThree'
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
