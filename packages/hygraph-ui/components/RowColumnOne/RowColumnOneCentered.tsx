import { ColumnOneCentered } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from './RowColumnOne'
import { RichText } from '../RichText'

export function RowColumnOneCentered(props: RowColumnOneProps) {
  const { colOne, richTextOne } = props

  return (
    <ColumnOneCentered>
      <RichText {...colOne} {...richTextOne} />
    </ColumnOneCentered>
  )
}
