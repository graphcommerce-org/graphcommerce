import { Theme, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuFab from '@reachdigital/magento-app-shell/MenuFab'
import { MenuQueryFragment } from '@reachdigital/magento-app-shell/MenuQueryFragment.gql'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import { m, useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.up('md')]: {
        top: theme.page.vertical,
        bottom: 'auto',
      },
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 8,
      position: 'fixed',
      bottom: theme.page.vertical,
      paddingLeft: theme.page.horizontal,
      paddingRight: theme.page.horizontal,
      width: '100%',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    menu: {
      [theme.breakpoints.down('sm')]: {
        transform: 'none !important',
        opacity: '1 !important',
        bottom: theme.page.vertical,
      },
    },
  }),
  { name: 'FabMenu' },
)

type FabMenuProps = MenuQueryFragment & {
  children?: React.ReactNode
  cart: React.ReactNode
  search?: React.ReactNode
} & UseStyles<typeof useStyles>

export default function FabMenu(props: FabMenuProps) {
  const { menu, children, cart, search } = props
  const classes = useStyles(props)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { scrollY } = useViewportScroll()
  const scrollTo = isMobile ? 0 : 130
  const actionsAnimOpacity = useTransform(scrollY, [50, scrollTo], [0, 1])
  const actionsAnimTop = useTransform(scrollY, [0, scrollTo], [-48, 0])

  const opacity = useTransform(scrollY, [0, scrollTo], [0, 0.08])
  const opacity2 = useTransform(scrollY, [0, scrollTo], [0, 0.1])
  const filter = useMotionTemplate`
    drop-shadow(0 1px 4px rgba(0,0,0,${opacity}))
    drop-shadow(0 4px 10px rgba(0,0,0,${opacity2}))`

  return (
    <m.div className={classes.root}>
      <m.div
        className={classes.menu}
        style={{ opacity: actionsAnimOpacity, translateY: actionsAnimTop, filter }}
      >
        <MenuFab menu={menu} search={search}>
          {children}
        </MenuFab>
      </m.div>
      <m.div style={{ filter }}>{cart}</m.div>
    </m.div>
  )
}
