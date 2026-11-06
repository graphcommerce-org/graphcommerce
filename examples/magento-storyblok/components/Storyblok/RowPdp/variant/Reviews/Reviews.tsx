import { useQuery } from '@graphcommerce/graphql'
import { ProductReviews } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Row } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import type { RowPdpVariantProps } from '../../RowPdp'

export function Reviews(props: RowPdpVariantProps) {
  const { blok, reviews, url_key, review_count, sku } = props

  const { data, loading } = useQuery(StoreConfigDocument)

  if (!reviews || loading) return null
  if (!data?.storeConfig?.product_reviews_enabled) return null

  return (
    <Row maxWidth='md' id='reviews'>
      <Box
        sx={(theme) => ({
          position: 'relative',
          '&:focus': { outline: 'none' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: theme.spacings.sm,
          marginBottom: theme.spacings.xxs,
          paddingBottom: theme.spacings.xxs,
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
        })}
      >
        <Typography variant='overline' color='textSecondary' component='h2'>
          {blok.title} ({review_count})
        </Typography>
      </Box>

      <ProductReviews
        reviews={reviews}
        url_key={url_key ?? ''}
        sku={sku}
        review_count={review_count ?? 0}
      />
    </Row>
  )
}
