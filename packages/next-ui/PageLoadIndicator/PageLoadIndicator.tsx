'use client'

import type { LinearProgressProps } from '@mui/material'
import { LinearProgress } from '@mui/material'
import { m, motionValue, useTransform } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { forwardRef, useEffect, useState, useTransition } from 'react'

export const showPageLoadIndicator = motionValue(false)

const MLinearProgress = m.create(
  forwardRef((props: Omit<LinearProgressProps, 'style'>, ref: LinearProgressProps['ref']) => (
    <LinearProgress ref={ref} {...props} />
  )),
)

/**
 * Creates a [LinearProgress](https://mui.com/components/progress/#linear) animation when the route
 * is about to change until it has changed.
 *
 * Note: In App Router, we use usePathname and useSearchParams to detect route changes. The loading
 * state is triggered by the showPageLoadIndicator motion value which can be set externally.
 */
export function PageLoadIndicator() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState<boolean>(false)

  // Reset loading state when route changes complete
  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  const opacity = useTransform(() => (showPageLoadIndicator.get() || loading ? 1 : 0))

  return (
    <MLinearProgress
      style={{ opacity }}
      sx={{
        position: 'fixed',
        width: '100%',
        top: 0,
        height: 3,
        marginBottom: '-3px',
        zIndex: 'tooltip',
        transition: 'opacity 0.3s',
      }}
    />
  )
}
