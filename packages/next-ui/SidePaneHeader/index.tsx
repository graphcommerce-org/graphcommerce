import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {
      padding: `${theme.spacings.md} 0`,
    },
  }),
  { name: 'SidePaneHeader' },
)

type SidePaneHeaderProps = UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function SidePaneHeader(props: SidePaneHeaderProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Typography variant='h2' component='h1' align='center' className={classes.title}>
      {children}
    </Typography>
  )
}
