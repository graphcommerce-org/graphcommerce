import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetContext,
  SheetDragIndicator,
  SheetPanel,
  SheetProps,
  SnapPoint,
} from '@reachdigital/framer-sheet'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ShellBase, { PageLayoutBaseProps } from '../ShellBase'
import useSheetStyles from './useSheetStyles'

export type SheetShellBaseProps = {
  header?: React.ReactNode
  children?: React.ReactNode
} & Pick<SheetProps, 'size' | 'variant'> &
  PageLayoutBaseProps

function SheetShellBase(props: SheetShellBaseProps) {
  const { children, variant, size, name } = props

  const sheetClasses = useSheetStyles(props)
  const router = useRouter()
  const pageRouter = usePageRouter()
  const { depth, backSteps } = usePageContext()
  const open = depth < 0 || router.asPath === pageRouter.asPath
  const initialLocale = useRef(router.locale)

  function handleBack() {
    return initialLocale.current !== router.locale
      ? pageRouter.push('/')
      : pageRouter.go(backSteps * -1)
  }

  function handleSnap(snapPoint: SnapPoint) {
    if (snapPoint !== 'closed') return
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleBack()
  }

  return (
    <ShellBase name={name}>
      <Sheet open={open} onSnap={handleSnap} variant={variant} size={size}>
        <SheetBackdrop onTap={handleBack} classes={sheetClasses} />
        <SheetContainer classes={sheetClasses}>
          <SheetPanel header={<SheetDragIndicator classes={sheetClasses} />} classes={sheetClasses}>
            {/* <FocusLock returnFocus={{ preventScroll: true }} disabled={!isActive}> */}
            {children}
            {/* </FocusLock> */}
          </SheetPanel>
        </SheetContainer>
      </Sheet>
    </ShellBase>
  )
}

export default SheetShellBase
