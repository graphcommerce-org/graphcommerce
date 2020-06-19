import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import { UseStyles } from 'components/Theme'
import Review from 'components/Review'
import { array } from '@storybook/addon-knobs'

const useRowReviewStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
  }),
  { name: 'RowReview' },
)

export type RowReviewProps = GQLRowReviewFragment & UseStyles<typeof useRowReviewStyles>

const RowReview: React.FC<RowReviewProps> = (props) => {
  const { reviews } = props
  const classes = useRowReviewStyles()

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        {reviews && reviews.map((review) => <Review key={review.id} {...review} />)}
      </div>
    </Container>
  )
}

export default RowReview
