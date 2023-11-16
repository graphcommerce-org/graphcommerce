import { Image } from '@graphcommerce/image'
import { LayoutHeader, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AddProductsToCartButton, AddProductsToCartError } from '../AddProductsToCart'
import {
  ProductPageAddToCartQuantityRow,
  ProductPageAddToCartRowProps,
} from '../ProductPage/ProductPageAddToCartRow'
import { ProductPageName } from '../ProductPageName'
import { ProductPagePrice } from '../ProductPagePrice'

export type StickyAddToCartProps = Partial<ProductPageAddToCartRowProps> & {
  cartButtonRef?: React.RefObject<HTMLElement>
}

export function StickyAddToCart(props: StickyAddToCartProps) {
  const { product, cartButtonRef } = props

  const mainImage = product?.media_gallery?.[0]
  const [switchPointPosition, setSwitchPointPosition] = useState<number>()

  useEffect(() => {
    if (!cartButtonRef?.current) return () => {}

    const handleResize = () => {
      const cartButtonBottomRelativeToViewport =
        cartButtonRef?.current?.getBoundingClientRect().bottom

      if (cartButtonBottomRelativeToViewport) {
        // Calculate the distance from the top of the page to the bottom position of cartButtonRef
        // We add the current scroll position to get an absolute distance
        const cartButtonAbsolutePosition = cartButtonBottomRelativeToViewport + window.scrollY

        // Set the switchPoint value to the calculated absolute position
        setSwitchPointPosition(cartButtonAbsolutePosition)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [cartButtonRef])

  return (
    product &&
    switchPointPosition && (
      <LayoutHeader
        hideBackButton
        switchPoint={switchPointPosition}
        size='responsive'
        sx={(theme) => ({
          width: { md: '60vw', lg: '65vw' },
          inset: 0,
          margin: 'auto',
          transform: {
            xs: 'none',
            md: `translateY(calc(${theme.appShell.appBarHeightMd} - ${theme.appShell.headerHeightSm} - 10px))`,
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

          '& .LayoutHeaderContent-center > div': {
            width: '100%',
          },

          '& .LayoutHeaderContent-bg': {
            borderRadius: { xs: 0, md: theme.shape.borderRadius },
            boxShadow: theme.shadows[6],
            transform: 'translateY(-50px)',
            transition: '0.3s ease-in-out',

            '&.scrolled': {
              opacity: 1,
              transform: 'none',
            },

            [theme.breakpoints.down('md')]: {
              height: `calc(${theme.appShell.headerHeightSm} + 15px)`,
            },
          },

          '& .LayoutHeaderContent-center': {
            display: 'flex',
            width: '100%',
            transform: 'translateY(-50px)',
            transition: '0.3s ease-in-out',

            '&.scrolled': {
              opacity: 1,
              transform: 'none',
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
              sx={{
                verticalAlign: 'middle',
                width: responsiveVal(46, 60),
                height: responsiveVal(46, 60),
              }}
            />
          )}
          <Typography
            variant='h4'
            sx={(theme) => ({
              display: { xs: 'none', md: 'block' },
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
          <AddProductsToCartButton color='primary' size='medium' product={product} sx={{}} />
        </Box>
      </LayoutHeader>
    )
  )
}
