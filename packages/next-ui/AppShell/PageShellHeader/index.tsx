import { makeStyles, Theme } from '@material-ui/core'
import { useViewportScroll } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../../Styles'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader'

const useStyles = makeStyles((theme: Theme) => ({
  sheetHeader: {
    marginBottom: 62,
  },
  sheetHeaderActions: {
    padding: `8px ${theme.page.horizontal}px 8px`,
    [theme.breakpoints.up('md')]: {
      padding: `12px ${theme.page.horizontal}px 12px`,
    },
  },
}))

export type PageShellHeaderProps = Omit<AppShellHeaderProps, 'scrollY'> &
  UseStyles<typeof useStyles>

export default function PageShellHeader(props: PageShellHeaderProps) {
  const { scrollY } = useViewportScroll()
  const classes = useStyles(props)

  return <AppShellHeader {...props} classes={classes} scrollY={scrollY} noClose />
}
