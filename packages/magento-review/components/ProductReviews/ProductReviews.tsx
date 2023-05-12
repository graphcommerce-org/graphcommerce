import { useQuery } from '@graphcommerce/graphql'
import {
  Pagination,
  responsiveVal,
  StarRatingField,
  extendableComponent,
  useDateTimeFormat,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Typography, Button, Box, SxProps, Theme, Link } from '@mui/material'
import { useRouter } from 'next/compat/router'
import React, { useState } from 'react'
import { ProductReviewChip } from '../ProductReviewChip/ProductReviewChip'
import { ProductReviewsFragment } from './ProductReviews.gql'
import { ProductReviewsPageDocument } from './ProductReviewsPage.gql'

export type ProductReviewsProps = ProductReviewsFragment & { sx?: SxProps<Theme> }

const name = 'ProductReviews' as const
const parts = [
  'review',
  'title',
  'meta',
  'nickname',
  'date',
  'reviewsBottomContainer',
  'paginationRoot',
  'paginationButton',
  'ratingRow',
  'rating',
  'writeReviewButton',
  'container',
] as const
const { classes } = extendableComponent(name, parts)

export function ProductReviews(props: ProductReviewsProps) {
  const { reviews, url_key, sx = [] } = props
  const router = useRouter()

  const [reviewPage, setPage] = useState<number>(1)

  const { data: otherReviewsPage, loading } = useQuery(ProductReviewsPageDocument, {
    skip: reviewPage === 1,
    variables: {
      urlKey: url_key ?? '',
      reviewPage,
      reviewPageSize: 3,
    },
  })

  const myReviews = otherReviewsPage?.products?.items?.[0]?.reviews ?? reviews

  const { current_page, total_pages } = myReviews.page_info

  const formatter = useDateTimeFormat({ dateStyle: 'long', timeStyle: 'short' })

  if (!reviews) {
    return null
  }

  const actions = (
    <Box
      className={classes.reviewsBottomContainer}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacings.sm,
      })}
    >
      <Button
        variant='pill'
        color='primary'
        size='medium'
        className={classes.writeReviewButton}
        onClick={() => router.push(`/account/reviews/add?url_key=${url_key}`)}
        sx={(theme) => ({
          [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
          },
        })}
      >
        <Trans id='Write a review' />
      </Button>

      {!!total_pages && total_pages > 1 && (
        <Pagination
          count={total_pages ?? 1}
          page={current_page ?? 1}
          classes={{ root: classes.paginationRoot }}
          sx={{
            margin: `0 -16px 0`,
          }}
          renderLink={(p: number, icon: React.ReactNode) => (
            <Link color='inherit' underline='hover' onClick={() => setPage(p)}>
              {icon}
            </Link>
          )}
        />
      )}
    </Box>
  )

  if (reviews?.items.length === 0) {
    return (
      <Box
        className={classes.container}
        sx={[
          (theme) => ({ marginTop: `calc(${theme.spacings.xxs} * -1)` }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.review}
          sx={(theme) => ({
            display: 'grid',
            gap: theme.spacings.sm,
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: `${theme.spacings.md} 0`,
            typography: 'body1',
          })}
        >
          <Box
            className={classes.title}
            sx={(theme) => ({
              display: 'grid',
              gridAutoFlow: 'column',
              justifyContent: 'start',
              gap: theme.spacings.xs,
              alignItems: 'center',
            })}
          >
            <Typography variant='subtitle1'>
              <Trans id='Be the first to write a review!' />
            </Typography>
          </Box>
        </Box>
        {actions}
      </Box>
    )
  }

  return (
    <Box
      className={classes.container}
      sx={[
        (theme) => ({ marginTop: `calc(${theme.spacings.xxs} * -1)` }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!loading &&
        myReviews.items.map((review) => (
          <Box
            key={review?.summary}
            className={classes.review}
            sx={(theme) => ({
              display: 'grid',
              gap: theme.spacings.sm,
              borderBottom: `1px solid ${theme.palette.divider}`,
              padding: `${theme.spacings.md} 0`,
              typography: 'body1',
            })}
          >
            <Box
              className={classes.title}
              sx={(theme) => ({
                display: 'grid',
                gridAutoFlow: 'column',
                justifyContent: 'start',
                gap: theme.spacings.xs,
                alignItems: 'center',
              })}
            >
              <ProductReviewChip rating={review?.average_rating} />
              <Typography component='h3' variant='h5'>
                {review?.summary}
              </Typography>
            </Box>
            <Typography variant='body1'>{review?.text}</Typography>

            {(review?.ratings_breakdown.length ?? 0) > 1 && (
              <Box
                className={classes.ratingRow}
                sx={(theme) => ({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: theme.spacings.sm,
                  color: theme.palette.text.disabled,
                  typography: 'body2',
                })}
              >
                {review?.ratings_breakdown.map((ratingBreakdown) => (
                  <Box
                    key={`rating-${ratingBreakdown?.value}`}
                    className={classes.rating}
                    sx={(theme) => ({
                      display: 'grid',
                      gridAutoFlow: 'column',
                      gridTemplateColumns: '0.4fr 0.6fr',
                      justifyContent: 'space-between',
                      marginRight: theme.spacings.xxs,
                      rowGap: responsiveVal(8, 16),
                      gap: 8,
                      alignItems: 'center',
                    })}
                  >
                    <span>{ratingBreakdown?.name}</span>
                    <StarRatingField
                      readOnly
                      size='small'
                      defaultValue={Number(ratingBreakdown?.value ?? 0)}
                    />
                  </Box>
                ))}
              </Box>
            )}

            <Box
              className={classes.meta}
              sx={(theme) => ({
                color: theme.palette.text.disabled,
                display: 'grid',
                gridAutoFlow: 'column',
                justifyContent: 'space-between',
              })}
            >
              <Box className={classes.nickname} sx={{ typography: 'body2' }}>
                <Trans id='Written by {nickname}' values={{ nickname: review?.nickname }} />
              </Box>
              <Box
                component='time'
                className={classes.date}
                dateTime={review?.created_at}
                sx={{ typography: 'body2' }}
              >
                {review?.created_at &&
                  formatter.format(new Date(review?.created_at.replace(/-/g, '/')))}
              </Box>
            </Box>
          </Box>
        ))}
      {actions}
    </Box>
  )
}
