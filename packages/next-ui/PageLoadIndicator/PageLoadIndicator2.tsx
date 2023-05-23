import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { LinearProgress, Fade } from '@mui/material'
import { motionValue } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const pageLoading = motionValue(false)

/**
 * Creates a [LinearProgress](https://mui.com/components/progress/#linear) animation when the route
 * is about to change until it has changed.
 */
export function PageLoadIndicator2() {
  const show = useMotionValueValue(pageLoading, (v) => v)

  const pathname = usePathname()
  useEffect(() => {
    if (pageLoading.get()) pageLoading.set(false)
  }, [pathname])

  return (
    <Fade in={show}>
      <LinearProgress
        sx={{
          position: 'fixed',
          width: '100%',
          top: 0,
          height: 3,
          marginBottom: '-3px',
          zIndex: 'tooltip',
        }}
      />
    </Fade>
  )
}
