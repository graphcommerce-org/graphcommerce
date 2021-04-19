import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import React from 'react'
import SheetLayout, { SheetLayoutProps } from '../../../components/AppShell/SheetLayout'

function TestOverlayStatic() {
  const title = `Overlay static`

  return (
    <Container>
      <DebugSpacer />
    </Container>
  )
}

}
const pageOptions: PageOptions<SheetLayoutProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetLayout,
  sharedProps: { variant: 'bottom' },
}
TestOverlayStatic.pageOptions = pageOptions

export default TestOverlayStatic
