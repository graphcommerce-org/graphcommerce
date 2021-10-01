import { PageOptions, usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { AppShellTitle, Button, iconPersonAlt, Stepper, Title } from '@graphcommerce/next-ui'
import { Container, Divider, List, ListItem, NoSsr, Typography } from '@mui/material'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React, { useState } from 'react'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'
import PageShellHeader from '../../../components/AppShell/PageShellHeader'

type AppShellDemoProps = {
  baseUrl: string
  Header: React.FC<{
    primary?: React.ReactNode
    divider?: React.ReactNode
    hideDragIndicator?: boolean
  }>
}

export function AppShellDemo(props: AppShellDemoProps) {
  const { baseUrl, Header } = props

  const queryParams = usePageRouter().asPath.split('/')
  const urlParts = queryParams.pop()?.split('-') ?? []

  const title = urlParts.map((s) => `${s?.charAt(0).toUpperCase() + s?.slice(1)}`).join(' ')
  const [scroll, setScroll] = useState<boolean>(true)
  const { backSteps } = usePageContext()

  const withPrimary = urlParts.includes('primary')
  const withStepper = urlParts.includes('stepper')
  const step = Number(urlParts[urlParts.length - 1])
  const withIcon = urlParts.includes('icon')
  const withTitle = urlParts.includes('title')

  const isLeftSidebarDrawer = urlParts.includes('left') || queryParams.includes('left')
  const isSidebarDrawer =
    isLeftSidebarDrawer || urlParts.includes('right') || queryParams.includes('right')
  const isSheet = queryParams.includes('sheet')
  const isMinimal = urlParts.includes('minimal') || queryParams.includes('minimal-page-shell')
  const isMinimalPageShellSubheader =
    urlParts.includes('subheader') || queryParams.includes('minimal-page-shell-subheader')
  const isFullPage = !isSheet && !isMinimal && !isMinimalPageShellSubheader

  let primaryAction: React.ReactNode

  if (withPrimary)
    primaryAction = (
      <PageLink href={`${baseUrl}/with-primary-navigated`} passHref>
        <Button color='secondary' variant='pill-link'>
          Navigate
        </Button>
      </PageLink>
    )

  if (withStepper && step < 3) {
    primaryAction = (
      <PageLink href={`${baseUrl}/with-stepper-${step + 1}`} passHref>
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
      <Title icon={iconPersonAlt} size='small' component='span'>
        {title}
      </Title>
    )

  return (
    <>
      <NoSsr>
        <Header
          primary={primaryAction}
          divider={
            withStepper ? (
              <Container maxWidth={false}>
                <Stepper steps={3} currentStep={step} />
              </Container>
            ) : undefined
          }
          hideDragIndicator={isSidebarDrawer}
        >
          {isMinimal || isSheet || withTitle ? titleComponent : undefined}
        </Header>

        <Container maxWidth='md'>
          <AppShellTitle icon={withIcon ? iconPersonAlt : undefined}>{title}</AppShellTitle>

          {isSheet && !primaryAction && (
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
              With a primary action and back button, there is no room for the close button. The
              close button gets ommited
            </Typography>
          )}

          <Divider />

          <List>
            {!!primaryAction ||
              (backSteps === 0 && (
                <PageLink href={`${baseUrl}/navigated`} passHref>
                  <ListItem button component='a' style={{ paddingLeft: 0, paddingRight: 0 }}>
                    Navigate
                  </ListItem>
                </PageLink>
              ))}

            <PageLink href={`${baseUrl}/with-primary`} passHref>
              <ListItem
                button
                component='a'
                disabled={!!primaryAction}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                With primary action
              </ListItem>
            </PageLink>

            <PageLink href={`${baseUrl}/with-stepper-1`} passHref>
              <ListItem
                button
                component='a'
                disabled={withStepper}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                With stepper
              </ListItem>
            </PageLink>

            <PageLink href={`${baseUrl}/with-icon`} passHref>
              <ListItem
                button
                component='a'
                disabled={withIcon}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                With icon
              </ListItem>
            </PageLink>
            <PageLink href='/test/sheet/bottom' passHref>
              <ListItem
                button
                component='a'
                disabled={isSheet && !isSidebarDrawer}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Bottom sheet
              </ListItem>
            </PageLink>
            <PageLink href='/test/sheet/left' passHref>
              <ListItem
                button
                component='a'
                disabled={isLeftSidebarDrawer}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Left side sheet
              </ListItem>
            </PageLink>
            <PageLink href='/test/sheet/right' passHref>
              <ListItem
                button
                component='a'
                disabled={isSidebarDrawer && !isLeftSidebarDrawer}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Right side sheet
              </ListItem>
            </PageLink>
            <PageLink href='/test/minimal-page-shell' passHref>
              <ListItem
                button
                component='a'
                disabled={isMinimal}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Minimal Page Shell
              </ListItem>
            </PageLink>
            <PageLink href='/test' passHref>
              <ListItem
                button
                component='a'
                disabled={isFullPage}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Full Page Shell
              </ListItem>
            </PageLink>
            <PageLink href='/test/with-title' passHref>
              <ListItem
                button
                component='a'
                disabled={withTitle}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Full Page Shell + Title
              </ListItem>
            </PageLink>

            <PageLink href='/test/minimal-page-shell-subheader' passHref>
              <ListItem
                button
                component='a'
                disabled={isMinimalPageShellSubheader}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                Minimal Page Shell + Subheader
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
      </NoSsr>
    </>
  )
}

function MinimalPageShellDemo() {
  return <AppShellDemo baseUrl='/test/minimal-page-shell' Header={PageShellHeader} />
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}
MinimalPageShellDemo.pageOptions = pageOptions

export default MinimalPageShellDemo
