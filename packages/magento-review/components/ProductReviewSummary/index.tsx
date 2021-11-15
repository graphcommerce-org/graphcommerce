import { SvgImageSimple, iconStar, responsiveVal } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

export type ProductReviewSummaryProps = {
  rating?: number
} & ChipProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& span': {
        width: responsiveVal(11, 14),
      },
    },
    ratingContainer: {
      lineHeight: responsiveVal(11, 14),
    },
  }),
  { name: 'ProductListReviewSummary' },
)

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating, ...summaryProps } = props
  const classes = useStyles()

  if (!rating) return null

  const max = 5
  const normalizedRating = Math.round(rating / (10 / max)) / 10

  return (
    <div className={classes.ratingContainer}>
      <Rating
        name='customized-icons'
        defaultValue={normalizedRating}
        precision={0.1}
        readOnly
        getLabelText={(value) => 'test'}
        size='small'
        icon={<SvgImageSimple src={iconStar} size='small' />}
        className={classes.root}
      />
    </div>
  )
}
