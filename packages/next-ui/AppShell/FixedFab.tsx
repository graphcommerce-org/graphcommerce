import { m } from 'framer-motion'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'FixedFab' })((theme) => ({
  root: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 100,
    borderRadius: 99,
    maxWidth: 56,
    [theme.breakpoints.up('md')]: {
      pointerEvents: 'all',
      top: `calc(${theme.appShell.headerHeightMd} / 2 - 28px)`,
      left: `calc((100vw - (100vw - 100%)) - ${theme.page.horizontal} - 56px)`,
      bottom: 'unset',
    },
  },
}))

type FixedFabProps = {
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export default function FixedFab(props: FixedFabProps) {
  const { children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return <m.div className={classes.root}>{children}</m.div>
}
