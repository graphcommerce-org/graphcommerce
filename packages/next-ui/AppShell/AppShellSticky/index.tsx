import { Container, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'sticky',
      zIndex: 96,
    },
    fillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        top: `${theme.page.vertical} !important`,
      },
    },
  }),
  {
    name: 'AppShellSticky',
  },
)

type AppShellStickyBaseProps = {
  children: React.ReactNode
  headerFill?: 'mobile-only' | 'both'
}

type AppShellStickyProps = AppShellStickyBaseProps & UseStyles<typeof useStyles>

/*
 - makes the children sticky to the parent container
 - determines top offset based on header height dynamically
*/
export default function AppShellSticky(props: AppShellStickyProps) {
  const { children, headerFill = 'both' } = props
  const classes = useStyles(props)

  // todo
  const top = 0

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root, headerFill === 'mobile-only' && classes.fillMobileOnly)}
      style={{ top }}
    >
      <>{children}</>
    </Container>
  )
}
