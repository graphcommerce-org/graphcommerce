import { Image } from '@graphcommerce/image'
import { Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRef } from 'react'

import {
  AddProductsToCartButton,
  AddProductsToCartButtonProps,
  AddProductsToCartError,
} from '../AddProductsToCart'
import {
  AddProductsToCartForm,
  AddProductsToCartFormProps,
} from '../AddProductsToCart/AddProductsToCartForm'
import { ProductListPrice } from '../ProductListPrice'
import { ProductPageAddToCartQuantityRow } from '../ProductPage/ProductPageAddToCartRow'
import { ProductPageGalleryProps } from '../ProductPageGallery/ProductPageGallery'
import { ProductPageName } from '../ProductPageName'

  product: Pick<AddProductsToCartButtonProps, 'product'> & {
    media_gallery: ProductPageGalleryProps['product']['media_gallery']
type StickyAddToCartProps = Pick<AddProductsToCartFormProps, 'defaultValues'> & {
    sku: string
    url_key: string
    uid: string
  }
}

export function StickyAddToCart(props: StickyAddToCartProps) {
  const { product, defaultValues } = props
  const mainImage = product?.media_gallery?.[0]

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const showStickyAddToCart = true

  if (!product?.sku || !product.url_key) return null

  return (
    <Container
      maxWidth='lg'
      sx={{
        transform: showStickyAddToCart ? 'none' : 'translateY(-50px)',
        opacity: showStickyAddToCart ? 1 : 0,
        transition: '0.3s ease-in-out',
        borderRadius: { xs: 0, md: '16px' },
        position: 'fixed',
        zIndex: '9999',
        left: 0,
        right: 0,
        top: {
          xs: theme.appShell.headerHeightSm,
          md: ` calc(${theme.appShell.headerHeightMd} + ${theme.spacings.xxs})`,
        },
        backgroundColor: theme.palette.background.paper,
        px: { xs: theme.spacings.xxs },
        boxShadow: theme.shadows[6],
        overflow: 'hidden',
      }}
    >
      <AddProductsToCartForm
        key={product.uid}
        defaultValues={defaultValues}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'auto 1fr auto auto',
          alignItems: 'center',
          gap: { xs: 2, lg: 3 },
        }}
      >
        {mainImage?.url && (
          <Image
            alt={mainImage.label ?? ''}
            layout='fixed'
            width={isMobile ? 46 : 72}
            height={isMobile ? 46 : 72}
            src={mainImage.url}
            sx={{ verticalAlign: 'middle' }}
          />
        )}
        {!isMobile && (
          <Typography variant='h3' component='div' gutterBottom>
            <ProductPageName product={product} />
          </Typography>
        )}
        <ProductPageAddToCartQuantityRow product={product}>
          <AddProductsToCartError>
            <ProductListPrice
              {...product.price_range.minimum_price}
              sx={{
                display: { lg: 'flex' },
                gap: { xs: 1, lg: 2 },
                typography: { xs: 'body1', md: 'h6', lg: 'h5' },
                lineHeight: { xs: '1.2em', md: '1.7em' },
                '& .incl-vat': {
                  opacity: 0.4,
                },
              }}
            />
          </AddProductsToCartError>
        </ProductPageAddToCartQuantityRow>
        <AddProductsToCartButton
          color='success'
          size={isMobile ? 'medium' : 'large'}
          product={product}
        />
      </AddProductsToCartForm>
    </Container>
  )
}
