import type { RatingProps } from '@mui/material'
import { Rating } from '@mui/material'
import { iconStar } from '../icons'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
} & Omit<RatingProps, 'id' | 'onChange'>

const name = 'StarRatingField'
const parts = ['root', 'startEmpty', 'starFull'] as const
const { classes } = extendableComponent(name, parts)

export function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, ...ratingProps } = props

  return (
    <Rating
      className={classes.root}
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={
        <IconSvg
          src={iconStar}
          size='large'
          className={classes.starFull}
          sx={(theme) => ({ fill: theme.palette.divider, stroke: 'none', margin: '0 3px' })}
        />
      }
      icon={
        <IconSvg
          src={iconStar}
          size='large'
          className={classes.startEmpty}
          sx={{ fill: '#FFDA1C', stroke: 'none', margin: '0 3px' }}
        />
      }
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
