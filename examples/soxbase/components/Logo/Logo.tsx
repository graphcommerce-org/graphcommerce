import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {
        marginRight: `${theme.spacings.md}`,
      },
    },
    logoImg: {
      height: theme.page.headerInnerHeight.xs,
      display: 'block',
      width: 'auto',
      paddingBottom: responsiveVal(4, 7), // todo(paales): should be removed when we have a proper logo
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {},
    },
  }),
  { name: 'Logo' },
)

export default function Logo() {
  const classes = useStyles()

  return (
    <PageLink href='/'>
      <a className={classes.logo}>
        <img
          src='/logo.svg'
          alt='Logo'
          className={classes.logoImg}
          width={192}
          height={72}
          loading='eager'
        />
      </a>
    </PageLink>
  )
}
