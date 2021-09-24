import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
  SheetProps,
  styles,
} from '@graphcommerce/framer-sheet'
import { useRouter } from 'next/router'
import React from 'react'

/*
  This file is possibly deprecated.
*/

export type SheetShellProps = {
  headerBack?: React.ReactNode
  cta?: React.ReactNode
  children?: React.ReactNode
} & Pick<SheetProps, 'size' | 'variant'>

function SheetShell(props: SheetShellProps) {
  const { children, headerBack, cta, variant, size } = props

  const router = useRouter()
  const pageRouter = usePageRouter()
  const { depth, backSteps, closeSteps } = usePageContext()
  const open = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <Sheet
      open={open}
      onSnap={(snapPoint) => snapPoint === 'closed' && pageRouter.go(closeSteps * -1)}
      variant={variant}
      size={size}
    >
      <SheetBackdrop onTap={() => pageRouter.go(closeSteps * -1)} styles={styles} />
      <SheetContainer styles={styles}>
        <SheetPanel
          forward={cta}
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
