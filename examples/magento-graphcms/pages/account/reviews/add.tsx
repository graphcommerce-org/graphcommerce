import { useQuery } from '@apollo/client'
import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
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
  SvgImageSimple,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container } from '@material-ui/core'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountReviewsAddPage() {
  const router = usePageRouter()
  const { data: customerData, loading: customerLoading, error } = useQuery(CustomerDocument)
  const { sku } = router.query
  const { data: productData, loading: productLoading } = useQuery(
    ProductReviewProductNameDocument,
    {
      variables: {
        sku: sku as string,
      },
    },
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
        title={t`Product could not be found`}
        icon={<SvgImageSimple src={iconBox} size='xxl' />}
      >
        <Trans>Try a different product</Trans>
      </FullPageMessage>
    )
  }

  return (
    <>
      <PageMeta
        title={t`Add review`}
        metaDescription={t`You are reviewing ${product?.name}`}
        metaRobots={['noindex']}
      />

      <LayoutOverlayHeader>
        <LayoutTitle size='small'>
          <Trans>You are reviewing {product?.name}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle>
        <Trans>You are reviewing {product?.name}</Trans>
      </LayoutTitle>

      <Container maxWidth='md'>
        <CreateProductReviewForm
          sku={(sku as string) ?? ''}
          nickname={customer ? `${customer?.firstname} ${customer?.lastname}` : undefined}
        />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
}
AccountReviewsAddPage.pageOptions = pageOptions

export default AccountReviewsAddPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
