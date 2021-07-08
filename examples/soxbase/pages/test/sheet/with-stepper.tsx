import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetContent from '@reachdigital/next-ui/AppShell/SheetContent'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import SheetContentTitle from '@reachdigital/next-ui/AppShell/SheetContentTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetPrimaryAction from '../../../../../packages/next-ui/AppShell/SheetPrimaryAction'
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

function BottomSheetWithStepper({ url, pages }: Props) {
  const classes = useStyles()

  return (
    <SheetContent>
      <SheetContentHeader
        primary={<SheetPrimaryAction href='/test/overlay/bottom/2' text='Next' />}
        title={
          <Typography variant='h4' component='span'>
            Bottom Sheet Stepper
          </Typography>
        }
        divider={<Stepper steps={3} currentStep={2} />}
      />

      <SheetContentTitle>
        <Box textAlign='center' mb={3}>
          <Typography variant='h2' component='h2'>
            Bottom Sheet Stepper
          </Typography>
        </Box>
      </SheetContentTitle>

      <Container maxWidth='md' className={classes.longContent}>
        De stepper vervangt de bottom border van de header welke je bij scrollen ziet.
      </Container>
    </SheetContent>
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
