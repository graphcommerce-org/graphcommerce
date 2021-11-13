import { SvgImageSimple, iconStar, responsiveVal } from '@graphcommerce/next-ui'
import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

export type ProductReviewSummaryProps = {
  rating?: number
} & ChipProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    ratingContainer: {
      width: 'max-content',
      position: 'relative',
      '& > *': {
        lineHeight: responsiveVal(11, 14),
      },
    },
    rating: {
      position: 'absolute',
      top: 0,
      overflow: 'hidden',
      '& > div': {
        whiteSpace: 'nowrap',
      },
    },
    iconStar: {
      width: responsiveVal(11, 14),
      stroke: 'none',
      fill: '#FFDA1C',
    },
    iconStarDisabled: {
      width: responsiveVal(11, 14),
      stroke: 'none',
      fill: theme.palette.grey[300],
    },
  }),
  { name: 'ProductListReviewSummary' },
)

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating, ...summaryProps } = props
  const classes = useStyles()

  if (!rating) return null

  return (
    <div className={classes.ratingContainer}>
      <div>
        <SvgImageSimple src={iconStar} size='small' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='small' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='small' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='small' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='small' className={classes.iconStarDisabled} />
      </div>
      <div className={classes.rating} style={{ width: `${rating}%` }}>
        <div>
          <SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='small' className={classes.iconStar} />
        </div>
      </div>
    </div>
  )
}
