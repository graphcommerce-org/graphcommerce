import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CreateProductReviewForm } from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../../components/AppShell/SheetShell'
import apolloClient from '../../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>

function AccountReviewsAddPage() {
  const router = useRouter()
  const { url } = router.query

  // if (false)
  //   return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

  return (
    <Container maxWidth='md'>
      <PageMeta title='Add review' metaDescription='Add a review' metaRobots={['noindex']} />
      <NoSsr>
        <Typography variant='h1' component='h6'>
          You are reviewing product
        </Typography>
        <p>What do you think of this product?</p>
        <CreateProductReviewForm sku={(url as string) ?? ''} />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedKey: () => 'page',
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
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
