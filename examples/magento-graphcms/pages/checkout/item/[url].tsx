import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  EmptyCart,
  getCartDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import {
  EditCartItemButton,
  EditCartItemForm,
  useEditItem,
} from '@graphcommerce/magento-cart-items'
import { ProductPageGallery, ProductPageName } from '@graphcommerce/magento-product'
import {
  FullPageMessage,
  GetServerSideProps,
  LayoutOverlay,
  LayoutOverlayHeader,
  LayoutOverlayProps,
  LayoutTitle,
  OverlayStickyBottom,
  PageMeta,
  iconShoppingBag,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Typography } from '@mui/material'
import { LayoutNavigationProps, AddProductsToCartView } from '../../../components'
import { Props, getStaticProps } from '../../p/[url]'

type RouteProps = { url: string }
type GetSSP = GetServerSideProps<LayoutNavigationProps, Props, RouteProps>

function CartItemEdit(props: Props) {
  const { products, defaultValues } = props
  const product = products?.items?.[0]

  const cart = useCartQuery(CartPageDocument)
  const cartItem = useEditItem(cart.data?.cart)

  if (!product?.sku || !product.url_key) return null

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Cart')} metaRobots={['noindex']} />

      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={() => ({ '&.noAlign': { marginBottom: '0px' } })}
        primary={<>&nbsp;</>}
      >
        <LayoutTitle size='small' component='span' icon={iconShoppingBag}>
          <Trans id='Editing product' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {!cartItem && (
          <EmptyCart disableMargin>
            {cart.error && <ApolloCartErrorAlert error={cart.error} />}
          </EmptyCart>
        )}
        {cartItem && (
          <Container>
            <EditCartItemForm
              key={cartItem.uid}
              href='/cart'
              product={product}
              cartItem={cartItem}
              defaultValues={defaultValues}
              redirect={false}
              disableSuccessSnackbar
            >
              <ProductPageGallery
                product={product}
                disableZoom
                disableSticky
                variantMd='oneColumn'
                sx={(theme) => ({
                  maxWidth: '500px',
                  mb: 0,
                  '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
                })}
              >
                <Typography variant='h3' component='div' gutterBottom>
                  <ProductPageName product={product} />
                </Typography>
                <AddProductsToCartView product={product} />
              </ProductPageGallery>
              <OverlayStickyBottom sx={{ display: 'flex', justifyContent: 'center' }}>
                <EditCartItemButton product={product} sx={(theme) => ({ my: theme.spacings.sm })} />
              </OverlayStickyBottom>
            </EditCartItemForm>
          </Container>
        )}
      </WaitForQueries>
    </>
  )
}

CartItemEdit.pageOptions = {
  overlayGroup: 'cart',
  sharedKey: ({ asPath }) => asPath,
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '900px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
  },
} as PageOptions<LayoutOverlayProps>

export default CartItemEdit

export const getServerSideProps: GetSSP = async (context) => {
  if (getCartDisabled(context.locale)) return { notFound: true }
  const result = await getStaticProps(context)
  delete result.revalidate

  flushMeasurePerf()

  if ('props' in result) return { props: { ...result.props, up: null } }
  return result
}
