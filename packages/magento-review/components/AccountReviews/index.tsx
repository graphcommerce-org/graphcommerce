import { SectionContainer, makeStyles } from '@graphcommerce/next-ui'
import { Skeleton } from '@mui/material'
import React from 'react'
import CustomerReview from '../CustomerReview'
import { AccountReviewsFragment } from './AccountReviews.gql'

type AccountReviewsProps = AccountReviewsFragment & { loading: boolean }

const useStyles = makeStyles({ name: 'AccountReviews' })((theme) => ({
  reviewsContainer: {
    marginBottom: theme.spacings.md,
  },
  olderReviewsContainer: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
    },
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  },
}))

export default function AccountReviews(props: AccountReviewsProps) {
  const { items, loading } = props
  const { classes } = useStyles()
  const showLatestReviews = 2
  const latestReviews = items?.slice(0, Math.min(items?.length, showLatestReviews))
  const olderReviews = items?.slice(Math.min(items?.length, showLatestReviews), items?.length)

  if (loading) {
    return (
      <div className={classes.reviewsContainer}>
        <SectionContainer labelLeft='Latest'>
          <Skeleton height={196} />
          <Skeleton height={196} />
        </SectionContainer>
      </div>
    )
  }
  return (
    <div className={classes.reviewsContainer}>
      <SectionContainer labelLeft='Latest'>
        {latestReviews?.map(
          (review) => review && <CustomerReview key={review.created_at} {...review} />,
        )}
      </SectionContainer>

      {items && items.length >= showLatestReviews + 1 && (
        <SectionContainer
          labelLeft='Older'
          classes={{ sectionContainer: classes.olderReviewsContainer }}
        >
          {olderReviews?.map(
            (review) => review && <CustomerReview key={review.created_at} {...review} />,
          )}
        </SectionContainer>
      )}
    </div>
  )
}
