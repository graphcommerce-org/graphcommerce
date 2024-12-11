import { RichText } from '@graphcommerce/hygraph-ui'
import { ColumnOneCentered } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from './RowColumnOne'

export function RowColumnOneCentered(props: RowColumnOneProps) {
  const { colOne, richTextOne } = props

  return (
    <ColumnOneCentered>
      <RichText {...colOne} {...richTextOne} />
    </ColumnOneCentered>
  )
}
