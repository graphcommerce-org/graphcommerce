import { Container, Divider, List, ListItem, Typography } from '@material-ui/core'
import { PageOptions, usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  AppShellTitle,
  Button,
  iconBox,
  iconPersonAlt,
  SheetShellHeader,
  Stepper,
  Title,
} from '@reachdigital/next-ui'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React, { useState } from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'

function BottomSheetWithPrimaryActionAndNavigatable() {
  const urlParts = usePageRouter().asPath.split('/').pop()?.split('-') ?? []
  const title = urlParts.map((s) => `${s?.charAt(0).toUpperCase() + s?.slice(1)}`).join(' ')
  const [scroll, setScroll] = useState<boolean>(false)
  const { backSteps } = usePageContext()

  const withPrimary = urlParts.includes('primary')
  const withStepper = urlParts.includes('stepper')
  const step = Number(urlParts[urlParts.length - 1])
  const withIcon = urlParts.includes('icon')

  let primaryAction: React.ReactNode
  if (withPrimary)
    primaryAction = (
      <PageLink href='/test/sheet/bottom-sheet-with-primary-navigated' passHref>
        <Button color='secondary' variant='pill-link'>
          Navigate
        </Button>
      </PageLink>
    )

  if (withStepper && step < 3) {
    primaryAction = (
      <PageLink href={`/test/sheet/bottom-sheet-with-stepper-${step + 1}`} passHref>
        <Button color='secondary' variant='pill-link'>
          Navigate
        </Button>
      </PageLink>
    )
  }

  let titleComponent = (
    <Title size='small' component='span'>
      {title}
    </Title>
  )

  if (withIcon)
    titleComponent = (
      <Title icon={iconBox} size='small' component='span'>
        {title}
      </Title>
    )

  return (
    <>
      <SheetShellHeader
        primary={primaryAction}
        divider={withStepper ? <Stepper steps={3} currentStep={step} /> : undefined}
      >
        {titleComponent}
      </SheetShellHeader>

      <AppShellTitle icon={withIcon ? iconBox : undefined}>{title}</AppShellTitle>

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
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max', variant: 'bottom' },
  sharedKey: (router) =>
    [
      router.pathname,
      router.asPath.includes('primary') ? 'primary' : '',
      router.asPath.includes('stepper') ? 'stepper' : '',
      router.asPath.includes('icon') ? 'icon' : '',
    ].join('-'),
}
BottomSheetWithPrimaryActionAndNavigatable.pageOptions = pageOptions

export default BottomSheetWithPrimaryActionAndNavigatable
