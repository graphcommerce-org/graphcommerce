import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'

import { ProductListCountFragment } from './ProductListCount.graphql'

const useStyles = makeStyles(
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
      background: theme.palette.divider,
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
      color: theme.palette.text.disabled,
      transform: 'translateY(calc(-50% - 1px))',
    },
  }),
  {
    name: 'ProductListCount',
  },
)

export type ProductCountProps = ProductListCountFragment & UseStyles<typeof useStyles>

export default function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  const classes = useStyles(props)

  return (
    <div className={classes.productListCount}>
      <div className={classes.line} />
      <div className={classes.count}>
        {total_count} product{(total_count ?? 0) > 1 ? 's' : ''}
      </div>
    </div>
  )
}
