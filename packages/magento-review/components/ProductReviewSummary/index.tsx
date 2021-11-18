import { SvgImageSimple, iconStar, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import { Rating, RatingProps } from '@material-ui/lab'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'
import React from 'react'
import clsx from 'clsx'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment &
  Omit<RatingProps, 'defaultValue' | 'readOnly'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    ratingContainer: {
      lineHeight: 0,
    },
  }),
  { name: 'ProductListReviewSummary' },
)

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary, className, ...ratingProps } = props
  const classes = useStyles()

  if (!rating_summary) return null

  const max = 5
  const normalizedRating = Math.round(rating_summary / (10 / max)) / 10

  return (
    <Rating
      name='customized-icons'
      defaultValue={normalizedRating}
      precision={0.1}
      readOnly
      size='small'
      className={clsx(classes.ratingContainer, className)}
      icon={<SvgImageSimple src={iconStar} size='small' />}
      {...ratingProps}
    />
  )
}
