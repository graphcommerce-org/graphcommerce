import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from './RowColumnOne.gql'
import { RichText } from '../RichText'

type RowColumnOneDoubleSpreadProps = RowColumnOneFragment

export function RowColumnOneDoubleSpread(props: RowColumnOneDoubleSpreadProps) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichText
        {...colOne}
        sxRenderer={{
          paragraph: (theme) => ({
            columnCount: { sm: 2, lg: 3 },
            columnGap: theme.spacings.md,
          }),
        }}
      />
    </ColumnOne>
  )
}
