import { SvgImageSimple, iconStar, makeStyles } from '@graphcommerce/next-ui'
import { Chip, ChipProps } from '@mui/material'
import React from 'react'

export type ProductReviewChipProps = {
  rating?: number
  reviewSectionId?: string
  max?: number
} & ChipProps

const useStyles = makeStyles({ name: 'ProductListReviews' })({
  iconStar: {
    stroke: '#FFDA1C',
    fill: '#FFDA1C',
  },
})

export default function ProductReviewChip(props: ProductReviewChipProps) {
  const { rating, reviewSectionId = '', max = 5, ...chipProps } = props
  const { classes } = useStyles()

  if (!rating) return null

  const normalizedRating = Math.round(rating / (10 / max)) / 10

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const element = document.getElementById(reviewSectionId)
    e.preventDefault()
    if (!element) return

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
      icon={<SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />}
      color='default'
      size='small'
      label={`${normalizedRating}/5`}
      {...chipProps}
    />
  )

  if (!reviewSectionId) return chip

  return chip
}
