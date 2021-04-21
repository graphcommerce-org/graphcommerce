import { Container, Theme, Typography, makeStyles } from '@material-ui/core'
import ProductReview, { ProductReviewProps } from '@reachdigital/magento-product/ProductReview'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
      display: 'grid',
      justifyItems: 'center',
      '& > *': {
        width: '100%',
        maxWidth: 800,
      },
    },
    labelContainer: {
      paddingBottom: theme.spacings.sm,
    },
  }),
  { name: 'ProductReview' },
)

type RowProductReviewProps = RowProductReviewsFragment & Partial<ProductReviewProps>

export default function RowProductReviews(props: RowProductReviewProps) {
  const { title, reviews } = props
  const classes = useStyles()

  if (!reviews || reviews?.items.length === 0) return null

  return (
    <Container className={classes.container}>
      <SectionHeader labelLeft={title} classes={{ labelContainer: classes.labelContainer }} />
      <ProductReview reviews={reviews} />
    </Container>
  )
}
