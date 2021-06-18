import { Chip, ChipProps, Link, makeStyles, Theme } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStarYellow } from '@reachdigital/next-ui/icons'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    icon: {
      height: 14,
    },
  }),
  { name: 'ProductReviewSummary' },
)

type ProductReviewSummaryProps = ProductReviewSummaryFragment &
  ChipProps & {
    reviewSectionId?: string
  }

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { reviewSectionId = '' } = props
  const classes = useStyles(props)
  const { rating_summary } = props

  if (!rating_summary) return null

  const rating = Math.round(rating_summary / 2) / 10

  return (
    <Link
      underline='none'
      href={`#${reviewSectionId}`}
      onClick={(e) => {
        const element = document.getElementById(reviewSectionId)

        e.preventDefault()

        if (!element) {
          return
        }

        ;(window as any).scrollTo({
          top: element.offsetTop - 50,
          left: 0,
          behavior: 'smooth',
        })
      }}
    >
      <Chip
        variant='outlined'
        clickable
        icon={<SvgImage src={iconStarYellow} alt='review' loading='lazy' />}
        color='default'
        size='medium'
        label={`${rating}/5`}
        {...props}
        classes={classes}
      />
    </Link>
  )
}
