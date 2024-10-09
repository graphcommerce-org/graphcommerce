import { LinearProgress, LinearProgressProps } from '@mui/material'
import { m, motionValue, useTransform } from 'framer-motion'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useState } from 'react'

export const showPageLoadIndicator = motionValue(false)

const MLinearProgress = m.create(
  forwardRef((props: Omit<LinearProgressProps, 'style'>, ref: LinearProgressProps['ref']) => (
    <LinearProgress ref={ref} {...props} />
  )),
)

/**
 * Creates a [LinearProgress](https://mui.com/components/progress/#linear) animation when the route
 * is about to change until it has changed.
 */
export function PageLoadIndicator() {
  const { events } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const show = () => setLoading(true)
    const hide = () => setLoading(false)
    events.on('routeChangeStart', show)
    events.on('routeChangeComplete', hide)
    events.on('routeChangeError', hide)

    return () => {
      events.off('routeChangeStart', show)
      events.off('routeChangeComplete', hide)
      events.off('routeChangeError', hide)
    }
  }, [events])

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
