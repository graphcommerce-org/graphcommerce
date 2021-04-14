import NextOverlayUi, {
  OverlayUiProps as NextOverlayUiProps,
} from '@reachdigital/next-ui/AppShell/OverlayUi'
import React from 'react'
import Logo from './Logo'

function OverlayPage(props: Omit<NextOverlayUiProps, 'header'>) {
  return <NextOverlayUi {...props} header={<Logo />} />
}

export default OverlayPage
