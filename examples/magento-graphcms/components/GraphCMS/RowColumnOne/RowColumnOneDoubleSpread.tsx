import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from './RowColumnOne.gql'

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
