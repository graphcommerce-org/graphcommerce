import { Chip, ChipProps, Link, makeStyles, Theme } from '@material-ui/core'
import { SvgImage, iconStarYellow } from '@reachdigital/next-ui'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    icon: {
      height: 14,
    },
    root: {
      background: theme.palette.background.highlight,
    },
  }),
  { name: 'ProductReviewSummary' },
)

type ProductReviewSummaryProps = ProductReviewSummaryFragment &
  ChipProps & {
    reviewSectionId?: string
  }

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const classes = useStyles(props)
  const { rating_summary, reviewSectionId = '', ...chipProps } = props

  if (!rating_summary) return null

  const rating = Math.round(rating_summary / 2) / 10

  const chip = (
    <Chip
      variant='outlined'
      clickable
      icon={<SvgImage src={iconStarYellow} alt='review' loading='lazy' />}
      color='default'
      size='small'
      label={`${rating}/5`}
      {...chipProps}
      classes={classes}
    />
  )

  if (!reviewSectionId) {
    return <>{chip}</>
  }

  return (
    <Link
      href={`#${reviewSectionId}`}
      underline='none'
      onClick={(event) => {
        const element = document.getElementById(reviewSectionId)

        event.preventDefault()

        if (!element) {
          return
        }

        window.scrollTo({
          top: element.offsetTop - 50,
          left: 0,
          behavior: 'smooth',
        })
      }}
    >
      {chip}
    </Link>
  )
}
