import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { UseStyles } from 'components/Theme'

const useReviewStyles = makeStyles(
  (theme: Theme) => ({
    review: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 0.6fr',
      alignItems: 'center',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.md,
      borderBottom: `1px solid ${theme.palette.divider}`,
      ...theme.typography.body1,
    },
    stars: {
      color: theme.palette.secondary.main,
    },
    customerName: {
      fontStyle: 'italic',
    },
  }),
  { name: 'Review' },
)

export type RowReviewProps = GQLRatingFragment & UseStyles<typeof useReviewStyles>

const Rating: React.FC<RowReviewProps> = (props) => {
  const { customerName, rating, quote } = props
  const classes = useReviewStyles()
  const ratingStars = () => {
    for (let i = 0; i < rating.length; i++) {
      return '★'
    }
  }

  return (
    <div className={classes.review}>
      <blockquote>{quote}</blockquote>
      <div>
        <span className={classes.stars}>{ratingStars()}</span> -{' '}
        <span className={classes.customerName}>{customerName}</span>
      </div>
    </div>
  )
}

export default Rating
