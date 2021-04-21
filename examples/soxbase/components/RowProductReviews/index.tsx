import { Container, Theme, Typography, makeStyles } from '@material-ui/core'
import ProductReview, { ProductReviewProps } from '@reachdigital/magento-product/ProductReview'
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
    title: {
      ...theme.typography.caption,
      borderBottom: `1px solid ${theme.palette.divider}`,
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
      <Typography variant='h3' className={classes.title}>
        {title}
      </Typography>
      <ProductReview reviews={reviews} />
    </Container>
  )
}
