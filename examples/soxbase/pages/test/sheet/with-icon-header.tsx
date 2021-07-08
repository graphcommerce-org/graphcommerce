import { Box, Container, makeStyles, Theme } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetContent from '../../../../../packages/next-ui/AppShell/SheetContent'
import SheetContentTitle from '../../../../../packages/next-ui/AppShell/SheetContentTitle'
import IconHeader from '../../../../../packages/next-ui/IconHeader'
import { iconPersonAlt } from '../../../../../packages/next-ui/icons'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 900,
  },
}))

function BottomSheetWithIconHeader({ url, pages }: Props) {
  const title = `Icon Header mega lnage title`
  const classes = useStyles()

  return (
    <SheetContent>
      <SheetContentHeader
        title={
          <IconHeader
            src={iconPersonAlt}
            title={title}
            alt={title}
            size='medium'
            iconSize={32}
            iconSizeMobile={24}
            stayInline
            noMargin
            ellipsis
          />
        }
      />

      <Container maxWidth='md' className={classes.longContent}>
        <SheetContentTitle>
          <Box textAlign='center' mb={3}>
            <IconHeader src={iconPersonAlt} title={title} alt={title} size='medium' />
          </Box>
        </SheetContentTitle>
        Als een titel een icon heeft en wordt gescrollt dan fade deze ook in in de header
      </Container>
    </SheetContent>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max' },
}
BottomSheetWithIconHeader.pageOptions = pageOptions

export default BottomSheetWithIconHeader

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
    },
  }
}
