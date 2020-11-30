import { Container } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function TestOverlayStatic() {
  const title = `Overlay static`

  return (
    <BottomDrawerUi
      title={title}
      headerForward={
        <PageLink href='/test/overlay/1'>
          <ForwardButton color='secondary'>Overlay with gsp</ForwardButton>
        </PageLink>
      }
    >
      <Container>
        <DebugSpacer />
      </Container>
    </BottomDrawerUi>
  )
}

TestOverlayStatic.Layout = PageLayout

registerRouteUi('/test/overlay/static', BottomDrawerUi)

export default TestOverlayStatic
