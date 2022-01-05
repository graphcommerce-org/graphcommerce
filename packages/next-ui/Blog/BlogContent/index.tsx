import React from 'react'
import { makeStyles } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'BlogContent' })((theme) => ({
  wrapper: {
    maxWidth: 800,
    margin: '0 auto',
    marginBottom: theme.spacings.sm,
  },
}))

export type BlogContentProps = {
  content: React.ReactElement
}

export default function BlogContent(props: BlogContentProps) {
  const { content } = props
  const { classes } = useStyles()

  return <div className={classes.wrapper}>{content}</div>
}
