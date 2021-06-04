import { Chip, makeStyles, Theme, Typography } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStarYellow } from '@reachdigital/next-ui/icons'
import React from 'react'
import { ProductReviewFragment } from './ProductReview.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    review: {
      display: 'grid',
      gap: theme.spacings.sm,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacings.md} 0`,
    },
    title: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'start',
      gap: theme.spacings.xs,
      alignItems: 'center',
    },
    icon: {
      height: '14px',
    },
    label: {
      marginBottom: '-2px',
      ...theme.typography.subtitle2,
    },
    meta: {
      color: theme.palette.text.disabled,
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
    },
    nickname: {
      fontStyle: 'italic',
    },
    date: {},
  }),
  { name: 'ProductReview' },
)

export type ProductReviewProps = ProductReviewFragment

export default function ProductReview(props: ProductReviewProps) {
  const { reviews } = props
  const classes = useStyles()
  const config = 'en_US'
  const locale = config.replace('_', '-')

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (!reviews) {
    return null
  }

  return (
    <div>
      {reviews.items.map((review) => (
        <div key={review?.summary} className={classes.review}>
          <div className={classes.title}>
            <Chip
              label={`${Number(review?.average_rating) / 20}/5`}
              icon={<SvgImage src={iconStarYellow} size={10} alt='review' loading='lazy' />}
              color='default'
              variant='outlined'
              classes={{ icon: classes.icon, label: classes.label }}
            />
            <Typography variant='h5'> {review?.summary}</Typography>
          </div>
          <Typography variant='body1'>{review?.text}</Typography>
          <div className={classes.meta}>
            <div className={classes.nickname}>Written by {review?.nickname}</div>
            <time className={classes.date} dateTime={review?.created_at}>
              {review?.created_at &&
                formatter.format(new Date(review?.created_at.replace(/-/g, '/')))}
            </time>
          </div>
        </div>
      ))}
    </div>
  )
}
