import { RatingProps, Rating } from '@mui/material'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconStar } from '../icons'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
} & Omit<RatingProps, 'id' | 'onChange'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles({ name: 'StarRatingField' })((theme) => ({
  iconStar: {
    fill: '#FFDA1C',
    stroke: 'none',
    margin: '0 3px',
  },
  iconStarEmpty: {
    fill: theme.palette.grey[300],
    stroke: 'none',
    margin: '0 3px',
  },
}))

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, ...ratingProps } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={<SvgImageSimple src={iconStar} size='large' className={classes.iconStarEmpty} />}
      icon={<SvgImageSimple src={iconStar} size='large' className={classes.iconStar} />}
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
