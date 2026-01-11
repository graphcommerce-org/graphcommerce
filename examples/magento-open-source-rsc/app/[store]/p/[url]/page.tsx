import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import type { Metadata } from 'next'
import { ProductPageDocument } from '../../../../graphql/ProductPage.gql'
import { StoreConfigDocument } from '../../../../graphql/StoreConfig.gql'
import { getClient } from '../../../../lib/apollo/client'
import { redirectOrNotFound } from '../../../../lib/redirectOrNotFound'
import { getStorefrontConfig } from '../../../../lib/storefront'

type ProductPageProps = {
  params: Promise<{ store: string; url: string }>
}

/** Generate metadata for the product page */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const { data } = await client.query({
    query: ProductPageDocument,
    variables: { urlKey: url },
  })

  const product = data?.products?.items?.[0]

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.short_description?.html || undefined,
    keywords: product.meta_keyword || undefined,
  }
}

/**
 * Product page component (RSC) - Fetches product data server-side Layout (header, footer,
 * navigation) is handled by layout.tsx
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { store, url } = await params
  const storefront = getStorefrontConfig(store)
  const client = getClient(storefront)

  const [{ data }, { data: storeConfigData }] = await Promise.all([
    client.query({ query: ProductPageDocument, variables: { urlKey: url } }),
    client.query({ query: StoreConfigDocument }),
  ])

  const product = data?.products?.items?.[0]

  // If no product found, try to find a redirect or return 404
  if (!product) {
    return redirectOrNotFound(client, storeConfigData?.storeConfig, url, store)
  }

  const price = product.price_range?.minimum_price
  const finalPrice = price?.final_price
  const regularPrice = price?.regular_price
  const hasDiscount = finalPrice?.value !== regularPrice?.value

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'grey.100',
              borderRadius: 2,
              overflow: 'hidden',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {product.image?.url ? (
              <img
                src={product.image.url}
                alt={product.image.label || product.name || ''}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : (
              <Typography color='text.secondary'>No image</Typography>
            )}
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant='overline' color='text.secondary'>
              SKU: {product.sku}
            </Typography>
            <Typography variant='h1' component='h1' gutterBottom sx={{ fontSize: '2rem' }}>
              {product.name}
            </Typography>

            {/* Price */}
            <Box sx={{ mb: 3 }}>
              {hasDiscount && regularPrice?.value && (
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {regularPrice.currency} {regularPrice.value?.toFixed(2)}
                </Typography>
              )}
              {finalPrice?.value && (
                <Typography variant='h4' color={hasDiscount ? 'error.main' : 'text.primary'}>
                  {finalPrice.currency} {finalPrice.value.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Short Description */}
            {product.short_description?.html && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant='body1'
                  dangerouslySetInnerHTML={{ __html: product.short_description.html }}
                />
              </Box>
            )}

            {/* Add to Cart placeholder */}
            <Paper
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                Add to Cart functionality will be implemented here
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Full Description */}
      {product.description?.html && (
        <Box sx={{ mt: 6 }}>
          <Typography variant='h2' component='h2' gutterBottom sx={{ fontSize: '1.5rem' }}>
            Description
          </Typography>
          <Typography
            variant='body1'
            component='div'
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          />
        </Box>
      )}
    </Container>
  )
}
