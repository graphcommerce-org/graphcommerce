import { Container, makeStyles, Theme } from '@material-ui/core'
import ProductReview, { ProductReviewProps } from '@reachdigital/magento-product/ProductReview'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewProps = RowProductReviewsFragment & Partial<ProductReviewProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: theme.spacings.xl,
    },
  }),
  {
    name: 'RowProductReviews',
  },
)

export default function RowProductReviews(props: RowProductReviewProps) {
  const { title, reviews } = props
  const classes = useStyles(props)

  if (!reviews || reviews?.items.length === 0) return null

  return (
    <Container maxWidth='md' className={classes.container}>
      <SectionHeader labelLeft={title} />
      <ProductReview reviews={reviews} />
    </Container>
  )
}
