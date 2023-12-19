// import { RichText } from '@graphcommerce/graphcms-ui'
import { RichText } from '../../RichText'
import { ColumnOne } from '../ColumnOne'
import { RowColumnOneProps } from '../type'

export function Default(props: RowColumnOneProps) {
  const { copy } = props

  return (
    <ColumnOne>
      <RichText {...copy} />{' '}
    </ColumnOne>
  )
}
