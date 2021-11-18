import { SvgImageSimple, iconStar, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'
import React from 'react'
import clsx from 'clsx'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment & { className: string }

const useStyles = makeStyles(
  (theme: Theme) => ({
    ratingContainer: {
      width: 'max-content',
      position: 'relative',
      '& > div': {
        lineHeight: 0,
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
      stroke: 'none',
      fill: '#FFDA1C',
    },
    iconStarDisabled: {
      stroke: 'none',
      fill: theme.palette.grey[300],
    },
  }),
  { name: 'ProductListReviewSummary' },
)

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary, className, ...reviewProps } = props
  const classes = useStyles()

  if (!rating_summary) return null

  return (
    <div className={clsx(classes.ratingContainer, className)}>
      <div>
        <SvgImageSimple src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgImageSimple src={iconStar} size='xs' className={classes.iconStarDisabled} />
      </div>
      <div className={classes.rating} style={{ width: `${rating_summary}%` }}>
        <div>
          <SvgImageSimple src={iconStar} size='xs' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='xs' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='xs' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='xs' className={classes.iconStar} />
          <SvgImageSimple src={iconStar} size='xs' className={classes.iconStar} />
        </div>
      </div>
    </div>
  )
}
