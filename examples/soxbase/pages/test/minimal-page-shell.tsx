import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import PageContentHeader from '@reachdigital/next-ui/AppShell/PageContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React, { useRef } from 'react'
import ContentHeaderPrimaryAction from '../../../../packages/next-ui/AppShell/ContentHeaderPrimaryAction'
import Logo from '../../components/AppShell/Logo'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 800,
  },
}))

function MinimalAppShellTestIndex(props: Props) {
  const { url, pages } = props
  const classes = useStyles()

  const contentHeaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <PageContentHeader
        primary={<ContentHeaderPrimaryAction href='/test/minimal-page-shell' text='Next' />}
        logo={<Logo />}
        title={
          <Typography variant='h4' component='span'>
            Minimal UI
          </Typography>
        }
        ref={contentHeaderRef}
        titleRef={titleRef}
      />
      <Container maxWidth='md' className={classes.longContent}>
        <div ref={titleRef}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Minimal UI
            </Typography>
          </Box>
        </div>
        Functioneert bijna het zelfde als de Bottom Sheet maar nu standaard een logo. Na scrollen
        wordt het logo vervangen (crossfade) door de content titel.
      </Container>
    </>
  )
}

MinimalAppShellTestIndex.pageOptions = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default MinimalAppShellTestIndex

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `/test/${url}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
