import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles, responsiveVal } from '@reachdigital/next-ui'

import { ProductListCountFragment } from './ProductListCount.gql'

const useProductCountStyles = makeStyles(
  (theme: Theme) => ({
    productListCount: {
      maxWidth: '100%',
      width: responsiveVal(280, 650),
      margin: '0 auto',
      padding: theme.spacings.xs,
      paddingTop: responsiveVal(24, 30),
      paddingBottom: responsiveVal(4, 8),
      position: 'relative',
      textAlign: 'center',
      gridArea: 'count',
      marginBottom: theme.spacings.sm,
    },
    line: {
      background: '#ededed',
      width: '100%',
      height: 1,
      lineHeight: 20,
    },
    count: {
      ...theme.typography.body2,
      margin: '0 auto',
      background: theme.palette.background.default,
      display: 'inline-block',
      padding: `0 ${theme.spacings.xs} 0 ${theme.spacings.xs}`,
      color: theme.palette.primary.mutedText,
      transform: 'translateY(calc(-50% - 1px))',
    },
  }),
  {
    name: 'ProductCountStyles',
  },
)

export type ProductCountProps = ProductListCountFragment & UseStyles<typeof useProductCountStyles>

export default function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  const classes = useProductCountStyles(props)

  return (
    <div className={classes.productListCount}>
      <div className={classes.line} />
      <div className={classes.count}>
        {total_count} product{(total_count ?? 0) > 1 ? 's' : ''}
      </div>
    </div>
  )
}
