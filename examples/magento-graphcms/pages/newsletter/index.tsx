import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import Container from '@mui/material/Container'
import {
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { GuestNewsletter } from '../../components/Newsletter/GuestNewsletter'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function NewsletterSubscribe({ pages }: Props) {
  const page = pages?.[0]
  const title = page.title ?? ''

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        canonical={pages?.[0]?.url ? `/${pages[0].url}` : undefined}
      />
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={(theme) => ({
          '&.noAlign': { marginBottom: theme.spacings.sm },
          '& + .MuiContainer-root': {
            marginBottom: theme.spacings.sm,
          },
        })}
      >
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <RowRenderer {...pages[0]} />

      <Container maxWidth={false}>
        <GuestNewsletter />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    sizeMd: 'floating',
    justifyMd: 'end',
    widthMd: '500px',

    sizeSm: 'floating',
  },
}
NewsletterSubscribe.pageOptions = pageOptions

export default NewsletterSubscribe

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const url = `newsletter`
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({ query: DefaultPageDocument, variables: { url } })
  const layout = staticClient.query({ query: LayoutDocument })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
