import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import PageContentHeader from '@reachdigital/next-ui/AppShell/PageContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React, { useEffect, useRef, useState } from 'react'
import ContentHeaderPrimaryAction from '../../../../packages/next-ui/AppShell/ContentHeaderPrimaryAction'
import ContentHeaderStepper from '../../../../packages/next-ui/AppShell/ContentHeaderStepper'
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

  // TODO: something like useContentHeaderTitleOffset() hook or something more abstract like 'useElementOffset()' hook?
  const titleRefInternal = useRef<HTMLDivElement>()
  const [titleRef, setTitleRef] = useState<React.MutableRefObject<HTMLDivElement | undefined>>()
  const titleRefCallback: React.RefCallback<HTMLDivElement> = (node) => {
    titleRefInternal.current = node ?? undefined
    setTitleRef(titleRefInternal)
  }
  const [animateStart, setAnimateStart] = useState<number | undefined>(undefined)

  useEffect(() => {
    setAnimateStart(
      ((titleRef?.current?.offsetTop ?? 0) + (titleRef?.current?.clientHeight ?? 0)) * 0.5,
    )
  }, [titleRef])

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
        animateStart={animateStart}
        divider={<ContentHeaderStepper steps={3} currentStep={1} />}
      />
      <Container maxWidth='md' className={classes.longContent}>
        <div ref={titleRefCallback}>
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
