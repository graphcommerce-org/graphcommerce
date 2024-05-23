import { PageOptions, useHistoryGo, useHistoryLink } from '@graphcommerce/framer-next-pages'
import { flushMeasurePerf } from '@graphcommerce/graphql'
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
import { LayoutNavigationProps } from '../../../components'
import { AddProductsToCartView } from '../../../components/AddProductsToCartView'
import { UspsQuery } from '../../../components/Usps/Usps.gql'
import { ProductPage2Query } from '../../../graphql/ProductPage2.gql'
import { getStaticProps } from '../../p/[url]'
import { Typography } from '@mui/material'

type Props = UspsQuery & ProductPage2Query & Pick<AddProductsToCartFormProps, 'defaultValues'>

type RouteProps = { url: string }
type GetSSP = GetServerSideProps<LayoutNavigationProps, Props, RouteProps>

function CartItemEdit(props: Props) {
  const { products, defaultValues } = props
  const product = products?.items?.[0]
  const formProps = useEditCartItemFormProps({ href: '/cart' })

  if (!product?.sku || !product.url_key) return null

  return (
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
          <Trans id='Cart' components={{ Name: <ProductPageName product={product} /> }} />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <ProductPageGallery
        product={product}
        disableZoom
        disableSticky
        sx={(theme) => ({
          maxWidth: '500px',
          mb: 0,
          '& .SidebarGallery-scrollerContainer': {
            height: '100%',
            top: 0,
          },
          '& .SidebarGallery-root': {
            [theme.breakpoints.up('md')]: {
              gridTemplate: '"left" "right"',
            },
          },
          '& .SidebarGallery-sidebar': {
            display: 'grid',
            rowGap: theme.spacings.sm,
            p: theme.spacings.md,
            px: theme.page.horizontal,
          },
        })}
      >
        <div>
          <Typography component='div' variant='body1' color='text.disabled'>
            <Trans id='Editing' />
          </Typography>

          <Typography variant='h3' component='div' gutterBottom>
            <ProductPageName product={product} />
          </Typography>
        </div>

        <AddProductsToCartView product={product} />
        <OverlayStickyBottom sx={{ display: 'flex', justifyContent: 'center' }}>
          <EditCartItemButton product={product} sx={(theme) => ({ mb: theme.spacings.md })} />
        </OverlayStickyBottom>
      </ProductPageGallery>
      <EditCartItemForm product={product} />
    </AddProductsToCartForm>
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
