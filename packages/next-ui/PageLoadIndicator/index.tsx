import { LinearProgress, Fade } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'PageLoadIndicator' })((theme) => ({
  progress: {
    position: 'fixed',
    width: '100%',
    top: 0,
    height: 3,
    marginBottom: -3,
    zIndex: theme.zIndex.tooltip,
  },
}))

function PageLoadIndicator() {
  const router = useRouter()
  const { classes } = useStyles()
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
  }, [router.events])

  return (
    <Fade in={loading}>
      <LinearProgress className={classes.progress} />
    </Fade>
  )
}

export default PageLoadIndicator
