import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CartAgreementsDocument } from '@graphcommerce/magento-cart/components/CartAgreementsForm/CartAgreements.gql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  PageMeta,
  responsiveVal,
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
import { Container, Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AboutPage() {
  const router = useRouter()
  const { url } = router.query

  const { data } = useQuery(CartAgreementsDocument)

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
AboutPage.pageOptions = pageOptions

export default AboutPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['about/view']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      variant: 'left',
      size: responsiveVal(320, 800),
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
