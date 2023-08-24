import { Image } from '@graphcommerce/image'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { AddProductsToCartButton, AddProductsToCartError } from '../AddProductsToCart'
import {
  AddProductsToCartForm,
  AddProductsToCartFormProps,
} from '../AddProductsToCart/AddProductsToCartForm'
import { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'
import { ProductPageAddToCartQuantityRow } from '../ProductPage/ProductPageAddToCartRow'
import { ProductPageGalleryFragment } from '../ProductPageGallery/ProductPageGallery.gql'
import { ProductPageName } from '../ProductPageName'
import { ProductPagePrice } from '../ProductPagePrice'

type StickyAddToCartProps = Pick<AddProductsToCartFormProps, 'defaultValues'> & {
  product?: UseAddProductsToCartActionFragment &
    ProductPageGalleryFragment &
    ProductListItemFragment
  cartButtonRef?: React.RefObject<HTMLButtonElement>
}

export function StickyAddToCart(props: StickyAddToCartProps) {
  const { product, defaultValues, cartButtonRef } = props
  const mainImage = product?.media_gallery?.[0]

  const [isButtonInViewport, setIsButtonInViewport] = useState(false)

  useEffect(() => {
    if (!cartButtonRef || !cartButtonRef.current) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsButtonInViewport(true)
        } else {
          setIsButtonInViewport(false)
        }
      })
    }, options)

    observer.observe(cartButtonRef.current)

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect()
    }
  }, [cartButtonRef, isButtonInViewport])

  if (!product?.sku || !product.url_key) return null

  return (
    <LayoutHeader
      hideBackButton
      forceScrolled={isButtonInViewport}
      size='responsive'
      divider
      bgColor='paper'
      sx={{
        width: '70vw',
        inset: 0,
        margin: 'auto',
        '& .LayoutHeaderContent-content': {
          width: '70vw',
          inset: 0,
          margin: 'auto',
        },
      }}
    >
      <AddProductsToCartForm
        key={product.uid}
        defaultValues={defaultValues}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {mainImage?.url && (
          <Image
            alt={mainImage.label ?? ''}
            layout='fixed'
            width={60}
            height={60}
            src={mainImage.url}
            sx={{ verticalAlign: 'middle' }}
          />
        )}

        <Typography
          variant='h4'
          sx={{
            display: { xs: 'none', md: 'block' },
            typography: { xs: 'h6', lg: 'h5' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <ProductPageName product={{ name: product?.name }} />
        </Typography>

        <Box sx={{ marginLeft: 'auto' }}>
          <ProductPageAddToCartQuantityRow product={product}>
            <AddProductsToCartError>
              <Typography
                component='div'
                variant='h3'
                lineHeight='1'
                sx={{
                  display: { lg: 'flex' },
                  gap: { xs: 1, lg: 2 },
                  typography: { xs: 'body1', md: 'h6', lg: 'h5' },
                  lineHeight: { xs: '1.2em', md: '1.7em' },
                  '& .incl-vat': {
                    opacity: 0.4,
                  },
                }}
              >
                <ProductPagePrice product={product} />
              </Typography>
            </AddProductsToCartError>
          </ProductPageAddToCartQuantityRow>
          <AddProductsToCartButton color='primary' size='medium' product={product} />
        </Box>
      </AddProductsToCartForm>
    </LayoutHeader>
  )
}
