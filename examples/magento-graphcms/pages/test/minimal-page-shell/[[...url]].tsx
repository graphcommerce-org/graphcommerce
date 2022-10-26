import { PageOptions, usePageContext } from '@graphcommerce/framer-next-pages'
import {
  LayoutHeader,
  iconPerson,
  Stepper,
  LayoutTitle,
  LinkOrButton,
} from '@graphcommerce/next-ui'
import { Container, Divider, List, ListItem } from '@mui/material'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'

type LayoutDemoProps = {
  baseUrl: string
}

export function LayoutDemo(props: LayoutDemoProps) {
  const { baseUrl } = props

  const queryParams = useRouter().asPath.split('/')
  const urlParts = queryParams.pop()?.split('-') ?? []

  const title = urlParts.map((s = '') => `${s.charAt(0).toUpperCase() + s.slice(1)}`).join(' ')
  const [scroll, setScroll] = useState<boolean>(false)
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
      <PageLink href={`${baseUrl}/with-primary-navigated`} passHref legacyBehavior>
        <LinkOrButton color='secondary' button={{ variant: 'pill' }}>
          Navigate
        </LinkOrButton>
      </PageLink>
    )

  if (withStepper && step < 3) {
    primaryAction = (
      <PageLink href={`${baseUrl}/with-stepper-${step + 1}`} passHref legacyBehavior>
        <LinkOrButton color='secondary' button={{ variant: 'pill' }}>
          Navigate
        </LinkOrButton>
      </PageLink>
    )
  }

  let titleComponent = (
    <LayoutTitle size='small' component='span'>
      {title}
    </LayoutTitle>
  )

  if (withIcon)
    titleComponent = (
      <LayoutTitle icon={iconPerson} size='small' component='span'>
        {title}
      </LayoutTitle>
    )

  return (
    <>
      <LayoutHeader
        primary={primaryAction}
        divider={
          withStepper ? (
            <Container maxWidth={false}>
              <Stepper steps={3} currentStep={step} />
            </Container>
          ) : undefined
        }
        floatingMd={isFullPage}
        noAlign={isSheet}
        switchPoint={0}
      >
        {isMinimal || isSheet || withIcon || withTitle ? titleComponent : undefined}
      </LayoutHeader>

      <Container maxWidth='md' style={{ paddingTop: '50px' }}>
        {/* <LayoutTitle icon={withIcon ? iconPerson : undefined}>{title}</LayoutTitle> */}

        {/* {isSheet && !primaryAction && (
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
      )} */}

        <Divider />

        <List>
          {primaryAction || backSteps === 0 ? (
            <PageLink href={`${baseUrl}/navigated`} passHref legacyBehavior>
              <ListItem button component='a' style={{ paddingLeft: 0, paddingRight: 0 }}>
                Navigate
              </ListItem>
            </PageLink>
          ) : null}

          <PageLink href={`${baseUrl}/with-primary`} passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={!!primaryAction}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              With primary action
            </ListItem>
          </PageLink>

          <PageLink href={`${baseUrl}/with-stepper-1`} passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={withStepper}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              With stepper
            </ListItem>
          </PageLink>

          <PageLink href={`${baseUrl}/with-icon`} passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={withIcon}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              With icon
            </ListItem>
          </PageLink>
          <PageLink
            href='/test/sheet?sizeMd=full&sizeSm=full&justifyMd=stretch&justifySm=stretch&variantMd=bottom&variantSm=bottom'
            passHref
            legacyBehavior
          >
            <ListItem
              button
              component='a'
              disabled={isSheet && !isSidebarDrawer}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Bottom sheet
            </ListItem>
          </PageLink>
          <PageLink
            href='/test/sheet?sizeMd=full&sizeSm=full&justifyMd=start&justifySm=start&variantMd=left&variantSm=left'
            passHref
            legacyBehavior
          >
            <ListItem
              button
              component='a'
              disabled={isLeftSidebarDrawer}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Left side sheet
            </ListItem>
          </PageLink>
          <PageLink
            href='/test/sheet?sizeMd=full&sizeSm=full&justifyMd=start&justifySm=start&variantMd=right&variantSm=right'
            passHref
            legacyBehavior
          >
            <ListItem
              button
              component='a'
              disabled={isSidebarDrawer && !isLeftSidebarDrawer}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Right side sheet
            </ListItem>
          </PageLink>
          <PageLink href='/test/minimal-page-shell' passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={isMinimal}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Minimal Page Shell
            </ListItem>
          </PageLink>
          <PageLink href='/test' passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={isFullPage}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Full Page Shell
            </ListItem>
          </PageLink>
          <PageLink href='/test/with-title' passHref legacyBehavior>
            <ListItem
              button
              component='a'
              disabled={withTitle}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              Full Page Shell + Title
            </ListItem>
          </PageLink>

          <PageLink href='/test/minimal-page-shell-subheader' passHref legacyBehavior>
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
            initial={false}
            transition={{ type: 'tween' }}
            style={{ width: '20px', background: '#dedede' }}
          />
        </div>
      </Container>
    </>
  )
}

function MinimalPageShellDemo() {
  return <LayoutDemo baseUrl='/test/minimal-page-shell' />
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
MinimalPageShellDemo.pageOptions = pageOptions

export default MinimalPageShellDemo
