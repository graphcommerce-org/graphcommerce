import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { ContactForm } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { LayoutOverlayHeader, LayoutTitle, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
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

function ContactUs(props: Props) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)
  const title = story?.name ?? t`Contact us`

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

      {story?.content?.body && <RowRenderer content={story.content.body} />}

      <Container maxWidth='md'>
        {story?.name && <Typography variant='h3'>{t`Contact us`}</Typography>}
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

  if (magentoVersion < 247) return { notFound: true }

  const storyPage = fetchStory('service/contact-us', context, staticClient)

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
