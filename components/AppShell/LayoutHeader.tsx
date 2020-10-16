import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import Backdrop from 'components/PageTransition/Backdrop'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion } from 'framer-motion'
import Header from './Header'

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

const LayoutHeader: PageLayoutFC = (props) => {
  const { children, urlResolver, menu, title } = props
  const theme = useTheme()
  const classes = useStyles(props)
  const { offsetDiv, inFront } = usePageTransition({ title })

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main} title={title}>
      <Backdrop inFront={inFront} />
      <motion.div {...offsetDiv}>
        <Header menu={menu} urlResolver={urlResolver} />
        <div className={classes.content}>{children}</div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutHeaderProps = GetProps<typeof LayoutHeader>

export default LayoutHeader
