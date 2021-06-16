import { makeStyles, Theme } from '@material-ui/core'
import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'
import SvgImage from '../SvgImage'
import { iconStarFilledMuted, iconStarYellow } from '../icons'

type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
} & Omit<RatingProps, 'id' | 'onChange'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    icon: {
      marginLeft: 4,
      marginRight: 4,
    },
  }),
  {
    name: 'StarRatingField',
  },
)

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, ...ratingProps } = props
  const classes = useStyles(props)

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={
        <SvgImage
          src={iconStarFilledMuted}
          size={20}
          alt='star'
          loading='eager'
          className={classes.icon}
        />
      }
      icon={
        <SvgImage
          src={iconStarYellow}
          size={20}
          alt='star'
          loading='eager'
          className={classes.icon}
        />
      }
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
