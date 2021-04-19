import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import DebugSpacer from '@reachdigital/next-ui/Debug/DebugSpacer'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'

function TestOverlayStatic() {
  const title = `Overlay static`

  return (
    <Container>
      <DebugSpacer />
    </Container>
  )
}

}
const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { variant: 'bottom' },
}
TestOverlayStatic.pageOptions = pageOptions

export default TestOverlayStatic
