import { makeStyles } from '@material-ui/core'
import { useViewportScroll } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../../Styles'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader'

const useStyles = makeStyles(() => ({
  sheetHeader: {
    marginBottom: 62,
  },
}))

export type PageShellHeaderProps = Omit<
  AppShellHeaderProps,
  'scrollY' | 'hideClose' | 'dragIndicator'
> &
  UseStyles<typeof useStyles>

export default function PageShellHeader(props: PageShellHeaderProps) {
  const { scrollY } = useViewportScroll()
  const classes = useStyles(props)

  return <AppShellHeader {...props} classes={classes} scrollY={scrollY} hideClose />
}
