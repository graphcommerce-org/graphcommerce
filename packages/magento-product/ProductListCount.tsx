import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { ProductListCountFragment } from './ProductListCount.gql'

const useProductCountStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      maxWidth: '100%',
      width: responsiveVal(280, 650),
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

type ProductCountProps = ProductListCountFragment

export default function ProductListCount(props: ProductCountProps) {
  const { total_count } = props
  const classes = useProductCountStyles(props)

  return (
    <div className={classes.container}>
      <div className={classes.line} />
      <div className={classes.count}>
        {total_count} product{(total_count ?? 0) > 1 ? 's' : ''}
      </div>
    </div>
  )
}
