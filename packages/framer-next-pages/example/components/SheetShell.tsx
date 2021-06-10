import { usePageContext, usePageRouter, useCloseOverlay } from '@reachdigital/framer-next-pages'
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
  const { depth } = usePageContext()
  const close = useCloseOverlay()
  const open = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <Sheet
      open={open}
      onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
      variant={variant}
      size={size}
    >
      <SheetBackdrop onTap={close} styles={styles} />
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
