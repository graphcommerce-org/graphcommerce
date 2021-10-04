import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import AppShellTitle from '../../AppShell/AppShellTitle'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: `0 auto`,
    },
  }),
  { name: 'BlogTitle' },
)

export type BlogTitleProps = UseStyles<typeof useStyles> & {
  title: string
}

export default function BlogTitle(props: BlogTitleProps) {
  const { title } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <AppShellTitle variant='h2'>{title}</AppShellTitle>
    </div>
  )
}
