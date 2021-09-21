import { useQuery } from '@apollo/client'
import { Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CheckoutAgreementsDocument } from '@reachdigital/magento-cart-checkout'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  PageMeta,
  responsiveVal,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps>

function LegalView() {
  const router = useRouter()
  const { url } = router.query

  const { data } = useQuery(CheckoutAgreementsDocument, {
    fetchPolicy: 'network-only', // agreements should always be up-to-date
  })

  const agreement = data?.checkoutAgreements?.find(
    (ca) => ca && ca.name && ca.name.toLowerCase().replaceAll(' ', '-') === url,
  )

  const title = agreement?.name ?? ''

  return (
    <>
      <PageMeta title={title} />

      <SheetShellHeader hideDragIndicator>
        <Title component='span' size='small'>
          {title}
        </Title>
      </SheetShellHeader>

      <AppShellTitle>
        <Title>{title}</Title>
      </AppShellTitle>

      <Container maxWidth='md'>
        <Typography component='div' variant='body1'>
          <div dangerouslySetInnerHTML={{ __html: agreement?.content ?? '' }} />
        </Typography>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
}
LegalView.pageOptions = pageOptions

export default LegalView

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['legal/view']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      backFallbackHref: '/checkout',
      backFallbackTitle: 'Checkout',
      variant: 'left',
      size: responsiveVal(320, 800),
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
