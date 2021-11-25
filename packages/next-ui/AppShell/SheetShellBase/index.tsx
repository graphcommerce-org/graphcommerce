import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { useDomEvent } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import AppShellProvider from '../AppShellProvider'
import { Sheet } from '@graphcommerce/framer-scroller-sheet'

export type SheetShellBaseProps = {
  header?: React.ReactNode
  children?: React.ReactNode
}

function SheetShellBase(props: SheetShellBaseProps) {
  const { children } = props
  const router = useRouter()
  const pageRouter = usePageRouter()
  const { depth, closeSteps, active, direction } = usePageContext()
  const open = depth < 0 || router.asPath === pageRouter.asPath
  const initialLocale = useRef(router.locale)
  const [isNavigating, setIsNavigating] = useState<boolean>(false)

  function handleClose() {
    if (!isNavigating) {
      setIsNavigating(true)
      return initialLocale.current !== router.locale
        ? pageRouter.push('/')
        : pageRouter.go(closeSteps * -1)
    }
  }

  function handleSnap(snapPoint: SnapPoint) {
    if (snapPoint !== 'closed') return
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleClose()
  }

  const windowRef = useRef(typeof window !== 'undefined' ? window : null)

  function handleEscapeKey(e: KeyboardEvent | Event) {
    if (active) {
      if ((e as KeyboardEvent)?.key === 'Escape') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleClose()
      }
    }
  }

  useDomEvent(windowRef, 'keyup', handleEscapeKey, { passive: true })

  return (
    <AppShellProvider>
      <Sheet onSnap={handleSnap}>{children}</Sheet>
    </AppShellProvider>
  )
}

export default SheetShellBase
