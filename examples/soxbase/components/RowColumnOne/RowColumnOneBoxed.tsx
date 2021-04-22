import RichText from '@reachdigital/graphcms-ui/RichText'
import ColumnOneBoxed from '@reachdigital/next-ui/Row/ColumnOneBoxed'
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
