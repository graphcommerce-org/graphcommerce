import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'

import { makeStyles } from '@graphcommerce/next-ui'

import { ProductListCountFragment } from './ProductListCount.gql'

const useStyles = makeStyles({ name: 'ProductListCount' })((theme: Theme) => ({
  productListCount: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr max-content 1fr',
    maxWidth: '100%',
    width: responsiveVal(280, 650),
    margin: '0 auto',
    textAlign: 'center',
    gridArea: 'count',
    alignItems: 'center',
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
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
    display: 'inline-block',
    padding: `0 ${theme.spacings.xs} 0 ${theme.spacings.xs}`,
    color: theme.palette.text.disabled,
  },
}))

export type ProductCountProps = ProductListCountFragment & UseStyles<typeof useStyles>

export default function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  const { classes } = useStyles(props)

  return (
    <div className={classes.productListCount}>
      <div className={classes.line} />
      <div className={classes.count}>
        {total_count} product{(total_count ?? 0) > 1 ? 's' : ''}
      </div>
      <div className={classes.line} />
    </div>
  )
}
