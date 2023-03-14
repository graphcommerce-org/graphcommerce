import { SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { CustomerReview } from '../CustomerReview/CustomerReview'
import { AccountReviewsFragment } from './AccountReviews.gql'

type AccountReviewsProps = AccountReviewsFragment

const { classes } = extendableComponent('AccountReviews', ['root', 'older'] as const)

export function AccountReviews(props: AccountReviewsProps) {
  const { items } = props
  const showLatestReviews = 2
  const latestReviews = items?.slice(0, Math.min(items?.length, showLatestReviews))
  const olderReviews = items?.slice(Math.min(items?.length, showLatestReviews), items?.length)

  return (
    <Box className={classes.root} sx={(theme) => ({ marginBottom: theme.spacings.md })}>
      <SectionContainer labelLeft='Latest'>
        {latestReviews?.map(
          (review) => review && <CustomerReview key={review.created_at} {...review} />,
        )}
      </SectionContainer>

      {items && items.length >= showLatestReviews + 1 && (
        <SectionContainer
          labelLeft='Older'
          sx={(theme) => ({
            '&.SectionHeader-root': {
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
