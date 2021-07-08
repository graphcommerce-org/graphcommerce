import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React, { useRef } from 'react'
import ContentHeaderPrimaryAction from '../../../../../packages/next-ui/AppShell/ContentHeaderPrimaryAction'
import Stepper from '../../../../../packages/next-ui/Stepper/Stepper'
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

function BottomSheetWithStepperScrollable({ url, pages }: Props) {
  const classes = useStyles()

  // TODO: create a context for getting/setting contentHeaderRef & titleRef
  const contentHeaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

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
        titleRef={titleRef}
        ref={contentHeaderRef}
        divider={<Stepper steps={3} currentStep={2} />}
      />
      <>
        <div ref={titleRef}>
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
BottomSheetWithStepperScrollable.pageOptions = pageOptions

export default BottomSheetWithStepperScrollable

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
