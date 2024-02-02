import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
// eslint-disable-next-line import/no-extraneous-dependencies
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils'

export function unlockScroll() {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

export function lockScroll() {
  const scrollbarSize = getScrollbarSize(document)
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarSize}px`
}

function useScrollLock(shouldPrevent: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (shouldPrevent) lockScroll()
    return () => unlockScroll()
  }, [shouldPrevent])
}

export const unstable_usePreventScroll = useScrollLock
