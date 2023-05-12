import { LinearProgress, Fade } from '@mui/material'
import { useRouter } from 'next/compat/router'
import { useEffect, useState } from 'react'

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

  return (
    <Fade in={loading}>
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
