import { PageOptions } from '@reachdigital/framer-next-pages'
import { SheetShellHeader } from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../../components/AppShell/SheetShell'
import { AppShellDemo } from '../minimal-page-shell/[[...url]]'

function SheetDemo() {
  console.log('Header used: SheetShellHeader')
  return <AppShellDemo baseUrl='/test/index' Header={SheetShellHeader} />
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: {
    size: 'max',
  },
  sharedKey: (router) =>
    [
      router.pathname,
      router.asPath.includes('primary') ? 'primary' : '',
      router.asPath.includes('stepper') ? 'stepper' : '',
      router.asPath.includes('icon') ? 'icon' : '',
    ].join('-'),
}
SheetDemo.pageOptions = pageOptions

export const getStaticPaths = async ({ locales = [] }) =>
  // Disable getStaticPaths for test pages
  ({ paths: [], fallback: 'blocking' })

export const getStaticProps = async ({ params, locale }) => {
  const { url } = params
  const isLeftSidebar = url?.[0] === 'left'
  const isRightSidebar = url?.[0] === 'right'

  return {
    props: {
      variant: ((isLeftSidebar || isRightSidebar) && url?.[0]) || 'bottom',
    },
  }
}

export default SheetDemo
