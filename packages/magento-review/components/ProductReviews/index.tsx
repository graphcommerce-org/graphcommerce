import { useQuery } from '@apollo/client'
import {
  Pagination,
  responsiveVal,
  StarRatingField,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Typography, Button, Box, SxProps, Theme } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import ProductReviewChip from '../ProductReviewChip'
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

export default function ProductReviews(props: ProductReviewsProps) {
  const { reviews, url_key, sku, sx = [] } = props
  const config = 'en_US'
  const locale = config.replace('_', '-')

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
      <Link href={`/account/reviews/add?sku=${sku}`} passHref>
        <Button
          variant='pill'
          color='primary'
          size='medium'
          className={classes.writeReviewButton}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              whiteSpace: 'nowrap',
            },
          })}
        >
          <Trans>Write a review</Trans>
        </Button>
      </Link>

      {!!total_pages && total_pages > 1 && (
        <Pagination
          count={total_pages ?? 1}
          page={current_page ?? 1}
          classes={{ root: classes.paginationRoot }}
          sx={{
            margin: `0 -16px 0`,
          }}
          renderLink={(p: number, icon: React.ReactNode) => (
            <Button
              onClick={() => setPage(p)}
              className={classes.paginationButton}
              sx={{
                padding: 0,
                minWidth: 'unset',
                borderRadius: '100%',
                '& > .MuiButton-label': {
                  padding: 0,
                },
              }}
            >
              {icon}
            </Button>
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
            <Typography variant='subtitle1'>Be the first to write a review!</Typography>
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
        () => ({ marginTop: `calc(${theme.spacings.xxs} * -1)` }),
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
              <ProductReviewChip rating={review?.average_rating} size='small' />
              <Typography component='h3' variant='h5'>
                {review?.summary}
              </Typography>
            </Box>
            <Typography variant='body1'>{review?.text}</Typography>

            {(review?.ratings_breakdown ?? 0) > 1 && (
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
                Written by {review?.nickname}
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
