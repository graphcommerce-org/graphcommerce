import type { PageOptions } from '@graphcommerce/framer-next-pages'
import type { CartAgreementsQuery } from '@graphcommerce/magento-cart'
import { CartAgreementsDocument, getCheckoutIsDisabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { Container, Typography } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

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

      <LayoutTitle variant='h1'>{title}</LayoutTitle>

      <Container maxWidth='md'>
        <Typography component='div' variant='body1'>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: agreement?.content ?? '' }} />
        </Typography>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: {},
}
TermsPage.pageOptions = pageOptions

export default TermsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  /** Call apolloClient to fetch locale specific agreements from Magento. */
  const path = async (locale: string) => {
    const client = graphqlSsrClient({ locale })
    const { data } = await client.query({ query: CartAgreementsDocument })
    return (data.checkoutAgreements ?? []).map((agreement) => ({
      locale,
      params: { url: agreement?.name.toLowerCase().replace(/\s+/g, '-') ?? '' },
    }))
  }

  const paths = (await Promise.all(locales.map(path))).flat(1).filter((v) => !!v)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const { params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const agreements = await staticClient.query({ query: CartAgreementsDocument })

  const agreement = agreements.data.checkoutAgreements?.find(
    (ca) => ca?.name?.toLowerCase().replace(/\s+/g, '-') === params?.url,
  )

  if (!agreement) return { notFound: true }

  return {
    props: {
      variantMd: 'left',
      agreement,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
