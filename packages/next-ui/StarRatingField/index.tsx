import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'

type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
} & Omit<RatingProps, 'id' | 'onChange'>

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, ...ratingProps } = props

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
