import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { CartAddedDocument, CrosssellsDocument, useCartQuery } from '@graphcommerce/magento-cart'
import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  Button,
  filterNonNullableKeys,
  iconChevronRight,
  IconSvg,
  ItemScroller,
  RenderType,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Divider, Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { LayoutOverlay, LayoutOverlayProps, productListRenderer } from '../../components'

function CheckoutAdded(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const cartAdded = useCartQuery(CartAddedDocument)
  const items = filterNonNullableKeys(cartAdded.data?.cart?.items)
  const router = useRouter()
  const { sku } = router.query
  const lastItem = items.find((item) => item.product.sku === sku)

  const crosssels = useQuery(CrosssellsDocument, {
    variables: { pageSize: 1, filters: { sku: { eq: lastItem?.product.sku } } },
    skip: !lastItem?.product.sku,
    ssr: false,
  })
  const crossSellItems = useMemo(
    () =>
      filterNonNullableKeys(
        crosssels.data?.products?.items?.[0]?.crosssell_products ??
          crosssels.previousData?.products?.items?.[0]?.crosssell_products,
      ).filter(
        (item) =>
          items.every((i) => i.product.sku !== item.sku) && item.stock_status === 'IN_STOCK',
      ),
    [crosssels.data?.products?.items, crosssels.previousData?.products?.items, items],
  )

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Cart')} metaRobots={['noindex']} />

      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          py: 2,
          alignItems: { xs: 'start', md: 'center' },
          gap: theme.spacings.xxs,
          gridTemplate: {
            xs: `"icon children close"
               "action action   action"`,
            md: '"icon children action close"',
          },
          gridTemplateColumns: {
            xs: 'min-content 1fr auto',
            md: 'min-content 1fr max-content auto',
          },

          '&.IconSvg': {
            gridArea: 'children',
          },
        })}
      >
        {lastItem?.product.thumbnail?.url ? (
          <Image
            src={lastItem?.product.thumbnail?.url}
            width={50}
            height={50}
            layout='fill'
            sx={{
              width: responsiveVal(50, 80),
              height: responsiveVal(50, 80),
              display: 'block',
              borderRadius: 1,
              objectFit: 'contain',
            }}
            pictureProps={{ sx: { gridArea: 'icon', alignSelf: 'stretch' } }}
            sizes='100px'
          />
        ) : (
          <Box
            sx={{
              gridArea: 'icon',
              alignSelf: 'stretch',
              width: responsiveVal(50, 80),
              height: responsiveVal(50, 80),
            }}
          />
        )}

        <Box gridArea='children'>
          <Box sx={{ typography: 'h6' }}>
            <Trans
              id='<0>{name}</0> has been added to your shopping cart!'
              components={{ 0: <strong /> }}
              values={{ name: lastItem?.product.name }}
            />
          </Box>
          {crossSellItems.length > 0 && (
            <Box sx={{ typography: 'body1', display: { xs: 'none', md: 'block' } }}>
              <Trans id='Complete your purchase' />
            </Box>
          )}
        </Box>
        <Box gridArea='action'>
          <Button
            href='/cart'
            id='view-shopping-cart-button'
            size='large'
            variant='pill'
            color='secondary'
            endIcon={<IconSvg src={iconChevronRight} />}
            sx={{ display: 'flex' }}
          >
            <Trans id='View shopping cart' />
          </Button>
        </Box>
        <LayoutHeaderClose />
      </Container>

      {crossSellItems.length > 0 && (
        <>
          <Container maxWidth={false}>
            <Divider />
            <Typography
              variant='h6'
              gutterBottom
              sx={(theme) => ({
                display: { xs: 'block', md: 'none' },
                my: theme.spacings.sm,
                textAlign: 'center',
              })}
            >
              <Trans id='Complete your purchase' />
            </Typography>
          </Container>
          <AddProductsToCartForm>
            <ItemScroller
              sx={(theme) => ({
                width: 'auto',
                mb: theme.page.vertical,
              })}
            >
              {crossSellItems.map((item) => (
                <RenderType
                  key={item.uid ?? ''}
                  renderer={productListRenderer}
                  {...item}
                  sizes={responsiveVal(200, 300)}
                />
              ))}
            </ItemScroller>
          </AddProductsToCartForm>
        </>
      )}
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'added',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'bottom',
    variantSm: 'bottom',
    sizeMd: 'floating',
    sizeSm: 'minimal',
    widthMd: 'auto',
    justifyMd: 'center',
    justifySm: 'stretch',
  },
}
CheckoutAdded.pageOptions = pageOptions

export default CheckoutAdded

export const getStaticProps = enhanceStaticProps<LayoutOverlayProps>(() => ({
  props: {},
}))
