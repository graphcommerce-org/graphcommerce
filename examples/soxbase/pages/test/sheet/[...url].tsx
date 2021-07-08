import { Box, Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { SheetVariant } from '@reachdigital/framer-sheet'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import ContentHeaderPrimaryAction from '@reachdigital/next-ui/AppShell/ContentHeaderPrimaryAction'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React, { useRef } from 'react'
import Button from '../../../../../packages/next-ui/Button'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

function BottomSheetWithPrimaryActionAndNavigatable({ url, pages }: Props) {
  const title = `${url?.charAt(0).toUpperCase() + url?.slice(1)}`

  const contentHeaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <SheetContentHeader
        title={
          <Typography variant='h4' component='span'>
            {title}
          </Typography>
        }
        ref={contentHeaderRef}
        titleRef={titleRef}
      />
      <>
        <div ref={titleRef}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              {title}
            </Typography>
          </Box>
        </div>

        <ContentHeaderPrimaryAction
          href='/test/sheet/bottom-sheet-navigated'
          text='Bottom Sheet Navigated >'
        />

        <PageLink href='/test/sheet-primary-action/default' passHref>
          <Button variant='outlined' color='secondary'>
            Bottom Sheet + Primary Action
          </Button>
        </PageLink>

        <Container maxWidth='md'>
          Als er binnen een overlay genavigeerd is, krijgen we linksboven een terugknop te zien.
        </Container>
      </>
    </div>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max' },
}
BottomSheetWithPrimaryActionAndNavigatable.pageOptions = pageOptions

export default BottomSheetWithPrimaryActionAndNavigatable

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
