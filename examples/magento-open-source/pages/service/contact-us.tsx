import { PageOptions } from '@graphcommerce/framer-next-pages'
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
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ContactUs(props: Props) {
  const title = t`Contact us`

  return (
    <>
      <PageMeta title={title} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      <Container maxWidth='md'>
        <Typography variant='h3'>{title}</Typography>
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
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  if (import.meta.graphCommerce.magentoVersion < 247) return { notFound: true }

  return {
    props: {
      ...(await layout).data,
      up: { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
