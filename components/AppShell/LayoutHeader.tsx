import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import keepAnimation from 'components/PageTransition/animation/keep'
import opacityAnimation from 'components/PageTransition/animation/opacity'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import Header from './Header'

const useStyles = makeStyles(
  (theme: Theme) => ({
    offsetDiv: {
      backdropFilter: 'blur(3px)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    content: {
      // position: 'absolute',
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      // left: 0,
      // right: 0,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

const LayoutHeader: PageLayoutFC<GQLLayoutHeaderQuery> = (props) => {
  const { children, urlResolver, menu } = props
  const theme = useTheme()
  const classes = useStyles(props)
  const { offsetDiv, hold, inFront } = usePageTransition('normal')

  const headerAnimation: MotionProps = hold ? keepAnimation : opacityAnimation
  const contentAnimation: MotionProps = hold ? keepAnimation : opacityAnimation

  // theme.zIndex.modal
  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div className={classes.offsetDiv} {...offsetDiv} style={{ zIndex: inFront ? 1 : 0 }}>
        <motion.div {...headerAnimation}>
          <Header menu={menu} urlResolver={urlResolver} />
        </motion.div>
        <motion.div className={classes.content} {...contentAnimation}>
          {children}
        </motion.div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutHeaderProps = GetProps<typeof LayoutHeader>

export default LayoutHeader
