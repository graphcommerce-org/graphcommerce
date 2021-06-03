import { usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
  SheetProps,
  styles,
} from '@reachdigital/framer-sheet'
import { useRouter } from 'next/router'
import React from 'react'

export type SheetShellProps = {
  headerBack?: React.ReactNode
  headerForward?: React.ReactNode
  children?: React.ReactNode
} & Pick<SheetProps, 'size' | 'variant'>

function SheetShell(props: SheetShellProps) {
  const { children, headerBack, headerForward, variant, size } = props

  const router = useRouter()
  const pageRouter = usePageRouter()
  const depth = usePageDepth()

  const isActive = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <Sheet
      open={isActive}
      onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
      variant={variant}
      size={size}
    >
      <SheetBackdrop onTap={() => router.back()} styles={styles} />
      <SheetContainer styles={styles}>
        <SheetPanel
          forward={headerForward}
          back={headerBack}
          header={<SheetDragIndicator styles={styles} />}
          styles={styles}
        >
          {children}
        </SheetPanel>
      </SheetContainer>
    </Sheet>
  )
}

export default SheetShell
