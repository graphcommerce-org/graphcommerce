import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import PageLink from 'next/link'
import React from 'react'
import OverlayPage from '../../../components/AppShell/OverlayPage'

function TestOverlayStatic() {
  const title = `Overlay static`

  return (
    <OverlayPage
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
    </OverlayPage>
  )
}

TestOverlayStatic.Layout = PageLayout
TestOverlayStatic.pageOptions = { overlay: 'bottom' } as PageOptions

export default TestOverlayStatic
