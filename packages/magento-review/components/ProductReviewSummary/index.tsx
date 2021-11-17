import { SvgImageSimple, iconStar, responsiveVal } from '@graphcommerce/next-ui'
import { ChipProps, makeStyles, Theme } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'
import React from 'react'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment & ChipProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    ratingContainer: {
      lineHeight: 0,
    },
  }),
  { name: 'ProductListReviewSummary' },
)

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary } = props
  const classes = useStyles()

  if (!rating_summary) return null

  const max = 5
  const normalizedRating = Math.round(rating_summary / (10 / max)) / 10

  return (
    <div className={classes.ratingContainer}>
      <Rating
        name='customized-icons'
        defaultValue={normalizedRating}
        precision={0.1}
        readOnly
        size='small'
        icon={<SvgImageSimple src={iconStar} size='small' />}
      />
    </div>
  )
}
