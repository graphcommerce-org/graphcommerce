import { makeStyles, Theme } from '@material-ui/core'
import { Maybe } from '@reachdigital/magento-graphql'

type ProductCountProps = {
  totalProducts: Maybe<number>
}

const useProductCountStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      maxWidth: 650,
      margin: '0 auto',
      padding: theme.spacings.xs,
      position: 'relative',
      textAlign: 'center',
      gridArea: 'count',
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
      background: '#fff',
      display: 'inline-block',
      padding: '0 16px 0 16px',
      color: theme.palette.primary.mutedText,
      transform: 'translateY(-13px)',
    },
  }),
  {
    name: 'ProductCountStyles',
  },
)

export default function ProductCount(props: ProductCountProps) {
  const { totalProducts } = props
  const classes = useProductCountStyles(props)

  return (
    <div className={classes.container}>
      <div className={classes.line} />
      <div className={classes.count}>
        {totalProducts} product{(totalProducts ?? 0) > 1 ? 's' : ''}
      </div>
    </div>
  )
}
