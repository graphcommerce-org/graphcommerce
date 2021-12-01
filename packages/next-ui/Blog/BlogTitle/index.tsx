import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { LayoutTitle } from '../../Layout'
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
      <LayoutTitle variant='h1'>{title}</LayoutTitle>
    </div>
  )
}
