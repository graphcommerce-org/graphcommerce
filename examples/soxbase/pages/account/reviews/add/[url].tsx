import { useQuery } from '@apollo/client'
import { Box, Container, makeStyles, NoSsr, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CreateProductReviewForm, CustomerDocument } from '@reachdigital/magento-customer'
import { ProductBySkuDocument } from '@reachdigital/magento-product'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import MessageAuthRequired from '../../../../../../packages/next-ui/MessageAuthRequired'
import SheetShell, { SheetShellProps } from '../../../../components/AppShell/SheetShell'
import apolloClient from '../../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    subtitle: {
      fontWeight: 400,
    },
  }),
  {
    name: 'AccountsReviewsAddPage',
  },
)

function AccountReviewsAddPage() {
  const router = useRouter()
  const { url } = router.query
  const classes = useStyles()

  const { data: customerData, loading: customerLoading } = useQuery(CustomerDocument)

  const { data: productData, loading: productLoading } = useQuery(ProductBySkuDocument, {
    variables: {
      sku: url as string,
    },
  })

  const customer = customerData?.customer
  const product = productData?.products?.items?.[0]

  if (!customerLoading && !customer)
    return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

  if (productLoading) return <></>

  return (
    <Container maxWidth='md'>
      <PageMeta title='Add review' metaDescription='Add a review' metaRobots={['noindex']} />
      <NoSsr>
        <Box p={10} textAlign='center'>
          <Box mb={6} textAlign='center'>
            <Typography variant='h3' component='h1' gutterBottom>
              You are reviewing {product?.name}
            </Typography>
            <Typography variant='h5' className={classes.subtitle}>
              What do you think of this product?
            </Typography>
          </Box>
          <CreateProductReviewForm
            sku={(url as string) ?? ''}
            nickname={`${customer?.firstname} ${customer?.lastname}`}
          />
        </Box>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedKey: () => 'reviews',
  sharedProps: { variant: 'left', size: responsiveVal(520, 1000) },
}
AccountReviewsAddPage.pageOptions = pageOptions

export default AccountReviewsAddPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['add']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

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
