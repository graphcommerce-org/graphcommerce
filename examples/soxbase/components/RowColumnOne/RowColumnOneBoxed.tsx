import RichText from '@reachdigital/graphcms-ui/RichText'
import { ColumnOneBoxed } from '@reachdigital/next-ui'
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
