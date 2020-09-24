import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import { UseStyles } from 'components/Theme'
import Link from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    stickyContainer: {
      width: 'min-content',
      zIndex: theme.zIndex.appBar,
      position: 'sticky',
      marginLeft: theme.page.horizontal,
      top: 0,
      left: 0,
      [theme.breakpoints.down('sm')]: {
        paddingTop: `calc(${theme.page.headerHeight.xs} / 2 + ${theme.page.vertical} - 22px)`,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.page.vertical,
        marginTop: `calc(${theme.page.headerHeight.sm} + ${theme.page.vertical} * 2 - ${theme.page.vertical})`,
      },
    },
    fabRoot: {
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
        // borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0,
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
  { name: 'CategoryBreadcrumb' },
)

export type BackNavFabProps = UseStyles<typeof useStyles> & {
  href: string
} & FabProps

export default function BackNavFab(props: BackNavFabProps) {
  const classes = useStyles(props)
  const { href, children, ...fabProps } = props

  return (
    <div className={classes.stickyContainer}>
      <Link href={href} passHref>
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
      </Link>
    </div>
  )
}
