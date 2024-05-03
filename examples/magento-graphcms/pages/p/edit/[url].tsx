import { PageOptions } from '@graphcommerce/framer-next-pages'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import { EditCartItemForm, useEditCartItemFormProps } from '@graphcommerce/magento-cart-items'
import {
  AddProductsToCartFormProps,
  AddProductsToCartForm,
  ProductPageGallery,
  ProductPageName,
  AddProductsToCartButton,
} from '@graphcommerce/magento-product'
import {
  GetServerSideProps,
  LayoutOverlay,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { LayoutNavigationProps } from '../../../components'
import { AddProductsToCartView } from '../../../components/AddProductsToCartView'
import { UspsQuery } from '../../../components/Usps/Usps.gql'
import { ProductPage2Query } from '../../../graphql/ProductPage2.gql'
import { getStaticProps } from '../[url]'

type Props = UspsQuery & ProductPage2Query & Pick<AddProductsToCartFormProps, 'defaultValues'>

type RouteProps = { url: string }
type GetSSP = GetServerSideProps<LayoutNavigationProps, Props, RouteProps>

function ProductPageConfigurable(props: Props) {
  const { products, defaultValues } = props

  const product = products?.items?.[0]

  const formProps = useEditCartItemFormProps()

  if (!product?.sku || !product.url_key) return null

  return (
    <AddProductsToCartForm key={product.uid} defaultValues={defaultValues} {...formProps}>
      {/* <ProductPageMeta product={product} /> */}

      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={() => ({ '&.noAlign': { marginBottom: '0px' } })}
        primary={<AddProductsToCartButton fullWidth product={product} variant='inline' />}
      >
        <LayoutTitle size='small' component='span'>
          <Trans
            id='Editing <Name/>'
            components={{ Name: <ProductPageName product={product} /> }}
          />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <ProductPageGallery
        product={product}
        disableZoom
        sx={(theme) => ({
          mb: 0,
          '& .SidebarGallery-scrollerContainer': {
            [theme.breakpoints.up('md')]: {
              position: 'relative',
            },
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
        <AddProductsToCartView product={product} />
      </ProductPageGallery>
      <EditCartItemForm product={product} />
    </AddProductsToCartForm>
  )
}

ProductPageConfigurable.pageOptions = {
  overlayGroup: 'edit',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '560px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
  },
} as PageOptions

export default ProductPageConfigurable

export const getServerSideProps: GetSSP = async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate

  flushMeasurePerf()
  return result
}
