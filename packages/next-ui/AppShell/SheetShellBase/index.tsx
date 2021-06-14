import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
  SheetProps,
} from '@reachdigital/framer-sheet'
import { useRouter } from 'next/router'
import React from 'react'
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

  return (
    <ShellBase name={name}>
      <Sheet
        open={open}
        onSnap={(snapPoint) => snapPoint === 'closed' && pageRouter.go(backSteps * -1)}
        variant={variant}
        size={size}
      >
        <SheetBackdrop onTap={() => pageRouter.go(backSteps * -1)} classes={sheetClasses} />
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
