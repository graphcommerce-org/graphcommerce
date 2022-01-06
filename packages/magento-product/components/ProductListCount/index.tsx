import {
  UseStyles,
  responsiveVal,
  makeStyles,
  useMergedClasses,
  typography,
} from '@graphcommerce/next-ui'
import { ProductListCountFragment } from './ProductListCount.gql'

const useStyles = makeStyles({ name: 'ProductListCount' })((theme) => ({
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
    ...typography(theme, 'body2'),
    margin: '0 auto',
    display: 'inline-block',
    padding: `0 ${theme.spacings.xs} 0 ${theme.spacings.xs}`,
    color: theme.palette.text.disabled,
  },
}))

export type ProductCountProps = ProductListCountFragment & UseStyles<typeof useStyles>

export default function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

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
