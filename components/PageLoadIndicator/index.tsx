import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LinearProgress, makeStyles, Fade } from '@material-ui/core'

const useStyles = makeStyles(
  {
    progress: {
      marginBottom: -2,
      height: 2,
    },
  },
  { name: 'PageLoadIndicator' },
)

const PageLoadIndicator: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const show = () => setLoading(true)
    const hide = () => setLoading(false)
    router.events.on('routeChangeStart', show)
    router.events.on('routeChangeComplete', hide)
    router.events.on('routeChangeError', hide)

    return () => {
      router.events.off('routeChangeStart', show)
      router.events.off('routeChangeComplete', hide)
      router.events.off('routeChangeError', hide)
    }
  }, [router.events, router.pathname, router.query])

  return (
    <Fade in={loading}>
      <LinearProgress className={classes.progress} />
    </Fade>
  )
}

export default PageLoadIndicator
