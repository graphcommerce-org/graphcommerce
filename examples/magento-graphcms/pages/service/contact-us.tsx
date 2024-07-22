import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { cacheFirst } from '@graphcommerce/graphql'
import { ContactForm } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import {
  LayoutDocument,
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ContactUs({ pages }: Props) {
  const page = pages?.[0]
  const title = page?.title ?? t`Contact us`

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        canonical={pages?.[0]?.url ? `/${pages[0].url}` : undefined}
      />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      <RowRenderer {...pages[0]} />

      <Container maxWidth='md'>
        {page?.title && <Typography variant='h3'>{t`Contact us`}</Typography>}
        <ContactForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
ContactUs.pageOptions = pageOptions

export default ContactUs

export const getStaticProps: GetPageStaticProps = async (context) => {
  const url = `service/contact-us`
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const page = hygraphPageContent(staticClient, url)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  if (import.meta.graphCommerce.magentoVersion < 247) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
