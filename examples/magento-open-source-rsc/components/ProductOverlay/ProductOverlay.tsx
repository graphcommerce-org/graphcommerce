'use client'

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'

type Product = NonNullable<NonNullable<ProductPage2Query['products']>['items']>[0]

type ProductOverlayProps = {
  product: NonNullable<Product>
  store: string
}

/**
 * Product Overlay component - displays product in a modal/dialog Used by the intercepting route to
 * show products without full page navigation
 */
export function ProductOverlay({ product, store }: ProductOverlayProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const price = product.price_range?.minimum_price
  const finalPrice = price?.final_price
  const regularPrice = price?.regular_price
  const hasDiscount = finalPrice?.value !== regularPrice?.value

  return (
    <Dialog
      open
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' component='span' sx={{ flex: 1, pr: 2 }}>
          {product.name}
        </Typography>
        <IconButton onClick={handleClose} aria-label='close' size='small'>
          ✕
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Product Image */}
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box
              sx={{
                bgcolor: 'grey.100',
                borderRadius: 1,
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
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
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography variant='overline' color='text.secondary'>
              SKU: {product.sku}
            </Typography>

            {/* Price */}
            <Box sx={{ my: 2 }}>
              {hasDiscount && regularPrice?.value && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {regularPrice.currency} {regularPrice.value?.toFixed(2)}
                </Typography>
              )}
              {finalPrice?.value && (
                <Typography variant='h5' color={hasDiscount ? 'error.main' : 'text.primary'}>
                  {finalPrice.currency} {finalPrice.value.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Short Description */}
            {product.short_description?.html && (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mb: 2 }}
                dangerouslySetInnerHTML={{ __html: product.short_description.html }}
              />
            )}

            {/* View Full Page Link */}
            <Box sx={{ mt: 3 }}>
              <Link
                href={`/${store}/p/${product.url_key}`}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '4px',
                }}
              >
                View Full Details
              </Link>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
