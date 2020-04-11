import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { useRouter } from 'next/router'
import { LinearProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  progress: {
    marginBottom: -2,
    height: 2,
  },
})

const PageLoadIndicator: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)

  const progressAnim = useSpring({ opacity: loading ? 1 : 0, from: { opacity: 0 } })
  const AnimatedLinearProgress = animated(LinearProgress)

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
  }, [router.pathname, router.query])

  return <AnimatedLinearProgress style={progressAnim} className={classes.progress} />
}

export default PageLoadIndicator
