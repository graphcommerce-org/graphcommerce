import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStarYellow } from '@reachdigital/next-ui/icons'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    icon: {
      height: 14,
    },
  }),
  { name: 'ProductReviewSummary' },
)

type ProductReviewSummaryProps = ProductReviewSummaryFragment & ChipProps

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { icon } = useStyles(props)
  const { rating_summary } = props

  if (!rating_summary) return null

  const rating = Math.round(rating_summary / 2) / 10

  return (
    <Chip
      variant='outlined'
      clickable
      icon={<SvgImage src={iconStarYellow} alt='review' loading='lazy' />}
      color='default'
      size='medium'
      classes={{ icon }}
      label={`${rating}/5`}
    />
  )
}
