import { useQuery } from '@apollo/client'
import { Box, Container, makeStyles, NoSsr, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CreateProductReviewForm, CustomerDocument } from '@reachdigital/magento-customer'
import { ProductReviewProductNameDocument } from '@reachdigital/magento-product-review'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import FullPageMessage from '@reachdigital/next-ui/FullPageMessage'
import MessageAuthRequired from '@reachdigital/next-ui/MessageAuthRequired'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconBox } from '@reachdigital/next-ui/icons'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    subtitle: {
      fontWeight: 400,
    },
    box: {
      padding: theme.spacings.lg,
    },
  }),
  {
    name: 'AccountsReviewsAddPage',
  },
)

function AccountReviewsAddPage() {
  const router = useRouter()
  const classes = useStyles()

  const { data: customerData, loading: customerLoading } = useQuery(CustomerDocument)

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

  if (!storeConfig?.product_reviews_enabled) return <></>

  if (!storeConfig.allow_guests_to_write_product_reviews && !customerLoading && !customer)
    return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

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
        <Box textAlign='center' className={classes.box}>
          <Box mb={6} textAlign='center'>
            <Typography variant='h3' component='h1' gutterBottom>
              You are reviewing {product?.name}
            </Typography>
            <Typography variant='h5' className={classes.subtitle}>
              What do you think of this product?
            </Typography>
          </Box>
          <CreateProductReviewForm
            sku={(sku as string) ?? ''}
            nickname={customer ? `${customer?.firstname} ${customer?.lastname}` : undefined}
          />
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
