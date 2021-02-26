import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import React from 'react'
import PageLink from '../PageTransition/PageLink'
import { UseStyles } from '../Styles'

/**
 * When navigating, store the previous page.
 *
 * `default`:
 * - Show a back arrow icon
 * - Show the previous page if available
 * - Show the default previous page if not available
 *
 * `isOverlay`:
 * - Show a close icon
 * - Remember the navigation section that the user last was in a certain section.
 * - Show a back arrow when navigating in the same overlay area?
 *
 * Example sections
 * - /account or /account/*
 * - /cart or /checkout
 *
 * Register area
 */
const useStyles = makeStyles(
  (theme: Theme) => ({
    stickyContainer: {
      pointerEvents: 'none',
      width: 'min-content',
      zIndex: theme.zIndex.appBar,
      position: 'sticky',
      marginLeft: theme.page.horizontal,
      top: 0,
      left: 0,
      [theme.breakpoints.down('sm')]: {
        paddingTop: `calc(${theme.page.headerInnerHeight.xs} / 2 + ${theme.page.vertical} - 22px)`,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.page.vertical,
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2 - ${theme.page.vertical})`,
      },
    },
    fabRoot: {
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {
        height: 40,
        minWidth: 40,
        borderRadius: 20,
      },
      [theme.breakpoints.down('xs')]: {
        boxShadow: 'unset',
        marginLeft: -16,
        paddingRight: `9px`,
        paddingLeft: `14px`,
      },
    },
    icon: { fontSize: 18 },

    fabText: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'BackNavFab' },
)

export type BackNavFabProps = UseStyles<typeof useStyles> & {
  href: string
} & FabProps

export default function BackNavFab(props: BackNavFabProps) {
  const classes = useStyles(props)
  const { href, children, ...fabProps } = props

  return (
    <div className={classes.stickyContainer}>
      <PageLink href={href}>
        <Fab
          variant='extended'
          size='large'
          classes={{ root: classes.fabRoot }}
          aria-label='Previous page'
          {...fabProps}
        >
          <ArrowBack
            shapeRendering='geometricPrecision'
            fontSize='inherit'
            classes={{ root: classes.icon }}
          />
          <span className={classes.fabText}>{children}</span>
        </Fab>
      </PageLink>
    </div>
  )
}
