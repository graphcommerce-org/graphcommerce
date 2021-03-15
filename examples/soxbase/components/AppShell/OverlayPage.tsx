import NextOverlayUi, {
  OverlayUiProps as NextOverlayUiProps,
} from '@reachdigital/next-ui/AppShell/OverlayUi'
import React from 'react'
import Logo from './Logo'

function OverlayPage(props: NextOverlayUiProps) {
  const { children, ...uiProps } = props
  return (
    <NextOverlayUi variant='left' {...uiProps} header={<Logo />}>
      {children}
    </NextOverlayUi>
  )
}
OverlayPage.holdBackground = false

export default OverlayPage
