import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import instantAnimation from 'components/PageTransition/animation/instant'
import keepAnimation from 'components/PageTransition/animation/keep'
import opacityAnination from 'components/PageTransition/animation/opacity'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import Header from './Header'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    content: {
      position: 'absolute',
      top: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      left: 0,
      right: 0,
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

const LayoutHeader: PageLayoutFC<GQLLayoutHeaderQuery> = (props) => {
  const { children, urlResolver, menu } = props
  const theme = useTheme()
  const classes = useStyles(props)
  const { isActive, mode, offset, state, hold } = usePageTransition('normal')

  const headerAnimation: MotionProps = hold ? keepAnimation : instantAnimation
  const contentAnimation: MotionProps = hold ? keepAnimation : instantAnimation

  const position = offset ? 'fixed' : 'absolute'
  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div
        className={classes.root}
        {...{
          initial: { y: offset, position },
          animate: { y: offset, position, transition: { duration: 0 } },
          exit: { y: offset, transition: { duration: 0 } },
        }}
      >
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
