import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import usePhaseMode from 'components/PageTransition/usePhaseMode'
import { m as motion } from 'framer-motion'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
  },
  drawer: {
    top: 70,
    left: 20,
    right: 20,
    bottom: 70,
    position: 'absolute',
    background: theme.palette.background.paper,
    borderRadius: 16,
  },
}))

const LayoutDrawer: PageLayoutFC<{ title: string }> = ({ children, urlResolver, title }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { mode } = usePhaseMode()

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div
        className={classes.backdrop}
        {...(mode === 'deep' && {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { type: 'tween', ease: 'easeOut' } },
          exit: { opacity: 0, transition: { type: 'tween', ease: 'easeIn' } },
        })}
        {...(mode === 'shallow' && {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0 } },
          exit: { opacity: 0, transition: { duration: 0 } },
        })}
      />
      <motion.div
        className={classes.drawer}
        {...(mode === 'deep' && {
          initial: { opacity: 0, y: '100%' },
          animate: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'easeOut' } },
          exit: { opacity: 0, y: '100%', transition: { type: 'tween', ease: 'easeIn' } },
        })}
        {...(mode === 'shallow' && {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0 } },
          exit: { opacity: 0, transition: { duration: 0 } },
        })}
      >
        {title}
        {children}
      </motion.div>
    </PageLayout>
  )
}

export type LayoutDrawerProps = GetProps<typeof LayoutDrawer>

export default LayoutDrawer
