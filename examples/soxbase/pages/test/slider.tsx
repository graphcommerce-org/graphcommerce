import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import Multi from '@reachdigital/next-ui/FramerSlider/test/Multi'
import Single from '@reachdigital/next-ui/FramerSlider/test/Single'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function TestSlider() {
  return (
    <FullPageUi title='slider'>
      <Multi />
      <Single />
    </FullPageUi>
  )
}

TestSlider.Layout = PageLayout

registerRouteUi('/test/slider', FullPageUi)

export default TestSlider
