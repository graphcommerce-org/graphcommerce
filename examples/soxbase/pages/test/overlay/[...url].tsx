import { Container, makeStyles, Theme } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { SheetVariant } from '@reachdigital/framer-sheet'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetPrimaryAction from '@reachdigital/next-ui/AppShell/SheetPrimaryAction'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { iconPersonAlt } from '@reachdigital/next-ui/icons'
import { GetStaticPaths } from 'next'
import React from 'react'
import SheetContent from '../../../../../packages/next-ui/AppShell/SheetContent'
import SheetContentHeader from '../../../../../packages/next-ui/AppShell/SheetContentHeader'
import SheetContentTitle from '../../../../../packages/next-ui/AppShell/SheetContentTitle'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  hoi: {
    height: '2000px',
  },
}))

function AppShellTextOverlay({ url, pages }: Props) {
  const title = `Overlay ${url?.charAt(0).toUpperCase() + url?.slice(1)}`
  const classes = useStyles()

  return (
    <SheetContent>
      <SheetContentHeader
        primary={<SheetPrimaryAction href='/test/overlay/bottom/2' text='Next' />}
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
          />
        }
      />

      <SheetContentTitle>
        <IconHeader src={iconPersonAlt} title={title} alt={title} size='large' />
      </SheetContentTitle>

      <Container maxWidth='md'>
        <p className={classes.hoi}>Content here</p>
      </Container>
    </SheetContent>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max' },
}
AppShellTextOverlay.pageOptions = pageOptions

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['1']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [variant] = params?.url ?? 'bottom'
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

  const variants = ['top', 'bottom', 'left', 'right']

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variant: variants.includes(variant) ? (variant as SheetVariant) : 'bottom',
    },
  }
}
