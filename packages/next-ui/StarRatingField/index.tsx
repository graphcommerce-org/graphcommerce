import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'
import { SvgImageSimple } from '..'
import { iconStar } from '../icons'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
  iconSize?: number
} & Omit<RatingProps, 'id' | 'onChange'>

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, iconSize = 20, ...ratingProps } = props

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={<SvgImageSimple src={iconStar} />}
      icon={<SvgImageSimple src={iconStar} />}
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
