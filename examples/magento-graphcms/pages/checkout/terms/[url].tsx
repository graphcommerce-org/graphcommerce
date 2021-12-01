import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CartAgreementsDocument,
  CartAgreementsQuery,
} from '@graphcommerce/magento-cart/components/CartAgreementsForm/CartAgreements.gql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  PageMeta,
  responsiveVal,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Container, Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'

type Props = { agreement: NonNullable<NonNullable<CartAgreementsQuery['checkoutAgreements']>[0]> }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function TermsPage(props: Props) {
  const { agreement } = props

  const title = agreement?.name ?? ''

  return (
    <>
      <PageMeta title={title} />

      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle>
        <LayoutTitle>{title}</LayoutTitle>
      </LayoutTitle>

      <Container maxWidth='md'>
        <Typography component='div' variant='body1'>
          <div dangerouslySetInnerHTML={{ __html: agreement?.content ?? '' }} />
        </Typography>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
}
TermsPage.pageOptions = pageOptions

export default TermsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  /** Call apolloClient to fetch locale specific agreements from Magento. */
  const path = async (locale: string) => {
    const client = apolloClient(locale)
    const { data } = await client.query({ query: CartAgreementsDocument })
    return (data.checkoutAgreements ?? []).map((agreement) => ({
      locale,
      params: { url: agreement?.name.toLowerCase().replace(/\s+/g, '-') ?? '' },
    }))
  }

  const paths = (await Promise.all(locales.map(path))).flat(1).filter((v) => !!v)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const agreements = await staticClient.query({ query: CartAgreementsDocument })

  const agreement = agreements.data.checkoutAgreements?.find(
    (ca) => ca?.name?.toLowerCase().replace(/\s+/g, '-') === params?.url,
  )

  if (!agreement) return { notFound: true }

  return {
    props: {
      variant: 'left',
      size: responsiveVal(320, 800),
      agreement,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
