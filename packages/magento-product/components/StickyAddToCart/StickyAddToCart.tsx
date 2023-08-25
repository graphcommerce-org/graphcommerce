import { Image } from '@graphcommerce/image'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { AddProductsToCartButton, AddProductsToCartError } from '../AddProductsToCart'
import { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'
import { ProductPageAddToCartQuantityRow } from '../ProductPage/ProductPageAddToCartRow'
import { ProductPageGalleryFragment } from '../ProductPageGallery/ProductPageGallery.gql'
import { ProductPageName } from '../ProductPageName'
import { ProductPagePrice } from '../ProductPagePrice'

type StickyAddToCartProps = {
  product: UseAddProductsToCartActionFragment & ProductPageGalleryFragment & ProductListItemFragment
  cartButtonRef?: React.RefObject<HTMLButtonElement>
}

export function StickyAddToCart(props: StickyAddToCartProps) {
  const { product, cartButtonRef } = props
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
      sx={(theme) => ({
        width: { md: '60vw', lg: '65vw' },
        inset: 0,
        margin: 'auto',
        transform: {
          xs: 'none',
          md: `translateY(calc(${theme.appShell.appBarHeightMd}  * .28))`,
        },

        [theme.breakpoints.down('md')]: {
          height: `calc(${theme.appShell.headerHeightSm} + 15px)`,
          mt: 0,
        },

        '& .LayoutHeaderContent-content': {
          display: 'flex',
          inset: 0,
          margin: 'auto',
          px: '12px',
        },

        '& .LayoutHeaderContent-center': {
          display: 'flex',
          width: '100%',
        },

        '& .LayoutHeaderContent-center > div': {
          width: '100%',
        },

        '& .LayoutHeaderContent-bg': {
          borderRadius: { xs: 0, md: theme.shape.borderRadius },
          boxShadow: theme.shadows[6],

          [theme.breakpoints.down('md')]: {
            height: `calc(${theme.appShell.headerHeightSm} + 15px)`,
          },
        },

        '& .LayoutHeaderContent-right': {
          display: 'none',
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: (theme) => theme.spacings.sm,
        }}
      >
        {mainImage?.url && (
          <Image
            alt={mainImage.label ?? ''}
            layout='fixed'
            width={60}
            height={60}
            src={mainImage.url}
            sx={(theme) => ({
              verticalAlign: 'middle',
              [theme.breakpoints.down('md')]: {
                width: 46,
                height: 46,
              },
            })}
          />
        )}

        <Typography
          variant='h4'
          sx={(theme) => ({
            fontSize: { xs: theme.typography.h5.fontSize, md: theme.typography.h4.fontSize },
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          <ProductPageName product={{ name: product?.name }} />
        </Typography>

        <ProductPageAddToCartQuantityRow product={product} sx={{ ml: 'auto' }}>
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
    </LayoutHeader>
  )
}
