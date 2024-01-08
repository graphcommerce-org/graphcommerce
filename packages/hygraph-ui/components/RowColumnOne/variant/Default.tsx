import { RichText, ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from '../type'

export function Default(props: RowColumnOneProps) {
  const { copy } = props

  return (
    <ColumnOne>
      <RichText {...copy} />{' '}
    </ColumnOne>
  )
}
