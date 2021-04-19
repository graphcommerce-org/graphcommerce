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
import PageLayoutBase, { PageLayoutBaseProps } from '../Page/PageLayoutBase'
import BackButton from './BackButton'

export type SheetShellProps = {
  header?: React.ReactNode
  headerForward?: React.ReactNode
  children?: React.ReactNode
  backFallbackHref?: string
  backFallbackTitle?: string
} & Pick<SheetProps, 'size' | 'variant'> &
  PageLayoutBaseProps

function SheetShell(props: SheetShellProps) {
  const {
    children,
    backFallbackHref,
    backFallbackTitle,
    headerForward,
    variant,
    size,
    name,
  } = props

  const sheetClasses = useSheetStyles()
  const router = useRouter()
  // const pageRouter = usePageRouter()
  // const depth = usePageDepth()

  // const isActive = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <PageLayoutBase name={name}>
      <Sheet
        open
        onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
        variant={variant}
        size={size}
      >
        <SheetBackdrop onTap={() => router.back()} classes={sheetClasses} />
        <SheetContainer classes={sheetClasses}>
          <SheetPanel
            back={
              <BackButton href={backFallbackHref} disableElevation>
                {backFallbackTitle}
              </BackButton>
            }
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
    </PageLayoutBase>
  )
}

export default SheetShell
