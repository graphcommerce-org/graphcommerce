import { PageOptions } from '@reachdigital/framer-next-pages'
import { SheetShellHeader } from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { AppShellDemo } from '../minimal-page-shell/[[...url]]'

function SheetDemo() {
  return <AppShellDemo baseUrl='/test/sheet' Header={SheetShellHeader} />
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { size: 'max', variant: 'bottom' },
  sharedKey: (router) =>
    [
      router.pathname,
      router.asPath.includes('primary') ? 'primary' : '',
      router.asPath.includes('stepper') ? 'stepper' : '',
      router.asPath.includes('icon') ? 'icon' : '',
    ].join('-'),
}
SheetDemo.pageOptions = pageOptions

export default SheetDemo
