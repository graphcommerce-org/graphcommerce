import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader, LayoutTitle, YoutubeEmbed } from '@graphcommerce/next-ui'
import { Box, Container, Divider, Typography } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutMinimal } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

export default function YoutubeEmbedPage() {
  return (
    <>
      <LayoutHeader />
      <Container>
        <LayoutTitle variant='h1'>YoutubeEmbed</LayoutTitle>

        <Typography variant='h2' sx={{ mt: 8 }}>
          Default (16:9)
        </Typography>
        <Typography variant='body2' sx={{ mb: 2, color: 'text.secondary' }}>
          Click the poster to load the iframe. Hovering preconnects to YouTube
          for faster playback start.
        </Typography>
        <Box sx={{ maxWidth: 720 }}>
          <YoutubeEmbed
            id='dQw4w9WgXcQ'
            title='Rick Astley — Never Gonna Give You Up'
          />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Typography variant='h2'>Custom aspect ratio (1:1)</Typography>
        <Box sx={{ maxWidth: 480 }}>
          <YoutubeEmbed
            id='M7lc1UVf-VE'
            title='YouTube IFrame API demo'
            aspectWidth={1}
            aspectHeight={1}
          />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Typography variant='h2'>Playlist (with no-cookie disabled)</Typography>
        <Typography variant='body2' sx={{ mb: 2, color: 'text.secondary' }}>
          `playlist` plays a list. `cookie` opts in to youtube.com instead of
          youtube-nocookie.com.
        </Typography>
        <Box sx={{ maxWidth: 720 }}>
          <YoutubeEmbed
            id='PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf'
            playlistCoverId='dQw4w9WgXcQ'
            playlist
            cookie
            title='Sample YouTube playlist'
          />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Typography variant='h2'>Muted + custom poster resolution</Typography>
        <Box sx={{ maxWidth: 720 }}>
          <YoutubeEmbed
            id='aqz-KE-bpKQ'
            title='Big Buck Bunny'
            muted
            poster='maxresdefault'
          />
        </Box>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
YoutubeEmbedPage.pageOptions = pageOptions

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
