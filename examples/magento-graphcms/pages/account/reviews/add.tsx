import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage, CustomerDocument } from '@graphcommerce/magento-customer'
import {
  ProductReviewProductNameDocument,
  CreateProductReviewForm,
} from '@graphcommerce/magento-review'
import { MagentoEnv, PageMeta } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconBox,
  LayoutOverlayHeader,
  LayoutTitle,
  IconSvg,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

function AccountReviewsAddPage() {
  const router = useRouter()
  const { data: customerData, loading: customerLoading, error } = useQuery(CustomerDocument)
  const urlKey = router.query.url_key as string
  const { data: productData, loading: productLoading } = useQuery(
    ProductReviewProductNameDocument,
    { variables: { urlKey } },
  )

  const customer = customerData?.customer
  const product = productData?.products?.items?.[0]

  if ((process.env as MagentoEnv).NEXT_PUBLIC_REVIEWS_ENABLED !== '1') return null

  if (productLoading || customerLoading) return null

  if (error && !customer && (process.env as MagentoEnv).NEXT_PUBLIC_REVIEWS_GUEST !== '1')
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
        icon={<IconSvg src={iconBox} size='xxl' />}
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

      <LayoutTitle variant='h1'>
        <Trans>You are reviewing {product?.name}</Trans>
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
