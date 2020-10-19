import { makeStyles, Theme } from '@material-ui/core'
import Backdrop from 'components/PageTransition/Backdrop'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

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

export type FullPageUiProps = { title: string }

const FullPageUi = (props: PropsWithChildren<FullPageUiProps>) => {
  const { children, title } = props
  const classes = useStyles(props)
  const { offsetDiv, inFront } = usePageTransition({ title })

  return (
    <>
      <Backdrop inFront={inFront} />
      <motion.div {...offsetDiv}>
        <div className={classes.content} style={{ pointerEvents: inFront ? 'all' : 'none' }}>
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default FullPageUi
