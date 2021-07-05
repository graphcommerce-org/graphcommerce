import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import ContentHeaderStepper from '@reachdigital/next-ui/AppShell/ContentHeaderStepper'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React, { useEffect, useRef, useState } from 'react'
import ContentHeaderPrimaryAction from '../../../../../packages/next-ui/AppShell/ContentHeaderPrimaryAction'
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

function BottomSheetWithStepper({ url, pages }: Props) {
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
      <SheetContentHeader
        primary={<ContentHeaderPrimaryAction href='/test/overlay/bottom/2' text='Next' />}
        // logo={<Logo />}
        title={
          <Typography variant='h4' component='span'>
            Bottom Sheet Stepper
          </Typography>
        }
        animateStart={animateStart}
        divider={<ContentHeaderStepper steps={3} currentStep={2} />}
      />
      <>
        <div ref={titleRefCallback}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Bottom Sheet Stepper
            </Typography>
          </Box>
        </div>
        <Container maxWidth='md' className={classes.longContent}>
          De stepper vervangt de bottom border van de header welke je bij scrollen ziet.
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
BottomSheetWithStepper.pageOptions = pageOptions

export default BottomSheetWithStepper

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
