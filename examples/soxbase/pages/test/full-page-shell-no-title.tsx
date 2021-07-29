import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { AppShellTitle, GetStaticProps, PageShellHeader } from '@reachdigital/next-ui'
import React from 'react'
import FullPageShell from '../../components/AppShell/FullPageShell'
import { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 1500,
  },
}))

function FullAppShellNoTitle(props: Props) {
  const { url, pages } = props
  const classes = useStyles()

  return (
    <>
      <PageShellHeader backFallbackHref='/' backFallbackTitle='Home' />
      <Container maxWidth='md' className={classes.longContent}>
        <AppShellTitle>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Full Page UI
            </Typography>
          </Box>
        </AppShellTitle>
        When life gives you lemons, you want to wear bananas. That’s how we roll. And no matter if
        you choose those bananas or rather go with kiwis, pears or apples - you’ll always feel fresh
        and fruity.
      </Container>
    </>
  )
}

FullAppShellNoTitle.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default FullAppShellNoTitle

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `test/${url}`,
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
