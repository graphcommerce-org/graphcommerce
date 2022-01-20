import { Container } from '@mui/material'
import React from 'react'
import { makeStyles, useMergedClasses, UseStyles } from '../../Styles'

const useStyles = makeStyles({ name: 'AppShellSticky' })((theme) => ({
  root: {
    position: 'sticky',
    top: theme.appShell.headerHeightSm,
    zIndex: 96,
    [theme.breakpoints.up('md')]: {
      top: `${theme.page.vertical} !important`,
    },
  },
}))

type AppShellStickyBaseProps = {
  children: React.ReactNode
}

export type AppShellStickyProps = AppShellStickyBaseProps & UseStyles<typeof useStyles>

/*
 - makes the children sticky to the parent container
 - determines top offset based on header height dynamically
*/
export function AppShellSticky(props: AppShellStickyProps) {
  const { children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Container maxWidth={false} className={classes.root}>
      <>{children}</>
    </Container>
  )
}
