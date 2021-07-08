import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../../packages/next-ui/Button'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 500,
  },
}))

function BottomSheetDefault({ url, pages }: Props) {
  const title = `Bottom Sheet`
  const classes = useStyles()

  // TODO: create a context for getting/setting contentHeaderRef & titleRef
  const contentHeaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  //  const stickyTopPosition = useMotionValue<number>(0)
  //  useEffect(() => {
  //    if (!contentHeaderRef?.current) return () => {}

  //    const ro = new ResizeObserver(([entry]) => stickyTopPosition.set(entry.contentRect.height))

  //    ro.observe(contentHeaderRef.current)
  //    return () => ro.disconnect()
  //  }, [stickyTopPosition, contentHeaderRef])

  return (
    <div>
      <SheetContentHeader
        title={
          <Typography variant='h4' component='span'>
            {title}
          </Typography>
        }
        titleRef={titleRef}
        ref={contentHeaderRef}
      />
      <>
        <div ref={titleRef}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              {title}
            </Typography>
          </Box>
        </div>
        <Container maxWidth='md'>
          Hebben standaard geen backbutton, maar alleen een kruisje. Dit kruisje staat rechtsboven.
        </Container>
        <PageLink href='/test/sheet/navigated' passHref>
          <Button variant='outlined' color='secondary'>
            Navigated Bottom Sheet
          </Button>
        </PageLink>
      </>
    </div>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max' },
}
BottomSheetDefault.pageOptions = pageOptions

export default BottomSheetDefault

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
