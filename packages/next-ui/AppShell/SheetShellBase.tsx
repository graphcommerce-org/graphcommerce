import { usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
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
import useSheetStyles from '../FramerSheet/useSheetStyles'
import BackButton from './BackButton'
import ShellBase, { PageLayoutBaseProps } from './ShellBase'

export type SheetShellBaseProps = {
  header?: React.ReactNode
  headerForward?: React.ReactNode
  children?: React.ReactNode
  backFallbackHref?: string | null
  backFallbackTitle?: string | null
} & Pick<SheetProps, 'size' | 'variant'> &
  PageLayoutBaseProps

function SheetShellBase(props: SheetShellBaseProps) {
  const { children, backFallbackHref, backFallbackTitle, headerForward, variant, size, name } =
    props

  const sheetClasses = useSheetStyles()
  const router = useRouter()
  const pageRouter = usePageRouter()
  const depth = usePageDepth()

  const isActive = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <ShellBase name={name}>
      <Sheet
        open={isActive}
        onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
        variant={variant}
        size={size}
      >
        <SheetBackdrop onTap={() => router.back()} classes={sheetClasses} />
        <SheetContainer classes={sheetClasses}>
          <SheetPanel
            back={<BackButton href={backFallbackHref ?? undefined}>{backFallbackTitle}</BackButton>}
            forward={headerForward}
            header={<SheetDragIndicator classes={sheetClasses} />}
            classes={sheetClasses}
          >
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
