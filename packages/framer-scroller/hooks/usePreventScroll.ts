// eslint-disable-next-line import/no-extraneous-dependencies
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils'
import { useEffect, useId } from 'react'

function usePreventScroll(shouldPrevent: boolean) {
  const id = useId()

  useEffect(() => {
    if (shouldPrevent) {
      const scrollbarSize = getScrollbarSize(document)

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarSize}px`
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [id, shouldPrevent])
}

export const unstable_usePreventScroll = usePreventScroll
