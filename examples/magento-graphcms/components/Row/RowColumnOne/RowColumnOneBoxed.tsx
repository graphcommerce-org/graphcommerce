import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnOneBoxed } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from '.'

function RowColumnOneBoxed(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOneBoxed>
      <RichText {...colOne} classes={richTextOneClasses} />
    </ColumnOneBoxed>
  )
}

export default RowColumnOneBoxed
