import { IconSvg, iconStar } from '@graphcommerce/next-ui'
import { Chip, ChipProps } from '@mui/material'
import React from 'react'

export type ProductReviewChipProps = {
  rating?: number
  reviewSectionId?: string
  max?: number
} & ChipProps

export default function ProductReviewChip(props: ProductReviewChipProps) {
  const { rating, reviewSectionId = '', max = 5, ...chipProps } = props

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
      icon={<IconSvg src={iconStar} size='small' sx={{ stroke: '#FFDA1C', fill: '#FFDA1C' }} />}
      color='default'
      size='small'
      label={`${normalizedRating}/5`}
      {...chipProps}
    />
  )

  if (!reviewSectionId) return chip

  return chip
}
