import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage, CustomerDocument } from '@graphcommerce/magento-customer'
import {
  ProductReviewProductNameDocument,
  CreateProductReviewForm,
} from '@graphcommerce/magento-review'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconBox,
  LayoutOverlayHeader,
  LayoutTitle,
  IconSvg,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountReviewsAddPage() {
  const router = useRouter()
  const { data: customerData, loading: customerLoading, error } = useQuery(CustomerDocument)
  const urlKey = router.query.url_key as string
  const { data: productData, loading: productLoading } = useQuery(
    ProductReviewProductNameDocument,
    { variables: { urlKey } },
  )
  const { data: storeConfigData, loading: loadingStoreConfig } = useQuery(StoreConfigDocument)

  const storeConfig = storeConfigData?.storeConfig
  const customer = customerData?.customer
  const product = productData?.products?.items?.[0]

  if (
    !storeConfig?.product_reviews_enabled ||
    productLoading ||
    loadingStoreConfig ||
    customerLoading
  )
    return <div />

  if (error && !customer && !storeConfig.allow_guests_to_write_product_reviews)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  if (!product) {
    return (
      <FullPageMessage
        title={<Trans id='Product could not be found' />}
        icon={<IconSvg src={iconBox} size='xxl' />}
      >
        <Trans id='Try a different product' />
      </FullPageMessage>
    )
  }

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'You are reviewing {0}', { 0: product?.name })}
        metaRobots={['noindex']}
      />

      <LayoutOverlayHeader>
        <LayoutTitle size='small'>
          <Trans id='You are reviewing {0}' values={{ 0: product?.name }} />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle variant='h2'>
        <Trans id='You are reviewing {0}' values={{ 0: product?.name }} />
      </LayoutTitle>

      <Container maxWidth='md'>
        <CreateProductReviewForm
          sku={product.sku ?? ''}
          nickname={customer ? `${customer?.firstname} ${customer?.lastname}` : undefined}
        />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
  },
}
AccountReviewsAddPage.pageOptions = pageOptions

export default AccountReviewsAddPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(() => ({ props: {} }))
