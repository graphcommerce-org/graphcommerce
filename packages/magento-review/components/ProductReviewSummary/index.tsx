import { SvgIcon, iconStar, UseStyles, makeStyles, useMergedClasses } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment & UseStyles<typeof useStyles>

const useStyles = makeStyles({ name: 'ProductListReviewSummary' })((theme) => ({
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
}))

export default function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  if (!rating_summary) return null

  return (
    <div className={classes.root}>
      <div>
        <SvgIcon src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgIcon src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgIcon src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgIcon src={iconStar} size='xs' className={classes.iconStarDisabled} />
        <SvgIcon src={iconStar} size='xs' className={classes.iconStarDisabled} />
      </div>
      <div className={classes.rating} style={{ width: `${rating_summary}%` }}>
        <div>
          <SvgIcon src={iconStar} size='xs' className={classes.iconStar} />
          <SvgIcon src={iconStar} size='xs' className={classes.iconStar} />
          <SvgIcon src={iconStar} size='xs' className={classes.iconStar} />
          <SvgIcon src={iconStar} size='xs' className={classes.iconStar} />
          <SvgIcon src={iconStar} size='xs' className={classes.iconStar} />
        </div>
      </div>
    </div>
  )
}
