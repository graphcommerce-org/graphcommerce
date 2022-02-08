import { SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { Box, Skeleton } from '@mui/material'
import CustomerReview from '../CustomerReview'
import { AccountReviewsFragment } from './AccountReviews.gql'

type AccountReviewsProps = AccountReviewsFragment & { loading: boolean }

const { classes } = extendableComponent('AccountReviews', ['root', 'older'] as const)

export default function AccountReviews(props: AccountReviewsProps) {
  const { items, loading } = props
  const showLatestReviews = 2
  const latestReviews = items?.slice(0, Math.min(items?.length, showLatestReviews))
  const olderReviews = items?.slice(Math.min(items?.length, showLatestReviews), items?.length)

  if (loading) {
    return (
      <Box
        className={classes.reviewsContainer}
        sx={(theme) => ({ marginBottom: theme.spacings.md })}
      >
        <SectionContainer labelLeft='Latest'>
          <Skeleton height={196} />
          <Skeleton height={196} />
        </SectionContainer>
      </Box>
    )
  }
  return (
    <Box className={classes.reviewsContainer} sx={(theme) => ({ marginBottom: theme.spacings.md })}>
      <SectionContainer labelLeft='Latest'>
        {latestReviews?.map(
          (review) => review && <CustomerReview key={review.created_at} {...review} />,
        )}
      </SectionContainer>

      {items && items.length >= showLatestReviews + 1 && (
        <SectionContainer
          labelLeft='Older'
          sx={(theme) => ({
            '&.SectionHeader': {
              [theme.breakpoints.up('md')]: {
                marginTop: theme.spacings.lg,
                marginBottom: theme.spacings.lg,
              },
              marginTop: theme.spacings.md,
              marginBottom: theme.spacings.md,
            },
          })}
        >
          {olderReviews?.map(
            (review) => review && <CustomerReview key={review.created_at} {...review} />,
          )}
        </SectionContainer>
      )}
    </Box>
  )
}
