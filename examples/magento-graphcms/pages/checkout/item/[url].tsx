import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import { ApolloCartErrorAlert, EmptyCart, useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import {
  EditCartItemButton,
  EditCartItemForm,
  useEditCartItemFormProps,
} from '@graphcommerce/magento-cart-items'
import {
  AddProductsToCartFormProps,
  AddProductsToCartForm,
  ProductPageGallery,
  ProductPageName,
} from '@graphcommerce/magento-product'
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
import { CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutNavigationProps } from '../../../components'
import { AddProductsToCartView } from '../../../components/ProductView/AddProductsToCartView'
import { UspsQuery } from '../../../components/Usps/Usps.gql'
import { ProductPage2Query } from '../../../graphql/ProductPage2.gql'
import { getStaticProps } from '../../p/[url]'

type Props = UspsQuery & ProductPage2Query & Pick<AddProductsToCartFormProps, 'defaultValues'>

type RouteProps = { url: string }
type GetSSP = GetServerSideProps<LayoutNavigationProps, Props, RouteProps>

function CartItemEdit(props: Props) {
  const { products, defaultValues } = props
  const product = products?.items?.[0]
  const formProps = useEditCartItemFormProps({ href: '/cart' })

  const cart = useCartQuery(CartPageDocument)
  const { cartItemId } = useRouter().query
  const cartItem = cart.data?.cart?.items?.find((item) => item?.uid === cartItemId)

  if (!product?.sku || !product.url_key) return null

  return (
    <WaitForQueries
      waitFor={cart}
      fallback={
        <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
          <Trans id='This may take a second' />
        </FullPageMessage>
      }
    >
      <AddProductsToCartForm
        key={product.uid}
        defaultValues={defaultValues}
        redirect={false}
        disableSuccessSnackbar
        {...formProps}
      >
        <PageMeta title={i18n._(/* i18n */ 'Cart')} metaRobots={['noindex']} />

        <LayoutOverlayHeader
          switchPoint={0}
          noAlign
          sx={() => ({ '&.noAlign': { marginBottom: '0px' } })}
          primary={<>&nbsp;</>}
          // primary={<AddProductsToCartButton fullWidth product={product} variant='inline' />}
        >
          <LayoutTitle size='small' component='span' icon={iconShoppingBag}>
            <Trans id='Editing product' />
          </LayoutTitle>
        </LayoutOverlayHeader>

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
        <EditCartItemForm product={product} cartItem={cartItem} />
        <OverlayStickyBottom sx={{ display: 'flex', justifyContent: 'center' }}>
          <EditCartItemButton product={product} sx={(theme) => ({ my: theme.spacings.md })} />
        </OverlayStickyBottom>
      </AddProductsToCartForm>
    </WaitForQueries>
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
  const result = await getStaticProps(context)
  delete result.revalidate

  flushMeasurePerf()

  if ('props' in result) return { props: { ...result.props, up: null } }
  return result
}
