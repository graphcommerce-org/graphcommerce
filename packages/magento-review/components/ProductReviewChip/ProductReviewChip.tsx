import { IconSvg, iconStar } from '@graphcommerce/next-ui'
import Chip, { ChipProps } from '@mui/material/Chip'
import React from 'react'

export type ProductReviewChipProps = {
  rating?: number
  reviewSectionId?: string
  max?: number
} & ChipProps<'button'>

export function ProductReviewChip(props: ProductReviewChipProps) {
  const { rating, reviewSectionId = '', max = 5, ...chipProps } = props

  if (!rating) return null

  const normalizedRating = Math.round(rating / (10 / max)) / 10

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
      component='button'
      variant='outlined'
      clickable={!!reviewSectionId}
      onClick={handleClick}
      icon={<IconSvg src={iconStar} sx={{ stroke: '#FFDA1C', fill: '#FFDA1C' }} />}
      color='default'
      size='medium'
      label={`${normalizedRating}/5`}
      {...chipProps}
    />
  )

  if (!reviewSectionId) return chip

  return chip
}
