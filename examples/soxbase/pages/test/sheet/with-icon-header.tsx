import { Box, Container, makeStyles, Theme } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import ContentHeader from '@reachdigital/next-ui/AppShell/ContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../../packages/next-ui/Button'
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

function BottomSheetCross({ url, pages }: Props) {
  const title = `Icon Header`
  const classes = useStyles()

  // TODO: in sheet context as 'sheetTitle' ??
  // or: useContentHeaderAnimation() hook?
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
    <div>
      <ContentHeader
        // primary={<ContentHeaderPrimaryAction href='/test/overlay/bottom/2' text='Next' />}
        // logo={<Logo />}
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
        animateStart={animateStart}
        // divider={<ContentHeaderStepper steps={3} currentStep={1} />}
      />
      <>
        <div ref={titleRefCallback}>
          <Box textAlign='center' mb={3}>
            <IconHeader src={iconPersonAlt} title={title} alt={title} size='medium' />
          </Box>
        </div>
        <Container maxWidth='md' className={classes.longContent}>
          Als een titel een icon heeft en wordt gescrollt dan fade deze ook in in de header
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
BottomSheetCross.pageOptions = pageOptions

export default BottomSheetCross

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
