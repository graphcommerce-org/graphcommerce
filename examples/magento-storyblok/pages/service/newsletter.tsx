import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { GuestNewsletter } from '@graphcommerce/magento-newsletter'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutOverlayHeader, LayoutTitle, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useStoryblokState } from '../../lib/useStoryblokState'
import { Container, Typography } from '@mui/material'
import type { LayoutNavigationProps, LayoutOverlayProps } from '../../components'
import { LayoutDocument, LayoutOverlay } from '../../components'
import { RowRenderer } from '../../components/Storyblok/RowRenderer'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { fetchStory, type StoryblokStory } from '../../lib/storyblok'

type Props = { story: StoryblokStory | null }
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function NewsletterSubscribe(props: Props) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)
  const title = story?.name ?? t`Newsletter`

  return (
    <>
      <PageMeta title={title} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='sm'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      {story?.content?.body && <RowRenderer content={story.content.body} />}

      <Container maxWidth='sm'>
        {story?.name && (
          <Typography variant='h3'>
            <Trans>Subscribe to newsletter</Trans>
          </Typography>
        )}
        <GuestNewsletter />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
NewsletterSubscribe.pageOptions = pageOptions

export default NewsletterSubscribe

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const storyPage = fetchStory('service/newsletter', context, staticClient)

  return {
    props: {
      story: (await storyPage).data?.story ?? null,
      ...(await layout).data,
      up: { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
