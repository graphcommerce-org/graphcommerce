import { Container } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function TestOverlayStatic() {
  const title = `Overlay static`

  return (
    <OverlayUi
      variant='bottom'
      title={title}
      headerForward={
        <PageLink href='/test/overlay/1'>
          <ForwardButton color='secondary'>Overlay with gsp</ForwardButton>
        </PageLink>
      }
      backFallbackHref='/test/index'
      backFallbackTitle='Test'
    >
      <Container>
        <DebugSpacer />
      </Container>
    </OverlayUi>
  )
}

TestOverlayStatic.Layout = PageLayout

registerRouteUi('/test/overlay/static', OverlayUi)

export default TestOverlayStatic
