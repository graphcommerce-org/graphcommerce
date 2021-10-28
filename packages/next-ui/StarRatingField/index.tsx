import { makeStyles, Theme } from '@material-ui/core'
import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'
import { SvgImageSimple } from '..'
import SvgImage from '../SvgImage'
import { iconStar } from '../icons'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
  iconSize?: number
} & Omit<RatingProps, 'id' | 'onChange'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    iconStar: {
      fill: '#FFDA1C',
      stroke: '#FFDA1C',
      margin: 3,
    },
    iconStarEmpty: {
      fill: theme.palette.text.disabled,
      stroke: theme.palette.text.disabled,
      margin: 3,
    },
  }),
  {
    name: 'StarRatingField',
  },
)

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, iconSize = 20, ...ratingProps } = props
  const classes = useStyles(props)

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={
        <SvgImageSimple
          src={iconStar}
          alt='star'
          loading='eager'
          className={classes.iconStarEmpty}
        />
      }
      icon={
        <SvgImageSimple src={iconStar} alt='star' loading='eager' className={classes.iconStar} />
      }
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
