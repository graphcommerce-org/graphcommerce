import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
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
import type { GetServerSideProps, LayoutOverlayProps } from '@graphcommerce/next-ui'
import {
  Container,
  FullPageMessage,
  iconShoppingBag,
  LayoutOverlay,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
  PageMeta,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { CircularProgress, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../../../components'
import { AddProductsToCartView } from '../../../components'
import type { Props } from '../../p/[url]'
import { getStaticProps } from '../../p/[url]'

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
      <PageMeta title={t`Cart`} metaRobots={['noindex']} />

      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={() => ({ '&.noAlign': { marginBottom: '0px' } })}
        primary={<>&nbsp;</>}
      >
        <LayoutTitle size='small' component='span' icon={iconShoppingBag}>
          <Trans>Editing product</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>}>
            <Trans>This may take a second</Trans>
          </FullPageMessage>
        }
      >
        {!cartItem && (
          <EmptyCart disableMargin>
            {cart.error && <ApolloCartErrorAlert error={cart.error} />}
          </EmptyCart>
        )}
        {cartItem && (
          <Container maxWidth='500px'>
            <EditCartItemForm
              key={cartItem.uid}
              href='/cart'
              product={product}
              cartItem={cartItem}
              defaultValues={defaultValues}
              redirect={false}
              snackbarProps={{ disableSuccessSnackbar: true }}
            >
              <ProductPageGallery
                product={product}
                disableZoom
                disableSticky
                variantMd='oneColumn'
                sx={(theme) => ({
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
