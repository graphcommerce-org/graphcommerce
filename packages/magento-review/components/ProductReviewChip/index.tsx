import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import { Image } from '@reachdigital/image'
import { SvgImageSimple, iconStarYellow, iconCloseCircle } from '@reachdigital/next-ui'
import Link from 'next/link'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

type ProductReviewSummaryProps = ProductReviewSummaryFragment & {
  reviewSectionId?: string
  chipProps?: ChipProps
  max?: number
}

export default function ProductReviewChip(props: ProductReviewSummaryProps) {
  const { rating_summary, reviewSectionId = '', chipProps, max = 5 } = props

  if (!rating_summary) return null

  const rating = Math.round(rating_summary / (10 / max)) / 10

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const element = document.getElementById(reviewSectionId)

    e.preventDefault()

    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: 'smooth',
    })

    window.scrollTo({
      top: element.offsetTop - 50,
      left: 0,
      behavior: 'smooth',
    })
  }

  const chip = (
    <Chip
      variant='outlined'
      clickable={!!reviewSectionId}
      onClick={handleClick}
      icon={<SvgImageSimple src={iconStarYellow} alt='Stars' noSize />}
      color='default'
      label={`${rating}/5`}
      {...chipProps}
      classes={classes}
    />
  )

  if (!reviewSectionId) return chip

  return chip
}
