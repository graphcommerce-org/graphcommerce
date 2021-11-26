import { SvgImageSimple, iconStar, responsiveVal, UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment & UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
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
  const { rating_summary } = props
  const classes = useStyles(props)

  if (!rating_summary) return null

  return (
    <div className={classes.root}>
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
