import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from './RowColumnOne.gql'

export function RowColumnOneSpread(props: RowColumnOneFragment) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichText
        {...colOne}
        sxRenderer={{
          paragraph: (theme) => ({
            columnCount: { md: 2 },
            columnGap: theme.spacings.md,
          }),
        }}
      />
    </ColumnOne>
  )
}
