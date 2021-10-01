import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Rating } from '@mui/material';
import { RatingProps } from '@mui/lab';
import React from 'react'
import SvgImage from '../SvgImage'
import { iconStarFilledMuted, iconStarYellow } from '../icons'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
  iconSize?: number
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
  const { id, onChange = () => {}, iconSize = 20, ...ratingProps } = props
  const classes = useStyles(props)

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={
        <SvgImage
          src={iconStarFilledMuted}
          size={iconSize}
          alt='star'
          loading='eager'
          classes={{ root: classes.icon }}
        />
      }
      icon={
        <SvgImage
          src={iconStarYellow}
          size={iconSize}
          alt='star'
          loading='eager'
          classes={{ root: classes.icon }}
        />
      }
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
