import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStarYellow } from '@reachdigital/next-ui/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    button: {
      borderRadius: 50,
      padding: 5,
      borderColor: theme.palette.grey[300],
    },
    icon: {
      marginRight: 8,
    },
    reviewCount: {
      marginBottom: '-2px',
    },
  }),
  { name: 'ProductReviewSummary' },
)

export default function ProductReviewSummary(props: ProductListItemProps) {
  const classes = useStyles()
  const { rating_summary, review_count } = props

  return (
    <>
      {review_count > 0 && (
        <Button variant='outlined' className={classes.button} size='small'>
          <SvgImage
            src={iconStarYellow}
            size='extrasmall'
            alt='review'
            loading='lazy'
            className={classes.icon}
          />
          <Typography variant='subtitle2' className={classes.reviewCount}>
            {`${Number(rating_summary) / 20}/5`}
          </Typography>
        </Button>
      )}
    </>
  )
}
