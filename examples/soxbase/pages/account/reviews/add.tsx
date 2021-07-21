import { useQuery } from '@apollo/client'
import { Box, Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ApolloCustomerErrorFullPage, CustomerDocument } from '@reachdigital/magento-customer'
import {
  ProductReviewProductNameDocument,
  CreateProductReviewForm,
} from '@reachdigital/magento-review'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { FullPageMessage, responsiveVal, SvgImage, iconBox } from '@reachdigital/next-ui'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountReviewsAddPage() {
  const router = useRouter()
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

  if (productLoading || loadingStoreConfig) return <></>

  if (!storeConfig?.product_reviews_enabled) return null

  if (customerLoading) return <></>
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
        title='Product could not be found'
        description='Try a different product'
        icon={<SvgImage src={iconBox} size={148} alt='box' />}
      />
    )
  }

  return (
    <Container maxWidth='md'>
      <PageMeta title='Add review' metaDescription='Add a review' metaRobots={['noindex']} />
      <NoSsr>
        <Box mb={8} mt={8} textAlign='center'>
          <Typography variant='h3' component='h1' gutterBottom>
            You are reviewing {product?.name}
          </Typography>
          <Typography variant='body1'>What do you think of this product?</Typography>

          <Box textAlign='center' p={2} mt={2}>
            <CreateProductReviewForm
              sku={(sku as string) ?? ''}
              nickname={customer ? `${customer?.firstname} ${customer?.lastname}` : undefined}
            />
          </Box>
        </Box>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
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
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
