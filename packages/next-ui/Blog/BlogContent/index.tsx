import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'

const useStyles = makeStyles()(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: '0 auto',
      marginBottom: theme.spacings.sm,
    },
  }),
  { name: 'BlogContent' },
)

export type BlogContentProps = {
  content: React.ReactElement
}

export default function BlogContent(props: BlogContentProps) {
  const { content } = props
  const { classes } = useStyles()

  return <div className={classes.wrapper}>{content}</div>
}
