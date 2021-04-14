import { usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
  SheetVariant,
} from '@reachdigital/framer-sheet'
import { useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'
import useSheetStyles from './useSheetStyles'

type Props = { children: React.ReactNode; variant: SheetVariant } & UseStyles<typeof useSheetStyles>

export default function SheetPageUi(props: Props) {
  const classes = useSheetStyles()
  const { children, variant } = props
  const router = useRouter()
  const pageRouter = usePageRouter()
  const depth = usePageDepth()

  const isActive = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <Sheet
      open={isActive}
      onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
      variant={variant}
      size='max'
    >
      <SheetBackdrop onTap={() => router.back()} classes={classes} />
      <SheetContainer classes={classes}>
        <SheetPanel dragHandle={<SheetDragIndicator classes={classes} />} classes={classes}>
          {children}
        </SheetPanel>
      </SheetContainer>
    </Sheet>
  )
}
