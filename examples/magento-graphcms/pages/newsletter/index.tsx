import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container } from '@mui/material'
import {
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'

import { GuestNewsletter } from '../../components/Newsletter/GuestNewsletter'

type Props = HygraphPagesQuery
type RouteProps = { url: string[] }

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

export const getStaticProps = enhanceStaticProps<LayoutNavigationProps, Props, RouteProps>(
  async () => {
    const url = `newsletter`
    const page = hygraphPageContent(url)

    if (!(await page).data.pages?.[0]) return { notFound: true }

    return {
      props: {
        ...(await page).data,
        ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
      },
      revalidate: 60 * 20,
    }
  },
)
