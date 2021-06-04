import { Chip, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    averageChip: {
      fontSize: 14,
      '& > span:first-of-type': {
        marginLeft: 10,
        color: '#FFDA1C',
      },
    },
  }),
  { name: 'ProductReviewSummary' },
)

export type ProductReviewSummaryProps = Partial<ProductReviewSummaryFragment>

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary } = props
  const classes = useStyles()

  if (!rating_summary) return null
  return (
    <Chip
      label={`${Number(rating_summary) / 20}/5`}
      icon={<span>★</span>}
      clickable
      color='default'
      variant='outlined'
      size='medium'
      className={classes.averageChip}
    />
  )
}
