import { Button, Container } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function TestStatic() {
  const title = `Testpage no GSP`

  return (
    <FullPageUi title={title} backFallbackTitle='Test' backFallbackHref='/test/index'>
      <Container>
        <PageLink href='/test/index'>
          <Button variant='outlined' color='secondary'>
            Index
          </Button>
        </PageLink>

        <PageLink href='/test/overlay/static'>
          <Button variant='outlined' color='secondary'>
            Overlay static
          </Button>
        </PageLink>
      </Container>
    </FullPageUi>
  )
}

TestStatic.Layout = PageLayout

registerRouteUi('/test/static', FullPageUi)

export default TestStatic
