import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image } from '@graphcommerce/image'
import { useCrosssellItems } from '@graphcommerce/magento-cart'
import { AddProductsToCartForm, ProductScroller } from '@graphcommerce/magento-product'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  Button,
  GetStaticProps,
  iconChevronRight,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { LayoutOverlay, LayoutOverlayProps, productListRenderer } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CheckoutAdded() {
  const [addedItem, crossSellItems] = useCrosssellItems()
  const a11yFocusRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    a11yFocusRef.current?.focus()
  }, [])

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
        {addedItem?.product.thumbnail?.url ? (
          <Image
            src={addedItem?.product.thumbnail?.url}
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
          <Box sx={{ typography: 'h6' }} tabIndex={-1} ref={a11yFocusRef}>
            <Trans
              id='<0>{name}</0> has been added to your shopping cart!'
              components={{ 0: <strong /> }}
              values={{ name: addedItem?.product.name }}
            />
          </Box>
          {crossSellItems.length > 0 && (
            <Box sx={{ typography: 'body1', display: { xs: 'none', md: 'block' } }} tabIndex={0}>
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
          <AddProductsToCartForm
            disableSuccessSnackbar
            redirect={import.meta.graphCommerce.crossSellsRedirectItems ? 'added' : false}
          >
            <ProductScroller
              productListRenderer={productListRenderer}
              items={crossSellItems}
              sx={(theme) => ({ mb: theme.page.vertical })}
            />
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
