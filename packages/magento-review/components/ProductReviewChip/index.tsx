import { SvgImageSimple, iconStarYellow } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles } from '@material-ui/core'
import React from 'react'

export type ProductReviewChipProps = {
  rating?: number
  reviewSectionId?: string
  max?: number
  shapeOnly?: boolean
} & ChipProps

const useStyles = makeStyles({
  ratingContainer: {
    width: '100%',
    position: 'relative',
  },
  rating: {
    position: 'absolute',
    overflow: 'hidden',
    '& > img': {
      display: 'inline',
      width: 18,
    },
    zIndex: 1,
  },
  maxRating: {
    opacity: 0.4,
    '& > img': {
      display: 'inline',
      filter: 'grayscale(100%)',
      width: 18,
    },
  },
})

export default function ProductReviewChip(props: ProductReviewChipProps) {
  const { rating, reviewSectionId = '', shapeOnly = false, max = 5, ...chipProps } = props
  const classes = useStyles()

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
  let chip

  if (!shapeOnly) {
    chip = (
      <Chip
        variant='outlined'
        clickable={!!reviewSectionId}
        onClick={handleClick}
        icon={<SvgImageSimple src={iconStarYellow} alt='Stars' />}
        color='default'
        label={`${normalizedRating}/5`}
        {...chipProps}
      />
    )
  } else {
    chip = (
      <Chip
        variant='outlined'
        size='small'
        clickable={!!reviewSectionId}
        onClick={handleClick}
        icon={
          <div className={classes.ratingContainer}>
            <div className={classes.rating} style={{ width: `${rating}%` }}>
              <SvgImageSimple size='small' src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
            </div>
            <div className={classes.maxRating}>
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
              <SvgImageSimple src={iconStarYellow} alt='Stars' />
            </div>
          </div>
        }
        color='default'
        {...chipProps}
      />
    )
  }

  if (!reviewSectionId) return chip

  return chip
}
