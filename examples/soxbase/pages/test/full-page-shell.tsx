import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import PageContentHeader from '@reachdigital/next-ui/AppShell/PageContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetContent from '../../../../packages/next-ui/AppShell/SheetContent'
import SheetContentTitle from '../../../../packages/next-ui/AppShell/SheetContentTitle'
import SheetPrimaryAction from '../../../../packages/next-ui/AppShell/SheetPrimaryAction'
import FullPageShell from '../../components/AppShell/FullPageShell'
import Logo from '../../components/AppShell/Logo'
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

function FullAppShellTestIndex(props: Props) {
  const { url, pages } = props
  const classes = useStyles()

  return (
    <SheetContent>
      <PageContentHeader
        // primary={<SheetPrimaryAction href='/test/minimal-page-shell' text='Next' />}
        logo={<Logo />}
        title={
          <Typography variant='h4' component='span'>
            Full Page UI
          </Typography>
        }
      />
      <Container maxWidth='md' className={classes.longContent}>
        <SheetContentTitle>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Full Page UI
            </Typography>
          </Box>
        </SheetContentTitle>
        Functioneert bijna het zelfde als de Bottom Sheet maar nu standaard een logo. Na scrollen
        wordt het logo vervangen (crossfade) door de content titel.
      </Container>
    </SheetContent>
  )
}

FullAppShellTestIndex.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default FullAppShellTestIndex

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
