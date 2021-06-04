import { Chip, makeStyles, Theme, Typography } from '@material-ui/core'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStarYellow } from '@reachdigital/next-ui/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    icon: {
      height: '14px',
    },
    label: {
      marginBottom: '-2px',
      ...theme.typography.subtitle2,
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
        <Chip
          variant='outlined'
          icon={<SvgImage src={iconStarYellow} size={10} alt='review' loading='lazy' />}
          color='default'
          size='medium'
          classes={{ icon: classes.icon, label: classes.label }}
          label={`${Number(rating_summary) / 20}/5`}
        />
      )}
    </>
  )
}
