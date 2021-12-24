import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'sticky',
      top: theme.appShell.headerHeightSm,
      zIndex: 96,
      [theme.breakpoints.up('md')]: {
        top: `${theme.page.vertical} !important`,
      },
    },
  }),
  { name: 'AppShellSticky' },
)

type AppShellStickyBaseProps = {
  children: React.ReactNode
}

type AppShellStickyProps = AppShellStickyBaseProps & UseStyles<typeof useStyles>

/*
 - makes the children sticky to the parent container
 - determines top offset based on header height dynamically
*/
export default function AppShellSticky(props: AppShellStickyProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth={false} className={classes.root}>
      <>{children}</>
    </Container>
  )
}
