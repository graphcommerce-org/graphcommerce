import { Container, Divider, List, ListItem, Typography } from '@material-ui/core'
import { PageOptions, usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import { Button, AppShellTitle, iconPersonAlt, Stepper, Title } from '@reachdigital/next-ui'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'
import PageShellHeader from '../../../components/AppShell/PageShellHeader'

type AppShellDemoProps = {
  baseUrl: string
  Header: React.FC<{ primary?: React.ReactNode; divider?: React.ReactNode }>
}

export function AppShellDemo(props: AppShellDemoProps) {
  const { baseUrl, Header } = props

  const urlParts = usePageRouter().asPath.split('/').pop()?.split('-') ?? []
  const title = urlParts.map((s) => `${s?.charAt(0).toUpperCase() + s?.slice(1)}`).join(' ')
  const [scroll, setScroll] = useState<boolean>(true)
  const { backSteps } = usePageContext()

  const withPrimary = urlParts.includes('primary')
  const withStepper = urlParts.includes('stepper')
  const step = Number(urlParts[urlParts.length - 1])
  const withIcon = urlParts.includes('icon')

  const isSheet = urlParts.includes('sheet')
  const isMinimal = urlParts.includes('minimal')
  const isFullPage = !isSheet && !isMinimal

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
      <Header
        primary={primaryAction}
        divider={withStepper ? <Stepper steps={3} currentStep={step} /> : undefined}
      >
        {!isFullPage ? titleComponent : undefined}
      </Header>

      <AppShellTitle icon={withIcon ? iconPersonAlt : undefined}>{title}</AppShellTitle>

      <Container maxWidth='md'>
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
            With a primary action and back button, there is no room for the close button. The close
            button gets ommited
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
          <PageLink href='/test/sheet/bottom-sheet' passHref>
            <ListItem
              button
              component='a'
              disabled={isSheet}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Bottom sheet
            </ListItem>
          </PageLink>
          <PageLink href='/test/minimal-page-shell' passHref>
            <ListItem
              button
              component='a'
              disabled={urlParts.includes('minimal')}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Minimal Page Shell
            </ListItem>
          </PageLink>
          <PageLink href='/test/minimal-page-shell' passHref>
            <ListItem
              button
              component='a'
              disabled={!(urlParts.includes('minimal') || urlParts.includes('full'))}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Full Page Shell
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

function MinimalPageShellDemo() {
  return <AppShellDemo baseUrl='/test/minimal-page-shell' Header={PageShellHeader} />
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}
MinimalPageShellDemo.pageOptions = pageOptions

export default MinimalPageShellDemo
