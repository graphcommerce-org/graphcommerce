import { Box, Container, Divider, Link, List, ListItem, Typography } from '@material-ui/core'
import { PageOptions, usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import { SheetVariant } from '@reachdigital/framer-sheet'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import SheetContent from '@reachdigital/next-ui/AppShell/SheetContent'
import SheetContentHeader from '@reachdigital/next-ui/AppShell/SheetContentHeader'
import SheetContentTitle from '@reachdigital/next-ui/AppShell/SheetContentTitle'
import SheetPrimaryAction from '@reachdigital/next-ui/AppShell/SheetPrimaryAction'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import { iconPersonAlt } from '@reachdigital/next-ui/icons'
import { m } from 'framer-motion'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React, { useState } from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

function BottomSheetWithPrimaryActionAndNavigatable() {
  const urlParts = usePageRouter().asPath.split('/').pop()?.split('-') ?? []
  const title = urlParts.map((s) => `${s?.charAt(0).toUpperCase() + s?.slice(1)}`).join(' ')
  const [scroll, setScroll] = useState<boolean>(false)

  const { closeSteps, backSteps } = usePageContext()

  const withPrimary = urlParts.includes('primary')
  const withStepper = urlParts.includes('stepper')
  const step = Number(urlParts[urlParts.length - 1])
  const withIcon = urlParts.includes('icon')

  let primaryAction: React.ReactNode
  if (withPrimary)
    primaryAction = (
      <SheetPrimaryAction href='/test/sheet/bottom-sheet-with-primary-navigated' text='Navigate' />
    )

  if (withStepper && step < 3) {
    primaryAction = (
      <SheetPrimaryAction href={`/test/sheet/bottom-sheet-with-stepper-${step + 1}`} text='Next' />
    )
  }
  let titleComponent = (
    <Typography variant='h5' component='span'>
      {title}
    </Typography>
  )
  if (withIcon)
    titleComponent = (
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
    )

  return (
    <SheetContent>
      <SheetContentHeader
        primary={primaryAction}
        divider={withStepper ? <Stepper steps={3} currentStep={step} /> : undefined}
      >
        {titleComponent}
      </SheetContentHeader>

      <SheetContentTitle>
        <Box textAlign='center' mb={3}>
          {withIcon ? (
            <IconHeader src={iconPersonAlt} title={title} alt={title} size='medium' />
          ) : (
            <Typography variant='h3' component='h1'>
              {title}
            </Typography>
          )}
        </Box>
      </SheetContentTitle>

      <Container maxWidth='md'>
        {!primaryAction && (
          <Typography variant='body1' gutterBottom>
            When opening a sheet a close icon is shown at the top right.
          </Typography>
        )}

        {primaryAction && backSteps === 0 && (
          <Typography variant='body1' gutterBottom>
            When a primary action is present, the close button moves to the left.
          </Typography>
        )}

        {backSteps > 0 && (
          <Typography variant='body1' gutterBottom>
            When navigated inside the overlay, a backbutton is shown on in the top left.
          </Typography>
        )}

        {primaryAction && backSteps > 0 && (
          <Typography variant='body1' gutterBottom>
            With a primary action and back button, there is no room for the close button. The close
            button gets ommited
          </Typography>
        )}

        <Divider />

        <List>
          {!!primaryAction ||
            (backSteps === 0 && (
              <PageLink href='/test/sheet/bottom-sheet-navigated' passHref>
                <ListItem button component='a' style={{ paddingLeft: 0, paddingRight: 0 }}>
                  Navigate inside the overlay
                </ListItem>
              </PageLink>
            ))}

          <PageLink href='/test/sheet/bottom-sheet-with-primary' passHref>
            <ListItem
              button
              component='a'
              disabled={!!primaryAction}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Bottom sheet with primary action
            </ListItem>
          </PageLink>

          <PageLink href='/test/sheet/bottom-sheet-with-stepper-1' passHref>
            <ListItem
              button
              component='a'
              disabled={withStepper}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Bottom sheet with stepper
            </ListItem>
          </PageLink>

          <PageLink href='/test/sheet/bottom-sheet-with-icon' passHref>
            <ListItem
              button
              component='a'
              disabled={withIcon}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Bottom sheet with icon
            </ListItem>
          </PageLink>

          <ListItem
            button
            onClick={() => setScroll(!scroll)}
            color='secondary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {scroll ? 'Make unscrollable' : 'Make scrollable'}
          </ListItem>
        </List>

        <div>
          <m.div
            animate={{ height: scroll ? 2000 : 1 }}
            transition={{ type: 'tween' }}
            style={{ width: '20px', background: '#dedede' }}
          />
        </div>
      </Container>
    </SheetContent>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max', variant: 'bottom' },
  sharedKey: (router) => {
    const sharedKey = [
      router.pathname,
      router.asPath.includes('primary') ? 'primary' : '',
      router.asPath.includes('stepper') ? 'stepper' : '',
      router.asPath.includes('icon') ? 'icon' : '',
    ].join('-')
    console.log(sharedKey)
    return sharedKey
  },
}
BottomSheetWithPrimaryActionAndNavigatable.pageOptions = pageOptions

export default BottomSheetWithPrimaryActionAndNavigatable
